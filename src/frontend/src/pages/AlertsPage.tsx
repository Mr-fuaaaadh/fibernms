/**
 * AlertsPage.tsx — Enterprise-grade Alerts & Notifications NOC dashboard
 * Full-featured alert management: KPI summary, filters, search, bulk actions,
 * real-time simulation, detail slide-out panel, mobile bottom sheet.
 */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  BellOff,
  Cable,
  CheckCheck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Filter,
  Info,
  MapPin,
  RefreshCw,
  Search,
  Server,
  Shield,
  SlidersHorizontal,
  Trash2,
  Users,
  Wifi,
  WifiOff,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Severity = "critical" | "warning" | "info";
type AlertStatus = "active" | "acknowledged" | "resolved";
type AlertCategory =
  | "fault"
  | "system"
  | "device_down"
  | "cable_cut"
  | "performance"
  | "maintenance";

interface NOCAlert {
  id: string;
  title: string;
  description: string;
  deviceName: string;
  deviceType: "OLT" | "ONT" | "Splitter" | "Router" | "Cable" | "System";
  location: string;
  region: string;
  severity: Severity;
  status: AlertStatus;
  category: AlertCategory;
  affectedCustomers: number;
  timestamp: number;
  acknowledgedBy?: string;
  acknowledgedAt?: number;
  resolutionSteps: string[];
  relatedAlertIds: string[];
  ticketId: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const BASE_TS = Date.now();
const m = (min: number) => BASE_TS - min * 60 * 1000;

const MOCK_ALERTS: NOCAlert[] = [
  {
    id: "ALT-001",
    title: "Fiber Cable Cut Detected",
    description:
      "Physical fiber break detected on backbone route B-NA-01 between relay nodes. OTDR event logged at 4.2 km marker. Immediate field dispatch required.",
    deviceName: "BACKBONE-NA-01",
    deviceType: "Cable",
    location: "North America Core Exchange 1",
    region: "North America",
    severity: "critical",
    status: "active",
    category: "cable_cut",
    affectedCustomers: 847,
    timestamp: m(3),
    resolutionSteps: [
      "Dispatch field team to 4.2 km marker",
      "Perform OTDR sweep to pinpoint break",
      "Splice fiber cable — estimated 2–4 hours",
      "Verify signal restoration on affected ONTs",
    ],
    relatedAlertIds: ["ALT-002", "ALT-003"],
    ticketId: "TKT-20240428-001",
  },
  {
    id: "ALT-002",
    title: "OLT Core Device Down",
    description:
      "OLT-NA-01 is not responding to SNMP polls. Last successful heartbeat 3 minutes ago. Power supply fault suspected. Cascade impact on downstream splitters.",
    deviceName: "OLT-NA-01",
    deviceType: "OLT",
    location: "North America Core Exchange 1",
    region: "North America",
    severity: "critical",
    status: "active",
    category: "device_down",
    affectedCustomers: 312,
    timestamp: m(4),
    resolutionSteps: [
      "Check power supply unit LED indicators",
      "SSH into management port — verify process status",
      "Reload OLT if safe (maintenance window only)",
      "Escalate to NOC Level 2 if no response in 15 min",
    ],
    relatedAlertIds: ["ALT-001"],
    ticketId: "TKT-20240428-002",
  },
  {
    id: "ALT-003",
    title: "Splitter Array Offline — Zone C",
    description:
      "Eight downstream splitters in Zone C, North America have lost upstream connectivity. Likely upstream OLT failure causing cascade outage.",
    deviceName: "SPL-NA-ZONE-C",
    deviceType: "Splitter",
    location: "Zone C Distribution Hub, NA",
    region: "North America",
    severity: "critical",
    status: "active",
    category: "device_down",
    affectedCustomers: 203,
    timestamp: m(5),
    resolutionSteps: [
      "Verify upstream OLT status first",
      "Check fiber patch panel connections",
      "Inspect for physical damage at distribution hub",
    ],
    relatedAlertIds: ["ALT-002"],
    ticketId: "TKT-20240428-003",
  },
  {
    id: "ALT-004",
    title: "High Packet Loss — Europe Metro",
    description:
      "Packet loss exceeding 8% threshold on METRO-EU-03. Affecting business SLA customers. Root cause under investigation — possible micro-bend in feeder cable.",
    deviceName: "OLT-METRO-EU-03",
    deviceType: "OLT",
    location: "Europe Metro Exchange 3",
    region: "Europe",
    severity: "critical",
    status: "acknowledged",
    category: "performance",
    affectedCustomers: 156,
    timestamp: m(12),
    acknowledgedBy: "Maria Schmidt",
    acknowledgedAt: m(8),
    resolutionSteps: [
      "Run OTDR on feeder route EU-F03",
      "Check connector cleanliness at OLT patch panel",
      "Monitor BER trend over next 30 minutes",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-004",
  },
  {
    id: "ALT-005",
    title: "Latency Spike — Asia-Pacific Ring",
    description:
      "Round-trip latency on AP-RING-02 has spiked to 94ms, exceeding 50ms SLA threshold. 34 enterprise customers on breach status.",
    deviceName: "RTR-AP-RING-02",
    deviceType: "Router",
    location: "Asia-Pacific Peering Hub 2",
    region: "Asia-Pacific",
    severity: "critical",
    status: "active",
    category: "performance",
    affectedCustomers: 34,
    timestamp: m(7),
    resolutionSteps: [
      "Check BGP routing table for asymmetric path",
      "Verify backbone link utilization",
      "Engage upstream carrier if external routing issue",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-005",
  },
  {
    id: "ALT-006",
    title: "ONT Signal Degradation — Residential Block 7",
    description:
      "23 ONTs in residential block 7 showing RX power below -27 dBm threshold. Likely splitter degradation or connector issue at distribution point.",
    deviceName: "SPL-EU-BLOCK7",
    deviceType: "Splitter",
    location: "Residential Block 7, London",
    region: "Europe",
    severity: "warning",
    status: "active",
    category: "performance",
    affectedCustomers: 23,
    timestamp: m(18),
    resolutionSteps: [
      "Inspect 2:8 splitter at DP-LON-B7",
      "Clean APC connectors",
      "Measure insertion loss — replace if >3.5 dB over spec",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-006",
  },
  {
    id: "ALT-007",
    title: "Router High CPU Utilization",
    description:
      "RTR-ME-01 CPU sustained above 92% for 15 minutes. Risk of route flap. Traffic engineering recommended to redistribute load.",
    deviceName: "RTR-ME-01",
    deviceType: "Router",
    location: "Middle East PoP 1, Dubai",
    region: "Middle East",
    severity: "warning",
    status: "acknowledged",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(22),
    acknowledgedBy: "Ahmed Al-Farsi",
    acknowledgedAt: m(18),
    resolutionSteps: [
      "Check for routing table instability (BGP/OSPF flaps)",
      "Rate-limit any DDoS traffic if detected",
      "Offload non-critical traffic to backup path",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-007",
  },
  {
    id: "ALT-008",
    title: "Cable Cut — Distribution Route SA-D02",
    description:
      "OTDR event detected on distribution route SA-D02, Brazil. Break at 12.7 km from distribution hub. 67 customers offline.",
    deviceName: "DIST-SA-02",
    deviceType: "Cable",
    location: "São Paulo Distribution Zone 2",
    region: "South America",
    severity: "critical",
    status: "active",
    category: "cable_cut",
    affectedCustomers: 67,
    timestamp: m(9),
    resolutionSteps: [
      "Dispatch field crew to 12.7 km marker on SA-D02",
      "Aerial survey if underground route inaccessible",
      "Prepare splicing kit — single-mode G.652D",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-008",
  },
  {
    id: "ALT-009",
    title: "Scheduled Maintenance — AP-BACKBONE-01",
    description:
      "Planned maintenance window for AP-BACKBONE-01 firmware upgrade. Service interruption expected 02:00–04:00 UTC. Customer notifications sent.",
    deviceName: "OLT-AP-CORE-01",
    deviceType: "OLT",
    location: "Asia-Pacific Core, Tokyo",
    region: "Asia-Pacific",
    severity: "info",
    status: "acknowledged",
    category: "maintenance",
    affectedCustomers: 0,
    timestamp: m(120),
    acknowledgedBy: "Yuki Tanaka",
    acknowledgedAt: m(115),
    resolutionSteps: [
      "Verify backup path is active before starting",
      "Follow maintenance checklist TKT-MCK-0428",
      "Post-upgrade: run smoke tests on all services",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-009",
  },
  {
    id: "ALT-010",
    title: "Power Supply Warning — OLT-EU-EDGE-04",
    description:
      "Redundant power supply B on OLT-EU-EDGE-04 showing voltage fluctuation (±2.3V outside spec). Primary PSU healthy. Risk of failover.",
    deviceName: "OLT-EU-EDGE-04",
    deviceType: "OLT",
    location: "Europe Edge PoP 4, Frankfurt",
    region: "Europe",
    severity: "warning",
    status: "active",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(35),
    resolutionSteps: [
      "Check UPS output voltage at OLT rack",
      "Inspect PDU branch circuit breaker",
      "Schedule PSU-B replacement within 48 hours",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-010",
  },
  {
    id: "ALT-011",
    title: "Port Saturation Alert — OLT-NA-METRO-02",
    description:
      "Port utilization on OLT-NA-METRO-02 has reached 97% capacity. New customer provisioning blocked. Capacity expansion required.",
    deviceName: "OLT-NA-METRO-02",
    deviceType: "OLT",
    location: "North America Metro 2, Chicago",
    region: "North America",
    severity: "warning",
    status: "active",
    category: "performance",
    affectedCustomers: 0,
    timestamp: m(48),
    resolutionSteps: [
      "Audit connected ONTs for decommissioned services",
      "Submit capacity expansion request (ETA 2 weeks)",
      "Offload non-critical ONTs to OLT-NA-METRO-03",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-011",
  },
  {
    id: "ALT-012",
    title: "Authentication Failure — SNMP Agent",
    description:
      "Multiple SNMP authentication failures detected on NMS polling for EU cluster. Possible credential rotation required or unauthorized polling source.",
    deviceName: "SNMP-AGENT-EU",
    deviceType: "System",
    location: "EU NMS Cluster",
    region: "Europe",
    severity: "warning",
    status: "active",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(55),
    resolutionSteps: [
      "Check NMS SNMP community string configuration",
      "Review access control list for SNMP source IPs",
      "Rotate SNMP v3 credentials if breach suspected",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-012",
  },
  {
    id: "ALT-013",
    title: "OLT Temperature Critical",
    description:
      "OLT-ME-02 optical module temperature at 87°C, exceeding 85°C critical threshold. Risk of automatic shutdown. AC cooling fault in rack.",
    deviceName: "OLT-ME-02",
    deviceType: "OLT",
    location: "Middle East Core, Riyadh",
    region: "Middle East",
    severity: "critical",
    status: "active",
    category: "system",
    affectedCustomers: 89,
    timestamp: m(6),
    resolutionSteps: [
      "Check rack cooling unit immediately",
      "Open rack door to reduce ambient temperature",
      "Pre-position spare OLT for emergency swap",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-013",
  },
  {
    id: "ALT-014",
    title: "Customer Impact — Mass ONT Offline",
    description:
      "142 ONTs in South America cluster offline following upstream splitter failure. Customer impact confirmed. Escalated to Tier 2 NOC.",
    deviceName: "SPL-SA-CLUSTER-01",
    deviceType: "Splitter",
    location: "São Paulo ONT Cluster 1",
    region: "South America",
    severity: "critical",
    status: "acknowledged",
    category: "device_down",
    affectedCustomers: 142,
    timestamp: m(15),
    acknowledgedBy: "Carlos Oliveira",
    acknowledgedAt: m(11),
    resolutionSteps: [
      "Replace failed splitter module at SA-DP-01",
      "Reconnect upstream fiber at patch panel",
      "Verify ONT re-registration post-restoration",
    ],
    relatedAlertIds: ["ALT-008"],
    ticketId: "TKT-20240428-014",
  },
  {
    id: "ALT-015",
    title: "Firmware Upgrade Available — OLT Fleet",
    description:
      "New firmware v4.8.2 available for GPON OLT fleet (23 devices). Release notes include CVE-2024-1337 security patch. Upgrade recommended within 7 days.",
    deviceName: "OLT-FLEET-ALL",
    deviceType: "System",
    location: "All Regions",
    region: "Global",
    severity: "info",
    status: "active",
    category: "maintenance",
    affectedCustomers: 0,
    timestamp: m(180),
    resolutionSteps: [
      "Review firmware release notes and CVE advisory",
      "Schedule upgrade during next maintenance window",
      "Test on one OLT in staging before fleet rollout",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-015",
  },
  {
    id: "ALT-016",
    title: "BER Threshold Breach — Route EU-F07",
    description:
      "Bit Error Rate on EU-F07 has exceeded 10^-6 threshold. Signal quality degrading. Possible contaminated connector at splice point.",
    deviceName: "ROUTE-EU-F07",
    deviceType: "Cable",
    location: "Europe Feeder Route 7, Berlin",
    region: "Europe",
    severity: "warning",
    status: "active",
    category: "performance",
    affectedCustomers: 45,
    timestamp: m(28),
    resolutionSteps: [
      "Inspect and clean APC connectors at both ends",
      "Run OTDR — check for reflections or excessive loss events",
      "Monitor BER over next 2 hours before escalation",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-016",
  },
  {
    id: "ALT-017",
    title: "Backup Path Failover Triggered",
    description:
      "Primary backbone link AP-BB-01 failed over to backup path. Capacity reduction from 40G to 10G on affected segment. Primary fault investigation ongoing.",
    deviceName: "AP-BACKBONE-01",
    deviceType: "Cable",
    location: "Asia-Pacific Backbone 1",
    region: "Asia-Pacific",
    severity: "warning",
    status: "acknowledged",
    category: "fault",
    affectedCustomers: 0,
    timestamp: m(42),
    acknowledgedBy: "Lin Wei",
    acknowledgedAt: m(38),
    resolutionSteps: [
      "Investigate primary link AP-BB-01 fault",
      "Monitor backup path utilization (currently 76%)",
      "Restore primary path before backup capacity breach",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-017",
  },
  {
    id: "ALT-018",
    title: "SLA Breach — Enterprise Customer CoreNet",
    description:
      "CoreNet Systems SLA target of 99.95% uptime breached. Current 30-day uptime at 99.81% due to recurring signal issues on drop route.",
    deviceName: "ONT-CORENET-01",
    deviceType: "ONT",
    location: "North America — CoreNet HQ",
    region: "North America",
    severity: "critical",
    status: "active",
    category: "fault",
    affectedCustomers: 1,
    timestamp: m(20),
    resolutionSteps: [
      "Engage account team to notify CoreNet",
      "Dispatch senior field engineer for site survey",
      "Provide SLA credit calculation per contract clause 4.2",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-018",
  },
  {
    id: "ALT-019",
    title: "NMS Database Backup Completed",
    description:
      "Nightly NMS database backup completed successfully. Backup size: 48.3 GB. Offsite replication to DR site verified. Retention policy: 30 days.",
    deviceName: "NMS-DB-PRIMARY",
    deviceType: "System",
    location: "Primary Data Center, NA",
    region: "North America",
    severity: "info",
    status: "resolved",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(360),
    resolutionSteps: [],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-019",
  },
  {
    id: "ALT-020",
    title: "Cable Rodent Damage Suspected — SA-DROP-14",
    description:
      "Multiple ONTs offline on drop route SA-DROP-14. Field crew reports suspected rodent damage to cable sheathing at ground-level splice box.",
    deviceName: "DROP-SA-14",
    deviceType: "Cable",
    location: "São Paulo Drop Zone 14",
    region: "South America",
    severity: "warning",
    status: "active",
    category: "cable_cut",
    affectedCustomers: 18,
    timestamp: m(65),
    resolutionSteps: [
      "Replace damaged cable section with armored conduit",
      "Install rodent protection sleeve at splice box",
      "Document incident for infrastructure hardening report",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-020",
  },
  {
    id: "ALT-021",
    title: "Redundant Fan Failure — Switch Stack NA",
    description:
      "Fan tray 2 failure on Switch-NA-CORE-02. Device operating on fan tray 1 only. Elevated thermal risk. Replacement part on order.",
    deviceName: "SW-NA-CORE-02",
    deviceType: "System",
    location: "North America Core Switch Stack",
    region: "North America",
    severity: "warning",
    status: "acknowledged",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(90),
    acknowledgedBy: "Tom Bradley",
    acknowledgedAt: m(85),
    resolutionSteps: [
      "Order replacement fan tray (P/N: FAN-TRAY-2U)",
      "Monitor thermal readings every 15 minutes",
      "Set automated alert if temp exceeds 75°C",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-021",
  },
  {
    id: "ALT-022",
    title: "ONT Mass Re-Registration Event",
    description:
      "271 ONTs simultaneously re-registered on OLT-EU-02, indicating upstream power cycle or firmware reset. Service interruption < 90 seconds.",
    deviceName: "OLT-EU-02",
    deviceType: "OLT",
    location: "Europe Core Exchange 2, Paris",
    region: "Europe",
    severity: "info",
    status: "resolved",
    category: "system",
    affectedCustomers: 271,
    timestamp: m(420),
    resolutionSteps: [],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-022",
  },
  {
    id: "ALT-023",
    title: "Upstream ISP Link Degradation",
    description:
      "Upstream ISP transit link on ME-TRANSIT-01 showing 12% packet loss. ISP notified. Failover to secondary transit in progress.",
    deviceName: "ME-TRANSIT-01",
    deviceType: "Router",
    location: "Middle East Transit Gateway",
    region: "Middle East",
    severity: "warning",
    status: "active",
    category: "fault",
    affectedCustomers: 0,
    timestamp: m(30),
    resolutionSteps: [
      "Open NOC ticket with upstream ISP (ticket ref: ISP-TKT-28402)",
      "Monitor failover to secondary transit link",
      "Verify customer traffic routing through alternate path",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-023",
  },
  {
    id: "ALT-024",
    title: "SSL Certificate Expiry Warning",
    description:
      "NMS portal SSL certificate expires in 14 days. Auto-renewal via Let's Encrypt should trigger in 7 days. Manual renewal required if automated process fails.",
    deviceName: "NMS-PORTAL",
    deviceType: "System",
    location: "NMS Web Portal",
    region: "Global",
    severity: "info",
    status: "active",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(240),
    resolutionSteps: [
      "Verify certbot auto-renewal cron job is active",
      "Test renewal: `certbot renew --dry-run`",
      "Manual renewal fallback: contact ops team 3 days before expiry",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-024",
  },
  {
    id: "ALT-025",
    title: "Fiber Cut — AP Drop Route 22",
    description:
      "Civil works contractor accidentally severed fiber drop cable on AP-DROP-22 during road construction. 31 customers offline. Contractor liability confirmed.",
    deviceName: "DROP-AP-22",
    deviceType: "Cable",
    location: "Asia-Pacific Drop Zone 22, Osaka",
    region: "Asia-Pacific",
    severity: "critical",
    status: "active",
    category: "cable_cut",
    affectedCustomers: 31,
    timestamp: m(11),
    resolutionSteps: [
      "Coordinate with city works department for access permit",
      "Deploy emergency temporary aerial fiber",
      "Permanent underground reinstatement within 5 business days",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-025",
  },
  {
    id: "ALT-026",
    title: "Monitoring Agent Heartbeat Lost",
    description:
      "NMS monitoring agent on OLT-SA-03 has stopped sending heartbeats. Device may be unreachable or agent process crashed. Last known status: healthy.",
    deviceName: "OLT-SA-03",
    deviceType: "OLT",
    location: "South America Exchange 3, Rio",
    region: "South America",
    severity: "warning",
    status: "active",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(38),
    resolutionSteps: [
      "SSH to OLT-SA-03 and restart monitoring agent",
      "Check process: `systemctl status fibernms-agent`",
      "Verify NMS reachability from OLT management port",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-026",
  },
  {
    id: "ALT-027",
    title: "Planned Upgrade — NMS v3.9.0",
    description:
      "FiberNMS platform upgrade to v3.9.0 scheduled for this weekend. New features: AI-assisted fault prediction, improved Leaflet rendering, SNMP v3 by default.",
    deviceName: "FIBERNMS-PLATFORM",
    deviceType: "System",
    location: "All Regions",
    region: "Global",
    severity: "info",
    status: "active",
    category: "maintenance",
    affectedCustomers: 0,
    timestamp: m(720),
    resolutionSteps: [
      "Review v3.9.0 release notes before upgrade",
      "Backup NMS database before proceeding",
      "Schedule in 4-hour maintenance window (Saturday 02:00 UTC)",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-027",
  },
  {
    id: "ALT-028",
    title: "Disk Usage Warning — Log Server",
    description:
      "Log aggregation server disk usage at 89% capacity. Log rotation policy may need adjustment. Expected to reach 95% in 3 days at current ingestion rate.",
    deviceName: "LOG-SERVER-PRIMARY",
    deviceType: "System",
    location: "Primary Data Center",
    region: "North America",
    severity: "warning",
    status: "active",
    category: "system",
    affectedCustomers: 0,
    timestamp: m(150),
    resolutionSteps: [
      "Purge logs older than 90 days per retention policy",
      "Increase disk allocation or add storage volume",
      "Tune log rotation: reduce retention to 60 days if needed",
    ],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-028",
  },
  {
    id: "ALT-029",
    title: "Micro-Outage Resolved — AP-RING-01",
    description:
      "5-minute micro-outage on AP-RING-01 resolved automatically via protection switching. Root cause: transient fiber stretch event. All services restored.",
    deviceName: "AP-RING-01",
    deviceType: "Cable",
    location: "Asia-Pacific Ring 1",
    region: "Asia-Pacific",
    severity: "info",
    status: "resolved",
    category: "fault",
    affectedCustomers: 12,
    timestamp: m(480),
    resolutionSteps: [],
    relatedAlertIds: [],
    ticketId: "TKT-20240428-029",
  },
  {
    id: "ALT-030",
    title: "Customer Complaint — ZenithTel",
    description:
      "ZenithTel reporting intermittent connectivity on business circuits. Corroborates BER threshold breach on EU-F07. Account Manager notified.",
    deviceName: "ONT-ZENITHTEL-02",
    deviceType: "ONT",
    location: "Europe — ZenithTel Business HQ",
    region: "Europe",
    severity: "warning",
    status: "active",
    category: "fault",
    affectedCustomers: 1,
    timestamp: m(25),
    resolutionSteps: [
      "Cross-reference with ALT-016 (BER breach on EU-F07)",
      "Priority field dispatch for ZenithTel SLA compliance",
      "Send interim communication to ZenithTel account team",
    ],
    relatedAlertIds: ["ALT-016"],
    ticketId: "TKT-20240428-030",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const SEVERITY_CONFIG = {
  critical: {
    label: "Critical",
    icon: AlertCircle,
    badgeClass: "bg-red-500/15 text-red-400 border-red-500/30",
    borderClass: "border-l-red-500",
    bgClass: "bg-red-500/5",
    dotClass: "bg-red-500",
    kpiClass: "text-red-400",
    kpiBg: "bg-red-500/10 border-red-500/20",
  },
  warning: {
    label: "Warning",
    icon: AlertTriangle,
    badgeClass: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    borderClass: "border-l-amber-500",
    bgClass: "bg-amber-500/5",
    dotClass: "bg-amber-500",
    kpiClass: "text-amber-400",
    kpiBg: "bg-amber-500/10 border-amber-500/20",
  },
  info: {
    label: "Info",
    icon: Info,
    badgeClass: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    borderClass: "border-l-blue-500",
    bgClass: "bg-blue-500/5",
    dotClass: "bg-blue-500",
    kpiClass: "text-blue-400",
    kpiBg: "bg-blue-500/10 border-blue-500/20",
  },
} as const;

const STATUS_CONFIG: Record<AlertStatus, { label: string; class: string }> = {
  active: {
    label: "Active",
    class: "bg-red-500/15 text-red-400 border-red-500/30",
  },
  acknowledged: {
    label: "Acknowledged",
    class: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  },
  resolved: {
    label: "Resolved",
    class: "bg-green-500/15 text-green-400 border-green-500/30",
  },
};

const CATEGORY_LABELS: Record<AlertCategory, string> = {
  fault: "Fault Alert",
  system: "System Alert",
  device_down: "Device Down",
  cable_cut: "Cable Cut",
  performance: "Performance",
  maintenance: "Maintenance",
};

const DEVICE_ICONS: Record<NOCAlert["deviceType"], React.ElementType> = {
  OLT: Server,
  ONT: Wifi,
  Splitter: Zap,
  Router: Shield,
  Cable: Cable,
  System: Server,
};

type FilterTab =
  | "all"
  | "critical"
  | "warning"
  | "info"
  | "fault"
  | "system"
  | "device_down"
  | "cable_cut";

const FILTER_TABS: { id: FilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "critical", label: "Critical" },
  { id: "warning", label: "Warning" },
  { id: "info", label: "Info" },
  { id: "fault", label: "Fault Alerts" },
  { id: "system", label: "System Alerts" },
  { id: "device_down", label: "Device Down" },
  { id: "cable_cut", label: "Cable Cut" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const min = Math.floor(s / 60);
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  return `${Math.floor(hr / 24)}d ago`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
  icon: Icon,
  label,
  value,
  colorClass,
  bgClass,
  pulse,
  index,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  colorClass: string;
  bgClass: string;
  pulse?: boolean;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className={cn(
        "glass-card rounded-xl p-4 border flex items-start gap-3",
        bgClass,
      )}
    >
      <div className={cn("p-2 rounded-lg bg-card/60", colorClass)}>
        <Icon size={16} />
      </div>
      <div className="min-w-0">
        <div
          className={cn(
            "text-2xl font-bold font-mono tracking-tight",
            colorClass,
          )}
        >
          {value}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          {pulse && value > 0 && (
            <span className="relative flex h-1.5 w-1.5">
              <span
                className={cn(
                  "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                  colorClass === "text-red-400"
                    ? "bg-red-400"
                    : colorClass === "text-amber-400"
                      ? "bg-amber-400"
                      : "bg-blue-400",
                )}
              />
              <span
                className={cn(
                  "relative inline-flex h-1.5 w-1.5 rounded-full",
                  colorClass === "text-red-400"
                    ? "bg-red-400"
                    : colorClass === "text-amber-400"
                      ? "bg-amber-400"
                      : "bg-blue-400",
                )}
              />
            </span>
          )}
          <span className="text-[11px] text-muted-foreground font-medium truncate">
            {label}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function AlertCard({
  alert,
  selected,
  checked,
  onCheck,
  onClick,
  index,
}: {
  alert: NOCAlert;
  selected: boolean;
  checked: boolean;
  onCheck: (id: string, v: boolean) => void;
  onClick: (alert: NOCAlert) => void;
  index: number;
}) {
  const sev = SEVERITY_CONFIG[alert.severity];
  const DevIcon = DEVICE_ICONS[alert.deviceType];
  const SevIcon = sev.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16, height: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.2), duration: 0.3 }}
      className={cn(
        "glass-card rounded-xl border-l-4 border border-border/40 p-4 cursor-pointer transition-all duration-200",
        "hover:border-border/70 hover:shadow-md",
        sev.borderClass,
        sev.bgClass,
        selected && "ring-1 ring-primary/50 border-primary/30",
        alert.status === "resolved" && "opacity-60",
      )}
      onClick={() => onClick(alert)}
      data-ocid={`alerts.item.${index + 1}`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <div
          className="mt-0.5 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Checkbox
            checked={checked}
            onCheckedChange={(v) => onCheck(alert.id, !!v)}
            data-ocid={`alerts.checkbox.${index + 1}`}
          />
        </div>

        {/* Device icon */}
        <div
          className={cn(
            "p-1.5 rounded-lg flex-shrink-0 mt-0.5 bg-muted/40",
            sev.kpiClass,
          )}
        >
          <DevIcon size={14} />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap min-w-0">
              <SevIcon
                size={13}
                className={cn("flex-shrink-0", sev.kpiClass)}
              />
              <span className="font-semibold text-sm text-foreground truncate max-w-[280px] sm:max-w-none">
                {alert.title}
              </span>
              <span
                className={cn(
                  "hidden sm:inline-flex items-center px-1.5 py-0.5 rounded border text-[9px] font-bold tracking-wider",
                  sev.badgeClass,
                )}
              >
                {sev.label.toUpperCase()}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span
                className={cn(
                  "hidden md:inline-flex items-center px-1.5 py-0.5 rounded border text-[9px] font-medium",
                  STATUS_CONFIG[alert.status].class,
                )}
              >
                {STATUS_CONFIG[alert.status].label}
              </span>
              <span className="text-[11px] text-muted-foreground font-mono whitespace-nowrap">
                {relativeTime(alert.timestamp)}
              </span>
            </div>
          </div>

          <p className="text-[12px] text-muted-foreground leading-relaxed mt-1.5 line-clamp-2">
            {alert.description}
          </p>

          <div className="flex items-center gap-3 mt-2.5 flex-wrap">
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <Server size={10} className="flex-shrink-0" />
              <span className="font-mono truncate max-w-[120px]">
                {alert.deviceName}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <MapPin size={10} className="flex-shrink-0" />
              <span className="truncate max-w-[140px]">{alert.location}</span>
            </div>
            {alert.affectedCustomers > 0 && (
              <div
                className={cn(
                  "flex items-center gap-1 text-[11px]",
                  sev.kpiClass,
                )}
              >
                <Users size={10} className="flex-shrink-0" />
                <span className="font-medium">
                  {alert.affectedCustomers} customers affected
                </span>
              </div>
            )}
            <span className="ml-auto text-[10px] text-muted-foreground/60 font-mono hidden sm:block">
              {alert.ticketId}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={14}
          className="text-muted-foreground/40 flex-shrink-0 mt-1 hidden sm:block"
        />
      </div>
    </motion.div>
  );
}

function AlertDetailPanel({
  alert,
  onClose,
  onAcknowledge,
  onResolve,
  onViewMap,
}: {
  alert: NOCAlert;
  onClose: () => void;
  onAcknowledge: (id: string) => void;
  onResolve: (id: string) => void;
  onViewMap: (alert: NOCAlert) => void;
}) {
  const sev = SEVERITY_CONFIG[alert.severity];
  const SevIcon = sev.icon;
  const DevIcon = DEVICE_ICONS[alert.deviceType];

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 340, damping: 32 }}
      className="h-full flex flex-col bg-card border-l border-border/50 overflow-hidden"
      data-ocid="alerts.detail_panel"
    >
      {/* Panel header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-card/80 backdrop-blur-sm flex-shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <SevIcon size={15} className={sev.kpiClass} />
          <span className="font-semibold text-sm text-foreground truncate">
            Alert Details
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted/50 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close detail panel"
          data-ocid="alerts.detail_panel.close_button"
        >
          <X size={16} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto noc-scrollbar p-4 space-y-4">
        {/* Title + badge */}
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold tracking-wider",
                sev.badgeClass,
              )}
            >
              {sev.label.toUpperCase()}
            </span>
            <span
              className={cn(
                "inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-medium",
                STATUS_CONFIG[alert.status].class,
              )}
            >
              {STATUS_CONFIG[alert.status].label}
            </span>
          </div>
          <h3 className="text-base font-bold text-foreground leading-tight">
            {alert.title}
          </h3>
          <p className="text-xs text-muted-foreground font-mono mt-1">
            {alert.ticketId} · {CATEGORY_LABELS[alert.category]}
          </p>
        </div>

        {/* Description */}
        <div className="glass-card rounded-lg p-3 bg-muted/20">
          <p className="text-[12px] text-muted-foreground leading-relaxed">
            {alert.description}
          </p>
        </div>

        {/* Device & Location */}
        <div className="grid grid-cols-2 gap-2">
          <div className="glass-card rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
              <DevIcon size={10} />
              Device
            </div>
            <div className="text-xs font-mono font-semibold text-foreground truncate">
              {alert.deviceName}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {alert.deviceType}
            </div>
          </div>
          <div className="glass-card rounded-lg p-3 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-widest font-mono">
              <MapPin size={10} />
              Location
            </div>
            <div className="text-xs font-semibold text-foreground leading-tight">
              {alert.region}
            </div>
            <div className="text-[10px] text-muted-foreground truncate">
              {alert.location}
            </div>
          </div>
        </div>

        {/* Timestamps */}
        <div className="glass-card rounded-lg p-3 space-y-2">
          <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-2">
            Timeline
          </div>
          <div className="flex items-start gap-2">
            <Clock
              size={11}
              className="text-muted-foreground mt-0.5 flex-shrink-0"
            />
            <div>
              <div className="text-[11px] text-muted-foreground">Detected</div>
              <div className="text-xs font-mono text-foreground">
                {new Date(alert.timestamp).toLocaleString()}
              </div>
            </div>
          </div>
          {alert.acknowledgedAt && (
            <div className="flex items-start gap-2">
              <CheckCircle2
                size={11}
                className="text-amber-400 mt-0.5 flex-shrink-0"
              />
              <div>
                <div className="text-[11px] text-muted-foreground">
                  Acknowledged by {alert.acknowledgedBy}
                </div>
                <div className="text-xs font-mono text-foreground">
                  {new Date(alert.acknowledgedAt).toLocaleString()}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Impact */}
        {alert.affectedCustomers > 0 && (
          <div
            className={cn(
              "glass-card rounded-lg p-3 border",
              sev.bgClass,
              sev.borderClass.replace("border-l-", "border-"),
            )}
          >
            <div className="flex items-center gap-2">
              <Users size={14} className={sev.kpiClass} />
              <div>
                <div
                  className={cn("text-xl font-bold font-mono", sev.kpiClass)}
                >
                  {alert.affectedCustomers}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  customers affected
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resolution steps */}
        {alert.resolutionSteps.length > 0 && (
          <div className="glass-card rounded-lg p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-2.5">
              Resolution Steps
            </div>
            <ol className="space-y-2">
              {alert.resolutionSteps.map((step, i) => (
                <li key={step} className="flex gap-2.5">
                  <span className="flex-shrink-0 w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[11px] text-muted-foreground leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Related alerts */}
        {alert.relatedAlertIds.length > 0 && (
          <div className="glass-card rounded-lg p-3">
            <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-2">
              Related Alerts
            </div>
            <div className="flex flex-wrap gap-1.5">
              {alert.relatedAlertIds.map((id) => (
                <span
                  key={id}
                  className="px-2 py-0.5 rounded bg-muted/50 text-[10px] font-mono text-muted-foreground border border-border/40"
                >
                  {id}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Panel action footer */}
      {alert.status !== "resolved" && (
        <div className="border-t border-border/40 p-3 flex gap-2 flex-shrink-0 bg-card/60 backdrop-blur-sm">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 text-xs gap-1.5 border-border/50"
            onClick={() => onViewMap(alert)}
            data-ocid="alerts.detail_panel.view_map_button"
          >
            <MapPin size={12} />
            View on Map
          </Button>
          {alert.status === "active" && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 text-xs gap-1.5 text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
              onClick={() => onAcknowledge(alert.id)}
              data-ocid="alerts.detail_panel.acknowledge_button"
            >
              <CheckCircle2 size={12} />
              Acknowledge
            </Button>
          )}
          {alert.status === "acknowledged" && (
            <Button
              size="sm"
              className="flex-1 text-xs gap-1.5 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => onResolve(alert.id)}
              data-ocid="alerts.detail_panel.resolve_button"
            >
              <CheckCheck size={12} />
              Resolve
            </Button>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const NEW_ALERT_TEMPLATES: Omit<NOCAlert, "id" | "timestamp" | "ticketId">[] = [
  {
    title: "Real-time: Signal Threshold Breach",
    description:
      "RX power dropped below -27 dBm on newly detected ONT cluster. Automatic alert generated by NMS threshold engine.",
    deviceName: "ONT-AUTO-DETECT",
    deviceType: "ONT",
    location: "Auto-detected Zone",
    region: "North America",
    severity: "warning",
    status: "active",
    category: "performance",
    affectedCustomers: Math.floor(Math.random() * 20) + 1,
    resolutionSteps: [
      "Check upstream splitter power levels",
      "Inspect connector cleanliness",
    ],
    relatedAlertIds: [],
    acknowledgedBy: undefined,
    acknowledgedAt: undefined,
  },
];

let alertCounter = 31;

export default function AlertsPage() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<NOCAlert[]>(MOCK_ALERTS);
  const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAlertId, setSelectedAlertId] = useState<string | null>(null);
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [isSimulating, setIsSimulating] = useState(true);
  const [newAlertHighlight, setNewAlertHighlight] = useState<string | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Real-time simulation: inject new alert every 30 seconds
  useEffect(() => {
    if (!isSimulating) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(() => {
      const template = NEW_ALERT_TEMPLATES[0];
      const newAlert: NOCAlert = {
        ...template,
        id: `ALT-${String(alertCounter++).padStart(3, "0")}`,
        timestamp: Date.now(),
        ticketId: `TKT-RT-${Date.now().toString().slice(-6)}`,
        affectedCustomers: Math.floor(Math.random() * 25) + 1,
      };
      setAlerts((prev) => [newAlert, ...prev]);
      setNewAlertHighlight(newAlert.id);
      setTimeout(() => setNewAlertHighlight(null), 3000);
    }, 30_000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isSimulating]);

  // Derived counts
  const counts = useMemo(() => {
    const total = alerts.length;
    const critical = alerts.filter((a) => a.severity === "critical").length;
    const warning = alerts.filter((a) => a.severity === "warning").length;
    const info = alerts.filter((a) => a.severity === "info").length;
    return { total, critical, warning, info };
  }, [alerts]);

  // Filtered + searched alerts
  const filtered = useMemo(() => {
    let result = alerts;
    if (activeFilter !== "all") {
      if (
        activeFilter === "critical" ||
        activeFilter === "warning" ||
        activeFilter === "info"
      ) {
        result = result.filter((a) => a.severity === activeFilter);
      } else {
        result = result.filter((a) => a.category === activeFilter);
      }
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.deviceName.toLowerCase().includes(q) ||
          a.location.toLowerCase().includes(q) ||
          a.region.toLowerCase().includes(q),
      );
    }
    return result;
  }, [alerts, activeFilter, searchQuery]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const selectedAlert = alerts.find((a) => a.id === selectedAlertId) ?? null;

  // Handlers
  const handleCheck = useCallback((id: string, val: boolean) => {
    setCheckedIds((prev) => {
      const next = new Set(prev);
      val ? next.add(id) : next.delete(id);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(
    (val: boolean) => {
      setSelectAll(val);
      setCheckedIds(val ? new Set(paginated.map((a) => a.id)) : new Set());
    },
    [paginated],
  );

  const handleAcknowledge = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: "acknowledged",
              acknowledgedBy: "Current NOC Operator",
              acknowledgedAt: Date.now(),
            }
          : a,
      ),
    );
  }, []);

  const handleResolve = useCallback((id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "resolved" } : a)),
    );
  }, []);

  const handleBulkAcknowledge = useCallback(() => {
    setAlerts((prev) =>
      prev.map((a) =>
        checkedIds.has(a.id) && a.status === "active"
          ? {
              ...a,
              status: "acknowledged",
              acknowledgedBy: "Bulk Action",
              acknowledgedAt: Date.now(),
            }
          : a,
      ),
    );
    setCheckedIds(new Set());
    setSelectAll(false);
  }, [checkedIds]);

  const handleClearResolved = useCallback(() => {
    setAlerts((prev) => prev.filter((a) => a.status !== "resolved"));
    setCheckedIds(new Set());
  }, []);

  const handleViewMap = useCallback(
    (_alert: NOCAlert) => {
      navigate({ to: "/" });
    },
    [navigate],
  );

  // Reset page when filter/search changes
  const activeFilterRef = useRef(activeFilter);
  const searchQueryRef = useRef(searchQuery);
  useEffect(() => {
    if (
      activeFilterRef.current !== activeFilter ||
      searchQueryRef.current !== searchQuery
    ) {
      activeFilterRef.current = activeFilter;
      searchQueryRef.current = searchQuery;
      setPage(1);
    }
  });

  return (
    <div className="flex h-full" data-ocid="alerts-page">
      {/* ── Main content area ─────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto noc-scrollbar">
          <div className="p-4 md:p-6 space-y-5 max-w-[1200px] mx-auto">
            {/* ── Page header ──────────────────────────────────────────────── */}
            <motion.div
              className="flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-primary/15 border border-primary/25">
                  <Bell size={18} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-foreground tracking-tight">
                    Alerts & Notifications
                  </h1>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5 uppercase tracking-widest">
                    NOC Alert Management · Real-time
                  </p>
                </div>
                {isSimulating && (
                  <div className="flex items-center gap-1.5 ml-1">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      Live
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs border-border/50 hidden sm:flex"
                  onClick={() => setIsSimulating((v) => !v)}
                  data-ocid="alerts.live_toggle"
                >
                  {isSimulating ? <BellOff size={13} /> : <Bell size={13} />}
                  {isSimulating ? "Pause Live" : "Resume Live"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs border-border/50"
                  onClick={() => setAlerts(MOCK_ALERTS)}
                  data-ocid="alerts.refresh_button"
                >
                  <RefreshCw size={13} />
                  <span className="hidden sm:inline">Refresh</span>
                </Button>
              </div>
            </motion.div>

            {/* ── KPI Summary ───────────────────────────────────────────────── */}
            <div
              className="grid grid-cols-2 lg:grid-cols-4 gap-3"
              data-ocid="alerts.kpi-grid"
            >
              <KpiCard
                icon={Bell}
                label="Total Alerts"
                value={counts.total}
                colorClass="text-foreground"
                bgClass="border-border/40"
                index={0}
              />
              <KpiCard
                icon={AlertCircle}
                label="Critical"
                value={counts.critical}
                colorClass="text-red-400"
                bgClass="bg-red-500/5 border-red-500/20"
                pulse
                index={1}
              />
              <KpiCard
                icon={AlertTriangle}
                label="Warning"
                value={counts.warning}
                colorClass="text-amber-400"
                bgClass="bg-amber-500/5 border-amber-500/20"
                pulse
                index={2}
              />
              <KpiCard
                icon={Info}
                label="Info"
                value={counts.info}
                colorClass="text-blue-400"
                bgClass="bg-blue-500/5 border-blue-500/20"
                index={3}
              />
            </div>

            {/* ── Filter tabs + Search ──────────────────────────────────────── */}
            <motion.div
              className="glass-card rounded-xl border border-border/40 p-3 space-y-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              data-ocid="alerts.filters-panel"
            >
              {/* Filter tabs */}
              <div className="flex gap-1.5 overflow-x-auto noc-scrollbar pb-0.5 no-scrollbar">
                {FILTER_TABS.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    className={cn(
                      "flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap",
                      activeFilter === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
                    )}
                    onClick={() => setActiveFilter(tab.id)}
                    data-ocid={`alerts.filter.${tab.id}`}
                  >
                    {tab.label}
                    {tab.id === "critical" && counts.critical > 0 && (
                      <span className="ml-1.5 px-1 py-0.5 rounded text-[9px] font-bold bg-red-500/20 text-red-400">
                        {counts.critical}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Search + extra controls */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search
                    size={13}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    placeholder="Search alerts, devices, locations…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-9 text-xs bg-muted/30 border-border/40 focus:border-primary/50"
                    data-ocid="alerts.search_input"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setSearchQuery("")}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 text-xs border-border/40 h-9 px-3 flex-shrink-0 hidden md:flex"
                  data-ocid="alerts.filter_button"
                >
                  <SlidersHorizontal size={12} />
                  Filters
                </Button>
              </div>
            </motion.div>

            {/* ── Bulk action bar ───────────────────────────────────────────── */}
            <AnimatePresence>
              {checkedIds.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -8, height: 0 }}
                  className="glass-card rounded-xl border border-primary/30 bg-primary/5 p-3 flex items-center gap-3"
                  data-ocid="alerts.bulk-actions-bar"
                >
                  <span className="text-xs font-medium text-foreground">
                    {checkedIds.size} selected
                  </span>
                  <div className="flex items-center gap-2 ml-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5 text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
                      onClick={handleBulkAcknowledge}
                      data-ocid="alerts.bulk_acknowledge_button"
                    >
                      <CheckCircle2 size={12} />
                      Acknowledge Selected
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs gap-1.5 text-muted-foreground border-border/50"
                      onClick={() => {
                        setCheckedIds(new Set());
                        setSelectAll(false);
                      }}
                      data-ocid="alerts.bulk_deselect_button"
                    >
                      <X size={12} />
                      Deselect
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Alert list header ─────────────────────────────────────────── */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                  data-ocid="alerts.select_all_checkbox"
                />
                <span className="text-xs text-muted-foreground">
                  {filtered.length} alert{filtered.length !== 1 ? "s" : ""}{" "}
                  {activeFilter !== "all" && `(${activeFilter})`}
                </span>
              </div>
              <button
                type="button"
                onClick={handleClearResolved}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                data-ocid="alerts.clear_resolved_button"
              >
                <Trash2 size={12} />
                Clear Resolved
              </button>
            </div>

            {/* ── Alert Cards ───────────────────────────────────────────────── */}
            <div className="space-y-2.5" data-ocid="alerts.list">
              <AnimatePresence mode="popLayout" initial={false}>
                {paginated.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card rounded-xl border border-border/40 p-12 text-center"
                    data-ocid="alerts.empty_state"
                  >
                    <BellOff
                      size={32}
                      className="text-muted-foreground/30 mx-auto mb-3"
                    />
                    <p className="text-sm font-semibold text-foreground mb-1">
                      No alerts found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {searchQuery
                        ? "Try adjusting your search query"
                        : "All clear — no alerts match this filter"}
                    </p>
                  </motion.div>
                ) : (
                  paginated.map((alert, idx) => (
                    <div
                      key={alert.id}
                      className={cn(
                        "transition-all duration-700",
                        newAlertHighlight === alert.id &&
                          "ring-2 ring-green-400/50 rounded-xl",
                      )}
                    >
                      <AlertCard
                        alert={alert}
                        selected={selectedAlertId === alert.id}
                        checked={checkedIds.has(alert.id)}
                        onCheck={handleCheck}
                        onClick={(a) =>
                          setSelectedAlertId(
                            a.id === selectedAlertId ? null : a.id,
                          )
                        }
                        index={(page - 1) * PAGE_SIZE + idx}
                      />
                    </div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* ── Pagination ────────────────────────────────────────────────── */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-between pt-2"
                data-ocid="alerts.pagination"
              >
                <span className="text-xs text-muted-foreground font-mono">
                  Page {page} / {totalPages} · {filtered.length} total
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-border/50 h-8 px-3"
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    data-ocid="alerts.pagination_prev"
                  >
                    Previous
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs border-border/50 h-8 px-3"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    data-ocid="alerts.pagination_next"
                  >
                    Next
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* ── Detail panel — desktop slide-out ─────────────────────────────── */}
      <AnimatePresence>
        {selectedAlert && (
          <div
            className="hidden md:flex w-[380px] lg:w-[420px] flex-shrink-0 border-l border-border/40 overflow-hidden"
            data-ocid="alerts.detail_panel_wrapper"
          >
            <AlertDetailPanel
              alert={selectedAlert}
              onClose={() => setSelectedAlertId(null)}
              onAcknowledge={handleAcknowledge}
              onResolve={handleResolve}
              onViewMap={handleViewMap}
            />
          </div>
        )}
      </AnimatePresence>

      {/* ── Detail panel — mobile bottom sheet ───────────────────────────── */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            key="mobile-detail"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="md:hidden fixed inset-x-0 bottom-0 z-50 max-h-[80dvh] rounded-t-2xl overflow-hidden shadow-2xl"
            style={{ zIndex: 9000 }}
            data-ocid="alerts.mobile_sheet"
          >
            <AlertDetailPanel
              alert={selectedAlert}
              onClose={() => setSelectedAlertId(null)}
              onAcknowledge={handleAcknowledge}
              onResolve={handleResolve}
              onViewMap={handleViewMap}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
