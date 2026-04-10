import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Filter,
  Pause,
  Play,
  Plus,
  Trash2,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────

type WorkflowStatus = "active" | "paused" | "draft";
type TriggerType =
  | "alert_threshold"
  | "schedule"
  | "device_status"
  | "manual"
  | "signal_degradation"
  | "sla_breach";

interface WorkflowNode {
  id: string;
  label: string;
  type: "trigger" | "condition" | "action" | "notify";
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: WorkflowStatus;
  trigger: TriggerType;
  lastRun: string;
  executions: number;
  nextRun: string | null;
  nodes: WorkflowNode[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRIGGER_META: Record<
  TriggerType,
  { label: string; icon: React.FC<{ size?: number; className?: string }> }
> = {
  alert_threshold: { label: "Alert Threshold Triggered", icon: AlertTriangle },
  schedule: { label: "Schedule (Cron)", icon: Calendar },
  device_status: { label: "Device Status Change", icon: Activity },
  manual: { label: "Manual", icon: Play },
  signal_degradation: { label: "Signal Degradation", icon: Zap },
  sla_breach: { label: "SLA Breach", icon: Bell },
};

const MOCK_WORKFLOWS: Workflow[] = [
  {
    id: "wf-001",
    name: "Auto-Isolate Faulty ONT",
    description:
      "Detects ONT signal loss, isolates the port, and triggers provisioning rollback automatically.",
    status: "active",
    trigger: "alert_threshold",
    lastRun: "2026-04-10T08:14:00Z",
    executions: 342,
    nextRun: null,
    nodes: [
      { id: "n1", label: "Alert: ONT Loss", type: "trigger" },
      { id: "n2", label: "BER > -28 dBm?", type: "condition" },
      { id: "n3", label: "Isolate Port", type: "action" },
      { id: "n4", label: "Notify NOC", type: "notify" },
    ],
  },
  {
    id: "wf-002",
    name: "High BER Alert Escalation",
    description:
      "Monitors bit error rate on backbone links and escalates to L2 support when threshold is crossed.",
    status: "active",
    trigger: "signal_degradation",
    lastRun: "2026-04-10T07:55:00Z",
    executions: 118,
    nextRun: null,
    nodes: [
      { id: "n1", label: "Signal Degradation", type: "trigger" },
      { id: "n2", label: "BER Threshold Check", type: "condition" },
      { id: "n3", label: "Create Ticket", type: "action" },
      { id: "n4", label: "Email L2 Team", type: "notify" },
    ],
  },
  {
    id: "wf-003",
    name: "Nightly Link Performance Report",
    description:
      "Generates aggregated link performance metrics every night at 02:00 and emails the ops team.",
    status: "active",
    trigger: "schedule",
    lastRun: "2026-04-10T02:00:00Z",
    executions: 87,
    nextRun: "2026-04-11T02:00:00Z",
    nodes: [
      { id: "n1", label: "Cron: 02:00 Daily", type: "trigger" },
      { id: "n2", label: "Links Online?", type: "condition" },
      { id: "n3", label: "Aggregate Metrics", type: "action" },
      { id: "n4", label: "Send Report Email", type: "notify" },
    ],
  },
  {
    id: "wf-004",
    name: "OLT Failover Procedure",
    description:
      "Executes redundancy switchover when primary OLT goes offline, rerouting traffic to standby unit.",
    status: "paused",
    trigger: "device_status",
    lastRun: "2026-03-28T15:42:00Z",
    executions: 9,
    nextRun: null,
    nodes: [
      { id: "n1", label: "OLT Status: Offline", type: "trigger" },
      { id: "n2", label: "Standby Available?", type: "condition" },
      { id: "n3", label: "Reroute Traffic", type: "action" },
      { id: "n4", label: "Alert Dashboard", type: "notify" },
    ],
  },
  {
    id: "wf-005",
    name: "SLA Breach Notification",
    description:
      "Watches SLA compliance metrics and fires notifications to account managers when breaches occur.",
    status: "paused",
    trigger: "sla_breach",
    lastRun: "2026-04-08T11:10:00Z",
    executions: 23,
    nextRun: null,
    nodes: [
      { id: "n1", label: "SLA Breach Detected", type: "trigger" },
      { id: "n2", label: "Customer Tier > Gold?", type: "condition" },
      { id: "n3", label: "Log SLA Event", type: "action" },
      { id: "n4", label: "Notify Account Mgr", type: "notify" },
    ],
  },
  {
    id: "wf-006",
    name: "Fiber Cut Emergency Response",
    description:
      "Draft emergency protocol for rapid response to confirmed fiber cuts, pending field crew integration.",
    status: "draft",
    trigger: "manual",
    lastRun: "N/A",
    executions: 0,
    nextRun: null,
    nodes: [
      { id: "n1", label: "Manual Trigger", type: "trigger" },
      { id: "n2", label: "Severity Critical?", type: "condition" },
      { id: "n3", label: "Dispatch Field Crew", type: "action" },
      { id: "n4", label: "Broadcast Alert", type: "notify" },
    ],
  },
];

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<
  WorkflowStatus,
  { label: string; dotColor: string; badgeClass: string }
> = {
  active: {
    label: "Active",
    dotColor: "bg-emerald-400",
    badgeClass:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  },
  paused: {
    label: "Paused",
    dotColor: "bg-yellow-400",
    badgeClass: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  },
  draft: {
    label: "Draft",
    dotColor: "bg-muted-foreground",
    badgeClass: "bg-muted/40 text-muted-foreground border border-border",
  },
};

// ─── Node type styles ─────────────────────────────────────────────────────────

const NODE_STYLE: Record<WorkflowNode["type"], string> = {
  trigger: "border-cyan-400/60 bg-cyan-500/10 text-cyan-300",
  condition: "border-orange-400/60 bg-orange-500/10 text-orange-300",
  action: "border-emerald-400/60 bg-emerald-500/10 text-emerald-300",
  notify: "border-purple-400/60 bg-purple-500/10 text-purple-300",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTs(raw: string): string {
  if (raw === "N/A") return "Never";
  try {
    return new Date(raw).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return raw;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: number | string;
  accent?: string;
}) {
  return (
    <GlassCard className="flex flex-col items-center justify-center px-6 py-4 min-w-[128px]">
      <span
        className={cn(
          "text-2xl font-bold font-mono tabular-nums",
          accent ?? "text-primary",
        )}
      >
        {value}
      </span>
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 whitespace-nowrap">
        {label}
      </span>
    </GlassCard>
  );
}

function NodeGraph({
  nodes,
  visible,
}: {
  nodes: WorkflowNode[];
  visible: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="node-graph"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-4 pb-2 px-1">
            <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3">
              Flow Diagram
            </p>
            <div className="flex items-center flex-wrap gap-0">
              {nodes.map((node, i) => (
                <motion.div
                  key={node.id}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.22 }}
                >
                  <div
                    className={cn(
                      "px-3 py-1.5 rounded-full border text-[11px] font-medium whitespace-nowrap",
                      NODE_STYLE[node.type],
                    )}
                  >
                    {node.label}
                  </div>
                  {i < nodes.length - 1 && (
                    <div className="flex items-center mx-1.5">
                      <div className="h-px w-4 bg-border/60" />
                      <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-border/60" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 flex-wrap">
              {(
                [
                  "trigger",
                  "condition",
                  "action",
                  "notify",
                ] as WorkflowNode["type"][]
              ).map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-[10px] text-muted-foreground"
                >
                  <span
                    className={cn("w-2 h-2 rounded-full border", NODE_STYLE[t])}
                  />
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WorkflowCard({
  workflow,
  index,
  onToggle,
  onDelete,
  onRunNow,
}: {
  workflow: Workflow;
  index: number;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onRunNow: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[workflow.status];
  const TriggerIcon = TRIGGER_META[workflow.trigger].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{
        delay: index * 0.07,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
      }}
      data-ocid={`workflow-card-${workflow.id}`}
    >
      <GlassCard
        elevated
        className={cn(
          "p-5 transition-smooth",
          workflow.status === "active" && "hover:noc-glow-ok",
        )}
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-foreground truncate">
                {workflow.name}
              </h3>
              <span
                className={cn("status-badge text-[10px]", status.badgeClass)}
              >
                <span
                  className={cn("w-1.5 h-1.5 rounded-full", status.dotColor)}
                />
                {status.label}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {workflow.description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              data-ocid={`run-now-${workflow.id}`}
              onClick={() => onRunNow(workflow.id)}
              title="Run Now"
              className="p-1.5 rounded-lg transition-smooth bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
            >
              <Play size={13} />
            </button>
            <button
              type="button"
              data-ocid={`toggle-${workflow.id}`}
              onClick={() => onToggle(workflow.id)}
              title={workflow.status === "active" ? "Pause" : "Activate"}
              className={cn(
                "p-1.5 rounded-lg transition-smooth",
                workflow.status === "active"
                  ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20"
                  : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20",
              )}
            >
              {workflow.status === "active" ? (
                <Pause size={13} />
              ) : (
                <Play size={13} />
              )}
            </button>
            <button
              type="button"
              data-ocid={`delete-${workflow.id}`}
              onClick={() => onDelete(workflow.id)}
              title="Delete Workflow"
              className="p-1.5 rounded-lg transition-smooth bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground min-w-0">
            <TriggerIcon size={12} className="shrink-0" />
            <span className="truncate">
              {TRIGGER_META[workflow.trigger].label}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Clock size={12} className="shrink-0" />
            <span className="truncate">Last: {formatTs(workflow.lastRun)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <Activity size={12} className="shrink-0" />
            <span className="tabular-nums font-mono">
              {workflow.executions} runs
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
            <CheckCircle size={12} className="shrink-0" />
            <span className="truncate">
              {workflow.nextRun
                ? `Next: ${formatTs(workflow.nextRun)}`
                : "No schedule"}
            </span>
          </div>
        </div>

        {/* Divider + expand toggle */}
        <div className="mt-3 pt-3 border-t border-border/30">
          <button
            type="button"
            data-ocid={`view-flow-${workflow.id}`}
            onClick={() => setExpanded((v) => !v)}
            className="flex items-center gap-1.5 text-[11px] font-medium text-primary hover:text-primary/80 transition-smooth"
          >
            {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            {expanded ? "Hide Flow" : "View Flow"}
          </button>
          <NodeGraph nodes={workflow.nodes} visible={expanded} />
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Workflows() {
  const [workflows, setWorkflows] = useState<Workflow[]>(MOCK_WORKFLOWS);

  const stats = {
    total: workflows.length,
    active: workflows.filter((w) => w.status === "active").length,
    paused: workflows.filter((w) => w.status === "paused").length,
    avgExec:
      workflows.length > 0
        ? Math.round(
            workflows.reduce((sum, w) => sum + w.executions, 0) /
              workflows.length,
          )
        : 0,
  };

  function handleToggle(id: string) {
    setWorkflows((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        const next: WorkflowStatus =
          w.status === "active" ? "paused" : "active";
        toast.success(
          `Workflow "${w.name}" ${next === "active" ? "activated" : "paused"}.`,
        );
        return { ...w, status: next };
      }),
    );
  }

  function handleDelete(id: string) {
    const wf = workflows.find((w) => w.id === id);
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    toast.success(`Workflow "${wf?.name ?? id}" deleted.`);
  }

  function handleRunNow(id: string) {
    const wf = workflows.find((w) => w.id === id);
    toast.info(`Running "${wf?.name ?? id}" now…`);
    setWorkflows((prev) =>
      prev.map((w) =>
        w.id === id
          ? {
              ...w,
              executions: w.executions + 1,
              lastRun: new Date().toISOString(),
            }
          : w,
      ),
    );
  }

  return (
    <div
      className="flex flex-col gap-6 p-6 min-h-full noc-scrollbar overflow-y-auto"
      data-ocid="workflows-page"
    >
      {/* Page header */}
      <motion.div
        className="flex items-start justify-between gap-4 flex-wrap"
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h1 className="text-xl font-bold font-display text-foreground tracking-tight flex items-center gap-2">
            <Zap size={20} className="text-primary" />
            Workflow Automation
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Automate NOC responses with event-driven trigger pipelines
          </p>
        </div>
        <button
          type="button"
          data-ocid="new-workflow-btn"
          onClick={() =>
            toast.info("Workflow builder coming soon — stay tuned!")
          }
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-smooth bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30"
        >
          <Plus size={15} />
          New Workflow
        </button>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        className="flex gap-3 flex-wrap"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
      >
        <StatPill label="Total Workflows" value={stats.total} />
        <StatPill
          label="Active"
          value={stats.active}
          accent="text-emerald-400"
        />
        <StatPill
          label="Paused"
          value={stats.paused}
          accent="text-yellow-400"
        />
        <StatPill
          label="Avg Exec / Day"
          value={stats.avgExec}
          accent="text-primary"
        />
      </motion.div>

      {/* Filter hint */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Filter size={12} />
        <span>
          {workflows.length} workflow{workflows.length !== 1 ? "s" : ""} loaded
        </span>
      </div>

      {/* Workflow list */}
      <AnimatePresence mode="popLayout">
        {workflows.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            data-ocid="workflows-empty-state"
            className="flex flex-col items-center justify-center py-20 gap-4 text-center"
          >
            <Zap size={40} className="text-muted-foreground/40" />
            <p className="text-sm font-semibold text-foreground">
              No workflows configured
            </p>
            <p className="text-xs text-muted-foreground">
              Create your first automation to respond to network events
              automatically.
            </p>
            <button
              type="button"
              onClick={() => toast.info("Workflow builder coming soon!")}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-primary/15 text-primary border border-primary/30 transition-smooth hover:bg-primary/25"
            >
              <Plus size={14} className="inline mr-1" />
              Create your first workflow
            </button>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-3">
            {workflows.map((wf, i) => (
              <WorkflowCard
                key={wf.id}
                workflow={wf}
                index={i}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onRunNow={handleRunNow}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
