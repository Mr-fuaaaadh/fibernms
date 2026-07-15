import { ZabbixConfigSheet } from "@/components/ZabbixConfigSheet";
import type { ZabbixConnectionState } from "@/components/ZabbixConfigSheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Database,
  Info,
  MonitorCheck,
  RefreshCw,
  Search,
  Server,
  Settings,
  ShieldAlert,
  Unplug,
  WifiOff,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type HostStatus = "Available" | "Problem" | "Unavailable";
type TriggerSeverity = "disaster" | "high" | "average" | "warning" | "info";
type TriggerState = "Problem" | "Resolved";

interface ZabbixHost {
  id: string;
  name: string;
  ip: string;
  group: string;
  status: HostStatus;
  problems: number;
  lastCheck: number;
}

interface ZabbixTrigger {
  id: string;
  name: string;
  host: string;
  severity: TriggerSeverity;
  state: TriggerState;
  lastEvent: number;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const M = 60_000;

const MOCK_HOSTS: ZabbixHost[] = [
  {
    id: "h1",
    name: "OLT-Core-01",
    ip: "192.168.1.10",
    group: "Network/OLT",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M,
  },
  {
    id: "h2",
    name: "OLT-Core-02",
    ip: "192.168.1.11",
    group: "Network/OLT",
    status: "Problem",
    problems: 3,
    lastCheck: Date.now() - 2 * M,
  },
  {
    id: "h3",
    name: "OLT-Edge-05",
    ip: "10.10.5.1",
    group: "Edge/OLT",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 3 * M,
  },
  {
    id: "h4",
    name: "OLT-Edge-06",
    ip: "10.10.5.2",
    group: "Edge/OLT",
    status: "Unavailable",
    problems: 1,
    lastCheck: Date.now() - 15 * M,
  },
  {
    id: "h5",
    name: "Switch-Dist-03",
    ip: "192.168.2.10",
    group: "Network/Switch",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M,
  },
  {
    id: "h6",
    name: "Switch-Dist-04",
    ip: "192.168.2.11",
    group: "Network/Switch",
    status: "Problem",
    problems: 2,
    lastCheck: Date.now() - 5 * M,
  },
  {
    id: "h7",
    name: "Router-WAN-02",
    ip: "10.0.0.2",
    group: "WAN/Router",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M,
  },
  {
    id: "h8",
    name: "Router-Core-01",
    ip: "10.0.0.1",
    group: "Core/Router",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M,
  },
  {
    id: "h9",
    name: "Router-Core-02",
    ip: "10.0.0.3",
    group: "Core/Router",
    status: "Problem",
    problems: 1,
    lastCheck: Date.now() - 8 * M,
  },
  {
    id: "h10",
    name: "Splitter-Node-14",
    ip: "192.168.5.14",
    group: "Field/Splitter",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 3 * M,
  },
  {
    id: "h11",
    name: "Splitter-Node-15",
    ip: "192.168.5.15",
    group: "Field/Splitter",
    status: "Unavailable",
    problems: 2,
    lastCheck: Date.now() - 20 * M,
  },
  {
    id: "h12",
    name: "Splitter-Node-16",
    ip: "192.168.5.16",
    group: "Field/Splitter",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 4 * M,
  },
  {
    id: "h13",
    name: "NMS-Server-01",
    ip: "10.1.1.100",
    group: "Infrastructure/Server",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M,
  },
  {
    id: "h14",
    name: "Firewall-DC-01",
    ip: "10.1.1.1",
    group: "Security/Firewall",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M,
  },
  {
    id: "h15",
    name: "Firewall-DC-02",
    ip: "10.1.1.2",
    group: "Security/Firewall",
    status: "Problem",
    problems: 1,
    lastCheck: Date.now() - 6 * M,
  },
  {
    id: "h16",
    name: "DNS-Server-01",
    ip: "10.1.2.10",
    group: "Infrastructure/DNS",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M,
  },
  {
    id: "h17",
    name: "DHCP-Server-01",
    ip: "10.1.2.11",
    group: "Infrastructure/DHCP",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 3 * M,
  },
  {
    id: "h18",
    name: "Monitoring-Probe-01",
    ip: "10.20.1.1",
    group: "Monitoring/Probe",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 1 * M,
  },
  {
    id: "h19",
    name: "ONT-Cluster-01",
    ip: "192.168.10.1",
    group: "Field/ONT",
    status: "Problem",
    problems: 4,
    lastCheck: Date.now() - 10 * M,
  },
  {
    id: "h20",
    name: "ONT-Cluster-02",
    ip: "192.168.10.2",
    group: "Field/ONT",
    status: "Available",
    problems: 0,
    lastCheck: Date.now() - 2 * M,
  },
];

const MOCK_TRIGGERS: ZabbixTrigger[] = [
  // ── Disaster (3) — all Problem
  {
    id: "t1",
    name: "Interface critically down — GigabitEthernet0/0",
    host: "OLT-Core-02",
    severity: "disaster",
    state: "Problem",
    lastEvent: Date.now() - 4 * M,
  },
  {
    id: "t2",
    name: "Fiber link failure — trunk port 1/0/1",
    host: "OLT-Edge-06",
    severity: "disaster",
    state: "Problem",
    lastEvent: Date.now() - 12 * M,
  },
  {
    id: "t3",
    name: "BGP session down — peer AS65001",
    host: "Router-Core-02",
    severity: "disaster",
    state: "Problem",
    lastEvent: Date.now() - 30 * M,
  },
  // ── High (5) — all Problem
  {
    id: "t4",
    name: "High CPU load > 95% — sustained 10 min",
    host: "OLT-Core-02",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 6 * M,
  },
  {
    id: "t5",
    name: "Ping failed — host unreachable",
    host: "Router-Core-02",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 8 * M,
  },
  {
    id: "t6",
    name: "Port flapping detected — Gi0/24",
    host: "Switch-Dist-04",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 5 * M,
  },
  {
    id: "t7",
    name: "Memory usage critical > 92%",
    host: "Firewall-DC-02",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 20 * M,
  },
  {
    id: "t8",
    name: "ONT cluster connection failure — 12 ONTs offline",
    host: "ONT-Cluster-01",
    severity: "high",
    state: "Problem",
    lastEvent: Date.now() - 15 * M,
  },
  // ── Average (8) — 4 Problem, 4 Resolved
  {
    id: "t9",
    name: "Disk space low < 10% on /var/lib/zabbix",
    host: "NMS-Server-01",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 45 * M,
  },
  {
    id: "t10",
    name: "Interface error rate > 1% on eth2",
    host: "Switch-Dist-04",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 60 * M,
  },
  {
    id: "t11",
    name: "SNMP timeout — host not responding",
    host: "Splitter-Node-15",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 35 * M,
  },
  {
    id: "t12",
    name: "Link down — port Gi1/0/8",
    host: "OLT-Edge-06",
    severity: "average",
    state: "Problem",
    lastEvent: Date.now() - 22 * M,
  },
  {
    id: "t13",
    name: "Packet loss > 5% — upstream link",
    host: "Router-WAN-02",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 90 * M,
  },
  {
    id: "t14",
    name: "Interface utilization > 85%",
    host: "Router-Core-01",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 120 * M,
  },
  {
    id: "t15",
    name: "ARP cache overflow detected",
    host: "Switch-Dist-03",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 180 * M,
  },
  {
    id: "t16",
    name: "Fan speed abnormal — chassis fan 2",
    host: "OLT-Core-01",
    severity: "average",
    state: "Resolved",
    lastEvent: Date.now() - 200 * M,
  },
  // ── Warning (8) — 4 Problem, 4 Resolved
  {
    id: "t17",
    name: "High bandwidth utilization > 75% on uplink",
    host: "Router-Core-01",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 25 * M,
  },
  {
    id: "t18",
    name: "Temperature warning — chassis temp 72°C",
    host: "OLT-Core-02",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 40 * M,
  },
  {
    id: "t19",
    name: "TLS certificate expiring in 14 days",
    host: "Firewall-DC-01",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 55 * M,
  },
  {
    id: "t20",
    name: "Config backup missed — scheduled task failed",
    host: "NMS-Server-01",
    severity: "warning",
    state: "Problem",
    lastEvent: Date.now() - 70 * M,
  },
  {
    id: "t21",
    name: "Optical Rx power near threshold",
    host: "Splitter-Node-14",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 150 * M,
  },
  {
    id: "t22",
    name: "NTP sync drift > 100ms",
    host: "DHCP-Server-01",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 160 * M,
  },
  {
    id: "t23",
    name: "DNS query latency elevated > 200ms",
    host: "DNS-Server-01",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 170 * M,
  },
  {
    id: "t24",
    name: "Interface duplex mismatch detected",
    host: "Monitoring-Probe-01",
    severity: "warning",
    state: "Resolved",
    lastEvent: Date.now() - 240 * M,
  },
  // ── Info (6) — 3 Problem, 3 Resolved
  {
    id: "t25",
    name: "Scheduled maintenance window started",
    host: "NMS-Server-01",
    severity: "info",
    state: "Problem",
    lastEvent: Date.now() - 10 * M,
  },
  {
    id: "t26",
    name: "Firmware update available — version 7.2.1",
    host: "OLT-Core-01",
    severity: "info",
    state: "Problem",
    lastEvent: Date.now() - 80 * M,
  },
  {
    id: "t27",
    name: "Configuration change detected via SNMP trap",
    host: "Firewall-DC-01",
    severity: "info",
    state: "Problem",
    lastEvent: Date.now() - 100 * M,
  },
  {
    id: "t28",
    name: "Scheduled maintenance window ended",
    host: "NMS-Server-01",
    severity: "info",
    state: "Resolved",
    lastEvent: Date.now() - 130 * M,
  },
  {
    id: "t29",
    name: "Agent auto-update completed successfully",
    host: "Monitoring-Probe-01",
    severity: "info",
    state: "Resolved",
    lastEvent: Date.now() - 250 * M,
  },
  {
    id: "t30",
    name: "Host added to monitoring — Splitter-Node-16",
    host: "Splitter-Node-16",
    severity: "info",
    state: "Resolved",
    lastEvent: Date.now() - 300 * M,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRelative(ts: number): string {
  const d = Date.now() - ts;
  if (d < 60_000) return `${Math.floor(d / 1000)}s ago`;
  if (d < 3_600_000) return `${Math.floor(d / 60_000)}m ago`;
  if (d < 86_400_000) return `${Math.floor(d / 3_600_000)}h ago`;
  return `${Math.floor(d / 86_400_000)}d ago`;
}

const HOST_STATUS_CFG: Record<HostStatus, { label: string; cls: string }> = {
  Available: {
    label: "Available",
    cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  Problem: {
    label: "Problem",
    cls: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  },
  Unavailable: {
    label: "Unavailable",
    cls: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  },
};

const SEVERITY_CFG: Record<
  TriggerSeverity,
  { label: string; cls: string; chipCls: string; icon: React.ElementType }
> = {
  disaster: {
    label: "Disaster",
    cls: "bg-red-500/15 text-red-400 border-red-500/30",
    chipCls: "bg-red-500 text-white border-red-500",
    icon: ShieldAlert,
  },
  high: {
    label: "High",
    cls: "bg-orange-500/15 text-orange-400 border-orange-500/30",
    chipCls: "bg-orange-500 text-white border-orange-500",
    icon: AlertCircle,
  },
  average: {
    label: "Average",
    cls: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    chipCls: "bg-yellow-500 text-black border-yellow-500",
    icon: AlertTriangle,
  },
  warning: {
    label: "Warning",
    cls: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    chipCls: "bg-blue-500 text-white border-blue-500",
    icon: Zap,
  },
  info: {
    label: "Info",
    cls: "bg-muted text-muted-foreground border-border",
    chipCls: "bg-secondary text-foreground border-border",
    icon: Info,
  },
};

const PAGE_SIZE = 10;

// ─── KPI Card ─────────────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconCls,
  ocid,
  delay,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  iconCls: string;
  ocid: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <Card className="bg-card border-border" data-ocid={ocid}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground font-medium">
                {label}
              </p>
              <p className="text-2xl font-bold text-foreground mt-1 tabular-nums">
                {value}
              </p>
              {sub && (
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              )}
            </div>
            <div
              className={cn(
                "size-10 rounded-xl flex items-center justify-center shrink-0",
                iconCls,
              )}
            >
              <Icon className="size-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ─── Pagination Controls ──────────────────────────────────────────────────────

function Pagination({
  page,
  total,
  pageSize,
  onChange,
  ocidPrefix,
}: {
  page: number;
  total: number;
  pageSize: number;
  onChange: (p: number) => void;
  ocidPrefix: string;
}) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border bg-muted/20">
      <p className="text-xs text-muted-foreground">
        Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)}{" "}
        of {total}
      </p>
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          data-ocid={`${ocidPrefix}.pagination_prev`}
        >
          <ChevronLeft className="size-3.5" />
        </Button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <Button
            key={p}
            type="button"
            variant={p === page ? "default" : "ghost"}
            size="sm"
            className="h-7 w-7 p-0 text-xs"
            onClick={() => onChange(p)}
            data-ocid={`${ocidPrefix}.page-${p}`}
          >
            {p}
          </Button>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 w-7 p-0"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          data-ocid={`${ocidPrefix}.pagination_next`}
        >
          <ChevronRight className="size-3.5" />
        </Button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ZabbixDashboard() {
  const [configOpen, setConfigOpen] = useState(false);
  const [connection, setConnection] = useState<ZabbixConnectionState>({
    connected: true,
    lastSync: Date.now() - 5 * M,
    hostCount: MOCK_HOSTS.length,
    activeAlerts: MOCK_TRIGGERS.filter(
      (t) =>
        t.state === "Problem" &&
        (t.severity === "disaster" || t.severity === "high"),
    ).length,
  });
  const [syncing, setSyncing] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState("5");

  // Hosts tab
  const [hostSearch, setHostSearch] = useState("");
  const [hostPage, setHostPage] = useState(1);

  // Triggers tab
  const [severityFilter, setSeverityFilter] = useState<TriggerSeverity | "all">(
    "all",
  );
  const [triggerPage, setTriggerPage] = useState(1);

  // KPI derived values
  const hostsOnline = useMemo(
    () => MOCK_HOSTS.filter((h) => h.status === "Available").length,
    [],
  );
  const hostsOffline = useMemo(
    () => MOCK_HOSTS.filter((h) => h.status === "Unavailable").length,
    [],
  );
  const activeTriggers = useMemo(
    () => MOCK_TRIGGERS.filter((t) => t.state === "Problem").length,
    [],
  );

  // Filtered hosts
  const filteredHosts = useMemo(() => {
    const q = hostSearch.toLowerCase();
    return q
      ? MOCK_HOSTS.filter(
          (h) =>
            h.name.toLowerCase().includes(q) ||
            h.ip.includes(q) ||
            h.group.toLowerCase().includes(q),
        )
      : MOCK_HOSTS;
  }, [hostSearch]);

  const pagedHosts = filteredHosts.slice(
    (hostPage - 1) * PAGE_SIZE,
    hostPage * PAGE_SIZE,
  );

  // Filtered triggers
  const filteredTriggers = useMemo(
    () =>
      severityFilter === "all"
        ? MOCK_TRIGGERS
        : MOCK_TRIGGERS.filter((t) => t.severity === severityFilter),
    [severityFilter],
  );

  const pagedTriggers = filteredTriggers.slice(
    (triggerPage - 1) * PAGE_SIZE,
    triggerPage * PAGE_SIZE,
  );

  function handleHostSearchChange(v: string) {
    setHostSearch(v);
    setHostPage(1);
  }

  function handleSeverityFilter(sev: TriggerSeverity | "all") {
    setSeverityFilter(sev);
    setTriggerPage(1);
  }

  async function handleSyncNow() {
    if (!connection.connected) return;
    setSyncing(true);
    toast.info("Zabbix sync started…");
    await new Promise((r) => setTimeout(r, 1500));
    setSyncing(false);
    setConnection((prev) => ({ ...prev, lastSync: Date.now() }));
    toast.success("Sync complete — 20 hosts, 30 triggers updated");
  }

  function handleDisconnect() {
    setConnection({ connected: false, hostCount: 0, activeAlerts: 0 });
    toast.success("Zabbix disconnected");
  }

  function handleConnectionChange(state: ZabbixConnectionState) {
    setConnection(state);
    if (state.connected) toast.success("Zabbix settings saved");
  }

  const severityChips: Array<TriggerSeverity | "all"> = [
    "all",
    "disaster",
    "high",
    "average",
    "warning",
    "info",
  ];

  return (
    <motion.div
      className="min-h-full bg-background"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      data-ocid="zabbix-dashboard.page"
    >
      {/* ── Page Header ── */}
      <div className="bg-card border-b border-border px-4 sm:px-6 py-4">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3"
          aria-label="Breadcrumb"
        >
          <a
            href="/integrations"
            className="hover:text-foreground transition-colors"
            data-ocid="zabbix-dashboard.breadcrumb-integrations"
          >
            Integrations
          </a>
          <ChevronLeft className="size-3 rotate-180" />
          <span className="text-foreground font-medium">Zabbix</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Database className="size-5" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                Zabbix Integration
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Network monitoring &amp; alert management via Zabbix API
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto shrink-0 flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-2 h-8 text-xs"
              onClick={handleSyncNow}
              disabled={syncing || !connection.connected}
              data-ocid="zabbix-dashboard.sync_button"
            >
              <RefreshCw
                className={cn("size-3.5", syncing && "animate-spin")}
              />
              {syncing ? "Syncing…" : "Sync Now"}
            </Button>
            <Button
              type="button"
              size="sm"
              className="gap-2 h-8 text-xs"
              onClick={() => setConfigOpen(true)}
              data-ocid="zabbix-dashboard.settings_button"
            >
              <Settings className="size-3.5" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* ── Connection Banner ── */}
        <AnimatePresence mode="wait">
          {!connection.connected ? (
            <motion.div
              key="disconnected"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3"
                data-ocid="zabbix-dashboard.disconnected_banner"
              >
                <Unplug className="size-4 text-amber-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-amber-400">
                    Zabbix server not configured
                  </p>
                  <p className="text-xs text-amber-400/70 mt-0.5">
                    Click Configure to get started and connect your Zabbix
                    instance.
                  </p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  className="gap-2 h-8 text-xs shrink-0"
                  onClick={() => setConfigOpen(true)}
                  data-ocid="zabbix-dashboard.configure_button"
                >
                  Configure
                </Button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="connected"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3"
                data-ocid="zabbix-dashboard.connected_banner"
              >
                <MonitorCheck className="size-4 text-emerald-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-emerald-400">
                      Connected
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                    >
                      zabbix.fibernms.internal
                    </Badge>
                  </div>
                  {connection.lastSync && (
                    <p className="text-xs text-emerald-400/70 mt-0.5 flex items-center gap-1">
                      <Clock className="size-3" />
                      Last synced {fmtRelative(connection.lastSync)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-8 text-xs border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                    onClick={handleSyncNow}
                    disabled={syncing}
                    data-ocid="zabbix-dashboard.banner_sync_button"
                  >
                    <RefreshCw
                      className={cn("size-3", syncing && "animate-spin")}
                    />
                    Sync Now
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-8 text-xs"
                    onClick={() => setConfigOpen(true)}
                    data-ocid="zabbix-dashboard.banner_settings_button"
                  >
                    <Settings className="size-3" />
                    Settings
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── KPI Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            label="Total Hosts"
            value={MOCK_HOSTS.length}
            sub="monitored by Zabbix"
            icon={Server}
            iconCls="bg-sky-500/20 text-sky-400"
            ocid="zabbix-dashboard.kpi-total-hosts"
            delay={0.05}
          />
          <KpiCard
            label="Hosts Online"
            value={hostsOnline}
            sub={`${Math.round((hostsOnline / MOCK_HOSTS.length) * 100)}% availability`}
            icon={Activity}
            iconCls="bg-emerald-500/20 text-emerald-400"
            ocid="zabbix-dashboard.kpi-hosts-online"
            delay={0.1}
          />
          <KpiCard
            label="Hosts Offline"
            value={hostsOffline}
            sub={`${MOCK_HOSTS.filter((h) => h.status === "Problem").length} with problems`}
            icon={WifiOff}
            iconCls={
              hostsOffline > 0
                ? "bg-rose-500/20 text-rose-400"
                : "bg-muted text-muted-foreground"
            }
            ocid="zabbix-dashboard.kpi-hosts-offline"
            delay={0.15}
          />
          <KpiCard
            label="Active Triggers"
            value={activeTriggers}
            sub={`${MOCK_TRIGGERS.filter((t) => t.severity === "disaster" && t.state === "Problem").length} disaster severity`}
            icon={AlertCircle}
            iconCls={
              activeTriggers > 0
                ? "bg-amber-500/20 text-amber-400"
                : "bg-muted text-muted-foreground"
            }
            ocid="zabbix-dashboard.kpi-active-triggers"
            delay={0.2}
          />
        </div>

        {/* ── Main Tabs ── */}
        <Tabs
          defaultValue="hosts"
          className="space-y-4"
          data-ocid="zabbix-dashboard.tabs"
        >
          <TabsList className="w-full sm:w-auto bg-muted/50 border border-border h-auto p-1">
            <TabsTrigger
              value="hosts"
              className="flex-1 sm:flex-none text-xs gap-1.5"
              data-ocid="zabbix-dashboard.hosts_tab"
            >
              <Server className="size-3.5" />
              Hosts
              <Badge
                variant="outline"
                className="ml-1 text-xs border-border text-muted-foreground px-1.5 py-0"
              >
                {MOCK_HOSTS.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="triggers"
              className="flex-1 sm:flex-none text-xs gap-1.5"
              data-ocid="zabbix-dashboard.triggers_tab"
            >
              <ShieldAlert className="size-3.5" />
              Triggers
              {activeTriggers > 0 && (
                <Badge
                  variant="outline"
                  className="ml-1 text-xs bg-rose-500/15 text-rose-400 border-rose-500/30 px-1.5 py-0"
                >
                  {activeTriggers}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ── Hosts Tab ── */}
          <TabsContent value="hosts" className="mt-0 space-y-3">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
              <Input
                value={hostSearch}
                onChange={(e) => handleHostSearchChange(e.target.value)}
                placeholder="Search by hostname, IP, or group…"
                className="h-9 text-sm pl-9"
                data-ocid="zabbix-dashboard.hosts_search_input"
              />
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-0">
                {filteredHosts.length === 0 ? (
                  <div
                    className="py-16 text-center"
                    data-ocid="zabbix-dashboard.hosts_empty_state"
                  >
                    <Search className="size-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      No hosts found
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try a different search term
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table style={{ minWidth: 600 }}>
                        <TableHeader>
                          <TableRow className="bg-muted/40">
                            <TableHead className="text-xs font-semibold text-muted-foreground pl-4">
                              Host Name
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              IP Address
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground hidden md:table-cell">
                              Group
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              Status
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                              Problems
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground text-right pr-4 hidden lg:table-cell">
                              Last Check
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pagedHosts.map((host, i) => (
                            <TableRow
                              key={host.id}
                              className="hover:bg-muted/30 transition-colors"
                              data-ocid={`zabbix-dashboard.host.${(hostPage - 1) * PAGE_SIZE + i + 1}`}
                            >
                              <TableCell className="text-sm font-medium text-foreground py-3 pl-4">
                                {host.name}
                              </TableCell>
                              <TableCell className="text-xs font-mono text-muted-foreground py-3">
                                {host.ip}
                              </TableCell>
                              <TableCell className="text-xs text-muted-foreground py-3 hidden md:table-cell">
                                {host.group}
                              </TableCell>
                              <TableCell className="py-3">
                                <Badge
                                  variant="outline"
                                  className={cn(
                                    "text-xs border",
                                    HOST_STATUS_CFG[host.status].cls,
                                  )}
                                >
                                  {HOST_STATUS_CFG[host.status].label}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right py-3">
                                {host.problems > 0 ? (
                                  <Badge
                                    variant="outline"
                                    className="text-xs bg-rose-500/15 text-rose-400 border-rose-500/30"
                                  >
                                    {host.problems}
                                  </Badge>
                                ) : (
                                  <span className="text-xs text-muted-foreground">
                                    0
                                  </span>
                                )}
                              </TableCell>
                              <TableCell className="text-right text-xs text-muted-foreground py-3 pr-4 hidden lg:table-cell">
                                {fmtRelative(host.lastCheck)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <Pagination
                      page={hostPage}
                      total={filteredHosts.length}
                      pageSize={PAGE_SIZE}
                      onChange={setHostPage}
                      ocidPrefix="zabbix-dashboard.hosts"
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* ── Triggers Tab ── */}
          <TabsContent value="triggers" className="mt-0 space-y-3">
            {/* Severity filter chips */}
            <div
              className="flex gap-1.5 overflow-x-auto pb-1"
              style={{ scrollbarWidth: "none" }}
            >
              {severityChips.map((sev) => {
                const active = severityFilter === sev;
                return (
                  <motion.button
                    key={sev}
                    type="button"
                    whileTap={{ scale: 0.93 }}
                    onClick={() => handleSeverityFilter(sev)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border transition-colors shrink-0",
                      active
                        ? sev === "all"
                          ? "bg-primary text-primary-foreground border-primary"
                          : SEVERITY_CFG[sev].chipCls
                        : "border-border text-muted-foreground bg-transparent hover:bg-muted/50",
                    )}
                    data-ocid={`zabbix-dashboard.severity_filter.${sev}`}
                  >
                    {sev === "all" ? "All" : SEVERITY_CFG[sev].label}
                  </motion.button>
                );
              })}
            </div>

            <Card className="bg-card border-border">
              <CardContent className="p-0">
                {filteredTriggers.length === 0 ? (
                  <div
                    className="py-16 text-center"
                    data-ocid="zabbix-dashboard.triggers_empty_state"
                  >
                    <AlertCircle className="size-8 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      No triggers for selected severity
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Try selecting a different severity filter
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <Table style={{ minWidth: 640 }}>
                        <TableHeader>
                          <TableRow className="bg-muted/40">
                            <TableHead className="text-xs font-semibold text-muted-foreground pl-4">
                              Trigger Name
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              Host
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              Severity
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">
                              State
                            </TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground text-right pr-4">
                              Last Event
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {pagedTriggers.map((t, i) => {
                            const scfg = SEVERITY_CFG[t.severity];
                            const Icon = scfg.icon;
                            return (
                              <TableRow
                                key={t.id}
                                className="hover:bg-muted/30 transition-colors"
                                data-ocid={`zabbix-dashboard.trigger.${(triggerPage - 1) * PAGE_SIZE + i + 1}`}
                              >
                                <TableCell className="text-sm font-medium text-foreground py-3 pl-4 max-w-xs">
                                  <span className="line-clamp-2 leading-snug">
                                    {t.name}
                                  </span>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground py-3 font-mono whitespace-nowrap">
                                  {t.host}
                                </TableCell>
                                <TableCell className="py-3">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs border gap-1",
                                      scfg.cls,
                                    )}
                                  >
                                    <Icon className="size-3" />
                                    {scfg.label}
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-3">
                                  <Badge
                                    variant="outline"
                                    className={cn(
                                      "text-xs border",
                                      t.state === "Problem"
                                        ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                                        : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
                                    )}
                                  >
                                    {t.state}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-right text-xs text-muted-foreground py-3 pr-4 whitespace-nowrap">
                                  {fmtRelative(t.lastEvent)}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                    <Pagination
                      page={triggerPage}
                      total={filteredTriggers.length}
                      pageSize={PAGE_SIZE}
                      onChange={setTriggerPage}
                      ocidPrefix="zabbix-dashboard.triggers"
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ── Sync Controls ── */}
        <Card className="bg-card border-border">
          <CardContent className="p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <RefreshCw className="size-4 text-red-400" />
              Sync Settings
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="sync-interval" className="text-xs">
                    Sync Interval
                  </Label>
                  <Select value={syncInterval} onValueChange={setSyncInterval}>
                    <SelectTrigger
                      id="sync-interval"
                      className="h-9 text-sm"
                      data-ocid="zabbix-dashboard.sync_interval_select"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border bg-muted/20 px-4 py-3">
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      Auto-sync
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Automatically pull hosts and triggers
                    </p>
                  </div>
                  <Switch
                    checked={autoSync}
                    onCheckedChange={setAutoSync}
                    data-ocid="zabbix-dashboard.auto_sync_switch"
                    aria-label="Auto sync"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg border border-border bg-muted/20 px-4 py-3 space-y-1">
                  <p className="text-xs font-medium text-foreground">
                    Last Sync
                  </p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Clock className="size-3" />
                    {connection.lastSync
                      ? fmtRelative(connection.lastSync)
                      : "Never"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 h-8 text-xs"
                    onClick={handleSyncNow}
                    disabled={syncing || !connection.connected}
                    data-ocid="zabbix-dashboard.sync_now_button"
                  >
                    <RefreshCw
                      className={cn("size-3.5", syncing && "animate-spin")}
                    />
                    {syncing ? "Syncing…" : "Sync Now"}
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="gap-2 h-8 text-xs text-rose-400 hover:bg-rose-500/10"
                        disabled={!connection.connected}
                        data-ocid="zabbix-dashboard.disconnect_button"
                      >
                        <Unplug className="size-3.5" />
                        Disconnect
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent data-ocid="zabbix-dashboard.disconnect_dialog">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Disconnect Zabbix?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will remove the Zabbix connection from FiberNMS.
                          Host and trigger data will no longer be synced. You
                          can reconnect at any time.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel data-ocid="zabbix-dashboard.disconnect_cancel_button">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDisconnect}
                          className="bg-rose-600 hover:bg-rose-500 text-white border-0"
                          data-ocid="zabbix-dashboard.disconnect_confirm_button"
                        >
                          Disconnect
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Config Sheet ── */}
      <ZabbixConfigSheet
        open={configOpen}
        onOpenChange={setConfigOpen}
        connectionState={connection}
        onConnectionChange={handleConnectionChange}
      />
    </motion.div>
  );
}
