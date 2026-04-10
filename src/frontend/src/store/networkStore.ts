import { create } from "zustand";
import { mockAlerts, mockDevices, mockRoutes } from "../data/mockData";
import type {
  Alert,
  Device,
  FiberRoute,
  LayerVisibility,
} from "../types/network";

interface NetworkState {
  devices: Device[];
  routes: FiberRoute[];
  alerts: Alert[];
  selectedDeviceId: string | null;
  selectedRouteId: string | null;
  layerVisibility: LayerVisibility;
  sidebarCollapsed: boolean;
  searchQuery: string;

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
}

export const useNetworkStore = create<NetworkState>((set) => ({
  devices: mockDevices,
  routes: mockRoutes,
  alerts: mockAlerts,
  selectedDeviceId: null,
  selectedRouteId: null,
  layerVisibility: { backbone: true, distribution: true, drop: true },
  sidebarCollapsed: false,
  searchQuery: "",

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
}));
