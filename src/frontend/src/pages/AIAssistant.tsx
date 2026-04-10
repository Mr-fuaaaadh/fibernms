import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNetworkStore } from "@/store/networkStore";
import {
  Activity,
  AlertTriangle,
  Bot,
  Check,
  ChevronRight,
  Copy,
  MessageSquare,
  Plus,
  Send,
  Sparkles,
  User,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

interface ChatSession {
  id: string;
  title: string;
  preview: string;
  timestamp: number;
  messageCount: number;
}

type StoreState = {
  devices: ReturnType<typeof useNetworkStore.getState>["devices"];
  alerts: ReturnType<typeof useNetworkStore.getState>["alerts"];
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

// ── AI Response Engine ────────────────────────────────────────────────────────

function buildResponse(input: string, store: StoreState): string {
  const q = input.toLowerCase();
  const { devices, alerts } = store;
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const faultyDevices = devices.filter((d) => d.status === "faulty");
  const warnDevices = devices.filter((d) => d.status === "warning");
  const olts = devices.filter((d) => d.type === "OLT");
  const onts = devices.filter((d) => d.type === "ONT");
  const splitters = devices.filter((d) => d.type === "Splitter");

  if (/fault|alarm|alert|critical|incident/.test(q)) {
    if (activeAlerts.length === 0) {
      return "**No active faults detected.** All network elements are operating within normal parameters. Continue periodic monitoring every 15 minutes as per NOC SOP.";
    }
    const list = activeAlerts
      .map((a) => `- **${a.deviceName}**: ${a.issueType}`)
      .join("\n");
    return `**${activeAlerts.length} active fault(s) detected:**\n\n${list}\n\nRecommended action: dispatch field team to inspect physical layer on **critical** alarms first. Use \`OTDR\` to pinpoint fiber break location. Check \`RX power\` levels against threshold (-8 to -27 dBm).`;
  }

  if (/signal|dbm|optical power|rx power|receive/.test(q)) {
    const weak = devices.filter(
      (d) => d.signalStrength !== undefined && d.signalStrength < -30,
    );
    const weakDesc =
      weak.length > 0
        ? `**${weak.length} device(s)** currently below threshold: ${weak.map((d) => `\`${d.name}\` at ${String(d.signalStrength)} dBm`).join(", ")}. Inspect connectors, check splice points, and verify splitter ratio.`
        : "All monitored devices currently within acceptable signal range.";
    return `**Optical signal thresholds** for GPON networks:\n- **Excellent**: -8 to -20 dBm\n- **Acceptable**: -20 to -27 dBm (PASS)\n- **Marginal**: -27 to -30 dBm (WARN)\n- **Fault**: below -30 dBm (FAIL)\n\n${weakDesc}`;
  }

  if (/\bolt\b/.test(q)) {
    const oltList = olts
      .map(
        (o) =>
          `- **${o.name}** — ${o.status}, ${String(o.ports)} ports, uptime ${String(o.uptime ?? "N/A")}%, signal ${String(o.signalStrength ?? "N/A")} dBm`,
      )
      .join("\n");
    return `**Optical Line Terminals (OLTs)** — you have **${String(olts.length)} OLT(s)** deployed:\n\n${oltList}\n\nOLTs manage downstream wavelength \`1490nm\` and upstream \`1310nm\`. Each port supports up to 64 ONTs via passive splitter cascades.`;
  }

  if (/\bont\b/.test(q)) {
    const faultyOnts = onts.filter((o) => o.status !== "active");
    return `**Optical Network Terminals (ONTs)** — you have **${String(onts.length)} ONTs** deployed, ${String(devices.filter((d) => d.type === "ONT" && d.status === "active").length)} online, ${String(faultyOnts.length)} with issues.\n\nONTs operate at \`1490nm\` downstream and \`1310nm\` upstream. Acceptable RX range is **-8 to -27 dBm**. If an ONT is offline, first check physical power, then verify \`OMCI\` provisioning, and finally measure RX power with an optical power meter.`;
  }

  if (/splitter|split ratio|passive/.test(q)) {
    const splitterList = splitters
      .map(
        (s) =>
          `- **${s.name}** — status: ${s.status}, signal: ${String(s.signalStrength)} dBm`,
      )
      .join("\n");
    return `**Passive Optical Splitters** introduce insertion loss based on split ratio:\n- **1:2** → 3.5 dB loss\n- **1:4** → 7.2 dB loss\n- **1:8** → 10.5 dB loss\n- **1:16** → 13.8 dB loss\n- **1:32** → 17.1 dB loss\n\nCurrent splitters in network:\n${splitterList}\n\nAlways factor cumulative splitter loss into your **power budget** calculation.`;
  }

  if (/topology|network map|architecture|structure/.test(q)) {
    return `**Current network topology:**\n- **${String(olts.length)}** OLT(s) — core aggregation layer\n- **${String(splitters.length)}** Passive Splitter(s) — distribution layer\n- **${String(onts.length)}** ONT(s) — subscriber premises layer\n- **${String(devices.filter((d) => d.type === "JJB").length)}** Joint Junction Box(es)\n- **${String(devices.filter((d) => d.type === "Switch").length)}** Aggregation Switch(es)\n\nTotal: **${String(devices.length)} network elements**. Use the **Topology** page for an interactive graph showing the OLT to Splitter to ONT hierarchy with live status overlays.`;
  }

  if (/diagnos|check|troubleshoot|investigate/.test(q)) {
    return "**Systematic diagnostic procedure:**\n- Step 1: Check `physical layer` — inspect fiber connectors for contamination (IEC 61300-3-35)\n- Step 2: Measure **RX power** at ONT with optical power meter — must be > -27 dBm\n- Step 3: Run **OTDR trace** to identify reflections, breaks, or high-loss events\n- Step 4: Verify `OMCI` provisioning on OLT CLI — check ONT registration status\n- Step 5: Review **alarm history** in monitoring dashboard for pattern analysis\n- Step 6: Escalate to L2 if physical layer is confirmed clean";
  }

  if (/bandwidth|throughput|speed|capacity|traffic/.test(q)) {
    return "**Bandwidth management** in GPON/XGS-PON systems:\n- GPON downstream: **2.488 Gbps** shared per PON port (typically across 32-64 ONTs)\n- XGS-PON: **10 Gbps** symmetric per port\n- Use **DBA (Dynamic Bandwidth Allocation)** profiles on OLT to guarantee `T-CONT` bandwidth per ONT\n- Monitor **upstream BER** — threshold is `1e-6`; values above this indicate impairment. Check the **Monitoring** dashboard for live throughput metrics.";
  }

  if (/otdr|optical time domain|reflectometer/.test(q)) {
    return "**OTDR (Optical Time Domain Reflectometer)** is the primary diagnostic tool for fiber characterization:\n- Injects a short `laser pulse` into the fiber and analyzes backscattered light\n- Identifies **splice points**, **connectors**, **fiber breaks**, and **bend losses** with distance accuracy +/-1m\n- **OTDR events** to investigate: reflections > +0.5 dB (connector issue), loss > 0.5 dB (splice or break)\n- Always test from both ends (**bi-directional OTDR**) for accurate loss values\n- Store baseline traces in your **fiber plant documentation** system for future comparison";
  }

  if (/power budget|budget calculator|link budget/.test(q)) {
    return "**Power Budget formula:**\n`Budget (dB) = TX_power - RX_sensitivity`\n\nExample: TX = +2 dBm, RX sensitivity = -27 dBm gives **29 dB budget**\n\n**Loss components to subtract:**\n- Fiber: `0.35 dB/km x length`\n- Connectors: `0.5 dB x count`\n- Splitter: based on split ratio (1:8 = 10.5 dB)\n- Splices: `0.1 dB x count`\n\nAlways maintain a **3 dB safety margin**. Navigate to **Tools > Power Budget Calculator** to run this calculation interactively.";
  }

  if (/health|status|overview|summary/.test(q)) {
    return `**Network Health Summary:**\n- Total devices: **${String(devices.length)}**\n- Online: **${String(devices.filter((d) => d.status === "active").length)}** devices\n- Faulty: **${String(faultyDevices.length)}** device(s) need attention\n- Warning: **${String(warnDevices.length)}** device(s) in degraded state\n- Active alerts: **${String(activeAlerts.length)}** open incident(s)\n\nOverall network health is **${activeAlerts.length === 0 ? "NOMINAL" : "DEGRADED"}**. ${activeAlerts.length > 0 ? "Review active alerts and dispatch field teams for critical faults." : "All systems operating within normal parameters."}`;
  }

  if (/hello|hi |hey |help|start|begin|what can/.test(q)) {
    return "Hello! I am **FiberNMS AI**, your intelligent NOC assistant. I can help you with:\n- **Fault analysis** — diagnose active alarms and root causes\n- **Signal quality** — interpret dBm readings and optical loss\n- **Network topology** — understand your OLT to Splitter to ONT architecture\n- **OTDR interpretation** — analyze trace events and loss points\n- **Power budget** — calculate link margins and verify fiber design\n- **Maintenance guidance** — safe procedures for network changes\n\nWhat would you like to know?";
  }

  return `I did not find a specific match for your query, but here are topics I can help with:\n- **Active faults and alarms** — type "show faults"\n- **Signal levels and dBm** — type "check signal levels"\n- **OLT / ONT / Splitter status** — type "OLT status"\n- **OTDR testing** — type "explain OTDR"\n- **Power budget calculation** — type "power budget help"\n\nCurrent network status: **${String(activeAlerts.length)}** active alert(s), **${String(faultyDevices.length + warnDevices.length)}** device(s) requiring attention.`;
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

function AIMessage({ msg }: { msg: Message }) {
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
  { label: "Check OLT-1 status", query: "OLT status overview" },
  { label: "Analyze network health", query: "Network health summary" },
  { label: "Explain OTDR testing", query: "Explain OTDR testing procedure" },
  { label: "Power budget help", query: "Power budget calculation help" },
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
  };
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
    <div className="w-72 flex-shrink-0 flex flex-col border-r border-border/30 bg-card/40">
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
  const { devices, alerts } = useNetworkStore();
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

      const response = buildResponse(trimmed, { devices, alerts });
      const delay = Math.min(500 + response.length * 1.5, 1800);

      setTimeout(() => {
        const aiMsg: Message = {
          id: `a-${Date.now().toString()}`,
          role: "ai",
          content: response,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
      }, delay);
    },
    [devices, alerts, isThinking],
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

      {/* ── Right Panel: Active Chat (2/3 width) ── */}
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
                Get instant insights on network faults, signal quality,
                topology, and maintenance guidance.
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
                <AIMessage key={msg.id} msg={msg} />
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
              placeholder="Ask about network faults, signal levels, OLT status…  (Enter to send)"
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
    </div>
  );
}
