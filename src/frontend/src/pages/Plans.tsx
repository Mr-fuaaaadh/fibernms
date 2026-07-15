import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PLAN_CONFIGS, PLAN_ORDER } from "@/config/features";
import { useSubscription } from "@/hooks/useFeature";
import { cn } from "@/lib/utils";
import { Plan } from "@/types/subscription";
import {
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Minus,
  Star,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

// ─── Plan Color Tokens ────────────────────────────────────────────────────────
const PLAN_COLORS: Record<
  Plan,
  { ring: string; badge: string; bg: string; text: string; glow: string }
> = {
  [Plan.BASIC]: {
    ring: "border-emerald-500/40",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    bg: "from-emerald-500/5 to-transparent",
    text: "text-emerald-400",
    glow: "shadow-[0_0_24px_oklch(0.62_0.22_142/0.15)]",
  },
  [Plan.PROFESSIONAL]: {
    ring: "border-blue-500/40",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    bg: "from-blue-500/5 to-transparent",
    text: "text-blue-400",
    glow: "shadow-[0_0_24px_oklch(0.62_0.18_210/0.18)]",
  },
  [Plan.ENTERPRISE]: {
    ring: "border-violet-500/40",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    bg: "from-violet-500/5 to-transparent",
    text: "text-violet-400",
    glow: "shadow-[0_0_24px_oklch(0.65_0.22_290/0.2)]",
  },
  [Plan.ULTRA]: {
    ring: "border-rose-500/40",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    bg: "from-rose-500/8 via-violet-500/4 to-transparent",
    text: "text-rose-400",
    glow: "shadow-[0_0_32px_oklch(0.62_0.28_22/0.25)]",
  },
};

// ─── Feature Matrix ───────────────────────────────────────────────────────────
type CellValue = "✅" | "⚠️" | "❌" | string;

interface MatrixSection {
  category: string;
  rows: {
    label: string;
    values: [CellValue, CellValue, CellValue, CellValue];
  }[];
}

const FEATURE_MATRIX: MatrixSection[] = [
  {
    category: "Capacity & Scale",
    rows: [
      {
        label: "Device Limit",
        values: ["1,000", "10,000", "100,000", "Unlimited"],
      },
      {
        label: "API Rate Limit",
        values: ["1K/day", "50K/day", "1M/mo", "Unlimited"],
      },
      {
        label: "Data Retention",
        values: ["None", "30 days", "1 year", "Unlimited"],
      },
    ],
  },
  {
    category: "Map Features",
    rows: [
      { label: "Map Dashboard", values: ["✅", "✅", "✅", "✅"] },
      { label: "GIS Draw Tools", values: ["❌", "✅", "✅", "✅"] },
      { label: "Device Clustering", values: ["✅", "✅", "✅", "✅"] },
      { label: "Satellite Overlay", values: ["❌", "⚠️", "✅", "✅"] },
      { label: "Weather Overlay", values: ["❌", "❌", "✅", "✅"] },
    ],
  },
  {
    category: "Monitoring",
    rows: [
      {
        label: "Real-time Monitoring",
        values: ["❌", "⚠️ Limited", "✅", "✅"],
      },
      {
        label: "Historical Metrics",
        values: ["❌", "7 days", "365 days", "Unlimited"],
      },
      { label: "Alert Correlation", values: ["❌", "❌", "✅", "✅"] },
      { label: "WebSocket Streams", values: ["❌", "❌", "✅", "✅"] },
    ],
  },
  {
    category: "Topology & Visualization",
    rows: [
      { label: "Topology Visualization", values: ["❌", "✅", "✅", "✅"] },
      { label: "Multi-layer L1/L2/L3", values: ["❌", "❌", "✅", "✅"] },
      { label: "Digital Twin Simulation", values: ["❌", "❌", "❌", "✅"] },
    ],
  },
  {
    category: "AI & Analytics",
    rows: [
      { label: "AI Anomaly Detection", values: ["❌", "❌", "⚠️ Basic", "✅"] },
      { label: "Predictive Intelligence", values: ["❌", "❌", "✅", "✅"] },
      { label: "AI Copilot Assistant", values: ["❌", "❌", "⚠️ Basic", "✅"] },
      {
        label: "Natural Language Automation",
        values: ["❌", "❌", "❌", "✅"],
      },
      { label: "Capacity Forecasting", values: ["❌", "❌", "✅", "✅"] },
    ],
  },
  {
    category: "Automation",
    rows: [
      {
        label: "Workflow Automation",
        values: ["❌", "❌", "⚠️ 5 workflows", "✅ Unlimited"],
      },
      { label: "Event Triggers", values: ["❌", "❌", "✅", "✅"] },
      { label: "Custom Workflow Builder", values: ["❌", "❌", "❌", "✅"] },
    ],
  },
  {
    category: "Compliance & Security",
    rows: [
      { label: "Audit Logs", values: ["❌", "❌", "✅", "✅"] },
      { label: "SLA Dashboard", values: ["❌", "❌", "✅", "✅"] },
      { label: "RBAC / Role-based Access", values: ["❌", "✅", "✅", "✅"] },
      {
        label: "ABAC / Attribute-based Access",
        values: ["❌", "❌", "❌", "✅"],
      },
      { label: "SSO (OAuth / SAML)", values: ["❌", "❌", "✅", "✅"] },
      { label: "Session Monitoring", values: ["❌", "❌", "✅", "✅"] },
    ],
  },
  {
    category: "Integrations & API",
    rows: [
      { label: "API Access", values: ["❌", "❌", "✅", "✅"] },
      { label: "Webhook Support", values: ["❌", "❌", "✅", "✅"] },
      { label: "OSS/BSS Integrations", values: ["❌", "❌", "❌", "✅"] },
      { label: "Custom Plugins", values: ["❌", "❌", "❌", "✅"] },
      { label: "Plugin Marketplace", values: ["❌", "❌", "❌", "✅"] },
    ],
  },
  {
    category: "Enterprise",
    rows: [
      { label: "Multi-region Support", values: ["❌", "❌", "✅", "✅"] },
      { label: "Multi-tenant Management", values: ["❌", "❌", "❌", "✅"] },
      { label: "White-labeling", values: ["❌", "❌", "❌", "✅"] },
      { label: "Custom Domain", values: ["❌", "❌", "❌", "✅"] },
      { label: "Dedicated NOC Mode", values: ["❌", "❌", "❌", "✅"] },
    ],
  },
  {
    category: "Support",
    rows: [
      {
        label: "Support Type",
        values: ["Community", "Email", "Priority", "Dedicated SRE"],
      },
      { label: "SLA Response Time", values: ["—", "48h", "8h", "1h"] },
      { label: "Onboarding Assistance", values: ["❌", "❌", "✅", "✅"] },
      { label: "Custom Training", values: ["❌", "❌", "❌", "✅"] },
    ],
  },
];

// Key features preview (shown when "Show Key Features" is active)
const KEY_ROWS = new Set([
  "Device Limit",
  "Map Dashboard",
  "GIS Draw Tools",
  "Real-time Monitoring",
  "Historical Metrics",
  "Alert Correlation",
  "AI Anomaly Detection",
  "SLA Dashboard",
  "Topology Visualization",
  "Workflow Automation",
  "Predictive Intelligence",
  "Capacity Forecasting",
  "Audit Logs",
  "API Access",
  "OSS/BSS Integrations",
  "Multi-tenant Management",
  "White-labeling",
  "Custom Plugins",
  "Support Type",
]);

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Can I upgrade or downgrade my plan at any time?",
    a: "Yes. Upgrades take effect immediately and are prorated for the remainder of your billing cycle. Downgrades take effect at the end of the current billing period so you keep access to all features until then.",
  },
  {
    q: "What happens to my data if I downgrade?",
    a: "Your historical data is preserved for 90 days after a downgrade. If you re-upgrade within that window, everything is restored instantly. After 90 days, historical metrics beyond the lower plan's retention limit are archived.",
  },
  {
    q: "Is there a free trial available?",
    a: "New accounts receive a 14-day Enterprise trial with no credit card required. At the end of the trial you can choose any plan, or your account automatically moves to the Basic plan.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual billing locks in a 20% discount versus monthly pricing, billed as a single upfront payment. You can still upgrade mid-year and pay only the prorated difference for the remainder of the term.",
  },
  {
    q: "Can I run FiberNMS on-premise instead of SaaS?",
    a: "On-premise and hybrid deployment options are available on the Ultra / Carrier plan. Contact our enterprise sales team for custom licensing and deployment support.",
  },
];

// ─── Cell Renderer ────────────────────────────────────────────────────────────
function MatrixCell({ value }: { value: CellValue }) {
  if (value === "✅")
    return (
      <div className="flex justify-center">
        <Check className="size-4 text-emerald-400" />
      </div>
    );
  if (value === "❌")
    return (
      <div className="flex justify-center">
        <X className="size-4 text-muted-foreground/40" />
      </div>
    );
  if (value === "⚠️" || value.startsWith("⚠️"))
    return (
      <div className="flex justify-center">
        <span className="text-[11px] text-amber-400 font-medium text-center leading-tight">
          {value.replace("⚠️ ", "")}
        </span>
      </div>
    );
  return (
    <div className="flex justify-center">
      <span className="text-[11px] text-muted-foreground text-center leading-tight">
        {value}
      </span>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({
  plan,
  annual,
  currentPlan,
}: {
  plan: Plan;
  annual: boolean;
  currentPlan: Plan;
}) {
  const config = PLAN_CONFIGS[plan];
  const colors = PLAN_COLORS[plan];
  const isCurrent = plan === currentPlan;
  const currentIdx = PLAN_ORDER.indexOf(currentPlan);
  const planIdx = PLAN_ORDER.indexOf(plan);
  const isUpgrade = planIdx > currentIdx;
  const isDowngrade = planIdx < currentIdx;
  const isUltra = plan === Plan.ULTRA;

  const price = annual ? config.annualPrice : config.monthlyPrice;

  const PLAN_KEY_FEATURES: Record<Plan, string[]> = {
    [Plan.BASIC]: [
      "Map dashboard & basic routing",
      "Device clustering (1,000 limit)",
      "Community support",
      "Core alert notifications",
    ],
    [Plan.PROFESSIONAL]: [
      "Full GIS map tools & draw routes",
      "Historical metrics (7 days)",
      "Topology visualization",
      "Advanced alerting & email support",
    ],
    [Plan.ENTERPRISE]: [
      "Real-time WebSocket monitoring",
      "SLA dashboards & breach alerts",
      "AI anomaly detection (basic)",
      "Workflow automation (5 flows)",
      "Audit logs & compliance",
      "API access & SSO",
    ],
    [Plan.ULTRA]: [
      "Unlimited devices & scale",
      "Full AI predictive intelligence",
      "Digital twin simulation",
      "Multi-tenant + white-labeling",
      "Custom plugins & marketplace",
      "Dedicated SRE support (1h SLA)",
    ],
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col border glass-card overflow-hidden transition-smooth",
        isCurrent ? cn(colors.ring, colors.glow) : "border-border",
        isUltra &&
          !isCurrent &&
          "border-rose-500/30 shadow-[0_0_40px_oklch(0.62_0.28_22/0.12)]",
      )}
      data-ocid={`plan-card-${plan.toLowerCase()}`}
    >
      {/* Gradient background stripe */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-24 bg-gradient-to-b pointer-events-none",
          colors.bg,
        )}
      />

      {/* Badges row */}
      <div className="absolute top-0 inset-x-0 flex justify-between px-4 pt-3 z-10">
        {config.badge && (
          <Badge
            className={cn(
              "text-[10px] font-semibold border",
              plan === Plan.ENTERPRISE
                ? "bg-violet-500/20 text-violet-300 border-violet-500/40"
                : plan === Plan.PROFESSIONAL
                  ? "bg-blue-500/20 text-blue-300 border-blue-500/40"
                  : "bg-rose-500/20 text-rose-300 border-rose-500/40",
            )}
          >
            <Star className="size-2.5 mr-1" />
            {config.badge}
          </Badge>
        )}
        {isCurrent && (
          <Badge className="text-[10px] bg-primary/20 text-primary border border-primary/40 ml-auto">
            Current Plan
          </Badge>
        )}
      </div>

      <CardContent className="pt-10 pb-5 flex-1 flex flex-col gap-5 relative z-10">
        {/* Plan name + price */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                "text-sm font-bold uppercase tracking-wider font-mono",
                colors.text,
              )}
            >
              {config.label}
            </span>
          </div>
          <div className="flex items-end gap-1">
            <span className="text-3xl font-bold text-foreground font-display">
              ${price}
            </span>
            <span className="text-xs text-muted-foreground mb-1">/mo</span>
            {annual && (
              <span className="text-[10px] text-emerald-400 mb-1 ml-1 font-medium">
                billed annually
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Up to{" "}
            <span className="text-foreground font-medium">
              {config.maxDevices === -1
                ? "1M+ devices"
                : `${config.maxDevices.toLocaleString()} devices`}
            </span>
          </p>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed">
          {config.description}
        </p>

        <Separator className="bg-border/50" />

        {/* Key features */}
        <ul className="space-y-2 flex-1">
          {PLAN_KEY_FEATURES[plan].map((feat) => (
            <li key={feat} className="flex items-start gap-2 text-xs">
              <Check className={cn("size-3.5 shrink-0 mt-0.5", colors.text)} />
              <span className="text-muted-foreground">{feat}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="pt-1">
          {isCurrent ? (
            <Button
              variant="outline"
              className="w-full text-xs border-border"
              disabled
              data-ocid={`plan-cta-current-${plan.toLowerCase()}`}
            >
              Current Plan
            </Button>
          ) : isUpgrade ? (
            <Button
              className={cn(
                "w-full text-xs font-semibold",
                isUltra
                  ? "bg-rose-500 hover:bg-rose-600 text-white border-0"
                  : "",
              )}
              variant="default"
              onClick={() => {
                window.location.href = `/billing?upgrade_to=${plan}`;
              }}
              data-ocid={`plan-cta-upgrade-${plan.toLowerCase()}`}
            >
              <Zap className="size-3 mr-1.5" />
              Upgrade to {config.label}
            </Button>
          ) : isDowngrade ? (
            <button
              type="button"
              className="w-full text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-smooth py-2"
              onClick={() => {
                window.location.href = `/billing?upgrade_to=${plan}`;
              }}
              data-ocid={`plan-cta-downgrade-${plan.toLowerCase()}`}
            >
              Downgrade to {config.label}
            </button>
          ) : null}
        </div>
      </CardContent>

      {/* Ultra premium border glow effect */}
      {isUltra && (
        <div className="absolute inset-0 rounded-lg pointer-events-none border border-rose-500/20 bg-gradient-to-b from-rose-500/5 via-transparent to-violet-500/5" />
      )}
    </Card>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-border rounded-lg overflow-hidden glass-card"
      data-ocid="plan-faq-item"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted/20 transition-smooth"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{q}</span>
        {open ? (
          <ChevronUp className="size-4 text-muted-foreground shrink-0 ml-2" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground shrink-0 ml-2" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border/60 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}

// ─── Plans Page ───────────────────────────────────────────────────────────────
export default function Plans() {
  const { currentPlan } = useSubscription();
  const [annual, setAnnual] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        {/* Decorative grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, oklch(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="max-w-6xl mx-auto px-6 py-16 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-medium mb-6">
            <Zap className="size-3" />
            Carrier-Grade Network Management
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground font-display tracking-tight mb-4">
            Choose Your Plan
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-4">
            Scale your network operations from startup ISP to global carrier.
            Transparent pricing, no hidden fees.
          </p>
          {/* Current plan highlight */}
          <div className="inline-flex items-center gap-2 text-xs text-muted-foreground mt-2 bg-muted/40 border border-border rounded-full px-4 py-1.5">
            <span>Currently on</span>
            <Badge
              className={cn(
                "text-[10px] border",
                PLAN_COLORS[currentPlan].badge,
              )}
            >
              {PLAN_CONFIGS[currentPlan].label}
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-20">
        {/* ── Billing Toggle ────────────────────────────────────────────── */}
        <div className="flex justify-center" data-ocid="plan-billing-toggle">
          <div className="inline-flex items-center gap-1 bg-muted/50 border border-border rounded-lg p-1">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={cn(
                "px-5 py-2 rounded-md text-sm font-medium transition-smooth",
                !annual
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={cn(
                "px-5 py-2 rounded-md text-sm font-medium transition-smooth flex items-center gap-2",
                annual
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Annual
              <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 rounded-full px-2 py-0.5">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* ── Plan Cards ───────────────────────────────────────────────── */}
        <section aria-label="Plan comparison cards">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {PLAN_ORDER.map((plan) => (
              <PlanCard
                key={plan}
                plan={plan}
                annual={annual}
                currentPlan={currentPlan}
              />
            ))}
          </div>
        </section>

        {/* ── Feature Matrix ────────────────────────────────────────────── */}
        <section aria-label="Feature comparison matrix">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-foreground font-display">
                Feature Matrix
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Detailed capability comparison across all plans
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs border-border"
              onClick={() => setShowAllFeatures((v) => !v)}
              data-ocid="plan-matrix-toggle"
            >
              {showAllFeatures ? (
                <>
                  <Minus className="size-3 mr-1.5" /> Show Key Features
                </>
              ) : (
                <>
                  <HelpCircle className="size-3 mr-1.5" /> Show All Features
                </>
              )}
            </Button>
          </div>

          <div className="overflow-x-auto noc-scrollbar rounded-lg border border-border glass-card">
            <table className="w-full min-w-[680px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="px-4 py-3.5 text-left text-xs font-medium text-muted-foreground w-48 sm:w-56 sticky left-0 bg-card/95 backdrop-blur-sm z-10">
                    Feature
                  </th>
                  {PLAN_ORDER.map((plan) => {
                    const colors = PLAN_COLORS[plan];
                    const isCurrent = plan === currentPlan;
                    return (
                      <th
                        key={plan}
                        className={cn(
                          "px-4 py-3.5 text-center w-28",
                          isCurrent && "bg-primary/5",
                        )}
                      >
                        <span
                          className={cn(
                            "text-xs font-semibold uppercase tracking-wider font-mono",
                            colors.text,
                          )}
                        >
                          {PLAN_CONFIGS[plan].label}
                        </span>
                        {isCurrent && (
                          <div className="text-[9px] text-primary mt-0.5">
                            ← Current
                          </div>
                        )}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {FEATURE_MATRIX.map((section) => {
                  const visibleRows = showAllFeatures
                    ? section.rows
                    : section.rows.filter((r) => KEY_ROWS.has(r.label));

                  if (visibleRows.length === 0) return null;

                  return (
                    <MatrixSection
                      key={section.category}
                      section={{ ...section, rows: visibleRows }}
                      currentPlan={currentPlan}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section aria-label="Frequently asked questions">
          <h2 className="text-xl font-bold text-foreground font-display mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Everything you need to know about plans, billing, and upgrades.
          </p>
          <div className="space-y-3 max-w-2xl" data-ocid="plan-faq-section">
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <section className="text-center py-10 border-t border-border">
          <h3 className="text-lg font-bold text-foreground font-display mb-2">
            Need a custom quote for your carrier network?
          </h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Our enterprise sales team can tailor a contract for Tier-1 operators
            with multi-million device fleets, SLA guarantees, and white-glove
            onboarding.
          </p>
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:bg-primary/10"
            data-ocid="plan-contact-sales"
          >
            Contact Enterprise Sales
          </Button>
        </section>
      </div>
    </div>
  );
}

// ─── Matrix Section Sub-Component ────────────────────────────────────────────
function MatrixSection({
  section,
  currentPlan,
}: {
  section: MatrixSection;
  currentPlan: Plan;
}) {
  return (
    <>
      <tr className="bg-muted/20 border-y border-border/60">
        <td
          colSpan={5}
          className="px-4 py-2 text-[10px] font-semibold text-muted-foreground uppercase tracking-widest sticky left-0 bg-muted/20"
        >
          {section.category}
        </td>
      </tr>
      {section.rows.map((row, i) => (
        <tr
          key={row.label}
          className={cn(
            "border-b border-border/40 hover:bg-muted/10 transition-colors",
            i % 2 === 0 ? "" : "bg-muted/5",
          )}
        >
          <td className="px-4 py-3 text-xs text-muted-foreground sticky left-0 bg-card/95 backdrop-blur-sm">
            {row.label}
          </td>
          {row.values.map((val, colIdx) => {
            const plan = PLAN_ORDER[colIdx];
            const isCurrent = plan === currentPlan;
            return (
              <td
                key={plan}
                className={cn(
                  "px-4 py-3 text-center",
                  isCurrent && "bg-primary/5",
                )}
              >
                <MatrixCell value={val} />
              </td>
            );
          })}
        </tr>
      ))}
    </>
  );
}
