import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type AdminUser,
  type AuditEvent,
  type Company,
  type CompanyActivity,
  type CompanyStatus,
  type Invoice,
  type Order,
  getActivitiesByCompany,
  getAuditByCompany,
  getCompanyById,
  getInvoicesByCompany,
  getOrdersByCompany,
  getUsageByCompany,
  getUsersByCompany,
} from "@/data/superAdminMockData";
import { Plan } from "@/types/subscription";
import { useParams, useRouter } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Bell,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Database,
  Edit2,
  FileText,
  Globe,
  Key,
  Mail,
  MapPin,
  PauseCircle,
  Phone,
  PlayCircle,
  Server,
  Shield,
  Trash2,
  TrendingUp,
  Users,
  Wifi,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function fmtNum(n: number, compact = false): string {
  if (compact && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (compact && n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function fmtDateTime(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const REGION_FLAGS: Record<string, string> = {
  India: "🇮🇳",
  US: "🇺🇸",
  EU: "🇪🇺",
  APAC: "🌏",
  MENA: "🌍",
};

const STATUS_COLORS: Record<CompanyStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  trial: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  suspended: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  expired: "bg-red-500/15 text-red-400 border-red-500/30",
};

const PLAN_COLORS: Record<string, string> = {
  BASIC: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const PLAN_PRICES: Record<string, number> = {
  [Plan.BASIC]: 99,
  [Plan.PROFESSIONAL]: 499,
  [Plan.ENTERPRISE]: 1499,
  [Plan.ULTRA]: 4999,
};

const ROLE_COLORS: Record<string, string> = {
  Admin: "bg-amber-500/15 text-amber-400",
  "Network Engineer": "bg-blue-500/15 text-blue-400",
  "NOC Operator": "bg-violet-500/15 text-violet-400",
  Viewer: "bg-muted/40 text-muted-foreground",
};

const AUDIT_CATEGORY_ICONS: Record<string, React.ElementType> = {
  user: Users,
  company: Globe,
  billing: CreditCard,
  device: Server,
  auth: Shield,
};

// ─── Usage Progress Bar ───────────────────────────────────────────────────────

function UsageBar({
  label,
  used,
  limit,
  unit = "",
  icon: Icon,
}: {
  label: string;
  used: number;
  limit: number;
  unit?: string;
  icon: React.ElementType;
}) {
  const pct = Math.min(Math.round((used / Math.max(limit, 1)) * 100), 100);
  const barColor =
    pct >= 90
      ? "capacity-fill-critical"
      : pct >= 70
        ? "capacity-fill-warning"
        : "capacity-fill-healthy";
  const textColor =
    pct >= 90
      ? "text-red-400"
      : pct >= 70
        ? "text-amber-400"
        : "text-emerald-400";
  const warning = pct >= 90 ? "Exceeded" : pct >= 70 ? "Nearing limit" : null;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Icon className="w-3.5 h-3.5" />
          <span>{label}</span>
          {warning && (
            <Badge
              className={`text-[9px] px-1.5 py-0 ml-1 ${
                pct >= 90
                  ? "bg-red-500/15 text-red-400 border-red-500/30"
                  : "bg-amber-500/15 text-amber-400 border-amber-500/30"
              }`}
            >
              {warning}
            </Badge>
          )}
        </div>
        <span className={`text-xs font-mono font-semibold ${textColor}`}>
          {pct}%
        </span>
      </div>
      <div className="h-2 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${barColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-[10px] text-muted-foreground font-mono">
        {fmtNum(used, true)}
        {unit} / {fmtNum(limit, true)}
        {unit}
      </p>
    </div>
  );
}

// ─── Tabs ──────────────────────────────────────────────────────────────────────

type TabId = "overview" | "usage" | "billing" | "activity" | "users";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: Zap },
  { id: "usage", label: "Usage", icon: TrendingUp },
  { id: "billing", label: "Billing History", icon: CreditCard },
  { id: "activity", label: "Activity Logs", icon: Activity },
  { id: "users", label: "Users", icon: Users },
];

// ─── Overview Tab ──────────────────────────────────────────────────────────────

function OverviewTab({
  company,
  usage,
}: { company: Company; usage: ReturnType<typeof getUsageByCompany> }) {
  const devPct = usage
    ? Math.round((usage.devices.used / Math.max(usage.devices.limit, 1)) * 100)
    : 0;
  const apiPct = usage
    ? Math.round((usage.api.used / Math.max(usage.api.limit, 1)) * 100)
    : 0;
  const dataPct = usage
    ? Math.round((usage.data.used / Math.max(usage.data.limit, 1)) * 100)
    : 0;
  const alertsPct = usage
    ? Math.round((usage.alerts.used / Math.max(usage.alerts.limit, 1)) * 100)
    : 0;

  const stats = [
    {
      label: "Devices Used",
      value: fmtNum(company.devicesUsed, true),
      sub: `of ${fmtNum(company.devicesLimit, true)}`,
      pct: devPct,
      icon: Server,
      color: "text-blue-400",
    },
    {
      label: "Active Users",
      value: fmtNum(company.activeUsers),
      sub: "registered",
      pct: null,
      icon: Users,
      color: "text-violet-400",
    },
    {
      label: "Alerts",
      value: fmtNum(company.totalAlerts, true),
      sub: "generated",
      pct: alertsPct,
      icon: Bell,
      color: "text-amber-400",
    },
    {
      label: "MRR",
      value: `$${fmtNum(company.mrr, true)}`,
      sub: `${company.plan} plan`,
      pct: null,
      icon: TrendingUp,
      color: "text-emerald-400",
    },
    {
      label: "API Calls",
      value: fmtNum(company.apiUsed, true),
      sub: `of ${fmtNum(company.apiLimit, true)}`,
      pct: apiPct,
      icon: Zap,
      color: "text-primary",
    },
    {
      label: "Data Usage",
      value: `${fmtNum(company.dataUsedGB, true)} GB`,
      sub: `of ${fmtNum(company.dataLimitGB, true)} GB`,
      pct: dataPct,
      icon: Database,
      color: "text-cyan-400",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {stats.map(({ label, value, sub, pct, icon: Icon, color }) => (
          <GlassCard key={label} className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center ${color.replace("text-", "bg-").replace(/400$/, "500/15")}`}
              >
                <Icon className={`w-3.5 h-3.5 ${color}`} />
              </div>
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
            <p className={`text-xl font-display font-bold ${color}`}>{value}</p>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
            {pct !== null && (
              <div className="space-y-1">
                <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pct >= 90
                        ? "capacity-fill-critical"
                        : pct >= 70
                          ? "capacity-fill-warning"
                          : "capacity-fill-healthy"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[9px] font-mono text-muted-foreground">
                  {pct}% utilized
                </p>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

// ─── Usage Tab ─────────────────────────────────────────────────────────────────

function UsageTab({ company }: { company: Company }) {
  return (
    <GlassCard className="p-6 space-y-5">
      <h3 className="text-sm font-display font-semibold text-foreground">
        Resource Utilization
      </h3>
      <div className="space-y-5">
        <UsageBar
          label="Devices"
          used={company.devicesUsed}
          limit={company.devicesLimit}
          icon={Server}
        />
        <Separator className="bg-border/30" />
        <UsageBar
          label="API Calls"
          used={company.apiUsed}
          limit={company.apiLimit}
          icon={Zap}
        />
        <Separator className="bg-border/30" />
        <UsageBar
          label="Data Storage"
          used={company.dataUsedGB}
          limit={company.dataLimitGB}
          unit=" GB"
          icon={Database}
        />
        <Separator className="bg-border/30" />
        <UsageBar
          label="Alerts"
          used={company.alertsUsed}
          limit={company.alertsLimit}
          icon={Bell}
        />
      </div>
      <div className="pt-2 grid grid-cols-3 gap-3 text-center border-t border-border/30">
        {[
          {
            label: "Plan Limit Devices",
            val: fmtNum(company.devicesLimit, true),
          },
          { label: "API Limit", val: fmtNum(company.apiLimit, true) },
          {
            label: "Data Limit",
            val: `${fmtNum(company.dataLimitGB, true)} GB`,
          },
        ].map(({ label, val }) => (
          <div key={label} className="p-2 rounded-lg bg-muted/20">
            <p className="text-sm font-mono font-bold text-foreground">{val}</p>
            <p className="text-[9px] text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Billing Tab ───────────────────────────────────────────────────────────────

function BillingTab({ invoices }: { invoices: Invoice[] }) {
  const displayed = invoices.slice(0, 6);

  const INV_STATUS_COLORS: Record<string, string> = {
    paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    overdue: "bg-red-500/15 text-red-400 border-red-500/30",
    failed: "bg-red-500/15 text-red-400 border-red-500/30",
  };

  if (displayed.length === 0) {
    return (
      <GlassCard className="p-10 flex flex-col items-center gap-3 text-center">
        <FileText className="w-8 h-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No invoices found</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="border-b border-border/40 bg-muted/10">
            <tr className="text-muted-foreground">
              {["Invoice #", "Date", "Amount", "Tax", "Total", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {displayed.map((inv) => (
              <tr
                key={inv.id}
                className="border-b border-border/20 hover:bg-muted/10 transition-colors"
              >
                <td className="py-3 px-4 font-mono text-primary/80">
                  {inv.invoiceNumber}
                </td>
                <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                  {fmtDate(inv.createdAt)}
                </td>
                <td className="py-3 px-4 font-mono">
                  ${inv.amount.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-muted-foreground font-mono">
                  {inv.taxType !== "NONE"
                    ? `$${inv.taxAmount.toLocaleString()} (${inv.taxType})`
                    : "—"}
                </td>
                <td className="py-3 px-4 font-mono font-semibold text-foreground">
                  ${inv.total.toLocaleString()}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`text-[9px] border ${INV_STATUS_COLORS[inv.status] ?? "bg-muted/30 text-muted-foreground"}`}
                  >
                    {inv.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// ─── Activity Tab ──────────────────────────────────────────────────────────────

function ActivityTab({
  auditEvents,
  activities,
}: { auditEvents: AuditEvent[]; activities: CompanyActivity[] }) {
  const sorted = useMemo(
    () =>
      [...auditEvents]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )
        .slice(0, 50),
    [auditEvents],
  );

  const SEVERITY_COLORS: Record<string, string> = {
    info: "bg-blue-500/15 text-blue-400",
    warning: "bg-amber-500/15 text-amber-400",
    critical: "bg-red-500/15 text-red-400",
  };

  if (sorted.length === 0) {
    return (
      <GlassCard className="p-10 flex flex-col items-center gap-3 text-center">
        <Activity className="w-8 h-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No activity logged</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-5">
      <div className="space-y-0">
        {sorted.map((event, idx) => {
          const CatIcon = AUDIT_CATEGORY_ICONS[event.category] ?? Activity;
          return (
            <div
              key={event.id}
              className="relative pl-8 pb-4"
              data-ocid={`activity-item-${event.id}`}
            >
              {/* Timeline line */}
              {idx < sorted.length - 1 && (
                <div className="absolute left-[13px] top-6 bottom-0 w-px bg-border/30" />
              )}
              {/* Dot */}
              <div className="absolute left-2 top-1.5 w-4 h-4 rounded-full bg-card border border-border flex items-center justify-center">
                <CatIcon className="w-2.5 h-2.5 text-muted-foreground" />
              </div>
              <div className="flex items-start gap-2 flex-wrap">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-primary/80 leading-snug">
                    {event.action}
                  </p>
                  <p className="text-[11px] text-foreground mt-0.5 leading-relaxed">
                    {event.details}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {fmtDateTime(event.timestamp)} · {event.userName}
                  </p>
                </div>
                <Badge
                  className={`text-[9px] shrink-0 ${SEVERITY_COLORS[event.severity] ?? "bg-muted/30"}`}
                >
                  {event.severity}
                </Badge>
              </div>
            </div>
          );
        })}
      </div>
      {activities.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/30">
          <p className="text-[10px] text-muted-foreground text-center">
            {activities.length} additional company-level activity records
            available
          </p>
        </div>
      )}
    </GlassCard>
  );
}

// ─── Users Tab ─────────────────────────────────────────────────────────────────

function UsersTab({ users }: { users: AdminUser[] }) {
  const displayed = users.slice(0, 20);

  if (displayed.length === 0) {
    return (
      <GlassCard className="p-10 flex flex-col items-center gap-3 text-center">
        <Users className="w-8 h-8 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">No users found</p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="border-b border-border/40 bg-muted/10">
            <tr className="text-muted-foreground">
              {["Name", "Email", "Role", "Status", "Last Login"].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayed.map((user) => (
              <tr
                key={user.id}
                className="border-b border-border/20 hover:bg-muted/10 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-[9px] font-bold text-primary">
                      {getInitials(user.name)}
                    </div>
                    <span className="font-medium text-foreground truncate max-w-[120px]">
                      {user.name}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-muted-foreground truncate max-w-[160px]">
                  {user.email}
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`text-[9px] ${ROLE_COLORS[user.role] ?? "bg-muted/30 text-muted-foreground"}`}
                  >
                    {user.role}
                  </Badge>
                </td>
                <td className="py-3 px-4">
                  <Badge
                    className={`text-[9px] ${
                      user.status === "active"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {user.status}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                  {fmtDate(user.lastLogin)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users.length > 20 && (
        <>
          <Separator className="bg-border/30" />
          <div className="px-4 py-3 text-center">
            <button
              type="button"
              className="text-xs text-primary hover:text-primary/80 transition-colors"
              onClick={() =>
                toast.info(
                  `${users.length} total users. Navigate to Global Users for full list.`,
                )
              }
              data-ocid="btn-view-all-users"
            >
              View all {users.length} users →
            </button>
          </div>
        </>
      )}
    </GlassCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CompanyDetail(): React.ReactElement {
  const params = useParams({ strict: false }) as { companyId?: string };
  const router = useRouter();
  const nav = (path: string) => router.navigate({ to: path as "/" });
  const companyId = params.companyId ?? "";

  const company = useMemo(() => getCompanyById(companyId), [companyId]);
  const users = useMemo(() => getUsersByCompany(companyId), [companyId]);
  const orders = useMemo(() => getOrdersByCompany(companyId), [companyId]);
  const invoices = useMemo(() => getInvoicesByCompany(companyId), [companyId]);
  const auditEvents = useMemo(() => getAuditByCompany(companyId), [companyId]);
  const activities = useMemo(
    () => getActivitiesByCompany(companyId),
    [companyId],
  );
  const usage = useMemo(() => getUsageByCompany(companyId), [companyId]);

  const [activeTab, setActiveTab] = useState<TabId>("overview");

  if (!company) {
    return (
      <div className="p-6 max-w-[1200px] mx-auto">
        <GlassCard className="p-10 flex flex-col items-center gap-3 text-center">
          <Shield className="w-8 h-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">Company not found</p>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => nav("/super-admin/companies")}
          >
            Back to Companies
          </Button>
        </GlassCard>
      </div>
    );
  }

  const mrr = company.mrr ?? PLAN_PRICES[company.plan] ?? 0;

  return (
    <div className="p-6 space-y-5 max-w-[1200px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap">
        <button
          type="button"
          className="hover:text-foreground transition-colors"
          onClick={() => nav("/super-admin")}
        >
          Super Admin
        </button>
        <ChevronRight className="w-3 h-3" />
        <button
          type="button"
          className="hover:text-foreground transition-colors"
          onClick={() => nav("/super-admin/companies")}
        >
          Companies
        </button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium truncate max-w-[200px]">
          {company.name}
        </span>
      </div>

      {/* Header with actions */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-lg"
            onClick={() => nav("/super-admin/companies")}
            data-ocid="btn-back-companies"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-display font-bold text-primary text-base">
            {getInitials(company.name)}
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground leading-tight">
              {company.name}
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {company.domain}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => toast.info("Edit form opened")}
            data-ocid="btn-edit-company"
          >
            <Edit2 className="w-3 h-3" />
            Edit
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`h-8 text-xs gap-1.5 ${
              company.status === "suspended"
                ? "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                : "border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
            }`}
            onClick={() =>
              toast.success(
                company.status === "suspended"
                  ? `${company.name} activated`
                  : `${company.name} suspended`,
              )
            }
            data-ocid="btn-toggle-company-status"
          >
            {company.status === "suspended" ? (
              <>
                <PlayCircle className="w-3 h-3" /> Activate
              </>
            ) : (
              <>
                <PauseCircle className="w-3 h-3" /> Suspend
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 border-red-500/30 text-red-400 hover:bg-red-500/10"
            onClick={() =>
              toast.warning(`Delete confirmation required for ${company.name}`)
            }
            data-ocid="btn-delete-company"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </Button>
        </div>
      </div>

      {/* Company Profile Card */}
      <GlassCard className="p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Badges */}
          <div className="lg:col-span-3 flex items-center gap-2 flex-wrap">
            <Badge
              className={`text-xs border gap-1.5 ${STATUS_COLORS[company.status]}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  company.status === "active"
                    ? "bg-emerald-400"
                    : company.status === "trial"
                      ? "bg-blue-400"
                      : company.status === "suspended"
                        ? "bg-orange-400"
                        : "bg-red-400"
                }`}
              />
              {company.status.toUpperCase()}
            </Badge>
            <Badge className={`text-xs border ${PLAN_COLORS[company.plan]}`}>
              {company.plan} PLAN
            </Badge>
            <Badge className="text-xs bg-muted/30 text-muted-foreground border-border/30">
              {REGION_FLAGS[company.region]} {company.region} ·{" "}
              {company.country}
            </Badge>
          </div>

          {/* Contact info */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-display uppercase tracking-wider text-muted-foreground/60">
              Contact
            </h3>
            {[
              { icon: Mail, val: company.contactEmail },
              { icon: Phone, val: company.contactPhone },
              { icon: MapPin, val: company.address ?? company.country },
              { icon: Globe, val: company.domain },
            ].map(({ icon: Icon, val }) => (
              <div key={val} className="flex items-center gap-2 text-xs">
                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-foreground truncate">{val}</span>
              </div>
            ))}
          </div>

          {/* Subscription */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-display uppercase tracking-wider text-muted-foreground/60">
              Subscription
            </h3>
            {[
              { label: "Plan", val: `${company.plan}` },
              { label: "MRR", val: `$${mrr.toLocaleString()}/mo` },
              { label: "Onboarded", val: fmtDate(company.onboardedAt) },
              { label: "Last Active", val: fmtDate(company.lastActiveAt) },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground w-24">{label}</span>
                <span className="text-foreground font-medium">{val}</span>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-display uppercase tracking-wider text-muted-foreground/60">
              Quick Stats
            </h3>
            {[
              {
                icon: Server,
                label: "Devices",
                val: fmtNum(company.devicesUsed, true),
              },
              { icon: Users, label: "Users", val: fmtNum(company.activeUsers) },
              {
                icon: Bell,
                label: "Alerts",
                val: fmtNum(company.totalAlerts, true),
              },
              { icon: FileText, label: "Orders", val: fmtNum(orders.length) },
            ].map(({ icon: Icon, label, val }) => (
              <div key={label} className="flex items-center gap-2 text-xs">
                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                <span className="text-muted-foreground w-16">{label}</span>
                <span className="text-foreground font-medium font-mono">
                  {val}
                </span>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto noc-scrollbar pb-0.5">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-smooth ${
              activeTab === id
                ? "bg-primary/15 text-primary border border-primary/25"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            data-ocid={`tab-${id}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "overview" && (
          <OverviewTab company={company} usage={usage} />
        )}
        {activeTab === "usage" && <UsageTab company={company} />}
        {activeTab === "billing" && <BillingTab invoices={invoices} />}
        {activeTab === "activity" && (
          <ActivityTab auditEvents={auditEvents} activities={activities} />
        )}
        {activeTab === "users" && <UsersTab users={users} />}
      </div>
    </div>
  );
}
