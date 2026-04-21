import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, ax as Plan, aH as Palette, aE as FeatureFlag, e as cn, aA as Building2, af as Badge, i as ChevronDown, T as TriangleAlert, aj as Shield } from "./index-YFsEtCvH.js";
import { F as FeatureGate } from "./PlanComparisonModal-CgXvLPTZ.js";
import { B as Button } from "./button-5YJ30JG-.js";
import { P as PlanBadge } from "./PlanBadge-Cu-2J6Kf.js";
import { I as Input } from "./input-xFrpxOrM.js";
import { L as Label } from "./label-DOM8hrQb.js";
import { S as Separator } from "./separator-DLdcUH1V.js";
import { u as ue } from "./index-C9hj3gYC.js";
import { G as Globe } from "./globe-Ayhrg4Wt.js";
import { C as Check } from "./check-Baez-K2c.js";
import { U as Upload } from "./upload-iBgYWTGy.js";
import { R as RotateCcw } from "./rotate-ccw-1iKlBAUY.js";
import { M as Mail } from "./mail-D0JOXHDu.js";
import { C as ChevronUp } from "./chevron-up-BTQClgc4.js";
import { T as Trash2 } from "./trash-2-FXhfrTrw.js";
import { W as Wifi } from "./wifi-D-N8F-4F.js";
import "./useFeature-C1XEttZB.js";
import "./lock-keyhole-CoBjKKWK.js";
import "./diamond-BTPlUMoB.js";
import "./index-C08Q6qm1.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
];
const Type = createLucideIcon("type", __iconNode);
const DEFAULTS = {
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
  emailTemplate: "branded"
};
const FONT_OPTIONS = [
  "Inter",
  "Roboto",
  "IBM Plex Sans",
  "Custom"
];
const SCALE_OPTIONS = ["Compact", "Default", "Large"];
const EMAIL_TEMPLATES = [
  { id: "minimal", label: "Minimal", desc: "Clean text-only alerts" },
  { id: "branded", label: "Branded", desc: "Full company branding" },
  { id: "enterprise", label: "Enterprise", desc: "Formal letterhead style" }
];
function sslStatusMeta(status) {
  if (status === "active")
    return {
      label: "Active",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10 border-emerald-500/30",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3.5" })
    };
  if (status === "provisioning")
    return {
      label: "Provisioning",
      color: "text-amber-500",
      bg: "bg-amber-500/10 border-amber-500/30",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-3.5" })
    };
  return {
    label: "Not Configured",
    color: "text-muted-foreground",
    bg: "bg-muted/50 border-border",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3.5 opacity-40" })
  };
}
function Section({
  icon: Icon,
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary", "aria-hidden": true }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: title })
    ] }),
    children
  ] });
}
function ColorInput({
  label,
  value,
  onChange,
  id
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-xs text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "color",
          id,
          value,
          onChange: (e) => onChange(e.target.value),
          className: "size-8 rounded-lg cursor-pointer border border-border p-0.5 bg-card",
          "data-ocid": `color-picker-${id}`
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value,
          onChange: (e) => onChange(e.target.value),
          className: "font-mono text-xs h-8 uppercase",
          maxLength: 7,
          "data-ocid": `color-hex-${id}`
        }
      )
    ] })
  ] });
}
function LivePreview({ s }) {
  const fontClass = s.fontFamily === "Roboto" ? "font-sans" : s.fontFamily === "IBM Plex Sans" ? "font-mono" : "font-body";
  const scaleStyle = s.fontScale === "Compact" ? { fontSize: "11px" } : s.fontScale === "Large" ? { fontSize: "14px" } : { fontSize: "12px" };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-xl border border-border overflow-hidden bg-background",
        fontClass
      ),
      style: scaleStyle,
      "data-ocid": "branding-live-preview",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-4 py-3 border-b border-border",
            style: { backgroundColor: `${s.primaryColor}18` },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                s.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: s.logoUrl,
                    alt: "Logo",
                    className: "h-6 w-auto rounded object-contain"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "size-6 rounded flex items-center justify-center text-white font-bold text-[10px]",
                    style: { backgroundColor: s.primaryColor },
                    children: s.companyName.charAt(0).toUpperCase()
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-xs", children: s.companyName })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "size-1.5 rounded-full animate-pulse",
                    style: { backgroundColor: s.successColor }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "LIVE" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground font-mono uppercase tracking-widest", children: s.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-card p-3 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "size-5 rounded flex items-center justify-center",
                    style: { backgroundColor: `${s.primaryColor}22` },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "size-3", style: { color: s.primaryColor } })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-[11px]", children: "OLT-CORE-01" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "text-[9px] font-semibold px-1.5 py-0.5 rounded-full",
                  style: {
                    color: s.successColor,
                    backgroundColor: `${s.successColor}22`
                  },
                  children: "ONLINE"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-1.5", children: ["Signal", "Latency", "Uptime"].map((metric, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "rounded p-1.5 text-center",
                style: { backgroundColor: `${s.secondaryColor}12` },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "font-semibold text-[10px]",
                      style: { color: i === 0 ? s.primaryColor : s.secondaryColor },
                      children: i === 0 ? "-18dBm" : i === 1 ? "2ms" : "99.9%"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] text-muted-foreground", children: metric })
                ]
              },
              metric
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-lg border p-2.5 flex items-center gap-2",
              style: {
                borderColor: `${s.warningColor}50`,
                backgroundColor: `${s.warningColor}10`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TriangleAlert,
                  {
                    className: "size-3.5 shrink-0",
                    style: { color: s.warningColor }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-foreground", children: "Signal degradation detected on port 4/0/7" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground text-center pt-1", children: s.copyright })
        ] })
      ]
    }
  );
}
function EmailPreview({
  template,
  s
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-border bg-background overflow-hidden text-xs", children: [
    template !== "minimal" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "px-4 py-3 flex items-center gap-2",
        style: { backgroundColor: s.primaryColor },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-5 rounded bg-white/20 flex items-center justify-center text-white font-bold text-[10px]", children: s.companyName.charAt(0) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-semibold text-[11px]", children: s.companyName })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-[11px]", children: "🚨 Critical Alert: Fiber Cut Detected" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-[10px] leading-relaxed", children: [
        "A fiber cut has been detected on Route ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "BACKBONE-SE-04" }),
        " ",
        "at 14:32 UTC. Affected devices: 127. Estimated restoration: 45 minutes."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "inline-block rounded px-2 py-1 text-[10px] font-semibold text-white mt-1",
          style: { backgroundColor: s.primaryColor },
          children: [
            "View in ",
            s.companyName,
            " NOC →"
          ]
        }
      )
    ] }),
    template === "enterprise" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-t border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground", children: s.copyright }) })
  ] });
}
function DnsPanel({ domain }) {
  const [open, setOpen] = reactExports.useState(false);
  const [ssl] = reactExports.useState("not_configured");
  const meta = sslStatusMeta(ssl);
  const targetDomain = domain || "your-domain.com";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "inline-flex items-center gap-1.5 text-xs border rounded-full px-2.5 py-1 font-medium",
            meta.bg,
            meta.color
          ),
          children: [
            meta.icon,
            "SSL: ",
            meta.label
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen((p) => !p),
          className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors",
          "data-ocid": "dns-instructions-toggle",
          children: [
            "DNS Setup",
            open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3.5" })
          ]
        }
      )
    ] }),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/40 border border-border p-4 space-y-3 text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
        "Add the following DNS records to point",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono bg-background border border-border rounded px-1 py-0.5", children: targetDomain }),
        " ",
        "to FiberNMS:"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [
        { type: "CNAME", name: targetDomain, value: "app.fibernms.io" },
        {
          type: "TXT",
          name: `_verify.${targetDomain}`,
          value: "fibernms-verify=abc123xyz"
        }
      ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "font-mono bg-background border border-border rounded p-2.5 grid grid-cols-3 gap-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: r.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground truncate", children: r.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate", children: r.value })
          ]
        },
        r.type
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-[10px]", children: "SSL certificates are provisioned automatically after DNS propagation (up to 48h)." })
    ] })
  ] });
}
function DangerZone({ onReset }) {
  const [confirm, setConfirm] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-destructive/30 bg-destructive/5 p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4 text-destructive" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm text-destructive", children: "Danger Zone" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Resetting branding will revert all colors, logos, typography, and company info to FiberNMS defaults. This cannot be undone." }),
    !confirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        variant: "destructive",
        size: "sm",
        onClick: () => setConfirm(true),
        "data-ocid": "danger-reset-trigger",
        children: "Reset All Branding to Defaults"
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "destructive",
          size: "sm",
          onClick: () => {
            onReset();
            setConfirm(false);
          },
          "data-ocid": "danger-reset-confirm",
          children: "Confirm Reset"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setConfirm(false),
          "data-ocid": "danger-reset-cancel",
          children: "Cancel"
        }
      )
    ] })
  ] });
}
function Branding() {
  const [settings, setSettings] = reactExports.useState({ ...DEFAULTS });
  const [saved, setSaved] = reactExports.useState(false);
  const fileRef = reactExports.useRef(null);
  const [dragging, setDragging] = reactExports.useState(false);
  const update = reactExports.useCallback(
    (key, value) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
      setSaved(false);
    },
    []
  );
  const handleLogoFile = reactExports.useCallback(
    (file) => {
      if (!file.type.match(/^image\/(png|svg\+xml|jpeg|webp)$/)) {
        ue.error("Only PNG, SVG, JPG, or WEBP files are supported");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        var _a;
        return update("logoUrl", ((_a = e.target) == null ? void 0 : _a.result) ?? null);
      };
      reader.readAsDataURL(file);
    },
    [update]
  );
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleLogoFile(file);
    },
    [handleLogoFile]
  );
  const handleSave = () => {
    localStorage.setItem("fibernms_branding", JSON.stringify(settings));
    setSaved(true);
    ue.success("Branding settings saved", {
      description: "Changes will appear across your tenant instance.",
      duration: 4e3
    });
  };
  const handleReset = () => {
    setSettings({ ...DEFAULTS });
    setSaved(false);
    localStorage.removeItem("fibernms_branding");
    ue.info("Branding reset to FiberNMS defaults");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-border bg-card px-6 py-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold font-display text-foreground tracking-tight", children: "White-Labeling & Branding" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PlanBadge, { plan: Plan.ULTRA, size: "md" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Customize the platform to match your company identity — logos, colors, typography, and custom domains." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => window.open("#", "_blank"),
            "data-ocid": "branding-open-preview",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-3.5 mr-1.5" }),
              "Open Preview"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            onClick: handleSave,
            className: "gap-1.5",
            "data-ocid": "branding-save",
            children: [
              saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Palette, { className: "size-3.5" }),
              saved ? "Saved" : "Save & Apply"
            ]
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeatureGate,
      {
        feature: FeatureFlag.WHITE_LABELING,
        mode: "replace",
        featureLabel: "White-Labeling & Branding",
        description: "Custom branding, white-labeling, and custom domains are available on the Ultra plan. Upgrade to present this platform under your own brand identity.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 md:p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 md:gap-6 items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { icon: Upload, title: "Logo", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onDragOver: (e) => {
                    e.preventDefault();
                    setDragging(true);
                  },
                  onDragLeave: () => setDragging(false),
                  onDrop: handleDrop,
                  onClick: () => {
                    var _a;
                    return (_a = fileRef.current) == null ? void 0 : _a.click();
                  },
                  className: cn(
                    "w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors",
                    dragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
                  ),
                  "data-ocid": "logo-drop-zone",
                  children: [
                    settings.logoUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: settings.logoUrl,
                        alt: "Company logo",
                        className: "h-12 max-w-[180px] object-contain rounded"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 rounded-xl bg-muted flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "size-5 text-muted-foreground" }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Drop logo here or click to upload" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "PNG, SVG, JPG — recommended 200×60px, max 2MB" })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        ref: fileRef,
                        type: "file",
                        accept: "image/png,image/svg+xml,image/jpeg,image/webp",
                        className: "hidden",
                        onChange: (e) => {
                          var _a;
                          const file = (_a = e.target.files) == null ? void 0 : _a[0];
                          if (file) handleLogoFile(file);
                        },
                        "data-ocid": "logo-file-input"
                      }
                    )
                  ]
                }
              ),
              settings.logoUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => update("logoUrl", null),
                  className: "gap-1.5",
                  "data-ocid": "logo-reset",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "size-3.5" }),
                    "Reset to Default FiberNMS Logo"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Palette, title: "Brand Colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorInput,
                {
                  label: "Primary Color",
                  id: "primary",
                  value: settings.primaryColor,
                  onChange: (v) => update("primaryColor", v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorInput,
                {
                  label: "Secondary Accent",
                  id: "secondary",
                  value: settings.secondaryColor,
                  onChange: (v) => update("secondaryColor", v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorInput,
                {
                  label: "Success",
                  id: "success",
                  value: settings.successColor,
                  onChange: (v) => update("successColor", v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorInput,
                {
                  label: "Warning",
                  id: "warning",
                  value: settings.warningColor,
                  onChange: (v) => update("warningColor", v)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ColorInput,
                {
                  label: "Error / Critical",
                  id: "error",
                  value: settings.errorColor,
                  onChange: (v) => update("errorColor", v)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Type, title: "Typography", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Font Family" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: FONT_OPTIONS.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => update("fontFamily", f),
                    className: cn(
                      "px-3 py-1.5 rounded-lg text-xs border font-medium transition-colors",
                      settings.fontFamily === f ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50"
                    ),
                    "data-ocid": `font-${f.toLowerCase().replace(/\s+/g, "-")}`,
                    children: f
                  },
                  f
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Font Scale" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: SCALE_OPTIONS.map((sc) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => update("fontScale", sc),
                    className: cn(
                      "flex-1 py-1.5 rounded-lg text-xs border font-medium transition-colors",
                      settings.fontScale === sc ? "bg-primary text-primary-foreground border-primary" : "bg-muted/40 text-muted-foreground border-border hover:border-primary/50"
                    ),
                    "data-ocid": `scale-${sc.toLowerCase()}`,
                    children: sc
                  },
                  sc
                )) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Building2, title: "Company Information", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "company-name",
                    className: "text-xs text-muted-foreground",
                    children: "Company Name"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "company-name",
                    value: settings.companyName,
                    onChange: (e) => update("companyName", e.target.value),
                    placeholder: "FiberNMS",
                    "data-ocid": "company-name-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "tagline",
                    className: "text-xs text-muted-foreground",
                    children: "Tagline"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "tagline",
                    value: settings.tagline,
                    onChange: (e) => update("tagline", e.target.value),
                    placeholder: "Carrier-Grade Network Management",
                    "data-ocid": "tagline-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "copyright",
                    className: "text-xs text-muted-foreground",
                    children: "Copyright Text"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "copyright",
                    value: settings.copyright,
                    onChange: (e) => update("copyright", e.target.value),
                    placeholder: "© 2026 Acme Corp.",
                    "data-ocid": "copyright-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "support-url",
                    className: "text-xs text-muted-foreground",
                    children: "Support URL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "support-url",
                    value: settings.supportUrl,
                    onChange: (e) => update("supportUrl", e.target.value),
                    placeholder: "https://support.yourcompany.com",
                    "data-ocid": "support-url-input"
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Globe, title: "Custom Domain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Label,
                  {
                    htmlFor: "custom-domain",
                    className: "text-xs text-muted-foreground",
                    children: "Custom Domain"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "custom-domain",
                    value: settings.domain,
                    onChange: (e) => update("domain", e.target.value),
                    placeholder: "noc.yourcompany.com",
                    "data-ocid": "domain-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DnsPanel, { domain: settings.domain })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { icon: Mail, title: "Email Branding", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Alert Email Style" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-2", children: EMAIL_TEMPLATES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => update("emailTemplate", t.id),
                    className: cn(
                      "flex-1 px-3 py-2.5 rounded-lg text-left border transition-colors",
                      settings.emailTemplate === t.id ? "bg-primary/10 border-primary text-foreground" : "bg-muted/30 border-border text-muted-foreground hover:border-primary/40"
                    ),
                    "data-ocid": `email-template-${t.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold", children: t.label }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] mt-0.5 opacity-70", children: t.desc })
                    ]
                  },
                  t.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Email Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  EmailPreview,
                  {
                    template: settings.emailTemplate,
                    s: settings
                  }
                )
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DangerZone, { onReset: handleReset })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:sticky lg:top-6 space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-card p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Live Preview" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "text-[10px] border-primary/40 text-primary bg-primary/5",
                    children: "Real-time"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(LivePreview, { s: settings })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border bg-muted/30 p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Branding Tips" }),
              [
                "Use SVG logos for crisp rendering at all sizes",
                "Primary color drives navigation & CTA buttons",
                "Custom domain requires DNS propagation (up to 48h)",
                "Enterprise email style suits formal NOC operations"
              ].map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 mt-0.5 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: tip })
              ] }, tip))
            ] })
          ] })
        ] }) })
      }
    )
  ] });
}
export {
  Branding as default
};
