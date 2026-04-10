import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  getCompanyById,
  getInvoicesByCompany,
  getOrdersByCompany,
  getUsageByCompany,
  getUsersByCompany,
  mockCompanies,
} from "@/data/superAdminMockData";
import { useAuthStore } from "@/store/authStore";
import type {
  AdminUser,
  Company,
  Invoice,
  UsageMetric,
} from "@/types/superAdmin";
import { useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart2,
  Bell,
  Building2,
  ChevronRight,
  CreditCard,
  Edit2,
  ExternalLink,
  Globe,
  Key,
  Link as LinkIcon,
  Map as MapIcon,
  Monitor,
  Palette,
  PenTool,
  Plus,
  Server,
  Settings,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function fmtCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
function fmtRelative(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const h = Math.floor(diff / 3_600_000);
  if (h < 1) return `${Math.floor(diff / 60_000)}m ago`;
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
function usageColor(pct: number) {
  if (pct >= 90)
    return {
      bar: "bg-red-500",
      text: "text-red-400",
      badge: "bg-red-500/15 text-red-400 border-red-500/30",
    };
  if (pct >= 70)
    return {
      bar: "bg-amber-500",
      text: "text-amber-400",
      badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    };
  return {
    bar: "bg-emerald-500",
    text: "text-emerald-400",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  };
}

const PLAN_COLORS: Record<string, string> = {
  BASIC: "bg-muted/40 text-muted-foreground border-border",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};
const PLAN_PRICE: Record<string, string> = {
  BASIC: "$200/mo",
  PROFESSIONAL: "$500/mo",
  ENTERPRISE: "$2,000/mo",
  ULTRA: "$5,000/mo",
};

const MOCK_WORKFLOWS = [
  {
    id: "wf1",
    name: "Alert Response Automation",
    status: true,
    lastRun: "2026-04-09T14:22:00Z",
    triggers: 42,
  },
  {
    id: "wf2",
    name: "Daily SLA Report",
    status: true,
    lastRun: "2026-04-10T06:00:00Z",
    triggers: 18,
  },
  {
    id: "wf3",
    name: "Fiber Cut Escalation",
    status: false,
    lastRun: "2026-04-07T11:15:00Z",
    triggers: 7,
  },
  {
    id: "wf4",
    name: "NOC Shift Handover",
    status: true,
    lastRun: "2026-04-10T08:00:00Z",
    triggers: 30,
  },
  {
    id: "wf5",
    name: "Capacity Threshold Alert",
    status: false,
    lastRun: "2026-04-05T09:45:00Z",
    triggers: 5,
  },
];

const TIMEZONES = [
  "UTC",
  "UTC+05:30 (IST)",
  "UTC-05:00 (EST)",
  "UTC-08:00 (PST)",
  "UTC+01:00 (CET)",
  "UTC+09:00 (JST)",
  "UTC+08:00 (SGT)",
  "UTC+11:00 (AEST)",
];

// ─── Company Selector ──────────────────────────────────────────────────────────

function CompanySelector({
  current,
  onChange,
}: { current: Company; onChange: (id: string) => void }) {
  return (
    <Select value={current.id} onValueChange={onChange}>
      <SelectTrigger
        className="bg-background border-input w-56 text-sm"
        data-ocid="company-selector"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-popover border-border max-h-72 overflow-y-auto">
        {mockCompanies.map((c) => (
          <SelectItem key={c.id} value={c.id} className="text-xs">
            {c.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// ─── Invite User Modal ─────────────────────────────────────────────────────────

function InviteUserModal({
  open,
  onClose,
}: { open: boolean; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("NOC Operator");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    toast.success("Invitation sent", {
      description: `Invite sent to ${email} as ${role}`,
    });
    setEmail("");
    setRole("NOC Operator");
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-primary" />
            Invite User
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">
              Email Address *
            </Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="engineer@company.com"
              className="bg-background border-input"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Assign Role</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger className="bg-background border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                {["Admin", "Network Engineer", "NOC Operator", "Viewer"].map(
                  (r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1 border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground"
              data-ocid="invite-user-submit"
            >
              Send Invite
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Users Tab ────────────────────────────────────────────────────────────────

const ROLE_BADGE: Record<string, string> = {
  Admin: "bg-red-500/15 text-red-400 border-red-500/30",
  "Network Engineer": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "NOC Operator": "bg-amber-500/15 text-amber-400 border-amber-500/30",
  Viewer: "bg-muted/40 text-muted-foreground border-border",
};

function UsersTab({ users }: { users: AdminUser[] }) {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [localUsers, setLocalUsers] = useState(users.slice(0, 20));

  function disableUser(id: string) {
    setLocalUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? { ...u, status: u.status === "active" ? "disabled" : "active" }
          : u,
      ),
    );
    toast.success("User status updated");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {users.length} users in this organization
        </p>
        <Button
          size="sm"
          onClick={() => setInviteOpen(true)}
          className="bg-primary text-primary-foreground gap-1.5"
          data-ocid="invite-user-btn"
        >
          <UserPlus className="w-3.5 h-3.5" />
          Invite User
        </Button>
      </div>
      <GlassCard className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/50">
              {["User", "Email", "Role", "Status", "Last Login", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-display text-muted-foreground uppercase tracking-widest"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {localUsers.map((user, i) => (
              <tr
                key={user.id}
                className={`border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors ${i % 2 === 0 ? "bg-muted/5" : ""}`}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <span className="text-[10px] font-bold text-primary">
                        {initials(user.name)}
                      </span>
                    </div>
                    <span className="text-xs font-medium text-foreground truncate max-w-[140px]">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground truncate max-w-[160px]">
                  {user.email}
                </td>
                <td className="px-4 py-2.5">
                  <Badge
                    className={`text-xs px-2 py-0.5 border ${ROLE_BADGE[user.role] ?? "bg-muted text-foreground border-border"}`}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="px-4 py-2.5">
                  <Badge
                    className={`text-xs px-2 py-0.5 border ${user.status === "active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted/40 text-muted-foreground border-border"}`}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground font-mono">
                  {fmtRelative(user.lastLogin)}
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => disableUser(user.id)}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid={`user-toggle-${user.id}`}
                      title={
                        user.status === "active"
                          ? "Disable user"
                          : "Enable user"
                      }
                    >
                      {user.status === "active" ? (
                        <UserMinus className="w-3.5 h-3.5" />
                      ) : (
                        <UserCheck className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
      <InviteUserModal open={inviteOpen} onClose={() => setInviteOpen(false)} />
    </div>
  );
}

// ─── Usage Tab ────────────────────────────────────────────────────────────────

function UsageCard({
  label,
  used,
  limit,
  icon: Icon,
}: { label: string; used: number; limit: number; icon: React.ElementType }) {
  const pct = Math.min(100, Math.round((used / limit) * 100));
  const { bar, text, badge } = usageColor(pct);
  return (
    <GlassCard className="p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-display font-semibold text-foreground">
            {label}
          </span>
        </div>
        <Badge className={`text-xs px-2 border ${badge}`}>{pct}%</Badge>
      </div>
      <div className="flex items-end gap-1.5 mb-2">
        <span className={`text-2xl font-bold font-display ${text}`}>
          {used.toLocaleString()}
        </span>
        <span className="text-xs text-muted-foreground pb-1">
          / {limit.toLocaleString()}
        </span>
      </div>
      <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      {pct >= 80 && (
        <p className="text-xs text-amber-400 mt-2 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" />
          {pct >= 90
            ? "Critical — approaching limit"
            : "Warning — consider upgrading"}
        </p>
      )}
    </GlassCard>
  );
}

function UsageTab({ usage }: { usage: UsageMetric }) {
  const cards = [
    {
      label: "Devices",
      used: usage.devices.used,
      limit: usage.devices.limit,
      icon: Server,
    },
    {
      label: "API Calls",
      used: usage.api.used,
      limit: usage.api.limit,
      icon: Zap,
    },
    {
      label: "Data (GB)",
      used: usage.data.used,
      limit: usage.data.limit,
      icon: Activity,
    },
    {
      label: "Alerts",
      used: usage.alerts.used,
      limit: usage.alerts.limit,
      icon: Bell,
    },
  ];

  // Simulated 30-day trend
  const trend = useMemo(() => {
    const base = Math.max(1, usage.devices.used - 500);
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      devices: Math.round(
        base + (usage.devices.used - base) * (i / 29) + Math.sin(i * 0.5) * 50,
      ),
    }));
  }, [usage]);

  const maxDevices = Math.max(...trend.map((t) => t.devices));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <UsageCard key={c.label} {...c} />
        ))}
      </div>
      {/* 30-day trend */}
      <GlassCard className="p-5">
        <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Device Growth — Last 30 Days
        </h3>
        <div className="flex items-end gap-0.5 h-20">
          {trend.map(({ day, devices }) => {
            const h = Math.round((devices / maxDevices) * 100);
            return (
              <div
                key={day}
                className="flex-1 bg-primary/30 hover:bg-primary/60 rounded-t transition-colors cursor-default"
                style={{ height: `${h}%` }}
                title={`Day ${day}: ${devices.toLocaleString()} devices`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-1.5 text-[10px] text-muted-foreground font-mono">
          <span>30d ago</span>
          <span>Today</span>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Billing Tab ──────────────────────────────────────────────────────────────

const STATUS_BADGE: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  overdue: "bg-red-500/15 text-red-400 border-red-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
};

function BillingTab({
  company,
  invoices,
}: { company: Company; invoices: Invoice[] }) {
  const recent = invoices.slice(0, 5);

  return (
    <div className="space-y-5">
      {/* Current plan */}
      <GlassCard className="p-5">
        <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
          Current Plan
        </h3>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-display font-bold text-foreground">
                  {company.plan}
                </span>
                <Badge
                  className={`text-xs px-2 border ${PLAN_COLORS[company.plan]}`}
                >
                  {company.status}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {PLAN_PRICE[company.plan]} · Renews{" "}
                {fmtDate(company.lastActiveAt)}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-border text-xs"
              data-ocid="downgrade-plan-btn"
            >
              Downgrade
            </Button>
            <Button
              size="sm"
              className="bg-primary text-primary-foreground text-xs"
              data-ocid="upgrade-plan-btn"
            >
              Upgrade Plan
            </Button>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/40 grid grid-cols-2 gap-3 text-xs">
          <div>
            <span className="text-muted-foreground">Billing Contact: </span>
            <span className="text-foreground">{company.contactEmail}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Region: </span>
            <span className="text-foreground">{company.region}</span>
          </div>
          <div>
            <span className="text-muted-foreground">MRR: </span>
            <span className="text-primary font-semibold">
              {fmtCurrency(company.mrr)}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Plan Limit: </span>
            <span className="text-foreground">
              {company.devicesLimit.toLocaleString()} devices
            </span>
          </div>
        </div>
      </GlassCard>

      {/* Recent invoices */}
      <GlassCard className="overflow-x-auto">
        <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
          <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest">
            Recent Invoices
          </h3>
          <button
            type="button"
            className="text-xs text-primary hover:underline"
            data-ocid="view-all-invoices-btn"
          >
            View All
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/40">
              {["Invoice #", "Date", "Amount", "Status"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2.5 text-left text-xs font-display text-muted-foreground uppercase tracking-widest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map((inv, i) => (
              <tr
                key={inv.id}
                className={`border-b border-border/20 last:border-0 hover:bg-muted/10 ${i % 2 === 0 ? "bg-muted/5" : ""}`}
              >
                <td className="px-4 py-2.5 text-xs font-mono text-primary">
                  {inv.invoiceNumber}
                </td>
                <td className="px-4 py-2.5 text-xs text-muted-foreground">
                  {fmtDate(inv.createdAt)}
                </td>
                <td className="px-4 py-2.5 text-xs font-semibold text-foreground">
                  {fmtCurrency(inv.total)}
                </td>
                <td className="px-4 py-2.5">
                  <Badge
                    className={`text-xs px-2 border ${STATUS_BADGE[inv.status] ?? "bg-muted text-foreground border-border"}`}
                  >
                    {inv.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </div>
  );
}

// ─── Workflows Tab ────────────────────────────────────────────────────────────

function WorkflowsTab() {
  const [wfs, setWfs] = useState(MOCK_WORKFLOWS);

  function toggleWf(id: string) {
    setWfs((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: !w.status } : w)),
    );
    toast.success("Workflow status updated");
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {wfs.filter((w) => w.status).length} of {wfs.length} workflows active
        </p>
        <a href="/workflows">
          <Button
            size="sm"
            className="bg-primary text-primary-foreground gap-1.5"
            data-ocid="create-workflow-btn"
          >
            <Plus className="w-3.5 h-3.5" />
            Create New Workflow
          </Button>
        </a>
      </div>
      <div className="space-y-3">
        {wfs.map((wf, i) => (
          <motion.div
            key={wf.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <GlassCard className="p-4 flex items-center gap-4">
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 ${wf.status ? "bg-primary/15 border-primary/30" : "bg-muted/40 border-border"}`}
              >
                <Workflow
                  className={`w-4 h-4 ${wf.status ? "text-primary" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground truncate">
                    {wf.name}
                  </span>
                  <Badge
                    className={`text-xs px-2 border flex-shrink-0 ${wf.status ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-muted/40 text-muted-foreground border-border"}`}
                  >
                    {wf.status ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Last run {fmtRelative(wf.lastRun)} · {wf.triggers} triggers
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Switch
                  checked={wf.status}
                  onCheckedChange={() => toggleWf(wf.id)}
                  data-ocid={`wf-toggle-${wf.id}`}
                  className="scale-75 data-[state=checked]:bg-emerald-500"
                />
                <a href="/workflows">
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    title="Open in Workflow Builder"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </a>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────

function SettingsTab() {
  const [notifs, setNotifs] = useState({
    billing: true,
    alerts: true,
    usage: false,
  });
  const [tz, setTz] = useState("UTC+05:30 (IST)");

  return (
    <div className="space-y-5">
      {/* Branding */}
      <GlassCard className="p-5">
        <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> Branding
        </h3>
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl border-2 border-dashed border-border flex items-center justify-center bg-muted/20 hover:border-primary/50 transition-colors cursor-pointer"
            data-ocid="logo-upload-area"
          >
            <PenTool className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm text-foreground font-medium">
              Upload Company Logo
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              PNG or SVG, max 2MB. White background recommended.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-2 border-border text-xs"
              data-ocid="upload-logo-btn"
            >
              Choose File
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <Label className="text-xs text-muted-foreground w-28 flex-shrink-0">
            Primary Color
          </Label>
          <div className="flex gap-2">
            {["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B", "#EF4444"].map(
              (c) => (
                <button
                  key={c}
                  type="button"
                  className="w-6 h-6 rounded-full border-2 border-transparent hover:border-foreground transition-all"
                  style={{ backgroundColor: c }}
                  aria-label={`Set color ${c}`}
                />
              ),
            )}
          </div>
        </div>
      </GlassCard>

      {/* Notifications */}
      <GlassCard className="p-5">
        <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Bell className="w-3.5 h-3.5" /> Notifications
        </h3>
        <div className="space-y-3">
          {[
            {
              key: "billing" as const,
              label: "Billing Alerts",
              desc: "Invoice reminders, payment failures, plan renewals",
            },
            {
              key: "alerts" as const,
              label: "Network Alerts",
              desc: "Critical device failures, fiber cuts, outages",
            },
            {
              key: "usage" as const,
              label: "Usage Warnings",
              desc: "Notify when device/API usage exceeds 80%",
            },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
              </div>
              <Switch
                checked={notifs[key]}
                onCheckedChange={(v) => {
                  setNotifs((prev) => ({ ...prev, [key]: v }));
                  toast.success(`${label} ${v ? "enabled" : "disabled"}`);
                }}
                data-ocid={`notif-${key}`}
              />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Integrations */}
      <GlassCard className="p-5">
        <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <LinkIcon className="w-3.5 h-3.5" /> Integrations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a href="/integrations">
            <div
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer"
              data-ocid="goto-api-keys"
            >
              <Key className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">API Keys</p>
                <p className="text-[11px] text-muted-foreground">
                  Manage REST API credentials
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
            </div>
          </a>
          <a href="/integrations">
            <div
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:border-primary/40 hover:bg-primary/5 transition-smooth cursor-pointer"
              data-ocid="goto-webhooks"
            >
              <Webhook className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">Webhooks</p>
                <p className="text-[11px] text-muted-foreground">
                  Configure event callbacks
                </p>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground ml-auto" />
            </div>
          </a>
        </div>
      </GlassCard>

      {/* Timezone */}
      <GlassCard className="p-5">
        <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" /> Timezone
        </h3>
        <div className="flex items-center gap-3">
          <Label className="text-xs text-muted-foreground w-24 flex-shrink-0">
            Platform Timezone
          </Label>
          <Select value={tz} onValueChange={setTz}>
            <SelectTrigger
              className="bg-background border-input w-64"
              data-ocid="timezone-selector"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {TIMEZONES.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Company Profile Card ──────────────────────────────────────────────────────

function CompanyProfileCard({ company }: { company: Company }) {
  return (
    <GlassCard className="p-5 flex items-start gap-5 flex-wrap">
      {/* Avatar */}
      <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 text-xl font-bold font-display text-primary">
        {initials(company.name)}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h2 className="text-lg font-display font-bold text-foreground">
            {company.name}
          </h2>
          <Badge className={`text-xs px-2 border ${PLAN_COLORS[company.plan]}`}>
            {company.plan}
          </Badge>
          <Badge
            className={`text-xs px-2 border ${company.status === "active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"}`}
          >
            {company.status}
          </Badge>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-1 mt-2 text-xs">
          <div>
            <span className="text-muted-foreground">Domain: </span>
            <span className="text-foreground font-mono">{company.domain}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Region: </span>
            <span className="text-foreground">{company.region}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Contact: </span>
            <span className="text-foreground">{company.contactEmail}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Renewal: </span>
            <span className="text-foreground">
              {fmtDate(company.lastActiveAt)}
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="border-border gap-1.5 flex-shrink-0"
        data-ocid="edit-company-btn"
      >
        <Edit2 className="w-3.5 h-3.5" />
        Edit Profile
      </Button>
    </GlassCard>
  );
}

// ─── Quick Links ──────────────────────────────────────────────────────────────

function QuickLinks() {
  const links = [
    { label: "NOC Map", to: "/", icon: MapIcon },
    { label: "Devices", to: "/devices", icon: Server },
    { label: "Monitoring", to: "/monitoring", icon: Monitor },
  ];
  return (
    <div className="flex items-center gap-3 flex-wrap pt-2 border-t border-border/40">
      <span className="text-xs text-muted-foreground font-display uppercase tracking-widest">
        Quick Links:
      </span>
      {links.map(({ label, to, icon: Icon }) => (
        <a key={to} href={to}>
          <div
            className="flex items-center gap-1.5 text-xs text-primary hover:underline cursor-pointer"
            data-ocid={`quick-link-${label.toLowerCase()}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </div>
        </a>
      ))}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = "users" | "usage" | "billing" | "workflows" | "settings";

export default function TenantAdminPanel() {
  const params = useParams({ strict: false }) as { companyId?: string };
  const isSuperAdmin = useAuthStore((s) => s.isSuperAdmin);

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    params.companyId ?? mockCompanies[0]?.id ?? "company-0001",
  );
  const [activeTab, setActiveTab] = useState<TabId>("users");

  const company = useMemo(
    () => getCompanyById(selectedCompanyId) ?? mockCompanies[0],
    [selectedCompanyId],
  );
  const users = useMemo(
    () => getUsersByCompany(selectedCompanyId),
    [selectedCompanyId],
  );
  const invoices = useMemo(
    () => getInvoicesByCompany(selectedCompanyId),
    [selectedCompanyId],
  );
  const usage = useMemo(
    () =>
      getUsageByCompany(selectedCompanyId) ?? {
        companyId: selectedCompanyId,
        companyName: company.name,
        plan: company.plan,
        devices: { used: company.devicesUsed, limit: company.devicesLimit },
        api: { used: company.apiUsed, limit: company.apiLimit },
        data: { used: company.dataUsedGB, limit: company.dataLimitGB },
        alerts: { used: company.alertsUsed, limit: company.alertsLimit },
      },
    [selectedCompanyId, company],
  );

  const TABS: Array<{ id: TabId; label: string; icon: React.ElementType }> = [
    { id: "users", label: "Users", icon: Users },
    { id: "usage", label: "Usage", icon: BarChart2 },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "workflows", label: "Workflows", icon: Workflow },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Tenant Admin —{" "}
                <span className="text-primary">{company.name}</span>
              </h1>
              <p className="text-xs text-muted-foreground font-mono tracking-wider">
                Company Administration Panel
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <CompanySelector
              current={company}
              onChange={setSelectedCompanyId}
            />
            {isSuperAdmin && (
              <a href="/super-admin">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border gap-1.5"
                  data-ocid="back-to-platform-btn"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Platform Admin
                </Button>
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Company profile */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <CompanyProfileCard company={company} />
      </motion.div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-muted/30 p-1 rounded-xl w-fit border border-border/40 flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            data-ocid={`tenant-tab-${id}`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-display font-medium transition-smooth ${
              activeTab === id
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedCompanyId}-${activeTab}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "users" && <UsersTab users={users} />}
          {activeTab === "usage" && <UsageTab usage={usage} />}
          {activeTab === "billing" && (
            <BillingTab company={company} invoices={invoices} />
          )}
          {activeTab === "workflows" && <WorkflowsTab />}
          {activeTab === "settings" && <SettingsTab />}
        </motion.div>
      </AnimatePresence>

      {/* Quick links */}
      <QuickLinks />
    </div>
  );
}
