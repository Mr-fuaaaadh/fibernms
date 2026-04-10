import { FeatureGate } from "@/components/subscription";
import { PlanBadge } from "@/components/subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { MOCK_TENANTS } from "@/data/billingMockData";
import { cn } from "@/lib/utils";
import { FeatureFlag, Plan } from "@/types/subscription";
import type { TenantInfo } from "@/types/subscription";
import {
  Activity,
  AlertTriangle,
  Building2,
  ChevronRight,
  Clock,
  Cpu,
  Crown,
  Eye,
  Pause,
  Pencil,
  Play,
  Plus,
  Search,
  Trash2,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type TenantStatus = TenantInfo["status"];
type PlanFilter = "ALL" | Plan;
type StatusFilter = "ALL" | TenantStatus;

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin: string;
}

interface PlanHistoryEntry {
  plan: Plan;
  date: string;
  event: string;
}

// ─── Mock detail data ─────────────────────────────────────────────────────────
const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "Sarah Kim",
    email: "s.kim@telecorp.com",
    role: "Admin",
    lastLogin: "2 min ago",
  },
  {
    id: "u2",
    name: "Marcus Reyes",
    email: "m.reyes@telecorp.com",
    role: "NOC Engineer",
    lastLogin: "1 hr ago",
  },
  {
    id: "u3",
    name: "Priya Nair",
    email: "p.nair@telecorp.com",
    role: "Analyst",
    lastLogin: "3 hrs ago",
  },
  {
    id: "u4",
    name: "David Chen",
    email: "d.chen@telecorp.com",
    role: "Viewer",
    lastLogin: "Yesterday",
  },
  {
    id: "u5",
    name: "Elena Vasquez",
    email: "e.vasquez@telecorp.com",
    role: "NOC Engineer",
    lastLogin: "2 days ago",
  },
];

const MOCK_PLAN_HISTORY: PlanHistoryEntry[] = [
  { plan: Plan.ULTRA, date: "Jan 2025", event: "Upgraded to Ultra" },
  { plan: Plan.ENTERPRISE, date: "Jun 2024", event: "Upgraded to Enterprise" },
  {
    plan: Plan.PROFESSIONAL,
    date: "Dec 2023",
    event: "Started on Professional",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDeviceCount(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const STATUS_META: Record<TenantStatus, { label: string; classes: string }> = {
  active: {
    label: "Active",
    classes:
      "bg-emerald-500/15 text-emerald-600 border-emerald-500/30 dark:text-emerald-400",
  },
  paused: {
    label: "Paused",
    classes:
      "bg-amber-500/15 text-amber-600 border-amber-500/30 dark:text-amber-400",
  },
  expired: {
    label: "Expired",
    classes:
      "bg-rose-500/15 text-rose-600 border-rose-500/30 dark:text-rose-400",
  },
};

function StatusBadge({ status }: { status: TenantStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center border text-[11px] font-medium px-2 py-0.5 rounded-full gap-1",
        meta.classes,
      )}
    >
      <span
        className={cn("w-1.5 h-1.5 rounded-full", {
          "bg-emerald-500": status === "active",
          "bg-amber-500": status === "paused",
          "bg-rose-500": status === "expired",
        })}
      />
      {meta.label}
    </span>
  );
}

function DeviceProgress({ used, limit }: { used: number; limit: number }) {
  const pct = limit > 0 ? Math.min(100, (used / limit) * 100) : 0;
  const color =
    pct >= 90 ? "bg-rose-500" : pct >= 70 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="flex flex-col gap-1 min-w-[96px]">
      <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
        <span>{formatDeviceCount(used)}</span>
        <span>{limit >= 10_000_000 ? "∞" : formatDeviceCount(limit)}</span>
      </div>
      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", color)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
  accent?: string;
}) {
  return (
    <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
      <span className={cn("p-2 rounded-lg", accent ?? "bg-primary/10")}>
        <Icon
          className={cn("w-4 h-4", accent ? "text-foreground" : "text-primary")}
        />
      </span>
      <div>
        <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-lg font-semibold text-foreground font-mono leading-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Create Tenant Modal ───────────────────────────────────────────────────────
interface CreateTenantModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (
    tenant: Omit<TenantInfo, "id" | "createdAt" | "deviceCount">,
  ) => void;
}

function CreateTenantModal({
  open,
  onClose,
  onCreate,
}: CreateTenantModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [plan, setPlan] = useState<Plan>(Plan.PROFESSIONAL);
  const [deviceLimit, setDeviceLimit] = useState("10000");
  const [trialDays, setTrialDays] = useState("30");
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!name.trim() || !email.trim()) return;
    onCreate({
      name: name.trim(),
      adminEmail: email.trim(),
      plan,
      deviceLimit: Number.parseInt(deviceLimit, 10) || 10000,
      status: "active",
    });
    setName("");
    setEmail("");
    setPlan(Plan.PROFESSIONAL);
    setDeviceLimit("10000");
    setTrialDays("30");
    setNotes("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Plus className="w-4 h-4 text-primary" />
            Create New Tenant
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label
                htmlFor="tenant-name"
                className="text-muted-foreground text-xs"
              >
                Tenant Name *
              </Label>
              <Input
                id="tenant-name"
                placeholder="Acme ISP Ltd."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background border-input"
                data-ocid="create-tenant-name"
              />
            </div>
            <div className="col-span-2 space-y-1.5">
              <Label
                htmlFor="admin-email"
                className="text-muted-foreground text-xs"
              >
                Admin Email *
              </Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-input"
                data-ocid="create-tenant-email"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-muted-foreground text-xs">
                Initial Plan
              </Label>
              <Select value={plan} onValueChange={(v) => setPlan(v as Plan)}>
                <SelectTrigger
                  className="bg-background border-input"
                  data-ocid="create-tenant-plan"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(Plan).map((p) => (
                    <SelectItem key={p} value={p}>
                      {p.charAt(0) + p.slice(1).toLowerCase()}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="device-limit"
                className="text-muted-foreground text-xs"
              >
                Device Limit Override
              </Label>
              <Input
                id="device-limit"
                type="number"
                value={deviceLimit}
                onChange={(e) => setDeviceLimit(e.target.value)}
                className="bg-background border-input font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="trial-days"
                className="text-muted-foreground text-xs"
              >
                Trial Duration (days)
              </Label>
              <Input
                id="trial-days"
                type="number"
                value={trialDays}
                onChange={(e) => setTrialDays(e.target.value)}
                className="bg-background border-input font-mono"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes" className="text-muted-foreground text-xs">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Optional onboarding notes..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-background border-input text-sm resize-none h-20"
            />
          </div>
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-border">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!name.trim() || !email.trim()}
            data-ocid="create-tenant-submit"
          >
            Create Tenant
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirmation Dialog ───────────────────────────────────────────────
function DeleteConfirmDialog({
  tenant,
  onClose,
  onConfirm,
}: { tenant: TenantInfo | null; onClose: () => void; onConfirm: () => void }) {
  return (
    <Dialog open={!!tenant} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-card border-border max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-rose-500">
            <Trash2 className="w-4 h-4" />
            Delete Tenant
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground py-2">
          Permanently delete{" "}
          <strong className="text-foreground">{tenant?.name}</strong>? All
          associated data, devices, and configurations will be lost. This action
          cannot be undone.
        </p>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose} className="border-border">
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            data-ocid="delete-tenant-confirm"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Tenant Detail Drawer ─────────────────────────────────────────────────────
interface TenantDetailDrawerProps {
  tenant: TenantInfo | null;
  onClose: () => void;
  onChangePlan: (tenant: TenantInfo, plan: Plan) => void;
  onToggleSuspend: (tenant: TenantInfo) => void;
}

function TenantDetailDrawer({
  tenant,
  onClose,
  onChangePlan,
  onToggleSuspend,
}: TenantDetailDrawerProps) {
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan>(
    tenant?.plan ?? Plan.PROFESSIONAL,
  );

  const apiUsage = tenant
    ? Math.floor((tenant.deviceCount / tenant.deviceLimit) * 850_000)
    : 0;
  const workflowCount = tenant ? Math.floor(tenant.deviceCount / 5000) + 3 : 0;
  const alertCount = tenant
    ? Math.floor(tenant.deviceCount / 10000) * 14 + 7
    : 0;

  if (!tenant) return null;

  return (
    <div
      className={
        cn(
          "fixed inset-y-0 right-0 z-50 w-[420px] max-w-full bg-card border-l border-border shadow-2xl flex flex-col transition-transform duration-300",
        ) /* role dialog handled via Dialog component */
      }
      aria-label={`Tenant details: ${tenant.name}`}
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
            <Building2 className="w-4 h-4 text-primary" />
          </div>
          <div className="min-w-0">
            <h2 className="font-semibold text-foreground text-sm truncate">
              {tenant.name}
            </h2>
            <p className="text-[11px] text-muted-foreground truncate">
              {tenant.adminEmail}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-muted transition-colors"
          aria-label="Close panel"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <ScrollArea className="flex-1">
        <div className="px-5 py-4 space-y-5">
          {/* Plan + Status row */}
          <div className="flex items-center gap-3">
            <PlanBadge plan={tenant.plan} size="lg" />
            <StatusBadge status={tenant.status} />
            <span className="text-[11px] text-muted-foreground ml-auto">
              ID: {tenant.id}
            </span>
          </div>

          {/* Usage Stats */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Usage Statistics
            </p>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  label: "Devices",
                  value: `${formatDeviceCount(tenant.deviceCount)} / ${tenant.deviceLimit >= 10_000_000 ? "∞" : formatDeviceCount(tenant.deviceLimit)}`,
                  icon: Cpu,
                  pct: (tenant.deviceCount / tenant.deviceLimit) * 100,
                },
                {
                  label: "API Calls",
                  value: `${formatDeviceCount(apiUsage)} / 1M`,
                  icon: Activity,
                  pct: (apiUsage / 1_000_000) * 100,
                },
                {
                  label: "Workflows",
                  value: String(workflowCount),
                  icon: TrendingUp,
                  pct: null,
                },
                {
                  label: "Active Alerts",
                  value: String(alertCount),
                  icon: AlertTriangle,
                  pct: null,
                },
              ].map(({ label, value, icon: Icon, pct }) => (
                <div
                  key={label}
                  className="bg-muted/40 border border-border rounded-lg p-3"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {label}
                    </span>
                  </div>
                  <p className="text-sm font-mono font-semibold text-foreground">
                    {value}
                  </p>
                  {pct !== null && (
                    <div className="h-1 mt-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full",
                          pct >= 90
                            ? "bg-rose-500"
                            : pct >= 70
                              ? "bg-amber-500"
                              : "bg-emerald-500",
                        )}
                        style={{ width: `${Math.min(100, pct)}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tenant Info */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Tenant Details
            </p>
            <div className="space-y-2 text-sm">
              {[
                { label: "Created", value: formatDate(tenant.createdAt) },
                {
                  label: "Device Limit",
                  value:
                    tenant.deviceLimit >= 10_000_000
                      ? "Unlimited"
                      : formatDeviceCount(tenant.deviceLimit),
                },
                {
                  label: "Status",
                  value: <StatusBadge status={tenant.status} />,
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
                >
                  <span className="text-muted-foreground text-xs">{label}</span>
                  <span className="text-foreground text-xs font-medium">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Plan History */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Plan History
            </p>
            <div className="relative pl-4 space-y-3">
              <div className="absolute left-1.5 top-1 bottom-1 w-px bg-border" />
              {MOCK_PLAN_HISTORY.map((entry) => (
                <div
                  key={entry.date}
                  className="relative flex items-start gap-2.5"
                >
                  <div className="absolute -left-3 top-1 w-2 h-2 rounded-full bg-primary border-2 border-card" />
                  <div>
                    <div className="flex items-center gap-2">
                      <PlanBadge plan={entry.plan} size="sm" />
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {entry.date}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {entry.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Users */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
              Users{" "}
              <span className="text-primary font-mono">
                ({MOCK_USERS.length})
              </span>
            </p>
            <div className="space-y-1.5">
              {MOCK_USERS.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 py-2 px-3 rounded-lg bg-muted/30 border border-border/50"
                >
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-primary">
                      {u.name.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium text-foreground truncate">
                      {u.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {u.email}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-muted rounded">
                      {u.role}
                    </span>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {u.lastLogin}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="px-5 py-4 border-t border-border bg-card/80 space-y-2">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            className="border-border text-xs"
            onClick={() => setChangePlanOpen(true)}
            data-ocid="drawer-change-plan"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Change Plan
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border text-xs"
            onClick={() => onToggleSuspend(tenant)}
            data-ocid="drawer-suspend"
          >
            {tenant.status === "active" ? (
              <Pause className="w-3 h-3 mr-1" />
            ) : (
              <Play className="w-3 h-3 mr-1" />
            )}
            {tenant.status === "active" ? "Suspend" : "Resume"}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-border text-xs"
            data-ocid="drawer-view-billing"
          >
            <ChevronRight className="w-3 h-3 mr-1" />
            View Billing
          </Button>
        </div>
      </div>

      {/* Change Plan Dialog */}
      <Dialog
        open={changePlanOpen}
        onOpenChange={(o) => !o && setChangePlanOpen(false)}
      >
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground text-sm">
              Change Plan — {tenant.name}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <Label className="text-xs text-muted-foreground">
              Select New Plan
            </Label>
            <Select
              value={selectedPlan}
              onValueChange={(v) => setSelectedPlan(v as Plan)}
            >
              <SelectTrigger className="bg-background border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Plan).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p.charAt(0) + p.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setChangePlanOpen(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onChangePlan(tenant, selectedPlan);
                setChangePlanOpen(false);
              }}
              data-ocid="confirm-change-plan"
            >
              Apply
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Bulk Actions Bar ─────────────────────────────────────────────────────────
function BulkActionsBar({
  count,
  onSuspend,
  onChangePlan,
  onClear,
}: {
  count: number;
  onSuspend: () => void;
  onChangePlan: () => void;
  onClear: () => void;
}) {
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/10 border border-primary/30 rounded-xl text-sm">
      <span className="font-medium text-primary">
        {count} tenant{count > 1 ? "s" : ""} selected
      </span>
      <Separator orientation="vertical" className="h-4 bg-border" />
      <Button
        size="sm"
        variant="outline"
        className="border-border h-7 text-xs"
        onClick={onSuspend}
        data-ocid="bulk-suspend"
      >
        <Pause className="w-3 h-3 mr-1" />
        Bulk Suspend
      </Button>
      <Button
        size="sm"
        variant="outline"
        className="border-border h-7 text-xs"
        onClick={onChangePlan}
        data-ocid="bulk-change-plan"
      >
        <TrendingUp className="w-3 h-3 mr-1" />
        Change Plan
      </Button>
      <button
        type="button"
        onClick={onClear}
        className="ml-auto p-1 hover:bg-muted rounded"
        aria-label="Clear selection"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}

// ─── Tenants Page (inner — inside FeatureGate) ────────────────────────────────
function TenantsContent() {
  const [tenants, setTenants] = useState<TenantInfo[]>(MOCK_TENANTS);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanFilter>("ALL");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("ALL");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TenantInfo | null>(null);
  const [detailTenant, setDetailTenant] = useState<TenantInfo | null>(null);
  const [bulkChangePlanOpen, setBulkChangePlanOpen] = useState(false);
  const [bulkPlan, setBulkPlan] = useState<Plan>(Plan.PROFESSIONAL);

  // Stats
  const stats = useMemo(
    () => ({
      total: tenants.length,
      active: tenants.filter((t) => t.status === "active").length,
      paused: tenants.filter(
        (t) => t.status === "paused" || t.status === "expired",
      ).length,
      devices: tenants.reduce((s, t) => s + t.deviceCount, 0),
    }),
    [tenants],
  );

  // Filtered
  const filtered = useMemo(
    () =>
      tenants.filter((t) => {
        if (
          search &&
          !t.name.toLowerCase().includes(search.toLowerCase()) &&
          !t.adminEmail.toLowerCase().includes(search.toLowerCase())
        )
          return false;
        if (planFilter !== "ALL" && t.plan !== planFilter) return false;
        if (statusFilter !== "ALL" && t.status !== statusFilter) return false;
        return true;
      }),
    [tenants, search, planFilter, statusFilter],
  );

  const allSelected =
    filtered.length > 0 && filtered.every((t) => selected.has(t.id));
  const someSelected = filtered.some((t) => selected.has(t.id));

  const toggleAll = useCallback(() => {
    if (allSelected) {
      setSelected((prev) => {
        const n = new Set(prev);
        for (const t of filtered) n.delete(t.id);
        return n;
      });
    } else {
      setSelected((prev) => {
        const n = new Set(prev);
        for (const t of filtered) n.add(t.id);
        return n;
      });
    }
  }, [allSelected, filtered]);

  const toggleOne = useCallback((id: string) => {
    setSelected((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  }, []);

  const handleCreate = (
    data: Omit<TenantInfo, "id" | "createdAt" | "deviceCount">,
  ) => {
    const newTenant: TenantInfo = {
      ...data,
      id: `t-${Date.now()}`,
      createdAt: Date.now(),
      deviceCount: 0,
    };
    setTenants((prev) => [newTenant, ...prev]);
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setTenants((prev) => prev.filter((t) => t.id !== deleteTarget.id));
    setSelected((prev) => {
      const n = new Set(prev);
      n.delete(deleteTarget.id);
      return n;
    });
    if (detailTenant?.id === deleteTarget.id) setDetailTenant(null);
    setDeleteTarget(null);
  };

  const handleToggleSuspend = useCallback((tenant: TenantInfo) => {
    setTenants((prev) =>
      prev.map((t) =>
        t.id === tenant.id
          ? { ...t, status: t.status === "active" ? "paused" : "active" }
          : t,
      ),
    );
    setDetailTenant((prev) =>
      prev?.id === tenant.id
        ? { ...prev, status: prev.status === "active" ? "paused" : "active" }
        : prev,
    );
  }, []);

  const handleChangePlan = useCallback((tenant: TenantInfo, plan: Plan) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === tenant.id ? { ...t, plan } : t)),
    );
    setDetailTenant((prev) =>
      prev?.id === tenant.id ? { ...prev, plan } : prev,
    );
  }, []);

  const handleBulkSuspend = () => {
    setTenants((prev) =>
      prev.map((t) =>
        selected.has(t.id) ? { ...t, status: "paused" as TenantStatus } : t,
      ),
    );
    setSelected(new Set());
  };

  const handleBulkChangePlan = () => {
    setTenants((prev) =>
      prev.map((t) => (selected.has(t.id) ? { ...t, plan: bulkPlan } : t)),
    );
    setSelected(new Set());
    setBulkChangePlanOpen(false);
  };

  const selectedCount = selected.size;

  return (
    <div className="flex flex-col min-h-full bg-background">
      {/* Page Header */}
      <div className="bg-card border-b border-border px-6 py-5">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  Tenant Management
                </h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-500 text-[10px] font-bold uppercase tracking-widest">
                  <Crown className="w-2.5 h-2.5" />
                  Powered by ULTRA
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage all tenants, plans, and device quotas across the
                platform.
              </p>
            </div>
          </div>
          <Button
            onClick={() => setCreateOpen(true)}
            className="gap-1.5"
            data-ocid="open-create-tenant"
          >
            <Plus className="w-4 h-4" />
            Create Tenant
          </Button>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <StatCard
            label="Total Tenants"
            value={stats.total}
            icon={Building2}
            accent="bg-primary/10"
          />
          <StatCard
            label="Active"
            value={stats.active}
            icon={Activity}
            accent="bg-emerald-500/10"
          />
          <StatCard
            label="Paused / Expired"
            value={stats.paused}
            icon={AlertTriangle}
            accent="bg-amber-500/10"
          />
          <StatCard
            label="Total Devices"
            value={formatDeviceCount(stats.devices)}
            icon={Cpu}
            accent="bg-violet-500/10"
          />
        </div>
      </div>

      {/* Action Bar */}
      <div className="px-6 py-4 bg-background border-b border-border flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search tenants or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 bg-card border-input h-9 text-sm"
            data-ocid="tenant-search"
          />
        </div>
        <Select
          value={planFilter}
          onValueChange={(v) => setPlanFilter(v as PlanFilter)}
        >
          <SelectTrigger
            className="w-[140px] bg-card border-input h-9 text-sm"
            data-ocid="plan-filter"
          >
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Plans</SelectItem>
            {Object.values(Plan).map((p) => (
              <SelectItem key={p} value={p}>
                {p.charAt(0) + p.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v as StatusFilter)}
        >
          <SelectTrigger
            className="w-[130px] bg-card border-input h-9 text-sm"
            data-ocid="status-filter"
          >
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-xs text-muted-foreground ml-auto">
          {filtered.length} tenant{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-4 space-y-3">
        {/* Bulk Actions */}
        <BulkActionsBar
          count={selectedCount}
          onSuspend={handleBulkSuspend}
          onChangePlan={() => setBulkChangePlanOpen(true)}
          onClear={() => setSelected(new Set())}
        />

        {/* Table */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[860px]">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="w-10 px-4 py-3">
                    <Checkbox
                      checked={allSelected}
                      data-state={
                        someSelected && !allSelected
                          ? "indeterminate"
                          : undefined
                      }
                      onCheckedChange={toggleAll}
                      aria-label="Select all"
                      data-ocid="select-all-tenants"
                    />
                  </th>
                  {[
                    "Tenant Name",
                    "Plan",
                    "Devices Used / Limit",
                    "Admin Email",
                    "Status",
                    "Created",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-16 text-center text-muted-foreground text-sm"
                    >
                      <Users className="w-8 h-8 mx-auto mb-2 opacity-30" />
                      No tenants match your filters
                    </td>
                  </tr>
                )}
                {filtered.map((tenant, idx) => (
                  <tr
                    key={tenant.id}
                    className={cn(
                      "border-b border-border/50 last:border-0 transition-colors hover:bg-muted/20",
                      selected.has(tenant.id) && "bg-primary/5",
                    )}
                    data-ocid={`tenant-row-${tenant.id}`}
                  >
                    <td className="px-4 py-3">
                      <Checkbox
                        checked={selected.has(tenant.id)}
                        onCheckedChange={() => toggleOne(tenant.id)}
                        aria-label={`Select ${tenant.name}`}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center shrink-0">
                          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                        <span className="font-medium text-foreground whitespace-nowrap">
                          {tenant.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <PlanBadge plan={tenant.plan} size="sm" />
                    </td>
                    <td className="px-4 py-3">
                      <DeviceProgress
                        used={tenant.deviceCount}
                        limit={tenant.deviceLimit}
                      />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground max-w-[160px] truncate">
                      {tenant.adminEmail}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={tenant.status} />
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground font-mono whitespace-nowrap">
                      {formatDate(tenant.createdAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setDetailTenant(tenant)}
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`View ${tenant.name}`}
                          title="View Details"
                          data-ocid={`view-tenant-${idx}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={`Edit ${tenant.name}`}
                          title="Edit"
                          data-ocid={`edit-tenant-${idx}`}
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleSuspend(tenant)}
                          className={cn(
                            "p-1.5 rounded transition-colors",
                            tenant.status === "active"
                              ? "hover:bg-amber-500/10 text-muted-foreground hover:text-amber-500"
                              : "hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500",
                          )}
                          aria-label={
                            tenant.status === "active"
                              ? `Suspend ${tenant.name}`
                              : `Resume ${tenant.name}`
                          }
                          title={
                            tenant.status === "active" ? "Suspend" : "Resume"
                          }
                          data-ocid={`toggle-suspend-${idx}`}
                        >
                          {tenant.status === "active" ? (
                            <Pause className="w-3.5 h-3.5" />
                          ) : (
                            <Play className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(tenant)}
                          className="p-1.5 rounded hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors"
                          aria-label={`Delete ${tenant.name}`}
                          title="Delete"
                          data-ocid={`delete-tenant-${idx}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals & Drawers */}
      <CreateTenantModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
      <DeleteConfirmDialog
        tenant={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      {detailTenant && (
        <>
          {/* Backdrop */}
          <div
            role="button"
            tabIndex={0}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            onClick={() => setDetailTenant(null)}
            onKeyDown={(e) => e.key === "Escape" && setDetailTenant(null)}
            aria-label="Close tenant detail panel"
          />
          <TenantDetailDrawer
            tenant={detailTenant}
            onClose={() => setDetailTenant(null)}
            onChangePlan={handleChangePlan}
            onToggleSuspend={handleToggleSuspend}
          />
        </>
      )}

      {/* Bulk Change Plan Dialog */}
      <Dialog
        open={bulkChangePlanOpen}
        onOpenChange={(o) => !o && setBulkChangePlanOpen(false)}
      >
        <DialogContent className="bg-card border-border max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-foreground text-sm">
              Bulk Change Plan — {selectedCount} tenant
              {selectedCount > 1 ? "s" : ""}
            </DialogTitle>
          </DialogHeader>
          <div className="py-2 space-y-2">
            <Label className="text-xs text-muted-foreground">
              Select New Plan
            </Label>
            <Select
              value={bulkPlan}
              onValueChange={(v) => setBulkPlan(v as Plan)}
            >
              <SelectTrigger className="bg-background border-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Plan).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p.charAt(0) + p.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setBulkChangePlanOpen(false)}
              className="border-border"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBulkChangePlan}
              data-ocid="bulk-change-plan-confirm"
            >
              Apply to All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─── Tenants Page (exported) ──────────────────────────────────────────────────
export default function Tenants() {
  return (
    <FeatureGate
      feature={FeatureFlag.MULTI_TENANT}
      mode="replace"
      featureLabel="Multi-Tenant Management"
      description="Multi-tenant management is an exclusive ULTRA plan feature. Upgrade to provision, configure, and monitor all your tenants from a single control plane."
    >
      <TenantsContent />
    </FeatureGate>
  );
}
