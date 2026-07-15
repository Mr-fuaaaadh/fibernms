import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { monthlyRevenue, planDistribution } from "@/data/billingMockData";
import {
  MOCK_AUDIT_EVENTS,
  MOCK_COMPANIES,
  MOCK_ORDERS,
  REVENUE_METRICS,
} from "@/data/superAdminMockData";
import { Plan } from "@/types/subscription";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Download,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Per-plan revenue series (24 months, from billingMockData) ─────────────────

const PLAN_MRR_SHARE: Record<string, number> = {
  BASIC: 0.013, // 12 × $200 ≈ $2,400
  PROFESSIONAL: 0.05, // 18 × $500 ≈ $9,000
  ENTERPRISE: 0.167, // 15 × $2,000 ≈ $30,000
  ULTRA: 0.25, // 9 × $5,000 ≈ $45,000
};

const MULTI_PLAN_TREND = monthlyRevenue.map((m) => ({
  month: m.month,
  Basic: Math.round(m.revenue * PLAN_MRR_SHARE.BASIC),
  Professional: Math.round(m.revenue * PLAN_MRR_SHARE.PROFESSIONAL),
  Enterprise: Math.round(m.revenue * PLAN_MRR_SHARE.ENTERPRISE),
  Ultra: Math.round(m.revenue * PLAN_MRR_SHARE.ULTRA),
}));

// Last 12 months
const TREND_12M = MULTI_PLAN_TREND.slice(-12);
// Last 24 months
const TREND_24M = MULTI_PLAN_TREND;

// ─── Plan display config ─────────────────────────────────────────────────────

const PLAN_CONFIG: Record<
  Plan,
  {
    color: string;
    chartColor: string;
    gradId: string;
    label: string;
    monthlyPrice: number;
  }
> = {
  [Plan.BASIC]: {
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    chartColor: "#10b981",
    gradId: "gradBasic",
    label: "Basic",
    monthlyPrice: 200,
  },
  [Plan.PROFESSIONAL]: {
    color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    chartColor: "#3b82f6",
    gradId: "gradPro",
    label: "Professional",
    monthlyPrice: 500,
  },
  [Plan.ENTERPRISE]: {
    color: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    chartColor: "#8b5cf6",
    gradId: "gradEnt",
    label: "Enterprise",
    monthlyPrice: 2000,
  },
  [Plan.ULTRA]: {
    color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    chartColor: "#f59e0b",
    gradId: "gradUltra",
    label: "Ultra",
    monthlyPrice: 5000,
  },
};

// ─── Metric Card ──────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  sub,
  change,
  positive = true,
  icon: Icon,
  accent,
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  change?: string;
  positive?: boolean;
  icon: React.ElementType;
  accent: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <GlassCard className="p-5 h-full">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent}`}
          >
            <Icon className="w-4 h-4" />
          </div>
          {change && (
            <span
              className={`flex items-center gap-0.5 text-[10px] font-mono ${positive ? "text-emerald-400" : "text-red-400"}`}
            >
              {positive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {change}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-2xl font-display font-bold text-foreground mt-0.5">
          {value}
        </p>
        {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
      </GlassCard>
    </motion.div>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function MultiLineTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  return (
    <div className="glass-elevated rounded-lg px-3 py-2.5 text-xs border border-border/40 min-w-[160px]">
      <p className="font-mono text-muted-foreground mb-2 border-b border-border/20 pb-1.5">
        {label}
      </p>
      {payload.map((p) => (
        <div
          key={p.name}
          className="flex justify-between items-center gap-4 mb-1"
        >
          <span className="flex items-center gap-1.5">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: p.color }}
            />
            <span className="text-muted-foreground">{p.name}</span>
          </span>
          <span className="font-mono font-semibold text-foreground">
            {fmtCurrency(p.value)}
          </span>
        </div>
      ))}
      <div className="flex justify-between items-center mt-1.5 pt-1.5 border-t border-border/20">
        <span className="text-muted-foreground">Total</span>
        <span className="font-mono font-bold text-foreground">
          {fmtCurrency(total)}
        </span>
      </div>
    </div>
  );
}

// ─── Plan Distribution Pie Tooltip ────────────────────────────────────────────

function PieTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { pct: number; revenue: number };
  }>;
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="glass-elevated rounded-lg px-3 py-2 text-xs border border-border/40">
      <p className="font-semibold text-foreground">{d.name}</p>
      <p className="text-muted-foreground mt-0.5">
        {d.value} companies ({d.payload.pct.toFixed(1)}%)
      </p>
      <p className="font-mono text-emerald-400 mt-0.5">
        {fmtCurrency(d.payload.revenue)}/mo
      </p>
    </div>
  );
}

// ─── Upgrade / Downgrade Plan Modal ───────────────────────────────────────────

function PlanChangeModal({
  company,
  onClose,
}: {
  company: { id: string; name: string; plan: Plan } | null;
  onClose: () => void;
}) {
  const [newPlan, setNewPlan] = useState<Plan | "">("");
  const [applied, setApplied] = useState(false);

  if (!company) return null;

  const currentCfg = PLAN_CONFIG[company.plan];
  const newCfg = newPlan ? PLAN_CONFIG[newPlan] : null;

  // Proration: assume 15 of 30 days elapsed
  const daysUsed = 15;
  const daysTotal = 30;
  const daysRemaining = daysTotal - daysUsed;
  const creditAmount = (
    (currentCfg.monthlyPrice * daysUsed) /
    daysTotal
  ).toFixed(2);
  const chargeAmount = newCfg
    ? ((newCfg.monthlyPrice * daysRemaining) / daysTotal).toFixed(2)
    : "0.00";
  const netCharge = newCfg
    ? (
        (newCfg.monthlyPrice * daysRemaining) / daysTotal -
        (currentCfg.monthlyPrice * daysUsed) / daysTotal
      ).toFixed(2)
    : "0.00";
  const isUpgrade = newCfg && newCfg.monthlyPrice > currentCfg.monthlyPrice;

  const effectiveDate = new Date();
  effectiveDate.setDate(1);
  effectiveDate.setMonth(effectiveDate.getMonth() + 1);
  const effectiveDateStr = effectiveDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const handleApply = () => {
    setApplied(true);
    setTimeout(onClose, 1500);
  };

  return (
    <Dialog open={!!company} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-md glass-elevated border border-border/40 shadow-2xl"
        data-ocid="plan-change-modal"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-base">
            <RefreshCw className="w-4 h-4 text-violet-400" />
            Manage Plan — {company.name}
          </DialogTitle>
        </DialogHeader>

        {applied ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            <p className="text-sm font-semibold text-foreground">
              Plan change applied!
            </p>
            <p className="text-xs text-muted-foreground text-center">
              {company.name} will move to{" "}
              <span className="text-foreground font-medium">
                {newPlan || company.plan}
              </span>{" "}
              effective {effectiveDateStr}.
            </p>
          </div>
        ) : (
          <>
            {/* Current vs New plan selector */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
                <p className="text-[10px] text-muted-foreground mb-1.5">
                  Current Plan
                </p>
                <Badge
                  className={`text-xs border font-semibold ${currentCfg.color}`}
                >
                  {currentCfg.label}
                </Badge>
                <p className="text-xs font-mono text-muted-foreground mt-2">
                  ${currentCfg.monthlyPrice.toLocaleString()}/mo
                </p>
              </div>
              <div className="rounded-xl bg-muted/20 border border-border/30 p-3">
                <p className="text-[10px] text-muted-foreground mb-1.5">
                  New Plan
                </p>
                <Select
                  value={newPlan}
                  onValueChange={(v) => setNewPlan(v as Plan)}
                >
                  <SelectTrigger
                    className="h-7 text-xs bg-background/50"
                    data-ocid="select-new-plan"
                  >
                    <SelectValue placeholder="Select plan…" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(Plan)
                      .filter((p) => p !== company.plan)
                      .map((p) => (
                        <SelectItem key={p} value={p}>
                          {PLAN_CONFIG[p].label} — $
                          {PLAN_CONFIG[p].monthlyPrice}/mo
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                {newCfg && (
                  <p className="text-xs font-mono text-muted-foreground mt-2">
                    ${newCfg.monthlyPrice.toLocaleString()}/mo
                  </p>
                )}
              </div>
            </div>

            {/* Proration Preview */}
            {newPlan && (
              <div className="rounded-xl border border-border/30 overflow-hidden">
                <div className="bg-muted/30 px-4 py-2 border-b border-border/20 flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                    Proration Preview
                  </p>
                  <Badge
                    className={`text-[9px] ${isUpgrade ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"} border`}
                  >
                    {isUpgrade ? "Upgrade" : "Downgrade"}
                  </Badge>
                </div>
                <div className="px-4 py-3 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      Current plan credit ({daysUsed} days used)
                    </span>
                    <span className="text-emerald-400">−${creditAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      New plan charge ({daysRemaining} days remaining)
                    </span>
                    <span className="text-foreground">+${chargeAmount}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border/20 font-bold">
                    <span className="text-foreground">Net charge today</span>
                    <span
                      className={
                        Number.parseFloat(netCharge) >= 0
                          ? "text-primary"
                          : "text-emerald-400"
                      }
                    >
                      {Number.parseFloat(netCharge) >= 0 ? "+" : ""}${netCharge}
                    </span>
                  </div>
                  <p className="text-[9px] text-muted-foreground leading-relaxed pt-1">
                    Full billing at ${newCfg?.monthlyPrice.toLocaleString()}/mo
                    starts {effectiveDateStr}. Proration calculated to the
                    nearest day.
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 pt-1">
              <Button
                className="flex-1"
                disabled={!newPlan}
                onClick={handleApply}
                data-ocid="btn-apply-plan-change"
              >
                Apply Change
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                data-ocid="btn-cancel-plan-change"
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

// ─── Subscription Health Table ─────────────────────────────────────────────────

function SubHealthTable() {
  const rows = useMemo(
    () =>
      Object.values(Plan).map((plan) => {
        const companies = MOCK_COMPANIES.filter(
          (c) =>
            c.plan === plan && (c.status === "active" || c.status === "trial"),
        );
        const count = companies.length;
        const cfg = PLAN_CONFIG[plan];
        const mrrContribution = REVENUE_METRICS.revenueByPlan[plan] ?? 0;
        // Find nearest renewal (next due date from orders)
        const planOrders = MOCK_ORDERS.filter(
          (o) => o.plan === plan && o.status !== "failed",
        );
        const nearestRenewal = planOrders
          .map((o) => o.nextRenewal ?? o.dueDate)
          .filter(Boolean)
          .sort()[0];
        // Growth % (deterministic per plan)
        const growthByPlan: Record<Plan, number> = {
          [Plan.BASIC]: 4.2,
          [Plan.PROFESSIONAL]: 9.1,
          [Plan.ENTERPRISE]: 14.7,
          [Plan.ULTRA]: 21.3,
        };
        return {
          plan,
          cfg,
          count,
          mrrContribution,
          nearestRenewal,
          growth: growthByPlan[plan],
        };
      }),
    [],
  );

  return (
    <GlassCard className="overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
        <h2 className="text-sm font-display font-semibold text-foreground">
          Subscription Health by Plan
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="bg-muted/20 border-b border-border/30">
            <tr className="text-muted-foreground">
              <th className="text-left py-2.5 px-5 font-semibold">Plan</th>
              <th className="text-right py-2.5 px-4 font-semibold">
                Monthly Price
              </th>
              <th className="text-right py-2.5 px-4 font-semibold">Tenants</th>
              <th className="text-right py-2.5 px-4 font-semibold">
                MRR Contribution
              </th>
              <th className="text-right py-2.5 px-4 font-semibold">Growth</th>
              <th className="text-left py-2.5 px-4 font-semibold">
                Next Renewal
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.plan}
                className={`border-b border-border/20 hover:bg-muted/15 transition-colors ${i % 2 === 1 ? "bg-muted/5" : ""}`}
              >
                <td className="py-3 px-5">
                  <Badge className={`text-[9px] border ${row.cfg.color}`}>
                    {row.cfg.label}
                  </Badge>
                </td>
                <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                  ${row.cfg.monthlyPrice.toLocaleString()}/mo
                </td>
                <td className="py-3 px-4 text-right font-mono font-semibold text-foreground">
                  {row.count}
                </td>
                <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">
                  {fmtCurrency(row.mrrContribution)}
                </td>
                <td className="py-3 px-4 text-right">
                  <span className="flex items-center justify-end gap-0.5 text-emerald-400 font-mono">
                    <ArrowUpRight className="w-3 h-3" />
                    {row.growth.toFixed(1)}%
                  </span>
                </td>
                <td className="py-3 px-4 text-[10px] text-muted-foreground">
                  {row.nearestRenewal ? fmtDate(row.nearestRenewal) : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GlobalBilling(): React.ReactElement {
  const [dateRange, setDateRange] = useState("12m");
  const [planChangeTarget, setPlanChangeTarget] = useState<{
    id: string;
    name: string;
    plan: Plan;
  } | null>(null);

  const trendData = dateRange === "24m" ? TREND_24M : TREND_12M;

  const orderStats = useMemo(
    () => ({
      paid: MOCK_ORDERS.filter((o) => o.status === "paid").length,
      pending: MOCK_ORDERS.filter((o) => o.status === "pending").length,
      failed: MOCK_ORDERS.filter((o) => o.status === "failed").length,
    }),
    [],
  );

  // Plan distribution pie data with percentages
  const pieData = useMemo(() => {
    const totalDistCount = planDistribution.reduce((s, d) => s + d.count, 0);
    return planDistribution.map((d) => ({
      name: d.plan,
      value: d.count,
      color: d.color,
      pct: (d.count / totalDistCount) * 100,
      revenue: d.revenue,
    }));
  }, []);

  const lifecycleData = useMemo(
    () => [
      {
        stage: "Trial",
        count: REVENUE_METRICS.trialSubscriptions,
        color: "#3b82f6",
      },
      {
        stage: "Active",
        count: REVENUE_METRICS.activeSubscriptions,
        color: "#10b981",
      },
      {
        stage: "Renewal",
        count: Math.round(REVENUE_METRICS.activeSubscriptions * 0.3),
        color: "#8b5cf6",
      },
      {
        stage: "Expired",
        count: REVENUE_METRICS.expiredSubscriptions,
        color: "#6b7280",
      },
    ],
    [],
  );

  const failedOrders = useMemo(
    () =>
      MOCK_ORDERS.filter((o) => o.status === "failed")
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .slice(0, 5),
    [],
  );

  const topCompanies = useMemo(
    () =>
      [...MOCK_COMPANIES]
        .filter((c) => c.monthlyRevenue > 0)
        .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
        .slice(0, 8),
    [],
  );

  const planChanges = useMemo(
    () =>
      MOCK_AUDIT_EVENTS.filter((e) => e.action === "plan.changed")
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )
        .slice(0, 5),
    [],
  );

  const handleExport = () => {
    const csv = [
      ["Metric", "Value"],
      ["MRR", REVENUE_METRICS.totalMRR],
      ["ARR", REVENUE_METRICS.totalARR],
      ["Churn Rate", `${REVENUE_METRICS.churnRate}%`],
      ["Active Subscriptions", REVENUE_METRICS.activeSubscriptions],
      ["Trial Subscriptions", REVENUE_METRICS.trialSubscriptions],
      ["Failed Payments", orderStats.failed],
    ]
      .map((r) => r.join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const maxLifecycle = Math.max(...lifecycleData.map((d) => d.count));

  const lastUpdated = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="p-4 md:p-6 space-y-5 md:space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-amber-400" />
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              Billing Overview
            </h1>
            <p className="text-xs text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger
              className="h-8 text-xs w-32 bg-background/50"
              data-ocid="billing-date-range"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12m">Last 12 Months</SelectItem>
              <SelectItem value="24m">Last 24 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant="outline"
            className="h-8 text-xs gap-1.5"
            onClick={handleExport}
            data-ocid="btn-export-revenue"
          >
            <Download className="w-3.5 h-3.5" />
            Export Report
          </Button>
        </div>
      </div>

      {/* KPI Row — 4 cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <MetricCard
          label="Monthly Recurring Revenue"
          value={fmtCurrency(REVENUE_METRICS.totalMRR)}
          change="+8.2%"
          positive
          icon={DollarSign}
          accent="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          delay={0}
        />
        <MetricCard
          label="Annual Recurring Revenue"
          value={fmtCurrency(REVENUE_METRICS.totalARR)}
          change="+12.4%"
          positive
          icon={TrendingUp}
          accent="bg-blue-500/15 text-blue-400 border border-blue-500/30"
          delay={0.05}
        />
        <MetricCard
          label="Churn Rate"
          value={`${REVENUE_METRICS.churnRate.toFixed(1)}%`}
          change="-0.4%"
          positive
          icon={TrendingDown}
          accent="bg-rose-500/15 text-rose-400 border border-rose-500/30"
          delay={0.1}
        />
        <MetricCard
          label="Active Subscriptions"
          value={REVENUE_METRICS.activeSubscriptions.toString()}
          sub={`Trial: ${REVENUE_METRICS.trialSubscriptions} · Suspended: ${REVENUE_METRICS.suspendedSubscriptions} · Expired: ${REVENUE_METRICS.expiredSubscriptions}`}
          change="+4"
          positive
          icon={Users}
          accent="bg-violet-500/15 text-violet-400 border border-violet-500/30"
          delay={0.15}
        />
      </div>

      {/* Revenue Trend — Multi-series AreaChart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
              <h2 className="text-sm font-display font-semibold text-foreground">
                Revenue Trend by Plan
              </h2>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {dateRange === "24m" ? "24-month" : "12-month"} MRR breakdown
                per subscription tier
              </p>
            </div>
            <Badge className="text-[9px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              +8.2% MoM
            </Badge>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart
                  data={trendData}
                  margin={{ top: 4, right: 4, left: -10, bottom: 0 }}
                >
                  <defs>
                    {Object.values(Plan).map((plan) => {
                      const cfg = PLAN_CONFIG[plan];
                      return (
                        <linearGradient
                          key={cfg.gradId}
                          id={cfg.gradId}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor={cfg.chartColor}
                            stopOpacity={0.25}
                          />
                          <stop
                            offset="95%"
                            stopColor={cfg.chartColor}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      );
                    })}
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="oklch(0.5 0 0 / 0.08)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9, fill: "oklch(0.52 0.008 260)" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "oklch(0.52 0.008 260)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => fmtCurrency(v)}
                  />
                  <Tooltip content={<MultiLineTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "10px", paddingTop: "8px" }}
                    iconType="circle"
                    iconSize={7}
                  />
                  {(
                    ["Basic", "Professional", "Enterprise", "Ultra"] as const
                  ).map((key) => {
                    const planKey =
                      key === "Basic"
                        ? Plan.BASIC
                        : key === "Professional"
                          ? Plan.PROFESSIONAL
                          : key === "Enterprise"
                            ? Plan.ENTERPRISE
                            : Plan.ULTRA;
                    const cfg = PLAN_CONFIG[planKey];
                    return (
                      <Area
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={key}
                        stroke={cfg.chartColor}
                        strokeWidth={1.5}
                        fill={`url(#${cfg.gradId})`}
                        dot={false}
                        stackId="1"
                      />
                    );
                  })}
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Plan Distribution + Lifecycle */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Plan Distribution Pie */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <GlassCard className="p-5 h-full">
            <h2 className="text-sm font-display font-semibold text-foreground mb-4">
              Plan Distribution
            </h2>
            <div className="flex items-center gap-6">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={entry.color}
                        opacity={0.85}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<PieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2.5">
                {pieData.map((d) => {
                  const planKey = d.name as Plan;
                  const cfg = PLAN_CONFIG[planKey];
                  return (
                    <div key={d.name} className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm shrink-0"
                        style={{ background: d.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-foreground">
                            {cfg.label}
                          </span>
                          <span className="text-xs font-mono font-bold text-foreground">
                            {d.value}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <div className="h-1 rounded-full bg-muted/30 flex-1 mr-2 overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${d.pct}%`,
                                background: d.color,
                                opacity: 0.7,
                              }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-muted-foreground">
                            {d.pct.toFixed(0)}%
                          </span>
                        </div>
                        <p className="text-[9px] text-muted-foreground">
                          {fmtCurrency(d.revenue)}/mo MRR
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Subscription Lifecycle */}
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
        >
          <GlassCard className="p-5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <RefreshCw className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-display font-semibold text-foreground">
                Subscription Lifecycle
              </h2>
            </div>
            {/* Horizontal flow with arrows */}
            <div className="flex items-center gap-1 mb-5 overflow-x-auto pb-1">
              {lifecycleData.map((stage, i) => (
                <div key={stage.stage} className="flex items-center">
                  <div
                    className="flex flex-col items-center px-3.5 py-2.5 rounded-xl border min-w-[80px]"
                    style={{
                      background: `${stage.color}18`,
                      borderColor: `${stage.color}40`,
                    }}
                  >
                    <span
                      className="text-xl font-display font-bold"
                      style={{ color: stage.color }}
                    >
                      {stage.count}
                    </span>
                    <span className="text-[10px] font-medium text-muted-foreground mt-0.5">
                      {stage.stage}
                    </span>
                  </div>
                  {i < lifecycleData.length - 1 && (
                    <span className="text-muted-foreground/40 font-bold text-lg mx-0.5">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Progress bars */}
            <div className="space-y-2.5">
              {lifecycleData.map((stage) => {
                const pct =
                  maxLifecycle > 0 ? (stage.count / maxLifecycle) * 100 : 0;
                return (
                  <div key={stage.stage}>
                    <div className="flex justify-between mb-1 text-[10px]">
                      <span className="text-muted-foreground">
                        {stage.stage}
                      </span>
                      <span
                        className="font-mono"
                        style={{ color: stage.color }}
                      >
                        {stage.count} companies
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: stage.color, opacity: 0.75 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Subscription Health Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SubHealthTable />
      </motion.div>

      {/* Bottom Row — Failed Payments + Top Companies + Plan Changes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Failed Payments */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <h2 className="text-sm font-display font-semibold text-foreground">
                  Failed Payments
                </h2>
              </div>
              <Badge className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/30">
                {orderStats.failed} total
              </Badge>
            </div>
            <div className="space-y-2">
              {failedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center gap-2 py-2 px-3 rounded-lg bg-red-500/5 border border-red-500/10"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">
                      {order.companyName}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge
                        className={`text-[8px] border ${PLAN_CONFIG[order.plan].color}`}
                      >
                        {order.plan}
                      </Badge>
                      <span className="text-[9px] text-muted-foreground font-mono">
                        {fmtDate(order.createdAt)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-mono font-bold text-red-400">
                      ${order.price.toLocaleString()}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-5 text-[9px] px-1.5 text-muted-foreground hover:text-foreground mt-0.5"
                      data-ocid={`btn-retry-payment-${order.id}`}
                    >
                      <RefreshCw className="w-2.5 h-2.5 mr-0.5" />
                      Retry
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Top Revenue Companies */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard className="p-5">
            <h2 className="text-sm font-display font-semibold text-foreground mb-4">
              Top 8 by Revenue
            </h2>
            <div className="space-y-1.5">
              {topCompanies.map((c, i) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-muted/20 transition-colors group"
                  data-ocid={`top-company-row-${c.id}`}
                >
                  <span className="text-[9px] font-mono text-muted-foreground w-4">
                    #{i + 1}
                  </span>
                  <span className="text-xs font-medium text-foreground flex-1 truncate min-w-0">
                    {c.name}
                  </span>
                  <Badge
                    className={`text-[8px] border shrink-0 ${PLAN_CONFIG[c.plan].color}`}
                  >
                    {c.plan}
                  </Badge>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono text-emerald-400 block">
                      {fmtCurrency(c.monthlyRevenue)}/mo
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[9px] px-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground shrink-0"
                    onClick={() =>
                      setPlanChangeTarget({
                        id: c.id,
                        name: c.name,
                        plan: c.plan as Plan,
                      })
                    }
                    data-ocid={`btn-manage-plan-${c.id}`}
                  >
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Plan Changes Log */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <XCircle className="w-4 h-4 text-violet-400" />
              <h2 className="text-sm font-display font-semibold text-foreground">
                Recent Plan Changes
              </h2>
            </div>
            {planChanges.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-8">
                No recent plan changes
              </p>
            ) : (
              <div className="space-y-3">
                {planChanges.map((event) => (
                  <div
                    key={event.id}
                    className="flex gap-3 py-2 px-3 rounded-lg bg-muted/10 border border-border/20"
                  >
                    <div className="w-7 h-7 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5">
                      <RefreshCw className="w-3 h-3 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {event.companyName}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                        {event.details}
                      </p>
                      <p className="text-[9px] font-mono text-muted-foreground mt-1">
                        {fmtDate(event.timestamp)}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 text-[9px] px-1.5 text-muted-foreground hover:text-foreground shrink-0 self-center"
                      onClick={() => {
                        const co = MOCK_COMPANIES.find(
                          (c) => c.id === event.companyId,
                        );
                        if (co)
                          setPlanChangeTarget({
                            id: co.id,
                            name: co.name,
                            plan: co.plan as Plan,
                          });
                      }}
                      data-ocid={`btn-manage-plan-audit-${event.id}`}
                    >
                      Manage
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Plan Change Modal */}
      <PlanChangeModal
        company={planChangeTarget}
        onClose={() => setPlanChangeTarget(null)}
      />
    </div>
  );
}
