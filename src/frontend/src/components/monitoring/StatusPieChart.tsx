import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface StatusData {
  name: string;
  value: number;
  color: string;
}

interface StatusPieChartProps {
  data: StatusData[];
  total: number;
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name: string; value: number; payload: StatusData }[];
}) => {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="glass-elevated rounded-xl p-3 text-xs border border-border/50 shadow-xl">
      <div className="flex items-center gap-2">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ background: item.payload.color }}
        />
        <span className="text-foreground">{item.name}:</span>
        <span
          className="font-mono font-semibold"
          style={{ color: item.payload.color }}
        >
          {item.value}
        </span>
      </div>
    </div>
  );
};

export function StatusPieChart({ data, total }: StatusPieChartProps) {
  return (
    <div className="w-full h-full relative" data-ocid="status-pie-chart">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius="50%"
            outerRadius="70%"
            paddingAngle={3}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              paddingTop: "4px",
            }}
            formatter={(value: string, entry: { color?: string }) => (
              <span style={{ color: entry.color ?? "inherit" }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Center label overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-10">
        <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest">
          Total
        </span>
        <span className="font-display text-2xl font-bold text-foreground tabular-nums leading-none mt-0.5">
          {total}
        </span>
      </div>
    </div>
  );
}
