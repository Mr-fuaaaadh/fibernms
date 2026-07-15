// ─── GeoJSON ────────────────────────────────────────────────────────────────

export interface PolygonGeoJSON {
  type: "Polygon";
  coordinates: number[][][]; // [ring][point][lng, lat]
}

// ─── Request / Response ──────────────────────────────────────────────────────

export type NetworkType = "FIBER" | "COAXIAL" | "LAN";

export type SplitterCapacity = 8 | 16 | 32;

export interface AutoDesignRequest {
  polygon: PolygonGeoJSON;
  subscriber_count: number;
  network_type: NetworkType;
  splitter_capacity: SplitterCapacity;
  max_distance: number;
  manual_olt_placement?: boolean;
}

export type NodeType = "OLT" | "SPLITTER" | "SUBSCRIBER";

export interface NetworkNode {
  id: string;
  name: string;
  type: NodeType;
  lat: number;
  lng: number;
  connectedCount: number;
}

export interface NetworkEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  cableLength: number; // metres
  networkType: NetworkType;
}

export interface AutoDesignResult {
  nodes: NetworkNode[];
  edges: NetworkEdge[];
  summary: {
    totalSubscribers: number;
    totalSplitters: number;
    totalOLTs: number;
    totalCableLength: number; // metres
    estimatedCost: number; // USD
  };
}

// ─── Form ────────────────────────────────────────────────────────────────────

export interface AutoDesignFormValues {
  subscriberCount: number;
  networkType: NetworkType;
  splitterCapacity: SplitterCapacity;
  maxDistance: number;
  manualOltPlacement: boolean;
}

// ─── Drawing mode ────────────────────────────────────────────────────────────

export type DrawingMode = "idle" | "drawing" | "editing" | "done";
