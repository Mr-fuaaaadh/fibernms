import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface SignalDataPoint {
  time: string;
  [oltName: string]: number | string;
}

interface SignalLineChartProps {
  data: SignalDataPoint[];
  oltNames: string[];
}

const NEON_COLORS = [
  "oklch(0.72 0.22 210)", // cyan-blue
  "oklch(0.68 0.22 142)", // neon green
  "oklch(0.62 0.28 22)", // red-orange
];

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { name: string; value: number; color: string }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-elevated rounded-xl p-3 text-xs border border-border/50 shadow-xl">
      <p className="font-mono text-muted-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 mb-1">
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: p.color }}
          />
          <span className="text-foreground/80">{p.name}:</span>
          <span className="font-mono font-semibold" style={{ color: p.color }}>
            {p.value} dBm
          </span>
        </div>
      ))}
    </div>
  );
};

export function SignalLineChart({ data, oltNames }: SignalLineChartProps) {
  return (
    <div className="w-full h-full" data-ocid="signal-line-chart">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(0.26 0.01 265 / 0.5)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            tick={{
              fill: "oklch(0.52 0.008 260)",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
            }}
            tickLine={false}
            axisLine={{ stroke: "oklch(0.26 0.01 265 / 0.6)" }}
            interval={3}
          />
          <YAxis
            domain={[-40, -10]}
            tick={{
              fill: "oklch(0.52 0.008 260)",
              fontSize: 10,
              fontFamily: "var(--font-mono)",
            }}
            tickLine={false}
            axisLine={false}
            tickFormatter={(v: number) => `${v}`}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              paddingTop: "8px",
            }}
          />
          {oltNames.map((name, i) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={NEON_COLORS[i % NEON_COLORS.length]}
              strokeWidth={1.5}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
