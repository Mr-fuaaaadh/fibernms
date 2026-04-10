import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNetworkStore } from "@/store/networkStore";
import type { PredictiveAlert, SLARecord } from "@/types/network";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Bot,
  Check,
  ChevronRight,
  Copy,
  ExternalLink,
  Map as MapIcon,
  MessageSquare,
  Plus,
  Send,
  Shield,
  Sparkles,
  TrendingUp,
  User,
  Wifi,
  Workflow,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: number;
  actionCards?: ActionCard[];
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: number;
  messageCount: number;
}

interface ActionCard {
  label: string;
  icon: React.ElementType;
  query: string;
}

type StoreState = {
  devices: ReturnType<typeof useNetworkStore.getState>["devices"];
  alerts: ReturnType<typeof useNetworkStore.getState>["alerts"];
  slaRecords: SLARecord[];
  predictiveAlerts: PredictiveAlert[];
};

// ── Mock session history ──────────────────────────────────────────────────────

const MOCK_SESSIONS: ChatSession[] = [
  {
    id: "s-01",
    title: "OLT-1 Signal Analysis",
    preview: "Checked RX power levels at OLT-CORE-01, identified marginal...",
    timestamp: Date.now() - 2 * 60 * 1000,
    messageCount: 6,
  },
  {
    id: "s-02",
    title: "Fiber Cut Investigation",
    preview: "OTDR trace shows a break at 2.4 km from the splice point...",
    timestamp: Date.now() - 45 * 60 * 1000,
    messageCount: 12,
  },
  {
    id: "s-03",
    title: "Network Health Check",
    preview: "Overall network availability at 98.7%, 3 ONTs offline in...",
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    messageCount: 8,
  },
  {
    id: "s-04",
    title: "ONT Re-provisioning",
    preview: "OMCI provisioning failed on 4 ONTs after maintenance window...",
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    messageCount: 10,
  },
  {
    id: "s-05",
    title: "Power Budget Audit",
    preview: "Reviewed all 32-way splitter links, 2 links near margin...",
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    messageCount: 7,
  },
];

// ── Inline markdown renderer ──────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let idx = 0;

  for (const match of text.matchAll(regex)) {
    if (match.index > last) {
      parts.push(
        <span key={`s${idx++}`}>{text.slice(last, match.index)}</span>,
      );
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong key={`b${idx++}`} className="text-primary font-semibold">
          {token.slice(2, -2)}
        </strong>,
      );
    } else {
      parts.push(
        <code
          key={`c${idx++}`}
          className="px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[0.78em]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    }
    last = (match.index ?? 0) + token.length;
  }

  if (last < text.length) {
    parts.push(<span key={`e${idx++}`}>{text.slice(last)}</span>);
  }
  return parts;
}

function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    const key = `${li}:${line.slice(0, 20)}`;
    if (line.startsWith("- ")) {
      return (
        <li key={key} className="ml-4 list-disc text-foreground/90">
          {renderInline(line.slice(2))}
        </li>
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h3
          key={key}
          className="text-sm font-semibold text-foreground mt-2 mb-1"
        >
          {line.slice(3)}
        </h3>
      );
    }
    return (
      <span key={key} className="block">
        {renderInline(line)}
        {li < lines.length - 1 && line === "" && <br />}
      </span>
    );
  });
}

// ── Action cards config ───────────────────────────────────────────────────────

const DEFAULT_ACTION_CARDS: ActionCard[] = [
  { label: "View on Map", icon: MapIcon, query: "Show topology overview" },
  { label: "Check SLA", icon: Shield, query: "SLA status overview" },
  { label: "Run Diagnostic", icon: Workflow, query: "Diagnose network health" },
];

// ── AI Response Engine ────────────────────────────────────────────────────────

function buildResponse(
  input: string,
  store: StoreState,
): { content: string; actionCards: ActionCard[] } {
  const q = input.toLowerCase();
  const { devices, alerts, slaRecords, predictiveAlerts } = store;
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const faultyDevices = devices.filter((d) => d.status === "faulty");
  const warnDevices = devices.filter((d) => d.status === "warning");
  const olts = devices.filter((d) => d.type === "OLT");
  const onts = devices.filter((d) => d.type === "ONT");
  const splitters = devices.filter((d) => d.type === "Splitter");
  const slaBreaches = slaRecords.filter((s) => s.status === "breach");
  const atRisk = predictiveAlerts
    .filter((a) => a.status === "active")
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 3);

  const actionCards: ActionCard[] = DEFAULT_ACTION_CARDS;

  if (/sla|service level|breach|assurance/.test(q)) {
    if (slaBreaches.length === 0) {
      return {
        content:
          "**All SLA agreements are currently compliant.** No breaches detected. All customers are receiving service within contracted parameters.\n\nMonitor the **SLA Dashboard** for real-time tracking of latency, packet loss, and uptime metrics per customer.",
        actionCards: [
          {
            label: "SLA Dashboard",
            icon: Shield,
            query: "SLA status overview",
          },
          {
            label: "Network Health",
            icon: Activity,
            query: "Network health summary",
          },
          {
            label: "View Topology",
            icon: MapIcon,
            query: "Show topology overview",
          },
        ],
      };
    }
    const list = slaBreaches
      .map(
        (s) =>
          `- **${s.customerName}** (${s.region}): uptime ${String(s.uptime)}%, latency ${String(s.latency)}ms`,
      )
      .join("\n");
    return {
      content: `**${String(slaBreaches.length)} SLA BREACH(ES) detected:**\n\n${list}\n\nImmediate actions:\n- Escalate to regional NOC team\n- Dispatch field engineers to affected areas\n- Review \`traffic shaping\` policies for impacted customers\n- Document breach timeline for compliance reporting`,
      actionCards: [
        { label: "SLA Dashboard", icon: Shield, query: "SLA status overview" },
        {
          label: "Run Diagnostic",
          icon: Workflow,
          query: "Diagnose network health",
        },
        {
          label: "View on Map",
          icon: MapIcon,
          query: "Show topology overview",
        },
      ],
    };
  }

  if (/predictive|at.risk|predict|forecast|risk/.test(q)) {
    if (atRisk.length === 0) {
      return {
        content:
          "**No high-risk devices identified.** Predictive analysis shows all monitored devices are operating within safe parameters. Continue scheduled maintenance as planned.",
        actionCards: actionCards,
      };
    }
    const list = atRisk
      .map(
        (a) =>
          `- **${a.deviceName}**: risk score **${String(a.riskScore)}/100** — ${a.failureType.replace(/-/g, " ")}, ETA ${String(a.predictedETA)}h`,
      )
      .join("\n");
    return {
      content: `**Predictive Intelligence Alert — ${String(atRisk.length)} high-risk device(s):**\n\n${list}\n\nRecommended pre-emptive actions:\n- Schedule maintenance for devices with risk score > 70\n- Pre-position spare modules for **device-failure** predictions\n- Run \`OTDR\` baseline on fiber-cut candidates\n- Check **signal trend** charts for degradation patterns`,
      actionCards: [
        {
          label: "Predictive Dashboard",
          icon: TrendingUp,
          query: "Predictive risk analysis",
        },
        {
          label: "Run OTDR",
          icon: Zap,
          query: "Explain OTDR testing procedure",
        },
        {
          label: "View on Map",
          icon: MapIcon,
          query: "Show topology overview",
        },
      ],
    };
  }

  if (/fault|alarm|alert|critical|incident/.test(q)) {
    if (activeAlerts.length === 0) {
      return {
        content:
          "**No active faults detected.** All network elements are operating within normal parameters. Continue periodic monitoring every 15 minutes as per NOC SOP.",
        actionCards: actionCards,
      };
    }
    const list = activeAlerts
      .slice(0, 6)
      .map((a) => `- **${a.deviceName}**: ${a.issueType}`)
      .join("\n");
    return {
      content: `**${String(activeAlerts.length)} active fault(s) detected:**\n\n${list}\n\nRecommended action: dispatch field team to inspect physical layer on **critical** alarms first. Use \`OTDR\` to pinpoint fiber break location. Check \`RX power\` levels against threshold (-8 to -27 dBm).`,
      actionCards: [
        {
          label: "View on Map",
          icon: MapIcon,
          query: "Show topology overview",
        },
        {
          label: "Run Diagnostic",
          icon: Workflow,
          query: "Diagnose network health",
        },
        { label: "Check SLA", icon: Shield, query: "SLA status overview" },
      ],
    };
  }

  if (/signal|dbm|optical power|rx power|receive/.test(q)) {
    const weak = devices.filter(
      (d) => d.signalStrength !== undefined && d.signalStrength < -30,
    );
    const weakDesc =
      weak.length > 0
        ? `**${String(weak.length)} device(s)** currently below threshold: ${weak.map((d) => `\`${d.name}\` at ${String(d.signalStrength)} dBm`).join(", ")}. Inspect connectors, check splice points, and verify splitter ratio.`
        : "All monitored devices currently within acceptable signal range.";
    return {
      content: `**Optical signal thresholds** for GPON networks:\n- **Excellent**: -8 to -20 dBm\n- **Acceptable**: -20 to -27 dBm (PASS)\n- **Marginal**: -27 to -30 dBm (WARN)\n- **Fault**: below -30 dBm (FAIL)\n\n${weakDesc}`,
      actionCards: actionCards,
    };
  }

  if (/\bolt\b/.test(q)) {
    const oltList = olts
      .map(
        (o) =>
          `- **${o.name}** — ${o.status}, ${String(o.ports)} ports, uptime ${String(o.uptime ?? "N/A")}%, signal ${String(o.signalStrength ?? "N/A")} dBm`,
      )
      .join("\n");
    return {
      content: `**Optical Line Terminals (OLTs)** — you have **${String(olts.length)} OLT(s)** deployed:\n\n${oltList}\n\nOLTs manage downstream wavelength \`1490nm\` and upstream \`1310nm\`. Each port supports up to 64 ONTs via passive splitter cascades.`,
      actionCards: actionCards,
    };
  }

  if (/\bont\b/.test(q)) {
    const faultyOnts = onts.filter((o) => o.status !== "active");
    return {
      content: `**Optical Network Terminals (ONTs)** — you have **${String(onts.length)} ONTs** deployed, ${String(devices.filter((d) => d.type === "ONT" && d.status === "active").length)} online, ${String(faultyOnts.length)} with issues.\n\nONTs operate at \`1490nm\` downstream and \`1310nm\` upstream. Acceptable RX range is **-8 to -27 dBm**.`,
      actionCards: actionCards,
    };
  }

  if (/splitter|split ratio|passive/.test(q)) {
    const splitterList = splitters
      .map(
        (s) =>
          `- **${s.name}** — status: ${s.status}, signal: ${String(s.signalStrength)} dBm`,
      )
      .join("\n");
    return {
      content: `**Passive Optical Splitters** introduce insertion loss based on split ratio:\n- **1:2** → 3.5 dB loss\n- **1:4** → 7.2 dB loss\n- **1:8** → 10.5 dB loss\n- **1:16** → 13.8 dB loss\n- **1:32** → 17.1 dB loss\n\nCurrent splitters in network:\n${splitterList}`,
      actionCards: actionCards,
    };
  }

  if (/topology|network map|architecture|structure/.test(q)) {
    return {
      content: `**Current network topology:**\n- **${String(olts.length)}** OLT(s) — core aggregation layer\n- **${String(splitters.length)}** Passive Splitter(s) — distribution layer\n- **${String(onts.length)}** ONT(s) — subscriber premises layer\n- **${String(devices.filter((d) => d.type === "JJB").length)}** Joint Junction Box(es)\n- **${String(devices.filter((d) => d.type === "Switch").length)}** Aggregation Switch(es)\n\nTotal: **${String(devices.length)} network elements**.`,
      actionCards: [
        {
          label: "View Topology",
          icon: MapIcon,
          query: "Show topology overview",
        },
        {
          label: "Device Inventory",
          icon: Activity,
          query: "OLT status overview",
        },
        { label: "Check SLA", icon: Shield, query: "SLA status overview" },
      ],
    };
  }

  if (/diagnos|check|troubleshoot|investigate/.test(q)) {
    return {
      content:
        "**Systematic diagnostic procedure:**\n- Step 1: Check `physical layer` — inspect fiber connectors for contamination\n- Step 2: Measure **RX power** at ONT with optical power meter — must be > -27 dBm\n- Step 3: Run **OTDR trace** to identify reflections, breaks, or high-loss events\n- Step 4: Verify `OMCI` provisioning on OLT CLI\n- Step 5: Review **alarm history** in monitoring dashboard\n- Step 6: Escalate to L2 if physical layer is confirmed clean",
      actionCards: [
        {
          label: "View on Map",
          icon: MapIcon,
          query: "Show topology overview",
        },
        {
          label: "Run Workflow",
          icon: Workflow,
          query: "Explain OTDR testing procedure",
        },
        { label: "Check SLA", icon: Shield, query: "SLA status overview" },
      ],
    };
  }

  if (/health|status|overview|summary/.test(q)) {
    return {
      content: `**Network Health Summary:**\n- Total devices: **${String(devices.length)}**\n- Online: **${String(devices.filter((d) => d.status === "active").length)}** devices\n- Faulty: **${String(faultyDevices.length)}** device(s) need attention\n- Warning: **${String(warnDevices.length)}** device(s) in degraded state\n- Active alerts: **${String(activeAlerts.length)}** open incident(s)\n- SLA breaches: **${String(slaBreaches.length)}**\n- At-risk devices: **${String(atRisk.length)}**\n\nOverall network health is **${activeAlerts.length === 0 ? "NOMINAL" : "DEGRADED"}**.`,
      actionCards: actionCards,
    };
  }

  if (/capacity|utilization|bandwidth|forecast/.test(q)) {
    return {
      content:
        "**Capacity Planning insights:**\nNavigate to the **Capacity Planning** page for detailed forecasts.\n\n- Monitor fiber utilization percentages per route\n- Review `demand vs capacity` growth charts\n- Identify routes approaching exhaustion in the next 6–12 months\n- Plan `upgrade timelines` before capacity exceeds 80% threshold",
      actionCards: [
        {
          label: "Capacity Planning",
          icon: TrendingUp,
          query: "Capacity utilization forecast",
        },
        {
          label: "View on Map",
          icon: MapIcon,
          query: "Show topology overview",
        },
        { label: "Check SLA", icon: Shield, query: "SLA status overview" },
      ],
    };
  }

  if (/hello|hi |hey |help|start|begin|what can/.test(q)) {
    return {
      content:
        "Hello! I am **FiberNMS AI**, your intelligent NOC assistant. I can help you with:\n- **Fault analysis** — diagnose active alarms and root causes\n- **SLA monitoring** — track service level compliance\n- **Predictive intelligence** — at-risk device forecasting\n- **Signal quality** — interpret dBm readings and optical loss\n- **Network topology** — understand your OLT → Splitter → ONT architecture\n- **OTDR interpretation** — analyze trace events and loss points\n- **Capacity planning** — fiber utilization and growth forecasting\n\nWhat would you like to know?",
      actionCards: [
        {
          label: "Network Health",
          icon: Activity,
          query: "Network health summary",
        },
        { label: "Check SLA", icon: Shield, query: "SLA status overview" },
        {
          label: "Predictive Risks",
          icon: TrendingUp,
          query: "Show predictive alerts",
        },
      ],
    };
  }

  return {
    content: `I did not find a specific match for your query, but here are topics I can help with:\n- **Active faults and alarms** — type "show faults"\n- **SLA breaches** — type "SLA status"\n- **At-risk devices** — type "predictive alerts"\n- **Signal levels** — type "check signal levels"\n- **OLT / ONT status** — type "OLT status"\n\nCurrent network: **${String(activeAlerts.length)}** active alert(s), **${String(slaBreaches.length)}** SLA breach(es), **${String(atRisk.length)}** at-risk device(s).`,
    actionCards: actionCards,
  };
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className="flex items-center gap-3 mb-3"
    >
      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-primary" />
      </div>
      <div className="glass-card rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={`dot-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
            transition={{
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.18,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function AIMessage({
  msg,
  onAction,
}: {
  msg: Message;
  onAction: (query: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  function copyText() {
    void navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="flex items-start gap-3 mb-4 group"
      data-ocid="ai-message"
    >
      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1">
        <Bot size={14} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <GlassCard className="px-4 py-3 rounded-2xl rounded-tl-sm">
          <div className="text-sm text-foreground/90 leading-relaxed space-y-0.5">
            {renderMarkdown(msg.content)}
          </div>
        </GlassCard>
        {/* Inline action cards */}
        {msg.actionCards && msg.actionCards.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2 pl-1">
            {msg.actionCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.label}
                  type="button"
                  onClick={() => onAction(card.query)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border/50 bg-muted/30 text-[11px] text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-smooth"
                  data-ocid={`action-card-${card.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <Icon size={11} />
                  {card.label}
                </button>
              );
            })}
          </div>
        )}
        <div className="flex items-center gap-2 mt-1 px-1">
          <span className="text-[10px] text-muted-foreground">{time}</span>
          <button
            type="button"
            onClick={copyText}
            className="opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-foreground"
            aria-label="Copy message"
          >
            {copied ? (
              <Check size={11} className="text-primary" />
            ) : (
              <Copy size={11} />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function UserMessage({ msg }: { msg: Message }) {
  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex justify-end mb-4"
      data-ocid="user-message"
    >
      <div className="max-w-[75%] min-w-0">
        <div className="bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-foreground leading-relaxed">
          {msg.content}
        </div>
        <div className="flex justify-end items-center gap-1.5 mt-1 px-1">
          <span className="text-[10px] text-muted-foreground">{time}</span>
          <div className="w-4 h-4 rounded-full bg-muted/60 flex items-center justify-center">
            <User size={10} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Suggested prompts ─────────────────────────────────────────────────────────

const SUGGESTED = [
  { label: "Show devices with low signal", query: "Check signal levels" },
  { label: "List all active alerts", query: "Show active faults" },
  { label: "Check OLT status", query: "OLT status overview" },
  { label: "Analyze network health", query: "Network health summary" },
  { label: "SLA breach status", query: "SLA status overview" },
  { label: "Predictive risks", query: "Show predictive alerts" },
];

// ── Relative time helper ──────────────────────────────────────────────────────

function relTime(ts: number): string {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ── Welcome message ───────────────────────────────────────────────────────────

function makeWelcome(): Message {
  return {
    id: `welcome-${Date.now().toString()}`,
    role: "ai",
    content:
      "Hello! I am **FiberNMS AI**, your intelligent network operations assistant. " +
      "I can help you diagnose faults, analyze signal quality, interpret network topology, and provide technical guidance.\n\n" +
      "How can I assist you today?",
    timestamp: Date.now(),
    actionCards: DEFAULT_ACTION_CARDS,
  };
}

// ── Network Context Panel ─────────────────────────────────────────────────────

function NetworkContextPanel({
  onItemClick,
}: {
  onItemClick: (query: string) => void;
}) {
  const alerts = useNetworkStore((s) => s.alerts);
  const slaRecords = useNetworkStore((s) => s.slaRecords);
  const predictiveAlerts = useNetworkStore((s) => s.predictiveAlerts);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const criticalAlerts = activeAlerts.filter((a) => a.severity === "critical");
  const warningAlerts = activeAlerts.filter((a) => a.severity === "warning");
  const slaBreaches = slaRecords.filter((s) => s.status === "breach");
  const slaWarnings = slaRecords.filter((s) => s.status === "warning");
  const atRiskDevices = predictiveAlerts
    .filter((a) => a.status === "active")
    .sort((a, b) => b.riskScore - a.riskScore)
    .slice(0, 5);

  return (
    <div
      className="w-72 flex-shrink-0 flex flex-col border-l border-border/30 bg-card/30 overflow-y-auto noc-scrollbar"
      data-ocid="network-context-panel"
    >
      <div className="px-4 py-3 border-b border-border/30 flex items-center gap-2">
        <Activity size={13} className="text-primary" />
        <span className="text-xs font-display tracking-widest text-foreground uppercase">
          Live Context
        </span>
      </div>

      {/* Alert summary */}
      <div className="p-3 border-b border-border/20">
        <p className="text-[10px] font-display tracking-widest text-muted-foreground/60 uppercase mb-2">
          Active Alerts
        </p>
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() =>
              onItemClick(
                `Show active faults — ${String(criticalAlerts.length)} critical, ${String(warningAlerts.length)} warning`,
              )
            }
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg border border-border/30 hover:border-destructive/40 hover:bg-destructive/5 transition-smooth group"
            data-ocid="ctx-critical-alerts"
          >
            <div className="flex items-center gap-2">
              <AlertCircle size={11} className="text-destructive" />
              <span className="text-[11px] text-muted-foreground group-hover:text-foreground">
                Critical
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-destructive">
              {criticalAlerts.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              onItemClick(
                `Show warning level faults — ${String(warningAlerts.length)} active`,
              )
            }
            className="w-full flex items-center justify-between px-2.5 py-2 rounded-lg border border-border/30 hover:border-amber-500/40 hover:bg-amber-500/5 transition-smooth group"
            data-ocid="ctx-warning-alerts"
          >
            <div className="flex items-center gap-2">
              <AlertTriangle size={11} className="text-amber-400" />
              <span className="text-[11px] text-muted-foreground group-hover:text-foreground">
                Warning
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-400">
              {warningAlerts.length}
            </span>
          </button>
        </div>
      </div>

      {/* SLA Breaches */}
      <div className="p-3 border-b border-border/20">
        <p className="text-[10px] font-display tracking-widest text-muted-foreground/60 uppercase mb-2">
          SLA Status
        </p>
        {slaBreaches.length === 0 && slaWarnings.length === 0 ? (
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-emerald-400">All Compliant</span>
          </div>
        ) : (
          <div className="space-y-1">
            {slaBreaches.slice(0, 3).map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() =>
                  onItemClick(
                    `Tell me about the SLA breach for ${s.customerName}`,
                  )
                }
                className="w-full text-left px-2.5 py-2 rounded-lg border border-destructive/30 hover:border-destructive/50 hover:bg-destructive/5 transition-smooth group"
                data-ocid={`ctx-sla-${s.id}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-foreground truncate max-w-[130px]">
                    {s.customerName}
                  </span>
                  <Badge
                    variant="destructive"
                    className="text-[9px] px-1 py-0 h-4 ml-1 flex-shrink-0"
                  >
                    BREACH
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {s.region} · {s.uptime}% uptime
                </p>
                <ExternalLink
                  size={9}
                  className="text-muted-foreground/40 group-hover:text-primary mt-0.5"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* At-risk devices */}
      <div className="p-3">
        <p className="text-[10px] font-display tracking-widest text-muted-foreground/60 uppercase mb-2">
          At-Risk Devices
        </p>
        {atRiskDevices.length === 0 ? (
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[11px] text-emerald-400">
              No high-risk devices
            </span>
          </div>
        ) : (
          <div className="space-y-1">
            {atRiskDevices.map((a) => {
              const riskColor =
                a.riskScore >= 80
                  ? "text-destructive"
                  : a.riskScore >= 60
                    ? "text-amber-400"
                    : "text-yellow-400";
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() =>
                    onItemClick(
                      `Tell me about the at-risk device ${a.deviceName} with risk score ${String(a.riskScore)}`,
                    )
                  }
                  className="w-full text-left px-2.5 py-2 rounded-lg border border-border/30 hover:border-primary/40 hover:bg-primary/5 transition-smooth group"
                  data-ocid={`ctx-risk-${a.id}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-foreground truncate max-w-[130px]">
                      {a.deviceName}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-bold ${riskColor}`}
                    >
                      {a.riskScore}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 capitalize">
                    {a.failureType.replace(/-/g, " ")} · {a.predictedETA}h ETA
                  </p>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Session sidebar ───────────────────────────────────────────────────────────

function SessionSidebar({
  sessions,
  activeId,
  onSelect,
  onNew,
  activeAlerts,
}: {
  sessions: ChatSession[];
  activeId: string;
  onSelect: (id: string) => void;
  onNew: () => void;
  activeAlerts: number;
}) {
  return (
    <div className="w-64 flex-shrink-0 flex flex-col border-r border-border/30 bg-card/40">
      {/* Sidebar header */}
      <div className="p-4 border-b border-border/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow">
            <Sparkles size={14} className="text-primary" />
          </div>
          <div>
            <p className="text-xs font-semibold text-foreground">
              Conversations
            </p>
            <p className="text-[10px] text-muted-foreground">
              {sessions.length} sessions
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="w-7 h-7 rounded-lg border border-border/50 hover:border-primary/40 flex items-center justify-center transition-smooth text-muted-foreground hover:text-primary"
          aria-label="New chat"
          data-ocid="new-chat-btn"
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Network status mini bar */}
      {activeAlerts > 0 && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-xl border border-destructive/30 bg-destructive/8 flex items-center gap-2">
          <AlertTriangle size={11} className="text-destructive flex-shrink-0" />
          <span className="text-[11px] text-destructive font-medium">
            {activeAlerts} active alert{activeAlerts !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Session list */}
      <div className="flex-1 overflow-y-auto noc-scrollbar p-2 space-y-1">
        <p className="px-2 pt-2 pb-1 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-display">
          Recent
        </p>
        <AnimatePresence initial={false}>
          {sessions.map((session, i) => (
            <motion.button
              key={session.id}
              type="button"
              onClick={() => onSelect(session.id)}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`w-full text-left px-3 py-2.5 rounded-xl transition-smooth group ${
                activeId === session.id
                  ? "bg-primary/15 border border-primary/30 noc-glow"
                  : "hover:bg-muted/40 border border-transparent"
              }`}
              data-ocid="session-item"
            >
              <div className="flex items-start gap-2">
                <MessageSquare
                  size={12}
                  className={`mt-0.5 flex-shrink-0 transition-smooth ${
                    activeId === session.id
                      ? "text-primary"
                      : "text-muted-foreground group-hover:text-foreground/70"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-[11px] font-medium truncate ${
                      activeId === session.id
                        ? "text-primary"
                        : "text-foreground"
                    }`}
                  >
                    {session.title}
                  </p>
                  <p className="text-[10px] text-muted-foreground truncate mt-0.5 leading-tight">
                    {session.preview}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-[9px] text-muted-foreground/60">
                      {relTime(session.timestamp)}
                    </span>
                    <span className="text-[9px] text-muted-foreground/60">
                      {session.messageCount} msgs
                    </span>
                  </div>
                </div>
                {activeId === session.id && (
                  <ChevronRight
                    size={10}
                    className="text-primary flex-shrink-0 mt-1"
                  />
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Sidebar footer */}
      <div className="p-3 border-t border-border/30">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-muted-foreground">
            AI Engine Online
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function AIAssistant() {
  const { devices, alerts, slaRecords, predictiveAlerts } = useNetworkStore();
  const [sessions, setSessions] = useState<ChatSession[]>(MOCK_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>("s-01");
  const [messages, setMessages] = useState<Message[]>([makeWelcome()]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const faultyDevices = devices.filter((d) => d.status === "faulty");
  const warnDevices = devices.filter((d) => d.status === "warning");
  const onlineDevices = devices.filter((d) => d.status === "active");

  // Inject network context on mount — run once, use stable store snapshot
  useEffect(() => {
    const snap = useNetworkStore.getState();
    const initAlerts = snap.alerts.filter((a) => !a.resolved);
    const slaBreaches = snap.slaRecords.filter((s) => s.status === "breach");
    const atRisk = snap.predictiveAlerts
      .filter((a) => a.status === "active")
      .sort((a, b) => b.riskScore - a.riskScore)
      .slice(0, 3);

    if (initAlerts.length > 0 || slaBreaches.length > 0 || atRisk.length > 0) {
      const criticalCount = initAlerts.filter(
        (a) => a.severity === "critical",
      ).length;
      const breachLine =
        slaBreaches.length > 0
          ? `\n- **${String(slaBreaches.length)}** SLA breach(es): ${slaBreaches
              .slice(0, 2)
              .map((s) => s.customerName)
              .join(", ")}`
          : "";
      const atRiskLine =
        atRisk.length > 0
          ? `\n- **Top at-risk:** ${atRisk[0].deviceName} (risk score: ${String(atRisk[0].riskScore)})`
          : "";
      const contextMsg: Message = {
        id: `ctx-${Date.now().toString()}`,
        role: "ai",
        content: `**Network Context Loaded:**\n- **${String(initAlerts.length)}** active alert(s) — ${String(criticalCount)} critical${breachLine}${atRiskLine}\n- **${String(snap.devices.length)}** total devices monitored\n\nAsk me anything about the current network state.`,
        timestamp: Date.now(),
        actionCards: [
          {
            label: "Show Faults",
            icon: AlertCircle,
            query: "Show active faults",
          },
          { label: "SLA Status", icon: Shield, query: "SLA status overview" },
          {
            label: "Predictive Risks",
            icon: TrendingUp,
            query: "Show predictive alerts",
          },
        ],
      };
      setMessages([makeWelcome(), contextMsg]);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isThinking) return;

      const userMsg: Message = {
        id: `u-${Date.now().toString()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsThinking(true);

      const { content, actionCards } = buildResponse(trimmed, {
        devices,
        alerts,
        slaRecords,
        predictiveAlerts,
      });
      const delay = Math.min(500 + content.length * 1.5, 1800);

      setTimeout(() => {
        const aiMsg: Message = {
          id: `a-${Date.now().toString()}`,
          role: "ai",
          content,
          timestamp: Date.now(),
          actionCards,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
      }, delay);
    },
    [devices, alerts, slaRecords, predictiveAlerts, isThinking],
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function startNewChat() {
    const newSession: ChatSession = {
      id: `s-new-${Date.now()}`,
      title: "New Conversation",
      preview: "Start a new network analysis session...",
      timestamp: Date.now(),
      messageCount: 0,
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setMessages([makeWelcome()]);
    setInput("");
    setIsThinking(false);
  }

  function selectSession(id: string) {
    setActiveSessionId(id);
    setMessages([makeWelcome()]);
    setInput("");
    setIsThinking(false);
  }

  const isEmpty = messages.length <= 1;

  return (
    <div
      className="flex h-full min-h-0 bg-background overflow-hidden"
      data-ocid="ai-assistant-page"
    >
      {/* ── Left Sidebar: Conversation History ── */}
      <SessionSidebar
        sessions={sessions}
        activeId={activeSessionId}
        onSelect={selectSession}
        onNew={startNewChat}
        activeAlerts={activeAlerts.length}
      />

      {/* ── Center Panel: Active Chat ── */}
      <div className="flex flex-col flex-1 min-w-0 h-full">
        {/* Chat panel header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border/30 bg-card/30 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow">
              <Bot size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="font-display text-sm font-semibold text-foreground tracking-wide">
                Network AI Assistant
              </h1>
              <p className="text-[10px] text-muted-foreground">
                Powered by FiberNMS Intelligence
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Quick stats */}
            <div className="hidden md:flex items-center gap-3 text-[10px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <Activity size={10} className="text-primary" />
                {devices.length} devices
              </span>
              <span className="flex items-center gap-1">
                <Wifi size={10} className="text-emerald-400" />
                {onlineDevices.length} online
              </span>
              {faultyDevices.length + warnDevices.length > 0 && (
                <span className="flex items-center gap-1">
                  <AlertTriangle size={10} className="text-yellow-400" />
                  {faultyDevices.length + warnDevices.length} issues
                </span>
              )}
            </div>
            {/* Online status badge */}
            <Badge
              variant="outline"
              className="text-[10px] border-emerald-500/40 text-emerald-400 gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </Badge>
          </div>
        </div>

        {/* Messages area */}
        <div className="flex-1 min-h-0 overflow-y-auto p-5 noc-scrollbar">
          {/* Empty / welcome state suggestions */}
          {isEmpty && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center h-full text-center py-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 noc-glow">
                <Sparkles size={28} className="text-primary" />
              </div>
              <h2 className="font-display text-base font-semibold text-foreground mb-1">
                Ask FiberNMS AI
              </h2>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Get instant insights on network faults, SLA compliance,
                predictive risks, signal quality, and topology analysis.
              </p>
              <div className="flex flex-wrap gap-2 justify-center max-w-lg">
                {SUGGESTED.map((s) => (
                  <button
                    type="button"
                    key={s.label}
                    onClick={() => sendMessage(s.query)}
                    disabled={isThinking}
                    className="px-3 py-2 rounded-xl text-[11px] border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-smooth disabled:opacity-40"
                    data-ocid="suggested-pill"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) =>
              msg.role === "user" ? (
                <UserMessage key={msg.id} msg={msg} />
              ) : (
                <AIMessage key={msg.id} msg={msg} onAction={sendMessage} />
              ),
            )}
            {isThinking && <TypingIndicator key="typing" />}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>

        {/* Suggested pills (shown below messages when not empty) */}
        {!isEmpty && (
          <div className="px-5 pt-2 pb-1 flex flex-wrap gap-1.5 border-t border-border/20">
            {SUGGESTED.slice(0, 4).map((s) => (
              <button
                type="button"
                key={s.label}
                onClick={() => sendMessage(s.query)}
                disabled={isThinking}
                className="px-2.5 py-1 rounded-full text-[11px] border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary transition-smooth disabled:opacity-40"
                data-ocid="suggested-pill"
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Input bar */}
        <div className="px-5 py-4 border-t border-border/30 flex gap-2 items-end bg-card/20 flex-shrink-0">
          <div className="flex-1 relative">
            <textarea
              rows={1}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              disabled={isThinking}
              placeholder="Ask about faults, SLA status, predictive risks, OLT status…  (Enter to send)"
              className="w-full resize-none rounded-xl border border-border/60 bg-muted/30 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-smooth noc-scrollbar disabled:opacity-50"
              style={{ maxHeight: 120, minHeight: 44 }}
              data-ocid="chat-input"
            />
            <span className="absolute right-3 bottom-3 text-[10px] text-muted-foreground/40 tabular-nums">
              {input.length > 0 ? input.length : ""}
            </span>
          </div>
          <Button
            type="button"
            onClick={() => {
              sendMessage(input);
            }}
            disabled={isThinking || !input.trim()}
            size="sm"
            className="h-11 px-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/85 transition-smooth"
            data-ocid="send-btn"
          >
            <Send size={14} />
            Send
          </Button>
        </div>
      </div>

      {/* ── Right Panel: Network Context ── */}
      <NetworkContextPanel onItemClick={sendMessage} />
    </div>
  );
}
