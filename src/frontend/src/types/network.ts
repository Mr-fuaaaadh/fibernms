export type DeviceType = "OLT" | "ONT" | "Splitter" | "JJB" | "Switch";
export type DeviceStatus = "active" | "faulty" | "warning";
export type RouteType = "backbone" | "distribution" | "drop";
export type AlertSeverity = "critical" | "warning" | "info";

export interface Device {
  id: string;
  name: string;
  type: DeviceType;
  lat: number;
  lng: number;
  ports: number;
  status: DeviceStatus;
  connectedTo: string[];
  location?: string;
  signalStrength?: number; // dBm
  uptime?: number; // percent
}

export interface FiberRoute {
  id: string;
  name: string;
  type: RouteType;
  waypoints: { lat: number; lng: number }[];
  distanceKm: number;
  status: DeviceStatus;
}

export interface Alert {
  id: string;
  deviceId: string;
  deviceName: string;
  issueType: string;
  timestamp: number;
  severity: AlertSeverity;
  resolved?: boolean;
}

export interface LayerVisibility {
  backbone: boolean;
  distribution: boolean;
  drop: boolean;
}
