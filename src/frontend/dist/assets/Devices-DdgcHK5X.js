import { c as createLucideIcon, u as useNetworkStore, r as reactExports, j as jsxRuntimeExports, A as AnimatePresence, m as motion, e as cn, X, i as ChevronDown, k as useNavigate, l as useSearch } from "./index-BuH20gNs.js";
import { D as DeviceIcon } from "./DeviceIcon-CtR8Rdzx.js";
import { G as GlassCard } from "./GlassCard-ArFOmrcF.js";
import { u as useForm } from "./index.esm-CrsP6eZo.js";
import { F as Funnel } from "./funnel-BGmO5CKg.js";
import { S as StatusBadge } from "./StatusBadge-D6Nd0x_a.js";
import { P as Pencil } from "./pencil-DtADEu56.js";
import { T as Trash2 } from "./trash-2-BdR1KnJk.js";
import { A as ArrowUpDown } from "./arrow-up-down-_M5PszSt.js";
import { C as ChevronUp } from "./chevron-up-D3ytfDGQ.js";
import { P as Plus } from "./plus-BV2vWbsN.js";
import "./globe-Bv69OvCQ.js";
import "./link-2-DQOumHS5.js";
import "./wifi-D3dQo2O3.js";
import "./monitor-D0Fcl7YP.js";
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
      d: "M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2",
      key: "4b9dqc"
    }
  ],
  [
    "path",
    {
      d: "M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2",
      key: "22nnkd"
    }
  ],
  ["path", { d: "M6 6h.01", key: "1utrut" }],
  ["path", { d: "M6 18h.01", key: "uhywen" }],
  ["path", { d: "m13 6-4 6h6l-4 6", key: "14hqih" }]
];
const ServerCrash = createLucideIcon("server-crash", __iconNode);
const DEVICE_TYPES$1 = ["OLT", "ONT", "Splitter", "JJB", "Switch"];
const DEVICE_STATUSES$1 = ["active", "faulty", "warning"];
function AddDeviceModal({
  open,
  editDevice,
  onClose
}) {
  const { addDevice, updateDevice } = useNetworkStore();
  const isEdit = !!editDevice;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: "",
      type: "ONT",
      lat: 40.7128,
      lng: -74.006,
      ports: 4,
      status: "active"
    }
  });
  reactExports.useEffect(() => {
    if (editDevice) {
      reset({
        name: editDevice.name,
        type: editDevice.type,
        lat: editDevice.lat,
        lng: editDevice.lng,
        ports: editDevice.ports,
        status: editDevice.status
      });
    } else {
      reset({
        name: "",
        type: "ONT",
        lat: 40.7128,
        lng: -74.006,
        ports: 4,
        status: "active"
      });
    }
  }, [editDevice, reset]);
  const onSubmit = (data) => {
    if (isEdit && editDevice) {
      updateDevice(editDevice.id, {
        name: data.name,
        type: data.type,
        lat: Number(data.lat),
        lng: Number(data.lng),
        ports: Number(data.ports),
        status: data.status
      });
    } else {
      const newDevice = {
        id: `device-${Date.now()}`,
        name: data.name,
        type: data.type,
        lat: Number(data.lat),
        lng: Number(data.lng),
        ports: Number(data.ports),
        status: data.status,
        connectedTo: []
      };
      addDevice(newDevice);
    }
    onClose();
  };
  const labelCls = "block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-1.5";
  const inputCls = "w-full bg-muted/30 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-smooth";
  const selectCls = "w-full bg-muted/30 border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-smooth appearance-none cursor-pointer";
  const errorCls = "mt-1 text-[10px] text-red-400 font-mono";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.18 },
        className: "fixed inset-0 z-40 bg-background/70 backdrop-blur-sm",
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 16, scale: 0.98 },
        transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] },
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "pointer-events-auto w-full max-w-md glass-elevated rounded-2xl shadow-2xl",
            "data-ocid": "device-modal",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 pt-5 pb-4 border-b border-border/40", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-mono font-semibold text-sm tracking-wide text-foreground", children: isEdit ? "EDIT DEVICE" : "ADD DEVICE" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: isEdit ? `Editing ${editDevice == null ? void 0 : editDevice.name}` : "Register a new network device" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "data-ocid": "modal-close",
                    className: "w-7 h-7 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth text-lg leading-none",
                    children: "×"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit(onSubmit),
                  className: "px-5 py-4 space-y-4",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-name", className: labelCls, children: "Device Name *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "field-name",
                          ...register("name", { required: "Name is required" }),
                          type: "text",
                          placeholder: "e.g. OLT-CORE-03",
                          className: inputCls,
                          "data-ocid": "input-device-name"
                        }
                      ),
                      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: errorCls, children: errors.name.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-type", className: labelCls, children: "Type *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            id: "field-type",
                            ...register("type", { required: true }),
                            className: selectCls,
                            "data-ocid": "input-device-type",
                            children: DEVICE_TYPES$1.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, className: "bg-card", children: t }, t))
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-status", className: labelCls, children: "Status *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "select",
                          {
                            id: "field-status",
                            ...register("status", { required: true }),
                            className: selectCls,
                            "data-ocid": "input-device-status",
                            children: DEVICE_STATUSES$1.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "option",
                              {
                                value: s,
                                className: "bg-card capitalize",
                                children: s.charAt(0).toUpperCase() + s.slice(1)
                              },
                              s
                            ))
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-lat", className: labelCls, children: "Latitude *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "field-lat",
                            ...register("lat", {
                              required: "Required",
                              valueAsNumber: true,
                              validate: (v) => !Number.isNaN(v) || "Must be a number"
                            }),
                            type: "number",
                            step: "0.0001",
                            placeholder: "40.7128",
                            className: inputCls,
                            "data-ocid": "input-device-lat"
                          }
                        ),
                        errors.lat && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: errorCls, children: errors.lat.message })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-lng", className: labelCls, children: "Longitude *" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "field-lng",
                            ...register("lng", {
                              required: "Required",
                              valueAsNumber: true,
                              validate: (v) => !Number.isNaN(v) || "Must be a number"
                            }),
                            type: "number",
                            step: "0.0001",
                            placeholder: "-74.0060",
                            className: inputCls,
                            "data-ocid": "input-device-lng"
                          }
                        ),
                        errors.lng && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: errorCls, children: errors.lng.message })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "field-ports", className: labelCls, children: "Ports *" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "field-ports",
                          ...register("ports", {
                            required: "Required",
                            valueAsNumber: true,
                            min: { value: 1, message: "Minimum 1 port" }
                          }),
                          type: "number",
                          min: 1,
                          placeholder: "4",
                          className: inputCls,
                          "data-ocid": "input-device-ports"
                        }
                      ),
                      errors.ports && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: errorCls, children: errors.ports.message })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: onClose,
                          "data-ocid": "modal-cancel",
                          className: "flex-1 py-2 rounded-lg border border-border/60 text-sm font-mono text-muted-foreground hover:text-foreground hover:border-border transition-smooth",
                          children: "Cancel"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "submit",
                          "data-ocid": "modal-save",
                          className: "flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-mono font-medium hover:opacity-90 transition-smooth noc-glow",
                          children: isEdit ? "Save Changes" : "Add Device"
                        }
                      )
                    ] })
                  ]
                }
              )
            ]
          }
        )
      }
    )
  ] }) });
}
const DEVICE_TYPES = [
  "OLT",
  "ONT",
  "Splitter",
  "JJB",
  "Switch",
  "Coupler",
  "Router"
];
const DEVICE_STATUSES = ["active", "faulty", "warning"];
const TYPE_COLORS = {
  OLT: "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
  ONT: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  Splitter: "text-violet-400 border-violet-400/40 bg-violet-400/10",
  JJB: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  Switch: "text-blue-400 border-blue-400/40 bg-blue-400/10",
  Coupler: "text-purple-400 border-purple-400/40 bg-purple-400/10",
  Router: "text-red-400 border-red-400/40 bg-red-400/10"
};
const STATUS_COLORS = {
  active: "text-emerald-400 border-emerald-400/40 bg-emerald-400/10",
  faulty: "text-red-400 border-red-400/40 bg-red-400/10",
  warning: "text-amber-400 border-amber-400/40 bg-amber-400/10"
};
function DeviceFilters({
  selectedTypes,
  selectedStatuses,
  onTypeToggle,
  onStatusToggle,
  onClearAll
}) {
  const hasFilters = selectedTypes.length > 0 || selectedStatuses.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 px-4 py-3 border-b border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-muted-foreground font-mono uppercase tracking-widest shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "w-3 h-3" }),
      "Filter"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60 font-mono", children: "TYPE:" }),
      DEVICE_TYPES.map((type) => {
        const active = selectedTypes.includes(type);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onTypeToggle(type),
            "data-ocid": `filter-type-${type.toLowerCase()}`,
            className: cn(
              "px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wide border transition-smooth",
              active ? TYPE_COLORS[type] : "text-muted-foreground border-border/40 bg-transparent hover:border-border"
            ),
            children: type
          },
          type
        );
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-4 bg-border/40 shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/60 font-mono", children: "STATUS:" }),
      DEVICE_STATUSES.map((status) => {
        const active = selectedStatuses.includes(status);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onStatusToggle(status),
            "data-ocid": `filter-status-${status}`,
            className: cn(
              "px-2.5 py-0.5 rounded text-[10px] font-mono font-medium uppercase tracking-wide border transition-smooth",
              active ? STATUS_COLORS[status] : "text-muted-foreground border-border/40 bg-transparent hover:border-border"
            ),
            children: status
          },
          status
        );
      })
    ] }),
    hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: onClearAll,
        "data-ocid": "filter-clear-all",
        className: "ml-auto flex items-center gap-1 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-smooth",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3" }),
          "Clear"
        ]
      }
    )
  ] });
}
const ITEM_HEIGHT = 52;
const OVERSCAN = 5;
function DeleteDialog({ device, onConfirm, onCancel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Escape" && onCancel(),
            role: "button",
            tabIndex: -1,
            "aria-label": "Close dialog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { scale: 0.95, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
            exit: { scale: 0.95, opacity: 0 },
            className: "relative glass-elevated rounded-2xl p-5 w-80 shadow-2xl",
            "data-ocid": "delete-dialog",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-mono text-sm font-semibold text-foreground mb-1", children: "Confirm Delete" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mb-5", children: [
                "Remove",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-foreground", children: device.name }),
                " from the network? This cannot be undone."
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    "data-ocid": "delete-cancel",
                    className: "flex-1 py-2 rounded-lg border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground transition-smooth",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onConfirm,
                    "data-ocid": "delete-confirm",
                    className: "flex-1 py-2 rounded-lg bg-destructive text-destructive-foreground text-xs font-mono font-medium hover:opacity-90 transition-smooth",
                    children: "Delete"
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
}
function DeviceTable({ devices, onEdit }) {
  const { deleteDevice } = useNetworkStore();
  const [sortField, setSortField] = reactExports.useState("name");
  const [sortDir, setSortDir] = reactExports.useState("asc");
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const scrollRef = reactExports.useRef(null);
  const [scrollTop, setScrollTop] = reactExports.useState(0);
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };
  const sorted = [...devices].sort((a, b) => {
    let cmp = 0;
    if (sortField === "name") cmp = a.name.localeCompare(b.name);
    else if (sortField === "type") cmp = a.type.localeCompare(b.type);
    else if (sortField === "status") cmp = a.status.localeCompare(b.status);
    return sortDir === "asc" ? cmp : -cmp;
  });
  const containerHeight = 480;
  const totalHeight = sorted.length * ITEM_HEIGHT;
  const startIdx = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - OVERSCAN);
  const endIdx = Math.min(
    sorted.length - 1,
    Math.ceil((scrollTop + containerHeight) / ITEM_HEIGHT) + OVERSCAN
  );
  const visibleItems = sorted.slice(startIdx, endIdx + 1);
  const handleScroll = reactExports.useCallback((e) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);
  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "w-3 h-3 opacity-40" });
    return sortDir === "asc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3 h-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3 h-3 text-primary" });
  };
  const colHeader = (label, field) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => handleSort(field),
      "data-ocid": `sort-${field}`,
      className: "flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground hover:text-foreground transition-smooth group",
      children: [
        label,
        /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[2fr_1fr_2fr_80px_120px_88px] gap-0 px-4 py-2.5 border-b border-border/40 bg-muted/10", children: [
      colHeader("Device Name", "name"),
      colHeader("Type", "type"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Location" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground", children: "Ports" }),
      colHeader("Status", "status"),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-right", children: "Actions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref: scrollRef,
        className: "noc-scrollbar overflow-y-auto",
        style: { height: containerHeight },
        onScroll: handleScroll,
        "data-ocid": "device-table-scroll",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: totalHeight, position: "relative" }, children: visibleItems.map((device, i) => {
          const absoluteIdx = startIdx + i;
          const top = absoluteIdx * ITEM_HEIGHT;
          const isEven = absoluteIdx % 2 === 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, x: -8 },
              animate: { opacity: 1, x: 0 },
              transition: {
                delay: Math.min(absoluteIdx * 0.02, 0.4),
                duration: 0.18
              },
              style: {
                position: "absolute",
                top,
                left: 0,
                right: 0,
                height: ITEM_HEIGHT
              },
              className: cn(
                "grid grid-cols-[2fr_1fr_2fr_80px_120px_88px] gap-0 px-4 items-center transition-smooth border-b border-border/20 cursor-pointer",
                isEven ? "bg-transparent hover:bg-muted/10" : "bg-muted/5 hover:bg-muted/15"
              ),
              onClick: () => onEdit(device),
              "data-ocid": `device-row-${device.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground truncate pr-2 min-w-0", children: device.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    DeviceIcon,
                    {
                      type: device.type,
                      status: device.status,
                      size: "sm"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground truncate", children: device.type })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground truncate pr-2 min-w-0 font-mono", children: [
                  device.lat.toFixed(4),
                  ", ",
                  device.lng.toFixed(4)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-metric text-muted-foreground", children: device.ports }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    onClick: (e) => e.stopPropagation(),
                    onKeyDown: (e) => e.stopPropagation(),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: device.status })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center justify-end gap-1",
                    onClick: (e) => e.stopPropagation(),
                    onKeyDown: (e) => e.stopPropagation(),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => onEdit(device),
                          "data-ocid": `edit-device-${device.id}`,
                          "aria-label": `Edit ${device.name}`,
                          className: "w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-smooth",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3 h-3" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setDeleteTarget(device),
                          "data-ocid": `delete-device-${device.id}`,
                          "aria-label": `Delete ${device.name}`,
                          className: "w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3 h-3" })
                        }
                      )
                    ]
                  }
                )
              ]
            },
            device.id
          );
        }) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DeleteDialog,
      {
        device: deleteTarget,
        onConfirm: () => {
          deleteDevice(deleteTarget.id);
          setDeleteTarget(null);
        },
        onCancel: () => setDeleteTarget(null)
      }
    ) })
  ] });
}
const TYPE_BADGE_COLORS = {
  OLT: {
    text: "text-cyan-400",
    bg: "bg-cyan-400/10 border border-cyan-400/30",
    glow: "shadow-[0_0_12px_oklch(0.75_0.22_210/0.3)]"
  },
  ONT: {
    text: "text-emerald-400",
    bg: "bg-emerald-400/10 border border-emerald-400/30",
    glow: "shadow-[0_0_12px_oklch(0.62_0.22_142/0.3)]"
  },
  Splitter: {
    text: "text-violet-400",
    bg: "bg-violet-400/10 border border-violet-400/30",
    glow: "shadow-[0_0_12px_oklch(0.65_0.22_290/0.3)]"
  },
  JJB: {
    text: "text-amber-400",
    bg: "bg-amber-400/10 border border-amber-400/30",
    glow: "shadow-[0_0_12px_oklch(0.7_0.25_55/0.3)]"
  },
  Switch: {
    text: "text-blue-400",
    bg: "bg-blue-400/10 border border-blue-400/30",
    glow: "shadow-[0_0_12px_oklch(0.65_0.22_240/0.3)]"
  },
  Coupler: {
    text: "text-purple-400",
    bg: "bg-purple-400/10 border border-purple-400/30",
    glow: "shadow-[0_0_12px_oklch(0.65_0.22_300/0.3)]"
  },
  Router: {
    text: "text-red-400",
    bg: "bg-red-400/10 border border-red-400/30",
    glow: "shadow-[0_0_12px_oklch(0.65_0.22_25/0.3)]"
  }
};
const ALL_TYPES = ["OLT", "ONT", "Splitter", "JJB", "Switch"];
const ALL_STATUSES = ["active", "faulty", "warning"];
function parseArrayParam(val) {
  if (!val) return [];
  if (Array.isArray(val)) return val;
  if (typeof val === "string") return val.split(",").filter(Boolean);
  return [];
}
function CountBadge({ type, count, delay }) {
  const colors = TYPE_BADGE_COLORS[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.22 },
      className: cn(
        "flex items-center gap-2 px-3 py-2 rounded-xl",
        colors.bg,
        colors.glow
      ),
      "data-ocid": `count-badge-${type.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceIcon, { type, status: "active", size: "sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: cn(
                "text-lg font-mono font-bold leading-none tabular-nums",
                colors.text
              ),
              children: count
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[9px] font-mono uppercase tracking-widest text-muted-foreground mt-0.5", children: [
            type,
            "s"
          ] })
        ] })
      ]
    }
  );
}
function Devices() {
  const { devices } = useNetworkStore();
  const navigate = useNavigate();
  const rawSearch = useSearch({ strict: false });
  const selectedTypes = reactExports.useMemo(
    () => parseArrayParam(rawSearch.types).filter(
      (t) => ALL_TYPES.includes(t)
    ),
    [rawSearch.types]
  );
  const selectedStatuses = reactExports.useMemo(
    () => parseArrayParam(rawSearch.statuses).filter(
      (s) => ALL_STATUSES.includes(s)
    ),
    [rawSearch.statuses]
  );
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editDevice, setEditDevice] = reactExports.useState(null);
  const updateSearch = reactExports.useCallback(
    (types, statuses) => {
      navigate({
        search: {
          ...types.length ? { types: types.join(",") } : {},
          ...statuses.length ? { statuses: statuses.join(",") } : {}
        },
        replace: true
      });
    },
    [navigate]
  );
  const handleTypeToggle = (type) => {
    const next = selectedTypes.includes(type) ? selectedTypes.filter((t) => t !== type) : [...selectedTypes, type];
    updateSearch(next, selectedStatuses);
  };
  const handleStatusToggle = (status) => {
    const next = selectedStatuses.includes(status) ? selectedStatuses.filter((s) => s !== status) : [...selectedStatuses, status];
    updateSearch(selectedTypes, next);
  };
  const handleClearAll = () => updateSearch([], []);
  const filteredDevices = reactExports.useMemo(() => {
    return devices.filter((d) => {
      const typeOk = selectedTypes.length === 0 || selectedTypes.includes(d.type);
      const statusOk = selectedStatuses.length === 0 || selectedStatuses.includes(d.status);
      return typeOk && statusOk;
    });
  }, [devices, selectedTypes, selectedStatuses]);
  const typeCounts = reactExports.useMemo(() => {
    const counts = {
      OLT: 0,
      ONT: 0,
      Splitter: 0,
      JJB: 0,
      Switch: 0,
      Coupler: 0,
      Router: 0
    };
    for (const d of devices) counts[d.type]++;
    return counts;
  }, [devices]);
  const openAdd = () => {
    setEditDevice(null);
    setModalOpen(true);
  };
  const openEdit = (device) => {
    setEditDevice(device);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditDevice(null);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full min-h-0 overflow-auto p-4 md:p-6 space-y-4 md:space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -12 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.25 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-mono font-bold text-xl text-foreground tracking-tight", children: "DEVICE MANAGEMENT" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono mt-0.5", children: [
              devices.length,
              " total registered network nodes"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-2", children: ALL_TYPES.map((type, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        CountBadge,
        {
          type,
          count: typeCounts[type],
          delay: i * 0.06
        },
        type
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.15, duration: 0.3 },
        className: "flex-1",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "flex flex-col min-h-0 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/40", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "Network Devices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-primary tabular-nums", children: [
                "[",
                filteredDevices.length,
                "/",
                devices.length,
                "]"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: openAdd,
                "data-ocid": "add-device-btn",
                className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-medium hover:opacity-90 transition-smooth noc-glow",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                  "Add Device"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            DeviceFilters,
            {
              selectedTypes,
              selectedStatuses,
              onTypeToggle: handleTypeToggle,
              onStatusToggle: handleStatusToggle,
              onClearAll: handleClearAll
            }
          ),
          filteredDevices.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "flex flex-col items-center justify-center py-20 gap-4",
              "data-ocid": "empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-2xl glass-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCrash, { className: "w-6 h-6 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground", children: "No devices found" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 font-mono", children: "No devices match the current filter criteria" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: handleClearAll,
                    "data-ocid": "empty-state-clear",
                    className: "px-4 py-1.5 rounded-lg border border-border/60 text-xs font-mono text-muted-foreground hover:text-foreground hover:border-border transition-smooth",
                    children: "Clear Filters"
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(DeviceTable, { devices: filteredDevices, onEdit: openEdit })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddDeviceModal,
      {
        open: modalOpen,
        editDevice,
        onClose: closeModal
      }
    )
  ] });
}
export {
  Devices as default
};
