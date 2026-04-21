export type DeviceType =
  | "OLT"
  | "ONT"
  | "Splitter"
  | "JJB"
  | "Switch"
  | "Coupler"
  | "Router";
export type DeviceStatus = "active" | "faulty" | "warning";
export type RouteType = "backbone" | "distribution" | "drop";
export type AlertSeverity = "critical" | "warning" | "info";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type SLAStatus = "compliant" | "warning" | "breach";

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
  region?: string;
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

export interface SLARecord {
  id: string;
  customerId: string;
  customerName: string;
  region: string;
  latency: number; // ms
  packetLoss: number; // percent
  uptime: number; // percent
  status: SLAStatus;
  lastChecked: number; // timestamp
}

export interface PredictiveAlert {
  id: string;
  deviceId: string;
  deviceName: string;
  riskScore: number; // 0-100
  failureType: "fiber-cut" | "signal-degradation" | "device-failure";
  predictedETA: number; // hours
  status: "active" | "resolved";
}

export interface AuditLog {
  id: string;
  timestamp: number;
  userId: string;
  userName: string;
  action: string;
  actionType: "device-change" | "user-action" | "workflow-execution" | "system";
  targetId: string;
  targetName: string;
  details: string;
  status: "success" | "failure";
}

export interface CapacityRecord {
  id: string;
  routeId: string;
  routeName: string;
  region: string;
  currentUtilization: number; // percent
  maxCapacity: number; // Gbps
  forecastData: { month: string; utilization: number }[];
  exhaustionMonths: number;
}

export interface NetworkLayer {
  type: "L1" | "L2" | "L3";
  visible: boolean;
  name: string;
}

export interface CommandPaletteItem {
  id: string;
  type: "device" | "alert" | "workflow" | "route" | "sla" | "page";
  title: string;
  subtitle: string;
  href: string;
  icon: string;
}
