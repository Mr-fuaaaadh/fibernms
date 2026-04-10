import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  type AdminUser,
  MOCK_ADMIN_USERS,
  MOCK_COMPANIES,
  type Session,
  type UserRole,
  type UserStatus,
} from "@/data/superAdminMockData";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  FileText,
  Filter,
  KeyRound,
  LogOut,
  Mail,
  MapPin,
  MoreHorizontal,
  Plus,
  Shield,
  ShieldOff,
  Upload,
  UserCheck,
  UserMinus,
  UserPlus,
  UserX,
  Users,
  Wifi,
  WifiOff,
  X,
  XCircle,
} from "lucide-react";
import { useCallback, useMemo, useRef, useState } from "react";
import type React from "react";

// ─── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

const PLAN_BADGE: Record<string, string> = {
  BASIC: "bg-muted/30 text-muted-foreground border-border/40",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const ROLE_COLORS: Record<UserRole, string> = {
  Admin: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  "Network Engineer": "bg-blue-500/15 text-blue-400 border-blue-500/30",
  "NOC Operator": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Viewer: "bg-muted/30 text-muted-foreground border-border/40",
};

const STATUS_COLORS: Record<UserStatus, string> = {
  active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  disabled: "bg-red-500/15 text-red-400 border-red-500/30",
};

const REGION_LIST = ["India", "US", "EU", "APAC", "MENA"] as const;
const ALL_ROLES: UserRole[] = [
  "Admin",
  "Network Engineer",
  "NOC Operator",
  "Viewer",
];

// ─── Helpers ───────────────────────────────────────────────────────────────────

function relativeTime(iso: string | null): string {
  if (!iso) return "Never";
  const diff = Date.now() - new Date(iso).getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 2) return "Just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function userInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

function exportCsv(users: AdminUser[]): void {
  const headers = [
    "Name",
    "Email",
    "Company",
    "Role",
    "Status",
    "Region",
    "Last Login",
    "MFA",
    "Sessions",
  ];
  const rows = users.map((u) => [
    u.name,
    u.email,
    u.company,
    u.role,
    u.status,
    u.region,
    u.lastLogin ?? "Never",
    u.mfaEnabled ? "Yes" : "No",
    String(u.activeSessions.length),
  ]);
  const csv = [headers, ...rows]
    .map((r) => r.map((c) => `"${c}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `users-export-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function csvTemplate(): void {
  const headers = "Name,Email,Role,Company,Region\n";
  const sample =
    "John Smith,john@company.com,Network Engineer,Acme Telecom,US\n";
  const blob = new Blob([headers + sample], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "user-import-template.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  color,
  icon: Icon,
}: {
  label: string;
  value: number;
  sub?: string;
  color: string;
  icon: React.ElementType;
}) {
  const bgColor = color.replace("text-", "bg-").replace("-400", "-500/15");
  return (
    <GlassCard className="p-4 flex items-center gap-3">
      <div className={cn("p-2.5 rounded-xl", bgColor)}>
        <Icon className={cn("w-4 h-4", color)} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] text-muted-foreground leading-tight">
          {label}
        </p>
        <p
          className={cn(
            "text-2xl font-display font-bold tabular-nums mt-0.5",
            color,
          )}
        >
          {value.toLocaleString()}
        </p>
        {sub && (
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">{sub}</p>
        )}
      </div>
    </GlassCard>
  );
}

function UserAvatar({
  name,
  sessionActive,
}: { name: string; sessionActive: boolean }) {
  return (
    <div className="relative flex-shrink-0">
      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-[11px] font-bold text-primary font-display">
        {userInitials(name)}
      </div>
      {sessionActive && (
        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background" />
      )}
    </div>
  );
}

// ─── Session Tracking Modal ────────────────────────────────────────────────────

function SessionTrackingModal({
  user,
  sessions,
  onClose,
  onForceLogoutSession,
  onForceLogoutAll,
}: {
  user: AdminUser;
  sessions: Session[];
  onClose: () => void;
  onForceLogoutSession: (sessionId: string) => void;
  onForceLogoutAll: () => void;
}) {
  const [confirmSessionId, setConfirmSessionId] = useState<string | null>(null);
  const [localSessions, setLocalSessions] = useState<Session[]>(sessions);

  const handleLogoutOne = (id: string) => {
    onForceLogoutSession(id);
    setLocalSessions((prev) => prev.filter((s) => s.id !== id));
    setConfirmSessionId(null);
  };

  const handleLogoutAll = () => {
    onForceLogoutAll();
    setLocalSessions([]);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-elevated border-border/40 p-0 overflow-hidden max-h-[85vh] flex flex-col">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <UserAvatar name={user.name} sessionActive={user.sessionActive} />
              <div>
                <DialogTitle className="text-base font-display font-bold leading-tight">
                  Active Sessions — {user.name}
                </DialogTitle>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="text-[9px] border bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                {localSessions.filter((s) => s.isActive).length} active
              </Badge>
              {localSessions.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs gap-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
                  onClick={handleLogoutAll}
                  data-ocid="sessions-force-logout-all"
                >
                  <LogOut className="w-3 h-3" /> Force Logout All
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto noc-scrollbar">
          {localSessions.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground gap-3">
              <WifiOff className="w-8 h-8 opacity-20" />
              <p className="text-sm font-medium">No active sessions</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-border/30 bg-muted/20">
                  <tr className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    <th className="text-left py-2.5 px-4 font-medium">
                      Session ID
                    </th>
                    <th className="text-left py-2.5 px-4 font-medium">
                      Login Time
                    </th>
                    <th className="text-left py-2.5 px-4 font-medium">
                      Last Activity
                    </th>
                    <th className="text-left py-2.5 px-4 font-medium">
                      Device
                    </th>
                    <th className="text-left py-2.5 px-4 font-medium">
                      IP Address
                    </th>
                    <th className="text-left py-2.5 px-4 font-medium">
                      Status
                    </th>
                    <th className="py-2.5 px-4 w-16" />
                  </tr>
                </thead>
                <tbody>
                  {localSessions.map((sess) => (
                    <tr
                      key={sess.id}
                      className="border-b border-border/15 hover:bg-muted/10 transition-colors"
                    >
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {sess.id}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] text-foreground">
                          {relativeTime(sess.loginTime)}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] text-muted-foreground">
                          {relativeTime(sess.lastActivity)}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] text-foreground truncate max-w-[120px] block">
                          {sess.deviceInfo}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {sess.ipAddress}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <Badge
                          className={cn(
                            "text-[9px] border",
                            sess.isActive
                              ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                              : "bg-muted/30 text-muted-foreground border-border/40",
                          )}
                        >
                          {sess.isActive ? "Active" : "Expired"}
                        </Badge>
                      </td>
                      <td className="py-2.5 px-4">
                        {confirmSessionId === sess.id ? (
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-emerald-400 hover:text-emerald-300"
                              onClick={() => handleLogoutOne(sess.id)}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 text-muted-foreground"
                              onClick={() => setConfirmSessionId(null)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-muted-foreground hover:text-orange-400"
                            title="Force logout this session"
                            onClick={() => setConfirmSessionId(sess.id)}
                          >
                            <LogOut className="w-3 h-3" />
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-border/30 flex items-center justify-end gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 text-xs"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Invite User Modal ─────────────────────────────────────────────────────────

interface InviteEntry {
  id: string;
  email: string;
  role: UserRole;
}

function InviteUserModal({
  onClose,
  onInvite,
}: {
  onClose: () => void;
  onInvite: (email: string, role: UserRole, companyId: string) => void;
}) {
  const [entries, setEntries] = useState<InviteEntry[]>([
    { id: "e-0", email: "", role: "Viewer" },
  ]);
  const [companyId, setCompanyId] = useState(MOCK_COMPANIES[0]?.id ?? "");
  const [region, setRegion] = useState<string>("India");
  const [message, setMessage] = useState("");

  const companyName =
    MOCK_COMPANIES.find((c) => c.id === companyId)?.name ?? "";
  const allValid = entries.every((e) => e.email.includes("@")) && companyId;

  const addEntry = () =>
    setEntries((prev) => [
      ...prev,
      { id: `e-${Date.now()}`, email: "", role: "Viewer" },
    ]);
  const removeEntry = (id: string) =>
    setEntries((prev) => prev.filter((e) => e.id !== id));
  const updateEntry = (
    id: string,
    field: keyof Omit<InviteEntry, "id">,
    val: string,
  ) =>
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: val } : e)),
    );

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg glass-elevated border-border/40 p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/30">
          <DialogTitle className="flex items-center gap-2 font-display text-base">
            <UserPlus className="w-4 h-4 text-primary" /> Invite Users
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto noc-scrollbar px-6 py-4 space-y-4">
          {/* Email entries */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-xs font-medium">Email Addresses</Label>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 text-[10px] gap-1 text-primary"
                onClick={addEntry}
                data-ocid="invite-add-email"
              >
                <Plus className="w-3 h-3" /> Add another
              </Button>
            </div>
            <div className="space-y-2">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center gap-2">
                  <Input
                    type="email"
                    placeholder="user@company.com"
                    value={entry.email}
                    onChange={(e) =>
                      updateEntry(entry.id, "email", e.target.value)
                    }
                    className="h-8 text-xs bg-background/50 flex-1"
                    data-ocid={`invite-email-${entry.id}`}
                  />
                  <Select
                    value={entry.role}
                    onValueChange={(v) => updateEntry(entry.id, "role", v)}
                  >
                    <SelectTrigger
                      className="h-8 text-xs bg-background/50 w-40"
                      data-ocid={`invite-role-${entry.id}`}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ALL_ROLES.map((r) => (
                        <SelectItem key={r} value={r} className="text-xs">
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {entries.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-red-400"
                      onClick={() => removeEntry(entry.id)}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs">Assign to Company</Label>
              <Select value={companyId} onValueChange={setCompanyId}>
                <SelectTrigger
                  className="h-8 text-xs bg-background/50"
                  data-ocid="invite-company"
                >
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {MOCK_COMPANIES.map((c) => (
                    <SelectItem key={c.id} value={c.id} className="text-xs">
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Region</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger
                  className="h-8 text-xs bg-background/50"
                  data-ocid="invite-region"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REGION_LIST.map((r) => (
                    <SelectItem key={r} value={r} className="text-xs">
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs">Personal Message (optional)</Label>
            <Textarea
              placeholder="Welcome to FiberNMS! You've been invited to join our network operations team..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="text-xs bg-background/50 resize-none"
              rows={2}
              data-ocid="invite-message"
            />
          </div>

          {/* Preview */}
          <div className="rounded-lg border border-border/30 bg-muted/10 p-3 space-y-2">
            <p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 font-mono">
              Email Preview
            </p>
            <div className="text-[10px] leading-relaxed space-y-1">
              <p>
                <span className="text-muted-foreground">To:</span>{" "}
                {entries.map((e) => e.email || "user@example.com").join(", ")}
              </p>
              <p>
                <span className="text-muted-foreground">Company:</span>{" "}
                {companyName || "—"}
              </p>
              <Separator className="opacity-20 my-1.5" />
              <p className="text-muted-foreground">
                You've been invited to join{" "}
                <strong className="text-foreground">
                  {companyName || "—"}
                </strong>{" "}
                on FiberNMS. Click the secure link in the email to set up your
                account.
                {message && (
                  <>
                    <br />
                    <em className="text-foreground/80">{message}</em>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 border-t border-border/30 flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1 h-8 text-xs gap-1.5"
            disabled={!allValid}
            onClick={() => {
              for (const entry of entries) {
                if (entry.email.includes("@"))
                  onInvite(entry.email, entry.role, companyId);
              }
              onClose();
            }}
            data-ocid="invite-submit"
          >
            <Mail className="w-3 h-3" /> Send {entries.length} Invitation
            {entries.length > 1 ? "s" : ""}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Bulk Import Modal ─────────────────────────────────────────────────────────

interface ParsedRow {
  rowKey: string;
  name: string;
  email: string;
  role: string;
  company: string;
  region: string;
  valid: boolean;
  errors: string[];
}

const SAMPLE_CSV = [
  {
    name: "Alice Nakamura",
    email: "alice@telco.jp",
    role: "Network Engineer",
    company: "NTT FiberJapan",
    region: "APAC",
  },
  {
    name: "Bruno Martinez",
    email: "bruno@telco.es",
    role: "NOC Operator",
    company: "Telefonica FiberCo",
    region: "EU",
  },
  {
    name: "Chidi Okonkwo",
    email: "chidi@ispdemo.ng",
    role: "Viewer",
    company: "Airtel Fiber Networks",
    region: "MENA",
  },
  {
    name: "Dana Patel",
    email: "dana@jiofiber.in",
    role: "Admin",
    company: "Jio FiberCo",
    region: "India",
  },
  {
    name: "Eva Schmidt",
    email: "eva@dttelekom.de",
    role: "Network Engineer",
    company: "Deutsche Telekom Fiber",
    region: "EU",
  },
];

function validateRow(row: Record<string, string>, idx: number): ParsedRow {
  const errors: string[] = [];
  if (!row.email?.includes("@")) errors.push("Invalid email");
  if (!row.name?.trim()) errors.push("Missing name");
  if (!ALL_ROLES.includes(row.role as UserRole)) errors.push("Invalid role");
  if (!row.company?.trim()) errors.push("Missing company");
  return {
    rowKey: `${row.email ?? "row"}-${idx}`,
    name: row.name ?? "",
    email: row.email ?? "",
    role: row.role ?? "",
    company: row.company ?? "",
    region: row.region ?? "",
    valid: errors.length === 0,
    errors,
  };
}

function BulkImportModal({ onClose }: { onClose: () => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pasteContent, setPasteContent] = useState("");
  const [parsedRows, setParsedRows] = useState<ParsedRow[]>(() =>
    SAMPLE_CSV.map((r, i) => validateRow(r, i)),
  );
  const [importing, setImporting] = useState(false);
  const [importDone, setImportDone] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");

  const validCount = parsedRows.filter((r) => r.valid).length;
  const errorCount = parsedRows.filter((r) => !r.valid).length;

  const parseCSV = (text: string) => {
    const lines = text.trim().split("\n").filter(Boolean);
    if (lines.length < 2) return;
    const headers = lines[0]
      .toLowerCase()
      .split(",")
      .map((h) => h.trim().replace(/"/g, ""));
    const rows = lines.slice(1).map((line, idx) => {
      const vals = line.split(",").map((v) => v.trim().replace(/"/g, ""));
      const obj: Record<string, string> = {};
      headers.forEach((h, i) => {
        obj[h] = vals[i] ?? "";
      });
      return validateRow(obj, idx);
    });
    setParsedRows(rows);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === "string") parseCSV(ev.target.result);
    };
    reader.readAsText(file);
  };

  const handlePasteChange = (val: string) => {
    setPasteContent(val);
    if (val.trim()) parseCSV(val);
  };

  const handleImport = () => {
    setImporting(true);
    setTimeout(() => {
      setImporting(false);
      setImportDone(true);
    }, 1800);
  };

  if (importDone) {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="max-w-sm glass-elevated border-border/40">
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-base font-display font-bold text-foreground">
                Import Complete
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <span className="text-emerald-400 font-medium">
                  {validCount} users imported
                </span>
                {errorCount > 0 && (
                  <>
                    ,{" "}
                    <span className="text-red-400 font-medium">
                      {errorCount} skipped
                    </span>
                  </>
                )}
              </p>
            </div>
            <Button size="sm" className="h-8 text-xs" onClick={onClose}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl glass-elevated border-border/40 p-0 overflow-hidden max-h-[90vh] flex flex-col">
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border/30">
          <DialogTitle className="flex items-center gap-2 font-display text-base">
            <Upload className="w-4 h-4 text-primary" /> Bulk Import Users
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto noc-scrollbar px-6 py-4 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-8 text-xs gap-1 bg-muted/30">
              <TabsTrigger value="upload" className="h-6 text-xs px-3">
                Upload CSV
              </TabsTrigger>
              <TabsTrigger value="paste" className="h-6 text-xs px-3">
                Paste Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-3">
              <button
                type="button"
                className="w-full border-2 border-dashed border-border/40 rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-smooth"
                onClick={() => fileRef.current?.click()}
                data-ocid="import-dropzone"
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Upload className="w-7 h-7 text-muted-foreground mx-auto mb-3" />
                <p className="text-xs font-medium text-foreground">
                  {fileName ?? "Drop your CSV file here or click to browse"}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  Columns: name, email, role, company, region
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 h-6 text-[10px] gap-1 text-primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    csvTemplate();
                  }}
                  data-ocid="download-template"
                >
                  <Download className="w-3 h-3" /> Download template
                </Button>
              </button>
            </TabsContent>

            <TabsContent value="paste" className="mt-3">
              <Textarea
                placeholder={
                  "name,email,role,company,region\nJohn Smith,john@acme.com,Network Engineer,Acme Telecom,US"
                }
                value={pasteContent}
                onChange={(e) => handlePasteChange(e.target.value)}
                className="text-xs bg-background/50 font-mono resize-none h-36"
                data-ocid="import-paste"
              />
            </TabsContent>
          </Tabs>

          {/* Validation table */}
          {parsedRows.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-foreground">
                  Preview — {parsedRows.length} rows
                </p>
                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-emerald-400">{validCount} valid</span>
                  {errorCount > 0 && (
                    <span className="text-red-400">{errorCount} errors</span>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto rounded-lg border border-border/30 max-h-52 overflow-y-auto noc-scrollbar">
                <table className="w-full text-[10px]">
                  <thead className="bg-muted/30 sticky top-0">
                    <tr>
                      {["", "Name", "Email", "Role", "Company", "Region"].map(
                        (h) => (
                          <th
                            key={h}
                            className="text-left py-2 px-3 text-muted-foreground font-normal"
                          >
                            {h}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedRows.map((row) => (
                      <tr
                        key={row.rowKey}
                        className={cn(
                          "border-t border-border/15",
                          row.valid ? "hover:bg-muted/10" : "bg-red-500/5",
                        )}
                      >
                        <td className="py-1.5 px-3">
                          {row.valid ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          ) : (
                            <XCircle
                              className="w-3 h-3 text-red-400"
                              aria-label={row.errors.join(", ")}
                            />
                          )}
                        </td>
                        <td className="py-1.5 px-3 text-foreground">
                          {row.name || "—"}
                        </td>
                        <td className="py-1.5 px-3 text-muted-foreground">
                          {row.email || "—"}
                        </td>
                        <td className="py-1.5 px-3">
                          {row.role ? (
                            <Badge
                              className={cn(
                                "text-[8px] border",
                                ROLE_COLORS[row.role as UserRole] ??
                                  "bg-muted/30 text-muted-foreground border-border/40",
                              )}
                            >
                              {row.role}
                            </Badge>
                          ) : (
                            <span className="text-red-400">—</span>
                          )}
                        </td>
                        <td className="py-1.5 px-3 text-muted-foreground">
                          {row.company || "—"}
                        </td>
                        <td className="py-1.5 px-3 text-muted-foreground">
                          {row.region || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {importing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Importing users…</span>
                <span className="text-foreground font-medium">
                  {validCount} / {validCount}
                </span>
              </div>
              <Progress value={75} className="h-1.5" />
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-border/30 flex items-center gap-2">
          <Button
            size="sm"
            className="flex-1 h-8 text-xs gap-1.5"
            disabled={validCount === 0 || importing}
            onClick={handleImport}
            data-ocid="import-submit"
          >
            <CheckCircle2 className="w-3 h-3" />
            {importing ? "Importing…" : `Import ${validCount} Users`}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 text-xs"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Role Change Confirmation Modal ───────────────────────────────────────────

function EditRoleModal({
  user,
  onClose,
  onSave,
}: {
  user: AdminUser;
  onClose: () => void;
  onSave: (id: string, role: UserRole) => void;
}) {
  const [role, setRole] = useState<UserRole>(user.role);
  const changed = role !== user.role;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm glass-elevated border-border/40">
        <DialogHeader>
          <DialogTitle className="font-display text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Change Role
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-border/20">
            <UserAvatar name={user.name} sessionActive={user.sessionActive} />
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {user.name}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {user.email}
              </p>
            </div>
          </div>

          {changed && (
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400">
              <AlertTriangle className="w-3 h-3 flex-shrink-0" />
              Change <strong className="font-semibold">{user.role}</strong> →{" "}
              <strong className="font-semibold">{role}</strong>? An audit log
              entry will be created.
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-xs">New Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger
                className="h-9 text-xs bg-background/50"
                data-ocid="edit-role-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_ROLES.map((r) => (
                  <SelectItem key={r} value={r}>
                    <span
                      className={cn("text-xs", ROLE_COLORS[r].split(" ")[1])}
                    >
                      {r}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              className="flex-1 h-8 text-xs"
              disabled={!changed}
              onClick={() => {
                onSave(user.id, role);
                onClose();
              }}
              data-ocid="edit-role-save"
            >
              Confirm Change
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Disable/Enable Confirmation Modal ────────────────────────────────────────

function ToggleStatusModal({
  user,
  onClose,
  onConfirm,
}: { user: AdminUser; onClose: () => void; onConfirm: (id: string) => void }) {
  const isDisabling = user.status === "active";

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm glass-elevated border-border/40">
        <DialogHeader>
          <DialogTitle
            className={cn(
              "font-display text-base flex items-center gap-2",
              isDisabling ? "text-red-400" : "text-emerald-400",
            )}
          >
            {isDisabling ? (
              <UserX className="w-4 h-4" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
            {isDisabling ? "Disable User" : "Enable User"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <p className="text-xs text-muted-foreground">
            {isDisabling ? (
              <>
                Disable <strong className="text-foreground">{user.name}</strong>
                ? They will lose access immediately and all active sessions will
                be terminated.
              </>
            ) : (
              <>
                Re-enable{" "}
                <strong className="text-foreground">{user.name}</strong>? They
                will regain access with their existing role and permissions.
              </>
            )}
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "flex-1 h-8 text-xs gap-1",
                isDisabling
                  ? "border-red-500/30 text-red-400 hover:bg-red-500/10"
                  : "border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10",
              )}
              onClick={() => {
                onConfirm(user.id);
                onClose();
              }}
              data-ocid="toggle-status-confirm"
            >
              {isDisabling ? (
                <>
                  <UserX className="w-3 h-3" /> Disable
                </>
              ) : (
                <>
                  <UserCheck className="w-3 h-3" /> Enable
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Force Logout Confirm Modal ───────────────────────────────────────────────

function ForceLogoutModal({
  user,
  onClose,
  onConfirm,
}: { user: AdminUser; onClose: () => void; onConfirm: (id: string) => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm glass-elevated border-border/40">
        <DialogHeader>
          <DialogTitle className="font-display text-base flex items-center gap-2 text-orange-400">
            <LogOut className="w-4 h-4" /> Force Logout
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <p className="text-xs text-muted-foreground">
            This will immediately terminate all active sessions for{" "}
            <strong className="text-foreground">{user.name}</strong>. They will
            need to log in again.
          </p>
          <div className="flex items-center gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs text-orange-400">
            <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
            Any unsaved work in their session will be lost.
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="flex-1 h-8 text-xs border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
              onClick={() => {
                onConfirm(user.id);
                onClose();
              }}
              data-ocid="force-logout-confirm"
            >
              <LogOut className="w-3 h-3 mr-1" /> Force Logout
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Row Actions Dropdown ─────────────────────────────────────────────────────

function RowActions({
  user,
  onSessions,
  onEditRole,
  onToggleStatus,
  onForceLogout,
}: {
  user: AdminUser;
  onSessions: () => void;
  onEditRole: () => void;
  onToggleStatus: () => void;
  onForceLogout: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        aria-label="More actions"
        onClick={() => setOpen((o) => !o)}
        data-ocid={`row-more-${user.id}`}
      >
        <MoreHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
      </Button>
      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
            role="presentation"
          />
          <div className="absolute right-0 top-7 z-50 w-48 glass-elevated rounded-lg border border-border/40 shadow-lg overflow-hidden">
            {[
              { label: "View Sessions", icon: Wifi, action: onSessions },
              { label: "Change Role", icon: Shield, action: onEditRole },
              {
                label:
                  user.status === "active"
                    ? "Disable Account"
                    : "Enable Account",
                icon: user.status === "active" ? UserMinus : UserCheck,
                action: onToggleStatus,
              },
              { label: "Force Logout", icon: LogOut, action: onForceLogout },
            ].map(({ label, icon: Icon, action }) => (
              <button
                key={label}
                type="button"
                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-primary/10 transition-smooth"
                onClick={() => {
                  setOpen(false);
                  action();
                }}
              >
                <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Table Row ─────────────────────────────────────────────────────────────────

function UserTableRow({
  user,
  companyPlan,
  selected,
  onSelect,
  onSessions,
  onEditRole,
  onToggleStatus,
  onForceLogout,
}: {
  user: AdminUser;
  companyPlan: string;
  selected: boolean;
  onSelect: (checked: boolean) => void;
  onSessions: () => void;
  onEditRole: () => void;
  onToggleStatus: () => void;
  onForceLogout: () => void;
}) {
  const sessionCount = user.activeSessions.length;
  const activeSessionCount = user.activeSessions.filter(
    (s) => s.isActive,
  ).length;

  return (
    <tr
      className={cn(
        "border-b border-border/15 transition-colors group",
        selected ? "bg-primary/5" : "hover:bg-muted/10",
      )}
      data-ocid={`user-row-${user.id}`}
    >
      {/* Checkbox */}
      <td className="py-2.5 pl-4 pr-2 w-9">
        <Checkbox
          checked={selected}
          onCheckedChange={onSelect}
          className="w-3.5 h-3.5"
          data-ocid={`select-${user.id}`}
        />
      </td>

      {/* User */}
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-2.5">
          <UserAvatar name={user.name} sessionActive={user.sessionActive} />
          <div className="min-w-0">
            <p className="text-xs font-medium text-foreground truncate max-w-[140px]">
              {user.name}
            </p>
            <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">
              {user.email}
            </p>
          </div>
        </div>
      </td>

      {/* Company */}
      <td className="py-2.5 px-3">
        <div className="min-w-0">
          <p className="text-xs text-foreground truncate max-w-[130px]">
            {user.company}
          </p>
          <Badge
            className={cn(
              "text-[8px] border mt-0.5 px-1.5 py-0",
              PLAN_BADGE[companyPlan] ?? PLAN_BADGE.BASIC,
            )}
          >
            {companyPlan}
          </Badge>
        </div>
      </td>

      {/* Role */}
      <td className="py-2.5 px-3">
        <Badge
          className={cn(
            "text-[9px] border",
            ROLE_COLORS[user.role] ??
              "bg-muted/30 text-muted-foreground border-border/40",
          )}
        >
          {user.role}
        </Badge>
      </td>

      {/* Status */}
      <td className="py-2.5 px-3">
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border transition-smooth hover:opacity-80",
            STATUS_COLORS[user.status],
          )}
          onClick={onToggleStatus}
          aria-label={user.status === "active" ? "Disable user" : "Enable user"}
          data-ocid={`toggle-status-${user.id}`}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              user.status === "active" ? "bg-emerald-400" : "bg-red-400",
            )}
          />
          {user.status}
        </button>
      </td>

      {/* Last Login */}
      <td className="py-2.5 px-3 text-[10px] text-muted-foreground whitespace-nowrap">
        {relativeTime(user.lastLogin)}
      </td>

      {/* Sessions (clickable count) */}
      <td className="py-2.5 px-3">
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-medium border transition-smooth",
            sessionCount > 0
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25 hover:bg-emerald-500/20 cursor-pointer"
              : "bg-muted/20 text-muted-foreground border-border/30 cursor-default",
          )}
          onClick={sessionCount > 0 ? onSessions : undefined}
          data-ocid={`sessions-count-${user.id}`}
        >
          <Wifi className="w-2.5 h-2.5" />
          {activeSessionCount}/{sessionCount}
        </button>
      </td>

      {/* MFA */}
      <td className="py-2.5 px-3">
        {user.mfaEnabled ? (
          <Shield
            className="w-3.5 h-3.5 text-emerald-400"
            aria-label="MFA enabled"
          />
        ) : (
          <ShieldOff
            className="w-3.5 h-3.5 text-muted-foreground/30"
            aria-label="MFA disabled"
          />
        )}
      </td>

      {/* Region */}
      <td className="py-2.5 px-3">
        <Badge className="text-[9px] border bg-muted/20 text-muted-foreground border-border/30">
          {user.region}
        </Badge>
      </td>

      {/* Actions */}
      <td className="py-2.5 px-3">
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            aria-label="Force logout"
            onClick={onForceLogout}
            data-ocid={`btn-force-logout-${user.id}`}
          >
            <LogOut className="w-3 h-3 text-muted-foreground hover:text-orange-400 transition-colors" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            aria-label={
              user.status === "active" ? "Disable user" : "Enable user"
            }
            onClick={onToggleStatus}
            data-ocid={`btn-toggle-${user.id}`}
          >
            {user.status === "active" ? (
              <UserX className="w-3 h-3 text-muted-foreground hover:text-red-400 transition-colors" />
            ) : (
              <UserCheck className="w-3 h-3 text-muted-foreground hover:text-emerald-400 transition-colors" />
            )}
          </Button>
          <RowActions
            user={user}
            onSessions={onSessions}
            onEditRole={onEditRole}
            onToggleStatus={onToggleStatus}
            onForceLogout={onForceLogout}
          />
        </div>
      </td>
    </tr>
  );
}

// ─── Bulk Action Bar ───────────────────────────────────────────────────────────

function BulkActionBar({
  count,
  onClear,
  onBulkRole,
  onBulkDisable,
  onBulkExport,
  onBulkForceLogout,
}: {
  count: number;
  onClear: () => void;
  onBulkRole: () => void;
  onBulkDisable: () => void;
  onBulkExport: () => void;
  onBulkForceLogout: () => void;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-primary/10 border-b border-primary/20 rounded-t-lg">
      <div className="flex items-center gap-2">
        <Checkbox checked onCheckedChange={onClear} className="w-3.5 h-3.5" />
        <span className="text-xs font-medium text-primary">
          {count} user{count > 1 ? "s" : ""} selected
        </span>
      </div>
      <div className="flex items-center gap-1.5 ml-2">
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-[10px] gap-1 border-primary/30 text-primary hover:bg-primary/10"
          onClick={onBulkRole}
          data-ocid="bulk-change-role"
        >
          <Shield className="w-2.5 h-2.5" /> Change Role
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-[10px] gap-1 border-red-500/30 text-red-400 hover:bg-red-500/10"
          onClick={onBulkDisable}
          data-ocid="bulk-disable"
        >
          <UserMinus className="w-2.5 h-2.5" /> Disable Selected
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-[10px] gap-1 border-orange-500/30 text-orange-400 hover:bg-orange-500/10"
          onClick={onBulkForceLogout}
          data-ocid="bulk-force-logout"
        >
          <LogOut className="w-2.5 h-2.5" /> Force Logout All
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-6 text-[10px] gap-1 border-border/40 text-muted-foreground hover:bg-muted/20"
          onClick={onBulkExport}
          data-ocid="bulk-export"
        >
          <Download className="w-2.5 h-2.5" /> Export Selected
        </Button>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 ml-auto text-muted-foreground"
        onClick={onClear}
      >
        <X className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

// ─── Bulk Role Modal ───────────────────────────────────────────────────────────

function BulkRoleModal({
  count,
  onClose,
  onSave,
}: { count: number; onClose: () => void; onSave: (role: UserRole) => void }) {
  const [role, setRole] = useState<UserRole>("NOC Operator");
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm glass-elevated border-border/40">
        <DialogHeader>
          <DialogTitle className="font-display text-base flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" /> Change Role for {count}{" "}
            Users
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
            <SelectTrigger
              className="h-9 text-xs bg-background/50"
              data-ocid="bulk-role-select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_ROLES.map((r) => (
                <SelectItem key={r} value={r} className="text-xs">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 h-8 text-xs"
              onClick={() => {
                onSave(role);
                onClose();
              }}
              data-ocid="bulk-role-save"
            >
              Apply to {count} users
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 text-xs"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

type ModalState =
  | { type: "none" }
  | { type: "sessions"; userId: string }
  | { type: "editRole"; userId: string }
  | { type: "forceLogout"; userId: string }
  | { type: "toggleStatus"; userId: string }
  | { type: "invite" }
  | { type: "import" }
  | { type: "bulkRole" };

export default function GlobalUserManagement(): React.ReactElement {
  const [users, setUsers] = useState<AdminUser[]>(() => [...MOCK_ADMIN_USERS]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState<ModalState>({ type: "none" });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Search debounce ref
  const searchRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const handleSearchChange = (val: string) => {
    setSearch(val);
    if (searchRef.current) clearTimeout(searchRef.current);
    searchRef.current = setTimeout(() => {
      setDebouncedSearch(val);
      setPage(1);
    }, 250);
  };

  // Company plan map
  const companyPlanMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const c of MOCK_COMPANIES) map[c.id] = c.plan as string;
    return map;
  }, []);

  const allCompanies = useMemo(
    () => MOCK_COMPANIES.map((c) => ({ id: c.id, name: c.name })),
    [],
  );

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase();
    return users.filter((u) => {
      if (
        q &&
        !u.name.toLowerCase().includes(q) &&
        !u.email.toLowerCase().includes(q)
      )
        return false;
      if (companyFilter !== "all" && u.companyId !== companyFilter)
        return false;
      if (roleFilter !== "all" && u.role !== roleFilter) return false;
      if (statusFilter !== "all" && u.status !== statusFilter) return false;
      if (regionFilter !== "all" && u.region !== regionFilter) return false;
      return true;
    });
  }, [
    users,
    debouncedSearch,
    companyFilter,
    roleFilter,
    statusFilter,
    regionFilter,
  ]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const pageEnd = Math.min(pageStart + PAGE_SIZE, filtered.length);
  const pageUsers = filtered.slice(pageStart, pageEnd);

  const stats = useMemo(
    () => ({
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      disabled: users.filter((u) => u.status === "disabled").length,
      sessions: users.reduce(
        (sum, u) => sum + u.activeSessions.filter((s) => s.isActive).length,
        0,
      ),
    }),
    [users],
  );

  const hasFilters =
    companyFilter !== "all" ||
    roleFilter !== "all" ||
    statusFilter !== "all" ||
    regionFilter !== "all" ||
    debouncedSearch !== "";

  const clearFilters = () => {
    setSearch("");
    setDebouncedSearch("");
    setCompanyFilter("all");
    setRoleFilter("all");
    setStatusFilter("all");
    setRegionFilter("all");
    setPage(1);
  };

  // Selection handlers
  const pageUserIds = useMemo(
    () => new Set(pageUsers.map((u) => u.id)),
    [pageUsers],
  );
  const allPageSelected =
    pageUsers.length > 0 && pageUsers.every((u) => selectedIds.has(u.id));

  const toggleSelectAll = (checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        for (const id of pageUserIds) next.add(id);
      } else {
        for (const id of pageUserIds) next.delete(id);
      }
      return next;
    });
  };

  const toggleSelect = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const selectedUsers = useMemo(
    () => users.filter((u) => selectedIds.has(u.id)),
    [users, selectedIds],
  );

  // Mutations
  const handleToggleStatus = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id
          ? {
              ...u,
              status: (u.status === "active"
                ? "disabled"
                : "active") as UserStatus,
              sessionActive: u.status === "active" ? false : u.sessionActive,
              activeSessions: u.status === "active" ? [] : u.activeSessions,
            }
          : u,
      ),
    );
  }, []);

  const handleForceLogout = useCallback((id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, sessionActive: false, activeSessions: [] } : u,
      ),
    );
  }, []);

  const handleEditRole = useCallback((id: string, role: UserRole) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role } : u)));
  }, []);

  const handleForceLogoutSession = useCallback(
    (userId: string, sessionId: string) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? {
                ...u,
                activeSessions: u.activeSessions.filter(
                  (s) => s.id !== sessionId,
                ),
              }
            : u,
        ),
      );
    },
    [],
  );

  const handleInvite = useCallback(
    (email: string, role: UserRole, companyId: string) => {
      const company = MOCK_COMPANIES.find((c) => c.id === companyId);
      const newUser: AdminUser = {
        id: `usr-inv-${Date.now()}`,
        name: email
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
        email,
        role,
        status: "active",
        lastLogin: new Date().toISOString(),
        company: company?.name ?? "Unknown",
        companyId,
        companyName: company?.name ?? "Unknown",
        region: company?.region ?? "Unknown",
        assignedRegion: company?.region ?? "Unknown",
        mfaEnabled: false,
        sessionActive: false,
        activeSessions: [],
      };
      setUsers((prev) => [newUser, ...prev]);
    },
    [],
  );

  const handleBulkDisable = () => {
    for (const id of selectedIds) handleToggleStatus(id);
    setSelectedIds(new Set());
  };
  const handleBulkForceLogout = () => {
    for (const id of selectedIds) handleForceLogout(id);
    setSelectedIds(new Set());
  };
  const handleBulkRole = (role: UserRole) => {
    for (const id of selectedIds) handleEditRole(id, role);
    setSelectedIds(new Set());
  };

  const getUser = (id: string) => users.find((u) => u.id === id);

  // Targeted user for modals
  const sessionsUser =
    modal.type === "sessions" ? getUser(modal.userId) : undefined;
  const editRoleUser =
    modal.type === "editRole" ? getUser(modal.userId) : undefined;
  const forceLogoutUser =
    modal.type === "forceLogout" ? getUser(modal.userId) : undefined;
  const toggleStatusUser =
    modal.type === "toggleStatus" ? getUser(modal.userId) : undefined;

  return (
    <div className="p-6 space-y-5 max-w-[1600px] mx-auto">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground leading-tight">
              Global User Management
            </h1>
            <p className="text-xs text-muted-foreground">
              Manage {users.length.toLocaleString()}+ users across all tenants
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => exportCsv(filtered)}
            data-ocid="btn-export-csv"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setModal({ type: "import" })}
            data-ocid="btn-bulk-import"
          >
            <Upload className="w-3.5 h-3.5" /> Bulk Import
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs gap-1.5"
            onClick={() => setModal({ type: "invite" })}
            data-ocid="btn-invite-user"
          >
            <UserPlus className="w-3.5 h-3.5" /> Invite User
          </Button>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard
          label="Total Users"
          value={stats.total}
          sub={`${allCompanies.length} companies`}
          color="text-blue-400"
          icon={Users}
        />
        <StatCard
          label="Active Users"
          value={stats.active}
          sub={`${Math.round((stats.active / stats.total) * 100)}% of total`}
          color="text-emerald-400"
          icon={UserCheck}
        />
        <StatCard
          label="Disabled Users"
          value={stats.disabled}
          sub="Access revoked"
          color="text-red-400"
          icon={UserX}
        />
        <StatCard
          label="Active Sessions"
          value={stats.sessions}
          sub="Live right now"
          color="text-amber-400"
          icon={Wifi}
        />
      </div>

      {/* ── Filter Toolbar ── */}
      <GlassCard className="p-3">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Search */}
          <div className="relative min-w-[220px] flex-1 max-w-sm">
            <Users className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search name or email…"
              value={search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-8 h-8 text-xs bg-background/50"
              data-ocid="input-user-search"
            />
            {search && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleSearchChange("")}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Company filter */}
          <Select
            value={companyFilter}
            onValueChange={(v) => {
              setCompanyFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 text-xs w-48 bg-background/50"
              data-ocid="filter-company"
            >
              <SelectValue placeholder="All Companies" />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              <SelectItem value="all">All Companies</SelectItem>
              {allCompanies.map((c) => (
                <SelectItem key={c.id} value={c.id} className="text-xs">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Role filter */}
          <Select
            value={roleFilter}
            onValueChange={(v) => {
              setRoleFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 text-xs w-44 bg-background/50"
              data-ocid="filter-role"
            >
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {ALL_ROLES.map((r) => (
                <SelectItem key={r} value={r} className="text-xs">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status filter */}
          <Select
            value={statusFilter}
            onValueChange={(v) => {
              setStatusFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 text-xs w-36 bg-background/50"
              data-ocid="filter-user-status"
            >
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="disabled">Disabled</SelectItem>
            </SelectContent>
          </Select>

          {/* Region filter */}
          <Select
            value={regionFilter}
            onValueChange={(v) => {
              setRegionFilter(v);
              setPage(1);
            }}
          >
            <SelectTrigger
              className="h-8 text-xs w-32 bg-background/50"
              data-ocid="filter-region"
            >
              <SelectValue placeholder="All Regions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {REGION_LIST.map((r) => (
                <SelectItem key={r} value={r} className="text-xs">
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs gap-1 text-muted-foreground hover:text-foreground"
              onClick={clearFilters}
            >
              <X className="w-3 h-3" /> Clear
            </Button>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            <Filter className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              Showing{" "}
              <span className="font-medium text-foreground">
                {filtered.length.toLocaleString()}
              </span>{" "}
              of{" "}
              <span className="font-medium text-foreground">
                {users.length.toLocaleString()}
              </span>{" "}
              users
            </span>
          </div>
        </div>
      </GlassCard>

      {/* ── Users Table ── */}
      <GlassCard className="overflow-hidden">
        {selectedIds.size > 0 && (
          <BulkActionBar
            count={selectedIds.size}
            onClear={() => setSelectedIds(new Set())}
            onBulkRole={() => setModal({ type: "bulkRole" })}
            onBulkDisable={handleBulkDisable}
            onBulkExport={() => exportCsv(selectedUsers)}
            onBulkForceLogout={handleBulkForceLogout}
          />
        )}
        <div className="overflow-x-auto noc-scrollbar">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-muted/20">
              <tr className="text-muted-foreground text-[10px] uppercase tracking-wide">
                <th className="py-2.5 pl-4 pr-2 w-9">
                  <Checkbox
                    checked={allPageSelected}
                    onCheckedChange={(v) => toggleSelectAll(!!v)}
                    className="w-3.5 h-3.5"
                    data-ocid="select-all"
                  />
                </th>
                <th className="text-left py-2.5 px-3 font-medium">User</th>
                <th className="text-left py-2.5 px-3 font-medium">Company</th>
                <th className="text-left py-2.5 px-3 font-medium">Role</th>
                <th className="text-left py-2.5 px-3 font-medium">Status</th>
                <th className="text-left py-2.5 px-3 font-medium">
                  Last Login
                </th>
                <th className="text-left py-2.5 px-3 font-medium">Sessions</th>
                <th className="text-left py-2.5 px-3 font-medium">MFA</th>
                <th className="text-left py-2.5 px-3 font-medium">Region</th>
                <th className="py-2.5 px-3 w-24" />
              </tr>
            </thead>
            <tbody>
              {pageUsers.map((user) => (
                <UserTableRow
                  key={user.id}
                  user={user}
                  companyPlan={companyPlanMap[user.companyId] ?? "BASIC"}
                  selected={selectedIds.has(user.id)}
                  onSelect={(checked) => toggleSelect(user.id, !!checked)}
                  onSessions={() =>
                    setModal({ type: "sessions", userId: user.id })
                  }
                  onEditRole={() =>
                    setModal({ type: "editRole", userId: user.id })
                  }
                  onToggleStatus={() =>
                    setModal({ type: "toggleStatus", userId: user.id })
                  }
                  onForceLogout={() =>
                    setModal({ type: "forceLogout", userId: user.id })
                  }
                />
              ))}

              {pageUsers.length === 0 && (
                <tr>
                  <td colSpan={10}>
                    <div
                      className="flex flex-col items-center py-16 text-muted-foreground gap-3"
                      data-ocid="empty-state-users"
                    >
                      <Users className="w-8 h-8 opacity-20" />
                      <p className="text-sm font-medium">
                        No users match your filters
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs"
                        onClick={clearFilters}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}

              {/* Skeleton rows when initially loading */}
              {pageUsers.length === 0 &&
                !hasFilters &&
                (["sk-1", "sk-2", "sk-3"] as const).map((k) => (
                  <tr key={k} className="border-b border-border/10">
                    <td colSpan={10} className="py-3 px-4">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-border/30 bg-muted/10">
            <div className="flex items-center gap-3">
              <p className="text-xs text-muted-foreground">
                Showing{" "}
                <span className="font-medium text-foreground">
                  {pageStart + 1}–{pageEnd}
                </span>{" "}
                of{" "}
                <span className="font-medium text-foreground">
                  {filtered.length.toLocaleString()}
                </span>{" "}
                users
              </p>
              {filtered.length < users.length && (
                <Badge className="text-[9px] border bg-primary/10 text-primary border-primary/20">
                  <Filter className="w-2.5 h-2.5 mr-1" />
                  Filtered
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled={safePage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                data-ocid="pagination-prev"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </Button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const offset = Math.max(
                  0,
                  Math.min(safePage - 3, totalPages - 5),
                );
                const p = offset + i + 1;
                return (
                  <Button
                    key={p}
                    variant={p === safePage ? "default" : "ghost"}
                    size="icon"
                    className="h-7 w-7 text-xs"
                    onClick={() => setPage(p)}
                    data-ocid={`pagination-page-${p}`}
                  >
                    {p}
                  </Button>
                );
              })}
              <Button
                variant="outline"
                size="icon"
                className="h-7 w-7"
                disabled={safePage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                data-ocid="pagination-next"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        )}
      </GlassCard>

      {/* ── Modals ── */}
      {modal.type === "sessions" && sessionsUser && (
        <SessionTrackingModal
          user={sessionsUser}
          sessions={sessionsUser.activeSessions}
          onClose={() => setModal({ type: "none" })}
          onForceLogoutSession={(sessionId) =>
            handleForceLogoutSession(sessionsUser.id, sessionId)
          }
          onForceLogoutAll={() => handleForceLogout(sessionsUser.id)}
        />
      )}
      {modal.type === "editRole" && editRoleUser && (
        <EditRoleModal
          user={editRoleUser}
          onClose={() => setModal({ type: "none" })}
          onSave={handleEditRole}
        />
      )}
      {modal.type === "toggleStatus" && toggleStatusUser && (
        <ToggleStatusModal
          user={toggleStatusUser}
          onClose={() => setModal({ type: "none" })}
          onConfirm={handleToggleStatus}
        />
      )}
      {modal.type === "forceLogout" && forceLogoutUser && (
        <ForceLogoutModal
          user={forceLogoutUser}
          onClose={() => setModal({ type: "none" })}
          onConfirm={handleForceLogout}
        />
      )}
      {modal.type === "invite" && (
        <InviteUserModal
          onClose={() => setModal({ type: "none" })}
          onInvite={handleInvite}
        />
      )}
      {modal.type === "import" && (
        <BulkImportModal onClose={() => setModal({ type: "none" })} />
      )}
      {modal.type === "bulkRole" && (
        <BulkRoleModal
          count={selectedIds.size}
          onClose={() => setModal({ type: "none" })}
          onSave={handleBulkRole}
        />
      )}

      {/* Hidden elements for unused imports — kept for future use */}
      <span className="hidden">
        <FileText className="hidden" />
        <KeyRound className="hidden" />
        <MapPin className="hidden" />
      </span>
    </div>
  );
}
