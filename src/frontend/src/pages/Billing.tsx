import { PlanBadge } from "@/components/subscription/PlanBadge";
import { UsageProgressBar } from "@/components/subscription/UsageProgressBar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PLAN_CONFIGS, PLAN_ORDER } from "@/config/features";
import { MOCK_BILLING_RECORDS } from "@/data/billingMockData";
import { useDeviceQuota, useSubscription } from "@/hooks/useFeature";
import { cn } from "@/lib/utils";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { Plan } from "@/types/subscription";
import {
  AlertTriangle,
  ArrowUpCircle,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
  FileText,
  LockKeyhole,
  MinusCircle,
  PlusCircle,
  RefreshCw,
  Shield,
  TrendingUp,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

function timeAgo(ts: number) {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return formatDate(ts);
}

// Plan-derived retention periods (days)
const DATA_RETENTION: Record<Plan, number> = {
  [Plan.BASIC]: 7,
  [Plan.PROFESSIONAL]: 30,
  [Plan.ENTERPRISE]: 90,
  [Plan.ULTRA]: 365,
};

// Plan-derived workflow counts
const WORKFLOW_COUNTS: Record<Plan, number> = {
  [Plan.BASIC]: 0,
  [Plan.PROFESSIONAL]: 0,
  [Plan.ENTERPRISE]: 12,
  [Plan.ULTRA]: 47,
};

// Plan-derived alert log counts
const ALERT_LOG_COUNTS: Record<Plan, number> = {
  [Plan.BASIC]: 500,
  [Plan.PROFESSIONAL]: 5000,
  [Plan.ENTERPRISE]: 50000,
  [Plan.ULTRA]: 1000000,
};

// ─── Toast ────────────────────────────────────────────────────────────────────
interface ToastMsg {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastMsg;
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg text-sm backdrop-blur",
        "animate-in slide-in-from-bottom-4 fade-in duration-300",
        toast.type === "success" &&
          "bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300",
        toast.type === "error" &&
          "bg-rose-500/10 border-rose-500/30 text-rose-700 dark:text-rose-300",
        toast.type === "info" && "bg-primary/10 border-primary/30 text-primary",
      )}
    >
      {toast.type === "success" && <CheckCircle2 className="size-4 shrink-0" />}
      {toast.type === "error" && <AlertTriangle className="size-4 shrink-0" />}
      {toast.type === "info" && <Zap className="size-4 shrink-0" />}
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}

// ─── Change Plan Modal ────────────────────────────────────────────────────────
interface ChangePlanModalProps {
  fromPlan: Plan;
  toPlan: Plan;
  onConfirm: () => void;
  onCancel: () => void;
}

function ChangePlanModal({
  fromPlan,
  toPlan,
  onConfirm,
  onCancel,
}: ChangePlanModalProps) {
  const fromConfig = PLAN_CONFIGS[fromPlan];
  const toConfig = PLAN_CONFIGS[toPlan];
  const fromFeatures = new Set(fromConfig.features);
  const toFeatures = new Set(toConfig.features);

  const gained = toConfig.features.filter((f) => !fromFeatures.has(f));
  const lost = fromConfig.features.filter((f) => !toFeatures.has(f));
  const isUpgrade = PLAN_ORDER.indexOf(toPlan) > PLAN_ORDER.indexOf(fromPlan);

  const diff = toConfig.monthlyPrice - fromConfig.monthlyPrice;
  const prorated = Math.round((diff / 30) * 15); // ~15 days remaining mock

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onCancel]);

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0"
      aria-labelledby="modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Escape" && onCancel()}
        aria-label="Close dialog"
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <h2
            id="modal-title"
            className="text-base font-semibold text-foreground"
          >
            Confirm Plan Change
          </h2>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg p-1 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Plan diff */}
        <div className="px-6 py-5 space-y-5">
          {/* From → To */}
          <div className="flex items-center gap-4 rounded-xl bg-muted/40 border border-border p-4">
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-1">Current</p>
              <PlanBadge plan={fromPlan} size="lg" />
              <p className="text-lg font-bold text-foreground mt-1">
                {formatCurrency(fromConfig.monthlyPrice)}
                <span className="text-xs text-muted-foreground font-normal">
                  /mo
                </span>
              </p>
            </div>
            <ArrowUpCircle
              className={cn(
                "size-6 shrink-0",
                isUpgrade ? "text-primary" : "text-muted-foreground rotate-180",
              )}
            />
            <div className="flex-1 text-center">
              <p className="text-xs text-muted-foreground mb-1">New</p>
              <PlanBadge plan={toPlan} size="lg" />
              <p className="text-lg font-bold text-foreground mt-1">
                {formatCurrency(toConfig.monthlyPrice)}
                <span className="text-xs text-muted-foreground font-normal">
                  /mo
                </span>
              </p>
            </div>
          </div>

          {/* Cost impact */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Billing Impact
            </p>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Monthly cost change</span>
              <span
                className={cn(
                  "font-semibold tabular-nums",
                  diff > 0
                    ? "text-amber-600 dark:text-amber-400"
                    : "text-emerald-600 dark:text-emerald-400",
                )}
              >
                {diff > 0 ? "+" : ""}
                {formatCurrency(diff)} / mo
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Prorated charge today (~15 days)
              </span>
              <span className="font-semibold tabular-nums text-foreground">
                {prorated > 0 ? formatCurrency(prorated) : "Credit applied"}
              </span>
            </div>
            <p className="text-[10px] text-muted-foreground pt-1 border-t border-border">
              Proration calculated on remaining billing cycle. Final charge may
              vary.
            </p>
          </div>

          {/* Features gained / lost */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gained.length > 0 && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-2">
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <PlusCircle className="size-3" /> Features Gained
                </p>
                <ul className="space-y-1">
                  {gained.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-foreground flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="size-3 text-emerald-500 shrink-0" />
                      {f.replace(/_/g, " ").toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {lost.length > 0 && (
              <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-3 space-y-2">
                <p className="text-xs font-semibold text-rose-700 dark:text-rose-400 flex items-center gap-1.5">
                  <MinusCircle className="size-3" /> Features Lost
                </p>
                <ul className="space-y-1">
                  {lost.map((f) => (
                    <li
                      key={f}
                      className="text-xs text-foreground flex items-center gap-1.5"
                    >
                      <X className="size-3 text-rose-500 shrink-0" />
                      {f.replace(/_/g, " ").toLowerCase()}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 pb-5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            data-ocid="modal-cancel-btn"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={onConfirm}
            data-ocid="modal-confirm-btn"
            className="gap-2"
          >
            <RefreshCw className="size-3.5" />
            Confirm {isUpgrade ? "Upgrade" : "Downgrade"}
          </Button>
        </div>
      </div>
    </dialog>
  );
}

// ─── Payment Method Modal ──────────────────────────────────────────────────────
function PaymentMethodModal({ onClose }: { onClose: () => void }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-transparent w-full h-full max-w-none m-0"
      aria-labelledby="payment-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-background/80 backdrop-blur-sm cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        aria-label="Close dialog"
      />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card shadow-2xl">
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <h2
            id="payment-modal-title"
            className="text-base font-semibold text-foreground flex items-center gap-2"
          >
            <CreditCard className="size-4 text-primary" />
            Update Payment Method
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </div>

        {saved ? (
          <div className="px-6 py-8 text-center space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle2 className="size-6 text-emerald-500" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              Payment method updated
            </p>
            <p className="text-xs text-muted-foreground">
              Your card ending in 4242 has been saved.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={onClose}
              className="mt-2"
            >
              Close
            </Button>
          </div>
        ) : (
          <form
            className="px-6 py-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
          >
            <div className="space-y-1.5">
              <label
                htmlFor="pm-card-number"
                className="text-xs font-medium text-muted-foreground"
              >
                Card number
              </label>
              <input
                id="pm-card-number"
                type="text"
                defaultValue="4242 4242 4242 4242"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="payment-card-number"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label
                  htmlFor="pm-card-expiry"
                  className="text-xs font-medium text-muted-foreground"
                >
                  Expiry
                </label>
                <input
                  id="pm-card-expiry"
                  type="text"
                  defaultValue="12 / 28"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="payment-card-expiry"
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="pm-card-cvc"
                  className="text-xs font-medium text-muted-foreground"
                >
                  CVC
                </label>
                <input
                  id="pm-card-cvc"
                  type="text"
                  defaultValue="•••"
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  data-ocid="payment-card-cvc"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="pm-card-name"
                className="text-xs font-medium text-muted-foreground"
              >
                Cardholder name
              </label>
              <input
                id="pm-card-name"
                type="text"
                defaultValue="FiberNMS Admin"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                data-ocid="payment-card-name"
              />
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/40 border border-border px-3 py-2">
              <Shield className="size-3.5 text-muted-foreground shrink-0" />
              <p className="text-[10px] text-muted-foreground">
                Secured by 256-bit TLS encryption. Card data handled by Stripe.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-1">
              <Button type="button" variant="ghost" size="sm" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="gap-2"
                data-ocid="payment-save-btn"
              >
                <CreditCard className="size-3.5" /> Save Card
              </Button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sublabel,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sublabel?: string;
}) {
  return (
    <Card className="glass-card border-border">
      <CardContent className="p-4 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20">
          <Icon className="size-4 text-primary" />
        </div>
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground truncate">{label}</p>
          <p className="text-lg font-bold text-foreground font-display leading-tight">
            {value}
          </p>
          {sublabel && (
            <p className="text-[10px] text-muted-foreground/70">{sublabel}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Billing() {
  const sub = useSubscription();
  const quota = useDeviceQuota();
  const setCurrentPlan = useSubscriptionStore((s) => s.setCurrentPlan);
  const currentConfig = PLAN_CONFIGS[sub.currentPlan];

  // Read ?upgrade_to=PLAN from URL
  const urlUpgradeTo = new URLSearchParams(window.location.search).get(
    "upgrade_to",
  ) as Plan | null;
  const validUpgradePlan =
    urlUpgradeTo && PLAN_ORDER.includes(urlUpgradeTo) ? urlUpgradeTo : null;

  const [selectedPlan, setSelectedPlan] = useState<Plan>(
    validUpgradePlan ?? sub.currentPlan,
  );
  const [showChangePlanModal, setShowChangePlanModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastIdRef = useRef(0);

  // Capture initial URL param and current plan so the mount effect is stable
  const initUpgradePlanRef = useRef(validUpgradePlan);
  const initCurrentPlanRef = useRef(sub.currentPlan);

  // Auto-open modal if URL has upgrade_to param — runs once on mount only
  useEffect(() => {
    const initPlan = initUpgradePlanRef.current;
    const initCurrent = initCurrentPlanRef.current;
    if (initPlan && initPlan !== initCurrent) {
      setShowChangePlanModal(true);
    }
  }, []);

  const addToast = (message: string, type: ToastMsg["type"] = "success") => {
    const id = ++toastIdRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const apiPct =
    sub.apiQuota > 0 ? Math.min(100, (sub.apiUsed / sub.apiQuota) * 100) : 0;

  const isCurrentPlanSelected = selectedPlan === sub.currentPlan;
  const isUpgrade =
    PLAN_ORDER.indexOf(selectedPlan) > PLAN_ORDER.indexOf(sub.currentPlan);

  const handleConfirmPlanChange = () => {
    const prevPlan = sub.currentPlan;
    setCurrentPlan(selectedPlan);
    setShowChangePlanModal(false);
    const action =
      PLAN_ORDER.indexOf(selectedPlan) > PLAN_ORDER.indexOf(prevPlan)
        ? "upgraded"
        : "downgraded";
    addToast(
      `Plan ${action} to ${PLAN_CONFIGS[selectedPlan].label} successfully.`,
      "success",
    );
    // Clear URL param
    if (window.history.replaceState) {
      window.history.replaceState({}, "", "/billing");
    }
  };

  const lastBillingRecord = MOCK_BILLING_RECORDS.find(
    (r) => r.status === "paid",
  );

  return (
    <>
      {/* Toast region */}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2 w-80"
        aria-live="polite"
        aria-atomic="false"
      >
        {toasts.map((t) => (
          <Toast key={t.id} toast={t} onDismiss={() => dismissToast(t.id)} />
        ))}
      </div>

      {/* Modals */}
      {showChangePlanModal && !isCurrentPlanSelected && (
        <ChangePlanModal
          fromPlan={sub.currentPlan}
          toPlan={selectedPlan}
          onConfirm={handleConfirmPlanChange}
          onCancel={() => setShowChangePlanModal(false)}
        />
      )}
      {showPaymentModal && (
        <PaymentMethodModal onClose={() => setShowPaymentModal(false)} />
      )}

      <div className="p-6 space-y-8 max-w-6xl mx-auto">
        {/* ── Hero Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-foreground font-display">
                Billing &amp; Subscription
              </h1>
              <PlanBadge plan={sub.currentPlan} size="lg" />
            </div>
            <p className="text-muted-foreground text-sm">
              Manage your plan, usage, and billing history for{" "}
              <span className="text-foreground font-medium">
                {sub.organizationName}
              </span>
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 gap-2 self-start"
            onClick={() => setShowPaymentModal(true)}
            data-ocid="billing-update-payment"
          >
            <CreditCard className="size-3.5" />
            Update Payment Method
          </Button>
        </div>

        {/* ── Trial Banner (conditional) ── */}
        {sub.trialDaysLeft > 0 && (
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 rounded-xl border border-amber-500/30 bg-amber-500/8 px-5 py-4"
            data-ocid="billing-trial-banner"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/15 border border-amber-500/30">
                <Clock className="size-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Free trial — {sub.trialDaysLeft} day
                  {sub.trialDaysLeft !== 1 ? "s" : ""} remaining
                </p>
                <p className="text-xs text-muted-foreground">
                  Your trial ends on {formatDate(sub.expiryDate)}. Convert to a
                  paid plan to retain all your data and configurations.
                </p>
              </div>
            </div>
            <Button
              size="sm"
              className="shrink-0 gap-2"
              onClick={() => {
                setSelectedPlan(Plan.PROFESSIONAL);
                setShowChangePlanModal(true);
              }}
              data-ocid="billing-convert-trial"
            >
              <ArrowUpCircle className="size-3.5" />
              Convert to Paid
            </Button>
          </div>
        )}

        {/* ── Current Subscription + License ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan Card */}
          <Card
            className="glass-card border-border lg:col-span-2"
            data-ocid="billing-current-plan"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-foreground flex items-center gap-2">
                  <Building2 className="size-4 text-primary" />
                  Current Subscription
                </CardTitle>
                <div className="flex items-center gap-2">
                  {sub.isExpired ? (
                    <Badge
                      variant="outline"
                      className="text-xs border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-400"
                    >
                      Expired
                    </Badge>
                  ) : sub.trialDaysLeft > 0 ? (
                    <Badge
                      variant="outline"
                      className="text-xs border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                    >
                      Trial
                    </Badge>
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    >
                      Active
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold text-foreground font-display">
                  {formatCurrency(currentConfig.monthlyPrice)}
                </span>
                <span className="text-muted-foreground text-sm mb-1">
                  /month
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {currentConfig.description}
              </p>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <Calendar className="size-3.5 shrink-0" />
                  <span>
                    {sub.isExpired ? "Expired" : "Renews"}{" "}
                    <span
                      className={cn(
                        "font-medium",
                        sub.isExpiringSoon
                          ? "text-amber-600 dark:text-amber-400"
                          : sub.isExpired
                            ? "text-rose-600 dark:text-rose-400"
                            : "text-foreground",
                      )}
                    >
                      {formatDate(sub.expiryDate)}
                    </span>
                  </span>
                </div>
                {sub.isExpiringSoon && !sub.isExpired && (
                  <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400 text-xs">
                    <AlertTriangle className="size-3 shrink-0" />
                    Expires in {sub.daysUntilExpiry} days
                  </div>
                )}
              </div>

              <Separator className="bg-border/60" />

              {/* Device + API Quota */}
              <div className="space-y-4">
                <UsageProgressBar
                  used={quota.used}
                  limit={quota.limit}
                  label="Devices"
                  data-ocid="billing-device-quota"
                />
                <UsageProgressBar
                  used={sub.apiUsed}
                  limit={sub.apiQuota}
                  label="API Calls / Month"
                  data-ocid="billing-api-quota"
                />
                {apiPct > 85 && (
                  <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="size-3 shrink-0" />
                    API quota nearing limit — consider upgrading your plan
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* License Info */}
          <Card
            className="glass-card border-border"
            data-ocid="billing-license-card"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-base text-foreground flex items-center gap-2">
                <Shield className="size-4 text-primary" />
                License
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/40 border border-border p-3">
                <p className="text-xs text-muted-foreground mb-1">
                  License Key
                </p>
                <p className="text-sm font-mono text-foreground truncate">
                  {sub.licenseKey}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {sub.isLicenseValid ? (
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle className="size-4 text-rose-500 shrink-0" />
                )}
                <span className="text-foreground">
                  {sub.isLicenseValid ? "License valid" : "License invalid"}
                </span>
              </div>
              <div className="text-xs text-muted-foreground space-y-1.5">
                <div className="flex justify-between">
                  <span>Tenant ID</span>
                  <span className="text-foreground font-mono">
                    {sub.tenantId.slice(0, 16)}…
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max Devices</span>
                  <span className="text-foreground font-semibold">
                    {currentConfig.maxDevices === -1
                      ? "Unlimited"
                      : currentConfig.maxDevices.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Max API Rate</span>
                  <span className="text-foreground font-semibold">
                    {sub.apiQuota.toLocaleString()} / mo
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>SLA Tier</span>
                  <span className="text-foreground font-semibold">
                    {sub.currentPlan === Plan.ULTRA
                      ? "99.999%"
                      : sub.currentPlan === Plan.ENTERPRISE
                        ? "99.99%"
                        : sub.currentPlan === Plan.PROFESSIONAL
                          ? "99.9%"
                          : "99.5%"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Usage Stats Row ── */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
          data-ocid="billing-usage-stats"
        >
          <StatCard
            icon={Zap}
            label="Workflows Deployed"
            value={WORKFLOW_COUNTS[sub.currentPlan].toLocaleString()}
            sublabel="Active automations"
          />
          <StatCard
            icon={AlertTriangle}
            label="Alert Logs Retained"
            value={ALERT_LOG_COUNTS[sub.currentPlan].toLocaleString()}
            sublabel="Events on record"
          />
          <StatCard
            icon={Clock}
            label="Data Retention Period"
            value={`${DATA_RETENTION[sub.currentPlan]} days`}
            sublabel="Historical data window"
          />
          <StatCard
            icon={Calendar}
            label="Last Billing Date"
            value={lastBillingRecord ? formatDate(lastBillingRecord.date) : "—"}
            sublabel={
              lastBillingRecord
                ? formatCurrency(lastBillingRecord.amount)
                : undefined
            }
          />
        </div>

        {/* ── Upgrade / Downgrade Section ── */}
        <div data-ocid="billing-plan-selector">
          <h2 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
            <ArrowUpCircle className="size-5 text-primary" />
            Change Plan
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            Select a target plan and review the cost impact before confirming.
          </p>

          {/* Plan cards (radio group) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {PLAN_ORDER.map((plan) => {
              const config = PLAN_CONFIGS[plan];
              const isCurrent = plan === sub.currentPlan;
              const isSelected = plan === selectedPlan;
              const isUpgradePlan =
                PLAN_ORDER.indexOf(plan) > PLAN_ORDER.indexOf(sub.currentPlan);

              return (
                <button
                  key={plan}
                  type="button"
                  onClick={() => setSelectedPlan(plan)}
                  aria-pressed={isSelected}
                  data-ocid={`billing-plan-option-${plan.toLowerCase()}`}
                  className={cn(
                    "glass-card relative flex flex-col rounded-xl border text-left transition-all duration-200",
                    "hover:border-primary/40 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isSelected
                      ? "border-primary/60 shadow-noc-elevated ring-1 ring-primary/30"
                      : isCurrent
                        ? "border-primary/30"
                        : "border-border",
                  )}
                >
                  {config.badge && !isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="text-[10px] bg-primary text-primary-foreground border-0 shadow-md px-2 py-0.5">
                        {config.badge}
                      </Badge>
                    </div>
                  )}
                  {isCurrent && (
                    <div className="absolute -top-3 right-3">
                      <Badge
                        variant="outline"
                        className="text-[10px] border-border bg-card"
                      >
                        Current
                      </Badge>
                    </div>
                  )}
                  <div className="p-4 flex-1 space-y-3 mt-1">
                    <PlanBadge plan={plan} size="sm" />
                    <div>
                      <div className="flex items-end gap-1">
                        <span className="text-2xl font-bold text-foreground font-display">
                          {formatCurrency(config.monthlyPrice)}
                        </span>
                        <span className="text-xs text-muted-foreground mb-0.5">
                          /mo
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {config.maxDevices === -1
                          ? "Unlimited devices"
                          : `Up to ${config.maxDevices.toLocaleString()} devices`}
                      </p>
                    </div>
                    <ul className="space-y-1.5">
                      {config.features.slice(0, 4).map((f) => (
                        <li
                          key={f}
                          className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                        >
                          <CheckCircle2 className="size-2.5 text-emerald-500 shrink-0" />
                          <span className="capitalize truncate">
                            {f.replace(/_/g, " ").toLowerCase()}
                          </span>
                        </li>
                      ))}
                      {config.features.length > 4 && (
                        <li className="text-[10px] text-muted-foreground/60 pl-4">
                          +{config.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>
                  <div className="px-4 pb-4">
                    {isSelected ? (
                      <div
                        className={cn(
                          "w-full rounded-lg py-1.5 text-xs font-medium text-center flex items-center justify-center gap-1.5",
                          isCurrent
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary/15 text-primary border border-primary/30",
                        )}
                      >
                        {isCurrent ? (
                          "Current Plan"
                        ) : isUpgradePlan ? (
                          <>
                            <ArrowUpCircle className="size-3" /> Selected for
                            Upgrade
                          </>
                        ) : (
                          <>
                            <LockKeyhole className="size-3" /> Selected for
                            Downgrade
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="w-full rounded-lg py-1.5 text-xs font-medium text-center text-muted-foreground border border-transparent hover:border-border transition-colors">
                        {isCurrent ? "Current Plan" : "Select"}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cost comparison + CTA */}
          {!isCurrentPlanSelected && (
            <div className="rounded-xl border border-border bg-muted/30 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">
                    Switching from{" "}
                    <PlanBadge
                      plan={sub.currentPlan}
                      size="sm"
                      className="mx-1"
                    />
                    to{" "}
                    <PlanBadge plan={selectedPlan} size="sm" className="mx-1" />
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Current:{" "}
                      <span className="text-foreground font-semibold tabular-nums">
                        {formatCurrency(currentConfig.monthlyPrice)}/mo
                      </span>
                    </span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-muted-foreground">
                      New:{" "}
                      <span
                        className={cn(
                          "font-semibold tabular-nums",
                          isUpgrade
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-emerald-600 dark:text-emerald-400",
                        )}
                      >
                        {formatCurrency(
                          PLAN_CONFIGS[selectedPlan].monthlyPrice,
                        )}
                        /mo
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Prorated charge for remaining billing cycle will apply. See
                    exact amount in confirmation.
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={isUpgrade ? "default" : "outline"}
                  className="shrink-0 gap-2"
                  onClick={() => setShowChangePlanModal(true)}
                  data-ocid="billing-change-plan-btn"
                >
                  {isUpgrade ? (
                    <>
                      <ArrowUpCircle className="size-3.5" /> Upgrade Plan
                    </>
                  ) : (
                    <>
                      <TrendingUp className="size-3.5 rotate-180" /> Downgrade
                      Plan
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* ── Billing History ── */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <FileText className="size-5 text-primary" />
            Billing History
          </h2>
          <Card
            className="glass-card border-border"
            data-ocid="billing-history-table"
          >
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="px-4 py-3 text-left font-medium">Date</th>
                      <th className="px-4 py-3 text-left font-medium">
                        Description
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Status
                      </th>
                      <th className="px-4 py-3 text-center font-medium">
                        Invoice
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_BILLING_RECORDS.map((record, i) => (
                      <tr
                        key={record.id}
                        className={cn(
                          "border-b border-border/60 hover:bg-muted/20 transition-colors",
                          i % 2 !== 0 ? "bg-muted/10" : "",
                        )}
                        data-ocid={`billing-record-${record.id}`}
                      >
                        <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                          {formatDate(record.date)}
                        </td>
                        <td className="px-4 py-3 text-foreground max-w-[220px] truncate">
                          {record.description}
                        </td>
                        <td className="px-4 py-3 text-right font-mono font-semibold text-foreground tabular-nums whitespace-nowrap">
                          {formatCurrency(record.amount)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs border capitalize",
                              record.status === "paid" &&
                                "text-emerald-600 border-emerald-500/30 bg-emerald-500/10 dark:text-emerald-400",
                              record.status === "pending" &&
                                "text-amber-600 border-amber-500/30 bg-amber-500/10 dark:text-amber-400",
                              record.status === "failed" &&
                                "text-rose-600 border-rose-500/30 bg-rose-500/10 dark:text-rose-400",
                            )}
                          >
                            {record.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {record.status === "paid" ? (
                            <button
                              type="button"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline transition-smooth"
                              onClick={() =>
                                addToast(
                                  `Invoice ${record.id}.pdf downloaded.`,
                                  "info",
                                )
                              }
                              data-ocid={`billing-invoice-download-${record.id}`}
                              aria-label={`Download invoice for ${record.description}`}
                            >
                              <Download className="size-3" />
                              PDF
                            </button>
                          ) : (
                            <span className="text-xs text-muted-foreground/50">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Payment Method ── */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <CreditCard className="size-5 text-primary" />
            Payment Method
          </h2>
          <Card
            className="glass-card border-border"
            data-ocid="billing-payment-method"
          >
            <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex h-12 w-16 items-center justify-center rounded-lg border border-border bg-muted/40">
                  <span className="text-lg font-bold text-foreground">
                    VISA
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Visa ending in 4242
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires 12/2028 · Added{" "}
                    {timeAgo(Date.now() - 60 * 86400000)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ml-auto sm:ml-0"
                >
                  Default
                </Badge>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="shrink-0 gap-2"
                onClick={() => setShowPaymentModal(true)}
                data-ocid="billing-open-payment-modal"
              >
                <RefreshCw className="size-3.5" />
                Update Card
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
