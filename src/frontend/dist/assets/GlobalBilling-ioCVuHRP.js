import { r as reactExports, j as jsxRuntimeExports, az as CreditCard, ah as TrendingUp, aL as Users, m as motion, af as Badge, ax as Plan, T as TriangleAlert } from "./index-iFuWQqSU.js";
import { G as GlassCard } from "./GlassCard-D9su5mrt.js";
import { B as Button } from "./button-ChfDbElx.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CJtLg0Pk.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BmN8obgD.js";
import { p as planDistribution, m as monthlyRevenue } from "./billingMockData-DOhi927q.js";
import { l as MOCK_ORDERS, R as REVENUE_METRICS, M as MOCK_COMPANIES, e as MOCK_AUDIT_EVENTS } from "./superAdminMockData-SJ6Z2k0y.js";
import { D as Download } from "./download-B7QpoSH-.js";
import { D as DollarSign } from "./dollar-sign-Dw8X6_Dp.js";
import { T as TrendingDown } from "./trending-down-DOlS6nsa.js";
import { R as ResponsiveContainer, T as Tooltip, L as Legend, C as Cell } from "./generateCategoricalChart-DqaYj3d4.js";
import { A as AreaChart } from "./AreaChart-CLRjeXzJ.js";
import { C as CartesianGrid } from "./CartesianGrid-Bm_QYZ4t.js";
import { X as XAxis, Y as YAxis } from "./YAxis-CeTwCnik.js";
import { A as Area } from "./Area-DxIQSTEa.js";
import { P as PieChart, a as Pie } from "./PieChart-CbA95EIN.js";
import { R as RefreshCw } from "./refresh-cw-C7GiMOau.js";
import { C as CircleX } from "./circle-x-sUpzDEP5.js";
import { A as ArrowUpRight } from "./arrow-up-right-CzUskMs7.js";
import { A as ArrowDownRight } from "./arrow-down-right-BbwwXhWO.js";
import { C as CircleCheck } from "./circle-check-iVFrCWzC.js";
import "./index-IXOTxK3N.js";
import "./index-DwV7JGiz.js";
import "./index-BWs8SA4K.js";
import "./check-BoirFqbD.js";
import "./chevron-up-CVJK9q_e.js";
import "./PolarAngleAxis-CyCn404F.js";
function fmtCurrency(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
const PLAN_MRR_SHARE = {
  BASIC: 0.013,
  // 12 × $200 ≈ $2,400
  PROFESSIONAL: 0.05,
  // 18 × $500 ≈ $9,000
  ENTERPRISE: 0.167,
  // 15 × $2,000 ≈ $30,000
  ULTRA: 0.25
  // 9 × $5,000 ≈ $45,000
};
const MULTI_PLAN_TREND = monthlyRevenue.map((m) => ({
  month: m.month,
  Basic: Math.round(m.revenue * PLAN_MRR_SHARE.BASIC),
  Professional: Math.round(m.revenue * PLAN_MRR_SHARE.PROFESSIONAL),
  Enterprise: Math.round(m.revenue * PLAN_MRR_SHARE.ENTERPRISE),
  Ultra: Math.round(m.revenue * PLAN_MRR_SHARE.ULTRA)
}));
const TREND_12M = MULTI_PLAN_TREND.slice(-12);
const TREND_24M = MULTI_PLAN_TREND;
const PLAN_CONFIG = {
  [Plan.BASIC]: {
    color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    chartColor: "#10b981",
    gradId: "gradBasic",
    label: "Basic",
    monthlyPrice: 200
  },
  [Plan.PROFESSIONAL]: {
    color: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    chartColor: "#3b82f6",
    gradId: "gradPro",
    label: "Professional",
    monthlyPrice: 500
  },
  [Plan.ENTERPRISE]: {
    color: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    chartColor: "#8b5cf6",
    gradId: "gradEnt",
    label: "Enterprise",
    monthlyPrice: 2e3
  },
  [Plan.ULTRA]: {
    color: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    chartColor: "#f59e0b",
    gradId: "gradUltra",
    label: "Ultra",
    monthlyPrice: 5e3
  }
};
function MetricCard({
  label,
  value,
  sub,
  change,
  positive = true,
  icon: Icon,
  accent,
  delay = 0
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `w-9 h-9 rounded-lg flex items-center justify-center ${accent}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
            }
          ),
          change && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `flex items-center gap-0.5 text-[10px] font-mono ${positive ? "text-emerald-400" : "text-red-400"}`,
              children: [
                positive ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownRight, { className: "w-3 h-3" }),
                change
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground mt-0.5", children: value }),
        sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1", children: sub })
      ] })
    }
  );
}
function MultiLineTooltip({
  active,
  payload,
  label
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const total = payload.reduce((s, p) => s + p.value, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-lg px-3 py-2.5 text-xs border border-border/40 min-w-[160px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-muted-foreground mb-2 border-b border-border/20 pb-1.5", children: label }),
    payload.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex justify-between items-center gap-4 mb-1",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "w-2 h-2 rounded-full inline-block",
                style: { background: p.color }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: p.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-semibold text-foreground", children: fmtCurrency(p.value) })
        ]
      },
      p.name
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mt-1.5 pt-1.5 border-t border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Total" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-foreground", children: fmtCurrency(total) })
    ] })
  ] });
}
function PieTooltip({
  active,
  payload
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const d = payload[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-lg px-3 py-2 text-xs border border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: d.name }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground mt-0.5", children: [
      d.value,
      " companies (",
      d.payload.pct.toFixed(1),
      "%)"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-emerald-400 mt-0.5", children: [
      fmtCurrency(d.payload.revenue),
      "/mo"
    ] })
  ] });
}
function PlanChangeModal({
  company,
  onClose
}) {
  const [newPlan, setNewPlan] = reactExports.useState("");
  const [applied, setApplied] = reactExports.useState(false);
  if (!company) return null;
  const currentCfg = PLAN_CONFIG[company.plan];
  const newCfg = newPlan ? PLAN_CONFIG[newPlan] : null;
  const daysUsed = 15;
  const daysTotal = 30;
  const daysRemaining = daysTotal - daysUsed;
  const creditAmount = (currentCfg.monthlyPrice * daysUsed / daysTotal).toFixed(2);
  const chargeAmount = newCfg ? (newCfg.monthlyPrice * daysRemaining / daysTotal).toFixed(2) : "0.00";
  const netCharge = newCfg ? (newCfg.monthlyPrice * daysRemaining / daysTotal - currentCfg.monthlyPrice * daysUsed / daysTotal).toFixed(2) : "0.00";
  const isUpgrade = newCfg && newCfg.monthlyPrice > currentCfg.monthlyPrice;
  const effectiveDate = /* @__PURE__ */ new Date();
  effectiveDate.setDate(1);
  effectiveDate.setMonth(effectiveDate.getMonth() + 1);
  const effectiveDateStr = effectiveDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  const handleApply = () => {
    setApplied(true);
    setTimeout(onClose, 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!company, onOpenChange: () => onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-md glass-elevated border border-border/40 shadow-2xl",
      "data-ocid": "plan-change-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-violet-400" }),
          "Manage Plan — ",
          company.name
        ] }) }),
        applied ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-10 h-10 text-emerald-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Plan change applied!" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
            company.name,
            " will move to",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: newPlan || company.plan }),
            " ",
            "effective ",
            effectiveDateStr,
            "."
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/20 border border-border/30 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1.5", children: "Current Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-xs border font-semibold ${currentCfg.color}`,
                  children: currentCfg.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground mt-2", children: [
                "$",
                currentCfg.monthlyPrice.toLocaleString(),
                "/mo"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/20 border border-border/30 p-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mb-1.5", children: "New Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Select,
                {
                  value: newPlan,
                  onValueChange: (v) => setNewPlan(v),
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      SelectTrigger,
                      {
                        className: "h-7 text-xs bg-background/50",
                        "data-ocid": "select-new-plan",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select plan…" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.values(Plan).filter((p) => p !== company.plan).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: p, children: [
                      PLAN_CONFIG[p].label,
                      " — $",
                      PLAN_CONFIG[p].monthlyPrice,
                      "/mo"
                    ] }, p)) })
                  ]
                }
              ),
              newCfg && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono text-muted-foreground mt-2", children: [
                "$",
                newCfg.monthlyPrice.toLocaleString(),
                "/mo"
              ] })
            ] })
          ] }),
          newPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/30 overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-muted/30 px-4 py-2 border-b border-border/20 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider", children: "Proration Preview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  className: `text-[9px] ${isUpgrade ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-amber-500/15 text-amber-400 border-amber-500/30"} border`,
                  children: isUpgrade ? "Upgrade" : "Downgrade"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 space-y-2 text-xs font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "Current plan credit (",
                  daysUsed,
                  " days used)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-emerald-400", children: [
                  "−$",
                  creditAmount
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                  "New plan charge (",
                  daysRemaining,
                  " days remaining)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                  "+$",
                  chargeAmount
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2 border-t border-border/20 font-bold", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Net charge today" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "span",
                  {
                    className: Number.parseFloat(netCharge) >= 0 ? "text-primary" : "text-emerald-400",
                    children: [
                      Number.parseFloat(netCharge) >= 0 ? "+" : "",
                      "$",
                      netCharge
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground leading-relaxed pt-1", children: [
                "Full billing at $",
                newCfg == null ? void 0 : newCfg.monthlyPrice.toLocaleString(),
                "/mo starts ",
                effectiveDateStr,
                ". Proration calculated to the nearest day."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "flex-1",
                disabled: !newPlan,
                onClick: handleApply,
                "data-ocid": "btn-apply-plan-change",
                children: "Apply Change"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                onClick: onClose,
                "data-ocid": "btn-cancel-plan-change",
                children: "Cancel"
              }
            )
          ] })
        ] })
      ]
    }
  ) });
}
function SubHealthTable() {
  const rows = reactExports.useMemo(
    () => Object.values(Plan).map((plan) => {
      const companies = MOCK_COMPANIES.filter(
        (c) => c.plan === plan && (c.status === "active" || c.status === "trial")
      );
      const count = companies.length;
      const cfg = PLAN_CONFIG[plan];
      const mrrContribution = REVENUE_METRICS.revenueByPlan[plan] ?? 0;
      const planOrders = MOCK_ORDERS.filter(
        (o) => o.plan === plan && o.status !== "failed"
      );
      const nearestRenewal = planOrders.map((o) => o.nextRenewal ?? o.dueDate).filter(Boolean).sort()[0];
      const growthByPlan = {
        [Plan.BASIC]: 4.2,
        [Plan.PROFESSIONAL]: 9.1,
        [Plan.ENTERPRISE]: 14.7,
        [Plan.ULTRA]: 21.3
      };
      return {
        plan,
        cfg,
        count,
        mrrContribution,
        nearestRenewal,
        growth: growthByPlan[plan]
      };
    }),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between px-5 py-3 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Subscription Health by Plan" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/20 border-b border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-5 font-semibold", children: "Plan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-4 font-semibold", children: "Monthly Price" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-4 font-semibold", children: "Tenants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-4 font-semibold", children: "MRR Contribution" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-2.5 px-4 font-semibold", children: "Growth" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-2.5 px-4 font-semibold", children: "Next Renewal" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: `border-b border-border/20 hover:bg-muted/15 transition-colors ${i % 2 === 1 ? "bg-muted/5" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-[9px] border ${row.cfg.color}`, children: row.cfg.label }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 text-right font-mono text-muted-foreground", children: [
              "$",
              row.cfg.monthlyPrice.toLocaleString(),
              "/mo"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono font-semibold text-foreground", children: row.count }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono font-bold text-emerald-400", children: fmtCurrency(row.mrrContribution) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-end gap-0.5 text-emerald-400 font-mono", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-3 h-3" }),
              row.growth.toFixed(1),
              "%"
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-[10px] text-muted-foreground", children: row.nearestRenewal ? fmtDate(row.nearestRenewal) : "—" })
          ]
        },
        row.plan
      )) })
    ] }) })
  ] });
}
function GlobalBilling() {
  const [dateRange, setDateRange] = reactExports.useState("12m");
  const [planChangeTarget, setPlanChangeTarget] = reactExports.useState(null);
  const trendData = dateRange === "24m" ? TREND_24M : TREND_12M;
  const orderStats = reactExports.useMemo(
    () => ({
      paid: MOCK_ORDERS.filter((o) => o.status === "paid").length,
      pending: MOCK_ORDERS.filter((o) => o.status === "pending").length,
      failed: MOCK_ORDERS.filter((o) => o.status === "failed").length
    }),
    []
  );
  const pieData = reactExports.useMemo(() => {
    const totalDistCount = planDistribution.reduce((s, d) => s + d.count, 0);
    return planDistribution.map((d) => ({
      name: d.plan,
      value: d.count,
      color: d.color,
      pct: d.count / totalDistCount * 100,
      revenue: d.revenue
    }));
  }, []);
  const lifecycleData = reactExports.useMemo(
    () => [
      {
        stage: "Trial",
        count: REVENUE_METRICS.trialSubscriptions,
        color: "#3b82f6"
      },
      {
        stage: "Active",
        count: REVENUE_METRICS.activeSubscriptions,
        color: "#10b981"
      },
      {
        stage: "Renewal",
        count: Math.round(REVENUE_METRICS.activeSubscriptions * 0.3),
        color: "#8b5cf6"
      },
      {
        stage: "Expired",
        count: REVENUE_METRICS.expiredSubscriptions,
        color: "#6b7280"
      }
    ],
    []
  );
  const failedOrders = reactExports.useMemo(
    () => MOCK_ORDERS.filter((o) => o.status === "failed").sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(0, 5),
    []
  );
  const topCompanies = reactExports.useMemo(
    () => [...MOCK_COMPANIES].filter((c) => c.monthlyRevenue > 0).sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).slice(0, 8),
    []
  );
  const planChanges = reactExports.useMemo(
    () => MOCK_AUDIT_EVENTS.filter((e) => e.action === "plan.changed").sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ).slice(0, 5),
    []
  );
  const handleExport = () => {
    const csv = [
      ["Metric", "Value"],
      ["MRR", REVENUE_METRICS.totalMRR],
      ["ARR", REVENUE_METRICS.totalARR],
      ["Churn Rate", `${REVENUE_METRICS.churnRate}%`],
      ["Active Subscriptions", REVENUE_METRICS.activeSubscriptions],
      ["Trial Subscriptions", REVENUE_METRICS.trialSubscriptions],
      ["Failed Payments", orderStats.failed]
    ].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "revenue-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };
  const maxLifecycle = Math.max(...lifecycleData.map((d) => d.count));
  const lastUpdated = (/* @__PURE__ */ new Date()).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5 md:space-y-6 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start sm:items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-amber-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Billing Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Last updated: ",
            lastUpdated
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: dateRange, onValueChange: setDateRange, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            SelectTrigger,
            {
              className: "h-8 text-xs w-32 bg-background/50",
              "data-ocid": "billing-date-range",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "12m", children: "Last 12 Months" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "24m", children: "Last 24 Months" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "h-8 text-xs gap-1.5",
            onClick: handleExport,
            "data-ocid": "btn-export-revenue",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              "Export Report"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Monthly Recurring Revenue",
          value: fmtCurrency(REVENUE_METRICS.totalMRR),
          change: "+8.2%",
          positive: true,
          icon: DollarSign,
          accent: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
          delay: 0
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Annual Recurring Revenue",
          value: fmtCurrency(REVENUE_METRICS.totalARR),
          change: "+12.4%",
          positive: true,
          icon: TrendingUp,
          accent: "bg-blue-500/15 text-blue-400 border border-blue-500/30",
          delay: 0.05
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Churn Rate",
          value: `${REVENUE_METRICS.churnRate.toFixed(1)}%`,
          change: "-0.4%",
          positive: true,
          icon: TrendingDown,
          accent: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
          delay: 0.1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MetricCard,
        {
          label: "Active Subscriptions",
          value: REVENUE_METRICS.activeSubscriptions.toString(),
          sub: `Trial: ${REVENUE_METRICS.trialSubscriptions} · Suspended: ${REVENUE_METRICS.suspendedSubscriptions} · Expired: ${REVENUE_METRICS.expiredSubscriptions}`,
          change: "+4",
          positive: true,
          icon: Users,
          accent: "bg-violet-500/15 text-violet-400 border border-violet-500/30",
          delay: 0.15
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Revenue Trend by Plan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground mt-0.5", children: [
                dateRange === "24m" ? "24-month" : "12-month",
                " MRR breakdown per subscription tier"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30", children: "+8.2% MoM" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[400px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            AreaChart,
            {
              data: trendData,
              margin: { top: 4, right: 4, left: -10, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: Object.values(Plan).map((plan) => {
                  const cfg = PLAN_CONFIG[plan];
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "linearGradient",
                    {
                      id: cfg.gradId,
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "stop",
                          {
                            offset: "5%",
                            stopColor: cfg.chartColor,
                            stopOpacity: 0.25
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "stop",
                          {
                            offset: "95%",
                            stopColor: cfg.chartColor,
                            stopOpacity: 0
                          }
                        )
                      ]
                    },
                    cfg.gradId
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "oklch(0.5 0 0 / 0.08)",
                    vertical: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "month",
                    tick: { fontSize: 9, fill: "oklch(0.52 0.008 260)" },
                    axisLine: false,
                    tickLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 9, fill: "oklch(0.52 0.008 260)" },
                    axisLine: false,
                    tickLine: false,
                    tickFormatter: (v) => fmtCurrency(v)
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(MultiLineTooltip, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Legend,
                  {
                    wrapperStyle: { fontSize: "10px", paddingTop: "8px" },
                    iconType: "circle",
                    iconSize: 7
                  }
                ),
                ["Basic", "Professional", "Enterprise", "Ultra"].map((key) => {
                  const planKey = key === "Basic" ? Plan.BASIC : key === "Professional" ? Plan.PROFESSIONAL : key === "Enterprise" ? Plan.ENTERPRISE : Plan.ULTRA;
                  const cfg = PLAN_CONFIG[planKey];
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Area,
                    {
                      type: "monotone",
                      dataKey: key,
                      name: key,
                      stroke: cfg.chartColor,
                      strokeWidth: 1.5,
                      fill: `url(#${cfg.gradId})`,
                      dot: false,
                      stackId: "1"
                    },
                    key
                  );
                })
              ]
            }
          ) }) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: -12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground mb-4", children: "Plan Distribution" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: 160, height: 160, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Pie,
                  {
                    data: pieData,
                    cx: "50%",
                    cy: "50%",
                    innerRadius: 42,
                    outerRadius: 68,
                    paddingAngle: 3,
                    dataKey: "value",
                    children: pieData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Cell,
                      {
                        fill: entry.color,
                        opacity: 0.85
                      },
                      entry.name
                    ))
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(PieTooltip, {}) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 space-y-2.5", children: pieData.map((d) => {
                const planKey = d.name;
                const cfg = PLAN_CONFIG[planKey];
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "w-2.5 h-2.5 rounded-sm shrink-0",
                      style: { background: d.color }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground", children: cfg.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-foreground", children: d.value })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-muted/30 flex-1 mr-2 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "h-full rounded-full",
                          style: {
                            width: `${d.pct}%`,
                            background: d.color,
                            opacity: 0.7
                          }
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-muted-foreground", children: [
                        d.pct.toFixed(0),
                        "%"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] text-muted-foreground", children: [
                      fmtCurrency(d.revenue),
                      "/mo MRR"
                    ] })
                  ] })
                ] }, d.name);
              }) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 12 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: 0.25 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-violet-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Subscription Lifecycle" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 mb-5 overflow-x-auto pb-1", children: lifecycleData.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center px-3.5 py-2.5 rounded-xl border min-w-[80px]",
                  style: {
                    background: `${stage.color}18`,
                    borderColor: `${stage.color}40`
                  },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: "text-xl font-display font-bold",
                        style: { color: stage.color },
                        children: stage.count
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium text-muted-foreground mt-0.5", children: stage.stage })
                  ]
                }
              ),
              i < lifecycleData.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40 font-bold text-lg mx-0.5", children: "→" })
            ] }, stage.stage)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: lifecycleData.map((stage) => {
              const pct = maxLifecycle > 0 ? stage.count / maxLifecycle * 100 : 0;
              return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1 text-[10px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: stage.stage }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: "font-mono",
                      style: { color: stage.color },
                      children: [
                        stage.count,
                        " companies"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 bg-muted/30 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    className: "h-full rounded-full",
                    style: { background: stage.color, opacity: 0.75 },
                    initial: { width: 0 },
                    animate: { width: `${pct}%` },
                    transition: { delay: 0.4, duration: 0.6 }
                  }
                ) })
              ] }, stage.stage);
            }) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(SubHealthTable, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.35 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-red-400" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Failed Payments" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-[9px] bg-red-500/15 text-red-400 border border-red-500/30", children: [
                orderStats.failed,
                " total"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: failedOrders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 py-2 px-3 rounded-lg bg-red-500/5 border border-red-500/10",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: order.companyName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          className: `text-[8px] border ${PLAN_CONFIG[order.plan].color}`,
                          children: order.plan
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground font-mono", children: fmtDate(order.createdAt) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-mono font-bold text-red-400", children: [
                      "$",
                      order.price.toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "ghost",
                        className: "h-5 text-[9px] px-1.5 text-muted-foreground hover:text-foreground mt-0.5",
                        "data-ocid": `btn-retry-payment-${order.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-2.5 h-2.5 mr-0.5" }),
                          "Retry"
                        ]
                      }
                    )
                  ] })
                ]
              },
              order.id
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.4 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground mb-4", children: "Top 8 by Revenue" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: topCompanies.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 py-1.5 px-3 rounded-lg hover:bg-muted/20 transition-colors group",
                "data-ocid": `top-company-row-${c.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] font-mono text-muted-foreground w-4", children: [
                    "#",
                    i + 1
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground flex-1 truncate min-w-0", children: c.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[8px] border shrink-0 ${PLAN_CONFIG[c.plan].color}`,
                      children: c.plan
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-right shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-emerald-400 block", children: [
                    fmtCurrency(c.monthlyRevenue),
                    "/mo"
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-6 text-[9px] px-1.5 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground shrink-0",
                      onClick: () => setPlanChangeTarget({
                        id: c.id,
                        name: c.name,
                        plan: c.plan
                      }),
                      "data-ocid": `btn-manage-plan-${c.id}`,
                      children: "Manage"
                    }
                  )
                ]
              },
              c.id
            )) })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.45 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "w-4 h-4 text-violet-400" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Recent Plan Changes" })
            ] }),
            planChanges.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-8", children: "No recent plan changes" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: planChanges.map((event) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex gap-3 py-2 px-3 rounded-lg bg-muted/10 border border-border/20",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3 text-violet-400" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground truncate", children: event.companyName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-0.5 line-clamp-1", children: event.details }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono text-muted-foreground mt-1", children: fmtDate(event.timestamp) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "h-6 text-[9px] px-1.5 text-muted-foreground hover:text-foreground shrink-0 self-center",
                      onClick: () => {
                        const co = MOCK_COMPANIES.find(
                          (c) => c.id === event.companyId
                        );
                        if (co)
                          setPlanChangeTarget({
                            id: co.id,
                            name: co.name,
                            plan: co.plan
                          });
                      },
                      "data-ocid": `btn-manage-plan-audit-${event.id}`,
                      children: "Manage"
                    }
                  )
                ]
              },
              event.id
            )) })
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PlanChangeModal,
      {
        company: planChangeTarget,
        onClose: () => setPlanChangeTarget(null)
      }
    )
  ] });
}
export {
  GlobalBilling as default
};
