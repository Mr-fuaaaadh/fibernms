import { c as createLucideIcon, u as useNetworkStore, r as reactExports, j as jsxRuntimeExports, aa as Bot, f as Activity, T as TriangleAlert, $ as Badge, m as motion, A as AnimatePresence, a0 as ChevronRight, ab as User } from "./index-BwSs_aWH.js";
import { G as GlassCard } from "./GlassCard-CLBOZOiN.js";
import { B as Button } from "./button-BEx81395.js";
import { W as Wifi } from "./wifi-BvV6kFKc.js";
import { P as Plus } from "./plus-DCBfS9Yc.js";
import { C as Check } from "./check-Cfiu53WQ.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$2);
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
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
];
const Send = createLucideIcon("send", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const MOCK_SESSIONS = [
  {
    id: "s-01",
    title: "OLT-1 Signal Analysis",
    preview: "Checked RX power levels at OLT-CORE-01, identified marginal...",
    timestamp: Date.now() - 2 * 60 * 1e3,
    messageCount: 6
  },
  {
    id: "s-02",
    title: "Fiber Cut Investigation",
    preview: "OTDR trace shows a break at 2.4 km from the splice point...",
    timestamp: Date.now() - 45 * 60 * 1e3,
    messageCount: 12
  },
  {
    id: "s-03",
    title: "Network Health Check",
    preview: "Overall network availability at 98.7%, 3 ONTs offline in...",
    timestamp: Date.now() - 3 * 60 * 60 * 1e3,
    messageCount: 8
  },
  {
    id: "s-04",
    title: "ONT Re-provisioning",
    preview: "OMCI provisioning failed on 4 ONTs after maintenance window...",
    timestamp: Date.now() - 8 * 60 * 60 * 1e3,
    messageCount: 10
  },
  {
    id: "s-05",
    title: "Power Budget Audit",
    preview: "Reviewed all 32-way splitter links, 2 links near margin...",
    timestamp: Date.now() - 24 * 60 * 60 * 1e3,
    messageCount: 7
  }
];
function renderInline(text) {
  const parts = [];
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let idx = 0;
  for (const match of text.matchAll(regex)) {
    if (match.index > last) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text.slice(last, match.index) }, `s${idx++}`)
      );
    }
    const token = match[0];
    if (token.startsWith("**")) {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary font-semibold", children: token.slice(2, -2) }, `b${idx++}`)
      );
    } else {
      parts.push(
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "code",
          {
            className: "px-1.5 py-0.5 rounded bg-primary/10 text-primary font-mono text-[0.78em]",
            children: token.slice(1, -1)
          },
          `c${idx++}`
        )
      );
    }
    last = (match.index ?? 0) + token.length;
  }
  if (last < text.length) {
    parts.push(/* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: text.slice(last) }, `e${idx++}`));
  }
  return parts;
}
function renderMarkdown(text) {
  const lines = text.split("\n");
  return lines.map((line, li) => {
    const key = `${li}:${line.slice(0, 20)}`;
    if (line.startsWith("- ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "ml-4 list-disc text-foreground/90", children: renderInline(line.slice(2)) }, key);
    }
    if (line.startsWith("## ")) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "h3",
        {
          className: "text-sm font-semibold text-foreground mt-2 mb-1",
          children: line.slice(3)
        },
        key
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block", children: [
      renderInline(line),
      li < lines.length - 1 && line === "" && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
    ] }, key);
  });
}
function buildResponse(input, store) {
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
    const list = activeAlerts.map((a) => `- **${a.deviceName}**: ${a.issueType}`).join("\n");
    return `**${activeAlerts.length} active fault(s) detected:**

${list}

Recommended action: dispatch field team to inspect physical layer on **critical** alarms first. Use \`OTDR\` to pinpoint fiber break location. Check \`RX power\` levels against threshold (-8 to -27 dBm).`;
  }
  if (/signal|dbm|optical power|rx power|receive/.test(q)) {
    const weak = devices.filter(
      (d) => d.signalStrength !== void 0 && d.signalStrength < -30
    );
    const weakDesc = weak.length > 0 ? `**${weak.length} device(s)** currently below threshold: ${weak.map((d) => `\`${d.name}\` at ${String(d.signalStrength)} dBm`).join(", ")}. Inspect connectors, check splice points, and verify splitter ratio.` : "All monitored devices currently within acceptable signal range.";
    return `**Optical signal thresholds** for GPON networks:
- **Excellent**: -8 to -20 dBm
- **Acceptable**: -20 to -27 dBm (PASS)
- **Marginal**: -27 to -30 dBm (WARN)
- **Fault**: below -30 dBm (FAIL)

${weakDesc}`;
  }
  if (/\bolt\b/.test(q)) {
    const oltList = olts.map(
      (o) => `- **${o.name}** — ${o.status}, ${String(o.ports)} ports, uptime ${String(o.uptime ?? "N/A")}%, signal ${String(o.signalStrength ?? "N/A")} dBm`
    ).join("\n");
    return `**Optical Line Terminals (OLTs)** — you have **${String(olts.length)} OLT(s)** deployed:

${oltList}

OLTs manage downstream wavelength \`1490nm\` and upstream \`1310nm\`. Each port supports up to 64 ONTs via passive splitter cascades.`;
  }
  if (/\bont\b/.test(q)) {
    const faultyOnts = onts.filter((o) => o.status !== "active");
    return `**Optical Network Terminals (ONTs)** — you have **${String(onts.length)} ONTs** deployed, ${String(devices.filter((d) => d.type === "ONT" && d.status === "active").length)} online, ${String(faultyOnts.length)} with issues.

ONTs operate at \`1490nm\` downstream and \`1310nm\` upstream. Acceptable RX range is **-8 to -27 dBm**. If an ONT is offline, first check physical power, then verify \`OMCI\` provisioning, and finally measure RX power with an optical power meter.`;
  }
  if (/splitter|split ratio|passive/.test(q)) {
    const splitterList = splitters.map(
      (s) => `- **${s.name}** — status: ${s.status}, signal: ${String(s.signalStrength)} dBm`
    ).join("\n");
    return `**Passive Optical Splitters** introduce insertion loss based on split ratio:
- **1:2** → 3.5 dB loss
- **1:4** → 7.2 dB loss
- **1:8** → 10.5 dB loss
- **1:16** → 13.8 dB loss
- **1:32** → 17.1 dB loss

Current splitters in network:
${splitterList}

Always factor cumulative splitter loss into your **power budget** calculation.`;
  }
  if (/topology|network map|architecture|structure/.test(q)) {
    return `**Current network topology:**
- **${String(olts.length)}** OLT(s) — core aggregation layer
- **${String(splitters.length)}** Passive Splitter(s) — distribution layer
- **${String(onts.length)}** ONT(s) — subscriber premises layer
- **${String(devices.filter((d) => d.type === "JJB").length)}** Joint Junction Box(es)
- **${String(devices.filter((d) => d.type === "Switch").length)}** Aggregation Switch(es)

Total: **${String(devices.length)} network elements**. Use the **Topology** page for an interactive graph showing the OLT to Splitter to ONT hierarchy with live status overlays.`;
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
    return `**Network Health Summary:**
- Total devices: **${String(devices.length)}**
- Online: **${String(devices.filter((d) => d.status === "active").length)}** devices
- Faulty: **${String(faultyDevices.length)}** device(s) need attention
- Warning: **${String(warnDevices.length)}** device(s) in degraded state
- Active alerts: **${String(activeAlerts.length)}** open incident(s)

Overall network health is **${activeAlerts.length === 0 ? "NOMINAL" : "DEGRADED"}**. ${activeAlerts.length > 0 ? "Review active alerts and dispatch field teams for critical faults." : "All systems operating within normal parameters."}`;
  }
  if (/hello|hi |hey |help|start|begin|what can/.test(q)) {
    return "Hello! I am **FiberNMS AI**, your intelligent NOC assistant. I can help you with:\n- **Fault analysis** — diagnose active alarms and root causes\n- **Signal quality** — interpret dBm readings and optical loss\n- **Network topology** — understand your OLT to Splitter to ONT architecture\n- **OTDR interpretation** — analyze trace events and loss points\n- **Power budget** — calculate link margins and verify fiber design\n- **Maintenance guidance** — safe procedures for network changes\n\nWhat would you like to know?";
  }
  return `I did not find a specific match for your query, but here are topics I can help with:
- **Active faults and alarms** — type "show faults"
- **Signal levels and dBm** — type "check signal levels"
- **OLT / ONT / Splitter status** — type "OLT status"
- **OTDR testing** — type "explain OTDR"
- **Power budget calculation** — type "power budget help"

Current network status: **${String(activeAlerts.length)}** active alert(s), **${String(faultyDevices.length + warnDevices.length)}** device(s) requiring attention.`;
}
function TypingIndicator() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -10 },
      className: "flex items-center gap-3 mb-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 14, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-card rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1.5 items-center", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.span,
          {
            className: "w-1.5 h-1.5 rounded-full bg-primary",
            animate: { opacity: [0.3, 1, 0.3], y: [0, -3, 0] },
            transition: {
              duration: 0.8,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.18
            }
          },
          `dot-${i}`
        )) })
      ]
    }
  );
}
function AIMessage({ msg }) {
  const [copied, setCopied] = reactExports.useState(false);
  function copyText() {
    void navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  }
  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: -16 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.28, ease: "easeOut" },
      className: "flex items-start gap-3 mb-4 group",
      "data-ocid": "ai-message",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0 mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 14, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "px-4 py-3 rounded-2xl rounded-tl-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-foreground/90 leading-relaxed space-y-0.5", children: renderMarkdown(msg.content) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 px-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: time }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: copyText,
                className: "opacity-0 group-hover:opacity-100 transition-smooth text-muted-foreground hover:text-foreground",
                "aria-label": "Copy message",
                children: copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 11, className: "text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 11 })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function UserMessage({ msg }) {
  const time = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, x: 16 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.22, ease: "easeOut" },
      className: "flex justify-end mb-4",
      "data-ocid": "user-message",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-[75%] min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-primary/20 border border-primary/30 rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-foreground leading-relaxed", children: msg.content }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end items-center gap-1.5 mt-1 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: time }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 rounded-full bg-muted/60 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 10, className: "text-muted-foreground" }) })
        ] })
      ] })
    }
  );
}
const SUGGESTED = [
  { label: "Show devices with low signal", query: "Check signal levels" },
  { label: "List all active alerts", query: "Show active faults" },
  { label: "Check OLT-1 status", query: "OLT status overview" },
  { label: "Analyze network health", query: "Network health summary" },
  { label: "Explain OTDR testing", query: "Explain OTDR testing procedure" },
  { label: "Power budget help", query: "Power budget calculation help" }
];
function relTime(ts) {
  const m = Math.floor((Date.now() - ts) / 6e4);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}
function makeWelcome() {
  return {
    id: `welcome-${Date.now().toString()}`,
    role: "ai",
    content: "Hello! I am **FiberNMS AI**, your intelligent network operations assistant. I can help you diagnose faults, analyze signal quality, interpret network topology, and provide technical guidance.\n\nHow can I assist you today?",
    timestamp: Date.now()
  };
}
function SessionSidebar({
  sessions,
  activeId,
  onSelect,
  onNew,
  activeAlerts
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-72 flex-shrink-0 flex flex-col border-r border-border/30 bg-card/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/30 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-foreground", children: "Conversations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground", children: [
            sessions.length,
            " sessions"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: onNew,
          className: "w-7 h-7 rounded-lg border border-border/50 hover:border-primary/40 flex items-center justify-center transition-smooth text-muted-foreground hover:text-primary",
          "aria-label": "New chat",
          "data-ocid": "new-chat-btn",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 13 })
        }
      )
    ] }),
    activeAlerts > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-3 mt-3 px-3 py-2 rounded-xl border border-destructive/30 bg-destructive/8 flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 11, className: "text-destructive flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-destructive font-medium", children: [
        activeAlerts,
        " active alert",
        activeAlerts !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 overflow-y-auto noc-scrollbar p-2 space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 pt-2 pb-1 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-display", children: "Recent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: sessions.map((session, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.button,
        {
          type: "button",
          onClick: () => onSelect(session.id),
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.05 },
          className: `w-full text-left px-3 py-2.5 rounded-xl transition-smooth group ${activeId === session.id ? "bg-primary/15 border border-primary/30 noc-glow" : "hover:bg-muted/40 border border-transparent"}`,
          "data-ocid": "session-item",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              MessageSquare,
              {
                size: 12,
                className: `mt-0.5 flex-shrink-0 transition-smooth ${activeId === session.id ? "text-primary" : "text-muted-foreground group-hover:text-foreground/70"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-[11px] font-medium truncate ${activeId === session.id ? "text-primary" : "text-foreground"}`,
                  children: session.title
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground truncate mt-0.5 leading-tight", children: session.preview }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-muted-foreground/60", children: relTime(session.timestamp) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-muted-foreground/60", children: [
                  session.messageCount,
                  " msgs"
                ] })
              ] })
            ] }),
            activeId === session.id && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronRight,
              {
                size: 10,
                className: "text-primary flex-shrink-0 mt-1"
              }
            )
          ] })
        },
        session.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 border-t border-border/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: "AI Engine Online" })
    ] }) })
  ] });
}
function AIAssistant() {
  const { devices, alerts } = useNetworkStore();
  const [sessions, setSessions] = reactExports.useState(MOCK_SESSIONS);
  const [activeSessionId, setActiveSessionId] = reactExports.useState("s-01");
  const [messages, setMessages] = reactExports.useState([makeWelcome()]);
  const [input, setInput] = reactExports.useState("");
  const [isThinking, setIsThinking] = reactExports.useState(false);
  const bottomRef = reactExports.useRef(null);
  const activeAlerts = alerts.filter((a) => !a.resolved);
  const faultyDevices = devices.filter((d) => d.status === "faulty");
  const warnDevices = devices.filter((d) => d.status === "warning");
  const onlineDevices = devices.filter((d) => d.status === "active");
  reactExports.useEffect(() => {
    var _a;
    (_a = bottomRef.current) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  });
  const sendMessage = reactExports.useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed || isThinking) return;
      const userMsg = {
        id: `u-${Date.now().toString()}`,
        role: "user",
        content: trimmed,
        timestamp: Date.now()
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setIsThinking(true);
      const response = buildResponse(trimmed, { devices, alerts });
      const delay = Math.min(500 + response.length * 1.5, 1800);
      setTimeout(() => {
        const aiMsg = {
          id: `a-${Date.now().toString()}`,
          role: "ai",
          content: response,
          timestamp: Date.now()
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsThinking(false);
      }, delay);
    },
    [devices, alerts, isThinking]
  );
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }
  function startNewChat() {
    const newSession = {
      id: `s-new-${Date.now()}`,
      title: "New Conversation",
      preview: "Start a new network analysis session...",
      timestamp: Date.now(),
      messageCount: 0
    };
    setSessions((prev) => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
    setMessages([makeWelcome()]);
    setInput("");
    setIsThinking(false);
  }
  function selectSession(id) {
    setActiveSessionId(id);
    setMessages([makeWelcome()]);
    setInput("");
    setIsThinking(false);
  }
  const isEmpty = messages.length <= 1;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-full min-h-0 bg-background overflow-hidden",
      "data-ocid": "ai-assistant-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SessionSidebar,
          {
            sessions,
            activeId: activeSessionId,
            onSelect: selectSession,
            onNew: startNewChat,
            activeAlerts: activeAlerts.length
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-1 min-w-0 h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3.5 border-b border-border/30 bg-card/30 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { size: 18, className: "text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-sm font-semibold text-foreground tracking-wide", children: "Network AI Assistant" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground", children: "Powered by FiberNMS Intelligence" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-3 text-[10px] text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 10, className: "text-primary" }),
                  devices.length,
                  " devices"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { size: 10, className: "text-emerald-400" }),
                  onlineDevices.length,
                  " online"
                ] }),
                faultyDevices.length + warnDevices.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 10, className: "text-yellow-400" }),
                  faultyDevices.length + warnDevices.length,
                  " issues"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-[10px] border-emerald-500/40 text-emerald-400 gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" }),
                    "Online"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-h-0 overflow-y-auto p-5 noc-scrollbar", children: [
            isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                className: "flex flex-col items-center justify-center h-full text-center py-8",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 28, className: "text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base font-semibold text-foreground mb-1", children: "Ask FiberNMS AI" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6 max-w-sm", children: "Get instant insights on network faults, signal quality, topology, and maintenance guidance." }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2 justify-center max-w-lg", children: SUGGESTED.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => sendMessage(s.query),
                      disabled: isThinking,
                      className: "px-3 py-2 rounded-xl text-[11px] border border-border/50 text-muted-foreground hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-smooth disabled:opacity-40",
                      "data-ocid": "suggested-pill",
                      children: s.label
                    },
                    s.label
                  )) })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { initial: false, children: [
              messages.map(
                (msg) => msg.role === "user" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UserMessage, { msg }, msg.id) : /* @__PURE__ */ jsxRuntimeExports.jsx(AIMessage, { msg }, msg.id)
              ),
              isThinking && /* @__PURE__ */ jsxRuntimeExports.jsx(TypingIndicator, {}, "typing")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: bottomRef })
          ] }),
          !isEmpty && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pt-2 pb-1 flex flex-wrap gap-1.5 border-t border-border/20", children: SUGGESTED.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => sendMessage(s.query),
              disabled: isThinking,
              className: "px-2.5 py-1 rounded-full text-[11px] border border-border/40 text-muted-foreground hover:border-primary/40 hover:text-primary transition-smooth disabled:opacity-40",
              "data-ocid": "suggested-pill",
              children: s.label
            },
            s.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 border-t border-border/30 flex gap-2 items-end bg-card/20 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  rows: 1,
                  value: input,
                  onChange: (e) => {
                    setInput(e.target.value);
                  },
                  onKeyDown: handleKeyDown,
                  disabled: isThinking,
                  placeholder: "Ask about network faults, signal levels, OLT status…  (Enter to send)",
                  className: "w-full resize-none rounded-xl border border-border/60 bg-muted/30 px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-smooth noc-scrollbar disabled:opacity-50",
                  style: { maxHeight: 120, minHeight: 44 },
                  "data-ocid": "chat-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 bottom-3 text-[10px] text-muted-foreground/40 tabular-nums", children: input.length > 0 ? input.length : "" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "button",
                onClick: () => {
                  sendMessage(input);
                },
                disabled: isThinking || !input.trim(),
                size: "sm",
                className: "h-11 px-4 gap-2 bg-primary text-primary-foreground hover:bg-primary/85 transition-smooth",
                "data-ocid": "send-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { size: 14 }),
                  "Send"
                ]
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  AIAssistant as default
};
