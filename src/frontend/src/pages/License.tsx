import { PlanBadge } from "@/components/subscription/PlanBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { FEATURE_PLAN_MAP, PLAN_CONFIGS } from "@/config/features";
import { useSubscription } from "@/hooks/useFeature";
import { cn } from "@/lib/utils";
import { FeatureFlag, Plan } from "@/types/subscription";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardCopy,
  Clock,
  History,
  Key,
  Laptop2,
  Loader2,
  Lock,
  RefreshCw,
  Shield,
  ShieldCheck,
  WifiOff,
  XCircle,
} from "lucide-react";
import { useCallback, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface LicenseHistoryEntry {
  id: string;
  activatedAt: string;
  plan: Plan;
  expiryDate: string;
  status: "Active" | "Expired" | "Revoked";
}

// ─── Constants ────────────────────────────────────────────────────────────────
const MOCK_HISTORY: LicenseHistoryEntry[] = [
  {
    id: "FNMS-ENT-2024-XPRD-779ACB",
    activatedAt: "Jan 12, 2024",
    plan: Plan.ENTERPRISE,
    expiryDate: "Jan 11, 2025",
    status: "Expired",
  },
  {
    id: "FNMS-PRO-2023-DEMO-449ACB",
    activatedAt: "Jun 02, 2023",
    plan: Plan.PROFESSIONAL,
    expiryDate: "Jun 01, 2024",
    status: "Revoked",
  },
  {
    id: "FNMS-ENT-2025-XXXX-XXXXXX",
    activatedAt: "Jan 14, 2025",
    plan: Plan.ENTERPRISE,
    expiryDate: "Jan 13, 2026",
    status: "Expired",
  },
];

const FEATURE_LABELS: Record<FeatureFlag, string> = {
  [FeatureFlag.DEVICE_CLUSTERING]: "Device Clustering",
  [FeatureFlag.GIS_ADVANCED]: "Advanced GIS Map Tools",
  [FeatureFlag.HISTORICAL_METRICS]: "Historical Metrics (30 days)",
  [FeatureFlag.ADVANCED_ALERTING]: "Advanced Alerting",
  [FeatureFlag.TOPOLOGY_VISUALIZATION]: "Full Topology Visualization",
  [FeatureFlag.REAL_TIME_MONITORING]: "Real-Time Monitoring (WebSockets)",
  [FeatureFlag.SLA_DASHBOARD]: "SLA & Service Assurance Dashboard",
  [FeatureFlag.PREDICTIVE_FAULTS]: "Predictive Fault Intelligence",
  [FeatureFlag.AUDIT_LOGS]: "Audit Logs & Compliance",
  [FeatureFlag.CAPACITY_PLANNING]: "Capacity Planning & Forecasting",
  [FeatureFlag.WORKFLOW_AUTOMATION]: "Workflow Automation Engine",
  [FeatureFlag.AI_INSIGHTS]: "AI Copilot & Insights",
  [FeatureFlag.API_ACCESS]: "REST/GraphQL API Access",
  [FeatureFlag.INTEGRATIONS]: "OSS/BSS Integrations",
  [FeatureFlag.WHITE_LABELING]: "White-Labeling & Custom Domain",
  [FeatureFlag.MULTI_TENANT]: "Multi-Tenant Management",
  [FeatureFlag.PLUGIN_SYSTEM]: "Plugin Marketplace",
  [FeatureFlag.DIGITAL_TWIN]: "Digital Twin Simulation",
};

// ─── Mock Validation Logic ────────────────────────────────────────────────────
type ValidationResult =
  | { valid: true; plan: Plan; orgName: string; expiryDate: number }
  | { valid: false; reason: string };

function mockValidate(key: string): ValidationResult {
  const trimmed = key.trim().toUpperCase();
  if (trimmed.startsWith("ULTRA-") || trimmed === "FNMS-ULTRA-2026-DEMO") {
    return {
      valid: true,
      plan: Plan.ULTRA,
      orgName: "Global Carrier Corp — Tier-1",
      expiryDate: Date.now() + 365 * 24 * 60 * 60 * 1000,
    };
  }
  if (trimmed.startsWith("ENT-") || trimmed === "FNMS-ENT-2026-DEMO-XXXXXX") {
    return {
      valid: true,
      plan: Plan.ENTERPRISE,
      orgName: "FiberNMS Demo — Tier-2 Telecom",
      expiryDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    };
  }
  if (trimmed.startsWith("PRO-") || trimmed === "FNMS-PRO-2026-DEMO") {
    return {
      valid: true,
      plan: Plan.PROFESSIONAL,
      orgName: "RegionalNet ISP",
      expiryDate: Date.now() + 90 * 24 * 60 * 60 * 1000,
    };
  }
  if (trimmed.startsWith("BASIC-") || trimmed === "FNMS-BASIC-2026-DEMO") {
    return {
      valid: true,
      plan: Plan.BASIC,
      orgName: "StarterISP LLC",
      expiryDate: Date.now() + 180 * 24 * 60 * 60 * 1000,
    };
  }
  return {
    valid: false,
    reason: "License key not recognized or has been revoked.",
  };
}

// ─── LicenseExpiryBanner (exported for global use) ───────────────────────────
export function LicenseExpiryBanner() {
  const { isLicenseValid, daysUntilExpiry, isExpired } = useSubscription();

  if (!isLicenseValid || isExpired) {
    return (
      <div
        className="flex items-center gap-3 px-4 py-2.5 bg-destructive/10 border border-destructive/30 rounded-lg text-sm"
        role="alert"
        data-ocid="license-expiry-banner-expired"
      >
        <XCircle
          className="size-4 shrink-0 text-destructive"
          aria-hidden="true"
        />
        <span className="text-destructive font-medium">
          Your FiberNMS license has expired or is invalid. Some features may be
          restricted.
        </span>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto shrink-0 border-destructive/40 text-destructive hover:bg-destructive/10"
          onClick={() => {
            window.location.href = "/settings/license";
          }}
        >
          Activate License
        </Button>
      </div>
    );
  }

  if (daysUntilExpiry <= 30) {
    return (
      <div
        className="flex items-center gap-3 px-4 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm"
        role="alert"
        data-ocid="license-expiry-banner-warning"
      >
        <AlertTriangle
          className="size-4 shrink-0 text-amber-500"
          aria-hidden="true"
        />
        <span className="text-amber-600 dark:text-amber-400 font-medium">
          Your license expires in{" "}
          <strong>
            {daysUntilExpiry} day{daysUntilExpiry !== 1 ? "s" : ""}
          </strong>
          . Renew now to avoid service interruption.
        </span>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto shrink-0 border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10"
        >
          <RefreshCw className="size-3 mr-1.5" aria-hidden="true" />
          Renew License
        </Button>
      </div>
    );
  }

  return null;
}

// ─── Status Card ──────────────────────────────────────────────────────────────
function LicenseStatusCard() {
  const {
    isLicenseValid,
    licenseKey,
    currentPlan,
    organizationName,
    expiryDate,
    daysUntilExpiry,
    isExpired,
  } = useSubscription();

  const totalDays = 365;
  const progressPct = Math.min(
    100,
    Math.max(0, (daysUntilExpiry / totalDays) * 100),
  );
  const progressColor =
    daysUntilExpiry <= 7
      ? "bg-destructive"
      : daysUntilExpiry <= 30
        ? "bg-amber-500"
        : "bg-emerald-500";

  if (!isLicenseValid || isExpired) {
    return (
      <div
        className="flex items-start gap-4 p-5 rounded-xl border border-destructive/30 bg-destructive/5"
        data-ocid="license-status-invalid"
      >
        <div className="p-2.5 rounded-lg bg-destructive/15 border border-destructive/20">
          <XCircle className="size-5 text-destructive" aria-hidden="true" />
        </div>
        <div>
          <p className="font-semibold text-destructive text-sm">
            License Expired or Invalid
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Enter a valid license key below to restore full access to FiberNMS
            features.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col gap-5 p-5 rounded-xl border border-emerald-500/30 bg-emerald-500/5"
      data-ocid="license-status-valid"
    >
      {/* Header row */}
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg bg-emerald-500/15 border border-emerald-500/20">
          <ShieldCheck
            className="size-5 text-emerald-600 dark:text-emerald-400"
            aria-hidden="true"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">
            License Active
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {organizationName}
          </p>
        </div>
        <PlanBadge plan={currentPlan} size="md" />
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">License ID</p>
          <p className="font-mono text-xs text-foreground truncate">
            {licenseKey}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Plan Tier</p>
          <p className="text-foreground font-medium text-xs">
            {PLAN_CONFIGS[currentPlan].label}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Expiry Date</p>
          <p className="text-foreground font-medium text-xs">
            {new Date(expiryDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Max Devices</p>
          <p className="text-foreground font-medium text-xs">
            {PLAN_CONFIGS[currentPlan].maxDevices === -1
              ? "Unlimited"
              : PLAN_CONFIGS[currentPlan].maxDevices.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Days remaining progress */}
      <div>
        <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
          <span>Days remaining</span>
          <span
            className={cn(
              daysUntilExpiry <= 30 ? "text-amber-500 font-semibold" : "",
            )}
          >
            {daysUntilExpiry}d
          </span>
        </div>
        <div
          className="h-1.5 rounded-full bg-muted overflow-hidden"
          role="progressbar"
          tabIndex={-1}
          aria-valuenow={daysUntilExpiry}
          aria-valuemin={0}
          aria-valuemax={totalDays}
          aria-label={`${daysUntilExpiry} days remaining`}
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500",
              progressColor,
            )}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── License Input Form ───────────────────────────────────────────────────────
function LicenseKeyForm() {
  const { validateLicense } = useSubscription();
  const [keyInput, setKeyInput] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleValidate = useCallback(async () => {
    if (!keyInput.trim()) return;
    setStatus("loading");
    setErrorMsg("");

    await new Promise((r) => setTimeout(r, 500));

    const result = mockValidate(keyInput);
    if (result.valid) {
      validateLicense(keyInput.trim());
      setStatus("success");
      setKeyInput("");
    } else {
      setStatus("error");
      setErrorMsg(result.reason);
    }
  }, [keyInput, validateLicense]);

  return (
    <div className="space-y-3" data-ocid="license-key-form">
      <Textarea
        value={keyInput}
        onChange={(e) => {
          setKeyInput(e.target.value);
          if (status !== "idle") setStatus("idle");
        }}
        placeholder={
          "Enter your license key, e.g.\nENT-FIBERNMS-2026-XXXXXXXXXX-XXXX"
        }
        rows={3}
        className="font-mono text-xs resize-none bg-background border-input placeholder:text-muted-foreground/50 focus-visible:ring-primary"
        aria-label="License key input"
        data-ocid="license-key-input"
      />

      {status === "error" && (
        <div className="flex items-center gap-2 text-xs text-destructive">
          <XCircle className="size-3.5 shrink-0" aria-hidden="true" />
          <span>{errorMsg}</span>
        </div>
      )}
      {status === "success" && (
        <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
          <span>License activated successfully.</span>
        </div>
      )}

      <Button
        onClick={handleValidate}
        disabled={!keyInput.trim() || status === "loading"}
        className="w-full"
        data-ocid="license-validate-btn"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="size-4 mr-2 animate-spin" aria-hidden="true" />
            Validating…
          </>
        ) : (
          <>
            <Key className="size-4 mr-2" aria-hidden="true" />
            Validate &amp; Activate License
          </>
        )}
      </Button>

      <p className="text-xs text-muted-foreground">
        Try demo keys:{" "}
        <button
          type="button"
          className="text-primary underline underline-offset-2 hover:no-underline"
          onClick={() => setKeyInput("ENT-FIBERNMS-2026-DEMO")}
        >
          ENT-…
        </button>
        ,{" "}
        <button
          type="button"
          className="text-primary underline underline-offset-2 hover:no-underline"
          onClick={() => setKeyInput("ULTRA-FIBERNMS-2026-GLOBAL")}
        >
          ULTRA-…
        </button>
        ,{" "}
        <button
          type="button"
          className="text-primary underline underline-offset-2 hover:no-underline"
          onClick={() => setKeyInput("PRO-FIBERNMS-2026-REGIONAL")}
        >
          PRO-…
        </button>
      </p>
    </div>
  );
}

// ─── Features Table ───────────────────────────────────────────────────────────
function LicenseFeaturesTable() {
  const { currentPlan } = useSubscription();
  const enabledFeatures = new Set(PLAN_CONFIGS[currentPlan].features);
  const allFeatures = Object.values(FeatureFlag);

  return (
    <div
      className="overflow-x-auto rounded-lg border border-border"
      data-ocid="license-features-table"
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-xs text-muted-foreground tracking-wide uppercase">
              Feature
            </th>
            <th className="text-center px-4 py-3 font-semibold text-xs text-muted-foreground tracking-wide uppercase">
              Access
            </th>
            <th className="text-left px-4 py-3 font-semibold text-xs text-muted-foreground tracking-wide uppercase hidden sm:table-cell">
              Min. Plan
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {allFeatures.map((flag) => {
            const enabled = enabledFeatures.has(flag);
            const minPlan = FEATURE_PLAN_MAP[flag][0];
            return (
              <tr
                key={flag}
                className={cn(
                  "transition-colors",
                  enabled
                    ? "hover:bg-emerald-500/3"
                    : "opacity-60 hover:bg-muted/30",
                )}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    {enabled ? (
                      <CheckCircle2
                        className="size-3.5 text-emerald-500 shrink-0"
                        aria-hidden="true"
                      />
                    ) : (
                      <Lock
                        className="size-3.5 text-muted-foreground/60 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={cn(
                        "text-xs",
                        enabled ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {FEATURE_LABELS[flag]}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-center">
                  {enabled ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="size-3" aria-hidden="true" />
                      Enabled
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                      <Lock className="size-3" aria-hidden="true" />
                      Locked
                    </span>
                  )}
                </td>
                <td className="px-4 py-2.5 hidden sm:table-cell">
                  <PlanBadge plan={minPlan} size="sm" showIcon={false} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── License History ──────────────────────────────────────────────────────────
const STATUS_STYLES: Record<LicenseHistoryEntry["status"], string> = {
  Active:
    "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30",
  Expired: "bg-muted text-muted-foreground border-border",
  Revoked: "bg-destructive/10 text-destructive border-destructive/25",
};

function LicenseHistory() {
  const { isLicenseValid, licenseKey, currentPlan, expiryDate } =
    useSubscription();

  const currentEntry: LicenseHistoryEntry = {
    id: licenseKey || "—",
    activatedAt: "Today",
    plan: currentPlan,
    expiryDate: new Date(expiryDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    status: isLicenseValid ? "Active" : "Expired",
  };

  const rows = [currentEntry, ...MOCK_HISTORY];

  return (
    <div
      className="rounded-lg border border-border overflow-hidden"
      data-ocid="license-history-list"
    >
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide">
              License ID
            </th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
              Activated
            </th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide">
              Plan
            </th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
              Expires
            </th>
            <th className="text-left px-4 py-3 font-semibold text-muted-foreground uppercase tracking-wide">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((entry) => (
            <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
              <td className="px-4 py-3 font-mono text-foreground truncate max-w-[140px]">
                {entry.id}
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                {entry.activatedAt}
              </td>
              <td className="px-4 py-3">
                <PlanBadge plan={entry.plan} size="sm" showIcon={false} />
              </td>
              <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                {entry.expiryDate}
              </td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "inline-flex items-center px-1.5 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide",
                    STATUS_STYLES[entry.status],
                  )}
                >
                  {entry.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Offline Activation Panel ─────────────────────────────────────────────────
const MACHINE_ID = "FNMS-MACH-A3F7-9B2C-XK7Q";

function OfflineActivationPanel() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(MACHINE_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      className="rounded-xl border border-border bg-card"
      data-ocid="offline-activation-panel"
    >
      <button
        type="button"
        className="w-full flex items-center justify-between px-5 py-4 text-left group"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="offline-panel-content"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted border border-border group-hover:bg-muted/80 transition-colors">
            <WifiOff
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Offline / Air-Gap Activation
            </p>
            <p className="text-xs text-muted-foreground">
              Activate FiberNMS on isolated networks without internet access
            </p>
          </div>
        </div>
        {open ? (
          <ChevronUp
            className="size-4 text-muted-foreground shrink-0"
            aria-hidden="true"
          />
        ) : (
          <ChevronDown
            className="size-4 text-muted-foreground shrink-0"
            aria-hidden="true"
          />
        )}
      </button>

      {open && (
        <div
          id="offline-panel-content"
          className="px-5 pb-5 space-y-4 border-t border-border pt-4"
        >
          <p className="text-sm text-muted-foreground">
            For air-gapped or on-premise deployments, follow these steps to
            activate without an internet connection:
          </p>

          <ol className="space-y-4">
            {[
              {
                step: 1,
                title: "Copy your Machine ID",
                desc: "This uniquely identifies your FiberNMS installation.",
                action: (
                  <div className="flex items-center gap-2 mt-2">
                    <code className="flex-1 font-mono text-xs px-3 py-2 rounded-lg bg-muted border border-border text-foreground">
                      {MACHINE_ID}
                    </code>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      data-ocid="copy-machine-id-btn"
                    >
                      <ClipboardCopy
                        className="size-3.5 mr-1.5"
                        aria-hidden="true"
                      />
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                ),
              },
              {
                step: 2,
                title: "Generate an Offline Key",
                desc: "Visit the FiberNMS License Portal on a connected machine, provide your Machine ID and order reference to generate an offline activation key.",
                action: null,
              },
              {
                step: 3,
                title: "Paste the Response Key",
                desc: "Enter the generated offline activation key in the License Key field above and click Validate & Activate.",
                action: null,
              },
            ].map(({ step, title, desc, action }) => (
              <li key={step} className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-primary">
                    {step}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                  {action}
                </div>
              </li>
            ))}
          </ol>

          <div className="flex items-start gap-2 px-3 py-3 rounded-lg bg-muted/50 border border-border">
            <Laptop2
              className="size-4 text-muted-foreground shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-xs text-muted-foreground">
              Offline licenses are bound to your machine fingerprint and cannot
              be transferred. Contact{" "}
              <a
                href="https://caffeine.ai?utm_source=fibernms-license"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-2 hover:no-underline"
              >
                FiberNMS Support
              </a>{" "}
              for hardware migration assistance.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function License() {
  const { daysUntilExpiry, isExpired } = useSubscription();

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8"
      data-ocid="license-page"
    >
      {/* ── Page Header ── */}
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Shield className="size-5 text-primary" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold font-display text-foreground tracking-tight">
            License Management
          </h1>
        </div>
        <p className="text-sm text-muted-foreground ml-[52px]">
          Activate and manage your FiberNMS enterprise license
        </p>
      </div>

      {/* ── Expiry Warning Banner ── */}
      {(isExpired || (!isExpired && daysUntilExpiry <= 30)) && (
        <LicenseExpiryBanner />
      )}

      {/* ── Current License Status ── */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            Current License Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LicenseStatusCard />
        </CardContent>
      </Card>

      {/* ── License Key Input ── */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Key className="size-4 text-primary" aria-hidden="true" />
            Activate License Key
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Paste your license key below. Supports single-line and multi-line
            enterprise keys.
          </p>
        </CardHeader>
        <CardContent>
          <LicenseKeyForm />
        </CardContent>
      </Card>

      {/* ── License Features ── */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <CheckCircle2 className="size-4 text-primary" aria-hidden="true" />
            Features Included in Your License
          </CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Features enabled by your current license tier. Upgrade to unlock
            more capabilities.
          </p>
        </CardHeader>
        <CardContent>
          <LicenseFeaturesTable />
        </CardContent>
      </Card>

      {/* ── License History ── */}
      <Card className="bg-card border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <History className="size-4 text-primary" aria-hidden="true" />
            License History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <LicenseHistory />
        </CardContent>
      </Card>

      {/* ── Offline Activation ── */}
      <OfflineActivationPanel />

      {/* ── Footer ── */}
      <Separator className="bg-border" />
      <p className="text-xs text-muted-foreground text-center pb-4">
        Need help with licensing?{" "}
        <a
          href="https://caffeine.ai?utm_source=fibernms-license&utm_medium=referral&utm_content=license-page"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline underline-offset-2 hover:no-underline"
        >
          Contact FiberNMS Support
        </a>
      </p>
    </div>
  );
}
