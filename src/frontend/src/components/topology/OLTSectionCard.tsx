import type { Device, DeviceStatus } from "@/types/network";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  GitBranch,
  Router,
  Signal,
  Wifi,
} from "lucide-react";
import { motion } from "motion/react";
import { OLTSectionMiniTree } from "./OLTSectionMiniTree";

// ─── Status helpers ───────────────────────────────────────────────────────────
const STATUS_BADGE: Record<
  DeviceStatus,
  {
    label: string;
    color: string;
    bg: string;
    border: string;
    icon: React.ElementType;
  }
> = {
  active: {
    label: "Online",
    color: "#22c55e",
    bg: "rgba(34,197,94,0.12)",
    border: "rgba(34,197,94,0.3)",
    icon: CheckCircle2,
  },
  faulty: {
    label: "Fault",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.12)",
    border: "rgba(239,68,68,0.3)",
    icon: AlertTriangle,
  },
  warning: {
    label: "Warning",
    color: "#eab308",
    bg: "rgba(234,179,8,0.12)",
    border: "rgba(234,179,8,0.3)",
    icon: AlertTriangle,
  },
};

function signalBars(dbm: number | undefined) {
  if (dbm == null) return 0;
  if (dbm >= -15) return 5;
  if (dbm >= -20) return 4;
  if (dbm >= -25) return 3;
  if (dbm >= -30) return 2;
  return 1;
}

interface OLTSectionCardProps {
  olt: Device;
  splitters: Device[];
  onts: Device[];
  isSelected: boolean;
  onSelect: (id: string) => void;
  index: number;
}

function StatPill({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div
      className="flex items-center gap-1 sm:gap-1.5 px-2 py-1.5 rounded-lg flex-1 min-w-0"
      style={{ background: `${color}10`, border: `1px solid ${color}25` }}
    >
      <Icon
        className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0"
        style={{ color }}
      />
      <div className="min-w-0 flex-1">
        <p
          className="text-[9px] font-mono uppercase tracking-wider truncate"
          style={{ color: `${color}90` }}
        >
          {label}
        </p>
        <p
          className="text-xs sm:text-sm font-bold font-mono leading-none"
          style={{ color }}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function SignalStrength({ dbm }: { dbm?: number }) {
  const bars = signalBars(dbm);
  return (
    <div className="flex items-end gap-0.5">
      {[1, 2, 3, 4, 5].map((b) => (
        <div
          key={b}
          className="w-1 rounded-sm transition-all"
          style={{
            height: `${3 + b * 2}px`,
            background: b <= bars ? "#06b6d4" : "rgba(255,255,255,0.12)",
            boxShadow: b <= bars ? "0 0 4px rgba(6,182,212,0.6)" : "none",
          }}
        />
      ))}
      {dbm != null && (
        <span
          className="text-[9px] font-mono ml-1"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {dbm}dBm
        </span>
      )}
    </div>
  );
}

export function OLTSectionCard({
  olt,
  splitters,
  onts,
  isSelected,
  onSelect,
  index,
}: OLTSectionCardProps) {
  const badge = STATUS_BADGE[olt.status];
  const StatusIcon = badge.icon;
  const activeONTs = onts.filter((o) => o.status === "active").length;
  const faultyONTs = onts.filter((o) => o.status === "faulty").length;
  const warnONTs = onts.filter((o) => o.status === "warning").length;
  const uptimePct = olt.uptime ?? 99.2;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      className="relative flex flex-col rounded-2xl cursor-pointer overflow-hidden group"
      style={{
        background: isSelected
          ? "rgba(6,182,212,0.07)"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${isSelected ? "rgba(6,182,212,0.45)" : "rgba(255,255,255,0.09)"}`,
        backdropFilter: "blur(16px)",
        boxShadow: isSelected
          ? "0 0 0 1px rgba(6,182,212,0.2), 0 8px 32px rgba(6,182,212,0.15)"
          : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
      }}
      onClick={() => onSelect(olt.id)}
      data-ocid={`olt-section-card.item.${index + 1}`}
      tabIndex={0}
      aria-label={`OLT ${olt.name} — ${badge.label}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(olt.id);
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: isSelected
            ? "linear-gradient(90deg, transparent, #06b6d4, transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
        }}
      />

      {isSelected && (
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at top right, rgba(6,182,212,0.12), transparent 70%)",
          }}
        />
      )}

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "rgba(6,182,212,0.12)",
              border: "1px solid rgba(6,182,212,0.25)",
              boxShadow: isSelected ? "0 0 14px rgba(6,182,212,0.3)" : "none",
            }}
          >
            <Router style={{ color: "#06b6d4", width: 16, height: 16 }} />
          </div>
          <div className="min-w-0">
            <h3
              className="text-xs sm:text-sm font-display font-semibold truncate"
              style={{
                color: isSelected ? "#06b6d4" : "rgba(255,255,255,0.9)",
                textShadow: isSelected
                  ? "0 0 12px rgba(6,182,212,0.5)"
                  : "none",
              }}
            >
              {olt.name}
            </h3>
            <p
              className="text-[10px] font-mono truncate mt-0.5"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {olt.region ?? "—"} · Port {olt.ports}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div
            className="flex items-center gap-1 px-1.5 sm:px-2 py-1 rounded-full"
            style={{
              background: badge.bg,
              border: `1px solid ${badge.border}`,
            }}
          >
            <StatusIcon
              className="w-2.5 h-2.5"
              style={{ color: badge.color }}
            />
            <span
              className="text-[10px] font-mono font-semibold hidden sm:inline"
              style={{ color: badge.color }}
            >
              {badge.label}
            </span>
          </div>
          <ChevronRight
            className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            style={{ color: isSelected ? "#06b6d4" : "rgba(255,255,255,0.2)" }}
          />
        </div>
      </div>

      {/* ── Signal + Uptime ─────────────────────────────────────────────── */}
      <div className="px-3 sm:px-4 pb-2 sm:pb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <Signal
            className="w-3 h-3"
            style={{ color: "rgba(255,255,255,0.3)" }}
          />
          <SignalStrength dbm={olt.signalStrength} />
        </div>
        <div className="flex items-center gap-1.5">
          <Activity className="w-3 h-3" style={{ color: "#22c55e" }} />
          <span
            className="text-[10px] font-mono"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Uptime
          </span>
          <span
            className="text-[10px] font-mono font-bold"
            style={{
              color:
                uptimePct >= 99
                  ? "#22c55e"
                  : uptimePct >= 95
                    ? "#eab308"
                    : "#ef4444",
            }}
          >
            {uptimePct.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* ── Mini tree (fully responsive SVG) ────────────────────────────── */}
      <div
        className="mx-2 sm:mx-3 mb-2 sm:mb-3 rounded-xl overflow-hidden"
        style={{
          background: "rgba(0,0,0,0.3)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <OLTSectionMiniTree olt={olt} splitters={splitters} onts={onts} />
      </div>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="px-2 sm:px-3 pb-3 sm:pb-4 grid grid-cols-3 gap-1.5">
        <StatPill
          icon={GitBranch}
          label="Splitters"
          value={splitters.length}
          color="#f97316"
        />
        <StatPill
          icon={Wifi}
          label="ONTs"
          value={onts.length}
          color="#a855f7"
        />
        <StatPill
          icon={CheckCircle2}
          label="Active"
          value={activeONTs}
          color="#22c55e"
        />
        {faultyONTs > 0 && (
          <StatPill
            icon={AlertTriangle}
            label="Fault"
            value={faultyONTs}
            color="#ef4444"
          />
        )}
        {faultyONTs === 0 && warnONTs > 0 && (
          <StatPill
            icon={AlertTriangle}
            label="Warn"
            value={warnONTs}
            color="#eab308"
          />
        )}
      </div>
    </motion.div>
  );
}
