import { r as reactExports, j as jsxRuntimeExports, m as motion, Z as Zap, A as AnimatePresence, e as cn, B as Bell, p as Activity, T as TriangleAlert, h as Clock, i as ChevronDown } from "./index-X_EKDj9u.js";
import { G as GlassCard } from "./GlassCard-CANNf_pm.js";
import { u as ue } from "./index-_psX7bNU.js";
import { P as Plus } from "./plus-BuZPJEPe.js";
import { F as Funnel } from "./funnel-CJnqAa0d.js";
import { P as Play, a as Pause } from "./play-CYHT44xf.js";
import { C as Calendar } from "./calendar-Bmlit4l8.js";
import { T as Trash2 } from "./trash-2-MaRbIygj.js";
import { C as CircleCheckBig } from "./circle-check-big-DNiJwHGs.js";
import { C as ChevronUp } from "./chevron-up-Cia-Yfm_.js";
const TRIGGER_META = {
  alert_threshold: { label: "Alert Threshold Triggered", icon: TriangleAlert },
  schedule: { label: "Schedule (Cron)", icon: Calendar },
  device_status: { label: "Device Status Change", icon: Activity },
  manual: { label: "Manual", icon: Play },
  signal_degradation: { label: "Signal Degradation", icon: Zap },
  sla_breach: { label: "SLA Breach", icon: Bell }
};
const MOCK_WORKFLOWS = [
  {
    id: "wf-001",
    name: "Auto-Isolate Faulty ONT",
    description: "Detects ONT signal loss, isolates the port, and triggers provisioning rollback automatically.",
    status: "active",
    trigger: "alert_threshold",
    lastRun: "2026-04-10T08:14:00Z",
    executions: 342,
    nextRun: null,
    nodes: [
      { id: "n1", label: "Alert: ONT Loss", type: "trigger" },
      { id: "n2", label: "BER > -28 dBm?", type: "condition" },
      { id: "n3", label: "Isolate Port", type: "action" },
      { id: "n4", label: "Notify NOC", type: "notify" }
    ]
  },
  {
    id: "wf-002",
    name: "High BER Alert Escalation",
    description: "Monitors bit error rate on backbone links and escalates to L2 support when threshold is crossed.",
    status: "active",
    trigger: "signal_degradation",
    lastRun: "2026-04-10T07:55:00Z",
    executions: 118,
    nextRun: null,
    nodes: [
      { id: "n1", label: "Signal Degradation", type: "trigger" },
      { id: "n2", label: "BER Threshold Check", type: "condition" },
      { id: "n3", label: "Create Ticket", type: "action" },
      { id: "n4", label: "Email L2 Team", type: "notify" }
    ]
  },
  {
    id: "wf-003",
    name: "Nightly Link Performance Report",
    description: "Generates aggregated link performance metrics every night at 02:00 and emails the ops team.",
    status: "active",
    trigger: "schedule",
    lastRun: "2026-04-10T02:00:00Z",
    executions: 87,
    nextRun: "2026-04-11T02:00:00Z",
    nodes: [
      { id: "n1", label: "Cron: 02:00 Daily", type: "trigger" },
      { id: "n2", label: "Links Online?", type: "condition" },
      { id: "n3", label: "Aggregate Metrics", type: "action" },
      { id: "n4", label: "Send Report Email", type: "notify" }
    ]
  },
  {
    id: "wf-004",
    name: "OLT Failover Procedure",
    description: "Executes redundancy switchover when primary OLT goes offline, rerouting traffic to standby unit.",
    status: "paused",
    trigger: "device_status",
    lastRun: "2026-03-28T15:42:00Z",
    executions: 9,
    nextRun: null,
    nodes: [
      { id: "n1", label: "OLT Status: Offline", type: "trigger" },
      { id: "n2", label: "Standby Available?", type: "condition" },
      { id: "n3", label: "Reroute Traffic", type: "action" },
      { id: "n4", label: "Alert Dashboard", type: "notify" }
    ]
  },
  {
    id: "wf-005",
    name: "SLA Breach Notification",
    description: "Watches SLA compliance metrics and fires notifications to account managers when breaches occur.",
    status: "paused",
    trigger: "sla_breach",
    lastRun: "2026-04-08T11:10:00Z",
    executions: 23,
    nextRun: null,
    nodes: [
      { id: "n1", label: "SLA Breach Detected", type: "trigger" },
      { id: "n2", label: "Customer Tier > Gold?", type: "condition" },
      { id: "n3", label: "Log SLA Event", type: "action" },
      { id: "n4", label: "Notify Account Mgr", type: "notify" }
    ]
  },
  {
    id: "wf-006",
    name: "Fiber Cut Emergency Response",
    description: "Draft emergency protocol for rapid response to confirmed fiber cuts, pending field crew integration.",
    status: "draft",
    trigger: "manual",
    lastRun: "N/A",
    executions: 0,
    nextRun: null,
    nodes: [
      { id: "n1", label: "Manual Trigger", type: "trigger" },
      { id: "n2", label: "Severity Critical?", type: "condition" },
      { id: "n3", label: "Dispatch Field Crew", type: "action" },
      { id: "n4", label: "Broadcast Alert", type: "notify" }
    ]
  }
];
const STATUS_CONFIG = {
  active: {
    label: "Active",
    dotColor: "bg-emerald-400",
    badgeClass: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
  },
  paused: {
    label: "Paused",
    dotColor: "bg-yellow-400",
    badgeClass: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
  },
  draft: {
    label: "Draft",
    dotColor: "bg-muted-foreground",
    badgeClass: "bg-muted/40 text-muted-foreground border border-border"
  }
};
const NODE_STYLE = {
  trigger: "border-cyan-400/60 bg-cyan-500/10 text-cyan-300",
  condition: "border-orange-400/60 bg-orange-500/10 text-orange-300",
  action: "border-emerald-400/60 bg-emerald-500/10 text-emerald-300",
  notify: "border-purple-400/60 bg-purple-500/10 text-purple-300"
};
function formatTs(raw) {
  if (raw === "N/A") return "Never";
  try {
    return new Date(raw).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return raw;
  }
}
function StatPill({
  label,
  value,
  accent
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col items-center justify-center px-6 py-4 min-w-[128px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: cn(
          "text-2xl font-bold font-mono tabular-nums",
          accent ?? "text-primary"
        ),
        children: value
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 whitespace-nowrap", children: label })
  ] });
}
function NodeGraph({
  nodes,
  visible
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: visible && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, height: 0 },
      animate: { opacity: 1, height: "auto" },
      exit: { opacity: 0, height: 0 },
      transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
      className: "overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-4 pb-2 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-3", children: "Flow Diagram" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center flex-wrap gap-0", children: nodes.map((node, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-center",
            initial: { opacity: 0, x: -12 },
            animate: { opacity: 1, x: 0 },
            transition: { delay: i * 0.07, duration: 0.22 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "px-3 py-1.5 rounded-full border text-[11px] font-medium whitespace-nowrap",
                    NODE_STYLE[node.type]
                  ),
                  children: node.label
                }
              ),
              i < nodes.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mx-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px w-4 bg-border/60" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-border/60" })
              ] })
            ]
          },
          node.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 mt-3 flex-wrap", children: [
          "trigger",
          "condition",
          "action",
          "notify"
        ].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "span",
          {
            className: "flex items-center gap-1.5 text-[10px] text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn("w-2 h-2 rounded-full border", NODE_STYLE[t])
                }
              ),
              t.charAt(0).toUpperCase() + t.slice(1)
            ]
          },
          t
        )) })
      ] })
    },
    "node-graph"
  ) });
}
function WorkflowCard({
  workflow,
  index,
  onToggle,
  onDelete,
  onRunNow
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const status = STATUS_CONFIG[workflow.status];
  const TriggerIcon = TRIGGER_META[workflow.trigger].icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10, scale: 0.97 },
      transition: {
        delay: index * 0.07,
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      },
      "data-ocid": `workflow-card-${workflow.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          elevated: true,
          className: cn(
            "p-5 transition-smooth",
            workflow.status === "active" && "hover:noc-glow-ok"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground truncate", children: workflow.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "span",
                    {
                      className: cn("status-badge text-[10px]", status.badgeClass),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn("w-1.5 h-1.5 rounded-full", status.dotColor)
                          }
                        ),
                        status.label
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", children: workflow.description })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `run-now-${workflow.id}`,
                    onClick: () => onRunNow(workflow.id),
                    title: "Run Now",
                    className: "p-1.5 rounded-lg transition-smooth bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `toggle-${workflow.id}`,
                    onClick: () => onToggle(workflow.id),
                    title: workflow.status === "active" ? "Pause" : "Activate",
                    className: cn(
                      "p-1.5 rounded-lg transition-smooth",
                      workflow.status === "active" ? "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20"
                    ),
                    children: workflow.status === "active" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { size: 13 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `delete-${workflow.id}`,
                    onClick: () => onDelete(workflow.id),
                    title: "Delete Workflow",
                    className: "p-1.5 rounded-lg transition-smooth bg-destructive/10 text-destructive hover:bg-destructive/20 border border-destructive/20",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 13 })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TriggerIcon, { size: 12, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: TRIGGER_META[workflow.trigger].label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate", children: [
                  "Last: ",
                  formatTs(workflow.lastRun)
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 12, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "tabular-nums font-mono", children: [
                  workflow.executions,
                  " runs"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[11px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { size: 12, className: "shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: workflow.nextRun ? `Next: ${formatTs(workflow.nextRun)}` : "No schedule" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pt-3 border-t border-border/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": `view-flow-${workflow.id}`,
                  onClick: () => setExpanded((v) => !v),
                  className: "flex items-center gap-1.5 text-[11px] font-medium text-primary hover:text-primary/80 transition-smooth",
                  children: [
                    expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 13 }),
                    expanded ? "Hide Flow" : "View Flow"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NodeGraph, { nodes: workflow.nodes, visible: expanded })
            ] })
          ]
        }
      )
    }
  );
}
function Workflows() {
  const [workflows, setWorkflows] = reactExports.useState(MOCK_WORKFLOWS);
  const stats = {
    total: workflows.length,
    active: workflows.filter((w) => w.status === "active").length,
    paused: workflows.filter((w) => w.status === "paused").length,
    avgExec: workflows.length > 0 ? Math.round(
      workflows.reduce((sum, w) => sum + w.executions, 0) / workflows.length
    ) : 0
  };
  function handleToggle(id) {
    setWorkflows(
      (prev) => prev.map((w) => {
        if (w.id !== id) return w;
        const next = w.status === "active" ? "paused" : "active";
        ue.success(
          `Workflow "${w.name}" ${next === "active" ? "activated" : "paused"}.`
        );
        return { ...w, status: next };
      })
    );
  }
  function handleDelete(id) {
    const wf = workflows.find((w) => w.id === id);
    setWorkflows((prev) => prev.filter((w) => w.id !== id));
    ue.success(`Workflow "${(wf == null ? void 0 : wf.name) ?? id}" deleted.`);
  }
  function handleRunNow(id) {
    const wf = workflows.find((w) => w.id === id);
    ue.info(`Running "${(wf == null ? void 0 : wf.name) ?? id}" now…`);
    setWorkflows(
      (prev) => prev.map(
        (w) => w.id === id ? {
          ...w,
          executions: w.executions + 1,
          lastRun: (/* @__PURE__ */ new Date()).toISOString()
        } : w
      )
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-4 md:gap-6 p-4 md:p-6 min-h-full noc-scrollbar overflow-y-auto",
      "data-ocid": "workflows-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex items-start justify-between gap-4 flex-wrap",
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-xl font-bold font-display text-foreground tracking-tight flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 20, className: "text-primary" }),
                  "Workflow Automation"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Automate NOC responses with event-driven trigger pipelines" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": "new-workflow-btn",
                  onClick: () => ue.info("Workflow builder coming soon — stay tuned!"),
                  className: "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-smooth bg-primary/15 text-primary hover:bg-primary/25 border border-primary/30",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 15 }),
                    "New Workflow"
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex gap-3 flex-wrap",
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.05, duration: 0.3 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatPill, { label: "Total Workflows", value: stats.total }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  label: "Active",
                  value: stats.active,
                  accent: "text-emerald-400"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  label: "Paused",
                  value: stats.paused,
                  accent: "text-yellow-400"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatPill,
                {
                  label: "Avg Exec / Day",
                  value: stats.avgExec,
                  accent: "text-primary"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { size: 12 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            workflows.length,
            " workflow",
            workflows.length !== 1 ? "s" : "",
            " loaded"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: workflows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            "data-ocid": "workflows-empty-state",
            className: "flex flex-col items-center justify-center py-20 gap-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 40, className: "text-muted-foreground/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No workflows configured" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Create your first automation to respond to network events automatically." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => ue.info("Workflow builder coming soon!"),
                  className: "px-4 py-2 rounded-xl text-sm font-medium bg-primary/15 text-primary border border-primary/30 transition-smooth hover:bg-primary/25",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14, className: "inline mr-1" }),
                    "Create your first workflow"
                  ]
                }
              )
            ]
          },
          "empty"
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: workflows.map((wf, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          WorkflowCard,
          {
            workflow: wf,
            index: i,
            onToggle: handleToggle,
            onDelete: handleDelete,
            onRunNow: handleRunNow
          },
          wf.id
        )) }) })
      ]
    }
  );
}
export {
  Workflows as default
};
