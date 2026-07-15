import { mockCustomerNodes } from "@/data/faultMockData";
import { useNetworkStore } from "@/store/networkStore";
import type { Device, FiberRoute } from "@/types/network";
/**
 * useFaultVisualization.ts
 * Core fault cascade logic for the Fault Visualization Map.
 * Computes affected nodes, links, and customer counts via BFS from a fault origin.
 */
import { useCallback, useMemo, useState } from "react";

export type FaultStatusFilter = "all" | "down" | "affected" | "active";

export interface FaultSelection {
  type: "device" | "route" | "customer" | null;
  id: string | null;
}

export interface FaultStats {
  totalCustomers: number;
  activeCustomers: number;
  affectedCustomers: number;
  downDevices: number;
}

export interface LayerVisibilityFault {
  customers: boolean;
  fiber: boolean;
  devices: boolean;
}

export interface SimulatedFault {
  deviceDownId: string | null;
  cableCutRouteId: string | null;
}

/** BFS from rootId through connectedTo edges (parent→child direction) */
function bfsDownstream(rootId: string, allDevices: Device[]): Set<string> {
  const visited = new Set<string>();
  const queue = [rootId];
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);
    // Find devices that list `current` in their connectedTo
    for (const d of allDevices) {
      if (d.connectedTo.includes(current) && !visited.has(d.id)) {
        queue.push(d.id);
      }
    }
  }
  return visited;
}

/** Determine effective display status for a device given fault simulation */
function computeDeviceDisplayStatus(
  device: Device,
  simulatedFault: SimulatedFault,
  downstreamOfDownDevice: Set<string>,
  downstreamOfCutRoute: Set<string>,
): "active" | "faulty" | "warning" | "affected" {
  if (simulatedFault.deviceDownId === device.id) return "faulty";
  if (device.status === "faulty") return "faulty";
  if (
    simulatedFault.deviceDownId &&
    downstreamOfDownDevice.has(device.id) &&
    device.id !== simulatedFault.deviceDownId
  )
    return "affected";
  if (downstreamOfCutRoute.has(device.id)) return "affected";
  if (device.status === "warning") return "warning";
  return "active";
}

export function useFaultVisualization() {
  const devices = useNetworkStore((s) => s.devices);
  const routes = useNetworkStore((s) => s.routes);
  const alerts = useNetworkStore((s) => s.alerts);
  const updateDevice = useNetworkStore((s) => s.updateDevice);
  const updateRoute = useNetworkStore((s) => s.updateRoute);

  // All devices including customers
  const allDevices = useMemo(
    () => [...devices, ...mockCustomerNodes],
    [devices],
  );

  // Simulated fault state
  const [simulatedFault, setSimulatedFault] = useState<SimulatedFault>({
    deviceDownId: null,
    cableCutRouteId: null,
  });

  // Selection state
  const [selection, setSelection] = useState<FaultSelection>({
    type: null,
    id: null,
  });

  // Layer visibility
  const [layers, setLayers] = useState<LayerVisibilityFault>({
    customers: true,
    fiber: true,
    devices: true,
  });

  // Filter state
  const [statusFilter, setStatusFilter] = useState<FaultStatusFilter>("all");

  // Compute downstream nodes from a downed device
  const downstreamOfDownDevice = useMemo<Set<string>>(() => {
    if (!simulatedFault.deviceDownId) return new Set();
    return bfsDownstream(simulatedFault.deviceDownId, allDevices);
  }, [simulatedFault.deviceDownId, allDevices]);

  // Compute which devices are downstream of a cut cable route
  // A cut route's "downstream" = devices closest to route endpoints
  const downstreamOfCutRoute = useMemo<Set<string>>(() => {
    if (!simulatedFault.cableCutRouteId) return new Set();
    const cutRoute = routes.find(
      (r) => r.id === simulatedFault.cableCutRouteId,
    );
    if (!cutRoute) return new Set();
    // Find devices within 1 degree of the last waypoint of the cut route
    const lastWp = cutRoute.waypoints[cutRoute.waypoints.length - 1];
    const nearbyDevices = allDevices.filter((d) => {
      const dist = Math.sqrt(
        (d.lat - lastWp.lat) ** 2 + (d.lng - lastWp.lng) ** 2,
      );
      return dist < 1.5;
    });
    const affected = new Set<string>();
    for (const d of nearbyDevices) {
      const downstream = bfsDownstream(d.id, allDevices);
      for (const id of downstream) affected.add(id);
    }
    return affected;
  }, [simulatedFault.cableCutRouteId, routes, allDevices]);

  // Effective device statuses
  const deviceDisplayStatuses = useMemo(() => {
    const map = new Map<string, "active" | "faulty" | "warning" | "affected">();
    for (const d of allDevices) {
      map.set(
        d.id,
        computeDeviceDisplayStatus(
          d,
          simulatedFault,
          downstreamOfDownDevice,
          downstreamOfCutRoute,
        ),
      );
    }
    return map;
  }, [
    allDevices,
    simulatedFault,
    downstreamOfDownDevice,
    downstreamOfCutRoute,
  ]);

  // Effective route statuses
  const routeDisplayStatuses = useMemo(() => {
    const map = new Map<string, "active" | "faulty" | "warning">();
    for (const r of routes) {
      if (r.id === simulatedFault.cableCutRouteId) {
        map.set(r.id, "faulty");
      } else if (r.status === "faulty") {
        map.set(r.id, "faulty");
      } else if (r.status === "warning") {
        map.set(r.id, "warning");
      } else {
        map.set(r.id, "active");
      }
    }
    return map;
  }, [routes, simulatedFault.cableCutRouteId]);

  // Stats computation
  const stats = useMemo<FaultStats>(() => {
    const customers = mockCustomerNodes;
    const affectedCustomerIds = new Set([
      ...downstreamOfDownDevice,
      ...downstreamOfCutRoute,
    ]);
    const affected = customers.filter((c) => affectedCustomerIds.has(c.id));
    const totalCustomers = customers.length;
    const affectedCustomers = affected.length;
    const activeCustomers = totalCustomers - affectedCustomers;
    const downDevices = allDevices.filter(
      (d) => deviceDisplayStatuses.get(d.id) === "faulty",
    ).length;
    return { totalCustomers, activeCustomers, affectedCustomers, downDevices };
  }, [
    downstreamOfDownDevice,
    downstreamOfCutRoute,
    allDevices,
    deviceDisplayStatuses,
  ]);

  // Highlighted path for selection
  const highlightedNodeIds = useMemo<Set<string>>(() => {
    if (!selection.id) return new Set();
    if (selection.type === "device" || selection.type === "customer") {
      return bfsDownstream(selection.id, allDevices);
    }
    return new Set();
  }, [selection, allDevices]);

  // Highlighted route IDs for selection
  const highlightedRouteIds = useMemo<Set<string>>(() => {
    if (!selection.id || selection.type !== "route") return new Set();
    return new Set([selection.id]);
  }, [selection]);

  // Affected customer count for a selected device
  const selectedAffectedCount = useMemo(() => {
    if (!selection.id) return 0;
    const downstream = bfsDownstream(selection.id, allDevices);
    return mockCustomerNodes.filter((c) => downstream.has(c.id)).length;
  }, [selection, allDevices]);

  // Active (unresolved) fault alerts
  const activeAlerts = useMemo(
    () => alerts.filter((a) => !a.resolved && a.severity === "critical"),
    [alerts],
  );

  // ─── Actions ────────────────────────────────────────────────────────────────

  const simulateDeviceDown = useCallback(
    (deviceId?: string) => {
      const target =
        deviceId ??
        (() => {
          const nonOlt = devices.filter((d) => d.type !== "OLT");
          return nonOlt[Math.floor(Math.random() * nonOlt.length)]?.id ?? null;
        })();
      if (!target) return;
      setSimulatedFault((prev) => ({ ...prev, deviceDownId: target }));
      updateDevice(target, { status: "faulty" });
    },
    [devices, updateDevice],
  );

  const simulateCableCut = useCallback(
    (routeId?: string) => {
      const target =
        routeId ??
        (() => {
          return routes[Math.floor(Math.random() * routes.length)]?.id ?? null;
        })();
      if (!target) return;
      setSimulatedFault((prev) => ({ ...prev, cableCutRouteId: target }));
      updateRoute(target, { status: "faulty" });
    },
    [routes, updateRoute],
  );

  const clearFaults = useCallback(() => {
    if (simulatedFault.deviceDownId) {
      updateDevice(simulatedFault.deviceDownId, { status: "active" });
    }
    if (simulatedFault.cableCutRouteId) {
      updateRoute(simulatedFault.cableCutRouteId, { status: "active" });
    }
    setSimulatedFault({ deviceDownId: null, cableCutRouteId: null });
    setSelection({ type: null, id: null });
  }, [simulatedFault, updateDevice, updateRoute]);

  const clearSelection = useCallback(() => {
    setSelection({ type: null, id: null });
  }, []);

  const toggleLayer = useCallback((layer: keyof LayerVisibilityFault) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  // Get the cut point (last waypoint) for a cut route
  const getCutPoint = useCallback(
    (routeId: string) => {
      const r = routes.find((route) => route.id === routeId);
      if (!r || r.waypoints.length === 0) return null;
      const mid = Math.floor(r.waypoints.length / 2);
      return r.waypoints[mid];
    },
    [routes],
  );

  // Get upstream fault source for a customer
  const getUpstreamFaultSource = useCallback(
    (customerId: string): string | null => {
      const customer = mockCustomerNodes.find((c) => c.id === customerId);
      if (!customer) return null;
      if (simulatedFault.deviceDownId) {
        const downstream = bfsDownstream(
          simulatedFault.deviceDownId,
          allDevices,
        );
        if (downstream.has(customerId)) {
          const d = allDevices.find(
            (x) => x.id === simulatedFault.deviceDownId,
          );
          return d?.name ?? null;
        }
      }
      if (simulatedFault.cableCutRouteId) {
        const r = routes.find((x) => x.id === simulatedFault.cableCutRouteId);
        return r?.name ?? null;
      }
      return null;
    },
    [simulatedFault, allDevices, routes],
  );

  return {
    // Data
    allDevices,
    customerNodes: mockCustomerNodes,
    routes,
    activeAlerts,
    stats,

    // Fault state
    simulatedFault,
    deviceDisplayStatuses,
    routeDisplayStatuses,

    // Selection
    selection,
    setSelection,
    clearSelection,
    highlightedNodeIds,
    highlightedRouteIds,
    selectedAffectedCount,

    // Layers & filter
    layers,
    toggleLayer,
    statusFilter,
    setStatusFilter,

    // Actions
    simulateDeviceDown,
    simulateCableCut,
    clearFaults,
    getCutPoint,
    getUpstreamFaultSource,
  };
}
