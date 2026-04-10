import type { LucideIcon } from "lucide-react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  unit?: string;
  accentClass?: string;
  glowClass?: string;
  index?: number;
}

function AnimatedCounter({
  value,
  accentClass,
}: { value: number; accentClass?: string }) {
  const motionVal = useMotionValue(0);
  const display = useTransform(motionVal, (v) => Math.round(v).toString());
  const prevRef = useRef(0);

  useEffect(() => {
    const ctrl = animate(motionVal, value, {
      duration: 1.2,
      ease: "easeOut",
      from: prevRef.current,
    });
    prevRef.current = value;
    return ctrl.stop;
  }, [value, motionVal]);

  return (
    <motion.span
      className={`font-display text-4xl tabular-nums leading-none ${accentClass ?? "text-foreground"}`}
    >
      {display}
    </motion.span>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  accentClass,
  glowClass,
  index = 0,
}: StatCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden ${glowClass ?? ""}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      data-ocid="stat-card"
    >
      {/* Background accent glow */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full opacity-10 blur-2xl bg-primary pointer-events-none" />

      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-muted/50 border border-border/40">
          <Icon size={15} className="text-muted-foreground" />
        </div>
      </div>

      <div className="flex items-end gap-2">
        <AnimatedCounter value={value} accentClass={accentClass} />
        {unit && (
          <span className="text-muted-foreground text-sm mb-1">{unit}</span>
        )}
      </div>

      <div className="h-px bg-border/30 w-full" />
      <p className="text-[10px] text-muted-foreground font-mono tracking-wide">
        LIVE — updates every 5s
      </p>
    </motion.div>
  );
}
