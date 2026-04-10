import { FeatureGate } from "@/components/subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
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
import { MOCK_API_KEYS, MOCK_WEBHOOKS } from "@/data/billingMockData";
import type { ApiKey, Webhook } from "@/data/billingMockData";
import { useSubscription } from "@/hooks/useFeature";
import { cn } from "@/lib/utils";
import { FeatureFlag } from "@/types/subscription";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Eye,
  EyeOff,
  Globe,
  Key,
  Link2,
  Plus,
  RefreshCw,
  Settings,
  Terminal,
  Trash2,
  Unplug,
  Webhook as WebhookIcon,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Integration {
  id: string;
  name: string;
  category: string;
  status: "connected" | "not_connected" | "beta";
  lastSync?: number;
  icon: string;
  iconBg: string;
  description: string;
}

interface ApiActivityEntry {
  endpoint: string;
  timestamp: number;
  responseTime: number;
  status: number;
  method: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MS = 60_000;

const INTEGRATIONS: Integration[] = [
  // OSS/BSS
  {
    id: "opennms",
    name: "OpenNMS",
    category: "OSS/BSS",
    status: "connected",
    lastSync: Date.now() - 8 * MS,
    icon: "ON",
    iconBg: "bg-sky-500/20 text-sky-400",
    description:
      "Open-source network management platform for SNMP polling and event correlation.",
  },
  {
    id: "netcracker",
    name: "Netcracker",
    category: "OSS/BSS",
    status: "not_connected",
    icon: "NC",
    iconBg: "bg-violet-500/20 text-violet-400",
    description: "BSS/OSS transformation suite for telecom digital operations.",
  },
  {
    id: "amdocs",
    name: "Amdocs",
    category: "OSS/BSS",
    status: "beta",
    icon: "AM",
    iconBg: "bg-orange-500/20 text-orange-400",
    description:
      "Telecom BSS stack — billing, mediation, and order management.",
  },
  // CRM
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    status: "connected",
    lastSync: Date.now() - 30 * MS,
    icon: "SF",
    iconBg: "bg-blue-500/20 text-blue-400",
    description:
      "Sync SLA incidents and customer accounts to Salesforce Service Cloud.",
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "CRM",
    status: "not_connected",
    icon: "SN",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    description:
      "ITSM platform for incident, problem, and change management workflows.",
  },
  // Ticketing
  {
    id: "jira",
    name: "Jira Service Desk",
    category: "Ticketing",
    status: "connected",
    lastSync: Date.now() - 15 * MS,
    icon: "JS",
    iconBg: "bg-blue-600/20 text-blue-300",
    description:
      "Create and sync tickets for fault events and NOC escalations.",
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    category: "Ticketing",
    status: "connected",
    lastSync: Date.now() - 3 * MS,
    icon: "PD",
    iconBg: "bg-rose-500/20 text-rose-400",
    description:
      "On-call alerting and incident response for critical network faults.",
  },
  {
    id: "opsgenie",
    name: "OpsGenie",
    category: "Ticketing",
    status: "beta",
    icon: "OG",
    iconBg: "bg-amber-500/20 text-amber-400",
    description: "Alert management and on-call scheduling for NOC teams.",
  },
  // Monitoring
  {
    id: "prometheus",
    name: "Prometheus",
    category: "Monitoring",
    status: "connected",
    lastSync: Date.now() - 2 * MS,
    icon: "PR",
    iconBg: "bg-orange-500/20 text-orange-400",
    description:
      "Metrics scraping and time-series storage for device telemetry.",
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "Monitoring",
    status: "connected",
    lastSync: Date.now() - 5 * MS,
    icon: "GF",
    iconBg: "bg-amber-500/20 text-amber-400",
    description:
      "Visualization dashboards for network metrics and SLA reporting.",
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Monitoring",
    status: "not_connected",
    icon: "DD",
    iconBg: "bg-violet-500/20 text-violet-400",
    description:
      "APM and infrastructure monitoring with full-stack correlation.",
  },
];

const API_ACTIVITY: ApiActivityEntry[] = [
  {
    endpoint: "/api/v2/devices",
    timestamp: Date.now() - 1 * MS,
    responseTime: 48,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/alerts",
    timestamp: Date.now() - 3 * MS,
    responseTime: 122,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/devices/ont-4821/metrics",
    timestamp: Date.now() - 7 * MS,
    responseTime: 65,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/workflows/wf-003/execute",
    timestamp: Date.now() - 12 * MS,
    responseTime: 340,
    status: 202,
    method: "POST",
  },
  {
    endpoint: "/api/v2/sla/customers",
    timestamp: Date.now() - 18 * MS,
    responseTime: 89,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/predictive/risks",
    timestamp: Date.now() - 22 * MS,
    responseTime: 210,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/devices/olt-0017",
    timestamp: Date.now() - 31 * MS,
    responseTime: 55,
    status: 404,
    method: "GET",
  },
  {
    endpoint: "/api/v2/audit/logs",
    timestamp: Date.now() - 45 * MS,
    responseTime: 178,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/capacity/forecast",
    timestamp: Date.now() - 60 * MS,
    responseTime: 412,
    status: 200,
    method: "GET",
  },
  {
    endpoint: "/api/v2/topology/graph",
    timestamp: Date.now() - 75 * MS,
    responseTime: 284,
    status: 200,
    method: "GET",
  },
];

const WEBHOOK_EVENTS = [
  "device.updated",
  "fault.detected",
  "signal.changed",
  "sla.breach",
  "workflow.executed",
];

const KEY_PERMISSIONS = [
  "devices:read",
  "devices:write",
  "alerts:read",
  "alerts:write",
  "metrics:read",
  "workflows:execute",
  "audit:read",
  "admin",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function generateFakeKey(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const suffix = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  const body = Array.from(
    { length: 32 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `sk-${body}${suffix}`;
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Integration["status"] }) {
  const cfg = {
    connected: {
      label: "Connected",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    },
    not_connected: {
      label: "Not Connected",
      className: "bg-muted text-muted-foreground border-border",
    },
    beta: {
      label: "Beta",
      className: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    },
  }[status];
  return (
    <Badge
      variant="outline"
      className={cn("text-xs font-medium border", cfg.className)}
    >
      {cfg.label}
    </Badge>
  );
}

function WebhookStatusBadge({ status }: { status: Webhook["status"] }) {
  if (status === "active")
    return (
      <Badge
        variant="outline"
        className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs"
      >
        Active
      </Badge>
    );
  if (status === "error")
    return (
      <Badge
        variant="outline"
        className="bg-rose-500/15 text-rose-400 border-rose-500/30 text-xs"
      >
        Error
      </Badge>
    );
  return (
    <Badge
      variant="outline"
      className="bg-muted text-muted-foreground border-border text-xs"
    >
      Inactive
    </Badge>
  );
}

function HttpStatusBadge({ code }: { code: number }) {
  const ok = code >= 200 && code < 300;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-xs font-mono font-medium",
        ok ? "text-emerald-400" : "text-rose-400",
      )}
    >
      {ok ? (
        <CheckCircle2 className="size-3" />
      ) : (
        <AlertCircle className="size-3" />
      )}
      {code}
    </span>
  );
}

// ─── API Keys Tab ─────────────────────────────────────────────────────────────

function ApiKeysTab() {
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
  const [showForm, setShowForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyExpiry, setNewKeyExpiry] = useState("never");
  const [newKeyPerms, setNewKeyPerms] = useState<string[]>([
    "devices:read",
    "alerts:read",
  ]);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revealId, setRevealId] = useState<string | null>(null);

  function togglePerm(perm: string) {
    setNewKeyPerms((p) =>
      p.includes(perm) ? p.filter((x) => x !== perm) : [...p, perm],
    );
  }

  function handleGenerate() {
    if (!newKeyName.trim()) {
      toast.error("Key name is required");
      return;
    }
    const fullKey = generateFakeKey();
    const masked = `sk-****...${fullKey.slice(-4)}`;
    const newKey: ApiKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: masked,
      created: Date.now(),
      lastUsed: Date.now(),
      permissions: newKeyPerms,
    };
    setKeys((k) => [newKey, ...k]);
    setGeneratedKey(fullKey);
  }

  function handleCopy() {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("API key copied to clipboard");
    });
  }

  function handleRevoke(id: string) {
    setKeys((k) => k.filter((key) => key.id !== id));
    toast.success("API key revoked");
  }

  function handleDone() {
    setShowForm(false);
    setGeneratedKey(null);
    setNewKeyName("");
    setNewKeyPerms(["devices:read", "alerts:read"]);
    setNewKeyExpiry("never");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage API keys for programmatic access to the FiberNMS API. Keys
          inherit your organization's plan limits.
        </p>
        <Button
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => {
            setShowForm(true);
            setGeneratedKey(null);
          }}
          data-ocid="api-keys-generate-btn"
        >
          <Plus className="size-4" />
          Generate New Key
        </Button>
      </div>

      {/* Generate Key Form */}
      {showForm && !generatedKey && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <Key className="size-4 text-primary" />
              New API Key
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="key-name" className="text-xs">
                  Key Name
                </Label>
                <Input
                  id="key-name"
                  placeholder="e.g. Grafana Integration"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  data-ocid="api-key-name-input"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="key-expiry" className="text-xs">
                  Expiry
                </Label>
                <select
                  id="key-expiry"
                  value={newKeyExpiry}
                  onChange={(e) => setNewKeyExpiry(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  data-ocid="api-key-expiry-select"
                >
                  <option value="never">Never expires</option>
                  <option value="30d">30 days</option>
                  <option value="90d">90 days</option>
                  <option value="1y">1 year</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Permissions</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {KEY_PERMISSIONS.map((perm) => (
                  <div key={perm} className="flex items-center gap-2">
                    <Checkbox
                      id={`perm-${perm}`}
                      checked={newKeyPerms.includes(perm)}
                      onCheckedChange={() => togglePerm(perm)}
                      data-ocid={`perm-checkbox-${perm}`}
                    />
                    <Label
                      htmlFor={`perm-${perm}`}
                      className="text-xs font-mono cursor-pointer"
                    >
                      {perm}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                onClick={handleGenerate}
                data-ocid="api-key-confirm-btn"
              >
                Generate Key
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDone}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Show Generated Key Once */}
      {generatedKey && (
        <Card className="border-amber-500/40 bg-amber-500/5">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-start gap-3">
              <AlertTriangle className="size-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Copy your API key now
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  This key will only be shown once. Store it securely.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-mono text-foreground break-all border border-border">
                {generatedKey}
              </code>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 shrink-0"
                onClick={handleCopy}
                data-ocid="api-key-copy-btn"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <Button
              size="sm"
              variant="default"
              onClick={handleDone}
              data-ocid="api-key-done-btn"
            >
              Done
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Keys Table */}
      <div className="rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40">
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Key Name
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Key
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Created
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Last Used
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground">
                Permissions
              </TableHead>
              <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((k) => (
              <TableRow
                key={k.id}
                className="hover:bg-muted/30 transition-colors"
                data-ocid={`api-key-row-${k.id}`}
              >
                <TableCell className="font-medium text-sm text-foreground">
                  <div className="flex items-center gap-2">
                    <Key className="size-3.5 text-primary shrink-0" />
                    {k.name}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <code className="text-xs font-mono text-muted-foreground">
                      {revealId === k.id ? k.key : k.key}
                    </code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6 hover:bg-muted"
                      onClick={() =>
                        setRevealId(revealId === k.id ? null : k.id)
                      }
                      aria-label={
                        revealId === k.id ? "Hide key" : "Show key info"
                      }
                    >
                      {revealId === k.id ? (
                        <EyeOff className="size-3" />
                      ) : (
                        <Eye className="size-3" />
                      )}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatRelativeTime(k.created)}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {formatRelativeTime(k.lastUsed)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {k.permissions.slice(0, 2).map((p) => (
                      <Badge
                        key={p}
                        variant="outline"
                        className="text-xs font-mono px-1.5 py-0 border-border text-muted-foreground"
                      >
                        {p}
                      </Badge>
                    ))}
                    {k.permissions.length > 2 && (
                      <Badge
                        variant="outline"
                        className="text-xs border-border text-muted-foreground"
                      >
                        +{k.permissions.length - 2}
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h-7 gap-1.5"
                    onClick={() => handleRevoke(k.id)}
                    data-ocid={`api-key-revoke-${k.id}`}
                  >
                    <Trash2 className="size-3.5" />
                    Revoke
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ─── Webhooks Tab ─────────────────────────────────────────────────────────────

function WebhooksTab() {
  const [webhooks, setWebhooks] = useState<Webhook[]>(MOCK_WEBHOOKS);
  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newEvents, setNewEvents] = useState<string[]>(["fault.detected"]);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testSuccess, setTestSuccess] = useState<string | null>(null);

  function toggleEvent(event: string) {
    setNewEvents((e) =>
      e.includes(event) ? e.filter((x) => x !== event) : [...e, event],
    );
  }

  function handleToggleStatus(id: string) {
    setWebhooks((wh) =>
      wh.map((w) =>
        w.id === id
          ? { ...w, status: w.status === "active" ? "inactive" : "active" }
          : w,
      ),
    );
  }

  function handleDelete(id: string) {
    setWebhooks((wh) => wh.filter((w) => w.id !== id));
    toast.success("Webhook deleted");
  }

  async function handleTest(id: string) {
    setTestingId(id);
    setTestSuccess(null);
    await new Promise((r) => setTimeout(r, 1200));
    setTestingId(null);
    setTestSuccess(id);
    toast.success("Test payload delivered — HTTP 200 OK");
    setTimeout(() => setTestSuccess(null), 3000);
  }

  function handleAdd() {
    if (!newUrl.trim()) {
      toast.error("Endpoint URL is required");
      return;
    }
    if (newEvents.length === 0) {
      toast.error("Select at least one event");
      return;
    }
    const newWh: Webhook = {
      id: `wh-${Date.now()}`,
      url: newUrl.trim(),
      events: newEvents,
      status: "active",
      lastTriggered: Date.now(),
    };
    setWebhooks((wh) => [newWh, ...wh]);
    setShowForm(false);
    setNewUrl("");
    setNewEvents(["fault.detected"]);
    toast.success("Webhook added");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Receive real-time HTTP callbacks when network events occur. FiberNMS
          sends POST requests with JSON payloads.
        </p>
        <Button
          size="sm"
          className="gap-2 shrink-0"
          onClick={() => setShowForm(true)}
          data-ocid="add-webhook-btn"
        >
          <Plus className="size-4" />
          Add Webhook
        </Button>
      </div>

      {showForm && (
        <Card className="border-primary/30 bg-primary/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <WebhookIcon className="size-4 text-primary" />
              New Webhook Endpoint
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="wh-url" className="text-xs">
                  Endpoint URL
                </Label>
                <Input
                  id="wh-url"
                  placeholder="https://hooks.example.com/nms-events"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  data-ocid="webhook-url-input"
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="wh-desc" className="text-xs">
                  Description (optional)
                </Label>
                <Input
                  id="wh-desc"
                  placeholder="e.g. PagerDuty fault escalation"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs">Events to subscribe</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WEBHOOK_EVENTS.map((evt) => (
                  <div key={evt} className="flex items-center gap-2">
                    <Checkbox
                      id={`evt-${evt}`}
                      checked={newEvents.includes(evt)}
                      onCheckedChange={() => toggleEvent(evt)}
                      data-ocid={`webhook-event-${evt}`}
                    />
                    <Label
                      htmlFor={`evt-${evt}`}
                      className="text-xs font-mono cursor-pointer"
                    >
                      {evt}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                onClick={handleAdd}
                data-ocid="webhook-save-btn"
              >
                Save Webhook
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3">
        {webhooks.map((wh) => (
          <Card
            key={wh.id}
            className="border-border"
            data-ocid={`webhook-row-${wh.id}`}
          >
            <CardContent className="pt-4 pb-3">
              <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Globe className="size-3.5 text-primary shrink-0" />
                    <code className="text-xs font-mono text-foreground break-all">
                      {wh.url}
                    </code>
                    <WebhookStatusBadge status={wh.status} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {wh.events.map((ev) => (
                      <Badge
                        key={ev}
                        variant="outline"
                        className="text-xs font-mono border-border text-muted-foreground"
                      >
                        {ev}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="size-3" />
                    Last triggered {formatRelativeTime(wh.lastTriggered)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {wh.status === "active" ? "On" : "Off"}
                    </span>
                    <Switch
                      checked={wh.status === "active"}
                      onCheckedChange={() => handleToggleStatus(wh.id)}
                      data-ocid={`webhook-toggle-${wh.id}`}
                      aria-label={`Toggle ${wh.url}`}
                    />
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 h-7 text-xs"
                    onClick={() => handleTest(wh.id)}
                    disabled={testingId === wh.id}
                    data-ocid={`webhook-test-${wh.id}`}
                  >
                    {testingId === wh.id ? (
                      <RefreshCw className="size-3 animate-spin" />
                    ) : testSuccess === wh.id ? (
                      <Check className="size-3 text-emerald-400" />
                    ) : (
                      <Zap className="size-3" />
                    )}
                    {testingId === wh.id
                      ? "Testing…"
                      : testSuccess === wh.id
                        ? "Success"
                        : "Test"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-rose-400 hover:bg-rose-500/10 h-7 gap-1 text-xs"
                    onClick={() => handleDelete(wh.id)}
                    data-ocid={`webhook-delete-${wh.id}`}
                  >
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Integrations Tab ─────────────────────────────────────────────────────────

const CATEGORIES = ["OSS/BSS", "CRM", "Ticketing", "Monitoring"] as const;

function IntegrationCard({ integration }: { integration: Integration }) {
  const [configOpen, setConfigOpen] = useState(false);
  const [connected, setConnected] = useState(
    integration.status === "connected",
  );

  return (
    <Card
      className="border-border hover:border-primary/30 transition-colors"
      data-ocid={`integration-card-${integration.id}`}
    >
      <CardContent className="pt-4 pb-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "size-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono shrink-0",
                integration.iconBg,
              )}
            >
              {integration.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                {integration.name}
              </p>
              {connected && integration.lastSync && (
                <p className="text-xs text-muted-foreground">
                  Synced {formatRelativeTime(integration.lastSync)}
                </p>
              )}
            </div>
          </div>
          <StatusBadge status={connected ? "connected" : "not_connected"} />
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          {integration.description}
        </p>
        <div className="flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 h-7 text-xs flex-1"
            onClick={() => setConfigOpen(!configOpen)}
            data-ocid={`integration-configure-${integration.id}`}
          >
            <Settings className="size-3" />
            Configure
          </Button>
          {connected ? (
            <Button
              variant="ghost"
              size="sm"
              className="text-rose-400 hover:bg-rose-500/10 h-7 text-xs gap-1.5"
              onClick={() => {
                setConnected(false);
                toast.success(`${integration.name} disconnected`);
              }}
              data-ocid={`integration-disconnect-${integration.id}`}
            >
              <Unplug className="size-3.5" />
              Disconnect
            </Button>
          ) : (
            <Button
              size="sm"
              className="h-7 text-xs gap-1.5 flex-1"
              onClick={() => {
                setConnected(true);
                setConfigOpen(false);
                toast.success(`${integration.name} connected`);
              }}
              data-ocid={`integration-connect-${integration.id}`}
            >
              <Link2 className="size-3" />
              Connect
            </Button>
          )}
        </div>

        {configOpen && (
          <div className="pt-2 border-t border-border space-y-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Endpoint / API Base URL</Label>
              <Input
                defaultValue={
                  connected ? `https://${integration.id}.fibernms.internal` : ""
                }
                placeholder="https://…"
                className="h-8 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">API Token / Secret</Label>
              <Input
                type="password"
                placeholder="Enter integration secret…"
                className="h-8 text-xs"
              />
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setConfigOpen(false);
                  toast.success("Settings saved");
                }}
              >
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 text-xs"
                onClick={() => setConfigOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function IntegrationsTab() {
  return (
    <div className="space-y-6">
      {CATEGORIES.map((cat) => {
        const items = INTEGRATIONS.filter((i) => i.category === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-sm font-semibold text-foreground">{cat}</h3>
              <Badge
                variant="outline"
                className="text-xs border-border text-muted-foreground"
              >
                {items.length}
              </Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((int) => (
                <IntegrationCard key={int.id} integration={int} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Rate Limits Tab ──────────────────────────────────────────────────────────

const PLAN_RATE_LIMITS: Record<
  string,
  { monthly: number; perMinute: number; burst: number }
> = {
  BASIC: { monthly: 50_000, perMinute: 20, burst: 50 },
  PROFESSIONAL: { monthly: 500_000, perMinute: 100, burst: 200 },
  ENTERPRISE: { monthly: 5_000_000, perMinute: 1_000, burst: 2_000 },
  ULTRA: { monthly: 50_000_000, perMinute: 10_000, burst: 25_000 },
};

function formatNum(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return String(n);
}

function RateLimitsTab() {
  const sub = useSubscription();
  const limits =
    PLAN_RATE_LIMITS[sub.currentPlan] ?? PLAN_RATE_LIMITS.ENTERPRISE;
  const apiPct =
    sub.apiQuota > 0 ? Math.min(100, (sub.apiUsed / sub.apiQuota) * 100) : 0;
  const resetDate = new Date(Date.now() + 14 * 86_400_000).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {(
          [
            {
              label: "Monthly Quota",
              value: formatNum(limits.monthly),
              icon: Activity,
              sub: "calls / month",
            },
            {
              label: "Rate Limit",
              value: `${formatNum(limits.perMinute)}/min`,
              icon: Zap,
              sub: "sustained rate",
            },
            {
              label: "Burst Limit",
              value: formatNum(limits.burst),
              icon: ChevronUp,
              sub: "short bursts",
            },
          ] as const
        ).map(({ label, value, icon: Icon, sub: subLabel }) => (
          <Card key={label} className="border-border">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="size-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{label}</p>
                  <p className="text-xl font-bold font-mono text-foreground">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground">{subLabel}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border">
        <CardContent className="pt-4 pb-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">
                Monthly Usage
              </p>
              <p className="text-xs text-muted-foreground">
                Resets on {resetDate}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm font-mono font-semibold text-foreground">
                {formatNum(sub.apiUsed)}{" "}
                <span className="text-muted-foreground font-normal">
                  / {formatNum(sub.apiQuota)}
                </span>
              </p>
              <p className="text-xs text-muted-foreground">
                {apiPct.toFixed(1)}% used
              </p>
            </div>
          </div>
          <Progress
            value={apiPct}
            className={cn(
              "h-2",
              apiPct > 85
                ? "[&>div]:bg-rose-500"
                : apiPct > 60
                  ? "[&>div]:bg-amber-500"
                  : "[&>div]:bg-primary",
            )}
          />
        </CardContent>
      </Card>

      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <Terminal className="size-4 text-primary" />
          Recent API Activity
          <Badge
            variant="outline"
            className="text-xs border-border text-muted-foreground"
          >
            Last 10 calls
          </Badge>
        </h3>
        <div className="rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead className="text-xs font-semibold text-muted-foreground w-16">
                  Method
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">
                  Endpoint
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground">
                  Time
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                  Response
                </TableHead>
                <TableHead className="text-xs font-semibold text-muted-foreground text-right">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {API_ACTIVITY.map((entry, i) => (
                <TableRow
                  key={`${entry.endpoint}-${entry.timestamp}`}
                  className="hover:bg-muted/30 transition-colors"
                  data-ocid={`api-activity-row-${i}`}
                >
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-mono border",
                        entry.method === "POST"
                          ? "border-primary/40 text-primary"
                          : "border-border text-muted-foreground",
                      )}
                    >
                      {entry.method}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-foreground">
                    {entry.endpoint}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {formatRelativeTime(entry.timestamp)}
                  </TableCell>
                  <TableCell className="text-right text-xs font-mono text-muted-foreground">
                    {entry.responseTime}ms
                  </TableCell>
                  <TableCell className="text-right">
                    <HttpStatusBadge code={entry.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Integrations() {
  return (
    <div className="p-6 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">
          API &amp; Integrations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage API keys, webhook endpoints, and third-party integrations for
          your FiberNMS organization.
        </p>
      </div>

      {/* Feature Gate wraps all page content below header */}
      <FeatureGate
        feature={FeatureFlag.API_ACCESS}
        mode="replace"
        featureLabel="API & Integrations"
        description="Access the API management panel, webhook configuration, and OSS/BSS integration connectors. Available on Enterprise plan and above."
      >
        <Tabs defaultValue="api-keys" className="space-y-5">
          <TabsList
            className="bg-muted/60 gap-1 h-9"
            data-ocid="integrations-tabs"
          >
            <TabsTrigger
              value="api-keys"
              className="text-xs gap-1.5 data-[state=active]:bg-card"
              data-ocid="tab-api-keys"
            >
              <Key className="size-3.5" />
              API Keys
            </TabsTrigger>
            <TabsTrigger
              value="webhooks"
              className="text-xs gap-1.5 data-[state=active]:bg-card"
              data-ocid="tab-webhooks"
            >
              <WebhookIcon className="size-3.5" />
              Webhooks
            </TabsTrigger>
            <TabsTrigger
              value="integrations"
              className="text-xs gap-1.5 data-[state=active]:bg-card"
              data-ocid="tab-integrations"
            >
              <Link2 className="size-3.5" />
              Integrations
            </TabsTrigger>
            <TabsTrigger
              value="rate-limits"
              className="text-xs gap-1.5 data-[state=active]:bg-card"
              data-ocid="tab-rate-limits"
            >
              <Activity className="size-3.5" />
              Rate Limits
            </TabsTrigger>
          </TabsList>

          <TabsContent value="api-keys">
            <ApiKeysTab />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhooksTab />
          </TabsContent>

          <TabsContent value="integrations">
            <IntegrationsTab />
          </TabsContent>

          <TabsContent value="rate-limits">
            <RateLimitsTab />
          </TabsContent>
        </Tabs>
      </FeatureGate>
    </div>
  );
}
