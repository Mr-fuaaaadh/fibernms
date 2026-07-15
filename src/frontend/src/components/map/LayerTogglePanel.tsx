import { useNetworkStore } from "@/store/networkStore";
import { ChevronDown, Cpu, Layers, Users } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const FIBER_TYPES = [
  {
    key: "backbone" as const,
    label: "Backbone",
    color: "#00e5ff",
    strokeWidth: 4,
    dash: "",
    description: "Core trunk routes",
  },
  {
    key: "distribution" as const,
    label: "Distribution",
    color: "#448aff",
    strokeWidth: 2.5,
    dash: "",
    description: "Feeder segments",
  },
  {
    key: "drop" as const,
    label: "Drop",
    color: "#69ff47",
    strokeWidth: 1.5,
    dash: "4 3",
    description: "Last-mile drops",
  },
] as const;

export function LayerTogglePanel() {
  const { layerVisibility, toggleLayer } = useNetworkStore();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="pointer-events-auto min-w-[220px] rounded-2xl overflow-hidden"
      style={{
        background: "rgba(8,14,24,0.88)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03) inset",
      }}
      data-ocid="layer-toggle-panel"
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center gap-2.5 px-4 py-3 transition-colors duration-150 hover:bg-white/5"
        aria-expanded={!collapsed}
        aria-controls="layer-panel-body"
        data-ocid="layer-panel-toggle"
      >
        <Layers
          className="w-3.5 h-3.5 flex-shrink-0"
          style={{ color: "#00e5ff" }}
          aria-hidden="true"
        />
        <span
          className="flex-1 font-mono text-xs font-semibold uppercase tracking-widest text-left"
          style={{ color: "rgba(255,255,255,0.7)" }}
        >
          Map Layers
        </span>
        <motion.span
          animate={{ rotate: collapsed ? -90 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        </motion.span>
      </button>

      {/* Body */}
      <AnimatePresence initial={false}>
        {!collapsed && (
          <motion.div
            id="layer-panel-body"
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {/* Section divider */}
            <div
              className="mx-4 mb-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              aria-hidden="true"
            />

            {/* Fiber Types section */}
            <div className="px-3 pb-1">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.15em] mb-2 px-1"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Fiber Types
              </p>
              <div className="space-y-1">
                {FIBER_TYPES.map(
                  ({ key, label, color, strokeWidth, dash, description }) => {
                    const active = layerVisibility[key];
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleLayer(key)}
                        className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-150 group"
                        style={{
                          background: active ? `${color}08` : "transparent",
                          border: active
                            ? `1px solid ${color}20`
                            : "1px solid transparent",
                        }}
                        aria-pressed={active}
                        data-ocid={`layer-toggle-${key}`}
                      >
                        {/* Line preview SVG */}
                        <svg
                          width="40"
                          height="14"
                          viewBox="0 0 40 14"
                          className="flex-shrink-0"
                          aria-hidden="true"
                        >
                          <line
                            x1="2"
                            y1="7"
                            x2="38"
                            y2="7"
                            stroke={color}
                            strokeWidth={strokeWidth}
                            strokeDasharray={dash}
                            strokeLinecap="round"
                            opacity={active ? 1 : 0.2}
                            style={{
                              filter: active
                                ? `drop-shadow(0 0 3px ${color}80)`
                                : "none",
                            }}
                          />
                        </svg>

                        {/* Label + description */}
                        <div className="flex-1 min-w-0 text-left">
                          <p
                            className="font-mono text-xs font-medium leading-none mb-0.5"
                            style={{
                              color: active ? color : "rgba(255,255,255,0.3)",
                            }}
                          >
                            {label}
                          </p>
                          <p
                            className="font-mono text-[9px] leading-none"
                            style={{ color: "rgba(255,255,255,0.2)" }}
                          >
                            {description}
                          </p>
                        </div>

                        {/* Checkbox indicator */}
                        <span
                          className="flex h-4 w-4 items-center justify-center rounded flex-shrink-0 transition-all duration-150"
                          style={{
                            background: active
                              ? `${color}20`
                              : "rgba(255,255,255,0.06)",
                            border: active
                              ? `1.5px solid ${color}60`
                              : "1.5px solid rgba(255,255,255,0.12)",
                          }}
                          aria-hidden="true"
                        >
                          {active && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="block h-2 w-2 rounded-sm"
                              style={{ background: color }}
                            />
                          )}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </div>

            {/* Section divider */}
            <div
              className="mx-4 my-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
              aria-hidden="true"
            />

            {/* Device + Customer toggles */}
            <div className="px-3 pb-3">
              <p
                className="font-mono text-[9px] uppercase tracking-[0.15em] mb-2 px-1"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Overlays
              </p>
              <div className="space-y-1">
                {/* Device layer */}
                <button
                  type="button"
                  onClick={() =>
                    toggleLayer("devices" as keyof typeof layerVisibility)
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-150"
                  style={{
                    background: layerVisibility[
                      "devices" as keyof typeof layerVisibility
                    ]
                      ? "rgba(168,85,247,0.08)"
                      : "transparent",
                    border: layerVisibility[
                      "devices" as keyof typeof layerVisibility
                    ]
                      ? "1px solid rgba(168,85,247,0.25)"
                      : "1px solid transparent",
                  }}
                  aria-pressed={
                    !!layerVisibility["devices" as keyof typeof layerVisibility]
                  }
                  data-ocid="layer-toggle-devices"
                >
                  <span
                    className="flex h-7 w-10 items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      background: "rgba(168,85,247,0.12)",
                      border: "1px solid rgba(168,85,247,0.2)",
                    }}
                  >
                    <Cpu
                      className="w-3.5 h-3.5"
                      style={{ color: "#a855f7" }}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex-1 text-left">
                    <p
                      className="font-mono text-xs font-medium"
                      style={{
                        color: layerVisibility[
                          "devices" as keyof typeof layerVisibility
                        ]
                          ? "#a855f7"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      Devices
                    </p>
                    <p
                      className="font-mono text-[9px]"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      OLT, ONT, Splitter…
                    </p>
                  </div>
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded flex-shrink-0 transition-all duration-150"
                    style={{
                      background: layerVisibility[
                        "devices" as keyof typeof layerVisibility
                      ]
                        ? "rgba(168,85,247,0.2)"
                        : "rgba(255,255,255,0.06)",
                      border: layerVisibility[
                        "devices" as keyof typeof layerVisibility
                      ]
                        ? "1.5px solid rgba(168,85,247,0.6)"
                        : "1.5px solid rgba(255,255,255,0.12)",
                    }}
                    aria-hidden="true"
                  >
                    {layerVisibility[
                      "devices" as keyof typeof layerVisibility
                    ] && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="block h-2 w-2 rounded-sm"
                        style={{ background: "#a855f7" }}
                      />
                    )}
                  </span>
                </button>

                {/* Customer layer */}
                <button
                  type="button"
                  onClick={() =>
                    toggleLayer("customers" as keyof typeof layerVisibility)
                  }
                  className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 transition-all duration-150"
                  style={{
                    background: layerVisibility[
                      "customers" as keyof typeof layerVisibility
                    ]
                      ? "rgba(251,191,36,0.08)"
                      : "transparent",
                    border: layerVisibility[
                      "customers" as keyof typeof layerVisibility
                    ]
                      ? "1px solid rgba(251,191,36,0.25)"
                      : "1px solid transparent",
                  }}
                  aria-pressed={
                    !!layerVisibility[
                      "customers" as keyof typeof layerVisibility
                    ]
                  }
                  data-ocid="layer-toggle-customers"
                >
                  <span
                    className="flex h-7 w-10 items-center justify-center rounded-lg flex-shrink-0"
                    style={{
                      background: "rgba(251,191,36,0.1)",
                      border: "1px solid rgba(251,191,36,0.2)",
                    }}
                  >
                    <Users
                      className="w-3.5 h-3.5"
                      style={{ color: "#fbbf24" }}
                      aria-hidden="true"
                    />
                  </span>
                  <div className="flex-1 text-left">
                    <p
                      className="font-mono text-xs font-medium"
                      style={{
                        color: layerVisibility[
                          "customers" as keyof typeof layerVisibility
                        ]
                          ? "#fbbf24"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      Customers
                    </p>
                    <p
                      className="font-mono text-[9px]"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      Subscriber endpoints
                    </p>
                  </div>
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded flex-shrink-0 transition-all duration-150"
                    style={{
                      background: layerVisibility[
                        "customers" as keyof typeof layerVisibility
                      ]
                        ? "rgba(251,191,36,0.2)"
                        : "rgba(255,255,255,0.06)",
                      border: layerVisibility[
                        "customers" as keyof typeof layerVisibility
                      ]
                        ? "1.5px solid rgba(251,191,36,0.6)"
                        : "1.5px solid rgba(255,255,255,0.12)",
                    }}
                    aria-hidden="true"
                  >
                    {layerVisibility[
                      "customers" as keyof typeof layerVisibility
                    ] && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="block h-2 w-2 rounded-sm"
                        style={{ background: "#fbbf24" }}
                      />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
