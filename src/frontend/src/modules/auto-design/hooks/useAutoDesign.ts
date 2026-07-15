/**
 * useAutoDesign — React Query mutation hook for the Network Auto Design feature.
 *
 * Responsibilities:
 *  1. Mock fetch adapter (module-level) that intercepts POST /api/network/auto-design/
 *  2. useMutation wired to store (useAutoDesignStore)
 *  3. Exported helpers: calculatePolygonArea, validatePolygon, exportResultAsJson
 *
 * NOTE: Axios is not installed in this project — all HTTP is done via native fetch.
 *       A module-level interceptor pattern is simulated with a patched globalThis.fetch.
 */

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAutoDesignStore } from "../store";
import type {
  AutoDesignFormValues,
  AutoDesignRequest,
  AutoDesignResult,
  NetworkEdge,
  NetworkNode,
  NetworkType,
  PolygonGeoJSON,
  SplitterCapacity,
} from "../types";

// ─── Haversine ───────────────────────────────────────────────────────────────

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6_371_000; // Earth radius in metres
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ─── Exported helpers ────────────────────────────────────────────────────────

/**
 * Area of a GeoJSON Polygon (first ring only) in km² using the spherical
 * excess / shoelace formula with lat/lng degrees.
 */
export function calculatePolygonArea(polygon: PolygonGeoJSON): number {
  const ring = polygon.coordinates[0];
  if (!ring || ring.length < 3) return 0;

  const R = 6_371; // km
  const toRad = (d: number) => (d * Math.PI) / 180;
  let area = 0;
  const n = ring.length;

  for (let i = 0; i < n - 1; i++) {
    const [lng1, lat1] = ring[i];
    const [lng2, lat2] = ring[i + 1];
    area +=
      toRad(lng2 - lng1) * (2 + Math.sin(toRad(lat1)) + Math.sin(toRad(lat2)));
  }

  return Math.abs((area * R * R) / 2);
}

/**
 * Validate a drawn polygon before sending to the API.
 */
export function validatePolygon(polygon: PolygonGeoJSON): {
  valid: boolean;
  error?: string;
} {
  const ring = polygon.coordinates[0];
  if (!ring || ring.length < 4) {
    return { valid: false, error: "Polygon must have at least 3 vertices." };
  }

  const area = calculatePolygonArea(polygon);
  if (area < 0.01) {
    return {
      valid: false,
      error: "Selected area is too small (min 0.01 km²).",
    };
  }
  if (area > 10_000) {
    return {
      valid: false,
      error: "Selected area is too large (max 10,000 km²).",
    };
  }

  return { valid: true };
}

/**
 * Download the design result + form values as a timestamped JSON file.
 */
export function exportResultAsJson(
  result: AutoDesignResult,
  formValues: AutoDesignFormValues,
): void {
  const payload = {
    exportedAt: new Date().toISOString(),
    parameters: formValues,
    result,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `network-design-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

// ─── Mock topology generator ─────────────────────────────────────────────────

function generateMockTopology(request: AutoDesignRequest): AutoDesignResult {
  const ring = request.polygon.coordinates[0];

  // Bounding box
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;

  for (const [lng, lat] of ring) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  const lngSpan = maxLng - minLng;
  const latSpan = maxLat - minLat;

  const cap = request.splitter_capacity as SplitterCapacity;
  const subCount = request.subscriber_count;

  const oltCount = Math.min(3, Math.ceil(subCount / (cap * 8)));
  const splCount = Math.ceil(subCount / cap);

  const nodes: NetworkNode[] = [];
  const edges: NetworkEdge[] = [];

  // ── OLTs ────────────────────────────────────────────────────────────────
  for (let i = 0; i < oltCount; i++) {
    const angle = (i / oltCount) * Math.PI * 2;
    const r = 0.05;
    nodes.push({
      id: `olt-${i + 1}`,
      name: `OLT Central-${i + 1}`,
      type: "OLT",
      lat: centerLat + Math.sin(angle) * latSpan * r,
      lng: centerLng + Math.cos(angle) * lngSpan * r,
      connectedCount: 0,
    });
  }

  // ── Splitters ────────────────────────────────────────────────────────────
  for (let i = 0; i < splCount; i++) {
    const cols = Math.ceil(Math.sqrt(splCount));
    const rows = Math.ceil(splCount / cols);
    const col = i % cols;
    const row = Math.floor(i / cols);

    const tLng = minLng + ((col + 0.5) / cols) * lngSpan;
    const tLat = minLat + ((row + 0.5) / rows) * latSpan;

    const jLng = (Math.random() - 0.5) * lngSpan * 0.04;
    const jLat = (Math.random() - 0.5) * latSpan * 0.04;

    nodes.push({
      id: `spl-${i + 1}`,
      name: `Splitter Node-${i + 1}`,
      type: "SPLITTER",
      lat: tLat + jLat,
      lng: tLng + jLng,
      connectedCount: 0,
    });
  }

  // ── Subscribers ──────────────────────────────────────────────────────────
  const splitterNodes = nodes.filter((n) => n.type === "SPLITTER");
  const subsPerSplitter = Math.ceil(subCount / Math.max(splCount, 1));

  let subIndex = 1;
  const subsBySplitter = new Map<string, string[]>();

  for (const spl of splitterNodes) {
    const subIds: string[] = [];
    const count = Math.min(subsPerSplitter, subCount - subIndex + 1);
    if (count <= 0) break;

    for (let k = 0; k < count; k++) {
      const id = `sub-${String(subIndex).padStart(3, "0")}`;
      const spreadLng = (Math.random() - 0.5) * lngSpan * 0.06;
      const spreadLat = (Math.random() - 0.5) * latSpan * 0.06;

      nodes.push({
        id,
        name: `Subscriber-${String(subIndex).padStart(3, "0")}`,
        type: "SUBSCRIBER",
        lat: spl.lat + spreadLat,
        lng: spl.lng + spreadLng,
        connectedCount: 1,
      });

      subIds.push(id);
      subIndex++;
    }
    subsBySplitter.set(spl.id, subIds);
  }

  // ── Edges: Splitter → nearest OLT ────────────────────────────────────────
  const oltNodes = nodes.filter((n) => n.type === "OLT");
  const splitterToOlt = new Map<string, string>();

  for (const spl of splitterNodes) {
    let nearestOlt = oltNodes[0];
    let minDist = Number.POSITIVE_INFINITY;

    for (const olt of oltNodes) {
      const d = haversineMeters(spl.lat, spl.lng, olt.lat, olt.lng);
      if (d < minDist) {
        minDist = d;
        nearestOlt = olt;
      }
    }

    splitterToOlt.set(spl.id, nearestOlt.id);
    const cableLength = haversineMeters(
      spl.lat,
      spl.lng,
      nearestOlt.lat,
      nearestOlt.lng,
    );

    edges.push({
      id: `edge-${nearestOlt.id}-${spl.id}`,
      fromNodeId: nearestOlt.id,
      toNodeId: spl.id,
      cableLength,
      networkType: request.network_type,
    });
  }

  // Update OLT connectedCount
  for (const olt of oltNodes) {
    const connectedSplitters = splitterNodes.filter(
      (spl) => splitterToOlt.get(spl.id) === olt.id,
    );
    const oltNode = nodes.find((n) => n.id === olt.id);
    if (oltNode) oltNode.connectedCount = connectedSplitters.length;
  }

  // ── Edges: Subscriber → assigned Splitter ────────────────────────────────
  const allSubscribers = nodes.filter((n) => n.type === "SUBSCRIBER");

  for (const spl of splitterNodes) {
    const assignedSubs = subsBySplitter.get(spl.id) ?? [];
    let splConnectedCount = 0;

    for (const subId of assignedSubs) {
      const sub = allSubscribers.find((n) => n.id === subId);
      if (!sub) continue;

      const cableLength = haversineMeters(spl.lat, spl.lng, sub.lat, sub.lng);
      edges.push({
        id: `edge-${spl.id}-${subId}`,
        fromNodeId: spl.id,
        toNodeId: subId,
        cableLength,
        networkType: request.network_type,
      });
      splConnectedCount++;
    }

    const splNode = nodes.find((n) => n.id === spl.id);
    if (splNode) splNode.connectedCount = splConnectedCount;
  }

  // ── Summary ──────────────────────────────────────────────────────────────
  const totalCableLength = edges.reduce((sum, e) => sum + e.cableLength, 0);

  const costPerMeter: Record<NetworkType, number> = {
    FIBER: 0.5,
    COAXIAL: 0.3,
    LAN: 0.2,
  };

  const estimatedCost =
    totalCableLength * costPerMeter[request.network_type] +
    oltCount * 5_000 +
    splCount * 500;

  return {
    nodes,
    edges,
    summary: {
      totalSubscribers: allSubscribers.length,
      totalSplitters: splCount,
      totalOLTs: oltCount,
      totalCableLength: Math.round(totalCableLength),
      estimatedCost: Math.round(estimatedCost),
    },
  };
}

// ─── Mock fetch adapter (module-level, runs once) ────────────────────────────

const AUTO_DESIGN_PATH = "/api/network/auto-design/";

// Resolve VITE_API_BASE_URL without ts-nocheck via type assertion on import.meta
const viteEnv = (import.meta as unknown as { env: Record<string, string> }).env;
const apiBase: string = viteEnv.VITE_API_BASE_URL ?? "";
const isMockActive = !apiBase || apiBase.trim() === "" || apiBase === "/";

if (isMockActive) {
  const _originalFetch = globalThis.fetch.bind(globalThis);

  globalThis.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ): Promise<Response> => {
    const url =
      typeof input === "string"
        ? input
        : input instanceof URL
          ? input.href
          : input.url;
    const method = (init?.method ?? "GET").toUpperCase();

    if (method === "POST" && url.includes(AUTO_DESIGN_PATH)) {
      // Artificial delay: 2000–3000 ms
      const delay = Math.random() * 1_000 + 2_000;
      await new Promise<void>((res) => setTimeout(res, delay));

      let requestBody: AutoDesignRequest | null = null;
      try {
        requestBody = JSON.parse(init?.body as string) as AutoDesignRequest;
      } catch {
        return new Response(JSON.stringify({ detail: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      if (!requestBody) {
        return new Response(JSON.stringify({ detail: "Empty request body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const result = generateMockTopology(requestBody);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return _originalFetch(input, init);
  };
}

// ─── Internal fetch helper ────────────────────────────────────────────────────

async function postJson<TReq, TRes>(url: string, body: TReq): Promise<TRes> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errJson = (await response.json()) as { detail?: string };
      if (errJson.detail) message = errJson.detail;
    } catch {
      // ignore parse errors
    }
    throw new Error(message);
  }

  return response.json() as Promise<TRes>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useAutoDesign() {
  const store = useAutoDesignStore();

  const mutation = useMutation<AutoDesignResult, Error, AutoDesignRequest>({
    mutationFn: (payload: AutoDesignRequest) =>
      postJson<AutoDesignRequest, AutoDesignResult>(AUTO_DESIGN_PATH, payload),

    onMutate: () => {
      store.setLoading(true);
      store.setError(null);
    },

    onSuccess: (data) => {
      store.setResult(data);
      store.setLoading(false);
      store.setDrawingMode("done");
      store.setAnimationPlayed(false);
      toast.success("Network design generated successfully!");
    },

    onError: (error: Error) => {
      const message = error.message ?? "Failed to generate network design";
      store.setError(message);
      store.setLoading(false);
      toast.error(`Network design failed: ${message}`, {
        action: {
          label: "Retry",
          onClick: () => {
            if (store.polygon && store.formValues) {
              generateNetwork({
                polygon: store.polygon,
                subscriber_count: store.formValues.subscriberCount,
                network_type: store.formValues.networkType,
                splitter_capacity: store.formValues.splitterCapacity,
                max_distance: store.formValues.maxDistance,
                manual_olt_placement: store.formValues.manualOltPlacement,
              });
            }
          },
        },
      });
    },
  });

  function generateNetwork(request: AutoDesignRequest): void {
    mutation.mutate(request);
  }

  return {
    generateNetwork,
    isGenerating: mutation.isPending,
    error: store.error,
    result: store.result,
    reset: store.reset,
  };
}
