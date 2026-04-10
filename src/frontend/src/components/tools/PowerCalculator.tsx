import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertTriangle,
  Calculator,
  CheckCircle,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

interface FormValues {
  fiberLength: number;
  splitterType: string;
  splitterCount: number;
  connectorCount: number;
  spliceCount: number;
}

interface CalcResult {
  totalLoss: number;
  signalAtONT: number;
  pass: boolean;
  margin: number;
  nearThreshold: boolean;
}

const SPLITTER_OPTIONS = [
  { label: "1×2 (3.5 dB)", value: "3.5" },
  { label: "1×4 (7 dB)", value: "7" },
  { label: "1×8 (10.5 dB)", value: "10.5" },
];

const TX_POWER = -27;
const THRESHOLD = -28;

export function PowerCalculator() {
  const [result, setResult] = useState<CalcResult | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      fiberLength: 1,
      splitterType: "3.5",
      splitterCount: 1,
      connectorCount: 2,
      spliceCount: 4,
    },
  });

  function onSubmit(values: FormValues) {
    const splitterLoss = Number.parseFloat(values.splitterType);
    const totalLoss =
      values.fiberLength * 0.25 +
      splitterLoss * values.splitterCount +
      values.connectorCount * 0.5 +
      values.spliceCount * 0.1;
    const signalAtONT = TX_POWER - totalLoss;
    const pass = signalAtONT >= THRESHOLD;
    const margin = signalAtONT - THRESHOLD;
    const nearThreshold =
      signalAtONT >= THRESHOLD && signalAtONT < THRESHOLD + 3;

    setResult({ totalLoss, signalAtONT, pass, margin, nearThreshold });
  }

  function onReset() {
    reset();
    setResult(null);
  }

  // Clamp bar: -6 dB to +6 dB headroom range visualisation
  const barPercent = result
    ? Math.min(100, Math.max(0, ((result.margin + 6) / 12) * 100))
    : 0;

  return (
    <GlassCard elevated className="p-6 flex flex-col gap-5 h-full">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 noc-glow">
          <Calculator className="w-4 h-4 text-primary" />
        </div>
        <h2 className="text-sm font-semibold tracking-widest uppercase text-foreground/80 font-display">
          Power Budget Calculator
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Fiber Length */}
        <div className="space-y-1.5">
          <Label
            htmlFor="fiberLength"
            className="text-xs text-muted-foreground uppercase tracking-wider"
          >
            Fiber Length (km)
          </Label>
          <Input
            id="fiberLength"
            type="number"
            step="0.1"
            min="0.1"
            data-ocid="calc-fiber-length"
            className="bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40"
            {...register("fiberLength", {
              required: "Required",
              min: { value: 0.1, message: "Min 0.1 km" },
              valueAsNumber: true,
            })}
          />
          {errors.fiberLength && (
            <p className="text-[11px] text-destructive">
              {errors.fiberLength.message}
            </p>
          )}
        </div>

        {/* Splitter Type */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wider">
            Splitter Type
          </Label>
          <Controller
            control={control}
            name="splitterType"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  data-ocid="calc-splitter-type"
                  className="bg-muted/30 border-border/40 font-mono text-sm focus:ring-primary/40"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border/50">
                  {SPLITTER_OPTIONS.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                      className="font-mono text-sm"
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Three numeric fields in row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="splitterCount"
              className="text-xs text-muted-foreground uppercase tracking-wider"
            >
              Splitters
            </Label>
            <Input
              id="splitterCount"
              type="number"
              min="0"
              data-ocid="calc-splitter-count"
              className="bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40"
              {...register("splitterCount", {
                required: "Required",
                min: { value: 0, message: "≥ 0" },
                valueAsNumber: true,
              })}
            />
            {errors.splitterCount && (
              <p className="text-[10px] text-destructive">
                {errors.splitterCount.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="connectorCount"
              className="text-xs text-muted-foreground uppercase tracking-wider"
            >
              Connectors
            </Label>
            <Input
              id="connectorCount"
              type="number"
              min="0"
              data-ocid="calc-connector-count"
              className="bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40"
              {...register("connectorCount", {
                required: "Required",
                min: { value: 0, message: "≥ 0" },
                valueAsNumber: true,
              })}
            />
            {errors.connectorCount && (
              <p className="text-[10px] text-destructive">
                {errors.connectorCount.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="spliceCount"
              className="text-xs text-muted-foreground uppercase tracking-wider"
            >
              Splices
            </Label>
            <Input
              id="spliceCount"
              type="number"
              min="0"
              data-ocid="calc-splice-count"
              className="bg-muted/30 border-border/40 font-mono text-sm focus-visible:ring-primary/40"
              {...register("spliceCount", {
                required: "Required",
                min: { value: 0, message: "≥ 0" },
                valueAsNumber: true,
              })}
            />
            {errors.spliceCount && (
              <p className="text-[10px] text-destructive">
                {errors.spliceCount.message}
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <Button
            type="submit"
            data-ocid="calc-submit"
            className="flex-1 bg-primary/20 hover:bg-primary/35 text-primary border border-primary/40 noc-glow font-display text-xs tracking-widest uppercase transition-smooth"
          >
            Calculate
          </Button>
          <Button
            type="button"
            variant="outline"
            data-ocid="calc-reset"
            onClick={onReset}
            className="border-border/40 bg-muted/20 hover:bg-muted/40 text-muted-foreground text-xs transition-smooth"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </form>

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex flex-col gap-4 pt-2 border-t border-border/30"
          >
            {/* Loss + Signal row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Total Loss
                </span>
                <span className="font-mono text-2xl font-bold text-foreground tabular-nums">
                  {result.totalLoss.toFixed(2)}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    dB
                  </span>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Signal at ONT
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-2xl font-bold tabular-nums"
                    style={{
                      color: result.pass
                        ? "oklch(0.62 0.22 142)"
                        : "oklch(0.62 0.28 22)",
                    }}
                  >
                    {result.signalAtONT.toFixed(1)}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      dBm
                    </span>
                  </span>
                  {result.nearThreshold && (
                    <AlertTriangle
                      className="w-4 h-4 shrink-0"
                      style={{ color: "oklch(0.7 0.25 55)" }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Pass / Fail badge */}
            <div className="flex items-center gap-3">
              {result.pass ? (
                <Badge
                  data-ocid="calc-result-pass"
                  className="gap-1.5 px-3 py-1 text-xs font-bold tracking-widest uppercase font-display border"
                  style={{
                    background: "oklch(0.62 0.22 142 / 0.15)",
                    borderColor: "oklch(0.62 0.22 142 / 0.5)",
                    color: "oklch(0.72 0.22 142)",
                    boxShadow: "0 0 12px oklch(0.62 0.22 142 / 0.3)",
                  }}
                >
                  <CheckCircle className="w-3 h-3" />
                  PASS
                </Badge>
              ) : (
                <Badge
                  data-ocid="calc-result-fail"
                  className="gap-1.5 px-3 py-1 text-xs font-bold tracking-widest uppercase font-display border"
                  style={{
                    background: "oklch(0.62 0.28 22 / 0.15)",
                    borderColor: "oklch(0.62 0.28 22 / 0.5)",
                    color: "oklch(0.72 0.28 22)",
                    boxShadow: "0 0 12px oklch(0.62 0.28 22 / 0.3)",
                  }}
                >
                  <XCircle className="w-3 h-3" />
                  FAIL
                </Badge>
              )}
              <span className="text-xs text-muted-foreground font-mono">
                TX {TX_POWER} dBm → threshold {THRESHOLD} dBm
              </span>
            </div>

            {/* Signal margin progress bar */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Signal Margin
                </span>
                <span
                  className="text-xs font-mono font-semibold"
                  style={{
                    color: result.pass
                      ? "oklch(0.62 0.22 142)"
                      : "oklch(0.62 0.28 22)",
                  }}
                >
                  {result.margin >= 0 ? "+" : ""}
                  {result.margin.toFixed(1)} dB headroom
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-muted/40 overflow-hidden border border-border/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barPercent}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{
                    background: result.pass
                      ? "linear-gradient(90deg, oklch(0.5 0.2 142), oklch(0.72 0.22 142))"
                      : "linear-gradient(90deg, oklch(0.5 0.24 22), oklch(0.72 0.28 22))",
                    boxShadow: result.pass
                      ? "0 0 8px oklch(0.62 0.22 142 / 0.5)"
                      : "0 0 8px oklch(0.62 0.28 22 / 0.5)",
                  }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-muted-foreground/60 font-mono">
                <span>−6 dB</span>
                <span>0 dB</span>
                <span>+6 dB</span>
              </div>
            </div>

            {/* Near-threshold warning */}
            {result.nearThreshold && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-start gap-2 p-3 rounded-xl border"
                style={{
                  background: "oklch(0.7 0.25 55 / 0.08)",
                  borderColor: "oklch(0.7 0.25 55 / 0.35)",
                }}
              >
                <AlertTriangle
                  className="w-3.5 h-3.5 mt-0.5 shrink-0"
                  style={{ color: "oklch(0.7 0.25 55)" }}
                />
                <p
                  className="text-[11px] leading-relaxed"
                  style={{ color: "oklch(0.75 0.2 55)" }}
                >
                  Signal is within 3 dB of failure threshold. Consider adding a
                  booster or reducing span length.
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
