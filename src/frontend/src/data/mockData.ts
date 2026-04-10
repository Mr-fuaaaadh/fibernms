import type {
  Alert,
  AuditLog,
  CapacityRecord,
  Device,
  FiberRoute,
  PredictiveAlert,
  SLARecord,
} from "../types/network";
import { Plan } from "../types/subscription";

// Mulberry32 seeded PRNG — no imports needed, fully deterministic
function mulberry32(initialSeed: number) {
  let seed = initialSeed;
  return () => {
    seed += 0x6d2b79f5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(42);

function rand() {
  return rng();
}
function randInt(min: number, max: number) {
  return Math.floor(rand() * (max - min + 1)) + min;
}
function randFrom<T>(arr: T[]): T {
  return arr[Math.floor(rand() * arr.length)];
}
function randFloat(min: number, max: number, decimals = 2) {
  return Number.parseFloat((rand() * (max - min) + min).toFixed(decimals));
}

// ─── Region Seeds ────────────────────────────────────────────────────────────
const REGIONS = [
  { name: "North America", lat: 40.7128, lng: -74.006, dlat: 5, dlng: 10 },
  { name: "Europe", lat: 51.5074, lng: -0.1278, dlat: 4, dlng: 8 },
  { name: "Asia-Pacific", lat: 35.6762, lng: 139.6503, dlat: 6, dlng: 12 },
  { name: "Middle East", lat: 25.2048, lng: 55.2708, dlat: 3, dlng: 6 },
  { name: "South America", lat: -23.5505, lng: -46.6333, dlat: 4, dlng: 8 },
];

const _REGIONS_REF = REGIONS; // avoid unused warning — used below

const CUSTOMER_NAMES = [
  "TeleCorp Global",
  "NetStream Asia",
  "FiberLink EU",
  "OptiComm ME",
  "SkyNet Brasil",
  "PacificNet Co",
  "AtlanticFiber",
  "AlphaISP Ltd",
  "NovaTel Inc",
  "ClearPath ISP",
  "DataBridge LLC",
  "SpeedWave Corp",
  "CoreNet Systems",
  "ZenithTel",
  "ApexFiber Group",
  "OrbitISP",
  "SignalPath Inc",
  "HorizonNet",
  "PrimeFiber",
  "NexusComm",
];

const USER_NAMES = [
  "Alice Chen",
  "Bob Martinez",
  "Carla Schmidt",
  "David Okafor",
  "Elena Petrov",
  "Frank Liu",
  "Grace Nguyen",
  "Hassan Ali",
];

const ISSUE_TYPES = [
  "Signal Loss — RX power below threshold",
  "High BER — Bit error rate exceeded",
  "Device Offline — No response",
  "Fiber Break Detected — OTDR event",
  "Weak Signal — Marginal RX power",
  "Port Saturation — Capacity exceeded",
  "Temperature Alert — Module overheating",
  "Packet Loss Spike — >5% threshold",
  "Latency Spike — >50ms threshold",
  "Power Supply Warning — Voltage fluctuation",
];

// ─── Devices ─────────────────────────────────────────────────────────────────
export const mockDevices: Device[] = (() => {
  const devices: Device[] = [];

  for (let ri = 0; ri < REGIONS.length; ri++) {
    const region = REGIONS[ri];

    // 2 OLTs per region = 10 total
    for (let oi = 0; oi < 2; oi++) {
      const oltId = `olt-r${ri}-${oi}`;
      const oltLat = region.lat + randFloat(-region.dlat, region.dlat);
      const oltLng = region.lng + randFloat(-region.dlng, region.dlng);
      const oltStatus =
        rand() < 0.85 ? "active" : rand() < 0.5 ? "warning" : "faulty";

      devices.push({
        id: oltId,
        name: `OLT-${region.name.slice(0, 2).toUpperCase()}-${ri}${oi}`,
        type: "OLT",
        lat: oltLat,
        lng: oltLng,
        ports: randFrom([8, 16, 32]),
        status: oltStatus as Device["status"],
        connectedTo: [],
        location: `${region.name} Core Exchange ${oi + 1}`,
        signalStrength: randFloat(-22, -14),
        uptime: randFloat(95, 99.99),
        region: region.name,
      });

      // 10 splitters per OLT = 100 total
      for (let si = 0; si < 10; si++) {
        const splId = `spl-r${ri}-${oi}-${si}`;
        const splLat = oltLat + randFloat(-0.5, 0.5);
        const splLng = oltLng + randFloat(-0.5, 0.5);
        const splStatus =
          rand() < 0.8 ? "active" : rand() < 0.5 ? "warning" : "faulty";

        devices.push({
          id: splId,
          name: `SPL-${region.name.slice(0, 2).toUpperCase()}${ri}${oi}${si}`,
          type: "Splitter",
          lat: splLat,
          lng: splLng,
          ports: randFrom([4, 8, 16]),
          status: splStatus as Device["status"],
          connectedTo: [oltId],
          location: `Distribution Point ${ri}-${oi}-${si}`,
          signalStrength: randFloat(-30, -22),
          uptime: randFloat(88, 100),
          region: region.name,
        });

        // ~4 ONTs per splitter = ~400 total (440 across 5 regions)
        const ontCount = si < 8 ? 4 : 5; // last 2 splitters per OLT get 5 ONTs
        for (let ni = 0; ni < ontCount; ni++) {
          const ontId = `ont-r${ri}-${oi}-${si}-${ni}`;
          const ontStatus =
            rand() < 0.82 ? "active" : rand() < 0.5 ? "warning" : "faulty";

          devices.push({
            id: ontId,
            name: `ONT-${region.name.slice(0, 2).toUpperCase()}${ri}${oi}${si}${ni}`,
            type: "ONT",
            lat: splLat + randFloat(-0.05, 0.05),
            lng: splLng + randFloat(-0.05, 0.05),
            ports: 4,
            status: ontStatus as Device["status"],
            connectedTo: [splId],
            location: `${randInt(1, 999)} ${randFrom(["Main St", "Fiber Ave", "Network Blvd", "Signal Rd"])}`,
            signalStrength: randFloat(-34, -24),
            uptime: ontStatus === "faulty" ? 0 : randFloat(85, 99.9),
            region: region.name,
          });
        }
      }
    }
  }

  // Add JJBs and Switches
  for (let i = 0; i < 10; i++) {
    const region = REGIONS[i % REGIONS.length];
    devices.push({
      id: `jjb-${i}`,
      name: `JJB-TRUNK-${String(i + 1).padStart(2, "0")}`,
      type: "JJB",
      lat: region.lat + randFloat(-2, 2),
      lng: region.lng + randFloat(-2, 2),
      ports: randFrom([12, 24, 48]),
      status: rand() < 0.9 ? "active" : "warning",
      connectedTo: [],
      location: `Manhole J-${randInt(100, 999)}, ${region.name}`,
      signalStrength: randFloat(-22, -16),
      uptime: randFloat(97, 99.99),
      region: region.name,
    });
  }

  for (let i = 0; i < 5; i++) {
    const region = REGIONS[i % REGIONS.length];
    devices.push({
      id: `sw-${i}`,
      name: `SW-AGG-${String(i + 1).padStart(2, "0")}`,
      type: "Switch",
      lat: region.lat + randFloat(-1, 1),
      lng: region.lng + randFloat(-1, 1),
      ports: randFrom([24, 48, 96]),
      status: "active",
      connectedTo: [],
      location: `Aggregation Rack, ${region.name} Core DC`,
      signalStrength: randFloat(-18, -12),
      uptime: randFloat(99.5, 99.99),
      region: region.name,
    });
  }

  return devices;
})();

// ─── Fiber Routes ─────────────────────────────────────────────────────────────
export const mockRoutes: FiberRoute[] = (() => {
  const routes: FiberRoute[] = [];
  const types: FiberRoute["type"][] = ["backbone", "distribution", "drop"];

  for (let ri = 0; ri < REGIONS.length; ri++) {
    const region = REGIONS[ri];
    for (let i = 0; i < 4; i++) {
      const routeType = types[i % 3];
      const status: FiberRoute["status"] =
        rand() < 0.85 ? "active" : rand() < 0.5 ? "warning" : "faulty";
      const wpCount = randInt(2, 5);
      const waypoints = Array.from({ length: wpCount }, () => ({
        lat: region.lat + randFloat(-region.dlat * 0.5, region.dlat * 0.5),
        lng: region.lng + randFloat(-region.dlng * 0.5, region.dlng * 0.5),
      }));

      routes.push({
        id: `route-r${ri}-${i}`,
        name: `${routeType.toUpperCase()}-${region.name.slice(0, 2).toUpperCase()}-${ri}${i}`,
        type: routeType,
        waypoints,
        distanceKm: randFloat(0.5, 50),
        status,
      });
    }
  }

  return routes;
})();

// ─── Alerts ───────────────────────────────────────────────────────────────────
export const mockAlerts: Alert[] = (() => {
  const alerts: Alert[] = [];
  const severities: Alert["severity"][] = [
    "critical",
    "critical",
    "warning",
    "warning",
    "info",
  ];

  for (let i = 0; i < 200; i++) {
    const device = mockDevices[randInt(0, mockDevices.length - 1)];
    const severity = randFrom(severities);
    alerts.push({
      id: `alert-${i}`,
      deviceId: device.id,
      deviceName: device.name,
      issueType: randFrom(ISSUE_TYPES),
      timestamp: Date.now() - randInt(0, 1000 * 60 * 60 * 24 * 7), // within last week
      severity,
      resolved: rand() < 0.4,
    });
  }

  return alerts;
})();

// ─── SLA Records ──────────────────────────────────────────────────────────────
export const mockSLARecords: SLARecord[] = (() => {
  return Array.from({ length: 20 }, (_, i) => {
    const latency = randFloat(2, 80);
    const packetLoss = randFloat(0, 3);
    const uptime = randFloat(95, 99.99);
    let status: SLARecord["status"] = "compliant";
    if (latency > 50 || packetLoss > 1.5 || uptime < 99) status = "warning";
    if (latency > 70 || packetLoss > 2.5 || uptime < 97) status = "breach";

    return {
      id: `sla-${i}`,
      customerId: `cust-${i}`,
      customerName: CUSTOMER_NAMES[i],
      region: randFrom(REGIONS).name,
      latency,
      packetLoss,
      uptime,
      status,
      lastChecked: Date.now() - randInt(0, 1000 * 60 * 60),
    };
  });
})();

// ─── Predictive Alerts ────────────────────────────────────────────────────────
export const mockPredictiveAlerts: PredictiveAlert[] = (() => {
  const failureTypes: PredictiveAlert["failureType"][] = [
    "fiber-cut",
    "signal-degradation",
    "device-failure",
  ];

  return Array.from({ length: 60 }, (_, i) => {
    const device = mockDevices[randInt(0, mockDevices.length - 1)];
    const riskScore = randInt(10, 98);
    return {
      id: `pred-${i}`,
      deviceId: device.id,
      deviceName: device.name,
      riskScore,
      failureType: randFrom(failureTypes),
      predictedETA: randFloat(0.5, 72, 1),
      status: rand() < 0.75 ? "active" : "resolved",
    };
  });
})();

// ─── Audit Logs ───────────────────────────────────────────────────────────────
export const mockAuditLogs: AuditLog[] = (() => {
  const actionTypes: AuditLog["actionType"][] = [
    "device-change",
    "device-change",
    "user-action",
    "user-action",
    "workflow-execution",
    "system",
  ];
  const actions = [
    "Updated device configuration",
    "Resolved fault alert",
    "Modified SLA threshold",
    "Ran OTDR scan",
    "Executed failover workflow",
    "Deleted offline device",
    "Added new fiber route",
    "Changed device status",
    "Exported audit report",
    "Acknowledged alarm",
    "Updated firmware",
    "Triggered capacity rebalance",
  ];

  return Array.from({ length: 120 }, (_, i) => {
    const device = mockDevices[randInt(0, mockDevices.length - 1)];
    const user = USER_NAMES[randInt(0, USER_NAMES.length - 1)];
    const actionType = randFrom(actionTypes);
    const action = randFrom(actions);

    return {
      id: `log-${i}`,
      timestamp: Date.now() - randInt(0, 1000 * 60 * 60 * 24 * 30),
      userId: `user-${USER_NAMES.indexOf(user)}`,
      userName: user,
      action,
      actionType,
      targetId: device.id,
      targetName: device.name,
      details: `${action} on ${device.name} in ${device.region ?? "Unknown"}`,
      status: rand() < 0.92 ? "success" : "failure",
    };
  });
})();

// ─── Capacity Records ─────────────────────────────────────────────────────────
export const mockCapacityRecords: CapacityRecord[] = (() => {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonth = new Date().getMonth();

  return Array.from({ length: 10 }, (_, i) => {
    const region = REGIONS[i % REGIONS.length];
    const route = mockRoutes[i % mockRoutes.length];
    const currentUtil = randFloat(40, 92);
    const maxCapacity = randFrom([10, 40, 100, 400]);

    // Forecast: next 12 months of utilization trending upward
    const forecastData = MONTHS.map((month, mi) => {
      const monthOffset = (mi - currentMonth + 12) % 12;
      const growth = monthOffset * randFloat(0.5, 2.5);
      return { month, utilization: Math.min(100, currentUtil + growth) };
    });

    const exhaustionMonths = Math.ceil(
      (100 - currentUtil) / randFloat(0.5, 2.5),
    );

    return {
      id: `cap-${i}`,
      routeId: route.id,
      routeName: `${region.name} Backbone ${i + 1}`,
      region: region.name,
      currentUtilization: currentUtil,
      maxCapacity,
      forecastData,
      exhaustionMonths,
    };
  });
})();

// ─── Legacy aliases for existing pages ────────────────────────────────────────
export { mockRoutes as mockFiberRoutes };

// ─── Plan-Aware Mock Data Generator ──────────────────────────────────────────
// Returns a scaled dataset based on subscription plan tier.
// Does NOT modify any of the exported constants above.
export interface PlanAwareMockData {
  devices: Device[];
  alerts: Alert[];
  routes: FiberRoute[];
  deviceCount: number;
}

const PLAN_SCALE: Record<Plan, number> = {
  [Plan.BASIC]: 0.05, // ~500 devices from base
  [Plan.PROFESSIONAL]: 0.5, // ~5,000 devices
  [Plan.ENTERPRISE]: 1.0, // ~10,000 devices (full base set)
  [Plan.ULTRA]: 10.0, // ~100,000 devices (10x base via synthetic expansion)
};

export function generatePlanAwareMockData(plan: Plan): PlanAwareMockData {
  const scale = PLAN_SCALE[plan];

  // Slice or expand devices
  let devices: Device[];
  if (scale <= 1.0) {
    const count = Math.round(mockDevices.length * scale);
    devices = mockDevices.slice(0, count);
  } else {
    // Expand beyond the base set by cloning with modified IDs (ULTRA tier)
    const repeats = Math.ceil(scale);
    const expanded: Device[] = [];
    for (let rep = 0; rep < repeats; rep++) {
      for (const d of mockDevices) {
        expanded.push({
          ...d,
          id: rep === 0 ? d.id : `${d.id}-x${rep}`,
          name: rep === 0 ? d.name : `${d.name}-${rep}`,
          connectedTo: d.connectedTo.map((cid) =>
            rep === 0 ? cid : `${cid}-x${rep}`,
          ),
        });
      }
    }
    devices = expanded.slice(0, 100_000);
  }

  const deviceIdSet = new Set(devices.map((d) => d.id));

  // Scale alerts proportionally (cap to devices in set)
  const alertCount = Math.min(
    Math.round(mockAlerts.length * Math.min(scale, 1)),
    mockAlerts.length,
  );
  const alerts = mockAlerts
    .filter((a) => deviceIdSet.has(a.deviceId))
    .slice(0, alertCount);

  // Scale routes proportionally
  const routeCount = Math.max(
    1,
    Math.round(mockRoutes.length * Math.min(scale, 1)),
  );
  const routes = mockRoutes.slice(0, routeCount);

  return { devices, alerts, routes, deviceCount: devices.length };
}
