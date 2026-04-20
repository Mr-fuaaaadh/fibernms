import { FeatureGate } from "@/components/subscription";
import { PlanBadge } from "@/components/subscription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FeatureFlag, Plan } from "@/types/subscription";
import {
  AlertTriangle,
  Building2,
  Check,
  ChevronDown,
  ChevronUp,
  Globe,
  Mail,
  Palette,
  RotateCcw,
  Shield,
  Trash2,
  Type,
  Upload,
  Wifi,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type FontFamily = "Inter" | "Roboto" | "IBM Plex Sans" | "Custom";
type FontScale = "Compact" | "Default" | "Large";
type EmailTemplate = "minimal" | "branded" | "enterprise";
type SslStatus = "not_configured" | "provisioning" | "active";

interface BrandingSettings {
  companyName: string;
  tagline: string;
  copyright: string;
  supportUrl: string;
  logoUrl: string | null;
  primaryColor: string;
  secondaryColor: string;
  successColor: string;
  warningColor: string;
  errorColor: string;
  fontFamily: FontFamily;
  fontScale: FontScale;
  domain: string;
  emailTemplate: EmailTemplate;
}

const DEFAULTS: BrandingSettings = {
  companyName: "FiberNMS",
  tagline: "Carrier-Grade Network Management",
  copyright: "© 2026 FiberNMS. All rights reserved.",
  supportUrl: "https://support.fibernms.io",
  logoUrl: null,
  primaryColor: "#3b82f6",
  secondaryColor: "#8b5cf6",
  successColor: "#10b981",
  warningColor: "#f59e0b",
  errorColor: "#ef4444",
  fontFamily: "Inter",
  fontScale: "Default",
  domain: "",
  emailTemplate: "branded",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FONT_OPTIONS: FontFamily[] = [
  "Inter",
  "Roboto",
  "IBM Plex Sans",
  "Custom",
];
const SCALE_OPTIONS: FontScale[] = ["Compact", "Default", "Large"];
const EMAIL_TEMPLATES: { id: EmailTemplate; label: string; desc: string }[] = [
  { id: "minimal", label: "Minimal", desc: "Clean text-only alerts" },
  { id: "branded", label: "Branded", desc: "Full company branding" },
  { id: "enterprise", label: "Enterprise", desc: "Formal letterhead style" },
];

function sslStatusMeta(status: SslStatus) {
  if (status === "active")
    return {
      label: "Active",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      icon: <Shield className="size-3.5" />,
    };
  if (status === "provisioning")
    return {
      label: "Provisioning",
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/30",
      icon: <AlertTriangle className="size-3.5" />,
    };
  return {
    label: "Not Configured",
    color: "text-muted-foreground",
    bg: "bg-muted/50 border-border",
    icon: <Shield className="size-3.5 opacity-40" />,
  };
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <div className="flex items-center gap-2.5">
        <div className="size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
          <Icon className="size-4 text-primary" aria-hidden />
        </div>
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      </div>
      {children}
    </div>
  );
}

// ─── Color Swatch Input ───────────────────────────────────────────────────────

function ColorInput({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  id: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="size-8 rounded-lg cursor-pointer border border-border p-0.5 bg-card"
            data-ocid={`color-picker-${id}`}
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="font-mono text-xs h-8 uppercase"
          maxLength={7}
          data-ocid={`color-hex-${id}`}
        />
      </div>
    </div>
  );
}

// ─── Live Preview Panel ───────────────────────────────────────────────────────

function LivePreview({ s }: { s: BrandingSettings }) {
  const fontClass =
    s.fontFamily === "Roboto"
      ? "font-sans"
      : s.fontFamily === "IBM Plex Sans"
        ? "font-mono"
        : "font-body";

  const scaleStyle =
    s.fontScale === "Compact"
      ? { fontSize: "11px" }
      : s.fontScale === "Large"
        ? { fontSize: "14px" }
        : { fontSize: "12px" };

  return (
    <div
      className={cn(
        "rounded-xl border border-border overflow-hidden bg-background",
        fontClass,
      )}
      style={scaleStyle}
      data-ocid="branding-live-preview"
    >
      {/* Mock Navbar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b border-border"
        style={{ backgroundColor: `${s.primaryColor}18` }}
      >
        <div className="flex items-center gap-2.5">
          {s.logoUrl ? (
            <img
              src={s.logoUrl}
              alt="Logo"
              className="h-6 w-auto rounded object-contain"
            />
          ) : (
            <div
              className="size-6 rounded flex items-center justify-center text-white font-bold text-[10px]"
              style={{ backgroundColor: s.primaryColor }}
            >
              {s.companyName.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="font-semibold text-foreground text-xs">
            {s.companyName}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="size-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: s.successColor }}
          />
          <span className="text-[10px] text-muted-foreground">LIVE</span>
        </div>
      </div>

      {/* Mock Content */}
      <div className="p-4 space-y-3">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
          {s.tagline}
        </p>

        {/* Mock Device Card */}
        <div className="rounded-lg border border-border bg-card p-3 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="size-5 rounded flex items-center justify-center"
                style={{ backgroundColor: `${s.primaryColor}22` }}
              >
                <Wifi className="size-3" style={{ color: s.primaryColor }} />
              </div>
              <span className="font-medium text-foreground text-[11px]">
                OLT-CORE-01
              </span>
            </div>
            <span
              className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
              style={{
                color: s.successColor,
                backgroundColor: `${s.successColor}22`,
              }}
            >
              ONLINE
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["Signal", "Latency", "Uptime"].map((metric, i) => (
              <div
                key={metric}
                className="rounded p-1.5 text-center"
                style={{ backgroundColor: `${s.secondaryColor}12` }}
              >
                <div
                  className="font-semibold text-[10px]"
                  style={{ color: i === 0 ? s.primaryColor : s.secondaryColor }}
                >
                  {i === 0 ? "-18dBm" : i === 1 ? "2ms" : "99.9%"}
                </div>
                <div className="text-[9px] text-muted-foreground">{metric}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mock Alert */}
        <div
          className="rounded-lg border p-2.5 flex items-center gap-2"
          style={{
            borderColor: `${s.warningColor}50`,
            backgroundColor: `${s.warningColor}10`,
          }}
        >
          <AlertTriangle
            className="size-3.5 shrink-0"
            style={{ color: s.warningColor }}
          />
          <span className="text-[10px] text-foreground">
            Signal degradation detected on port 4/0/7
          </span>
        </div>

        {/* Mock footer */}
        <p className="text-[9px] text-muted-foreground text-center pt-1">
          {s.copyright}
        </p>
      </div>
    </div>
  );
}

// ─── Email Preview ────────────────────────────────────────────────────────────

function EmailPreview({
  template,
  s,
}: {
  template: EmailTemplate;
  s: BrandingSettings;
}) {
  return (
    <div className="rounded-lg border border-border bg-background overflow-hidden text-xs">
      {template !== "minimal" && (
        <div
          className="px-4 py-3 flex items-center gap-2"
          style={{ backgroundColor: s.primaryColor }}
        >
          <div className="size-5 rounded bg-white/20 flex items-center justify-center text-white font-bold text-[10px]">
            {s.companyName.charAt(0)}
          </div>
          <span className="text-white font-semibold text-[11px]">
            {s.companyName}
          </span>
        </div>
      )}
      <div className="p-4 space-y-2">
        <p className="font-semibold text-foreground text-[11px]">
          🚨 Critical Alert: Fiber Cut Detected
        </p>
        <p className="text-muted-foreground text-[10px] leading-relaxed">
          A fiber cut has been detected on Route <strong>BACKBONE-SE-04</strong>{" "}
          at 14:32 UTC. Affected devices: 127. Estimated restoration: 45
          minutes.
        </p>
        <div
          className="inline-block rounded px-2 py-1 text-[10px] font-semibold text-white mt-1"
          style={{ backgroundColor: s.primaryColor }}
        >
          View in {s.companyName} NOC →
        </div>
      </div>
      {template === "enterprise" && (
        <div className="px-4 py-2 border-t border-border bg-muted/30">
          <p className="text-[9px] text-muted-foreground">{s.copyright}</p>
        </div>
      )}
    </div>
  );
}

// ─── DNS Panel ────────────────────────────────────────────────────────────────

function DnsPanel({ domain }: { domain: string }) {
  const [open, setOpen] = useState(false);
  const [ssl] = useState<SslStatus>("not_configured");
  const meta = sslStatusMeta(ssl);
  const targetDomain = domain || "your-domain.com";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "inline-flex items-center gap-1.5 text-xs border rounded-full px-2.5 py-1 font-medium",
            meta.bg,
            meta.color,
          )}
        >
          {meta.icon}
          SSL: {meta.label}
        </div>
        <button
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          data-ocid="dns-instructions-toggle"
        >
          DNS Setup
          {open ? (
            <ChevronUp className="size-3.5" />
          ) : (
            <ChevronDown className="size-3.5" />
          )}
        </button>
      </div>
      {open && (
        <div className="rounded-lg bg-muted/40 border border-border p-4 space-y-3 text-xs">
          <p className="text-muted-foreground">
            Add the following DNS records to point{" "}
            <code className="font-mono bg-background border border-border rounded px-1 py-0.5">
              {targetDomain}
            </code>{" "}
            to FiberNMS:
          </p>
          <div className="space-y-2">
            {[
              { type: "CNAME", name: targetDomain, value: "app.fibernms.io" },
              {
                type: "TXT",
                name: `_verify.${targetDomain}`,
                value: "fibernms-verify=abc123xyz",
              },
            ].map((r) => (
              <div
                key={r.type}
                className="font-mono bg-background border border-border rounded p-2.5 grid grid-cols-3 gap-2"
              >
                <span className="text-primary font-semibold">{r.type}</span>
                <span className="text-muted-foreground truncate">{r.name}</span>
                <span className="text-foreground truncate">{r.value}</span>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-[10px]">
            SSL certificates are provisioned automatically after DNS propagation
            (up to 48h).
          </p>
        </div>
      )}
    </div>
  );
}

// ─── Danger Zone ─────────────────────────────────────────────────────────────

function DangerZone({ onReset }: { onReset: () => void }) {
  const [confirm, setConfirm] = useState(false);
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3">
      <div className="flex items-center gap-2">
        <Trash2 className="size-4 text-destructive" />
        <h3 className="font-semibold text-sm text-destructive">Danger Zone</h3>
      </div>
      <p className="text-xs text-muted-foreground">
        Resetting branding will revert all colors, logos, typography, and
        company info to FiberNMS defaults. This cannot be undone.
      </p>
      {!confirm ? (
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setConfirm(true)}
          data-ocid="danger-reset-trigger"
        >
          Reset All Branding to Defaults
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              onReset();
              setConfirm(false);
            }}
            data-ocid="danger-reset-confirm"
          >
            Confirm Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setConfirm(false)}
            data-ocid="danger-reset-cancel"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Branding() {
  const [settings, setSettings] = useState<BrandingSettings>({ ...DEFAULTS });
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const update = useCallback(
    <K extends keyof BrandingSettings>(key: K, value: BrandingSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      setSaved(false);
    },
    [],
  );

  const handleLogoFile = useCallback(
    (file: File) => {
      if (!file.type.match(/^image\/(png|svg\+xml|jpeg|webp)$/)) {
        toast.error("Only PNG, SVG, JPG, or WEBP files are supported");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) =>
        update("logoUrl", (e.target?.result as string) ?? null);
      reader.readAsDataURL(file);
    },
    [update],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleLogoFile(file);
    },
    [handleLogoFile],
  );

  const handleSave = () => {
    // Persist to localStorage as a simple mock store
    localStorage.setItem("fibernms_branding", JSON.stringify(settings));
    setSaved(true);
    toast.success("Branding settings saved", {
      description: "Changes will appear across your tenant instance.",
      duration: 4000,
    });
  };

  const handleReset = () => {
    setSettings({ ...DEFAULTS });
    setSaved(false);
    localStorage.removeItem("fibernms_branding");
    toast.info("Branding reset to FiberNMS defaults");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="border-b border-border bg-card px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold font-display text-foreground tracking-tight">
                White-Labeling & Branding
              </h1>
              <PlanBadge plan={Plan.ULTRA} size="md" />
            </div>
            <p className="text-sm text-muted-foreground">
              Customize the platform to match your company identity — logos,
              colors, typography, and custom domains.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("#", "_blank")}
              data-ocid="branding-open-preview"
            >
              <Globe className="size-3.5 mr-1.5" />
              Open Preview
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              className="gap-1.5"
              data-ocid="branding-save"
            >
              {saved ? (
                <Check className="size-3.5" />
              ) : (
                <Palette className="size-3.5" />
              )}
              {saved ? "Saved" : "Save & Apply"}
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Gate wraps everything except the header */}
      <FeatureGate
        feature={FeatureFlag.WHITE_LABELING}
        mode="replace"
        featureLabel="White-Labeling & Branding"
        description="Custom branding, white-labeling, and custom domains are available on the Ultra plan. Upgrade to present this platform under your own brand identity."
      >
        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 md:gap-6 items-start">
            {/* ── LEFT: Settings Columns ── */}
            <div className="space-y-5">
              {/* Logo */}
              <Section icon={Upload} title="Logo">
                <button
                  type="button"
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileRef.current?.click()}
                  className={cn(
                    "w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors",
                    dragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30",
                  )}
                  data-ocid="logo-drop-zone"
                >
                  {settings.logoUrl ? (
                    <img
                      src={settings.logoUrl}
                      alt="Company logo"
                      className="h-12 max-w-[180px] object-contain rounded"
                    />
                  ) : (
                    <>
                      <div className="size-10 rounded-xl bg-muted flex items-center justify-center">
                        <Upload className="size-5 text-muted-foreground" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-foreground">
                          Drop logo here or click to upload
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          PNG, SVG, JPG — recommended 200×60px, max 2MB
                        </p>
                      </div>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/png,image/svg+xml,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoFile(file);
                    }}
                    data-ocid="logo-file-input"
                  />
                </button>
                {settings.logoUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => update("logoUrl", null)}
                    className="gap-1.5"
                    data-ocid="logo-reset"
                  >
                    <RotateCcw className="size-3.5" />
                    Reset to Default FiberNMS Logo
                  </Button>
                )}
              </Section>

              {/* Colors */}
              <Section icon={Palette} title="Brand Colors">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <ColorInput
                    label="Primary Color"
                    id="primary"
                    value={settings.primaryColor}
                    onChange={(v) => update("primaryColor", v)}
                  />
                  <ColorInput
                    label="Secondary Accent"
                    id="secondary"
                    value={settings.secondaryColor}
                    onChange={(v) => update("secondaryColor", v)}
                  />
                  <ColorInput
                    label="Success"
                    id="success"
                    value={settings.successColor}
                    onChange={(v) => update("successColor", v)}
                  />
                  <ColorInput
                    label="Warning"
                    id="warning"
                    value={settings.warningColor}
                    onChange={(v) => update("warningColor", v)}
                  />
                  <ColorInput
                    label="Error / Critical"
                    id="error"
                    value={settings.errorColor}
                    onChange={(v) => update("errorColor", v)}
                  />
                </div>
              </Section>

              {/* Typography */}
              <Section icon={Type} title="Typography">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Font Family
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {FONT_OPTIONS.map((f) => (
                        <button
                          key={f}
                          type="button"
                          onClick={() => update("fontFamily", f)}
                          className={cn(
                            "px-3 py-1.5 rounded-lg text-xs border font-medium transition-colors",
                            settings.fontFamily === f
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50",
                          )}
                          data-ocid={`font-${f.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Font Scale
                    </Label>
                    <div className="flex gap-2">
                      {SCALE_OPTIONS.map((sc) => (
                        <button
                          key={sc}
                          type="button"
                          onClick={() => update("fontScale", sc)}
                          className={cn(
                            "flex-1 py-1.5 rounded-lg text-xs border font-medium transition-colors",
                            settings.fontScale === sc
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50",
                          )}
                          data-ocid={`scale-${sc.toLowerCase()}`}
                        >
                          {sc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </Section>

              {/* Company Info */}
              <Section icon={Building2} title="Company Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="company-name"
                      className="text-xs text-muted-foreground"
                    >
                      Company Name
                    </Label>
                    <Input
                      id="company-name"
                      value={settings.companyName}
                      onChange={(e) => update("companyName", e.target.value)}
                      placeholder="FiberNMS"
                      data-ocid="company-name-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="tagline"
                      className="text-xs text-muted-foreground"
                    >
                      Tagline
                    </Label>
                    <Input
                      id="tagline"
                      value={settings.tagline}
                      onChange={(e) => update("tagline", e.target.value)}
                      placeholder="Carrier-Grade Network Management"
                      data-ocid="tagline-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="copyright"
                      className="text-xs text-muted-foreground"
                    >
                      Copyright Text
                    </Label>
                    <Input
                      id="copyright"
                      value={settings.copyright}
                      onChange={(e) => update("copyright", e.target.value)}
                      placeholder="© 2026 Acme Corp."
                      data-ocid="copyright-input"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="support-url"
                      className="text-xs text-muted-foreground"
                    >
                      Support URL
                    </Label>
                    <Input
                      id="support-url"
                      value={settings.supportUrl}
                      onChange={(e) => update("supportUrl", e.target.value)}
                      placeholder="https://support.yourcompany.com"
                      data-ocid="support-url-input"
                    />
                  </div>
                </div>
              </Section>

              {/* Domain */}
              <Section icon={Globe} title="Custom Domain">
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="custom-domain"
                      className="text-xs text-muted-foreground"
                    >
                      Custom Domain
                    </Label>
                    <Input
                      id="custom-domain"
                      value={settings.domain}
                      onChange={(e) => update("domain", e.target.value)}
                      placeholder="noc.yourcompany.com"
                      data-ocid="domain-input"
                    />
                  </div>
                  <DnsPanel domain={settings.domain} />
                </div>
              </Section>

              {/* Email Branding */}
              <Section icon={Mail} title="Email Branding">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Alert Email Style
                    </Label>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {EMAIL_TEMPLATES.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => update("emailTemplate", t.id)}
                          className={cn(
                            "flex-1 px-3 py-2.5 rounded-lg text-left border transition-colors",
                            settings.emailTemplate === t.id
                              ? "bg-primary/10 border-primary text-foreground"
                              : "bg-muted/30 border-border text-muted-foreground hover:border-primary/40",
                          )}
                          data-ocid={`email-template-${t.id}`}
                        >
                          <div className="text-xs font-semibold">{t.label}</div>
                          <div className="text-[10px] mt-0.5 opacity-70">
                            {t.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">
                      Email Preview
                    </Label>
                    <EmailPreview
                      template={settings.emailTemplate}
                      s={settings}
                    />
                  </div>
                </div>
              </Section>

              <Separator />

              {/* Danger Zone */}
              <DangerZone onReset={handleReset} />
            </div>

            {/* ── RIGHT: Live Preview ── */}
            <div className="lg:sticky lg:top-6 space-y-4">
              <div className="rounded-xl border border-border bg-card p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">
                    Live Preview
                  </h3>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-primary/40 text-primary bg-primary/5"
                  >
                    Real-time
                  </Badge>
                </div>
                <LivePreview s={settings} />
              </div>

              {/* Quick tips */}
              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                <p className="text-xs font-semibold text-foreground">
                  Branding Tips
                </p>
                {[
                  "Use SVG logos for crisp rendering at all sizes",
                  "Primary color drives navigation & CTA buttons",
                  "Custom domain requires DNS propagation (up to 48h)",
                  "Enterprise email style suits formal NOC operations",
                ].map((tip) => (
                  <div key={tip} className="flex items-start gap-2">
                    <Check className="size-3 mt-0.5 shrink-0 text-primary" />
                    <p className="text-[11px] text-muted-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FeatureGate>
    </div>
  );
}
