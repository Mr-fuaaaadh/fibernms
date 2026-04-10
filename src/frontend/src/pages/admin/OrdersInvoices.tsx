import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type Invoice,
  MOCK_COMPANIES,
  MOCK_INVOICES,
  MOCK_ORDERS,
  type Order,
  type OrderStatus,
} from "@/data/superAdminMockData";
import { Plan } from "@/types/subscription";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Download,
  FileText,
  Info,
  Printer,
  Receipt,
  RefreshCw,
  Search,
  X,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function fmtCurrency(n: number): string {
  return `$${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function exportCsv(filename: string, headers: string[], rows: string[][]) {
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── PDF Download helper ──────────────────────────────────────────────────────

function buildInvoiceHtml(
  invoice: Invoice,
  company: (typeof MOCK_COMPANIES)[0] | undefined,
): string {
  const taxLabel =
    invoice.taxType === "GST"
      ? "GST (18%)"
      : invoice.taxType === "VAT"
        ? "VAT (20%)"
        : "No Tax";
  const lineItems = invoice.lineItems ?? [
    {
      description: `FiberNMS ${company?.plan ?? "Enterprise"} Subscription`,
      quantity: 1,
      unitPrice: invoice.amount,
      total: invoice.amount,
    },
  ];

  const lineItemsHtml = lineItems
    .map(
      (li) => `
    <tr>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb;">${li.description}</td>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; text-align:center;">${li.quantity}</td>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; text-align:right;">${fmtCurrency(li.unitPrice)}</td>
      <td style="padding:8px 12px; border-bottom:1px solid #e5e7eb; text-align:right; font-weight:600;">${fmtCurrency(li.total)}</td>
    </tr>`,
    )
    .join("");

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
  <span>FiberNMS · Platform Invoice · ${new Date().getFullYear()}</span>
  <span>Generated ${new Date().toLocaleString()}</span>
</div>
</body>
</html>`;
}

function downloadInvoicePdf(invoice: Invoice) {
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
    // Fallback: download the HTML file
    const a = document.createElement("a");
    a.href = url;
    a.download = `${invoice.id}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// ─── Config ───────────────────────────────────────────────────────────────────

const STATUS_COLORS: Record<OrderStatus, string> = {
  paid: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  failed: "bg-red-500/15 text-red-400 border-red-500/30",
};

const STATUS_ICONS: Record<OrderStatus, React.ElementType> = {
  paid: CheckCircle2,
  pending: Clock,
  failed: XCircle,
};

const PLAN_COLORS: Record<Plan, string> = {
  [Plan.BASIC]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  [Plan.PROFESSIONAL]: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  [Plan.ENTERPRISE]: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  [Plan.ULTRA]: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const PAGE_SIZE = 50;
type TabType = "orders" | "invoices";

// ─── Invoice Detail Modal ─────────────────────────────────────────────────────

function InvoiceDetailModal({
  invoice,
  onClose,
}: {
  invoice: Invoice | null;
  onClose: () => void;
}) {
  if (!invoice) return null;

  const company = MOCK_COMPANIES.find((c) => c.id === invoice.companyId);
  const taxLabel =
    invoice.taxType === "GST"
      ? "GST"
      : invoice.taxType === "VAT"
        ? "VAT"
        : null;
  const taxRate =
    invoice.taxType === "GST" ? 18 : invoice.taxType === "VAT" ? 20 : 0;

  const lineItems = invoice.lineItems ?? [
    {
      description: `FiberNMS ${company?.plan ?? "Enterprise"} Subscription`,
      quantity: 1,
      unitPrice: invoice.amount,
      total: invoice.amount,
    },
  ];

  const statusCls =
    invoice.status === "paid"
      ? STATUS_COLORS.paid
      : invoice.status === "failed"
        ? STATUS_COLORS.failed
        : STATUS_COLORS.pending;

  return (
    <Dialog open={!!invoice} onOpenChange={() => onClose()}>
      <DialogContent
        className="max-w-lg glass-elevated border border-border/40 shadow-2xl max-h-[90vh] overflow-y-auto"
        data-ocid="invoice-modal"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-display text-base">
            <Receipt className="w-4 h-4 text-primary" />
            Invoice {invoice.id}
          </DialogTitle>
        </DialogHeader>

        {/* Company Info block */}
        <div className="rounded-xl bg-muted/20 border border-border/30 p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-foreground">
                {invoice.companyName}
              </p>
              {company && (
                <>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {company.contactEmail}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {company.country} · {company.region} region
                  </p>
                </>
              )}
              <p className="text-[10px] text-muted-foreground/60 mt-1">
                Tax ID: GST/VAT — N/A (on file)
              </p>
            </div>
            <Badge
              className={`text-[9px] border shrink-0 capitalize ${statusCls}`}
            >
              {invoice.status}
            </Badge>
          </div>
        </div>

        {/* Issue / Due Dates */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted/10 border border-border/20 p-3">
            <p className="text-[10px] text-muted-foreground">Issued</p>
            <p className="text-xs font-medium text-foreground mt-0.5">
              {fmtDate(invoice.issuedAt)}
            </p>
          </div>
          <div className="rounded-lg bg-muted/10 border border-border/20 p-3">
            <p className="text-[10px] text-muted-foreground">Due</p>
            <p className="text-xs font-medium text-foreground mt-0.5">
              {fmtDate(invoice.dueAt)}
            </p>
          </div>
        </div>

        {/* Line Items table */}
        <div className="rounded-xl border border-border/30 overflow-hidden">
          <div className="bg-muted/30 px-4 py-2 border-b border-border/20">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
              Line Items
            </p>
          </div>
          <table className="w-full text-xs">
            <thead className="bg-muted/10 border-b border-border/20">
              <tr className="text-muted-foreground">
                <th className="text-left px-4 py-2 font-medium">Description</th>
                <th className="text-center px-3 py-2 font-medium">Qty</th>
                <th className="text-right px-3 py-2 font-medium">Unit Price</th>
                <th className="text-right px-4 py-2 font-medium">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {lineItems.map((li, idx) => (
                <tr key={`${li.description}-${idx}`}>
                  <td className="px-4 py-2.5 text-foreground">
                    {li.description}
                  </td>
                  <td className="px-3 py-2.5 text-center text-muted-foreground font-mono">
                    {li.quantity}
                  </td>
                  <td className="px-3 py-2.5 text-right font-mono text-muted-foreground">
                    {fmtCurrency(li.unitPrice)}
                  </td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold text-foreground">
                    {fmtCurrency(li.total)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Subtotal / Tax / Total */}
          <div className="border-t border-border/30 bg-muted/10">
            <div className="flex items-center justify-between px-4 py-2 text-xs">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-mono text-foreground">
                {fmtCurrency(invoice.amount)}
              </span>
            </div>
            {invoice.taxAmount > 0 ? (
              <div className="flex items-center justify-between px-4 py-2 text-xs border-t border-border/20">
                <span className="text-muted-foreground">
                  {taxLabel} ({taxRate}%)
                  {taxLabel === "GST" && (
                    <span className="text-[9px] ml-1 text-muted-foreground/60">
                      Goods &amp; Services Tax
                    </span>
                  )}
                  {taxLabel === "VAT" && (
                    <span className="text-[9px] ml-1 text-muted-foreground/60">
                      Value Added Tax
                    </span>
                  )}
                </span>
                <span className="font-mono text-muted-foreground">
                  {fmtCurrency(invoice.taxAmount)}
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between px-4 py-2 text-xs border-t border-border/20">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-mono text-muted-foreground/40">
                  No Tax
                </span>
              </div>
            )}
            <div className="flex items-center justify-between px-4 py-3 text-sm font-bold border-t border-border/20 bg-muted/20">
              <span className="text-foreground">Total Due</span>
              <span className="font-mono text-foreground text-base">
                {fmtCurrency(invoice.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex items-center gap-3 rounded-xl bg-muted/10 border border-border/20 p-4">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-foreground">
              Visa •••• 4242
            </p>
            <p className="text-[10px] text-muted-foreground">
              Auto-charge on billing cycle renewal
            </p>
          </div>
          <Badge className="text-[9px] border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
            Active
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          <Button
            className="flex-1 gap-2"
            onClick={() => downloadInvoicePdf(invoice)}
            data-ocid="btn-download-invoice-pdf"
          >
            <Printer className="w-3.5 h-3.5" />
            Download PDF
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => downloadInvoicePdf(invoice)}
            data-ocid="btn-print-invoice"
          >
            <Download className="w-3.5 h-3.5" />
            Save
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            data-ocid="btn-close-invoice-modal"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Lifecycle Stepper ────────────────────────────────────────────────────────

const LIFECYCLE_STAGES = [
  {
    label: "Trial",
    color: "bg-blue-500/20 border-blue-500/40 text-blue-400",
    dot: "bg-blue-500",
  },
  {
    label: "Active",
    color: "bg-emerald-500/20 border-emerald-500/40 text-emerald-400",
    dot: "bg-emerald-500",
  },
  {
    label: "Renewal",
    color: "bg-violet-500/20 border-violet-500/40 text-violet-400",
    dot: "bg-violet-500",
  },
  {
    label: "Expired",
    color: "bg-muted/30 border-border/40 text-muted-foreground",
    dot: "bg-muted-foreground",
  },
];

function LifecycleStepper() {
  const counts = useMemo(
    () => ({
      Trial: MOCK_COMPANIES.filter((c) => c.status === "trial").length,
      Active: MOCK_COMPANIES.filter((c) => c.status === "active").length,
      Renewal: Math.round(
        MOCK_COMPANIES.filter((c) => c.status === "active").length * 0.3,
      ),
      Expired: MOCK_COMPANIES.filter((c) => c.status === "expired").length,
    }),
    [],
  );

  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <RefreshCw className="w-4 h-4 text-violet-400" />
        <h2 className="text-sm font-display font-semibold text-foreground">
          Subscription Lifecycle
        </h2>
      </div>
      <div className="flex items-center gap-0 overflow-x-auto pb-1">
        {LIFECYCLE_STAGES.map((stage, i) => (
          <div key={stage.label} className="flex items-center">
            <div
              className={`flex flex-col items-center px-4 py-3 rounded-xl border ${stage.color} min-w-[100px]`}
            >
              <div className={`w-2 h-2 rounded-full ${stage.dot} mb-1.5`} />
              <span className="text-[11px] font-semibold">{stage.label}</span>
              <span className="text-lg font-display font-bold text-foreground mt-0.5">
                {counts[stage.label as keyof typeof counts]}
              </span>
              <span className="text-[9px] text-muted-foreground">
                companies
              </span>
            </div>
            {i < LIFECYCLE_STAGES.length - 1 && (
              <ChevronRight className="w-5 h-5 text-muted-foreground/50 shrink-0 mx-1" />
            )}
          </div>
        ))}
      </div>
    </GlassCard>
  );
}

// ─── Proration Card ───────────────────────────────────────────────────────────

function ProrationCard() {
  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-blue-400" />
        <h2 className="text-sm font-display font-semibold text-foreground">
          Proration
        </h2>
        <Badge className="text-[9px] border bg-blue-500/15 text-blue-400 border-blue-500/30 ml-auto">
          Upgrade mid-month
        </Badge>
      </div>
      <div className="rounded-xl bg-muted/10 border border-border/20 p-4 space-y-3 text-xs font-mono">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Current plan (PROFESSIONAL)
          </span>
          <span className="text-foreground">$499/mo</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">New plan (ENTERPRISE)</span>
          <span className="text-foreground">$1,499/mo</span>
        </div>
        <div className="border-t border-border/20 pt-2 space-y-1.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">
              Days used (PRO) — 15 of 30
            </span>
            <span className="text-red-400">−$249.50</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span className="text-muted-foreground">
              Days remaining (ENT) — 15 of 30
            </span>
            <span className="text-emerald-400">+$749.50</span>
          </div>
        </div>
        <div className="border-t border-border/20 pt-2 flex justify-between font-bold">
          <span className="text-foreground">Prorated charge today</span>
          <span className="text-primary">$500.00</span>
        </div>
        <p className="text-[9px] text-muted-foreground leading-relaxed">
          Next full billing on the 1st of next month at $1,499/mo. Proration is
          calculated to the nearest day.
        </p>
      </div>
    </GlassCard>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  page,
  totalPages,
  total,
  pageSize,
  onPrev,
  onNext,
}: {
  page: number;
  totalPages: number;
  total: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  const from = Math.min((page - 1) * pageSize + 1, total);
  const to = Math.min(page * pageSize, total);
  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-border/20 text-xs">
      <span className="text-muted-foreground">
        Showing{" "}
        <span className="font-mono text-foreground font-semibold">{from}</span>–
        <span className="font-mono text-foreground font-semibold">{to}</span> of{" "}
        <span className="font-mono text-foreground font-semibold">{total}</span>{" "}
        records
      </span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 gap-1"
          disabled={page <= 1}
          onClick={onPrev}
          data-ocid="btn-page-prev"
        >
          <ArrowLeft className="w-3 h-3" />
          Prev
        </Button>
        <span className="font-mono text-muted-foreground px-1">
          {page} / {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 gap-1"
          disabled={page >= totalPages}
          onClick={onNext}
          data-ocid="btn-page-next"
        >
          Next
          <ArrowRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OrdersInvoices(): React.ReactElement {
  const [tab, setTab] = useState<TabType>("orders");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [planFilter, setPlanFilter] = useState("all");
  const [cycleFilter, setCycleFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [orderPage, setOrderPage] = useState(1);
  const [invoicePage, setInvoicePage] = useState(1);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const filteredOrders = useMemo(() => {
    return MOCK_ORDERS.filter((o) => {
      if (
        search &&
        !o.companyName.toLowerCase().includes(search.toLowerCase()) &&
        !o.id.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      if (planFilter !== "all" && o.plan !== planFilter) return false;
      if (cycleFilter !== "all" && o.billingCycle !== cycleFilter) return false;
      if (dateFrom && o.createdAt < dateFrom) return false;
      if (dateTo && o.createdAt > `${dateTo}T23:59:59`) return false;
      return true;
    });
  }, [search, statusFilter, planFilter, cycleFilter, dateFrom, dateTo]);

  const filteredInvoices = useMemo(() => {
    return MOCK_INVOICES.filter((inv) => {
      if (
        search &&
        !inv.companyName.toLowerCase().includes(search.toLowerCase()) &&
        !inv.id.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (regionFilter !== "all" && inv.region !== regionFilter) return false;
      if (dateFrom && inv.issuedAt < dateFrom) return false;
      if (dateTo && inv.issuedAt > `${dateTo}T23:59:59`) return false;
      return true;
    });
  }, [search, statusFilter, regionFilter, dateFrom, dateTo]);

  const orderStats = useMemo(
    () => ({
      total: MOCK_ORDERS.length,
      paid: MOCK_ORDERS.filter((o) => o.status === "paid").length,
      pending: MOCK_ORDERS.filter((o) => o.status === "pending").length,
      failed: MOCK_ORDERS.filter((o) => o.status === "failed").length,
      totalRevenue: MOCK_ORDERS.filter((o) => o.status === "paid").reduce(
        (s, o) => s + o.price,
        0,
      ),
    }),
    [],
  );

  const ordersPageData = useMemo(
    () =>
      filteredOrders.slice((orderPage - 1) * PAGE_SIZE, orderPage * PAGE_SIZE),
    [filteredOrders, orderPage],
  );
  const invoicesPageData = useMemo(
    () =>
      filteredInvoices.slice(
        (invoicePage - 1) * PAGE_SIZE,
        invoicePage * PAGE_SIZE,
      ),
    [filteredInvoices, invoicePage],
  );

  const orderTotalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / PAGE_SIZE),
  );
  const invoiceTotalPages = Math.max(
    1,
    Math.ceil(filteredInvoices.length / PAGE_SIZE),
  );

  const hasActiveFilters =
    !!search ||
    statusFilter !== "all" ||
    planFilter !== "all" ||
    cycleFilter !== "all" ||
    regionFilter !== "all" ||
    !!dateFrom ||
    !!dateTo;

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
        "Paid At",
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
        o.paidAt ? fmtDate(o.paidAt) : "—",
      ]),
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
        "Due At",
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
        fmtDate(inv.dueAt),
      ]),
    );
  };

  return (
    <div className="p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        className="flex items-center justify-between flex-wrap gap-3"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-amber-400" />
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              Orders &amp; Invoices
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage all subscription orders and billing records
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          className="h-8 text-xs gap-1.5"
          onClick={tab === "orders" ? handleExportOrders : handleExportInvoices}
          data-ocid="btn-export-csv"
        >
          <Download className="w-3.5 h-3.5" />
          Export {tab === "orders" ? "Orders" : "Invoices"} CSV
        </Button>
      </motion.div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          {
            label: "Total Orders",
            val: orderStats.total.toString(),
            cls: "text-blue-400",
          },
          {
            label: "Paid",
            val: orderStats.paid.toString(),
            cls: "text-emerald-400",
          },
          {
            label: "Pending",
            val: orderStats.pending.toString(),
            cls: "text-amber-400",
          },
          {
            label: "Failed",
            val: orderStats.failed.toString(),
            cls: "text-red-400",
          },
          {
            label: "Collected Revenue",
            val: `$${(orderStats.totalRevenue / 1000).toFixed(0)}K`,
            cls: "text-violet-400",
          },
        ].map(({ label, val, cls }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className={`text-xl font-display font-bold mt-1 ${cls}`}>
                {val}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Lifecycle + Proration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <LifecycleStepper />
        </div>
        <ProrationCard />
      </div>

      {/* Tabs + Filters */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Tab toggle */}
          <div className="flex gap-1 bg-muted/30 rounded-lg p-1 shrink-0">
            {(["orders", "invoices"] as TabType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTab(t);
                  setStatusFilter("all");
                  setOrderPage(1);
                  setInvoicePage(1);
                }}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-smooth capitalize ${
                  tab === t
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-ocid={`tab-${t}`}
              >
                {t === "orders"
                  ? `Orders (${MOCK_ORDERS.length})`
                  : `Invoices (${MOCK_INVOICES.length})`}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative flex-1 min-w-[160px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder={
                tab === "orders"
                  ? "Search by order ID or company…"
                  : "Search by invoice # or company…"
              }
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOrderPage(1);
                setInvoicePage(1);
              }}
              className="pl-9 h-8 text-xs bg-background/50"
              data-ocid="input-search"
            />
          </div>

          {/* Status */}
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setOrderPage(1);
              setInvoicePage(1);
            }}
          >
            <SelectTrigger
              className="h-8 text-xs w-32 bg-background/50"
              data-ocid="filter-status"
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              {tab === "invoices" && (
                <SelectItem value="overdue">Overdue</SelectItem>
              )}
            </SelectContent>
          </Select>

          {/* Plan (orders only) */}
          {tab === "orders" && (
            <Select
              value={planFilter}
              onValueChange={(v) => {
                setPlanFilter(v);
                setOrderPage(1);
              }}
            >
              <SelectTrigger
                className="h-8 text-xs w-32 bg-background/50"
                data-ocid="filter-plan"
              >
                <SelectValue placeholder="Plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Plans</SelectItem>
                {Object.values(Plan).map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {/* Billing Cycle (orders only) */}
          {tab === "orders" && (
            <Select
              value={cycleFilter}
              onValueChange={(v) => {
                setCycleFilter(v);
                setOrderPage(1);
              }}
            >
              <SelectTrigger
                className="h-8 text-xs w-32 bg-background/50"
                data-ocid="filter-cycle"
              >
                <SelectValue placeholder="Cycle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cycles</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Region (invoices only) */}
          {tab === "invoices" && (
            <Select
              value={regionFilter}
              onValueChange={(v) => {
                setRegionFilter(v);
                setInvoicePage(1);
              }}
            >
              <SelectTrigger
                className="h-8 text-xs w-28 bg-background/50"
                data-ocid="filter-region"
              >
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="India">India</SelectItem>
                <SelectItem value="US">US</SelectItem>
                <SelectItem value="EU">EU</SelectItem>
                <SelectItem value="APAC">APAC</SelectItem>
                <SelectItem value="MENA">MENA</SelectItem>
              </SelectContent>
            </Select>
          )}

          {/* Date range */}
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setOrderPage(1);
              setInvoicePage(1);
            }}
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-date-from"
            aria-label="From date"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setOrderPage(1);
              setInvoicePage(1);
            }}
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-date-to"
            aria-label="To date"
          />

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs text-muted-foreground hover:text-foreground gap-1"
              onClick={handleReset}
              data-ocid="btn-reset-filters"
            >
              <X className="w-3 h-3" />
              Reset
            </Button>
          )}
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-1.5">
            {search && (
              <Badge
                variant="outline"
                className="text-[10px] gap-1 cursor-pointer"
                onClick={() => setSearch("")}
              >
                Search: {search} <X className="w-2.5 h-2.5" />
              </Badge>
            )}
            {statusFilter !== "all" && (
              <Badge
                variant="outline"
                className="text-[10px] gap-1 capitalize cursor-pointer"
                onClick={() => setStatusFilter("all")}
              >
                {statusFilter} <X className="w-2.5 h-2.5" />
              </Badge>
            )}
            {planFilter !== "all" && (
              <Badge
                variant="outline"
                className="text-[10px] gap-1 cursor-pointer"
                onClick={() => setPlanFilter("all")}
              >
                {planFilter} <X className="w-2.5 h-2.5" />
              </Badge>
            )}
            {cycleFilter !== "all" && (
              <Badge
                variant="outline"
                className="text-[10px] gap-1 capitalize cursor-pointer"
                onClick={() => setCycleFilter("all")}
              >
                {cycleFilter} <X className="w-2.5 h-2.5" />
              </Badge>
            )}
            {regionFilter !== "all" && (
              <Badge
                variant="outline"
                className="text-[10px] gap-1 cursor-pointer"
                onClick={() => setRegionFilter("all")}
              >
                {regionFilter} <X className="w-2.5 h-2.5" />
              </Badge>
            )}
          </div>
        )}
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          {tab === "orders" ? (
            <table className="w-full text-xs">
              <thead className="border-b border-border/40 bg-muted/20 sticky top-0 z-10">
                <tr className="text-muted-foreground">
                  <th className="text-left py-3 px-4 font-semibold">
                    Order ID
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Company</th>
                  <th className="text-left py-3 px-4 font-semibold">Plan</th>
                  <th className="text-right py-3 px-4 font-semibold">Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Cycle</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Created</th>
                  <th className="text-left py-3 px-4 font-semibold">
                    Due Date
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Paid</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ordersPageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="py-12 text-center text-muted-foreground"
                    >
                      No orders match the current filters
                    </td>
                  </tr>
                ) : (
                  ordersPageData.map((order: Order, i) => {
                    const StatusIcon = STATUS_ICONS[order.status];
                    const invoiceForOrder = MOCK_INVOICES.find(
                      (inv) => inv.orderId === order.id,
                    );
                    return (
                      <tr
                        key={order.id}
                        className={`border-b border-border/20 hover:bg-muted/15 transition-colors group ${i % 2 === 1 ? "bg-muted/5" : ""}`}
                        data-ocid={`order-row-${order.id}`}
                      >
                        <td className="py-3 px-4 font-mono text-[10px] text-muted-foreground">
                          {order.id}
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground max-w-[140px] truncate">
                          {order.companyName}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={`text-[9px] border ${PLAN_COLORS[order.plan]}`}
                          >
                            {order.plan}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 font-mono text-right text-foreground">
                          ${order.price.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.5 rounded border capitalize ${
                              order.billingCycle === "yearly"
                                ? "bg-violet-500/10 text-violet-400 border-violet-500/30"
                                : "bg-muted/20 text-muted-foreground border-border/30"
                            }`}
                          >
                            {order.billingCycle}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1.5">
                            <StatusIcon
                              className={`w-3.5 h-3.5 ${STATUS_COLORS[order.status].split(" ")[1]}`}
                            />
                            <Badge
                              className={`text-[9px] border ${STATUS_COLORS[order.status]} capitalize`}
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-[10px] text-muted-foreground">
                          {fmtDate(order.createdAt)}
                        </td>
                        <td className="py-3 px-4 text-[10px] text-muted-foreground">
                          {fmtDate(order.dueDate)}
                        </td>
                        <td className="py-3 px-4 text-[10px] text-muted-foreground">
                          {order.paidAt ? (
                            fmtDate(order.paidAt)
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            {invoiceForOrder && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[10px] gap-1 text-primary hover:text-primary"
                                onClick={() =>
                                  setSelectedInvoice(invoiceForOrder)
                                }
                                data-ocid={`btn-view-invoice-${order.id}`}
                              >
                                <FileText className="w-3 h-3" />
                                Invoice
                              </Button>
                            )}
                            {order.status === "pending" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[10px] gap-1 text-emerald-400 hover:text-emerald-300"
                                data-ocid={`btn-mark-paid-${order.id}`}
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Mark Paid
                              </Button>
                            )}
                            {order.status === "failed" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 px-2 text-[10px] gap-1 text-amber-400 hover:text-amber-300"
                                data-ocid={`btn-retry-${order.id}`}
                              >
                                <RefreshCw className="w-3 h-3" />
                                Retry
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-xs">
              <thead className="border-b border-border/40 bg-muted/20 sticky top-0 z-10">
                <tr className="text-muted-foreground">
                  <th className="text-left py-3 px-4 font-semibold">
                    Invoice #
                  </th>
                  <th className="text-left py-3 px-4 font-semibold">Company</th>
                  <th className="text-right py-3 px-4 font-semibold">
                    Subtotal
                  </th>
                  <th className="text-right py-3 px-4 font-semibold">Tax</th>
                  <th className="text-right py-3 px-4 font-semibold">Total</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Issued</th>
                  <th className="text-left py-3 px-4 font-semibold">Due</th>
                  <th className="py-3 px-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoicesPageData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-12 text-center text-muted-foreground"
                    >
                      No invoices match the current filters
                    </td>
                  </tr>
                ) : (
                  invoicesPageData.map((invoice: Invoice, i) => {
                    const statusCls =
                      invoice.status === "paid"
                        ? STATUS_COLORS.paid
                        : invoice.status === "failed"
                          ? STATUS_COLORS.failed
                          : STATUS_COLORS.pending;
                    const taxLabel =
                      invoice.taxType === "GST"
                        ? "GST"
                        : invoice.taxType === "VAT"
                          ? "VAT"
                          : null;
                    return (
                      <tr
                        key={invoice.id}
                        className={`border-b border-border/20 hover:bg-muted/15 transition-colors group cursor-pointer ${i % 2 === 1 ? "bg-muted/5" : ""}`}
                        onClick={() => setSelectedInvoice(invoice)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setSelectedInvoice(invoice);
                        }}
                        tabIndex={0}
                        data-ocid={`invoice-row-${invoice.id}`}
                      >
                        <td className="py-3 px-4 font-mono text-[10px] text-primary hover:underline cursor-pointer">
                          {invoice.id}
                        </td>
                        <td className="py-3 px-4 font-medium text-foreground max-w-[140px] truncate">
                          {invoice.companyName}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                          {fmtCurrency(invoice.amount)}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-muted-foreground">
                          {invoice.taxAmount > 0 ? (
                            <span>
                              {(invoice.tax * 100).toFixed(0)}%
                              {taxLabel ? (
                                <span className="ml-1 text-[9px] opacity-70">
                                  ({taxLabel})
                                </span>
                              ) : null}
                            </span>
                          ) : (
                            <span className="text-muted-foreground/40">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right font-mono font-semibold text-foreground">
                          {fmtCurrency(invoice.total)}
                        </td>
                        <td className="py-3 px-4">
                          <Badge
                            className={`text-[9px] border ${statusCls} capitalize`}
                          >
                            {invoice.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-[10px] text-muted-foreground">
                          {fmtDate(invoice.issuedAt)}
                        </td>
                        <td className="py-3 px-4 text-[10px] text-muted-foreground">
                          {fmtDate(invoice.dueAt)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="View invoice"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedInvoice(invoice);
                              }}
                              data-ocid={`btn-view-invoice-${invoice.id}`}
                            >
                              <FileText className="w-3 h-3 text-primary" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6"
                              aria-label="Download invoice PDF"
                              onClick={(e) => {
                                e.stopPropagation();
                                downloadInvoicePdf(invoice);
                              }}
                              data-ocid={`btn-download-invoice-${invoice.id}`}
                            >
                              <Download className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {tab === "orders" ? (
          <Pagination
            page={orderPage}
            totalPages={orderTotalPages}
            total={filteredOrders.length}
            pageSize={PAGE_SIZE}
            onPrev={() => setOrderPage((p) => Math.max(1, p - 1))}
            onNext={() => setOrderPage((p) => Math.min(orderTotalPages, p + 1))}
          />
        ) : (
          <Pagination
            page={invoicePage}
            totalPages={invoiceTotalPages}
            total={filteredInvoices.length}
            pageSize={PAGE_SIZE}
            onPrev={() => setInvoicePage((p) => Math.max(1, p - 1))}
            onNext={() =>
              setInvoicePage((p) => Math.min(invoiceTotalPages, p + 1))
            }
          />
        )}
      </GlassCard>

      {/* Invoice Detail Modal */}
      <InvoiceDetailModal
        invoice={selectedInvoice}
        onClose={() => setSelectedInvoice(null)}
      />
    </div>
  );
}
