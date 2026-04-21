import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, F as FileText, aq as Search, ax as Plan, X, af as Badge, h as Clock, n as ChevronRight, aR as Info, aP as ArrowLeft, az as CreditCard } from "./index-iFuWQqSU.js";
import { G as GlassCard } from "./GlassCard-D9su5mrt.js";
import { B as Button } from "./button-ChfDbElx.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-CJtLg0Pk.js";
import { I as Input } from "./input-bJavJW7u.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-BmN8obgD.js";
import { l as MOCK_ORDERS, n as MOCK_INVOICES, M as MOCK_COMPANIES } from "./superAdminMockData-SJ6Z2k0y.js";
import { D as Download } from "./download-B7QpoSH-.js";
import { C as CircleX } from "./circle-x-sUpzDEP5.js";
import { C as CircleCheck } from "./circle-check-iVFrCWzC.js";
import { R as RefreshCw } from "./refresh-cw-C7GiMOau.js";
import "./index-IXOTxK3N.js";
import "./index-DwV7JGiz.js";
import "./index-BWs8SA4K.js";
import "./check-BoirFqbD.js";
import "./chevron-up-CVJK9q_e.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",
      key: "143wyd"
    }
  ],
  ["path", { d: "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", key: "1itne7" }],
  ["rect", { x: "6", y: "14", width: "12", height: "8", rx: "1", key: "1ue0tg" }]
];
const Printer = createLucideIcon("printer", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
const Receipt = createLucideIcon("receipt", __iconNode);
function fmtDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function fmtCurrency(n) {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
}
function exportCsv(filename, headers, rows) {
  const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
function buildInvoiceHtml(invoice, company) {
  const taxLabel = invoice.taxType === "GST" ? "GST (18%)" : invoice.taxType === "VAT" ? "VAT (20%)" : "No Tax";
  const lineItems = invoice.lineItems ?? [
    {
      description: `FiberNMS ${(company == null ? void 0 : company.plan) ?? "Enterprise"} Subscription`,
      quantity: 1,
      unitPrice: invoice.amount,
      total: invoice.amount
    }
  ];
  const lineItemsHtml = lineItems.map(
    (li) => `
    <tr>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb;">${li.description}</td>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; text-align:center;">${li.quantity}</td>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; text-align:right;">${fmtCurrency(li.unitPrice)}</td>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; text-align:right; font-weight:600;">${fmtCurrency(li.total)}</td>
    </tr>`
  ).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>Invoice ${invoice.id}</title>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111827; margin: 0; padding: 40px; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 32px; padding-bottom: 20px; border-bottom: 2px solid #e5e7eb; }
  .brand { font-size: 22px; font-weight: 800; color: #1d4ed8; letter-spacing: -0.5px; }
  .brand-sub { font-size: 10px; color: #6b7280; margin-top: 2px; }
  .invoice-badge { background: #1d4ed8; color: white; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; }
  .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
  .meta-card { background: #f9fafb; border-radius: 8px; padding: 14px 16px; }
  .meta-label { font-size: 10px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
  .meta-value { font-size: 13px; font-weight: 600; color: #111827; }
  .meta-sub { font-size: 11px; color: #6b7280; margin-top: 2px; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
  thead { background: #f3f4f6; }
  thead th { padding: 10px 12px; text-align: left; font-weight: 700; color: #374151; font-size: 11px; text-transform: uppercase; letter-spacing: 0.4px; }
  thead th:nth-child(2) { text-align: center; }
  thead th:nth-child(3), thead th:nth-child(4) { text-align: right; }
  .totals { margin-left: auto; width: 280px; }
  .totals table { font-size: 13px; }
  .totals td { padding: 6px 12px; }
  .totals .grand-total { font-size: 15px; font-weight: 800; background: #f3f4f6; }
  .status-badge { display: inline-block; padding: 3px 10px; border-radius: 4px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
  .status-paid { background: #d1fae5; color: #065f46; }
  .status-pending { background: #fef3c7; color: #92400e; }
  .status-overdue { background: #fee2e2; color: #991b1b; }
  .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e5e7eb; font-size: 11px; color: #9ca3af; display: flex; justify-content: space-between; }
  @media print { body { padding: 20px; } }
</style>
</head>
<body>
<div class="header">
  <div>
    <div class="brand">FiberNMS</div>
    <div class="brand-sub">Optical Fiber Network Management Platform</div>
    <div style="font-size:11px; color:#6b7280; margin-top:8px;">
      support@fibernms.io · fibernms.io
    </div>
  </div>
  <div style="text-align:right;">
    <div class="invoice-badge">INVOICE</div>
    <div style="font-size:18px; font-weight:800; color:#111827; margin-top:8px;">${invoice.id}</div>
    <div style="font-size:11px; color:#6b7280;">
      <span class="status-badge status-${invoice.status}">${invoice.status.toUpperCase()}</span>
    </div>
  </div>
</div>

<div class="meta-grid">
  <div class="meta-card">
    <div class="meta-label">Bill To</div>
    <div class="meta-value">${invoice.companyName}</div>
    ${company ? `<div class="meta-sub">${company.contactEmail}</div><div class="meta-sub">${company.country} · ${company.region} region</div>` : ""}
    <div class="meta-sub" style="margin-top:6px; font-size:10px; color:#9ca3af;">Tax ID: GST/VAT-N/A</div>
  </div>
  <div class="meta-card">
    <div class="meta-label">Invoice Details</div>
    <div class="meta-value">${invoice.id}</div>
    <div class="meta-sub">Issued: ${fmtDate(invoice.issuedAt)}</div>
    <div class="meta-sub">Due: ${fmtDate(invoice.dueAt)}</div>
  </div>
</div>

<table>
  <thead>
    <tr>
      <th>Description</th>
      <th>Qty</th>
      <th>Unit Price</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
    ${lineItemsHtml}
  </tbody>
</table>

<div class="totals">
  <table>
    <tr>
      <td style="color:#6b7280;">Subtotal</td>
      <td style="text-align:right; font-weight:600;">${fmtCurrency(invoice.amount)}</td>
    </tr>
    <tr>
      <td style="color:#6b7280;">${taxLabel}</td>
      <td style="text-align:right; color:${invoice.taxAmount > 0 ? "#111827" : "#9ca3af"};">${invoice.taxAmount > 0 ? fmtCurrency(invoice.taxAmount) : "—"}</td>
    </tr>
    <tr class="grand-total">
      <td style="font-weight:800;">Total Due</td>
      <td style="text-align:right; color:#1d4ed8;">${fmtCurrency(invoice.total)}</td>
    </tr>
  </table>
</div>

<div class="footer">
  <span>FiberNMS · Platform Invoice · ${(/* @__PURE__ */ new Date()).getFullYear()}</span>
  <span>Generated ${(/* @__PURE__ */ new Date()).toLocaleString()}</span>
</div>
</body>
</html>`;
}
function downloadInvoicePdf(invoice) {
  const company = MOCK_COMPANIES.find((c) => c.id === invoice.companyId);
  const html = buildInvoiceHtml(invoice, company);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank");
  if (win) {
    win.onload = () => {
      win.print();
      URL.revokeObjectURL(url);
    };
  } else {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoice.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
const STATUS_COLORS = {
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30"
};
const STATUS_ICONS = {
  paid: CircleCheck,
  pending: Clock,
  failed: CircleX
};
const PLAN_COLORS = {
  [Plan.BASIC]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  [Plan.PROFESSIONAL]: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  [Plan.ENTERPRISE]: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  [Plan.ULTRA]: "bg-amber-500/15 text-amber-400 border-amber-500/30"
};
const PAGE_SIZE = 50;
function InvoiceDetailModal({
  invoice,
  onClose
}) {
  if (!invoice) return null;
  const company = MOCK_COMPANIES.find((c) => c.id === invoice.companyId);
  const taxLabel = invoice.taxType === "GST" ? "GST" : invoice.taxType === "VAT" ? "VAT" : null;
  const taxRate = invoice.taxType === "GST" ? 18 : invoice.taxType === "VAT" ? 20 : 0;
  const lineItems = invoice.lineItems ?? [
    {
      description: `FiberNMS ${(company == null ? void 0 : company.plan) ?? "Enterprise"} Subscription`,
      quantity: 1,
      unitPrice: invoice.amount,
      total: invoice.amount
    }
  ];
  const statusCls = invoice.status === "paid" ? STATUS_COLORS.paid : invoice.status === "failed" ? STATUS_COLORS.failed : STATUS_COLORS.pending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: !!invoice, onOpenChange: () => onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DialogContent,
    {
      className: "max-w-lg glass-elevated border border-border/40 shadow-2xl max-h-[90vh] overflow-y-auto",
      "data-ocid": "invoice-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "flex items-center gap-2 font-display text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4 text-primary" }),
          "Invoice ",
          invoice.id
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-muted/20 border border-border/30 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: invoice.companyName }),
            company && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: company.contactEmail }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                company.country,
                " · ",
                company.region,
                " region"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground/60 mt-1", children: "Tax ID: GST/VAT — N/A (on file)" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: `text-[9px] border shrink-0 capitalize ${statusCls}`,
              children: invoice.status
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/10 border border-border/20 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Issued" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground mt-0.5", children: fmtDate(invoice.issuedAt) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/10 border border-border/20 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Due" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground mt-0.5", children: fmtDate(invoice.dueAt) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/30 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-muted/30 px-4 py-2 border-b border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-semibold text-muted-foreground uppercase tracking-wider", children: "Line Items" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-muted/10 border-b border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2 font-medium", children: "Description" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-3 py-2 font-medium", children: "Qty" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-3 py-2 font-medium", children: "Unit Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2 font-medium", children: "Total" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border/20", children: lineItems.map((li, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-foreground", children: li.description }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-center text-muted-foreground font-mono", children: li.quantity }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2.5 text-right font-mono text-muted-foreground", children: fmtCurrency(li.unitPrice) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-mono font-semibold text-foreground", children: fmtCurrency(li.total) })
            ] }, `${li.description}-${idx}`)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/30 bg-muted/10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: fmtCurrency(invoice.amount) })
            ] }),
            invoice.taxAmount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 text-xs border-t border-border/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                taxLabel,
                " (",
                taxRate,
                "%)",
                taxLabel === "GST" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] ml-1 text-muted-foreground/60", children: "Goods & Services Tax" }),
                taxLabel === "VAT" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] ml-1 text-muted-foreground/60", children: "Value Added Tax" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: fmtCurrency(invoice.taxAmount) })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-2 text-xs border-t border-border/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Tax" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground/40", children: "No Tax" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 text-sm font-bold border-t border-border/20 bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Total Due" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground text-base", children: fmtCurrency(invoice.total) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-muted/10 border border-border/20 p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-foreground", children: "Visa •••• 4242" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Auto-charge on billing cycle renewal" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] border bg-emerald-500/15 text-emerald-400 border-emerald-500/30", children: "Active" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "flex-1 gap-2",
              onClick: () => downloadInvoicePdf(invoice),
              "data-ocid": "btn-download-invoice-pdf",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Printer, { className: "w-3.5 h-3.5" }),
                "Download PDF"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5",
              onClick: () => downloadInvoicePdf(invoice),
              "data-ocid": "btn-print-invoice",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Save"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: onClose,
              "data-ocid": "btn-close-invoice-modal",
              children: "Close"
            }
          )
        ] })
      ]
    }
  ) });
}
const LIFECYCLE_STAGES = [
  {
    label: "Trial",
    color: "bg-blue-500/20 border-blue-500/40 text-blue-400",
    dot: "bg-blue-500"
  },
  {
    label: "Active",
    color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
    dot: "bg-emerald-500"
  },
  {
    label: "Renewal",
    color: "bg-violet-500/20 border-violet-500/40 text-violet-400",
    dot: "bg-violet-500"
  },
  {
    label: "Expired",
    color: "bg-muted/30 border-border/40 text-muted-foreground",
    dot: "bg-muted-foreground"
  }
];
function LifecycleStepper() {
  const counts = reactExports.useMemo(
    () => ({
      Trial: MOCK_COMPANIES.filter((c) => c.status === "trial").length,
      Active: MOCK_COMPANIES.filter((c) => c.status === "active").length,
      Renewal: Math.round(
        MOCK_COMPANIES.filter((c) => c.status === "active").length * 0.3
      ),
      Expired: MOCK_COMPANIES.filter((c) => c.status === "expired").length
    }),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4 text-violet-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Subscription Lifecycle" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0 overflow-x-auto pb-1", children: LIFECYCLE_STAGES.map((stage, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex flex-col items-center px-4 py-3 rounded-xl border ${stage.color} min-w-[100px]`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full ${stage.dot} mb-1.5` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold", children: stage.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-display font-bold text-foreground mt-0.5", children: counts[stage.label] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground", children: "companies" })
          ]
        }
      ),
      i < LIFECYCLE_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 text-muted-foreground/50 shrink-0 mx-1" })
    ] }, stage.label)) })
  ] });
}
function ProrationCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-blue-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-foreground", children: "Proration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "text-[9px] border bg-blue-500/15 text-blue-400 border-blue-500/30 ml-auto", children: "Upgrade mid-month" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-muted/10 border border-border/20 p-4 space-y-3 text-xs font-mono", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Current plan (PROFESSIONAL)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "$499/mo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "New plan (ENTERPRISE)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "$1,499/mo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/20 pt-2 space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Days used (PRO) — 15 of 30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400", children: "−$249.50" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-[10px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Days remaining (ENT) — 15 of 30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-emerald-400", children: "+$749.50" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/20 pt-2 flex justify-between font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Prorated charge today" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "$500.00" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] text-muted-foreground leading-relaxed", children: "Next full billing on the 1st of next month at $1,499/mo. Proration is calculated to the nearest day." })
    ] })
  ] });
}
function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPrev,
  onNext
}) {
  const from = Math.min((page - 1) * pageSize + 1, total);
  const to = Math.min(page * pageSize, total);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-border/20 text-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
      "Showing",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground font-semibold", children: from }),
      "–",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground font-semibold", children: to }),
      " of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground font-semibold", children: total }),
      " ",
      "records"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-7 px-2 gap-1",
          disabled: page <= 1,
          onClick: onPrev,
          "data-ocid": "btn-page-prev",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3 h-3" }),
            "Prev"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-muted-foreground px-1", children: [
        page,
        " / ",
        totalPages
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          className: "h-7 px-2 gap-1",
          disabled: page >= totalPages,
          onClick: onNext,
          "data-ocid": "btn-page-next",
          children: [
            "Next",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3 h-3" })
          ]
        }
      )
    ] })
  ] });
}
function OrdersInvoices() {
  const [tab, setTab] = reactExports.useState("orders");
  const [search, setSearch] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [planFilter, setPlanFilter] = reactExports.useState("all");
  const [cycleFilter, setCycleFilter] = reactExports.useState("all");
  const [regionFilter, setRegionFilter] = reactExports.useState("all");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [orderPage, setOrderPage] = reactExports.useState(1);
  const [invoicePage, setInvoicePage] = reactExports.useState(1);
  const [selectedInvoice, setSelectedInvoice] = reactExports.useState(null);
  const filteredOrders = reactExports.useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      if (search && !o.companyName.toLowerCase().includes(search.toLowerCase()) && !o.id.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (planFilter !== "all" && o.plan !== planFilter) return false;
      if (cycleFilter !== "all" && o.billingCycle !== cycleFilter) return false;
      if (dateFrom && o.createdAt < dateFrom) return false;
      if (dateTo && o.createdAt > `${dateTo}T23:59:59`) return false;
      return true;
    });
  }, [search, statusFilter, planFilter, cycleFilter, dateFrom, dateTo]);
  const filteredInvoices = reactExports.useMemo(() => {
    return MOCK_INVOICES.filter((inv) => {
      if (search && !inv.companyName.toLowerCase().includes(search.toLowerCase()) && !inv.id.toLowerCase().includes(search.toLowerCase()))
        return false;
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (regionFilter !== "all" && inv.region !== regionFilter) return false;
      if (dateFrom && inv.issuedAt < dateFrom) return false;
      if (dateTo && inv.issuedAt > `${dateTo}T23:59:59`) return false;
      return true;
    });
  }, [search, statusFilter, regionFilter, dateFrom, dateTo]);
  const orderStats = reactExports.useMemo(
    () => ({
      total: MOCK_ORDERS.length,
      paid: MOCK_ORDERS.filter((o) => o.status === "paid").length,
      pending: MOCK_ORDERS.filter((o) => o.status === "pending").length,
      failed: MOCK_ORDERS.filter((o) => o.status === "failed").length,
      totalRevenue: MOCK_ORDERS.filter((o) => o.status === "paid").reduce(
        (s, o) => s + o.price,
        0
      )
    }),
    []
  );
  const ordersPageData = reactExports.useMemo(
    () => filteredOrders.slice((orderPage - 1) * PAGE_SIZE, orderPage * PAGE_SIZE),
    [filteredOrders, orderPage]
  );
  const invoicesPageData = reactExports.useMemo(
    () => filteredInvoices.slice(
      (invoicePage - 1) * PAGE_SIZE,
      invoicePage * PAGE_SIZE
    ),
    [filteredInvoices, invoicePage]
  );
  const orderTotalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / PAGE_SIZE)
  );
  const invoiceTotalPages = Math.max(
    1,
    Math.ceil(filteredInvoices.length / PAGE_SIZE)
  );
  const hasActiveFilters = !!search || statusFilter !== "all" || planFilter !== "all" || cycleFilter !== "all" || regionFilter !== "all" || !!dateFrom || !!dateTo;
  const handleReset = () => {
    setSearch("");
    setStatusFilter("all");
    setPlanFilter("all");
    setCycleFilter("all");
    setRegionFilter("all");
    setDateFrom("");
    setDateTo("");
    setOrderPage(1);
    setInvoicePage(1);
  };
  const handleExportOrders = () => {
    exportCsv(
      "orders.csv",
      [
        "Order ID",
        "Company",
        "Plan",
        "Price",
        "Billing Cycle",
        "Status",
        "Created At",
        "Due Date",
        "Paid At"
      ],
      filteredOrders.map((o) => [
        o.id,
        o.companyName,
        o.plan,
        String(o.price),
        o.billingCycle,
        o.status,
        fmtDate(o.createdAt),
        fmtDate(o.dueDate),
        o.paidAt ? fmtDate(o.paidAt) : "—"
      ])
    );
  };
  const handleExportInvoices = () => {
    exportCsv(
      "invoices.csv",
      [
        "Invoice ID",
        "Company",
        "Subtotal",
        "Tax %",
        "Tax Amount",
        "Total",
        "Status",
        "Issued At",
        "Due At"
      ],
      filteredInvoices.map((inv) => [
        inv.id,
        inv.companyName,
        String(inv.amount),
        `${(inv.tax * 100).toFixed(0)}%`,
        String(inv.taxAmount),
        String(inv.total),
        inv.status,
        fmtDate(inv.issuedAt),
        fmtDate(inv.dueAt)
      ])
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-4 md:space-y-5 max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "flex items-center justify-between flex-wrap gap-3",
        initial: { opacity: 0, y: -8 },
        animate: { opacity: 1, y: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-5 h-5 text-amber-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: "Orders & Invoices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Manage all subscription orders and billing records" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              variant: "outline",
              className: "h-8 text-xs gap-1.5",
              onClick: tab === "orders" ? handleExportOrders : handleExportInvoices,
              "data-ocid": "btn-export-csv",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                "Export ",
                tab === "orders" ? "Orders" : "Invoices",
                " CSV"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-5 gap-3", children: [
      {
        label: "Total Orders",
        val: orderStats.total.toString(),
        cls: "text-blue-400"
      },
      {
        label: "Paid",
        val: orderStats.paid.toString(),
        cls: "text-emerald-400"
      },
      {
        label: "Pending",
        val: orderStats.pending.toString(),
        cls: "text-amber-400"
      },
      {
        label: "Failed",
        val: orderStats.failed.toString(),
        cls: "text-red-400"
      },
      {
        label: "Collected Revenue",
        val: `$${(orderStats.totalRevenue / 1e3).toFixed(0)}K`,
        cls: "text-violet-400"
      }
    ].map(({ label, val, cls }, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xl font-display font-bold mt-1 ${cls}`, children: val })
        ] })
      },
      label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LifecycleStepper, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProrationCard, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-muted/30 rounded-lg p-1 shrink-0", children: ["orders", "invoices"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setTab(t);
              setStatusFilter("all");
              setOrderPage(1);
              setInvoicePage(1);
            },
            className: `px-3 py-1.5 rounded-md text-xs font-medium transition-smooth capitalize ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
            "data-ocid": `tab-${t}`,
            children: t === "orders" ? `Orders (${MOCK_ORDERS.length})` : `Invoices (${MOCK_INVOICES.length})`
          },
          t
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[160px]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              placeholder: tab === "orders" ? "Search by order ID or company…" : "Search by invoice # or company…",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
                setOrderPage(1);
                setInvoicePage(1);
              },
              className: "pl-9 h-8 text-xs bg-background/50",
              "data-ocid": "input-search"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: statusFilter,
            onValueChange: (v) => {
              setStatusFilter(v);
              setOrderPage(1);
              setInvoicePage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-32 bg-background/50",
                  "data-ocid": "filter-status",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Status" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Statuses" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "paid", children: "Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "pending", children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "failed", children: "Failed" }),
                tab === "invoices" && /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "overdue", children: "Overdue" })
              ] })
            ]
          }
        ),
        tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: planFilter,
            onValueChange: (v) => {
              setPlanFilter(v);
              setOrderPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-32 bg-background/50",
                  "data-ocid": "filter-plan",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Plan" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Plans" }),
                Object.values(Plan).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p, children: p }, p))
              ] })
            ]
          }
        ),
        tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: cycleFilter,
            onValueChange: (v) => {
              setCycleFilter(v);
              setOrderPage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-32 bg-background/50",
                  "data-ocid": "filter-cycle",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Cycle" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Cycles" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "monthly", children: "Monthly" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "yearly", children: "Yearly" })
              ] })
            ]
          }
        ),
        tab === "invoices" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Select,
          {
            value: regionFilter,
            onValueChange: (v) => {
              setRegionFilter(v);
              setInvoicePage(1);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "h-8 text-xs w-28 bg-background/50",
                  "data-ocid": "filter-region",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Region" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "all", children: "All Regions" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "India", children: "India" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "US", children: "US" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "EU", children: "EU" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "APAC", children: "APAC" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "MENA", children: "MENA" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateFrom,
            onChange: (e) => {
              setDateFrom(e.target.value);
              setOrderPage(1);
              setInvoicePage(1);
            },
            className: "h-8 text-xs w-36 bg-background/50",
            "data-ocid": "filter-date-from",
            "aria-label": "From date"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            type: "date",
            value: dateTo,
            onChange: (e) => {
              setDateTo(e.target.value);
              setOrderPage(1);
              setInvoicePage(1);
            },
            className: "h-8 text-xs w-36 bg-background/50",
            "data-ocid": "filter-date-to",
            "aria-label": "To date"
          }
        ),
        hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "ghost",
            size: "sm",
            className: "h-8 text-xs text-muted-foreground hover:text-foreground gap-1",
            onClick: handleReset,
            "data-ocid": "btn-reset-filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
              "Reset"
            ]
          }
        )
      ] }),
      hasActiveFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5", children: [
        search && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] gap-1 cursor-pointer",
            onClick: () => setSearch(""),
            children: [
              "Search: ",
              search,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
            ]
          }
        ),
        statusFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] gap-1 capitalize cursor-pointer",
            onClick: () => setStatusFilter("all"),
            children: [
              statusFilter,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
            ]
          }
        ),
        planFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] gap-1 cursor-pointer",
            onClick: () => setPlanFilter("all"),
            children: [
              planFilter,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
            ]
          }
        ),
        cycleFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] gap-1 capitalize cursor-pointer",
            onClick: () => setCycleFilter("all"),
            children: [
              cycleFilter,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
            ]
          }
        ),
        regionFilter !== "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Badge,
          {
            variant: "outline",
            className: "text-[10px] gap-1 cursor-pointer",
            onClick: () => setRegionFilter("all"),
            children: [
              regionFilter,
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-2.5 h-2.5" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: tab === "orders" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border/20", children: ordersPageData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center py-12 text-sm text-muted-foreground", children: "No orders match the current filters" }) : ordersPageData.map((order) => {
          const StatusIcon = STATUS_ICONS[order.status];
          const invoiceForOrder = MOCK_INVOICES.find(
            (inv) => inv.orderId === order.id
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-4 space-y-2.5",
              "data-ocid": `order-card-${order.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: order.companyName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground", children: order.id })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatusIcon,
                      {
                        className: `w-3.5 h-3.5 ${STATUS_COLORS[order.status].split(" ")[1]}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[9px] border ${STATUS_COLORS[order.status]} capitalize`,
                        children: order.status
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[9px] border ${PLAN_COLORS[order.plan]}`,
                        children: order.plan
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-[10px] font-mono px-1.5 py-0.5 rounded border capitalize ${order.billingCycle === "yearly" ? "bg-violet-500/10 text-violet-400 border-violet-500/30" : "bg-muted/20 text-muted-foreground border-border/30"}`,
                        children: order.billingCycle
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-mono font-bold text-foreground", children: [
                    "$",
                    order.price.toLocaleString()
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Created: ",
                    fmtDate(order.createdAt)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Due: ",
                    fmtDate(order.dueDate)
                  ] })
                ] }),
                invoiceForOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "h-8 w-full text-[11px] gap-1 text-primary",
                    onClick: () => setSelectedInvoice(invoiceForOrder),
                    "data-ocid": `btn-view-invoice-mobile-${order.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                      " View Invoice"
                    ]
                  }
                )
              ]
            },
            order.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs hidden md:table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/20 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Order ID" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Plan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold", children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Cycle" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Created" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Due Date" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Paid" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: ordersPageData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 10,
              className: "py-12 text-center text-muted-foreground",
              children: "No orders match the current filters"
            }
          ) }) : ordersPageData.map((order, i) => {
            const StatusIcon = STATUS_ICONS[order.status];
            const invoiceForOrder = MOCK_INVOICES.find(
              (inv) => inv.orderId === order.id
            );
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border/20 hover:bg-muted/15 transition-colors group ${i % 2 === 1 ? "bg-muted/5" : ""}`,
                "data-ocid": `order-row-${order.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-[10px] text-muted-foreground", children: order.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium text-foreground max-w-[140px] truncate", children: order.companyName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[9px] border ${PLAN_COLORS[order.plan]}`,
                      children: order.plan
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-3 px-4 font-mono text-right text-foreground", children: [
                    "$",
                    order.price.toLocaleString()
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-[10px] font-mono px-1.5 py-0.5 rounded border capitalize ${order.billingCycle === "yearly" ? "bg-violet-500/10 text-violet-400 border-violet-500/30" : "bg-muted/20 text-muted-foreground border-border/30"}`,
                      children: order.billingCycle
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      StatusIcon,
                      {
                        className: `w-3.5 h-3.5 ${STATUS_COLORS[order.status].split(" ")[1]}`
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        className: `text-[9px] border ${STATUS_COLORS[order.status]} capitalize`,
                        children: order.status
                      }
                    )
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-[10px] text-muted-foreground", children: fmtDate(order.createdAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-[10px] text-muted-foreground", children: fmtDate(order.dueDate) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-[10px] text-muted-foreground", children: order.paidAt ? fmtDate(order.paidAt) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                    invoiceForOrder && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-6 px-2 text-[10px] gap-1 text-primary hover:text-primary",
                        onClick: () => setSelectedInvoice(invoiceForOrder),
                        "data-ocid": `btn-view-invoice-${order.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3" }),
                          "Invoice"
                        ]
                      }
                    ),
                    order.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-6 px-2 text-[10px] gap-1 text-emerald-400 hover:text-emerald-300",
                        "data-ocid": `btn-mark-paid-${order.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                          "Mark Paid"
                        ]
                      }
                    ),
                    order.status === "failed" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "ghost",
                        size: "sm",
                        className: "h-6 px-2 text-[10px] gap-1 text-amber-400 hover:text-amber-300",
                        "data-ocid": `btn-retry-${order.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3 h-3" }),
                          "Retry"
                        ]
                      }
                    )
                  ] }) })
                ]
              },
              order.id
            );
          }) })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden divide-y divide-border/20", children: invoicesPageData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center py-12 text-sm text-muted-foreground", children: "No invoices match the current filters" }) : invoicesPageData.map((invoice) => {
          const statusCls = invoice.status === "paid" ? STATUS_COLORS.paid : invoice.status === "failed" ? STATUS_COLORS.failed : STATUS_COLORS.pending;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              className: "w-full p-4 space-y-2.5 text-left hover:bg-muted/10 transition-colors",
              onClick: () => setSelectedInvoice(invoice),
              "data-ocid": `invoice-card-${invoice.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: invoice.companyName }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-primary", children: invoice.id })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[9px] border capitalize shrink-0 ${statusCls}`,
                      children: invoice.status
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[10px] text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Issued: ",
                      fmtDate(invoice.issuedAt)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5", children: "·" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      "Due: ",
                      fmtDate(invoice.dueAt)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-mono font-bold text-foreground", children: fmtCurrency(invoice.total) })
                ] }),
                invoice.taxAmount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
                  "Tax (",
                  invoice.taxType,
                  "):",
                  " ",
                  fmtCurrency(invoice.taxAmount)
                ] })
              ]
            },
            invoice.id
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs hidden md:table", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "border-b border-border/40 bg-muted/20 sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Invoice #" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Company" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold", children: "Subtotal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold", children: "Tax" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right py-3 px-4 font-semibold", children: "Total" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Issued" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left py-3 px-4 font-semibold", children: "Due" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-3 px-4 font-semibold", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: invoicesPageData.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "td",
            {
              colSpan: 9,
              className: "py-12 text-center text-muted-foreground",
              children: "No invoices match the current filters"
            }
          ) }) : invoicesPageData.map((invoice, i) => {
            const statusCls = invoice.status === "paid" ? STATUS_COLORS.paid : invoice.status === "failed" ? STATUS_COLORS.failed : STATUS_COLORS.pending;
            const taxLabel = invoice.taxType === "GST" ? "GST" : invoice.taxType === "VAT" ? "VAT" : null;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "tr",
              {
                className: `border-b border-border/20 hover:bg-muted/15 transition-colors group cursor-pointer ${i % 2 === 1 ? "bg-muted/5" : ""}`,
                onClick: () => setSelectedInvoice(invoice),
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ")
                    setSelectedInvoice(invoice);
                },
                tabIndex: 0,
                "data-ocid": `invoice-row-${invoice.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-mono text-[10px] text-primary hover:underline cursor-pointer", children: invoice.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 font-medium text-foreground max-w-[140px] truncate", children: invoice.companyName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono text-muted-foreground", children: fmtCurrency(invoice.amount) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono text-muted-foreground", children: invoice.taxAmount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    (invoice.tax * 100).toFixed(0),
                    "%",
                    taxLabel ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1 text-[9px] opacity-70", children: [
                      "(",
                      taxLabel,
                      ")"
                    ] }) : null
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/40", children: "—" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-right font-mono font-semibold text-foreground", children: fmtCurrency(invoice.total) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-[9px] border ${statusCls} capitalize`,
                      children: invoice.status
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-[10px] text-muted-foreground", children: fmtDate(invoice.issuedAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4 text-[10px] text-muted-foreground", children: fmtDate(invoice.dueAt) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-6 w-6",
                        "aria-label": "View invoice",
                        onClick: (e) => {
                          e.stopPropagation();
                          setSelectedInvoice(invoice);
                        },
                        "data-ocid": `btn-view-invoice-${invoice.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3 text-primary" })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        variant: "ghost",
                        size: "icon",
                        className: "h-6 w-6",
                        "aria-label": "Download invoice PDF",
                        onClick: (e) => {
                          e.stopPropagation();
                          downloadInvoicePdf(invoice);
                        },
                        "data-ocid": `btn-download-invoice-${invoice.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3 h-3 text-muted-foreground hover:text-foreground" })
                      }
                    )
                  ] }) })
                ]
              },
              invoice.id
            );
          }) })
        ] })
      ] }) }),
      tab === "orders" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pagination,
        {
          page: orderPage,
          totalPages: orderTotalPages,
          total: filteredOrders.length,
          pageSize: PAGE_SIZE,
          onPrev: () => setOrderPage((p) => Math.max(1, p - 1)),
          onNext: () => setOrderPage((p) => Math.min(orderTotalPages, p + 1))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pagination,
        {
          page: invoicePage,
          totalPages: invoiceTotalPages,
          total: filteredInvoices.length,
          pageSize: PAGE_SIZE,
          onPrev: () => setInvoicePage((p) => Math.max(1, p - 1)),
          onNext: () => setInvoicePage((p) => Math.min(invoiceTotalPages, p + 1))
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InvoiceDetailModal,
      {
        invoice: selectedInvoice,
        onClose: () => setSelectedInvoice(null)
      }
    )
  ] });
}
export {
  OrdersInvoices as default
};
