import { create } from "zustand";
import {
  mockAlerts,
  mockAuditLogs,
  mockCapacityRecords,
  mockDevices,
  mockPredictiveAlerts,
  mockRoutes,
  mockSLARecords,
} from "../data/mockData";
import type {
  Alert,
  AuditLog,
  CapacityRecord,
  Device,
  FiberRoute,
  LayerVisibility,
  NetworkLayer,
  PredictiveAlert,
  SLARecord,
} from "../types/network";

// Snapshot for undo history
interface NetworkSnapshot {
  devices: Device[];
  routes: FiberRoute[];
}

const MAX_HISTORY = 20;

interface NetworkState {
  // Core
  devices: Device[];
  routes: FiberRoute[];
  alerts: Alert[];
  selectedDeviceId: string | null;
  selectedRouteId: string | null;
  layerVisibility: LayerVisibility;
  sidebarCollapsed: boolean;
  searchQuery: string;

  // Undo history
  history: NetworkSnapshot[];

  // Enterprise
  slaRecords: SLARecord[];
  predictiveAlerts: PredictiveAlert[];
  auditLogs: AuditLog[];
  capacityRecords: CapacityRecord[];
  networkLayers: NetworkLayer[];
  commandPaletteOpen: boolean;
  simulationMode: boolean;
  activeLayer: "L1" | "L2" | "L3";

  // Core actions
  setSelectedDevice: (id: string | null) => void;
  setSelectedRoute: (id: string | null) => void;
  toggleLayer: (layer: keyof LayerVisibility) => void;
  toggleSidebar: () => void;
  setSearchQuery: (q: string) => void;
  resolveAlert: (id: string) => void;
  addDevice: (device: Device) => void;
  updateDevice: (id: string, updates: Partial<Device>) => void;
  deleteDevice: (id: string) => void;
  deleteDeviceWithChildren: (id: string) => void;
  addRoute: (route: FiberRoute) => void;
  updateRoute: (id: string, updates: Partial<FiberRoute>) => void;
  deleteRoute: (id: string) => void;

  // Undo
  undo: () => void;

  // Enterprise actions
  setSLARecords: (records: SLARecord[]) => void;
  setPredictiveAlerts: (alerts: PredictiveAlert[]) => void;
  setAuditLogs: (logs: AuditLog[]) => void;
  setCapacityRecords: (records: CapacityRecord[]) => void;
  toggleNetworkLayer: (type: "L1" | "L2" | "L3") => void;
  toggleCommandPalette: () => void;
  toggleSimulationMode: () => void;
  setActiveLayer: (layer: "L1" | "L2" | "L3") => void;
  resolvePredictiveAlert: (id: string) => void;

  // Mobile search
  mobileSearchOpen: boolean;
  setMobileSearchOpen: (open: boolean) => void;
}

/** Collect all descendant device IDs via DFS on connectedTo[] */
function collectDescendants(rootId: string, allDevices: Device[]): Set<string> {
  const visited = new Set<string>();
  const stack = [rootId];
  while (stack.length > 0) {
    const current = stack.pop()!;
    if (visited.has(current)) continue;
    visited.add(current);
    const device = allDevices.find((d) => d.id === current);
    if (device) {
      for (const childId of device.connectedTo) {
        if (!visited.has(childId)) stack.push(childId);
      }
    }
  }
  return visited;
}

/** Push a snapshot onto history, capping at MAX_HISTORY entries */
function pushSnapshot(
  history: NetworkSnapshot[],
  devices: Device[],
  routes: FiberRoute[],
): NetworkSnapshot[] {
  const snapshot: NetworkSnapshot = {
    devices: [...devices],
    routes: [...routes],
  };
  const updated = [...history, snapshot];
  if (updated.length > MAX_HISTORY) updated.shift();
  return updated;
}

export const useNetworkStore = create<NetworkState>((set) => ({
  // Core state
  devices: mockDevices,
  routes: mockRoutes,
  alerts: mockAlerts,
  selectedDeviceId: null,
  selectedRouteId: null,
  layerVisibility: { backbone: true, distribution: true, drop: true },
  sidebarCollapsed: false,
  searchQuery: "",

  // Undo history
  history: [],

  // Enterprise state
  slaRecords: mockSLARecords,
  predictiveAlerts: mockPredictiveAlerts,
  auditLogs: mockAuditLogs,
  capacityRecords: mockCapacityRecords,
  networkLayers: [
    { type: "L1", visible: true, name: "Physical (Fiber)" },
    { type: "L2", visible: false, name: "Switching (VLAN)" },
    { type: "L3", visible: false, name: "IP Topology" },
  ],
  commandPaletteOpen: false,
  simulationMode: false,
  activeLayer: "L1",
  mobileSearchOpen: false,

  // Core actions
  setSelectedDevice: (id) => set({ selectedDeviceId: id }),
  setSelectedRoute: (id) => set({ selectedRouteId: id }),
  toggleLayer: (layer) =>
    set((s) => ({
      layerVisibility: {
        ...s.layerVisibility,
        [layer]: !s.layerVisibility[layer],
      },
    })),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  resolveAlert: (id) =>
    set((s) => ({
      alerts: s.alerts.map((a) => (a.id === id ? { ...a, resolved: true } : a)),
    })),

  addDevice: (device) =>
    set((s) => ({
      history: pushSnapshot(s.history, s.devices, s.routes),
      devices: [...s.devices, device],
    })),

  updateDevice: (id, updates) =>
    set((s) => ({
      history: pushSnapshot(s.history, s.devices, s.routes),
      devices: s.devices.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),

  deleteDevice: (id) =>
    set((s) => ({
      history: pushSnapshot(s.history, s.devices, s.routes),
      devices: s.devices.filter((d) => d.id !== id),
    })),

  deleteDeviceWithChildren: (id) =>
    set((s) => {
      const toDelete = collectDescendants(id, s.devices);
      const remainingDevices = s.devices.filter((d) => !toDelete.has(d.id));
      // Remove routes that reference only devices within the deleted set.
      // Since FiberRoute waypoints are lat/lng only (no device IDs), we remove
      // routes whose IDs include any deleted device ID (routes created by
      // the connection system), while preserving drawn fiber routes.
      const remainingRoutes = s.routes.filter(
        (route) =>
          !Array.from(toDelete).some((devId) => route.id.includes(devId)),
      );
      return {
        history: pushSnapshot(s.history, s.devices, s.routes),
        devices: remainingDevices,
        routes: remainingRoutes,
        selectedDeviceId: toDelete.has(s.selectedDeviceId ?? "")
          ? null
          : s.selectedDeviceId,
        selectedRouteId: null,
      };
    }),

  addRoute: (route) =>
    set((s) => ({
      history: pushSnapshot(s.history, s.devices, s.routes),
      routes: [...s.routes, route],
    })),

  updateRoute: (id, updates) =>
    set((s) => ({
      history: pushSnapshot(s.history, s.devices, s.routes),
      routes: s.routes.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),

  deleteRoute: (id) =>
    set((s) => ({
      history: pushSnapshot(s.history, s.devices, s.routes),
      routes: s.routes.filter((r) => r.id !== id),
    })),

  // Undo: restore the last snapshot
  undo: () =>
    set((s) => {
      if (s.history.length === 0) return s;
      const newHistory = [...s.history];
      const snapshot = newHistory.pop()!;
      return {
        history: newHistory,
        devices: snapshot.devices,
        routes: snapshot.routes,
        selectedDeviceId: null,
        selectedRouteId: null,
      };
    }),

  // Enterprise actions
  setSLARecords: (records) => set({ slaRecords: records }),
  setPredictiveAlerts: (alerts) => set({ predictiveAlerts: alerts }),
  setAuditLogs: (logs) => set({ auditLogs: logs }),
  setCapacityRecords: (records) => set({ capacityRecords: records }),
  toggleNetworkLayer: (type) =>
    set((s) => ({
      networkLayers: s.networkLayers.map((l) =>
        l.type === type ? { ...l, visible: !l.visible } : l,
      ),
    })),
  toggleCommandPalette: () =>
    set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
  toggleSimulationMode: () =>
    set((s) => ({ simulationMode: !s.simulationMode })),
  setActiveLayer: (layer) => set({ activeLayer: layer }),
  resolvePredictiveAlert: (id) =>
    set((s) => ({
      predictiveAlerts: s.predictiveAlerts.map((a) =>
        a.id === id ? { ...a, status: "resolved" } : a,
      ),
    })),
  setMobileSearchOpen: (open) => set({ mobileSearchOpen: open }),
}));
