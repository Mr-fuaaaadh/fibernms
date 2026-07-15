import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  Clock,
  Info,
  RefreshCw,
  Search,
  Server,
  ShieldAlert,
  Unplug,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ZabbixHost {
  id: string;
  name: string;
  ip: string;
  hostGroup: string;
  status: "enabled" | "disabled";
  problems: number;
}

interface ZabbixTrigger {
  id: string;
  name: string;
  host: string;
  severity: "disaster" | "high" | "average" | "warning" | "information";
  lastChange: number;
  acknowledged: boolean;
}

export interface ZabbixConnectionState {
  connected: boolean;
  lastSync?: number;
  hostCount: number;
  activeAlerts: number;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnectionChange: (state: ZabbixConnectionState) => void;
  connectionState: ZabbixConnectionState;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_HOSTS: ZabbixHost[] = [
  {
    id: "h1",
    name: "OLT-Core-01",
    ip: "10.10.1.1",
    hostGroup: "OLT Devices",
    status: "enabled",
    problems: 2,
  },
  {
    id: "h2",
    name: "OLT-Core-02",
    ip: "10.10.1.2",
    hostGroup: "OLT Devices",
    status: "enabled",
    problems: 0,
  },
  {
    id: "h3",
    name: "Switch-Dist-03",
    ip: "10.10.2.3",
    hostGroup: "Distribution",
    status: "enabled",
    problems: 1,
  },
  {
    id: "h4",
    name: "Switch-Access-07",
    ip: "10.10.2.7",
    hostGroup: "Access Layer",
    status: "enabled",
    problems: 0,
  },
  {
    id: "h5",
    name: "Router-WAN-02",
    ip: "10.10.3.2",
    hostGroup: "WAN Routers",
    status: "enabled",
    problems: 3,
  },
  {
    id: "h6",
    name: "Router-Core-01",
    ip: "10.10.3.1",
    hostGroup: "Core Routers",
    status: "disabled",
    problems: 0,
  },
  {
    id: "h7",
    name: "Splitter-Node-14",
    ip: "10.10.4.14",
    hostGroup: "Passive Devices",
    status: "enabled",
    problems: 0,
  },
  {
    id: "h8",
    name: "NMS-Server-01",
    ip: "10.10.5.1",
    hostGroup: "Management",
    status: "enabled",
    problems: 0,
  },
  {
    id: "h9",
    name: "OLT-Edge-05",
    ip: "10.10.1.5",
    hostGroup: "OLT Devices",
    status: "enabled",
    problems: 1,
  },
  {
    id: "h10",
    name: "Firewall-DC-01",
    ip: "10.10.6.1",
    hostGroup: "Security",
    status: "enabled",
    problems: 0,
  },
];

const MOCK_TRIGGERS: ZabbixTrigger[] = [
  {
    id: "t1",
    name: "Interface down on OLT-Core-01",
    host: "OLT-Core-01",
    severity: "disaster",
    lastChange: Date.now() - 4 * 60_000,
    acknowledged: false,
  },
  {
    id: "t2",
    name: "High CPU usage on Router-WAN-02",
    host: "Router-WAN-02",
    severity: "high",
    lastChange: Date.now() - 12 * 60_000,
    acknowledged: false,
  },
  {
    id: "t3",
    name: "ICMP ping failed — OLT-Edge-05",
    host: "OLT-Edge-05",
    severity: "average",
    lastChange: Date.now() - 28 * 60_000,
    acknowledged: true,
  },
  {
    id: "t4",
    name: "Low available memory on Router-WAN-02",
    host: "Router-WAN-02",
    severity: "high",
    lastChange: Date.now() - 35 * 60_000,
    acknowledged: false,
  },
  {
    id: "t5",
    name: "Fiber port signal low — OLT-Core-01",
    host: "OLT-Core-01",
    severity: "average",
    lastChange: Date.now() - 47 * 60_000,
    acknowledged: false,
  },
  {
    id: "t6",
    name: "Switch-Dist-03 port flapping",
    host: "Switch-Dist-03",
    severity: "warning",
    lastChange: Date.now() - 60 * 60_000,
    acknowledged: true,
  },
  {
    id: "t7",
    name: "Router-WAN-02 BGP session down",
    host: "Router-WAN-02",
    severity: "disaster",
    lastChange: Date.now() - 72 * 60_000,
    acknowledged: false,
  },
  {
    id: "t8",
    name: "Scheduled backup missed on NMS-Server-01",
    host: "NMS-Server-01",
    severity: "information",
    lastChange: Date.now() - 120 * 60_000,
    acknowledged: true,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

type Severity = ZabbixTrigger["severity"];

const SEVERITY_CFG: Record<
  Severity,
  { label: string; color: string; icon: React.ElementType }
> = {
  disaster: {
    label: "Disaster",
    color: "text-red-400 bg-red-500/15 border-red-500/30",
    icon: ShieldAlert,
  },
  high: {
    label: "High",
    color: "text-orange-400 bg-orange-500/15 border-orange-500/30",
    icon: AlertCircle,
  },
  average: {
    label: "Average",
    color: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
    icon: AlertTriangle,
  },
  warning: {
    label: "Warning",
    color: "text-blue-400 bg-blue-500/15 border-blue-500/30",
    icon: Zap,
  },
  information: {
    label: "Info",
    color: "text-muted-foreground bg-muted border-border",
    icon: Info,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ZabbixConfigSheet({
  open,
  onOpenChange,
  onConnectionChange,
  connectionState,
}: Props) {
  const [authMethod, setAuthMethod] = useState<"token" | "credentials">(
    "token",
  );
  const [serverUrl, setServerUrl] = useState(
    "https://zabbix.fibernms.internal",
  );
  const [apiToken, setApiToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [testState, setTestState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [testMessage, setTestMessage] = useState("");

  const [syncInterval, setSyncInterval] = useState("5");
  const [autoSyncHosts, setAutoSyncHosts] = useState(true);
  const [autoSyncTriggers, setAutoSyncTriggers] = useState(true);
  const [importHostGroups, setImportHostGroups] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const [hostSearch, setHostSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState<Severity | "all">("all");

  const filteredHosts = MOCK_HOSTS.filter(
    (h) =>
      h.name.toLowerCase().includes(hostSearch.toLowerCase()) ||
      h.ip.includes(hostSearch) ||
      h.hostGroup.toLowerCase().includes(hostSearch.toLowerCase()),
  );

  const filteredTriggers = MOCK_TRIGGERS.filter((t) =>
    severityFilter === "all" ? true : t.severity === severityFilter,
  );

  async function handleTestConnection() {
    if (!serverUrl.trim()) {
      toast.error("Server URL is required");
      return;
    }
    setTestState("loading");
    await new Promise((r) => setTimeout(r, 1600));
    setTestState("success");
    setTestMessage("Connected to Zabbix 6.4.2");
    setTimeout(() => setTestState("idle"), 4000);
  }

  async function handleSaveConnect() {
    if (!serverUrl.trim()) {
      toast.error("Server URL is required");
      return;
    }
    setTestState("loading");
    await new Promise((r) => setTimeout(r, 1400));
    setTestState("idle");
    onConnectionChange({
      connected: true,
      lastSync: Date.now(),
      hostCount: MOCK_HOSTS.length,
      activeAlerts: MOCK_TRIGGERS.filter((t) => !t.acknowledged).length,
    });
    toast.success("Zabbix connected — 10 hosts imported");
  }

  function handleDisconnect() {
    onConnectionChange({ connected: false, hostCount: 0, activeAlerts: 0 });
    setTestState("idle");
    setApiToken("");
    setPassword("");
    toast.success("Zabbix disconnected");
  }

  async function handleSyncNow() {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSyncing(false);
    onConnectionChange({ ...connectionState, lastSync: Date.now() });
    toast.success("Zabbix sync completed — 10 hosts, 8 triggers");
  }

  const activeTriggerCount = MOCK_TRIGGERS.filter(
    (t) => !t.acknowledged,
  ).length;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto border-border bg-card p-0 flex flex-col"
        data-ocid="zabbix-config-sheet"
      >
        {/* Header */}
        <SheetHeader className="px-6 py-5 border-b border-border shrink-0">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-lg bg-red-500/20 text-red-400 flex items-center justify-center text-sm font-bold font-mono shrink-0">
              ZX
            </div>
            <div className="flex-1 min-w-0">
              <SheetTitle className="text-base font-semibold text-foreground">
                Zabbix Integration
              </SheetTitle>
              <p className="text-xs text-muted-foreground mt-0.5">
                Open-source enterprise network monitoring &amp; alerting
                platform
              </p>
            </div>
            {connectionState.connected && (
              <Badge
                variant="outline"
                className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs shrink-0"
              >
                Connected
              </Badge>
            )}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-7">
          {/* ── Connection Settings ── */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <Server className="size-4 text-red-400" />
              Connection Settings
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="zbx-url" className="text-xs">
                  Zabbix Server URL
                </Label>
                <Input
                  id="zbx-url"
                  value={serverUrl}
                  onChange={(e) => setServerUrl(e.target.value)}
                  placeholder="https://zabbix.company.com"
                  className="h-9 text-sm"
                  data-ocid="zabbix.server_url-input"
                />
              </div>

              {/* Auth method toggle */}
              <div className="space-y-2">
                <Label className="text-xs">Authentication Method</Label>
                <div className="flex rounded-lg border border-border overflow-hidden">
                  {(["token", "credentials"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setAuthMethod(method)}
                      className={cn(
                        "flex-1 px-4 py-2 text-xs font-medium transition-colors",
                        authMethod === method
                          ? "bg-primary text-primary-foreground"
                          : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50",
                      )}
                      data-ocid={`zabbix.auth-${method}-toggle`}
                    >
                      {method === "token" ? "API Token" : "Username / Password"}
                    </button>
                  ))}
                </div>
              </div>

              {authMethod === "token" ? (
                <div className="space-y-1.5">
                  <Label htmlFor="zbx-token" className="text-xs">
                    API Token
                  </Label>
                  <Input
                    id="zbx-token"
                    type="password"
                    value={apiToken}
                    onChange={(e) => setApiToken(e.target.value)}
                    placeholder="Paste your Zabbix API token…"
                    className="h-9 text-sm font-mono"
                    data-ocid="zabbix.api-token-input"
                  />
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="zbx-user" className="text-xs">
                      Username
                    </Label>
                    <Input
                      id="zbx-user"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="admin"
                      className="h-9 text-sm"
                      data-ocid="zabbix.username-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="zbx-pass" className="text-xs">
                      Password
                    </Label>
                    <Input
                      id="zbx-pass"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-9 text-sm"
                      data-ocid="zabbix.password-input"
                    />
                  </div>
                </div>
              )}

              {/* Test connection result */}
              {testState === "success" && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2">
                  <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  <span className="text-xs text-emerald-400 font-medium">
                    {testMessage}
                  </span>
                </div>
              )}
              {testState === "error" && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 px-3 py-2">
                  <X className="size-4 text-rose-400 shrink-0" />
                  <span className="text-xs text-rose-400 font-medium">
                    Connection failed — check URL and credentials
                  </span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2 h-8 text-xs"
                  onClick={handleTestConnection}
                  disabled={testState === "loading"}
                  data-ocid="zabbix.test-connection-button"
                >
                  {testState === "loading" ? (
                    <RefreshCw className="size-3.5 animate-spin" />
                  ) : testState === "success" ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Zap className="size-3.5" />
                  )}
                  {testState === "loading"
                    ? "Testing…"
                    : testState === "success"
                      ? "Connected"
                      : "Test Connection"}
                </Button>

                {!connectionState.connected ? (
                  <Button
                    type="button"
                    size="sm"
                    className="gap-2 h-8 text-xs bg-red-600 hover:bg-red-500 text-white border-0"
                    onClick={handleSaveConnect}
                    disabled={testState === "loading"}
                    data-ocid="zabbix.save-connect-button"
                  >
                    {testState === "loading" ? (
                      <RefreshCw className="size-3.5 animate-spin" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                    Save &amp; Connect
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="gap-2 h-8 text-xs text-rose-400 hover:bg-rose-500/10"
                    onClick={handleDisconnect}
                    data-ocid="zabbix.disconnect-button"
                  >
                    <Unplug className="size-3.5" />
                    Disconnect
                  </Button>
                )}
              </div>
            </div>
          </section>

          {/* ── Sync Settings (only when connected) ── */}
          {connectionState.connected && (
            <section>
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <RefreshCw className="size-4 text-red-400" />
                Sync Settings
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="zbx-interval" className="text-xs">
                    Sync Interval
                  </Label>
                  <select
                    id="zbx-interval"
                    value={syncInterval}
                    onChange={(e) => setSyncInterval(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                    data-ocid="zabbix.sync-interval-select"
                  >
                    <option value="1">Every 1 minute</option>
                    <option value="5">Every 5 minutes</option>
                    <option value="15">Every 15 minutes</option>
                    <option value="30">Every 30 minutes</option>
                    <option value="60">Every 1 hour</option>
                  </select>
                </div>

                {[
                  {
                    id: "hosts",
                    label: "Auto-sync hosts",
                    desc: "Automatically import new hosts from Zabbix",
                    value: autoSyncHosts,
                    set: setAutoSyncHosts,
                    ocid: "zabbix.auto-sync-hosts-switch",
                  },
                  {
                    id: "triggers",
                    label: "Auto-sync triggers / alerts",
                    desc: "Pull active triggers and alert states on each sync",
                    value: autoSyncTriggers,
                    set: setAutoSyncTriggers,
                    ocid: "zabbix.auto-sync-triggers-switch",
                  },
                  {
                    id: "groups",
                    label: "Import host groups as device groups",
                    desc: "Map Zabbix host groups to FiberNMS device groups",
                    value: importHostGroups,
                    set: setImportHostGroups,
                    ocid: "zabbix.import-groups-switch",
                  },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/20 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground">
                        {item.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                    <Switch
                      checked={item.value}
                      onCheckedChange={item.set}
                      data-ocid={item.ocid}
                      aria-label={item.label}
                    />
                  </div>
                ))}

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="gap-2 h-8 text-xs"
                    onClick={handleSyncNow}
                    disabled={syncing}
                    data-ocid="zabbix.sync-now-button"
                  >
                    <RefreshCw
                      className={cn("size-3.5", syncing && "animate-spin")}
                    />
                    {syncing ? "Syncing…" : "Sync Now"}
                  </Button>
                  {connectionState.lastSync && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3" />
                      Last synced {formatRelativeTime(connectionState.lastSync)}
                    </span>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ── Live Data Preview (only when connected) ── */}
          {connectionState.connected && (
            <section className="space-y-6">
              {/* Hosts */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Zabbix Hosts
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-xs border-border text-muted-foreground"
                  >
                    {MOCK_HOSTS.length}
                  </Badge>
                </div>
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                  <Input
                    value={hostSearch}
                    onChange={(e) => setHostSearch(e.target.value)}
                    placeholder="Search hosts…"
                    className="h-8 text-xs pl-9"
                    data-ocid="zabbix.hosts-search-input"
                  />
                </div>
                <div className="rounded-xl border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/40">
                        <TableHead className="text-xs font-semibold text-muted-foreground">
                          Host
                        </TableHead>
                        <TableHead className="text-xs font-semibold text-muted-foreground hidden sm:table-cell">
                          IP / DNS
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
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredHosts.map((host, i) => (
                        <TableRow
                          key={host.id}
                          className="hover:bg-muted/30 transition-colors"
                          data-ocid={`zabbix.host.${i + 1}`}
                        >
                          <TableCell className="text-xs font-medium text-foreground py-2">
                            {host.name}
                          </TableCell>
                          <TableCell className="text-xs font-mono text-muted-foreground py-2 hidden sm:table-cell">
                            {host.ip}
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground py-2 hidden md:table-cell">
                            {host.hostGroup}
                          </TableCell>
                          <TableCell className="py-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs border",
                                host.status === "enabled"
                                  ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                  : "bg-muted text-muted-foreground border-border",
                              )}
                            >
                              {host.status === "enabled"
                                ? "Enabled"
                                : "Disabled"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right py-2">
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
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Active Triggers */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-sm font-semibold text-foreground">
                    Active Triggers
                  </h3>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs border",
                      activeTriggerCount > 0
                        ? "bg-rose-500/15 text-rose-400 border-rose-500/30"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {activeTriggerCount}
                  </Badge>
                </div>

                {/* Severity filter chips */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {(
                    [
                      "all",
                      "disaster",
                      "high",
                      "average",
                      "warning",
                      "information",
                    ] as const
                  ).map((sev) => (
                    <button
                      key={sev}
                      type="button"
                      onClick={() => setSeverityFilter(sev)}
                      className={cn(
                        "px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors",
                        severityFilter === sev
                          ? sev === "all"
                            ? "bg-primary text-primary-foreground border-primary"
                            : cn(SEVERITY_CFG[sev]?.color, "border")
                          : "border-border text-muted-foreground hover:border-border/80 bg-transparent",
                      )}
                      data-ocid={`zabbix.severity-filter-${sev}`}
                    >
                      {sev === "all" ? "All" : SEVERITY_CFG[sev].label}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {filteredTriggers.map((trigger, i) => {
                    const cfg = SEVERITY_CFG[trigger.severity];
                    const Icon = cfg.icon;
                    return (
                      <div
                        key={trigger.id}
                        className="flex items-start gap-3 rounded-lg border border-border bg-muted/20 px-3 py-2.5 hover:bg-muted/40 transition-colors"
                        data-ocid={`zabbix.trigger.${i + 1}`}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-xs border shrink-0 mt-0.5 gap-1 flex items-center",
                            cfg.color,
                          )}
                        >
                          <Icon className="size-3" />
                          {cfg.label}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground truncate">
                            {trigger.name}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                            <span>{trigger.host}</span>
                            <span>·</span>
                            <Clock className="size-3" />
                            <span>
                              {formatRelativeTime(trigger.lastChange)}
                            </span>
                          </p>
                        </div>
                        <div className="shrink-0">
                          {trigger.acknowledged ? (
                            <Badge
                              variant="outline"
                              className="text-xs bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                            >
                              <Check className="size-3 mr-1" />
                              Ack
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-xs bg-muted text-muted-foreground border-border"
                            >
                              Unack
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
