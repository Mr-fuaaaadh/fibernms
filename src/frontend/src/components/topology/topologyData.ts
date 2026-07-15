// ─── Enterprise Topology Mock Data ───────────────────────────────────────────
// Realistic carrier-grade topology: 3 OLTs, each with 4-6 Splitters, each
// Splitter with 4-8 ONTs. Mix of healthy/warning/critical statuses.

export type NodeStatus = "online" | "warning" | "critical" | "offline";

export interface TopoONT {
  id: string;
  name: string;
  customerName: string;
  ip: string;
  mac: string;
  firmware: string;
  signalLevel: number; // dBm
  status: NodeStatus;
  lastSeen: string;
  uptime: number;
  latency: number; // ms
  packetLoss: number; // %
  alarms: { severity: "critical" | "major" | "minor"; message: string }[];
}

export interface TopoSplitter {
  id: string;
  name: string;
  ip: string;
  mac: string;
  firmware: string;
  location: string;
  status: NodeStatus;
  portCount: number;
  portsUsed: number;
  uptime: number;
  latency: number;
  packetLoss: number;
  onts: TopoONT[];
  alarms: { severity: "critical" | "major" | "minor"; message: string }[];
}

export interface TopoOLT {
  id: string;
  name: string;
  ip: string;
  mac: string;
  firmware: string;
  location: string;
  region: string;
  status: NodeStatus;
  uptime: number; // %
  portTotal: number;
  portUsed: number;
  downstreamGbps: number;
  upstreamGbps: number;
  latency: number;
  packetLoss: number;
  splitters: TopoSplitter[];
  alarms: { severity: "critical" | "major" | "minor"; message: string }[];
}

// ─── ONT factory ─────────────────────────────────────────────────────────────
function makeONT(
  id: string,
  idx: number,
  splPrefix: string,
  status: NodeStatus,
  signal: number,
): TopoONT {
  const alarms: TopoONT["alarms"] = [];
  if (status === "critical") {
    alarms.push({
      severity: "critical",
      message: "Signal below threshold (-28 dBm)",
    });
    alarms.push({ severity: "major", message: "Packet loss > 5% detected" });
  } else if (status === "warning") {
    alarms.push({
      severity: "minor",
      message: "Signal degradation trend detected",
    });
  }
  return {
    id,
    name: `ONT-${splPrefix}-${String(idx).padStart(3, "0")}`,
    customerName: [
      "Acme Corp",
      "BlueStar ISP",
      "Horizon Net",
      "CityFiber",
      "DataPeak Ltd",
      "GlobalLink",
      "FastNet Co",
      "Apex Telecom",
      "TowerBridge ISP",
      "Zenith Net",
      "OmniConnect",
      "SpeedFiber",
      "Pulse Networks",
      "AtlasTech",
      "Vertex ISP",
    ][idx % 15],
    ip: `192.168.${10 + (idx % 20)}.${100 + idx}`,
    mac: `00:1A:2B:${String(idx * 3).padStart(2, "0")}:${String((idx * 7) % 99).padStart(2, "0")}:${String((idx * 11) % 99).padStart(2, "0")}`,
    firmware: `v4.${idx % 3}.${idx % 7}`,
    signalLevel: signal,
    status,
    lastSeen:
      status === "offline"
        ? "3h ago"
        : status === "critical"
          ? "2m ago"
          : "Just now",
    uptime: status === "critical" ? 91.2 : status === "warning" ? 97.4 : 99.8,
    latency:
      status === "critical" ? 45 : status === "warning" ? 18 : 3 + (idx % 8),
    packetLoss: status === "critical" ? 6.2 : status === "warning" ? 1.1 : 0.01,
    alarms,
  };
}

// ─── Full topology data ───────────────────────────────────────────────────────
export const TOPOLOGY_DATA: TopoOLT[] = [
  {
    id: "olt-core-01",
    name: "OLT-CORE-01",
    ip: "192.168.1.1",
    mac: "00:1B:21:AA:01:01",
    firmware: "v9.4.2",
    location: "Data Center Alpha, Rack A-12",
    region: "North",
    status: "online",
    uptime: 99.97,
    portTotal: 16,
    portUsed: 14,
    downstreamGbps: 18.4,
    upstreamGbps: 4.2,
    latency: 2,
    packetLoss: 0.0,
    alarms: [],
    splitters: [
      {
        id: "spl-zone-a1",
        name: "SPL-ZONE-A1",
        ip: "192.168.2.1",
        mac: "00:1B:21:BB:02:01",
        firmware: "v3.2.1",
        location: "Distribution Hub A, Port 1",
        status: "online",
        portCount: 8,
        portsUsed: 6,
        uptime: 99.9,
        latency: 3,
        packetLoss: 0.0,
        alarms: [],
        onts: [
          makeONT("ont-a1-001", 1, "A1", "online", -16),
          makeONT("ont-a1-002", 2, "A1", "online", -18),
          makeONT("ont-a1-003", 3, "A1", "warning", -22),
          makeONT("ont-a1-004", 4, "A1", "online", -15),
          makeONT("ont-a1-005", 5, "A1", "online", -17),
          makeONT("ont-a1-006", 6, "A1", "online", -19),
        ],
      },
      {
        id: "spl-zone-a2",
        name: "SPL-ZONE-A2",
        ip: "192.168.2.2",
        mac: "00:1B:21:BB:02:02",
        firmware: "v3.2.1",
        location: "Distribution Hub A, Port 2",
        status: "online",
        portCount: 8,
        portsUsed: 8,
        uptime: 99.8,
        latency: 4,
        packetLoss: 0.01,
        alarms: [],
        onts: [
          makeONT("ont-a2-001", 7, "A2", "online", -16),
          makeONT("ont-a2-002", 8, "A2", "online", -17),
          makeONT("ont-a2-003", 9, "A2", "online", -20),
          makeONT("ont-a2-004", 10, "A2", "critical", -29),
          makeONT("ont-a2-005", 11, "A2", "online", -15),
        ],
      },
      {
        id: "spl-zone-a3",
        name: "SPL-ZONE-A3",
        ip: "192.168.2.3",
        mac: "00:1B:21:BB:02:03",
        firmware: "v3.1.8",
        location: "Distribution Hub A, Port 3",
        status: "warning",
        portCount: 8,
        portsUsed: 5,
        uptime: 97.6,
        latency: 12,
        packetLoss: 0.8,
        alarms: [
          { severity: "minor", message: "High latency on ports 3-5" },
          { severity: "minor", message: "Optical power fluctuation" },
        ],
        onts: [
          makeONT("ont-a3-001", 12, "A3", "online", -18),
          makeONT("ont-a3-002", 13, "A3", "warning", -24),
          makeONT("ont-a3-003", 14, "A3", "online", -16),
          makeONT("ont-a3-004", 15, "A3", "warning", -23),
        ],
      },
      {
        id: "spl-zone-a4",
        name: "SPL-ZONE-A4",
        ip: "192.168.2.4",
        mac: "00:1B:21:BB:02:04",
        firmware: "v3.2.1",
        location: "Distribution Hub B, Port 1",
        status: "online",
        portCount: 8,
        portsUsed: 7,
        uptime: 99.9,
        latency: 3,
        packetLoss: 0.0,
        alarms: [],
        onts: [
          makeONT("ont-a4-001", 16, "A4", "online", -15),
          makeONT("ont-a4-002", 17, "A4", "online", -17),
          makeONT("ont-a4-003", 18, "A4", "online", -16),
          makeONT("ont-a4-004", 19, "A4", "online", -19),
          makeONT("ont-a4-005", 20, "A4", "online", -18),
          makeONT("ont-a4-006", 21, "A4", "online", -15),
          makeONT("ont-a4-007", 22, "A4", "online", -20),
        ],
      },
    ],
  },
  {
    id: "olt-dist-02",
    name: "OLT-DIST-02",
    ip: "192.168.1.2",
    mac: "00:1B:21:AA:01:02",
    firmware: "v9.3.7",
    location: "Data Center Beta, Rack B-04",
    region: "South",
    status: "warning",
    uptime: 97.82,
    portTotal: 16,
    portUsed: 11,
    downstreamGbps: 12.1,
    upstreamGbps: 2.8,
    latency: 8,
    packetLoss: 0.12,
    alarms: [
      {
        severity: "major",
        message: "Port 7 signal degradation — 3h sustained",
      },
      { severity: "minor", message: "Firmware upgrade available (v9.4.2)" },
    ],
    splitters: [
      {
        id: "spl-zone-b1",
        name: "SPL-ZONE-B1",
        ip: "192.168.3.1",
        mac: "00:1B:21:CC:03:01",
        firmware: "v3.2.1",
        location: "Cabinet B1, Street Level",
        status: "online",
        portCount: 8,
        portsUsed: 6,
        uptime: 99.7,
        latency: 5,
        packetLoss: 0.02,
        alarms: [],
        onts: [
          makeONT("ont-b1-001", 23, "B1", "online", -17),
          makeONT("ont-b1-002", 24, "B1", "online", -16),
          makeONT("ont-b1-003", 25, "B1", "online", -19),
          makeONT("ont-b1-004", 26, "B1", "online", -15),
          makeONT("ont-b1-005", 27, "B1", "online", -18),
        ],
      },
      {
        id: "spl-zone-b2",
        name: "SPL-ZONE-B2",
        ip: "192.168.3.2",
        mac: "00:1B:21:CC:03:02",
        firmware: "v3.1.8",
        location: "Cabinet B2, Street Level",
        status: "critical",
        portCount: 8,
        portsUsed: 8,
        uptime: 88.3,
        latency: 38,
        packetLoss: 4.5,
        alarms: [
          { severity: "critical", message: "Optical link failure on port 4" },
          { severity: "critical", message: "3 ONTs unreachable downstream" },
          {
            severity: "major",
            message: "Splitter receive power below -27 dBm",
          },
        ],
        onts: [
          makeONT("ont-b2-001", 28, "B2", "critical", -30),
          makeONT("ont-b2-002", 29, "B2", "offline", -35),
          makeONT("ont-b2-003", 30, "B2", "critical", -29),
          makeONT("ont-b2-004", 31, "B2", "warning", -25),
          makeONT("ont-b2-005", 32, "B2", "online", -17),
          makeONT("ont-b2-006", 33, "B2", "offline", -40),
        ],
      },
      {
        id: "spl-zone-b3",
        name: "SPL-ZONE-B3",
        ip: "192.168.3.3",
        mac: "00:1B:21:CC:03:03",
        firmware: "v3.2.1",
        location: "Cabinet B3, Rooftop",
        status: "online",
        portCount: 8,
        portsUsed: 4,
        uptime: 99.9,
        latency: 4,
        packetLoss: 0.0,
        alarms: [],
        onts: [
          makeONT("ont-b3-001", 34, "B3", "online", -15),
          makeONT("ont-b3-002", 35, "B3", "online", -18),
          makeONT("ont-b3-003", 36, "B3", "online", -16),
          makeONT("ont-b3-004", 37, "B3", "online", -20),
        ],
      },
      {
        id: "spl-zone-b4",
        name: "SPL-ZONE-B4",
        ip: "192.168.3.4",
        mac: "00:1B:21:CC:03:04",
        firmware: "v3.2.0",
        location: "Cabinet B4, Underground",
        status: "warning",
        portCount: 8,
        portsUsed: 5,
        uptime: 96.1,
        latency: 16,
        packetLoss: 0.9,
        alarms: [
          { severity: "minor", message: "Intermittent TX power variation" },
        ],
        onts: [
          makeONT("ont-b4-001", 38, "B4", "online", -18),
          makeONT("ont-b4-002", 39, "B4", "warning", -23),
          makeONT("ont-b4-003", 40, "B4", "online", -19),
          makeONT("ont-b4-004", 41, "B4", "online", -17),
          makeONT("ont-b4-005", 42, "B4", "warning", -24),
        ],
      },
      {
        id: "spl-zone-b5",
        name: "SPL-ZONE-B5",
        ip: "192.168.3.5",
        mac: "00:1B:21:CC:03:05",
        firmware: "v3.2.1",
        location: "Cabinet B5, Street Level",
        status: "online",
        portCount: 8,
        portsUsed: 6,
        uptime: 99.8,
        latency: 3,
        packetLoss: 0.01,
        alarms: [],
        onts: [
          makeONT("ont-b5-001", 43, "B5", "online", -16),
          makeONT("ont-b5-002", 44, "B5", "online", -15),
          makeONT("ont-b5-003", 45, "B5", "online", -17),
          makeONT("ont-b5-004", 46, "B5", "online", -18),
          makeONT("ont-b5-005", 47, "B5", "online", -16),
          makeONT("ont-b5-006", 48, "B5", "online", -19),
        ],
      },
    ],
  },
  {
    id: "olt-edge-03",
    name: "OLT-EDGE-03",
    ip: "192.168.1.3",
    mac: "00:1B:21:AA:01:03",
    firmware: "v9.4.2",
    location: "Edge PoP Site C, Rack C-01",
    region: "East",
    status: "online",
    uptime: 99.91,
    portTotal: 8,
    portUsed: 7,
    downstreamGbps: 9.6,
    upstreamGbps: 2.1,
    latency: 3,
    packetLoss: 0.0,
    alarms: [],
    splitters: [
      {
        id: "spl-zone-c1",
        name: "SPL-ZONE-C1",
        ip: "192.168.4.1",
        mac: "00:1B:21:DD:04:01",
        firmware: "v3.2.1",
        location: "Node C1, Industrial Zone",
        status: "online",
        portCount: 8,
        portsUsed: 8,
        uptime: 99.9,
        latency: 4,
        packetLoss: 0.0,
        alarms: [],
        onts: [
          makeONT("ont-c1-001", 49, "C1", "online", -16),
          makeONT("ont-c1-002", 50, "C1", "online", -15),
          makeONT("ont-c1-003", 51, "C1", "online", -17),
          makeONT("ont-c1-004", 52, "C1", "online", -18),
          makeONT("ont-c1-005", 53, "C1", "online", -16),
          makeONT("ont-c1-006", 54, "C1", "online", -20),
          makeONT("ont-c1-007", 55, "C1", "online", -15),
          makeONT("ont-c1-008", 56, "C1", "online", -17),
        ],
      },
      {
        id: "spl-zone-c2",
        name: "SPL-ZONE-C2",
        ip: "192.168.4.2",
        mac: "00:1B:21:DD:04:02",
        firmware: "v3.2.1",
        location: "Node C2, Residential Zone",
        status: "online",
        portCount: 8,
        portsUsed: 5,
        uptime: 99.7,
        latency: 5,
        packetLoss: 0.01,
        alarms: [],
        onts: [
          makeONT("ont-c2-001", 57, "C2", "online", -17),
          makeONT("ont-c2-002", 58, "C2", "online", -16),
          makeONT("ont-c2-003", 59, "C2", "online", -19),
          makeONT("ont-c2-004", 60, "C2", "online", -15),
          makeONT("ont-c2-005", 61, "C2", "online", -18),
        ],
      },
      {
        id: "spl-zone-c3",
        name: "SPL-ZONE-C3",
        ip: "192.168.4.3",
        mac: "00:1B:21:DD:04:03",
        firmware: "v3.2.0",
        location: "Node C3, Business Park",
        status: "warning",
        portCount: 8,
        portsUsed: 6,
        uptime: 95.4,
        latency: 21,
        packetLoss: 1.4,
        alarms: [
          { severity: "minor", message: "Downstream power loss on ports 5-6" },
        ],
        onts: [
          makeONT("ont-c3-001", 62, "C3", "online", -18),
          makeONT("ont-c3-002", 63, "C3", "warning", -25),
          makeONT("ont-c3-003", 64, "C3", "online", -16),
          makeONT("ont-c3-004", 65, "C3", "warning", -24),
          makeONT("ont-c3-005", 66, "C3", "online", -17),
          makeONT("ont-c3-006", 67, "C3", "online", -19),
        ],
      },
      {
        id: "spl-zone-c4",
        name: "SPL-ZONE-C4",
        ip: "192.168.4.4",
        mac: "00:1B:21:DD:04:04",
        firmware: "v3.2.1",
        location: "Node C4, Suburban",
        status: "online",
        portCount: 8,
        portsUsed: 4,
        uptime: 99.9,
        latency: 3,
        packetLoss: 0.0,
        alarms: [],
        onts: [
          makeONT("ont-c4-001", 68, "C4", "online", -15),
          makeONT("ont-c4-002", 69, "C4", "online", -17),
          makeONT("ont-c4-003", 70, "C4", "online", -16),
          makeONT("ont-c4-004", 71, "C4", "online", -18),
        ],
      },
    ],
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────
export type AnyTopoNode =
  | { kind: "olt"; data: TopoOLT }
  | { kind: "splitter"; data: TopoSplitter; oltId: string }
  | { kind: "ont"; data: TopoONT; splitterId: string; oltId: string };

export function getAllNodes(): AnyTopoNode[] {
  const result: AnyTopoNode[] = [];
  for (const olt of TOPOLOGY_DATA) {
    result.push({ kind: "olt", data: olt });
    for (const spl of olt.splitters) {
      result.push({ kind: "splitter", data: spl, oltId: olt.id });
      for (const ont of spl.onts) {
        result.push({
          kind: "ont",
          data: ont,
          splitterId: spl.id,
          oltId: olt.id,
        });
      }
    }
  }
  return result;
}

export function getStatusCounts() {
  const allNodes = getAllNodes();
  return {
    total: allNodes.length,
    online: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "online",
    ).length,
    warning: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "warning",
    ).length,
    critical: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "critical",
    ).length,
    offline: allNodes.filter(
      (n) => (n.kind === "olt" ? n.data : n.data).status === "offline",
    ).length,
  };
}
