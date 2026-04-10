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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MOCK_COMPANIES } from "@/data/superAdminMockData";
import {
  AlertTriangle,
  Bell,
  Brain,
  Check,
  CreditCard,
  Download,
  Edit2,
  Eye,
  FileText,
  Info,
  Lock,
  Map as MapIcon,
  Pencil,
  Plus,
  RefreshCw,
  Route,
  Save,
  Server,
  Settings,
  Shield,
  ShieldCheck,
  Trash2,
  Users,
  Workflow,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type Role = "Admin" | "Network Engineer" | "NOC Operator" | "Viewer";
type AbacEffect = "Allow" | "Deny";
type AbacAttributeType = "Region" | "Device Type" | "Feature Category";
type AbacCondition = "Is" | "Is Not" | "Contains";

interface PermissionDef {
  id: string;
  label: string;
  description: string;
  category: string;
  icon: React.ElementType;
}

interface AbacRule {
  id: string;
  name: string;
  description: string;
  role: Role;
  attributeType: AbacAttributeType;
  condition: AbacCondition;
  value: string;
  effect: AbacEffect;
  active: boolean;
}

// ─── Permission Definitions ────────────────────────────────────────────────────

const PERMISSIONS: PermissionDef[] = [
  {
    id: "view_devices",
    label: "View Devices",
    description: "Read device metadata, status, and location",
    category: "Devices",
    icon: Server,
  },
  {
    id: "edit_devices",
    label: "Edit Devices",
    description: "Modify device configuration, location, and metadata",
    category: "Devices",
    icon: Edit2,
  },
  {
    id: "delete_devices",
    label: "Delete Devices",
    description: "Remove devices from the inventory permanently",
    category: "Devices",
    icon: Trash2,
  },
  {
    id: "view_topology",
    label: "View Topology",
    description: "View L1/L2/L3 network topology graphs",
    category: "Topology",
    icon: Eye,
  },
  {
    id: "edit_topology",
    label: "Edit Topology",
    description: "Add, remove, or modify fiber links and topology elements",
    category: "Topology",
    icon: Pencil,
  },
  {
    id: "create_workflow",
    label: "Create Workflow",
    description: "Build new automation workflows and triggers",
    category: "Workflows",
    icon: Workflow,
  },
  {
    id: "execute_workflow",
    label: "Execute Workflow",
    description: "Run existing workflows on demand or on schedule",
    category: "Workflows",
    icon: Zap,
  },
  {
    id: "delete_workflow",
    label: "Delete Workflow",
    description: "Permanently remove workflows from the system",
    category: "Workflows",
    icon: Trash2,
  },
  {
    id: "view_alerts",
    label: "View Alerts",
    description: "See active and historical network alerts",
    category: "Alerts",
    icon: Bell,
  },
  {
    id: "ack_alerts",
    label: "Acknowledge Alerts",
    description: "Acknowledge alert notifications to indicate awareness",
    category: "Alerts",
    icon: Check,
  },
  {
    id: "clear_alerts",
    label: "Clear Alerts",
    description: "Close and archive resolved alerts",
    category: "Alerts",
    icon: ShieldCheck,
  },
  {
    id: "view_users",
    label: "View Users",
    description: "View user list, profiles, and session information",
    category: "Users",
    icon: Users,
  },
  {
    id: "manage_users",
    label: "Manage Users",
    description: "Invite, disable, assign roles, and force logout users",
    category: "Users",
    icon: Settings,
  },
  {
    id: "view_billing",
    label: "View Billing",
    description: "Access invoices, subscription info, and billing history",
    category: "Billing",
    icon: CreditCard,
  },
  {
    id: "export_reports",
    label: "Export Reports",
    description: "Download CSV, PDF reports from any module",
    category: "Reports",
    icon: Download,
  },
  {
    id: "access_map",
    label: "Access Map",
    description: "View the GIS network map dashboard",
    category: "Map",
    icon: MapIcon,
  },
  {
    id: "draw_routes",
    label: "Draw Routes",
    description: "Draw and edit fiber routes on the map",
    category: "Map",
    icon: Route,
  },
  {
    id: "api_access",
    label: "API Access",
    description: "Use API keys and access the REST/GraphQL API",
    category: "API",
    icon: Wrench,
  },
  {
    id: "view_audit",
    label: "View Audit Logs",
    description: "Read the full platform audit trail and compliance logs",
    category: "Audit",
    icon: FileText,
  },
  {
    id: "ai_assistant",
    label: "AI Assistant",
    description: "Use the AI copilot for fault diagnosis and optimization",
    category: "AI",
    icon: Brain,
  },
];

const ROLES: Role[] = ["Admin", "Network Engineer", "NOC Operator", "Viewer"];

type PermMatrix = Record<string, Record<Role, boolean>>;

function buildDefault(): PermMatrix {
  const m: PermMatrix = {};
  for (const p of PERMISSIONS) {
    m[p.id] = {
      Admin: true,
      "Network Engineer": [
        "view_devices",
        "edit_devices",
        "view_topology",
        "edit_topology",
        "create_workflow",
        "execute_workflow",
        "view_alerts",
        "ack_alerts",
        "clear_alerts",
        "view_users",
        "export_reports",
        "access_map",
        "draw_routes",
        "api_access",
        "ai_assistant",
      ].includes(p.id),
      "NOC Operator": [
        "view_devices",
        "view_topology",
        "view_alerts",
        "ack_alerts",
        "clear_alerts",
        "view_users",
        "access_map",
        "ai_assistant",
      ].includes(p.id),
      Viewer: [
        "view_devices",
        "view_topology",
        "view_alerts",
        "access_map",
      ].includes(p.id),
    };
  }
  return m;
}

const DEFAULT_MATRIX = buildDefault();

// ─── ABAC Initial Rules ────────────────────────────────────────────────────────

const INITIAL_ABAC: AbacRule[] = [
  {
    id: "r1",
    name: "Network Engineer — India Region Only",
    description:
      "Network Engineers can only access devices in the India region",
    role: "Network Engineer",
    attributeType: "Region",
    condition: "Is",
    value: "India",
    effect: "Allow",
    active: true,
  },
  {
    id: "r2",
    name: "NOC Operator — No Billing Access",
    description:
      "NOC Operators cannot view billing information or subscription details",
    role: "NOC Operator",
    attributeType: "Feature Category",
    condition: "Is",
    value: "Billing",
    effect: "Deny",
    active: true,
  },
  {
    id: "r3",
    name: "Viewer — Read Only on Alerts",
    description: "Viewers can only view alerts, not acknowledge or close them",
    role: "Viewer",
    attributeType: "Feature Category",
    condition: "Contains",
    value: "Alerts",
    effect: "Allow",
    active: true,
  },
  {
    id: "r4",
    name: "EU GDPR Compliance Barrier",
    description:
      "EU-region data accessible only to operators with GDPR clearance",
    role: "Network Engineer",
    attributeType: "Region",
    condition: "Is",
    value: "EU",
    effect: "Allow",
    active: false,
  },
  {
    id: "r5",
    name: "OLT Device Restriction",
    description: "Viewers cannot access OLT device configurations",
    role: "Viewer",
    attributeType: "Device Type",
    condition: "Is",
    value: "OLT",
    effect: "Deny",
    active: true,
  },
  {
    id: "r6",
    name: "NOC — US Region Scope",
    description:
      "NOC Operators assigned to US region can acknowledge alerts for US tenants only",
    role: "NOC Operator",
    attributeType: "Region",
    condition: "Is",
    value: "US",
    effect: "Allow",
    active: true,
  },
  {
    id: "r7",
    name: "Engineer — No Delete Devices",
    description:
      "Network Engineers cannot permanently delete devices without Admin approval",
    role: "Network Engineer",
    attributeType: "Feature Category",
    condition: "Is",
    value: "Device Delete",
    effect: "Deny",
    active: true,
  },
];

// ─── Role meta ────────────────────────────────────────────────────────────────

const ROLE_META: Record<
  Role,
  { color: string; badge: string; icon: React.ElementType; count: number }
> = {
  Admin: {
    color: "text-red-400",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    icon: Shield,
    count: 148,
  },
  "Network Engineer": {
    color: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: Wrench,
    count: 612,
  },
  "NOC Operator": {
    color: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    icon: Eye,
    count: 943,
  },
  Viewer: {
    color: "text-slate-400",
    badge: "bg-muted/40 text-muted-foreground border-border",
    icon: Info,
    count: 741,
  },
};

const CATEGORY_ORDER = [
  "Devices",
  "Topology",
  "Workflows",
  "Alerts",
  "Users",
  "Billing",
  "Reports",
  "Map",
  "API",
  "Audit",
  "AI",
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function groupedPermissions(): Array<{
  category: string;
  perms: PermissionDef[];
}> {
  const map = new Map<string, PermissionDef[]>();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const p of PERMISSIONS) {
    const arr = map.get(p.category);
    if (arr) arr.push(p);
  }
  return Array.from(map.entries())
    .filter(([, p]) => p.length > 0)
    .map(([category, perms]) => ({ category, perms }));
}

// ─── Add Rule Modal ────────────────────────────────────────────────────────────

function AddRuleModal({
  open,
  onClose,
  onAdd,
}: {
  open: boolean;
  onClose: () => void;
  onAdd: (rule: AbacRule) => void;
}) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [role, setRole] = useState<Role>("Admin");
  const [attrType, setAttrType] = useState<AbacAttributeType>("Region");
  const [condition, setCondition] = useState<AbacCondition>("Is");
  const [value, setValue] = useState("");
  const [effect, setEffect] = useState<AbacEffect>("Allow");

  function reset() {
    setName("");
    setDesc("");
    setRole("Admin");
    setAttrType("Region");
    setCondition("Is");
    setValue("");
    setEffect("Allow");
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;
    onAdd({
      id: `abac-${Date.now()}`,
      name,
      description: desc,
      role,
      attributeType: attrType,
      condition,
      value,
      effect,
      active: true,
    });
    toast.success("ABAC rule created", { description: name });
    handleClose();
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-foreground flex items-center gap-2">
            <Shield className="w-4 h-4 text-violet-400" />
            Add ABAC Rule
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Rule Name *</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="India Region Isolation"
              className="bg-background border-input"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground">Description</Label>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe what this rule restricts or allows"
              className="bg-background border-input text-sm resize-none h-18"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">
                Applies To Role
              </Label>
              <Select value={role} onValueChange={(v) => setRole(v as Role)}>
                <SelectTrigger className="bg-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {ROLES.map((r) => (
                    <SelectItem key={r} value={r}>
                      {r}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Effect</Label>
              <Select
                value={effect}
                onValueChange={(v) => setEffect(v as AbacEffect)}
              >
                <SelectTrigger className="bg-background border-input">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Allow">Allow</SelectItem>
                  <SelectItem value="Deny">Deny</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Attribute</Label>
              <Select
                value={attrType}
                onValueChange={(v) => setAttrType(v as AbacAttributeType)}
              >
                <SelectTrigger className="bg-background border-input text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Region">Region</SelectItem>
                  <SelectItem value="Device Type">Device Type</SelectItem>
                  <SelectItem value="Feature Category">
                    Feature Category
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Condition</Label>
              <Select
                value={condition}
                onValueChange={(v) => setCondition(v as AbacCondition)}
              >
                <SelectTrigger className="bg-background border-input text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  <SelectItem value="Is">Is</SelectItem>
                  <SelectItem value="Is Not">Is Not</SelectItem>
                  <SelectItem value="Contains">Contains</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs text-muted-foreground">Value *</Label>
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="India"
                className="bg-background border-input text-xs"
                required
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-border"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary text-primary-foreground"
              data-ocid="abac-rule-submit"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Rule
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── RBAC Tab ─────────────────────────────────────────────────────────────────

function RBACTab({
  matrix,
  setMatrix,
}: {
  matrix: PermMatrix;
  setMatrix: React.Dispatch<React.SetStateAction<PermMatrix>>;
}) {
  const groups = useMemo(groupedPermissions, []);
  const [saved, setSaved] = useState(false);

  function toggle(permId: string, role: Role, val: boolean) {
    if (role === "Admin") return; // Admin locked
    setMatrix((prev) => ({
      ...prev,
      [permId]: { ...prev[permId], [role]: val },
    }));
  }

  function handleReset() {
    setMatrix(buildDefault());
    toast.info("Permissions reset to defaults");
  }

  function handleSave() {
    setSaved(true);
    toast.success("Permissions saved successfully", {
      description: "Changes will take effect on next session refresh.",
    });
    setTimeout(() => setSaved(false), 2500);
  }

  const permCountByRole: Record<Role, number> = useMemo(
    () => ({
      Admin: PERMISSIONS.length,
      "Network Engineer": PERMISSIONS.filter(
        (p) => matrix[p.id]?.["Network Engineer"],
      ).length,
      "NOC Operator": PERMISSIONS.filter((p) => matrix[p.id]?.["NOC Operator"])
        .length,
      Viewer: PERMISSIONS.filter((p) => matrix[p.id]?.Viewer).length,
    }),
    [matrix],
  );

  return (
    <div className="space-y-6">
      {/* Role summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {ROLES.map((role) => {
          const { badge, icon: Icon } = ROLE_META[role];
          return (
            <GlassCard key={role} className="p-4 flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${badge}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-foreground font-display truncate">
                  {role}
                </div>
                <div className="text-xs text-muted-foreground">
                  {permCountByRole[role]}/{PERMISSIONS.length} permissions
                  {role === "Admin" && (
                    <span className="ml-1 text-amber-400 text-[10px]">
                      (locked)
                    </span>
                  )}
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Matrix */}
      <GlassCard className="overflow-x-auto">
        <TooltipProvider delayDuration={300}>
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-border/60">
                <th className="px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest w-64">
                  Permission
                </th>
                {ROLES.map((role) => {
                  const { badge } = ROLE_META[role];
                  return (
                    <th
                      key={role}
                      className="px-4 py-3 text-center min-w-[130px]"
                    >
                      <Badge className={`text-xs px-2.5 py-1 border ${badge}`}>
                        {role}
                      </Badge>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {groups.map(({ category, perms }) => (
                <>
                  <tr key={`cat-${category}`} className="bg-muted/20">
                    <td colSpan={5} className="px-4 py-2">
                      <span className="text-[10px] font-display font-bold uppercase tracking-[0.18em] text-muted-foreground/60">
                        {category}
                      </span>
                    </td>
                  </tr>
                  {perms.map((perm, ri) => {
                    const Icon = perm.icon;
                    return (
                      <tr
                        key={perm.id}
                        className={`border-b border-border/20 last:border-0 transition-colors hover:bg-muted/10 ${ri % 2 === 0 ? "" : "bg-muted/5"}`}
                      >
                        <td className="px-4 py-2.5">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="flex items-center gap-2 cursor-default w-fit">
                                <Icon className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                                <span className="text-xs text-foreground font-body">
                                  {perm.label}
                                </span>
                                <Info className="w-3 h-3 text-muted-foreground/40" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="right"
                              className="bg-popover border-border text-xs max-w-[240px]"
                            >
                              {perm.description}
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        {ROLES.map((role) => {
                          const isAdmin = role === "Admin";
                          const checked = matrix[perm.id]?.[role] ?? false;
                          return (
                            <td key={role} className="px-4 py-2.5 text-center">
                              <div className="flex justify-center">
                                <Checkbox
                                  checked={checked}
                                  onCheckedChange={(v) => {
                                    toggle(perm.id, role, !!v);
                                    if (!isAdmin) {
                                      toast.success(
                                        `${perm.label} ${v ? "enabled" : "disabled"} for ${role}`,
                                        { duration: 2000 },
                                      );
                                    }
                                  }}
                                  disabled={isAdmin}
                                  data-ocid={`perm-${perm.id}-${role.replace(/\s+/g, "-").toLowerCase()}`}
                                  className={
                                    isAdmin
                                      ? "opacity-50 cursor-not-allowed"
                                      : "cursor-pointer"
                                  }
                                />
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </>
              ))}
            </tbody>
          </table>
        </TooltipProvider>
      </GlassCard>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground gap-2"
          data-ocid="rbac-save-btn"
        >
          {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saved ? "Saved!" : "Save Changes"}
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="gap-2 border-border"
          data-ocid="rbac-reset-btn"
        >
          <RefreshCw className="w-4 h-4" />
          Reset to Defaults
        </Button>
        <Button
          variant="outline"
          className="gap-2 border-border ml-auto"
          data-ocid="rbac-export-btn"
          onClick={() => {
            const json = JSON.stringify(
              { matrix, exportedAt: new Date().toISOString() },
              null,
              2,
            );
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "rbac-policy.json";
            a.click();
            URL.revokeObjectURL(url);
            toast.success("Policy exported as JSON");
          }}
        >
          <Download className="w-4 h-4" />
          Export Policy
        </Button>
      </div>
    </div>
  );
}

// ─── ABAC Tab ─────────────────────────────────────────────────────────────────

function ABACTab({
  rules,
  setRules,
}: {
  rules: AbacRule[];
  setRules: React.Dispatch<React.SetStateAction<AbacRule[]>>;
}) {
  const [addOpen, setAddOpen] = useState(false);

  function toggleActive(id: string) {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, active: !r.active } : r)),
    );
  }

  function deleteRule(id: string) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    toast.success("Rule deleted");
  }

  function handleAdd(rule: AbacRule) {
    setRules((prev) => [rule, ...prev]);
  }

  const effectColor = (effect: AbacEffect) =>
    effect === "Allow"
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
      : "bg-red-500/15 text-red-400 border-red-500/30";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Attribute-based rules augment role permissions with contextual
            constraints (region, device type, feature access).
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => setAddOpen(true)}
          className="bg-primary text-primary-foreground gap-1.5"
          data-ocid="add-abac-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Rule
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AnimatePresence>
          {rules.map((rule, i) => {
            const { badge, icon: RoleIcon } = ROLE_META[rule.role];
            return (
              <motion.div
                key={rule.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
              >
                <GlassCard
                  className={`p-4 border-l-2 ${rule.active ? "border-l-primary" : "border-l-muted-foreground/30"}`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <RoleIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      <span
                        className={`text-sm font-semibold font-display truncate ${rule.active ? "text-foreground" : "text-muted-foreground/60"}`}
                      >
                        {rule.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Switch
                        checked={rule.active}
                        onCheckedChange={() => toggleActive(rule.id)}
                        data-ocid={`abac-toggle-${rule.id}`}
                        className="scale-75 data-[state=checked]:bg-emerald-500"
                      />
                      <button
                        type="button"
                        onClick={() => deleteRule(rule.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Delete rule"
                        data-ocid={`abac-delete-${rule.id}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    {rule.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <Badge className={`text-xs px-2 py-0.5 border ${badge}`}>
                      {rule.role}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-border font-mono text-muted-foreground"
                    >
                      {rule.attributeType}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-border font-mono text-muted-foreground"
                    >
                      {rule.condition}
                    </Badge>
                    <Badge
                      variant="outline"
                      className="text-xs px-2 py-0.5 border-border font-mono text-primary"
                    >
                      "{rule.value}"
                    </Badge>
                    <Badge
                      className={`text-xs px-2 py-0.5 border ${effectColor(rule.effect)}`}
                    >
                      {rule.effect}
                    </Badge>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AddRuleModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}

// ─── Applied Roles Summary ─────────────────────────────────────────────────────

function AppliedRolesSummary({
  matrix,
  rules,
}: { matrix: PermMatrix; rules: AbacRule[] }) {
  const rows = useMemo(
    () =>
      ROLES.map((role) => ({
        role,
        permCount: PERMISSIONS.filter((p) => matrix[p.id]?.[role]).length,
        abacCount: rules.filter((r) => r.role === role && r.active).length,
      })),
    [matrix, rules],
  );

  function handleExport() {
    const policy = {
      exportedAt: new Date().toISOString(),
      rbac: Object.fromEntries(
        ROLES.map((r) => [
          r,
          PERMISSIONS.filter((p) => matrix[p.id]?.[r]).map((p) => p.id),
        ]),
      ),
      abac: rules.filter((r) => r.active),
    };
    const blob = new Blob([JSON.stringify(policy, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "access-policy.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Full policy exported");
  }

  return (
    <GlassCard className="overflow-x-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
        <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest">
          Applied Roles Summary
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="gap-1.5 border-border text-xs"
          data-ocid="export-policy-btn"
        >
          <Download className="w-3.5 h-3.5" />
          Export Policy
        </Button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            <th className="px-4 py-2.5 text-left text-xs font-display text-muted-foreground uppercase tracking-widest">
              Role
            </th>
            <th className="px-4 py-2.5 text-center text-xs font-display text-muted-foreground uppercase tracking-widest">
              Permissions Granted
            </th>
            <th className="px-4 py-2.5 text-center text-xs font-display text-muted-foreground uppercase tracking-widest">
              Active ABAC Rules
            </th>
            <th className="px-4 py-2.5 text-center text-xs font-display text-muted-foreground uppercase tracking-widest">
              User Count
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ role, permCount, abacCount }, i) => {
            const { badge, icon: Icon } = ROLE_META[role];
            return (
              <tr
                key={role}
                className={`border-b border-border/20 last:border-0 ${i % 2 === 0 ? "bg-muted/5" : ""}`}
              >
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                    <Badge className={`text-xs px-2 py-0.5 border ${badge}`}>
                      {role}
                    </Badge>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-center text-xs text-foreground font-mono">
                  {permCount} / {PERMISSIONS.length}
                </td>
                <td className="px-4 py-2.5 text-center text-xs">
                  {abacCount > 0 ? (
                    <Badge className="bg-primary/15 text-primary border border-primary/30 text-xs px-2">
                      {abacCount}
                    </Badge>
                  ) : (
                    <span className="text-muted-foreground/50">—</span>
                  )}
                </td>
                <td className="px-4 py-2.5 text-center text-xs text-muted-foreground font-mono">
                  {ROLE_META[role].count.toLocaleString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </GlassCard>
  );
}

// ─── Company Role Table ────────────────────────────────────────────────────────

function CompanyRoleTable() {
  const companies = useMemo(() => MOCK_COMPANIES.slice(0, 12), []);
  return (
    <GlassCard className="overflow-x-auto">
      <div className="px-4 py-3 border-b border-border/50">
        <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest">
          Company Role Distribution
        </h3>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/40">
            {[
              "Company",
              "Region",
              "Plan",
              "Admins",
              "Engineers",
              "Operators",
              "Viewers",
            ].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-xs font-display text-muted-foreground uppercase tracking-widest first:text-left [&:not(:first-child)]:text-center"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {companies.map((co, i) => (
            <tr
              key={co.id}
              className={`border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors ${i % 2 === 0 ? "bg-muted/5" : ""}`}
            >
              <td className="px-4 py-2.5 text-xs font-medium text-foreground truncate max-w-[180px]">
                {co.name}
              </td>
              <td className="px-4 py-2.5 text-xs text-muted-foreground text-center">
                {co.region}
              </td>
              <td className="px-4 py-2.5 text-center">
                <Badge
                  variant="outline"
                  className="text-xs px-2 font-mono border-border"
                >
                  {co.plan}
                </Badge>
              </td>
              <td className="px-4 py-2.5 text-center text-xs text-red-400 font-mono">
                {Math.max(1, Math.floor(co.activeUsers * 0.05))}
              </td>
              <td className="px-4 py-2.5 text-center text-xs text-blue-400 font-mono">
                {Math.floor(co.activeUsers * 0.25)}
              </td>
              <td className="px-4 py-2.5 text-center text-xs text-amber-400 font-mono">
                {Math.floor(co.activeUsers * 0.4)}
              </td>
              <td className="px-4 py-2.5 text-center text-xs text-muted-foreground font-mono">
                {Math.floor(co.activeUsers * 0.3)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlassCard>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type Tab = "rbac" | "abac";

export default function AccessControl() {
  const [tab, setTab] = useState<Tab>("rbac");
  const [matrix, setMatrix] = useState<PermMatrix>(DEFAULT_MATRIX);
  const [abacRules, setAbacRules] = useState<AbacRule[]>(INITIAL_ABAC);

  const handleSetMatrix = useCallback(setMatrix, []);
  const handleSetRules = useCallback(setAbacRules, []);

  return (
    <div className="p-6 space-y-8 max-w-[1600px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center">
            <Lock className="w-5 h-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Access Control
            </h1>
            <p className="text-xs text-muted-foreground font-mono tracking-wider">
              Configure role-based and attribute-based permissions
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tab navigation */}
      <div className="flex gap-1 bg-muted/30 p-1 rounded-xl w-fit border border-border/40">
        {(["rbac", "abac"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            data-ocid={`tab-${t}`}
            className={`px-5 py-2 rounded-lg text-sm font-display font-medium transition-smooth ${
              tab === t
                ? "bg-card text-foreground shadow-sm border border-border/60"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "rbac"
              ? "Role Permissions (RBAC)"
              : "Attribute Rules (ABAC)"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2 }}
        >
          {tab === "rbac" ? (
            <RBACTab matrix={matrix} setMatrix={handleSetMatrix} />
          ) : (
            <ABACTab rules={abacRules} setRules={handleSetRules} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Applied Roles Summary */}
      <section>
        <h2 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Applied Roles Summary
        </h2>
        <AppliedRolesSummary matrix={matrix} rules={abacRules} />
      </section>

      {/* Company distribution */}
      <section>
        <h2 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
          Company Role Distribution
        </h2>
        <CompanyRoleTable />
      </section>
    </div>
  );
}
