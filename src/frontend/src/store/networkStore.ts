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
  addRoute: (route: FiberRoute) => void;
  updateRoute: (id: string, updates: Partial<FiberRoute>) => void;
  deleteRoute: (id: string) => void;

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
  addDevice: (device) => set((s) => ({ devices: [...s.devices, device] })),
  updateDevice: (id, updates) =>
    set((s) => ({
      devices: s.devices.map((d) => (d.id === id ? { ...d, ...updates } : d)),
    })),
  deleteDevice: (id) =>
    set((s) => ({ devices: s.devices.filter((d) => d.id !== id) })),
  addRoute: (route) => set((s) => ({ routes: [...s.routes, route] })),
  updateRoute: (id, updates) =>
    set((s) => ({
      routes: s.routes.map((r) => (r.id === id ? { ...r, ...updates } : r)),
    })),
  deleteRoute: (id) =>
    set((s) => ({ routes: s.routes.filter((r) => r.id !== id) })),

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
}));
