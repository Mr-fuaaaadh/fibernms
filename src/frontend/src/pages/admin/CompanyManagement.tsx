import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type Company,
  type CompanyPlan,
  type CompanyRegion,
  type CompanyStatus,
  MOCK_COMPANIES,
} from "@/data/superAdminMockData";
import { Plan } from "@/types/subscription";
import { useRouter } from "@tanstack/react-router";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Download,
  Edit2,
  ExternalLink,
  PauseCircle,
  PlayCircle,
  Plus,
  Search,
  Trash2,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Constants & Helpers ──────────────────────────────────────────────────────

const PAGE_SIZE = 20;

const REGIONS = ["All Regions", "India", "US", "EU", "APAC", "MENA"] as const;
const PLANS = [Plan.BASIC, Plan.PROFESSIONAL, Plan.ENTERPRISE, Plan.ULTRA];
const STATUSES: CompanyStatus[] = ["active", "trial", "suspended", "expired"];

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

const PLAN_COLORS: Record<Plan, string> = {
  [Plan.BASIC]: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  [Plan.PROFESSIONAL]: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  [Plan.ENTERPRISE]: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  [Plan.ULTRA]: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const PLAN_PRICES: Record<Plan, number> = {
  [Plan.BASIC]: 99,
  [Plan.PROFESSIONAL]: 499,
  [Plan.ENTERPRISE]: 1499,
  [Plan.ULTRA]: 4999,
};

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

function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function exportToCSV(companies: Company[]): void {
  const headers = [
    "ID",
    "Name",
    "Domain",
    "Region",
    "Country",
    "Plan",
    "Status",
    "Devices Used",
    "Device Limit",
    "Active Users",
    "Monthly Revenue",
    "Onboarded At",
    "Contact",
  ].join(",");
  const rows = companies.map((c) =>
    [
      c.id,
      `"${c.name}"`,
      c.domain,
      c.region,
      c.country,
      c.plan,
      c.status,
      c.devicesUsed,
      c.deviceLimit,
      c.activeUsers,
      c.monthlyRevenue,
      fmtDate(c.onboardedAt),
      c.contactEmail,
    ].join(","),
  );
  const csv = [headers, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "companies-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusDot({ status }: { status: CompanyStatus }) {
  const color =
    status === "active"
      ? "bg-emerald-400"
      : status === "trial"
        ? "bg-blue-400"
        : status === "suspended"
          ? "bg-orange-400"
          : "bg-red-400";
  return <span className={`inline-block w-1.5 h-1.5 rounded-full ${color}`} />;
}

function UsageBar({
  used,
  limit,
}: {
  used: number;
  limit: number;
}) {
  const pct = Math.round((used / limit) * 100);
  const barColor =
    pct >= 90
      ? "capacity-fill-critical"
      : pct >= 70
        ? "capacity-fill-warning"
        : "capacity-fill-healthy";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden min-w-[60px]">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
      <span className="text-[10px] font-mono text-muted-foreground whitespace-nowrap">
        {fmtNum(used, true)}/{fmtNum(limit, true)}
      </span>
    </div>
  );
}

// ─── Empty form state ─────────────────────────────────────────────────────────

type CompanyFormState = {
  name: string;
  domain: string;
  subdomain: string;
  region: string;
  country: string;
  contactName: string;
  contactEmail: string;
  plan: Plan;
  status: CompanyStatus;
};

const EMPTY_FORM: CompanyFormState = {
  name: "",
  domain: "",
  subdomain: "",
  region: "India",
  country: "India",
  contactName: "",
  contactEmail: "",
  plan: Plan.PROFESSIONAL,
  status: "trial",
};

function toForm(c: Company): CompanyFormState {
  return {
    name: c.name,
    domain: c.domain,
    subdomain: c.subdomain,
    region: c.region,
    country: c.country,
    contactName: c.contactName ?? "",
    contactEmail: c.contactEmail,
    plan: c.plan as Plan,
    status: c.status,
  };
}

// ─── Company Form Modal ───────────────────────────────────────────────────────

function CompanyFormModal({
  mode,
  initialValues,
  onSave,
  onClose,
}: {
  mode: "create" | "edit";
  initialValues: CompanyFormState;
  onSave: (form: CompanyFormState) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<CompanyFormState>(initialValues);

  function field(key: keyof CompanyFormState) {
    return {
      value: form[key] as string,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm((f) => ({ ...f, [key]: e.target.value })),
    };
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-elevated">
        <DialogHeader>
          <DialogTitle className="font-display text-sm">
            {mode === "create" ? "Create New Company" : "Edit Company"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1.5">
              <Label className="text-xs">Company Name *</Label>
              <Input
                className="h-8 text-xs"
                placeholder="Acme Fiber Co."
                {...field("name")}
                data-ocid="input-company-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Domain</Label>
              <Input
                className="h-8 text-xs"
                placeholder="acme.com"
                {...field("domain")}
                data-ocid="input-domain"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Subdomain</Label>
              <Input
                className="h-8 text-xs"
                placeholder="noc.acme.com"
                {...field("subdomain")}
                data-ocid="input-subdomain"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Region</Label>
              <Select
                value={form.region}
                onValueChange={(v) => setForm((f) => ({ ...f, region: v }))}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="select-region"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["India", "US", "EU", "APAC", "MENA"].map((r) => (
                    <SelectItem key={r} value={r}>
                      {REGION_FLAGS[r]} {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Country</Label>
              <Input
                className="h-8 text-xs"
                placeholder="India"
                {...field("country")}
                data-ocid="input-country"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Contact Name</Label>
              <Input
                className="h-8 text-xs"
                placeholder="John Doe"
                {...field("contactName")}
                data-ocid="input-contact-name"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Contact Email</Label>
              <Input
                className="h-8 text-xs"
                type="email"
                placeholder="admin@acme.com"
                {...field("contactEmail")}
                data-ocid="input-contact-email"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Initial Plan</Label>
              <Select
                value={form.plan}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, plan: v as Plan }))
                }
              >
                <SelectTrigger className="h-8 text-xs" data-ocid="select-plan">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PLANS.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, status: v as CompanyStatus }))
                }
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="select-status"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="text-xs"
            disabled={!form.name.trim()}
            onClick={() => onSave(form)}
            data-ocid="btn-save-company"
          >
            {mode === "create" ? "Create Company" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Change Plan Modal ────────────────────────────────────────────────────────

function ChangePlanModal({
  company,
  onSave,
  onClose,
}: {
  company: Company;
  onSave: (plan: Plan) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<Plan>(company.plan as Plan);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm glass-elevated">
        <DialogHeader>
          <DialogTitle className="font-display text-sm">
            Change Subscription Plan
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 space-y-3">
          <p className="text-xs text-muted-foreground">
            Current plan:{" "}
            <span className="text-foreground font-semibold">
              {company.plan}
            </span>
          </p>
          <div className="space-y-2">
            {PLANS.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setSelected(p)}
                className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-smooth ${
                  selected === p
                    ? "border-primary bg-primary/10"
                    : "border-border/30 bg-muted/10 hover:bg-muted/20"
                }`}
                data-ocid={`plan-option-${p.toLowerCase()}`}
              >
                <div>
                  <p className="text-xs font-semibold text-foreground">{p}</p>
                  <p className="text-[10px] text-muted-foreground">
                    ${PLAN_PRICES[p]}/month
                  </p>
                </div>
                {p === company.plan && (
                  <Badge className="text-[9px] bg-muted/40 text-muted-foreground">
                    Current
                  </Badge>
                )}
                {selected === p && p !== company.plan && (
                  <Badge className="text-[9px] bg-primary/20 text-primary">
                    Selected
                  </Badge>
                )}
              </button>
            ))}
          </div>
          {selected !== company.plan && (
            <p className="text-[10px] text-muted-foreground bg-muted/20 p-2 rounded-md border border-border/20">
              ⚠ Proration: The difference between plans will be charged or
              credited on the next billing cycle.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            className="text-xs"
            disabled={selected === company.plan}
            onClick={() => onSave(selected)}
            data-ocid="btn-confirm-plan"
          >
            Confirm Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirmation Modal ────────────────────────────────────────────────

function DeleteConfirmModal({
  company,
  onConfirm,
  onClose,
}: {
  company: Company;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const [typed, setTyped] = useState("");
  const match = typed.trim() === company.name.trim();

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm glass-elevated">
        <DialogHeader>
          <DialogTitle className="font-display text-sm text-destructive">
            Delete Company
          </DialogTitle>
        </DialogHeader>
        <div className="py-2 space-y-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            This will soft-delete{" "}
            <span className="text-foreground font-semibold">
              {company.name}
            </span>{" "}
            and mark all associated data as expired. This action cannot be
            undone easily.
          </p>
          <div className="space-y-1.5">
            <Label className="text-xs">
              Type{" "}
              <span className="font-mono text-foreground">{company.name}</span>{" "}
              to confirm
            </Label>
            <Input
              className="h-8 text-xs"
              placeholder={company.name}
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              data-ocid="input-delete-confirm"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="text-xs"
            disabled={!match}
            onClick={onConfirm}
            data-ocid="btn-confirm-delete"
          >
            Delete Company
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Table Row ────────────────────────────────────────────────────────────────

function CompanyRow({
  company,
  onViewDetailPage,
  onEdit,
  onChangePlan,
  onToggleStatus,
  onDelete,
}: {
  company: Company;
  onViewDetailPage: () => void;
  onEdit: () => void;
  onChangePlan: () => void;
  onToggleStatus: () => void;
  onDelete: () => void;
}) {
  const usagePct = Math.round(
    (company.devicesUsed / Math.max(company.deviceLimit, 1)) * 100,
  );
  const highestPct = usagePct;

  return (
    <tr
      className="border-b border-border/20 hover:bg-muted/15 transition-colors group"
      data-ocid={`company-row-${company.id}`}
    >
      {/* Company name + initials */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 font-mono text-[10px] font-bold text-primary">
            {getInitials(company.name)}
          </div>
          <div className="min-w-0">
            <button
              type="button"
              onClick={onViewDetailPage}
              className="text-xs font-medium text-foreground hover:text-primary transition-colors truncate max-w-[160px] block text-left"
              data-ocid={`btn-view-company-${company.id}`}
            >
              {company.name}
            </button>
            <p className="text-[10px] text-muted-foreground truncate max-w-[160px]">
              {company.domain}
            </p>
          </div>
        </div>
      </td>

      {/* Domain */}
      <td className="py-3 px-4 text-xs text-muted-foreground">
        <span className="font-mono">{company.subdomain}</span>
      </td>

      {/* Region */}
      <td className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
        {REGION_FLAGS[company.region]} {company.region}
      </td>

      {/* Plan */}
      <td className="py-3 px-4">
        <Badge
          className={`text-[9px] font-mono border ${PLAN_COLORS[company.plan]}`}
        >
          {company.plan}
        </Badge>
      </td>

      {/* Status */}
      <td className="py-3 px-4">
        <Badge
          className={`text-[9px] font-mono border gap-1 ${STATUS_COLORS[company.status]}`}
        >
          <StatusDot status={company.status} />
          {company.status}
        </Badge>
      </td>

      {/* Usage */}
      <td className="py-3 px-4 min-w-[140px]">
        <UsageBar used={company.devicesUsed} limit={company.deviceLimit} />
      </td>

      {/* Peak Usage % badge */}
      <td className="py-3 px-4">
        <Badge
          className={`text-[9px] font-mono ${
            highestPct >= 90
              ? "bg-red-500/15 text-red-400 border-red-500/30"
              : highestPct >= 70
                ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
          }`}
        >
          {highestPct}%
        </Badge>
      </td>

      {/* Revenue */}
      <td className="py-3 px-4 text-xs font-mono text-right text-emerald-400 whitespace-nowrap">
        {company.monthlyRevenue > 0
          ? `$${fmtNum(company.monthlyRevenue)}`
          : "—"}
      </td>

      {/* Onboarded */}
      <td className="py-3 px-4 text-xs text-muted-foreground whitespace-nowrap">
        {fmtDate(company.onboardedAt)}
      </td>

      {/* Actions */}
      <td className="py-3 px-4">
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-primary"
            aria-label="View company details"
            onClick={onViewDetailPage}
            data-ocid={`btn-detail-${company.id}`}
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-foreground"
            aria-label="Edit company"
            onClick={onEdit}
            data-ocid={`btn-edit-${company.id}`}
          >
            <Edit2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-blue-400"
            aria-label="Change plan"
            onClick={onChangePlan}
            data-ocid={`btn-plan-${company.id}`}
          >
            <CreditCard className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-amber-400"
            aria-label={
              company.status === "suspended"
                ? "Activate company"
                : "Suspend company"
            }
            onClick={onToggleStatus}
            data-ocid={`btn-toggle-${company.id}`}
          >
            {company.status === "suspended" ? (
              <PlayCircle className="w-3 h-3" />
            ) : (
              <PauseCircle className="w-3 h-3" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-muted-foreground hover:text-red-400"
            aria-label="Delete company"
            onClick={onDelete}
            data-ocid={`btn-delete-${company.id}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type ModalState =
  | { type: "none" }
  | { type: "create" }
  | { type: "edit"; company: Company }
  | { type: "plan"; company: Company }
  | { type: "delete"; company: Company };

export default function CompanyManagement(): React.ReactElement {
  const router = useRouter();
  const nav = (path: string) => router.navigate({ to: path as "/" });
  // ── Filters + search ──
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [regionFilter, setRegionFilter] = useState<string>("All Regions");
  const [page, setPage] = useState(1);

  // ── Local CRUD state (starts as copy of mock data) ──
  const [companies, setCompanies] = useState<Company[]>(() => [
    ...MOCK_COMPANIES,
  ]);
  const [modal, setModal] = useState<ModalState>({ type: "none" });

  // ── Filtered list ──
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return companies.filter((c) => {
      if (
        q &&
        !c.name.toLowerCase().includes(q) &&
        !c.domain.toLowerCase().includes(q) &&
        !c.subdomain.toLowerCase().includes(q)
      )
        return false;
      if (planFilter !== "all" && c.plan !== planFilter) return false;
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (regionFilter !== "All Regions" && c.region !== regionFilter)
        return false;
      return true;
    });
  }, [companies, search, planFilter, statusFilter, regionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paginated = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  // Reset to page 1 when filters change
  const applySearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };
  const applyPlan = (v: string) => {
    setPlanFilter(v);
    setPage(1);
  };
  const applyStatus = (v: string) => {
    setStatusFilter(v);
    setPage(1);
  };
  const applyRegion = (v: string) => {
    setRegionFilter(v);
    setPage(1);
  };

  // ── Summary stats ──
  const stats = useMemo(
    () => ({
      total: companies.length,
      active: companies.filter((c) => c.status === "active").length,
      trial: companies.filter((c) => c.status === "trial").length,
      suspended: companies.filter((c) => c.status === "suspended").length,
      expired: companies.filter((c) => c.status === "expired").length,
    }),
    [companies],
  );

  // ── CRUD handlers ──
  function handleCreate(form: CompanyFormState) {
    const newId = `co-${String(companies.length + 1).padStart(3, "0")}`;
    const now = new Date().toISOString();
    const newCompany: Company = {
      id: newId,
      name: form.name.trim(),
      domain:
        form.domain.trim() ||
        `${form.name.toLowerCase().replace(/\s+/g, "")}.com`,
      subdomain:
        form.subdomain.trim() ||
        `noc.${form.name.toLowerCase().replace(/\s+/g, "")}.com`,
      region: form.region as CompanyRegion,
      country: form.country,
      plan: form.plan as CompanyPlan,
      status: form.status,
      createdAt: now,
      contactEmail: form.contactEmail.trim(),
      contactPhone: "",
      contactName: form.contactName.trim(),
      devicesUsed: 0,
      devicesLimit: {
        [Plan.BASIC]: 1000,
        [Plan.PROFESSIONAL]: 10000,
        [Plan.ENTERPRISE]: 100000,
        [Plan.ULTRA]: 10000000,
      }[form.plan],
      apiUsed: 0,
      apiLimit: {
        [Plan.BASIC]: 100000,
        [Plan.PROFESSIONAL]: 1000000,
        [Plan.ENTERPRISE]: 10000000,
        [Plan.ULTRA]: 100000000,
      }[form.plan],
      dataUsedGB: 0,
      dataLimitGB: {
        [Plan.BASIC]: 50,
        [Plan.PROFESSIONAL]: 500,
        [Plan.ENTERPRISE]: 5000,
        [Plan.ULTRA]: 50000,
      }[form.plan],
      alertsUsed: 0,
      alertsLimit: {
        [Plan.BASIC]: 10000,
        [Plan.PROFESSIONAL]: 100000,
        [Plan.ENTERPRISE]: 1000000,
        [Plan.ULTRA]: 10000000,
      }[form.plan],
      activeUsers: 1,
      totalAlerts: 0,
      mrr:
        form.status === "active" || form.status === "trial"
          ? PLAN_PRICES[form.plan]
          : 0,
      lastActiveAt: now,
      isSoftDeleted: false,
      // compat aliases
      deviceLimit: {
        [Plan.BASIC]: 1000,
        [Plan.PROFESSIONAL]: 10000,
        [Plan.ENTERPRISE]: 100000,
        [Plan.ULTRA]: 10000000,
      }[form.plan],
      alertsGenerated: 0,
      monthlyRevenue:
        form.status === "active" || form.status === "trial"
          ? PLAN_PRICES[form.plan]
          : 0,
      onboardedAt: now,
      lastActivity: now,
    };
    setCompanies((prev) => [newCompany, ...prev]);
    setModal({ type: "none" });
    toast.success(`Company "${newCompany.name}" created successfully`);
  }

  function handleEdit(form: CompanyFormState) {
    if (modal.type !== "edit") return;
    const target = modal.company;
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === target.id
          ? {
              ...c,
              name: form.name.trim(),
              domain: form.domain.trim(),
              subdomain: form.subdomain.trim(),
              region: form.region as CompanyRegion,
              country: form.country,
              contactEmail: form.contactEmail.trim(),
              contactName: form.contactName.trim(),
              plan: form.plan as CompanyPlan,
              status: form.status,
            }
          : c,
      ),
    );
    setModal({ type: "none" });
    toast.success("Company updated successfully");
  }

  function handleChangePlan(plan: Plan) {
    if (modal.type !== "plan") return;
    const target = modal.company;
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === target.id
          ? {
              ...c,
              plan,
              deviceLimit: {
                [Plan.BASIC]: 1000,
                [Plan.PROFESSIONAL]: 10000,
                [Plan.ENTERPRISE]: 100000,
                [Plan.ULTRA]: 10000000,
              }[plan],
              monthlyRevenue:
                c.status === "active" || c.status === "trial"
                  ? PLAN_PRICES[plan]
                  : 0,
            }
          : c,
      ),
    );
    setModal({ type: "none" });
    toast.success(`Plan changed to ${plan}`);
  }

  function handleToggleStatus(company: Company) {
    const next: CompanyStatus =
      company.status === "suspended" ? "active" : "suspended";
    const action = next === "suspended" ? "Suspended" : "Activated";
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === company.id
          ? {
              ...c,
              status: next,
              monthlyRevenue: next === "active" ? PLAN_PRICES[c.plan] : 0,
            }
          : c,
      ),
    );
    toast.success(`${action} company "${company.name}"`);
  }

  function handleDelete() {
    if (modal.type !== "delete") return;
    const target = modal.company;
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === target.id
          ? { ...c, status: "expired" as CompanyStatus, monthlyRevenue: 0 }
          : c,
      ),
    );
    setModal({ type: "none" });
    toast.success(`"${target.name}" has been removed`);
  }

  // ─────────────────────────────────────────────────────────────────────────────

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <Building2 className="w-5 h-5 text-amber-400 flex-shrink-0" />
        <h1 className="text-xl font-display font-bold text-foreground">
          Company Management
        </h1>
        <Badge className="bg-amber-500/15 text-amber-400 border border-amber-500/30 font-mono text-xs">
          {stats.total} tenants
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => exportToCSV(filtered)}
            data-ocid="btn-export-csv"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setModal({ type: "create" })}
            data-ocid="btn-add-company"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Summary stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          {
            label: "Total",
            val: stats.total,
            icon: Building2,
            cls: "text-blue-400",
            sub: "registered",
          },
          {
            label: "Active",
            val: stats.active,
            icon: CheckCircle2,
            cls: "text-emerald-400",
            sub: "paying",
          },
          {
            label: "Trial",
            val: stats.trial,
            icon: AlertTriangle,
            cls: "text-blue-400",
            sub: "evaluating",
          },
          {
            label: "Suspended",
            val: stats.suspended,
            icon: PauseCircle,
            cls: "text-orange-400",
            sub: "on hold",
          },
          {
            label: "Expired",
            val: stats.expired,
            icon: XCircle,
            cls: "text-red-400",
            sub: "churned",
          },
        ].map(({ label, val, icon: Icon, cls, sub }) => (
          <GlassCard key={label} className="p-4 flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${cls.replace("text-", "bg-").replace(/400|500/, "500/15")}`}
            >
              <Icon className={`w-4 h-4 ${cls}`} />
            </div>
            <div>
              <p className={`text-lg font-display font-bold ${cls}`}>{val}</p>
              <p className="text-[10px] text-muted-foreground leading-none">
                {label} · {sub}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Filters */}
      <GlassCard className="p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search by name, domain…"
            value={search}
            onChange={(e) => applySearch(e.target.value)}
            className="pl-9 h-8 text-xs bg-background/50"
            data-ocid="input-company-search"
          />
        </div>

        <Select value={regionFilter} onValueChange={applyRegion}>
          <SelectTrigger
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-region"
          >
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            {REGIONS.map((r) => (
              <SelectItem key={r} value={r}>
                {r !== "All Regions" ? `${REGION_FLAGS[r]} ` : ""}
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={planFilter} onValueChange={applyPlan}>
          <SelectTrigger
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-plan"
          >
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            {PLANS.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={applyStatus}>
          <SelectTrigger
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-status"
          >
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {STATUSES.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-xs text-muted-foreground font-mono ml-auto whitespace-nowrap">
          {filtered.length} of {companies.length}
        </span>
      </GlassCard>

      {/* Table */}
      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="border-b border-border/40 bg-muted/10">
              <tr className="text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Company
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Subdomain
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Region
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Plan
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider min-w-[140px]">
                  Devices
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Usage %
                </th>
                <th className="text-right py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  MRR
                </th>
                <th className="text-left py-3 px-4 font-medium text-[11px] uppercase tracking-wider">
                  Onboarded
                </th>
                <th className="py-3 px-4 w-[140px]" />
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={10}>
                    <div
                      className="flex flex-col items-center py-16 text-muted-foreground gap-3"
                      data-ocid="empty-state-companies"
                    >
                      <Building2 className="w-8 h-8 opacity-30" />
                      <p className="text-sm">No companies match your filters</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          setSearch("");
                          setPlanFilter("all");
                          setStatusFilter("all");
                          setRegionFilter("All Regions");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((company) => (
                  <CompanyRow
                    key={company.id}
                    company={company}
                    onViewDetailPage={() =>
                      nav(`/super-admin/companies/${company.id}`)
                    }
                    onEdit={() => setModal({ type: "edit", company })}
                    onChangePlan={() => setModal({ type: "plan", company })}
                    onToggleStatus={() => handleToggleStatus(company)}
                    onDelete={() => setModal({ type: "delete", company })}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <>
            <Separator className="bg-border/30" />
            <div className="flex items-center justify-between px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Page {safePage} of {totalPages} · {filtered.length} companies
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                  data-ocid="btn-prev-page"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </Button>
                {/* Page number pills */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pg =
                    totalPages <= 5
                      ? i + 1
                      : safePage <= 3
                        ? i + 1
                        : safePage >= totalPages - 2
                          ? totalPages - 4 + i
                          : safePage - 2 + i;
                  return (
                    <button
                      type="button"
                      key={pg}
                      onClick={() => setPage(pg)}
                      className={`h-7 w-7 rounded-md text-xs font-mono transition-smooth ${
                        pg === safePage
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted/40"
                      }`}
                      data-ocid={`btn-page-${pg}`}
                    >
                      {pg}
                    </button>
                  );
                })}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                  data-ocid="btn-next-page"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </GlassCard>

      {/* ── Modals ── */}

      {modal.type === "create" && (
        <CompanyFormModal
          mode="create"
          initialValues={EMPTY_FORM}
          onSave={handleCreate}
          onClose={() => setModal({ type: "none" })}
        />
      )}

      {modal.type === "edit" && (
        <CompanyFormModal
          mode="edit"
          initialValues={toForm(modal.company)}
          onSave={handleEdit}
          onClose={() => setModal({ type: "none" })}
        />
      )}

      {modal.type === "plan" && (
        <ChangePlanModal
          company={modal.company}
          onSave={handleChangePlan}
          onClose={() => setModal({ type: "none" })}
        />
      )}

      {modal.type === "delete" && (
        <DeleteConfirmModal
          company={modal.company}
          onConfirm={handleDelete}
          onClose={() => setModal({ type: "none" })}
        />
      )}
    </div>
  );
}
