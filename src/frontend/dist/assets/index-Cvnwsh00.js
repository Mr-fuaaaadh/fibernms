const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/MapCanvas-CB9JucqO.js","assets/index-BhX-NLFL.js","assets/index-CupTrpYP.css","assets/leaflet-BTRAWF_c.js","assets/leaflet-Bvr-Ab8i.css","assets/TileLayer-Clb5XZyt.js","assets/index-wIYsNRKm.js","assets/trash-2-B7HpulIY.js","assets/refresh-ccw-Czogp52C.js","assets/index.esm-DGQtOVR-.js","assets/rotate-ccw-BB7z6NLd.js","assets/loader-circle-BmHEGPnb.js","assets/chevron-up-Crhg0lxx.js","assets/cable-Cpe5c1Yk.js","assets/dollar-sign-DssDwdn4.js","assets/eye-DZId2ECu.js","assets/eye-off-BHEebMee.js","assets/play-B9Fj6SyH.js","assets/download-D7u75BDX.js","assets/refresh-cw-CSaOG_fq.js","assets/sparkles-_ErhwPIU.js"])))=>i.map(i=>d[i]);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _client, _currentResult, _currentMutation, _mutateOptions, _MutationObserver_instances, updateResult_fn, notify_fn, _a;
import { aQ as Subscribable, aR as shallowEqualObjects, aS as hashKey, aT as getDefaultState, aU as notifyManager, aV as useQueryClient, r as reactExports, aW as noop, aX as shouldThrowError, c as createLucideIcon, aY as create, g as React, j as jsxRuntimeExports, A as AnimatePresence, m as motion, M as MapPin, X, ai as Zap, C as ChevronDown, d as Activity, U as Users, aZ as __vitePreload, N as Network } from "./index-BhX-NLFL.js";
import { P as PenLine, S as Signal } from "./leaflet-BTRAWF_c.js";
import { u as ue } from "./index-wIYsNRKm.js";
import { T as Trash2 } from "./trash-2-B7HpulIY.js";
import { R as RefreshCcw } from "./refresh-ccw-Czogp52C.js";
import { g as get, s as set, a as appendErrors, u as useForm } from "./index.esm-DGQtOVR-.js";
import { R as RotateCcw } from "./rotate-ccw-BB7z6NLd.js";
import { L as LoaderCircle } from "./loader-circle-BmHEGPnb.js";
import { C as ChevronUp } from "./chevron-up-Crhg0lxx.js";
import { C as Cable } from "./cable-Cpe5c1Yk.js";
import { D as DollarSign } from "./dollar-sign-DssDwdn4.js";
import { E as Eye } from "./eye-DZId2ECu.js";
import { E as EyeOff } from "./eye-off-BHEebMee.js";
import { P as Play } from "./play-B9Fj6SyH.js";
import { D as Download } from "./download-D7u75BDX.js";
import { R as RefreshCw } from "./refresh-cw-CSaOG_fq.js";
import { S as Sparkles } from "./sparkles-_ErhwPIU.js";
var MutationObserver = (_a = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _MutationObserver_instances);
    __privateAdd(this, _client);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentMutation);
    __privateAdd(this, _mutateOptions);
    __privateSet(this, _client, client);
    this.setOptions(options);
    this.bindMethods();
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
  }
  bindMethods() {
    this.mutate = this.mutate.bind(this);
    this.reset = this.reset.bind(this);
  }
  setOptions(options) {
    var _a2;
    const prevOptions = this.options;
    this.options = __privateGet(this, _client).defaultMutationOptions(options);
    if (!shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client).getMutationCache().notify({
        type: "observerOptionsUpdated",
        mutation: __privateGet(this, _currentMutation),
        observer: this
      });
    }
    if ((prevOptions == null ? void 0 : prevOptions.mutationKey) && this.options.mutationKey && hashKey(prevOptions.mutationKey) !== hashKey(this.options.mutationKey)) {
      this.reset();
    } else if (((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state.status) === "pending") {
      __privateGet(this, _currentMutation).setOptions(this.options);
    }
  }
  onUnsubscribe() {
    var _a2;
    if (!this.hasListeners()) {
      (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    }
  }
  onMutationUpdate(action) {
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this, action);
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  reset() {
    var _a2;
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, void 0);
    __privateMethod(this, _MutationObserver_instances, updateResult_fn).call(this);
    __privateMethod(this, _MutationObserver_instances, notify_fn).call(this);
  }
  mutate(variables, options) {
    var _a2;
    __privateSet(this, _mutateOptions, options);
    (_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.removeObserver(this);
    __privateSet(this, _currentMutation, __privateGet(this, _client).getMutationCache().build(__privateGet(this, _client), this.options));
    __privateGet(this, _currentMutation).addObserver(this);
    return __privateGet(this, _currentMutation).execute(variables);
  }
}, _client = new WeakMap(), _currentResult = new WeakMap(), _currentMutation = new WeakMap(), _mutateOptions = new WeakMap(), _MutationObserver_instances = new WeakSet(), updateResult_fn = function() {
  var _a2;
  const state = ((_a2 = __privateGet(this, _currentMutation)) == null ? void 0 : _a2.state) ?? getDefaultState();
  __privateSet(this, _currentResult, {
    ...state,
    isPending: state.status === "pending",
    isSuccess: state.status === "success",
    isError: state.status === "error",
    isIdle: state.status === "idle",
    mutate: this.mutate,
    reset: this.reset
  });
}, notify_fn = function(action) {
  notifyManager.batch(() => {
    var _a2, _b, _c, _d, _e, _f, _g, _h;
    if (__privateGet(this, _mutateOptions) && this.hasListeners()) {
      const variables = __privateGet(this, _currentResult).variables;
      const onMutateResult = __privateGet(this, _currentResult).context;
      const context = {
        client: __privateGet(this, _client),
        meta: this.options.meta,
        mutationKey: this.options.mutationKey
      };
      if ((action == null ? void 0 : action.type) === "success") {
        try {
          (_b = (_a2 = __privateGet(this, _mutateOptions)).onSuccess) == null ? void 0 : _b.call(
            _a2,
            action.data,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_d = (_c = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _d.call(
            _c,
            action.data,
            null,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      } else if ((action == null ? void 0 : action.type) === "error") {
        try {
          (_f = (_e = __privateGet(this, _mutateOptions)).onError) == null ? void 0 : _f.call(
            _e,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
        try {
          (_h = (_g = __privateGet(this, _mutateOptions)).onSettled) == null ? void 0 : _h.call(
            _g,
            void 0,
            action.error,
            variables,
            onMutateResult,
            context
          );
        } catch (e) {
          void Promise.reject(e);
        }
      }
    }
    this.listeners.forEach((listener) => {
      listener(__privateGet(this, _currentResult));
    });
  });
}, _a);
function useMutation(options, queryClient) {
  const client = useQueryClient();
  const [observer] = reactExports.useState(
    () => new MutationObserver(
      client,
      options
    )
  );
  reactExports.useEffect(() => {
    observer.setOptions(options);
  }, [observer, options]);
  const result = reactExports.useSyncExternalStore(
    reactExports.useCallback(
      (onStoreChange) => observer.subscribe(notifyManager.batchCalls(onStoreChange)),
      [observer]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  const mutate = reactExports.useCallback(
    (variables, mutateOptions) => {
      observer.mutate(variables, mutateOptions).catch(noop);
    },
    [observer]
  );
  if (result.error && shouldThrowError(observer.options.throwOnError, [result.error])) {
    throw result.error;
  }
  return { ...result, mutate, mutateAsync: result.mutate };
}
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 5v14", key: "s699le" }],
  ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
];
const ArrowDown = createLucideIcon("arrow-down", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "m21 3-7 7", key: "1l2asr" }],
  ["path", { d: "m3 21 7-7", key: "tjx5ai" }],
  ["path", { d: "M9 21H3v-6", key: "wtvkvv" }]
];
const Maximize2 = createLucideIcon("maximize-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3", key: "lubmu8" }],
  ["path", { d: "M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3", key: "1ag34g" }],
  ["line", { x1: "12", x2: "12", y1: "4", y2: "20", key: "1tx1rr" }]
];
const SquareSplitHorizontal = createLucideIcon("square-split-horizontal", __iconNode);
const initialState = {
  polygon: null,
  formValues: null,
  result: null,
  isLoading: false,
  error: null,
  drawingMode: "idle",
  animationPlayed: false,
  showNodes: true,
  showEdges: true,
  selectedNodeId: null
};
const useAutoDesignStore = create(
  (set2) => ({
    ...initialState,
    setPolygon: (polygon) => set2({ polygon }),
    setFormValues: (formValues) => set2({ formValues }),
    setResult: (result) => set2({ result }),
    setLoading: (isLoading) => set2({ isLoading }),
    setError: (error) => set2({ error }),
    setDrawingMode: (drawingMode) => set2({ drawingMode }),
    setAnimationPlayed: (animationPlayed) => set2({ animationPlayed }),
    setShowNodes: (showNodes) => set2({ showNodes }),
    setShowEdges: (showEdges) => set2({ showEdges }),
    setSelectedNodeId: (selectedNodeId) => set2({ selectedNodeId }),
    reset: () => set2({ ...initialState })
  })
);
const __vite_import_meta_env__ = {};
function haversineMeters(lat1, lng1, lat2, lng2) {
  const R = 6371e3;
  const toRad = (deg) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function calculatePolygonArea(polygon) {
  const ring = polygon.coordinates[0];
  if (!ring || ring.length < 3) return 0;
  const R = 6371;
  const toRad = (d) => d * Math.PI / 180;
  let area = 0;
  const n2 = ring.length;
  for (let i2 = 0; i2 < n2 - 1; i2++) {
    const [lng1, lat1] = ring[i2];
    const [lng2, lat2] = ring[i2 + 1];
    area += toRad(lng2 - lng1) * (2 + Math.sin(toRad(lat1)) + Math.sin(toRad(lat2)));
  }
  return Math.abs(area * R * R / 2);
}
function exportResultAsJson(result, formValues) {
  const payload = {
    exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
    parameters: formValues,
    result
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `network-design-${Date.now()}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}
function generateMockTopology(request) {
  const ring = request.polygon.coordinates[0];
  let minLng = Number.POSITIVE_INFINITY;
  let maxLng = Number.NEGATIVE_INFINITY;
  let minLat = Number.POSITIVE_INFINITY;
  let maxLat = Number.NEGATIVE_INFINITY;
  for (const [lng, lat] of ring) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }
  const centerLat = (minLat + maxLat) / 2;
  const centerLng = (minLng + maxLng) / 2;
  const lngSpan = maxLng - minLng;
  const latSpan = maxLat - minLat;
  const cap = request.splitter_capacity;
  const subCount = request.subscriber_count;
  const oltCount = Math.min(3, Math.ceil(subCount / (cap * 8)));
  const splCount = Math.ceil(subCount / cap);
  const nodes = [];
  const edges = [];
  for (let i2 = 0; i2 < oltCount; i2++) {
    const angle = i2 / oltCount * Math.PI * 2;
    const r2 = 0.05;
    nodes.push({
      id: `olt-${i2 + 1}`,
      name: `OLT Central-${i2 + 1}`,
      type: "OLT",
      lat: centerLat + Math.sin(angle) * latSpan * r2,
      lng: centerLng + Math.cos(angle) * lngSpan * r2,
      connectedCount: 0
    });
  }
  for (let i2 = 0; i2 < splCount; i2++) {
    const cols = Math.ceil(Math.sqrt(splCount));
    const rows = Math.ceil(splCount / cols);
    const col = i2 % cols;
    const row = Math.floor(i2 / cols);
    const tLng = minLng + (col + 0.5) / cols * lngSpan;
    const tLat = minLat + (row + 0.5) / rows * latSpan;
    const jLng = (Math.random() - 0.5) * lngSpan * 0.04;
    const jLat = (Math.random() - 0.5) * latSpan * 0.04;
    nodes.push({
      id: `spl-${i2 + 1}`,
      name: `Splitter Node-${i2 + 1}`,
      type: "SPLITTER",
      lat: tLat + jLat,
      lng: tLng + jLng,
      connectedCount: 0
    });
  }
  const splitterNodes = nodes.filter((n2) => n2.type === "SPLITTER");
  const subsPerSplitter = Math.ceil(subCount / Math.max(splCount, 1));
  let subIndex = 1;
  const subsBySplitter = /* @__PURE__ */ new Map();
  for (const spl of splitterNodes) {
    const subIds = [];
    const count = Math.min(subsPerSplitter, subCount - subIndex + 1);
    if (count <= 0) break;
    for (let k = 0; k < count; k++) {
      const id = `sub-${String(subIndex).padStart(3, "0")}`;
      const spreadLng = (Math.random() - 0.5) * lngSpan * 0.06;
      const spreadLat = (Math.random() - 0.5) * latSpan * 0.06;
      nodes.push({
        id,
        name: `Subscriber-${String(subIndex).padStart(3, "0")}`,
        type: "SUBSCRIBER",
        lat: spl.lat + spreadLat,
        lng: spl.lng + spreadLng,
        connectedCount: 1
      });
      subIds.push(id);
      subIndex++;
    }
    subsBySplitter.set(spl.id, subIds);
  }
  const oltNodes = nodes.filter((n2) => n2.type === "OLT");
  const splitterToOlt = /* @__PURE__ */ new Map();
  for (const spl of splitterNodes) {
    let nearestOlt = oltNodes[0];
    let minDist = Number.POSITIVE_INFINITY;
    for (const olt of oltNodes) {
      const d = haversineMeters(spl.lat, spl.lng, olt.lat, olt.lng);
      if (d < minDist) {
        minDist = d;
        nearestOlt = olt;
      }
    }
    splitterToOlt.set(spl.id, nearestOlt.id);
    const cableLength = haversineMeters(
      spl.lat,
      spl.lng,
      nearestOlt.lat,
      nearestOlt.lng
    );
    edges.push({
      id: `edge-${nearestOlt.id}-${spl.id}`,
      fromNodeId: nearestOlt.id,
      toNodeId: spl.id,
      cableLength,
      networkType: request.network_type
    });
  }
  for (const olt of oltNodes) {
    const connectedSplitters = splitterNodes.filter(
      (spl) => splitterToOlt.get(spl.id) === olt.id
    );
    const oltNode = nodes.find((n2) => n2.id === olt.id);
    if (oltNode) oltNode.connectedCount = connectedSplitters.length;
  }
  const allSubscribers = nodes.filter((n2) => n2.type === "SUBSCRIBER");
  for (const spl of splitterNodes) {
    const assignedSubs = subsBySplitter.get(spl.id) ?? [];
    let splConnectedCount = 0;
    for (const subId of assignedSubs) {
      const sub = allSubscribers.find((n2) => n2.id === subId);
      if (!sub) continue;
      const cableLength = haversineMeters(spl.lat, spl.lng, sub.lat, sub.lng);
      edges.push({
        id: `edge-${spl.id}-${subId}`,
        fromNodeId: spl.id,
        toNodeId: subId,
        cableLength,
        networkType: request.network_type
      });
      splConnectedCount++;
    }
    const splNode = nodes.find((n2) => n2.id === spl.id);
    if (splNode) splNode.connectedCount = splConnectedCount;
  }
  const totalCableLength = edges.reduce((sum, e) => sum + e.cableLength, 0);
  const costPerMeter = {
    FIBER: 0.5,
    COAXIAL: 0.3,
    LAN: 0.2
  };
  const estimatedCost = totalCableLength * costPerMeter[request.network_type] + oltCount * 5e3 + splCount * 500;
  return {
    nodes,
    edges,
    summary: {
      totalSubscribers: allSubscribers.length,
      totalSplitters: splCount,
      totalOLTs: oltCount,
      totalCableLength: Math.round(totalCableLength),
      estimatedCost: Math.round(estimatedCost)
    }
  };
}
const AUTO_DESIGN_PATH = "/api/network/auto-design/";
const viteEnv = __vite_import_meta_env__;
const apiBase = viteEnv.VITE_API_BASE_URL ?? "";
const isMockActive = !apiBase || apiBase.trim() === "" || apiBase === "/";
if (isMockActive) {
  const _originalFetch = globalThis.fetch.bind(globalThis);
  globalThis.fetch = async (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const method = ((init == null ? void 0 : init.method) ?? "GET").toUpperCase();
    if (method === "POST" && url.includes(AUTO_DESIGN_PATH)) {
      const delay = Math.random() * 1e3 + 2e3;
      await new Promise((res) => setTimeout(res, delay));
      let requestBody = null;
      try {
        requestBody = JSON.parse(init == null ? void 0 : init.body);
      } catch {
        return new Response(JSON.stringify({ detail: "Invalid JSON body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      if (!requestBody) {
        return new Response(JSON.stringify({ detail: "Empty request body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
      const result = generateMockTopology(requestBody);
      return new Response(JSON.stringify(result), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return _originalFetch(input, init);
  };
}
async function postJson(url, body) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    let message = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson.detail) message = errJson.detail;
    } catch {
    }
    throw new Error(message);
  }
  return response.json();
}
function useAutoDesign() {
  const store = useAutoDesignStore();
  const mutation = useMutation({
    mutationFn: (payload) => postJson(AUTO_DESIGN_PATH, payload),
    onMutate: () => {
      store.setLoading(true);
      store.setError(null);
    },
    onSuccess: (data) => {
      store.setResult(data);
      store.setLoading(false);
      store.setDrawingMode("done");
      store.setAnimationPlayed(false);
      ue.success("Network design generated successfully!");
    },
    onError: (error) => {
      const message = error.message ?? "Failed to generate network design";
      store.setError(message);
      store.setLoading(false);
      ue.error(`Network design failed: ${message}`, {
        action: {
          label: "Retry",
          onClick: () => {
            if (store.polygon && store.formValues) {
              generateNetwork({
                polygon: store.polygon,
                subscriber_count: store.formValues.subscriberCount,
                network_type: store.formValues.networkType,
                splitter_capacity: store.formValues.splitterCapacity,
                max_distance: store.formValues.maxDistance,
                manual_olt_placement: store.formValues.manualOltPlacement
              });
            }
          }
        }
      });
    }
  });
  function generateNetwork(request) {
    mutation.mutate(request);
  }
  return {
    generateNetwork,
    isGenerating: mutation.isPending,
    error: store.error,
    result: store.result,
    reset: store.reset
  };
}
function PolygonThumbnail({
  coordinates
}) {
  const size = 52;
  const ring = coordinates[0];
  if (!ring || ring.length < 2) return null;
  const lngs = ring.map(([lng]) => lng);
  const lats = ring.map(([, lat]) => lat);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const pad = 4;
  const toX = (lng) => pad + (lng - minLng) / (maxLng - minLng || 1) * (size - pad * 2);
  const toY = (lat) => size - pad - (lat - minLat) / (maxLat - minLat || 1) * (size - pad * 2);
  const pts = ring.slice(0, -1).map(([lng, lat]) => `${toX(lng)},${toY(lat)}`).join(" ");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
      role: "img",
      "aria-label": "Polygon area preview",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Polygon area preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polygon",
          {
            points: pts,
            fill: "rgba(59,130,246,0.25)",
            stroke: "#3b82f6",
            strokeWidth: "1.5",
            strokeLinejoin: "round"
          }
        )
      ]
    }
  );
}
const panelVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 420, damping: 32 }
  },
  exit: { opacity: 0, y: 8, scale: 0.97, transition: { duration: 0.15 } }
};
const btnBase = "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60";
const DrawControls = React.memo(function DrawControls2({
  onDrawStart,
  onCancel,
  onClear,
  onEditArea,
  onNewDesign
}) {
  const {
    polygon,
    result,
    drawingMode,
    setDrawingMode,
    setPolygon,
    setResult,
    reset
  } = useAutoDesignStore();
  const vertexCount = reactExports.useMemo(() => {
    if (!polygon) return 0;
    const ring = polygon.coordinates[0];
    return ring.length > 0 ? ring.length - 1 : 0;
  }, [polygon]);
  const areaKm2 = reactExports.useMemo(() => {
    if (!polygon) return 0;
    return calculatePolygonArea(polygon);
  }, [polygon]);
  function startDrawing() {
    setDrawingMode("drawing");
    onDrawStart == null ? void 0 : onDrawStart();
  }
  function cancelDrawing() {
    setDrawingMode(polygon ? "done" : "idle");
    onCancel == null ? void 0 : onCancel();
  }
  function clearArea() {
    setPolygon(null);
    setResult(null);
    setDrawingMode("idle");
    onClear == null ? void 0 : onClear();
  }
  function editArea() {
    setDrawingMode("editing");
    onEditArea == null ? void 0 : onEditArea();
  }
  function newDesign() {
    reset();
    onNewDesign == null ? void 0 : onNewDesign();
  }
  let panelKey = "idle";
  if (result) panelKey = "results";
  else if (drawingMode === "drawing") panelKey = "drawing";
  else if (drawingMode === "done" || drawingMode === "editing")
    panelKey = "done";
  const glass = "bg-gray-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl shadow-black/30 p-3 min-w-[200px] max-w-[240px]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-6 left-4 z-[1000] pointer-events-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
      panelKey === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: panelVariants,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          className: glass,
          "data-ocid": "draw-controls.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/50 mb-2 leading-snug", children: [
              "Click ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/70 font-medium", children: "Draw Area" }),
              " ",
              "then click on the map to define your planning zone."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.03 },
                whileTap: { scale: 0.97 },
                onClick: startDrawing,
                className: `${btnBase} w-full justify-center bg-blue-500 hover:bg-blue-400 text-white`,
                "data-ocid": "draw-controls.draw_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { size: 13 }),
                  "Draw Area"
                ]
              }
            )
          ]
        },
        "idle"
      ),
      panelKey === "drawing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: panelVariants,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          className: glass,
          "data-ocid": "draw-controls.drawing_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/70 font-medium", children: "Drawing…" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/50 mb-2 leading-snug", children: [
              "Click to add points.",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60", children: "Double-click to complete" }),
              " ",
              "(min 3 points)."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: polygon && vertexCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                className: "mb-2",
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 bg-blue-500/20 border border-blue-400/30 rounded-lg text-[11px] text-blue-300", children: [
                  vertexCount,
                  " ",
                  vertexCount === 1 ? "point" : "points"
                ] })
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.button,
              {
                whileHover: { scale: 1.03 },
                whileTap: { scale: 0.97 },
                onClick: cancelDrawing,
                className: `${btnBase} w-full justify-center bg-white/10 hover:bg-white/20 text-white/80`,
                "data-ocid": "draw-controls.cancel_button",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 13 }),
                  "Cancel"
                ]
              }
            )
          ]
        },
        "drawing"
      ),
      panelKey === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: panelVariants,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          className: glass,
          "data-ocid": "draw-controls.done_panel",
          children: [
            polygon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-white/5 border border-white/10 p-0.5 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PolygonThumbnail, { coordinates: polygon.coordinates }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-medium text-white/80", children: "Area defined" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/40", children: [
                  "~",
                  areaKm2 < 1 ? areaKm2.toFixed(3) : areaKm2.toFixed(1),
                  " km²"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[11px] text-white/40", children: [
                  vertexCount,
                  " vertices"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  onClick: editArea,
                  className: `${btnBase} flex-1 justify-center bg-white/10 hover:bg-white/20 text-white/70`,
                  "data-ocid": "draw-controls.edit_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 12 }),
                    "Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  onClick: clearArea,
                  className: `${btnBase} flex-1 justify-center bg-red-500/20 hover:bg-red-500/30 text-red-300`,
                  "data-ocid": "draw-controls.clear_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }),
                    "Clear"
                  ]
                }
              )
            ] })
          ]
        },
        "done"
      ),
      panelKey === "results" && result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          variants: panelVariants,
          initial: "hidden",
          animate: "visible",
          exit: "exit",
          className: glass,
          "data-ocid": "draw-controls.results_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-emerald-400 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-semibold text-white/80", children: "Design Generated" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-1 mb-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatChip,
                {
                  label: "Nodes",
                  value: result.nodes.length,
                  color: "text-blue-300"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatChip,
                {
                  label: "Edges",
                  value: result.edges.length,
                  color: "text-emerald-300"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatChip,
                {
                  label: "OLTs",
                  value: result.summary.totalOLTs,
                  color: "text-red-300"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                StatChip,
                {
                  label: "Splitters",
                  value: result.summary.totalSplitters,
                  color: "text-green-300"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  onClick: editArea,
                  className: `${btnBase} flex-1 justify-center bg-white/10 hover:bg-white/20 text-white/70`,
                  "data-ocid": "draw-controls.edit_area_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { size: 12 }),
                    "Edit Area"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.button,
                {
                  whileHover: { scale: 1.04 },
                  whileTap: { scale: 0.96 },
                  onClick: newDesign,
                  className: `${btnBase} flex-1 justify-center bg-blue-500/30 hover:bg-blue-500/50 text-blue-200`,
                  "data-ocid": "draw-controls.new_design_button",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { size: 12 }),
                    "New"
                  ]
                }
              )
            ] }),
            polygon && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/30 mt-2 text-center", children: [
              "~",
              areaKm2 < 1 ? areaKm2.toFixed(3) : areaKm2.toFixed(1),
              " km² coverage zone"
            ] })
          ]
        },
        "results"
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: drawingMode === "editing" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 6 },
        className: "mt-2 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/20 border border-amber-400/30 rounded-xl backdrop-blur-md",
        "data-ocid": "draw-controls.edit_badge",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 11, className: "text-amber-300" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-amber-200 font-medium", children: "Drag vertices to adjust area" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              whileHover: { scale: 1.05 },
              whileTap: { scale: 0.95 },
              onClick: () => setDrawingMode("done"),
              className: "ml-1 text-amber-300/60 hover:text-amber-200",
              "aria-label": "Finish editing",
              "data-ocid": "draw-controls.finish_edit_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 11 })
            }
          )
        ]
      },
      "edit-badge"
    ) })
  ] });
});
function StatChip({
  label,
  value,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col bg-white/5 rounded-xl px-2 py-1.5 border border-white/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-bold ${color}`, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/40", children: label })
  ] });
}
const s = (e, s2, o2) => {
  if (e && "reportValidity" in e) {
    const r2 = get(o2, s2);
    e.setCustomValidity(r2 && r2.message || ""), e.reportValidity();
  }
}, o = (t2, e) => {
  for (const o2 in e.fields) {
    const r2 = e.fields[o2];
    r2 && r2.ref && "reportValidity" in r2.ref ? s(r2.ref, o2, t2) : r2.refs && r2.refs.forEach((e2) => s(e2, o2, t2));
  }
}, r = (s2, r2) => {
  r2.shouldUseNativeValidation && o(s2, r2);
  const f = {};
  for (const o2 in s2) {
    const n2 = get(r2.fields, o2), a = Object.assign(s2[o2] || {}, { ref: n2 && n2.ref });
    if (i(r2.names || Object.keys(s2), o2)) {
      const s3 = Object.assign({}, get(f, o2));
      set(s3, "root", a), set(f, o2, s3);
    } else set(f, o2, a);
  }
  return f;
}, i = (t2, e) => t2.some((t3) => t3.startsWith(e + "."));
var n = function(r2, e) {
  for (var n2 = {}; r2.length; ) {
    var t2 = r2[0], s2 = t2.code, i2 = t2.message, a = t2.path.join(".");
    if (!n2[a]) if ("unionErrors" in t2) {
      var u = t2.unionErrors[0].errors[0];
      n2[a] = { message: u.message, type: u.code };
    } else n2[a] = { message: i2, type: s2 };
    if ("unionErrors" in t2 && t2.unionErrors.forEach(function(e2) {
      return e2.errors.forEach(function(e3) {
        return r2.push(e3);
      });
    }), e) {
      var c = n2[a].types, f = c && c[t2.code];
      n2[a] = appendErrors(a, e, n2, s2, f ? [].concat(f, t2.message) : t2.message);
    }
    r2.shift();
  }
  return n2;
}, t = function(o$1, t2, s2) {
  return void 0 === s2 && (s2 = {}), function(i2, a, u) {
    try {
      return Promise.resolve(function(e, n2) {
        try {
          var a2 = Promise.resolve(o$1["sync" === s2.mode ? "parse" : "parseAsync"](i2, t2)).then(function(e2) {
            return u.shouldUseNativeValidation && o({}, u), { errors: {}, values: s2.raw ? i2 : e2 };
          });
        } catch (r2) {
          return n2(r2);
        }
        return a2 && a2.then ? a2.then(void 0, n2) : a2;
      }(0, function(r$1) {
        if (function(r2) {
          return Array.isArray(null == r2 ? void 0 : r2.errors);
        }(r$1)) return { values: {}, errors: r(n(r$1.errors, !u.shouldUseNativeValidation && "all" === u.criteriaMode), u) };
        throw r$1;
      }));
    } catch (r2) {
      return Promise.reject(r2);
    }
  };
};
var util;
(function(util2) {
  util2.assertEqual = (_) => {
  };
  function assertIs(_arg) {
  }
  util2.assertIs = assertIs;
  function assertNever(_x) {
    throw new Error();
  }
  util2.assertNever = assertNever;
  util2.arrayToEnum = (items) => {
    const obj = {};
    for (const item of items) {
      obj[item] = item;
    }
    return obj;
  };
  util2.getValidEnumValues = (obj) => {
    const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
    const filtered = {};
    for (const k of validKeys) {
      filtered[k] = obj[k];
    }
    return util2.objectValues(filtered);
  };
  util2.objectValues = (obj) => {
    return util2.objectKeys(obj).map(function(e) {
      return obj[e];
    });
  };
  util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
    const keys = [];
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        keys.push(key);
      }
    }
    return keys;
  };
  util2.find = (arr, checker) => {
    for (const item of arr) {
      if (checker(item))
        return item;
    }
    return void 0;
  };
  util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
  function joinValues(array, separator = " | ") {
    return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
  }
  util2.joinValues = joinValues;
  util2.jsonStringifyReplacer = (_, value) => {
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  };
})(util || (util = {}));
var objectUtil;
(function(objectUtil2) {
  objectUtil2.mergeShapes = (first, second) => {
    return {
      ...first,
      ...second
      // second overwrites first
    };
  };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]);
const getParsedType = (data) => {
  const t2 = typeof data;
  switch (t2) {
    case "undefined":
      return ZodParsedType.undefined;
    case "string":
      return ZodParsedType.string;
    case "number":
      return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
    case "boolean":
      return ZodParsedType.boolean;
    case "function":
      return ZodParsedType.function;
    case "bigint":
      return ZodParsedType.bigint;
    case "symbol":
      return ZodParsedType.symbol;
    case "object":
      if (Array.isArray(data)) {
        return ZodParsedType.array;
      }
      if (data === null) {
        return ZodParsedType.null;
      }
      if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
        return ZodParsedType.promise;
      }
      if (typeof Map !== "undefined" && data instanceof Map) {
        return ZodParsedType.map;
      }
      if (typeof Set !== "undefined" && data instanceof Set) {
        return ZodParsedType.set;
      }
      if (typeof Date !== "undefined" && data instanceof Date) {
        return ZodParsedType.date;
      }
      return ZodParsedType.object;
    default:
      return ZodParsedType.unknown;
  }
};
const ZodIssueCode = util.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]);
class ZodError extends Error {
  get errors() {
    return this.issues;
  }
  constructor(issues) {
    super();
    this.issues = [];
    this.addIssue = (sub) => {
      this.issues = [...this.issues, sub];
    };
    this.addIssues = (subs = []) => {
      this.issues = [...this.issues, ...subs];
    };
    const actualProto = new.target.prototype;
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(this, actualProto);
    } else {
      this.__proto__ = actualProto;
    }
    this.name = "ZodError";
    this.issues = issues;
  }
  format(_mapper) {
    const mapper = _mapper || function(issue) {
      return issue.message;
    };
    const fieldErrors = { _errors: [] };
    const processError = (error) => {
      for (const issue of error.issues) {
        if (issue.code === "invalid_union") {
          issue.unionErrors.map(processError);
        } else if (issue.code === "invalid_return_type") {
          processError(issue.returnTypeError);
        } else if (issue.code === "invalid_arguments") {
          processError(issue.argumentsError);
        } else if (issue.path.length === 0) {
          fieldErrors._errors.push(mapper(issue));
        } else {
          let curr = fieldErrors;
          let i2 = 0;
          while (i2 < issue.path.length) {
            const el = issue.path[i2];
            const terminal = i2 === issue.path.length - 1;
            if (!terminal) {
              curr[el] = curr[el] || { _errors: [] };
            } else {
              curr[el] = curr[el] || { _errors: [] };
              curr[el]._errors.push(mapper(issue));
            }
            curr = curr[el];
            i2++;
          }
        }
      }
    };
    processError(this);
    return fieldErrors;
  }
  static assert(value) {
    if (!(value instanceof ZodError)) {
      throw new Error(`Not a ZodError: ${value}`);
    }
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(mapper = (issue) => issue.message) {
    const fieldErrors = {};
    const formErrors = [];
    for (const sub of this.issues) {
      if (sub.path.length > 0) {
        const firstEl = sub.path[0];
        fieldErrors[firstEl] = fieldErrors[firstEl] || [];
        fieldErrors[firstEl].push(mapper(sub));
      } else {
        formErrors.push(mapper(sub));
      }
    }
    return { formErrors, fieldErrors };
  }
  get formErrors() {
    return this.flatten();
  }
}
ZodError.create = (issues) => {
  const error = new ZodError(issues);
  return error;
};
const errorMap = (issue, _ctx) => {
  let message;
  switch (issue.code) {
    case ZodIssueCode.invalid_type:
      if (issue.received === ZodParsedType.undefined) {
        message = "Required";
      } else {
        message = `Expected ${issue.expected}, received ${issue.received}`;
      }
      break;
    case ZodIssueCode.invalid_literal:
      message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
      break;
    case ZodIssueCode.unrecognized_keys:
      message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
      break;
    case ZodIssueCode.invalid_union:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_union_discriminator:
      message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
      break;
    case ZodIssueCode.invalid_enum_value:
      message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
      break;
    case ZodIssueCode.invalid_arguments:
      message = `Invalid function arguments`;
      break;
    case ZodIssueCode.invalid_return_type:
      message = `Invalid function return type`;
      break;
    case ZodIssueCode.invalid_date:
      message = `Invalid date`;
      break;
    case ZodIssueCode.invalid_string:
      if (typeof issue.validation === "object") {
        if ("includes" in issue.validation) {
          message = `Invalid input: must include "${issue.validation.includes}"`;
          if (typeof issue.validation.position === "number") {
            message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
          }
        } else if ("startsWith" in issue.validation) {
          message = `Invalid input: must start with "${issue.validation.startsWith}"`;
        } else if ("endsWith" in issue.validation) {
          message = `Invalid input: must end with "${issue.validation.endsWith}"`;
        } else {
          util.assertNever(issue.validation);
        }
      } else if (issue.validation !== "regex") {
        message = `Invalid ${issue.validation}`;
      } else {
        message = "Invalid";
      }
      break;
    case ZodIssueCode.too_small:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "bigint")
        message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.too_big:
      if (issue.type === "array")
        message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
      else if (issue.type === "string")
        message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
      else if (issue.type === "number")
        message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "bigint")
        message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
      else if (issue.type === "date")
        message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
      else
        message = "Invalid input";
      break;
    case ZodIssueCode.custom:
      message = `Invalid input`;
      break;
    case ZodIssueCode.invalid_intersection_types:
      message = `Intersection results could not be merged`;
      break;
    case ZodIssueCode.not_multiple_of:
      message = `Number must be a multiple of ${issue.multipleOf}`;
      break;
    case ZodIssueCode.not_finite:
      message = "Number must be finite";
      break;
    default:
      message = _ctx.defaultError;
      util.assertNever(issue);
  }
  return { message };
};
let overrideErrorMap = errorMap;
function getErrorMap() {
  return overrideErrorMap;
}
const makeIssue = (params) => {
  const { data, path, errorMaps, issueData } = params;
  const fullPath = [...path, ...issueData.path || []];
  const fullIssue = {
    ...issueData,
    path: fullPath
  };
  if (issueData.message !== void 0) {
    return {
      ...issueData,
      path: fullPath,
      message: issueData.message
    };
  }
  let errorMessage = "";
  const maps = errorMaps.filter((m) => !!m).slice().reverse();
  for (const map of maps) {
    errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
  }
  return {
    ...issueData,
    path: fullPath,
    message: errorMessage
  };
};
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === errorMap ? void 0 : errorMap
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
class ParseStatus {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    if (this.value === "valid")
      this.value = "dirty";
  }
  abort() {
    if (this.value !== "aborted")
      this.value = "aborted";
  }
  static mergeArray(status, results) {
    const arrayValue = [];
    for (const s2 of results) {
      if (s2.status === "aborted")
        return INVALID;
      if (s2.status === "dirty")
        status.dirty();
      arrayValue.push(s2.value);
    }
    return { status: status.value, value: arrayValue };
  }
  static async mergeObjectAsync(status, pairs) {
    const syncPairs = [];
    for (const pair of pairs) {
      const key = await pair.key;
      const value = await pair.value;
      syncPairs.push({
        key,
        value
      });
    }
    return ParseStatus.mergeObjectSync(status, syncPairs);
  }
  static mergeObjectSync(status, pairs) {
    const finalObject = {};
    for (const pair of pairs) {
      const { key, value } = pair;
      if (key.status === "aborted")
        return INVALID;
      if (value.status === "aborted")
        return INVALID;
      if (key.status === "dirty")
        status.dirty();
      if (value.status === "dirty")
        status.dirty();
      if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
        finalObject[key.value] = value.value;
      }
    }
    return { status: status.value, value: finalObject };
  }
}
const INVALID = Object.freeze({
  status: "aborted"
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
var errorUtil;
(function(errorUtil2) {
  errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
  errorUtil2.toString = (message) => typeof message === "string" ? message : message == null ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));
class ParseInputLazyPath {
  constructor(parent, value, path, key) {
    this._cachedPath = [];
    this.parent = parent;
    this.data = value;
    this._path = path;
    this._key = key;
  }
  get path() {
    if (!this._cachedPath.length) {
      if (Array.isArray(this._key)) {
        this._cachedPath.push(...this._path, ...this._key);
      } else {
        this._cachedPath.push(...this._path, this._key);
      }
    }
    return this._cachedPath;
  }
}
const handleResult = (ctx, result) => {
  if (isValid(result)) {
    return { success: true, data: result.value };
  } else {
    if (!ctx.common.issues.length) {
      throw new Error("Validation failed but no issues detected.");
    }
    return {
      success: false,
      get error() {
        if (this._error)
          return this._error;
        const error = new ZodError(ctx.common.issues);
        this._error = error;
        return this._error;
      }
    };
  }
};
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
class ZodType {
  get description() {
    return this._def.description;
  }
  _getType(input) {
    return getParsedType(input.data);
  }
  _getOrReturnCtx(input, ctx) {
    return ctx || {
      common: input.parent.common,
      data: input.data,
      parsedType: getParsedType(input.data),
      schemaErrorMap: this._def.errorMap,
      path: input.path,
      parent: input.parent
    };
  }
  _processInputParams(input) {
    return {
      status: new ParseStatus(),
      ctx: {
        common: input.parent.common,
        data: input.data,
        parsedType: getParsedType(input.data),
        schemaErrorMap: this._def.errorMap,
        path: input.path,
        parent: input.parent
      }
    };
  }
  _parseSync(input) {
    const result = this._parse(input);
    if (isAsync(result)) {
      throw new Error("Synchronous parse encountered promise.");
    }
    return result;
  }
  _parseAsync(input) {
    const result = this._parse(input);
    return Promise.resolve(result);
  }
  parse(data, params) {
    const result = this.safeParse(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  safeParse(data, params) {
    const ctx = {
      common: {
        issues: [],
        async: (params == null ? void 0 : params.async) ?? false,
        contextualErrorMap: params == null ? void 0 : params.errorMap
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const result = this._parseSync({ data, path: ctx.path, parent: ctx });
    return handleResult(ctx, result);
  }
  "~validate"(data) {
    var _a2, _b;
    const ctx = {
      common: {
        issues: [],
        async: !!this["~standard"].async
      },
      path: [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    if (!this["~standard"].async) {
      try {
        const result = this._parseSync({ data, path: [], parent: ctx });
        return isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        };
      } catch (err) {
        if ((_b = (_a2 = err == null ? void 0 : err.message) == null ? void 0 : _a2.toLowerCase()) == null ? void 0 : _b.includes("encountered")) {
          this["~standard"].async = true;
        }
        ctx.common = {
          issues: [],
          async: true
        };
      }
    }
    return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
      value: result.value
    } : {
      issues: ctx.common.issues
    });
  }
  async parseAsync(data, params) {
    const result = await this.safeParseAsync(data, params);
    if (result.success)
      return result.data;
    throw result.error;
  }
  async safeParseAsync(data, params) {
    const ctx = {
      common: {
        issues: [],
        contextualErrorMap: params == null ? void 0 : params.errorMap,
        async: true
      },
      path: (params == null ? void 0 : params.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data,
      parsedType: getParsedType(data)
    };
    const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
    const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
    return handleResult(ctx, result);
  }
  refine(check, message) {
    const getIssueProperties = (val) => {
      if (typeof message === "string" || typeof message === "undefined") {
        return { message };
      } else if (typeof message === "function") {
        return message(val);
      } else {
        return message;
      }
    };
    return this._refinement((val, ctx) => {
      const result = check(val);
      const setError = () => ctx.addIssue({
        code: ZodIssueCode.custom,
        ...getIssueProperties(val)
      });
      if (typeof Promise !== "undefined" && result instanceof Promise) {
        return result.then((data) => {
          if (!data) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      if (!result) {
        setError();
        return false;
      } else {
        return true;
      }
    });
  }
  refinement(check, refinementData) {
    return this._refinement((val, ctx) => {
      if (!check(val)) {
        ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
        return false;
      } else {
        return true;
      }
    });
  }
  _refinement(refinement) {
    return new ZodEffects({
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "refinement", refinement }
    });
  }
  superRefine(refinement) {
    return this._refinement(refinement);
  }
  constructor(def) {
    this.spa = this.safeParseAsync;
    this._def = def;
    this.parse = this.parse.bind(this);
    this.safeParse = this.safeParse.bind(this);
    this.parseAsync = this.parseAsync.bind(this);
    this.safeParseAsync = this.safeParseAsync.bind(this);
    this.spa = this.spa.bind(this);
    this.refine = this.refine.bind(this);
    this.refinement = this.refinement.bind(this);
    this.superRefine = this.superRefine.bind(this);
    this.optional = this.optional.bind(this);
    this.nullable = this.nullable.bind(this);
    this.nullish = this.nullish.bind(this);
    this.array = this.array.bind(this);
    this.promise = this.promise.bind(this);
    this.or = this.or.bind(this);
    this.and = this.and.bind(this);
    this.transform = this.transform.bind(this);
    this.brand = this.brand.bind(this);
    this.default = this.default.bind(this);
    this.catch = this.catch.bind(this);
    this.describe = this.describe.bind(this);
    this.pipe = this.pipe.bind(this);
    this.readonly = this.readonly.bind(this);
    this.isNullable = this.isNullable.bind(this);
    this.isOptional = this.isOptional.bind(this);
    this["~standard"] = {
      version: 1,
      vendor: "zod",
      validate: (data) => this["~validate"](data)
    };
  }
  optional() {
    return ZodOptional.create(this, this._def);
  }
  nullable() {
    return ZodNullable.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return ZodArray.create(this);
  }
  promise() {
    return ZodPromise.create(this, this._def);
  }
  or(option) {
    return ZodUnion.create([this, option], this._def);
  }
  and(incoming) {
    return ZodIntersection.create(this, incoming, this._def);
  }
  transform(transform) {
    return new ZodEffects({
      ...processCreateParams(this._def),
      schema: this,
      typeName: ZodFirstPartyTypeKind.ZodEffects,
      effect: { type: "transform", transform }
    });
  }
  default(def) {
    const defaultValueFunc = typeof def === "function" ? def : () => def;
    return new ZodDefault({
      ...processCreateParams(this._def),
      innerType: this,
      defaultValue: defaultValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodDefault
    });
  }
  brand() {
    return new ZodBranded({
      typeName: ZodFirstPartyTypeKind.ZodBranded,
      type: this,
      ...processCreateParams(this._def)
    });
  }
  catch(def) {
    const catchValueFunc = typeof def === "function" ? def : () => def;
    return new ZodCatch({
      ...processCreateParams(this._def),
      innerType: this,
      catchValue: catchValueFunc,
      typeName: ZodFirstPartyTypeKind.ZodCatch
    });
  }
  describe(description) {
    const This = this.constructor;
    return new This({
      ...this._def,
      description
    });
  }
  pipe(target) {
    return ZodPipeline.create(this, target);
  }
  readonly() {
    return ZodReadonly.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
const ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
const base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt, alg) {
  if (!jwtRegex.test(jwt))
    return false;
  try {
    const [header] = jwt.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && (decoded == null ? void 0 : decoded.typ) !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
class ZodString extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = String(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.string) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.string,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.length < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.length > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "string",
            inclusive: true,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "length") {
        const tooBig = input.data.length > check.value;
        const tooSmall = input.data.length < check.value;
        if (tooBig || tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          if (tooBig) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          } else if (tooSmall) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: check.value,
              type: "string",
              inclusive: true,
              exact: true,
              message: check.message
            });
          }
          status.dirty();
        }
      } else if (check.kind === "email") {
        if (!emailRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "email",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "emoji") {
        if (!emojiRegex) {
          emojiRegex = new RegExp(_emojiRegex, "u");
        }
        if (!emojiRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "emoji",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "uuid") {
        if (!uuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "uuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "nanoid") {
        if (!nanoidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "nanoid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid") {
        if (!cuidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cuid2") {
        if (!cuid2Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cuid2",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ulid") {
        if (!ulidRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ulid",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "url") {
        try {
          new URL(input.data);
        } catch {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "regex") {
        check.regex.lastIndex = 0;
        const testResult = check.regex.test(input.data);
        if (!testResult) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "regex",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "trim") {
        input.data = input.data.trim();
      } else if (check.kind === "includes") {
        if (!input.data.includes(check.value, check.position)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { includes: check.value, position: check.position },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "toLowerCase") {
        input.data = input.data.toLowerCase();
      } else if (check.kind === "toUpperCase") {
        input.data = input.data.toUpperCase();
      } else if (check.kind === "startsWith") {
        if (!input.data.startsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { startsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "endsWith") {
        if (!input.data.endsWith(check.value)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: { endsWith: check.value },
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "datetime") {
        const regex = datetimeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "datetime",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "date") {
        const regex = dateRegex;
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "date",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "time") {
        const regex = timeRegex(check);
        if (!regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_string,
            validation: "time",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "duration") {
        if (!durationRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "duration",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "ip") {
        if (!isValidIP(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "ip",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "jwt") {
        if (!isValidJWT(input.data, check.alg)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "jwt",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "cidr") {
        if (!isValidCidr(input.data, check.version)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "cidr",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64") {
        if (!base64Regex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "base64url") {
        if (!base64urlRegex.test(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            validation: "base64url",
            code: ZodIssueCode.invalid_string,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _regex(regex, validation, message) {
    return this.refinement((data) => regex.test(data), {
      validation,
      code: ZodIssueCode.invalid_string,
      ...errorUtil.errToObj(message)
    });
  }
  _addCheck(check) {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  email(message) {
    return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
  }
  url(message) {
    return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
  }
  emoji(message) {
    return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
  }
  uuid(message) {
    return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
  }
  nanoid(message) {
    return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
  }
  cuid(message) {
    return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
  }
  cuid2(message) {
    return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
  }
  ulid(message) {
    return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
  }
  base64(message) {
    return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
  }
  base64url(message) {
    return this._addCheck({
      kind: "base64url",
      ...errorUtil.errToObj(message)
    });
  }
  jwt(options) {
    return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
  }
  ip(options) {
    return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
  }
  cidr(options) {
    return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
  }
  datetime(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "datetime",
        precision: null,
        offset: false,
        local: false,
        message: options
      });
    }
    return this._addCheck({
      kind: "datetime",
      precision: typeof (options == null ? void 0 : options.precision) === "undefined" ? null : options == null ? void 0 : options.precision,
      offset: (options == null ? void 0 : options.offset) ?? false,
      local: (options == null ? void 0 : options.local) ?? false,
      ...errorUtil.errToObj(options == null ? void 0 : options.message)
    });
  }
  date(message) {
    return this._addCheck({ kind: "date", message });
  }
  time(options) {
    if (typeof options === "string") {
      return this._addCheck({
        kind: "time",
        precision: null,
        message: options
      });
    }
    return this._addCheck({
      kind: "time",
      precision: typeof (options == null ? void 0 : options.precision) === "undefined" ? null : options == null ? void 0 : options.precision,
      ...errorUtil.errToObj(options == null ? void 0 : options.message)
    });
  }
  duration(message) {
    return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
  }
  regex(regex, message) {
    return this._addCheck({
      kind: "regex",
      regex,
      ...errorUtil.errToObj(message)
    });
  }
  includes(value, options) {
    return this._addCheck({
      kind: "includes",
      value,
      position: options == null ? void 0 : options.position,
      ...errorUtil.errToObj(options == null ? void 0 : options.message)
    });
  }
  startsWith(value, message) {
    return this._addCheck({
      kind: "startsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  endsWith(value, message) {
    return this._addCheck({
      kind: "endsWith",
      value,
      ...errorUtil.errToObj(message)
    });
  }
  min(minLength, message) {
    return this._addCheck({
      kind: "min",
      value: minLength,
      ...errorUtil.errToObj(message)
    });
  }
  max(maxLength, message) {
    return this._addCheck({
      kind: "max",
      value: maxLength,
      ...errorUtil.errToObj(message)
    });
  }
  length(len, message) {
    return this._addCheck({
      kind: "length",
      value: len,
      ...errorUtil.errToObj(message)
    });
  }
  /**
   * Equivalent to `.min(1)`
   */
  nonempty(message) {
    return this.min(1, errorUtil.errToObj(message));
  }
  trim() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new ZodString({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((ch) => ch.kind === "datetime");
  }
  get isDate() {
    return !!this._def.checks.find((ch) => ch.kind === "date");
  }
  get isTime() {
    return !!this._def.checks.find((ch) => ch.kind === "time");
  }
  get isDuration() {
    return !!this._def.checks.find((ch) => ch.kind === "duration");
  }
  get isEmail() {
    return !!this._def.checks.find((ch) => ch.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((ch) => ch.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((ch) => ch.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((ch) => ch.kind === "uuid");
  }
  get isNANOID() {
    return !!this._def.checks.find((ch) => ch.kind === "nanoid");
  }
  get isCUID() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((ch) => ch.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((ch) => ch.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((ch) => ch.kind === "ip");
  }
  get isCIDR() {
    return !!this._def.checks.find((ch) => ch.kind === "cidr");
  }
  get isBase64() {
    return !!this._def.checks.find((ch) => ch.kind === "base64");
  }
  get isBase64url() {
    return !!this._def.checks.find((ch) => ch.kind === "base64url");
  }
  get minLength() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxLength() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodString.create = (params) => {
  return new ZodString({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodString,
    coerce: (params == null ? void 0 : params.coerce) ?? false,
    ...processCreateParams(params)
  });
};
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
class ZodNumber extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
    this.step = this.multipleOf;
  }
  _parse(input) {
    if (this._def.coerce) {
      input.data = Number(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.number) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.number,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "int") {
        if (!util.isInteger(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: "integer",
            received: "float",
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: check.value,
            type: "number",
            inclusive: check.inclusive,
            exact: false,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (floatSafeRemainder(input.data, check.value) !== 0) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "finite") {
        if (!Number.isFinite(input.data)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_finite,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodNumber({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodNumber({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  int(message) {
    return this._addCheck({
      kind: "int",
      message: errorUtil.toString(message)
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  finite(message) {
    return this._addCheck({
      kind: "finite",
      message: errorUtil.toString(message)
    });
  }
  safe(message) {
    return this._addCheck({
      kind: "min",
      inclusive: true,
      value: Number.MIN_SAFE_INTEGER,
      message: errorUtil.toString(message)
    })._addCheck({
      kind: "max",
      inclusive: true,
      value: Number.MAX_SAFE_INTEGER,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
  get isInt() {
    return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
  }
  get isFinite() {
    let max = null;
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
        return true;
      } else if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      } else if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return Number.isFinite(min) && Number.isFinite(max);
  }
}
ZodNumber.create = (params) => {
  return new ZodNumber({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodNumber,
    coerce: (params == null ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
class ZodBigInt extends ZodType {
  constructor() {
    super(...arguments);
    this.min = this.gte;
    this.max = this.lte;
  }
  _parse(input) {
    if (this._def.coerce) {
      try {
        input.data = BigInt(input.data);
      } catch {
        return this._getInvalidInput(input);
      }
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.bigint) {
      return this._getInvalidInput(input);
    }
    let ctx = void 0;
    const status = new ParseStatus();
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
        if (tooSmall) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            type: "bigint",
            minimum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
        if (tooBig) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            type: "bigint",
            maximum: check.value,
            inclusive: check.inclusive,
            message: check.message
          });
          status.dirty();
        }
      } else if (check.kind === "multipleOf") {
        if (input.data % check.value !== BigInt(0)) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.not_multiple_of,
            multipleOf: check.value,
            message: check.message
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return { status: status.value, value: input.data };
  }
  _getInvalidInput(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.bigint,
      received: ctx.parsedType
    });
    return INVALID;
  }
  gte(value, message) {
    return this.setLimit("min", value, true, errorUtil.toString(message));
  }
  gt(value, message) {
    return this.setLimit("min", value, false, errorUtil.toString(message));
  }
  lte(value, message) {
    return this.setLimit("max", value, true, errorUtil.toString(message));
  }
  lt(value, message) {
    return this.setLimit("max", value, false, errorUtil.toString(message));
  }
  setLimit(kind, value, inclusive, message) {
    return new ZodBigInt({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind,
          value,
          inclusive,
          message: errorUtil.toString(message)
        }
      ]
    });
  }
  _addCheck(check) {
    return new ZodBigInt({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  positive(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  negative(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: false,
      message: errorUtil.toString(message)
    });
  }
  nonpositive(message) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  nonnegative(message) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: true,
      message: errorUtil.toString(message)
    });
  }
  multipleOf(value, message) {
    return this._addCheck({
      kind: "multipleOf",
      value,
      message: errorUtil.toString(message)
    });
  }
  get minValue() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min;
  }
  get maxValue() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max;
  }
}
ZodBigInt.create = (params) => {
  return new ZodBigInt({
    checks: [],
    typeName: ZodFirstPartyTypeKind.ZodBigInt,
    coerce: (params == null ? void 0 : params.coerce) ?? false,
    ...processCreateParams(params)
  });
};
class ZodBoolean extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = Boolean(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.boolean) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.boolean,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodBoolean.create = (params) => {
  return new ZodBoolean({
    typeName: ZodFirstPartyTypeKind.ZodBoolean,
    coerce: (params == null ? void 0 : params.coerce) || false,
    ...processCreateParams(params)
  });
};
class ZodDate extends ZodType {
  _parse(input) {
    if (this._def.coerce) {
      input.data = new Date(input.data);
    }
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.date) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.date,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    if (Number.isNaN(input.data.getTime())) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_date
      });
      return INVALID;
    }
    const status = new ParseStatus();
    let ctx = void 0;
    for (const check of this._def.checks) {
      if (check.kind === "min") {
        if (input.data.getTime() < check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            message: check.message,
            inclusive: true,
            exact: false,
            minimum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else if (check.kind === "max") {
        if (input.data.getTime() > check.value) {
          ctx = this._getOrReturnCtx(input, ctx);
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            message: check.message,
            inclusive: true,
            exact: false,
            maximum: check.value,
            type: "date"
          });
          status.dirty();
        }
      } else {
        util.assertNever(check);
      }
    }
    return {
      status: status.value,
      value: new Date(input.data.getTime())
    };
  }
  _addCheck(check) {
    return new ZodDate({
      ...this._def,
      checks: [...this._def.checks, check]
    });
  }
  min(minDate, message) {
    return this._addCheck({
      kind: "min",
      value: minDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  max(maxDate, message) {
    return this._addCheck({
      kind: "max",
      value: maxDate.getTime(),
      message: errorUtil.toString(message)
    });
  }
  get minDate() {
    let min = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "min") {
        if (min === null || ch.value > min)
          min = ch.value;
      }
    }
    return min != null ? new Date(min) : null;
  }
  get maxDate() {
    let max = null;
    for (const ch of this._def.checks) {
      if (ch.kind === "max") {
        if (max === null || ch.value < max)
          max = ch.value;
      }
    }
    return max != null ? new Date(max) : null;
  }
}
ZodDate.create = (params) => {
  return new ZodDate({
    checks: [],
    coerce: (params == null ? void 0 : params.coerce) || false,
    typeName: ZodFirstPartyTypeKind.ZodDate,
    ...processCreateParams(params)
  });
};
class ZodSymbol extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.symbol) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.symbol,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodSymbol.create = (params) => {
  return new ZodSymbol({
    typeName: ZodFirstPartyTypeKind.ZodSymbol,
    ...processCreateParams(params)
  });
};
class ZodUndefined extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.undefined,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodUndefined.create = (params) => {
  return new ZodUndefined({
    typeName: ZodFirstPartyTypeKind.ZodUndefined,
    ...processCreateParams(params)
  });
};
class ZodNull extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.null) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.null,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodNull.create = (params) => {
  return new ZodNull({
    typeName: ZodFirstPartyTypeKind.ZodNull,
    ...processCreateParams(params)
  });
};
class ZodAny extends ZodType {
  constructor() {
    super(...arguments);
    this._any = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodAny.create = (params) => {
  return new ZodAny({
    typeName: ZodFirstPartyTypeKind.ZodAny,
    ...processCreateParams(params)
  });
};
class ZodUnknown extends ZodType {
  constructor() {
    super(...arguments);
    this._unknown = true;
  }
  _parse(input) {
    return OK(input.data);
  }
}
ZodUnknown.create = (params) => {
  return new ZodUnknown({
    typeName: ZodFirstPartyTypeKind.ZodUnknown,
    ...processCreateParams(params)
  });
};
class ZodNever extends ZodType {
  _parse(input) {
    const ctx = this._getOrReturnCtx(input);
    addIssueToContext(ctx, {
      code: ZodIssueCode.invalid_type,
      expected: ZodParsedType.never,
      received: ctx.parsedType
    });
    return INVALID;
  }
}
ZodNever.create = (params) => {
  return new ZodNever({
    typeName: ZodFirstPartyTypeKind.ZodNever,
    ...processCreateParams(params)
  });
};
class ZodVoid extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.undefined) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.void,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return OK(input.data);
  }
}
ZodVoid.create = (params) => {
  return new ZodVoid({
    typeName: ZodFirstPartyTypeKind.ZodVoid,
    ...processCreateParams(params)
  });
};
class ZodArray extends ZodType {
  _parse(input) {
    const { ctx, status } = this._processInputParams(input);
    const def = this._def;
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (def.exactLength !== null) {
      const tooBig = ctx.data.length > def.exactLength.value;
      const tooSmall = ctx.data.length < def.exactLength.value;
      if (tooBig || tooSmall) {
        addIssueToContext(ctx, {
          code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
          minimum: tooSmall ? def.exactLength.value : void 0,
          maximum: tooBig ? def.exactLength.value : void 0,
          type: "array",
          inclusive: true,
          exact: true,
          message: def.exactLength.message
        });
        status.dirty();
      }
    }
    if (def.minLength !== null) {
      if (ctx.data.length < def.minLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.minLength.message
        });
        status.dirty();
      }
    }
    if (def.maxLength !== null) {
      if (ctx.data.length > def.maxLength.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxLength.value,
          type: "array",
          inclusive: true,
          exact: false,
          message: def.maxLength.message
        });
        status.dirty();
      }
    }
    if (ctx.common.async) {
      return Promise.all([...ctx.data].map((item, i2) => {
        return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
      })).then((result2) => {
        return ParseStatus.mergeArray(status, result2);
      });
    }
    const result = [...ctx.data].map((item, i2) => {
      return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i2));
    });
    return ParseStatus.mergeArray(status, result);
  }
  get element() {
    return this._def.type;
  }
  min(minLength, message) {
    return new ZodArray({
      ...this._def,
      minLength: { value: minLength, message: errorUtil.toString(message) }
    });
  }
  max(maxLength, message) {
    return new ZodArray({
      ...this._def,
      maxLength: { value: maxLength, message: errorUtil.toString(message) }
    });
  }
  length(len, message) {
    return new ZodArray({
      ...this._def,
      exactLength: { value: len, message: errorUtil.toString(message) }
    });
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodArray.create = (schema, params) => {
  return new ZodArray({
    type: schema,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: ZodFirstPartyTypeKind.ZodArray,
    ...processCreateParams(params)
  });
};
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
class ZodObject extends ZodType {
  constructor() {
    super(...arguments);
    this._cached = null;
    this.nonstrict = this.passthrough;
    this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const shape = this._def.shape();
    const keys = util.objectKeys(shape);
    this._cached = { shape, keys };
    return this._cached;
  }
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.object) {
      const ctx2 = this._getOrReturnCtx(input);
      addIssueToContext(ctx2, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.object,
        received: ctx2.parsedType
      });
      return INVALID;
    }
    const { status, ctx } = this._processInputParams(input);
    const { shape, keys: shapeKeys } = this._getCached();
    const extraKeys = [];
    if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
      for (const key in ctx.data) {
        if (!shapeKeys.includes(key)) {
          extraKeys.push(key);
        }
      }
    }
    const pairs = [];
    for (const key of shapeKeys) {
      const keyValidator = shape[key];
      const value = ctx.data[key];
      pairs.push({
        key: { status: "valid", value: key },
        value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
        alwaysSet: key in ctx.data
      });
    }
    if (this._def.catchall instanceof ZodNever) {
      const unknownKeys = this._def.unknownKeys;
      if (unknownKeys === "passthrough") {
        for (const key of extraKeys) {
          pairs.push({
            key: { status: "valid", value: key },
            value: { status: "valid", value: ctx.data[key] }
          });
        }
      } else if (unknownKeys === "strict") {
        if (extraKeys.length > 0) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.unrecognized_keys,
            keys: extraKeys
          });
          status.dirty();
        }
      } else if (unknownKeys === "strip") ;
      else {
        throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
      }
    } else {
      const catchall = this._def.catchall;
      for (const key of extraKeys) {
        const value = ctx.data[key];
        pairs.push({
          key: { status: "valid", value: key },
          value: catchall._parse(
            new ParseInputLazyPath(ctx, value, ctx.path, key)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: key in ctx.data
        });
      }
    }
    if (ctx.common.async) {
      return Promise.resolve().then(async () => {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value,
            alwaysSet: pair.alwaysSet
          });
        }
        return syncPairs;
      }).then((syncPairs) => {
        return ParseStatus.mergeObjectSync(status, syncPairs);
      });
    } else {
      return ParseStatus.mergeObjectSync(status, pairs);
    }
  }
  get shape() {
    return this._def.shape();
  }
  strict(message) {
    errorUtil.errToObj;
    return new ZodObject({
      ...this._def,
      unknownKeys: "strict",
      ...message !== void 0 ? {
        errorMap: (issue, ctx) => {
          var _a2, _b;
          const defaultError = ((_b = (_a2 = this._def).errorMap) == null ? void 0 : _b.call(_a2, issue, ctx).message) ?? ctx.defaultError;
          if (issue.code === "unrecognized_keys")
            return {
              message: errorUtil.errToObj(message).message ?? defaultError
            };
          return {
            message: defaultError
          };
        }
      } : {}
    });
  }
  strip() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new ZodObject({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(augmentation) {
    return new ZodObject({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...augmentation
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(merging) {
    const merged = new ZodObject({
      unknownKeys: merging._def.unknownKeys,
      catchall: merging._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...merging._def.shape()
      }),
      typeName: ZodFirstPartyTypeKind.ZodObject
    });
    return merged;
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(key, schema) {
    return this.augment({ [key]: schema });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(index2) {
    return new ZodObject({
      ...this._def,
      catchall: index2
    });
  }
  pick(mask) {
    const shape = {};
    for (const key of util.objectKeys(mask)) {
      if (mask[key] && this.shape[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  omit(mask) {
    const shape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (!mask[key]) {
        shape[key] = this.shape[key];
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => shape
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return deepPartialify(this);
  }
  partial(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      const fieldSchema = this.shape[key];
      if (mask && !mask[key]) {
        newShape[key] = fieldSchema;
      } else {
        newShape[key] = fieldSchema.optional();
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  required(mask) {
    const newShape = {};
    for (const key of util.objectKeys(this.shape)) {
      if (mask && !mask[key]) {
        newShape[key] = this.shape[key];
      } else {
        const fieldSchema = this.shape[key];
        let newField = fieldSchema;
        while (newField instanceof ZodOptional) {
          newField = newField._def.innerType;
        }
        newShape[key] = newField;
      }
    }
    return new ZodObject({
      ...this._def,
      shape: () => newShape
    });
  }
  keyof() {
    return createZodEnum(util.objectKeys(this.shape));
  }
}
ZodObject.create = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.strictCreate = (shape, params) => {
  return new ZodObject({
    shape: () => shape,
    unknownKeys: "strict",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
ZodObject.lazycreate = (shape, params) => {
  return new ZodObject({
    shape,
    unknownKeys: "strip",
    catchall: ZodNever.create(),
    typeName: ZodFirstPartyTypeKind.ZodObject,
    ...processCreateParams(params)
  });
};
class ZodUnion extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const options = this._def.options;
    function handleResults(results) {
      for (const result of results) {
        if (result.result.status === "valid") {
          return result.result;
        }
      }
      for (const result of results) {
        if (result.result.status === "dirty") {
          ctx.common.issues.push(...result.ctx.common.issues);
          return result.result;
        }
      }
      const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
    if (ctx.common.async) {
      return Promise.all(options.map(async (option) => {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: childCtx
          }),
          ctx: childCtx
        };
      })).then(handleResults);
    } else {
      let dirty = void 0;
      const issues = [];
      for (const option of options) {
        const childCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          },
          parent: null
        };
        const result = option._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: childCtx
        });
        if (result.status === "valid") {
          return result;
        } else if (result.status === "dirty" && !dirty) {
          dirty = { result, ctx: childCtx };
        }
        if (childCtx.common.issues.length) {
          issues.push(childCtx.common.issues);
        }
      }
      if (dirty) {
        ctx.common.issues.push(...dirty.ctx.common.issues);
        return dirty.result;
      }
      const unionErrors = issues.map((issues2) => new ZodError(issues2));
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_union,
        unionErrors
      });
      return INVALID;
    }
  }
  get options() {
    return this._def.options;
  }
}
ZodUnion.create = (types, params) => {
  return new ZodUnion({
    options: types,
    typeName: ZodFirstPartyTypeKind.ZodUnion,
    ...processCreateParams(params)
  });
};
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index2 = 0; index2 < a.length; index2++) {
      const itemA = a[index2];
      const itemB = b[index2];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
class ZodIntersection extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const handleParsed = (parsedLeft, parsedRight) => {
      if (isAborted(parsedLeft) || isAborted(parsedRight)) {
        return INVALID;
      }
      const merged = mergeValues(parsedLeft.value, parsedRight.value);
      if (!merged.valid) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_intersection_types
        });
        return INVALID;
      }
      if (isDirty(parsedLeft) || isDirty(parsedRight)) {
        status.dirty();
      }
      return { status: status.value, value: merged.data };
    };
    if (ctx.common.async) {
      return Promise.all([
        this._def.left._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        }),
        this._def.right._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        })
      ]).then(([left, right]) => handleParsed(left, right));
    } else {
      return handleParsed(this._def.left._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }), this._def.right._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      }));
    }
  }
}
ZodIntersection.create = (left, right, params) => {
  return new ZodIntersection({
    left,
    right,
    typeName: ZodFirstPartyTypeKind.ZodIntersection,
    ...processCreateParams(params)
  });
};
class ZodTuple extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.array) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.array,
        received: ctx.parsedType
      });
      return INVALID;
    }
    if (ctx.data.length < this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_small,
        minimum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      return INVALID;
    }
    const rest = this._def.rest;
    if (!rest && ctx.data.length > this._def.items.length) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.too_big,
        maximum: this._def.items.length,
        inclusive: true,
        exact: false,
        type: "array"
      });
      status.dirty();
    }
    const items = [...ctx.data].map((item, itemIndex) => {
      const schema = this._def.items[itemIndex] || this._def.rest;
      if (!schema)
        return null;
      return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
    }).filter((x) => !!x);
    if (ctx.common.async) {
      return Promise.all(items).then((results) => {
        return ParseStatus.mergeArray(status, results);
      });
    } else {
      return ParseStatus.mergeArray(status, items);
    }
  }
  get items() {
    return this._def.items;
  }
  rest(rest) {
    return new ZodTuple({
      ...this._def,
      rest
    });
  }
}
ZodTuple.create = (schemas, params) => {
  if (!Array.isArray(schemas)) {
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  }
  return new ZodTuple({
    items: schemas,
    typeName: ZodFirstPartyTypeKind.ZodTuple,
    rest: null,
    ...processCreateParams(params)
  });
};
class ZodMap extends ZodType {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.map) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.map,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const keyType = this._def.keyType;
    const valueType = this._def.valueType;
    const pairs = [...ctx.data.entries()].map(([key, value], index2) => {
      return {
        key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index2, "key"])),
        value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index2, "value"]))
      };
    });
    if (ctx.common.async) {
      const finalMap = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          if (key.status === "aborted" || value.status === "aborted") {
            return INVALID;
          }
          if (key.status === "dirty" || value.status === "dirty") {
            status.dirty();
          }
          finalMap.set(key.value, value.value);
        }
        return { status: status.value, value: finalMap };
      });
    } else {
      const finalMap = /* @__PURE__ */ new Map();
      for (const pair of pairs) {
        const key = pair.key;
        const value = pair.value;
        if (key.status === "aborted" || value.status === "aborted") {
          return INVALID;
        }
        if (key.status === "dirty" || value.status === "dirty") {
          status.dirty();
        }
        finalMap.set(key.value, value.value);
      }
      return { status: status.value, value: finalMap };
    }
  }
}
ZodMap.create = (keyType, valueType, params) => {
  return new ZodMap({
    valueType,
    keyType,
    typeName: ZodFirstPartyTypeKind.ZodMap,
    ...processCreateParams(params)
  });
};
class ZodSet extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.set) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.set,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const def = this._def;
    if (def.minSize !== null) {
      if (ctx.data.size < def.minSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_small,
          minimum: def.minSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.minSize.message
        });
        status.dirty();
      }
    }
    if (def.maxSize !== null) {
      if (ctx.data.size > def.maxSize.value) {
        addIssueToContext(ctx, {
          code: ZodIssueCode.too_big,
          maximum: def.maxSize.value,
          type: "set",
          inclusive: true,
          exact: false,
          message: def.maxSize.message
        });
        status.dirty();
      }
    }
    const valueType = this._def.valueType;
    function finalizeSet(elements2) {
      const parsedSet = /* @__PURE__ */ new Set();
      for (const element of elements2) {
        if (element.status === "aborted")
          return INVALID;
        if (element.status === "dirty")
          status.dirty();
        parsedSet.add(element.value);
      }
      return { status: status.value, value: parsedSet };
    }
    const elements = [...ctx.data.values()].map((item, i2) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i2)));
    if (ctx.common.async) {
      return Promise.all(elements).then((elements2) => finalizeSet(elements2));
    } else {
      return finalizeSet(elements);
    }
  }
  min(minSize, message) {
    return new ZodSet({
      ...this._def,
      minSize: { value: minSize, message: errorUtil.toString(message) }
    });
  }
  max(maxSize, message) {
    return new ZodSet({
      ...this._def,
      maxSize: { value: maxSize, message: errorUtil.toString(message) }
    });
  }
  size(size, message) {
    return this.min(size, message).max(size, message);
  }
  nonempty(message) {
    return this.min(1, message);
  }
}
ZodSet.create = (valueType, params) => {
  return new ZodSet({
    valueType,
    minSize: null,
    maxSize: null,
    typeName: ZodFirstPartyTypeKind.ZodSet,
    ...processCreateParams(params)
  });
};
class ZodLazy extends ZodType {
  get schema() {
    return this._def.getter();
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const lazySchema = this._def.getter();
    return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
  }
}
ZodLazy.create = (getter, params) => {
  return new ZodLazy({
    getter,
    typeName: ZodFirstPartyTypeKind.ZodLazy,
    ...processCreateParams(params)
  });
};
class ZodLiteral extends ZodType {
  _parse(input) {
    if (input.data !== this._def.value) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_literal,
        expected: this._def.value
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
  get value() {
    return this._def.value;
  }
}
ZodLiteral.create = (value, params) => {
  return new ZodLiteral({
    value,
    typeName: ZodFirstPartyTypeKind.ZodLiteral,
    ...processCreateParams(params)
  });
};
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
class ZodEnum extends ZodType {
  _parse(input) {
    if (typeof input.data !== "string") {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(this._def.values);
    }
    if (!this._cache.has(input.data)) {
      const ctx = this._getOrReturnCtx(input);
      const expectedValues = this._def.values;
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Values() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  get Enum() {
    const enumValues = {};
    for (const val of this._def.values) {
      enumValues[val] = val;
    }
    return enumValues;
  }
  extract(values, newDef = this._def) {
    return ZodEnum.create(values, {
      ...this._def,
      ...newDef
    });
  }
  exclude(values, newDef = this._def) {
    return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
      ...this._def,
      ...newDef
    });
  }
}
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
  _parse(input) {
    const nativeEnumValues = util.getValidEnumValues(this._def.values);
    const ctx = this._getOrReturnCtx(input);
    if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        expected: util.joinValues(expectedValues),
        received: ctx.parsedType,
        code: ZodIssueCode.invalid_type
      });
      return INVALID;
    }
    if (!this._cache) {
      this._cache = new Set(util.getValidEnumValues(this._def.values));
    }
    if (!this._cache.has(input.data)) {
      const expectedValues = util.objectValues(nativeEnumValues);
      addIssueToContext(ctx, {
        received: ctx.data,
        code: ZodIssueCode.invalid_enum_value,
        options: expectedValues
      });
      return INVALID;
    }
    return OK(input.data);
  }
  get enum() {
    return this._def.values;
  }
}
ZodNativeEnum.create = (values, params) => {
  return new ZodNativeEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
    ...processCreateParams(params)
  });
};
class ZodPromise extends ZodType {
  unwrap() {
    return this._def.type;
  }
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.promise,
        received: ctx.parsedType
      });
      return INVALID;
    }
    const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
    return OK(promisified.then((data) => {
      return this._def.type.parseAsync(data, {
        path: ctx.path,
        errorMap: ctx.common.contextualErrorMap
      });
    }));
  }
}
ZodPromise.create = (schema, params) => {
  return new ZodPromise({
    type: schema,
    typeName: ZodFirstPartyTypeKind.ZodPromise,
    ...processCreateParams(params)
  });
};
class ZodEffects extends ZodType {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    const effect = this._def.effect || null;
    const checkCtx = {
      addIssue: (arg) => {
        addIssueToContext(ctx, arg);
        if (arg.fatal) {
          status.abort();
        } else {
          status.dirty();
        }
      },
      get path() {
        return ctx.path;
      }
    };
    checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
    if (effect.type === "preprocess") {
      const processed = effect.transform(ctx.data, checkCtx);
      if (ctx.common.async) {
        return Promise.resolve(processed).then(async (processed2) => {
          if (status.value === "aborted")
            return INVALID;
          const result = await this._def.schema._parseAsync({
            data: processed2,
            path: ctx.path,
            parent: ctx
          });
          if (result.status === "aborted")
            return INVALID;
          if (result.status === "dirty")
            return DIRTY(result.value);
          if (status.value === "dirty")
            return DIRTY(result.value);
          return result;
        });
      } else {
        if (status.value === "aborted")
          return INVALID;
        const result = this._def.schema._parseSync({
          data: processed,
          path: ctx.path,
          parent: ctx
        });
        if (result.status === "aborted")
          return INVALID;
        if (result.status === "dirty")
          return DIRTY(result.value);
        if (status.value === "dirty")
          return DIRTY(result.value);
        return result;
      }
    }
    if (effect.type === "refinement") {
      const executeRefinement = (acc) => {
        const result = effect.refinement(acc, checkCtx);
        if (ctx.common.async) {
          return Promise.resolve(result);
        }
        if (result instanceof Promise) {
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        }
        return acc;
      };
      if (ctx.common.async === false) {
        const inner = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inner.status === "aborted")
          return INVALID;
        if (inner.status === "dirty")
          status.dirty();
        executeRefinement(inner.value);
        return { status: status.value, value: inner.value };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
          if (inner.status === "aborted")
            return INVALID;
          if (inner.status === "dirty")
            status.dirty();
          return executeRefinement(inner.value).then(() => {
            return { status: status.value, value: inner.value };
          });
        });
      }
    }
    if (effect.type === "transform") {
      if (ctx.common.async === false) {
        const base = this._def.schema._parseSync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (!isValid(base))
          return INVALID;
        const result = effect.transform(base.value, checkCtx);
        if (result instanceof Promise) {
          throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
        }
        return { status: status.value, value: result };
      } else {
        return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
          if (!isValid(base))
            return INVALID;
          return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
            status: status.value,
            value: result
          }));
        });
      }
    }
    util.assertNever(effect);
  }
}
ZodEffects.create = (schema, effect, params) => {
  return new ZodEffects({
    schema,
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    effect,
    ...processCreateParams(params)
  });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
  return new ZodEffects({
    schema,
    effect: { type: "preprocess", transform: preprocess },
    typeName: ZodFirstPartyTypeKind.ZodEffects,
    ...processCreateParams(params)
  });
};
class ZodOptional extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.undefined) {
      return OK(void 0);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodOptional.create = (type, params) => {
  return new ZodOptional({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodOptional,
    ...processCreateParams(params)
  });
};
class ZodNullable extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType === ZodParsedType.null) {
      return OK(null);
    }
    return this._def.innerType._parse(input);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodNullable.create = (type, params) => {
  return new ZodNullable({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodNullable,
    ...processCreateParams(params)
  });
};
class ZodDefault extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    let data = ctx.data;
    if (ctx.parsedType === ZodParsedType.undefined) {
      data = this._def.defaultValue();
    }
    return this._def.innerType._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
ZodDefault.create = (type, params) => {
  return new ZodDefault({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodDefault,
    defaultValue: typeof params.default === "function" ? params.default : () => params.default,
    ...processCreateParams(params)
  });
};
class ZodCatch extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const newCtx = {
      ...ctx,
      common: {
        ...ctx.common,
        issues: []
      }
    };
    const result = this._def.innerType._parse({
      data: newCtx.data,
      path: newCtx.path,
      parent: {
        ...newCtx
      }
    });
    if (isAsync(result)) {
      return result.then((result2) => {
        return {
          status: "valid",
          value: result2.status === "valid" ? result2.value : this._def.catchValue({
            get error() {
              return new ZodError(newCtx.common.issues);
            },
            input: newCtx.data
          })
        };
      });
    } else {
      return {
        status: "valid",
        value: result.status === "valid" ? result.value : this._def.catchValue({
          get error() {
            return new ZodError(newCtx.common.issues);
          },
          input: newCtx.data
        })
      };
    }
  }
  removeCatch() {
    return this._def.innerType;
  }
}
ZodCatch.create = (type, params) => {
  return new ZodCatch({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodCatch,
    catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
    ...processCreateParams(params)
  });
};
class ZodNaN extends ZodType {
  _parse(input) {
    const parsedType = this._getType(input);
    if (parsedType !== ZodParsedType.nan) {
      const ctx = this._getOrReturnCtx(input);
      addIssueToContext(ctx, {
        code: ZodIssueCode.invalid_type,
        expected: ZodParsedType.nan,
        received: ctx.parsedType
      });
      return INVALID;
    }
    return { status: "valid", value: input.data };
  }
}
ZodNaN.create = (params) => {
  return new ZodNaN({
    typeName: ZodFirstPartyTypeKind.ZodNaN,
    ...processCreateParams(params)
  });
};
class ZodBranded extends ZodType {
  _parse(input) {
    const { ctx } = this._processInputParams(input);
    const data = ctx.data;
    return this._def.type._parse({
      data,
      path: ctx.path,
      parent: ctx
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ZodPipeline extends ZodType {
  _parse(input) {
    const { status, ctx } = this._processInputParams(input);
    if (ctx.common.async) {
      const handleAsync = async () => {
        const inResult = await this._def.in._parseAsync({
          data: ctx.data,
          path: ctx.path,
          parent: ctx
        });
        if (inResult.status === "aborted")
          return INVALID;
        if (inResult.status === "dirty") {
          status.dirty();
          return DIRTY(inResult.value);
        } else {
          return this._def.out._parseAsync({
            data: inResult.value,
            path: ctx.path,
            parent: ctx
          });
        }
      };
      return handleAsync();
    } else {
      const inResult = this._def.in._parseSync({
        data: ctx.data,
        path: ctx.path,
        parent: ctx
      });
      if (inResult.status === "aborted")
        return INVALID;
      if (inResult.status === "dirty") {
        status.dirty();
        return {
          status: "dirty",
          value: inResult.value
        };
      } else {
        return this._def.out._parseSync({
          data: inResult.value,
          path: ctx.path,
          parent: ctx
        });
      }
    }
  }
  static create(a, b) {
    return new ZodPipeline({
      in: a,
      out: b,
      typeName: ZodFirstPartyTypeKind.ZodPipeline
    });
  }
}
class ZodReadonly extends ZodType {
  _parse(input) {
    const result = this._def.innerType._parse(input);
    const freeze = (data) => {
      if (isValid(data)) {
        data.value = Object.freeze(data.value);
      }
      return data;
    };
    return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ZodReadonly.create = (type, params) => {
  return new ZodReadonly({
    innerType: type,
    typeName: ZodFirstPartyTypeKind.ZodReadonly,
    ...processCreateParams(params)
  });
};
var ZodFirstPartyTypeKind;
(function(ZodFirstPartyTypeKind2) {
  ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
  ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
  ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
  ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
  ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
  ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
  ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
  ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
  ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
  ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
  ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
  ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
  ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
  ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
  ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
  ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
  ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
  ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
  ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
  ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
  ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
  ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
  ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
  ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
  ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
  ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
  ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
  ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
  ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
  ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
  ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
  ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
  ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
  ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
  ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
  ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
ZodString.create;
ZodNumber.create;
ZodBigInt.create;
const booleanType = ZodBoolean.create;
ZodDate.create;
ZodNever.create;
ZodArray.create;
const objectType = ZodObject.create;
ZodUnion.create;
ZodIntersection.create;
ZodTuple.create;
const enumType = ZodEnum.create;
ZodPromise.create;
ZodOptional.create;
ZodNullable.create;
const coerce = {
  string: (arg) => ZodString.create({ ...arg, coerce: true }),
  number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
  boolean: (arg) => ZodBoolean.create({
    ...arg,
    coerce: true
  }),
  bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
  date: (arg) => ZodDate.create({ ...arg, coerce: true })
};
const autoDesignSchema = objectType({
  subscriber_count: coerce.number().min(1, "At least 1 subscriber required").max(1e5, "Maximum 100,000 subscribers"),
  network_type: enumType(["FIBER", "COAXIAL", "LAN"], {
    errorMap: () => ({ message: "Please select a network type" })
  }),
  splitter_capacity: coerce.number().refine((v) => [8, 16, 32].includes(v), "Invalid splitter capacity"),
  max_distance: coerce.number().min(100, "Minimum distance is 100 meters").max(5e4, "Maximum distance is 50,000 meters"),
  manual_olt_placement: booleanType().optional()
});
const NETWORK_TYPE_CONFIG = {
  FIBER: { label: "Fiber", color: "bg-emerald-500" },
  COAXIAL: { label: "Coaxial", color: "bg-yellow-400" },
  LAN: { label: "LAN", color: "bg-blue-400" }
};
const SPLITTER_OPTIONS = [8, 16, 32];
function LoadingOverlay({ onCancel }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "auto-design.loading_state",
      className: "fixed inset-0 z-[9999] flex items-center justify-center",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.25 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-black/70 backdrop-blur-sm" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 bg-gray-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-sm mx-4 flex flex-col items-center gap-5 text-center",
            initial: { scale: 0.92, opacity: 0, y: 16 },
            animate: { scale: 1, opacity: 1, y: 0 },
            exit: { scale: 0.92, opacity: 0, y: 16 },
            transition: { type: "spring", stiffness: 400, damping: 30 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    "aria-hidden": "true",
                    className: "w-16 h-16 -rotate-90",
                    viewBox: "0 0 64 64",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "32",
                          cy: "32",
                          r: "26",
                          fill: "none",
                          stroke: "rgba(255,255,255,0.08)",
                          strokeWidth: "4"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.circle,
                        {
                          cx: "32",
                          cy: "32",
                          r: "26",
                          fill: "none",
                          stroke: "oklch(0.62 0.18 210)",
                          strokeWidth: "4",
                          strokeLinecap: "round",
                          strokeDasharray: "163.36",
                          animate: { strokeDashoffset: [163, 0, 163] },
                          transition: {
                            duration: 2,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "easeInOut"
                          }
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Zap,
                  {
                    "aria-hidden": "true",
                    className: "w-5 h-5 text-primary animate-pulse"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-lg leading-tight", children: "Generating optimized network..." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm", children: "AI is analyzing your coverage area" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 items-center h-4", children: [0, 1, 2].map((i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: "w-2 h-2 rounded-full bg-primary",
                  animate: { opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] },
                  transition: {
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i2 * 0.2
                  }
                },
                i2
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "auto-design.cancel_button",
                  onClick: onCancel,
                  className: "mt-1 text-sm text-white/40 hover:text-white/70 transition-colors underline underline-offset-2",
                  children: "Cancel"
                }
              )
            ]
          }
        )
      ]
    }
  );
}
function ParameterPanel() {
  var _a2;
  const store = useAutoDesignStore();
  const { generateNetwork, isGenerating, reset } = useAutoDesign();
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const isVisible = store.drawingMode === "done" || store.drawingMode === "editing";
  const polygonArea = store.polygon ? calculatePolygonArea(store.polygon).toFixed(2) : "0.00";
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset: resetForm,
    formState: { errors, isValid: isValid2 }
  } = useForm({
    resolver: t(autoDesignSchema),
    defaultValues: {
      subscriber_count: 500,
      network_type: "FIBER",
      splitter_capacity: 16,
      max_distance: 2e3,
      manual_olt_placement: false
    },
    mode: "onChange"
  });
  const watchedValues = watch();
  const selectedNetworkType = watch("network_type");
  const selectedSplitter = watch("splitter_capacity");
  const manualOlt = watch("manual_olt_placement");
  const setFormValues = store.setFormValues;
  reactExports.useEffect(() => {
    const values = {
      subscriberCount: watchedValues.subscriber_count ?? 500,
      networkType: watchedValues.network_type ?? "FIBER",
      splitterCapacity: watchedValues.splitter_capacity ?? 16,
      maxDistance: watchedValues.max_distance ?? 2e3,
      manualOltPlacement: watchedValues.manual_olt_placement ?? false
    };
    setFormValues(values);
  }, [
    watchedValues.subscriber_count,
    watchedValues.network_type,
    watchedValues.splitter_capacity,
    watchedValues.max_distance,
    watchedValues.manual_olt_placement,
    setFormValues
  ]);
  const onSubmit = (data) => {
    if (!store.polygon) return;
    generateNetwork({
      polygon: store.polygon,
      subscriber_count: data.subscriber_count,
      network_type: data.network_type,
      splitter_capacity: data.splitter_capacity,
      max_distance: data.max_distance,
      manual_olt_placement: data.manual_olt_placement ?? false
    });
  };
  const handleReset = () => {
    resetForm();
    reset();
  };
  const handleEditArea = () => {
    store.setDrawingMode("editing");
  };
  const panelContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      onSubmit: handleSubmit(onSubmit),
      className: "flex flex-col gap-4",
      noValidate: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ad-subscriber-count",
              className: "block text-xs font-medium text-white/70 uppercase tracking-wider",
              children: "Subscriber Count"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "ad-subscriber-count",
              "data-ocid": "auto-design.subscriber_count.input",
              type: "number",
              placeholder: "e.g. 500",
              ...register("subscriber_count"),
              className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs", children: "1 – 100,000" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: errors.subscriber_count && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              "data-ocid": "auto-design.subscriber_count.field_error",
              className: "text-red-400 text-xs",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              children: errors.subscriber_count.message
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ad-network-type",
              className: "block text-xs font-medium text-white/70 uppercase tracking-wider",
              children: "Network Type"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "select",
              {
                id: "ad-network-type",
                "data-ocid": "auto-design.network_type.select",
                ...register("network_type"),
                className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-8 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all cursor-pointer",
                children: Object.keys(NETWORK_TYPE_CONFIG).map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "option",
                  {
                    value: type,
                    className: "bg-gray-900 text-white",
                    children: NETWORK_TYPE_CONFIG[type].label
                  },
                  type
                ))
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `w-2.5 h-2.5 rounded-full flex-shrink-0 ${((_a2 = NETWORK_TYPE_CONFIG[selectedNetworkType]) == null ? void 0 : _a2.color) ?? "bg-white/30"}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5 text-white/40" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: errors.network_type && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              "data-ocid": "auto-design.network_type.field_error",
              className: "text-red-400 text-xs",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              children: errors.network_type.message
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "block text-xs font-medium text-white/70 uppercase tracking-wider mb-1.5", children: "Splitter Capacity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 p-1 bg-white/5 border border-white/10 rounded-lg", children: SPLITTER_OPTIONS.map((cap) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `auto-design.splitter_capacity.${cap}`,
              onClick: () => setValue("splitter_capacity", cap, { shouldValidate: true }),
              className: `flex-1 py-1.5 text-xs font-medium rounded-md transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${Number(selectedSplitter) === cap ? "bg-primary text-white shadow-sm" : "text-white/50 hover:text-white/80 hover:bg-white/5"}`,
              children: [
                "1:",
                cap
              ]
            },
            cap
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: errors.splitter_capacity && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              "data-ocid": "auto-design.splitter_capacity.field_error",
              className: "text-red-400 text-xs",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              children: errors.splitter_capacity.message
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "ad-max-distance",
              className: "block text-xs font-medium text-white/70 uppercase tracking-wider",
              children: "Max Distance (m)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                id: "ad-max-distance",
                "data-ocid": "auto-design.max_distance.input",
                type: "number",
                placeholder: "e.g. 2000",
                ...register("max_distance"),
                className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 pr-10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/60 focus:border-primary/60 transition-all"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/30 font-medium", children: "m" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs", children: "100 – 50,000 meters" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: errors.max_distance && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.p,
            {
              "data-ocid": "auto-design.max_distance.field_error",
              className: "text-red-400 text-xs",
              initial: { opacity: 0, height: 0 },
              animate: { opacity: 1, height: "auto" },
              exit: { opacity: 0, height: 0 },
              children: errors.max_distance.message
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "auto-design.manual_olt.toggle",
              role: "switch",
              "aria-checked": manualOlt ?? false,
              onClick: () => setValue("manual_olt_placement", !(manualOlt ?? false), {
                shouldValidate: true
              }),
              className: `relative mt-0.5 flex-shrink-0 h-5 w-9 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${manualOlt ? "bg-primary" : "bg-white/10"}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  layout: true,
                  className: "absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow-sm",
                  animate: { x: manualOlt ? 16 : 0 },
                  transition: { type: "spring", stiffness: 500, damping: 30 }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-white/80 font-medium leading-tight", children: "Manual OLT Placement" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 mt-0.5", children: "Place OLT manually after generation" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "auto-design.reset_button",
                onClick: handleReset,
                className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 hover:bg-white/8 border border-white/10 transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCcw, { className: "w-3.5 h-3.5" }),
                  "Reset"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                "data-ocid": "auto-design.edit_area_button",
                onClick: handleEditArea,
                className: "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 hover:bg-white/8 border border-white/10 transition-all",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(PenLine, { className: "w-3.5 h-3.5" }),
                  "Edit Area"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "submit",
              "data-ocid": "auto-design.generate_button",
              disabled: !isValid2 || isGenerating,
              whileHover: !isGenerating && isValid2 ? { scale: 1.02 } : {},
              whileTap: !isGenerating && isValid2 ? { scale: 0.98 } : {},
              className: "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white bg-primary hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20",
              children: isGenerating ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Generating..."
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                "Generate Network"
              ] })
            }
          )
        ] })
      ]
    }
  );
  const panelHeader = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-base leading-tight truncate", children: "Network Parameters" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs mt-0.5", children: "Configure your auto design" }),
      store.polygon && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 text-primary flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-primary/80 font-medium", children: [
          "Area: ",
          polygonArea,
          " km²"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        "data-ocid": "auto-design.panel_collapse_toggle",
        "aria-label": collapsed ? "Expand panel" : "Collapse panel",
        onClick: () => setCollapsed((c) => !c),
        className: "md:hidden flex-shrink-0 p-1.5 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/8 transition-colors",
        children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
      }
    )
  ] });
  const glassClasses = "bg-gray-900/85 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "auto-design.parameter_panel",
        className: `hidden md:block absolute top-4 right-4 w-80 rounded-2xl ${glassClasses} p-5 z-[1000]`,
        initial: { opacity: 0, x: 24, scale: 0.97 },
        animate: { opacity: 1, x: 0, scale: 1 },
        exit: { opacity: 0, x: 24, scale: 0.97 },
        transition: { type: "spring", stiffness: 380, damping: 32 },
        children: [
          panelHeader,
          panelContent
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": "auto-design.parameter_panel_mobile",
        className: `md:hidden fixed bottom-0 left-0 right-0 z-[1000] rounded-t-2xl ${glassClasses} pb-safe`,
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", stiffness: 380, damping: 36 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-white/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 pt-2 pb-5 max-h-[85dvh] overflow-y-auto overscroll-contain", children: [
            panelHeader,
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, height: 0 },
                animate: { opacity: 1, height: "auto" },
                exit: { opacity: 0, height: 0 },
                transition: { duration: 0.22 },
                style: { overflow: "hidden" },
                children: panelContent
              },
              "mobile-form"
            ) })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isGenerating && /* @__PURE__ */ jsxRuntimeExports.jsx(
      LoadingOverlay,
      {
        onCancel: () => {
          reset();
        }
      }
    ) })
  ] });
}
const GLASS = "bg-gray-900/85 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/40";
const NODE_TYPE_CONFIG = {
  OLT: { label: "OLT", color: "text-red-400", dotClass: "bg-red-500" },
  SPLITTER: {
    label: "Splitter",
    color: "text-emerald-400",
    dotClass: "bg-emerald-500"
  },
  SUBSCRIBER: {
    label: "Subscriber",
    color: "text-blue-400",
    dotClass: "bg-blue-500"
  }
};
const NETWORK_TYPE_COLOR = {
  FIBER: "bg-emerald-500",
  COAXIAL: "bg-yellow-400",
  LAN: "bg-blue-400"
};
function formatCoord(val) {
  return val.toFixed(4);
}
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(void 0, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
}
function BarMeter({ value, colorClass, label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/50", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-white/70 font-medium", children: [
        value,
        "%"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-full bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `h-full rounded-full ${colorClass}`,
        initial: { width: 0 },
        animate: { width: `${value}%` },
        transition: { duration: 0.6, ease: "easeOut" }
      }
    ) })
  ] });
}
function TooltipBtn({
  label,
  icon,
  onClick,
  active,
  "data-ocid": ocid
}) {
  const [show, setShow] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.button,
      {
        type: "button",
        "data-ocid": ocid,
        "aria-label": label,
        onClick,
        onMouseEnter: () => setShow(true),
        onMouseLeave: () => setShow(false),
        onFocus: () => setShow(true),
        onBlur: () => setShow(false),
        whileHover: { scale: 1.06 },
        whileTap: { scale: 0.94 },
        className: `w-full p-2 rounded-lg flex items-center justify-center transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/60 ${active ? "bg-primary/20 text-primary" : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white/90"}`,
        children: icon
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: show && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        role: "tooltip",
        "data-ocid": ocid ? `${ocid}.tooltip` : void 0,
        className: "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-gray-800 border border-white/10 text-xs text-white whitespace-nowrap z-[1100] pointer-events-none",
        initial: { opacity: 0, y: 4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 4 },
        transition: { duration: 0.12 },
        children: [
          label,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800" })
        ]
      }
    ) })
  ] });
}
function NodeDetailPanel() {
  const store = useAutoDesignStore();
  const { result, selectedNodeId } = store;
  const selectedNode = reactExports.useMemo(() => {
    if (!result || !selectedNodeId) return null;
    return result.nodes.find((n2) => n2.id === selectedNodeId) ?? null;
  }, [result, selectedNodeId]);
  const [editName, setEditName] = reactExports.useState("");
  const [editStatus, setEditStatus] = reactExports.useState("Active");
  const [editSignal, setEditSignal] = reactExports.useState(85);
  const [isDirty2, setIsDirty] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (selectedNode) {
      setEditName(selectedNode.name);
      setEditStatus("Active");
      setEditSignal(selectedNode.type === "SUBSCRIBER" ? 72 : 85);
      setIsDirty(false);
    }
  }, [selectedNode]);
  const handleSave = () => {
    setIsDirty(false);
  };
  const handleCancel = () => {
    if (selectedNode) {
      setEditName(selectedNode.name);
      setEditStatus("Active");
      setEditSignal(selectedNode.type === "SUBSCRIBER" ? 72 : 85);
    }
    setIsDirty(false);
  };
  const isVisible = selectedNode !== null;
  const cfg = selectedNode ? NODE_TYPE_CONFIG[selectedNode.type] : null;
  const splitterForSub = reactExports.useMemo(() => {
    if (!result || !selectedNode || selectedNode.type !== "SUBSCRIBER")
      return null;
    const edge = result.edges.find((e) => e.toNodeId === selectedNode.id);
    if (!edge) return null;
    return result.nodes.find((n2) => n2.id === edge.fromNodeId) ?? null;
  }, [result, selectedNode]);
  const oltForSplitter = reactExports.useMemo(() => {
    if (!result || !selectedNode || selectedNode.type !== "SPLITTER")
      return null;
    const edge = result.edges.find((e) => e.toNodeId === selectedNode.id);
    if (!edge) return null;
    return result.nodes.find((n2) => n2.id === edge.fromNodeId) ?? null;
  }, [result, selectedNode]);
  const nameInputId = "nd-edit-name";
  const statusSelectId = "nd-edit-status";
  const signalSliderId = "nd-signal-slider";
  const panelContent = selectedNode && cfg ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 overflow-y-auto max-h-[calc(100vh-160px)] pr-0.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 ${cfg.color}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full ${cfg.dotClass}` }),
            cfg.label
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: `inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${editStatus === "Active" ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `w-1.5 h-1.5 rounded-full ${editStatus === "Active" ? "bg-emerald-400" : "bg-red-400"}`
              }
            ),
            editStatus
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 mb-0.5 uppercase tracking-wider", children: "Node ID" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-white/80", children: selectedNode.id })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "w-4 h-4 text-white/40 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-white/70", children: [
        "Connected to",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: selectedNode.connectedCount }),
        " ",
        "node",
        selectedNode.connectedCount !== 1 ? "s" : ""
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2.5 py-2 rounded-lg bg-white/5 border border-white/8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider mb-0.5", children: "Lat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-white/80", children: formatCoord(selectedNode.lat) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2.5 py-2 rounded-lg bg-white/5 border border-white/8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider mb-0.5", children: "Lng" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-white/80", children: formatCoord(selectedNode.lng) })
      ] })
    ] }),
    selectedNode.type === "OLT" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider", children: "OLT Info" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquareSplitHorizontal, { className: "w-3.5 h-3.5 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Splitters:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: selectedNode.connectedCount })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BarMeter,
        {
          value: editSignal,
          colorClass: "bg-emerald-500",
          label: "Signal Quality"
        }
      )
    ] }),
    selectedNode.type === "SPLITTER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider", children: "Splitter Info" }),
      oltForSplitter && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 text-red-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "OLT:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: oltForSplitter.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 text-blue-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Subscribers:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: selectedNode.connectedCount })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BarMeter,
        {
          value: Math.round(selectedNode.connectedCount / 32 * 100),
          colorClass: "bg-blue-500",
          label: "Capacity Used"
        }
      )
    ] }),
    selectedNode.type === "SUBSCRIBER" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider", children: "Subscriber Info" }),
      splitterForSub && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-white/70", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SquareSplitHorizontal, { className: "w-3.5 h-3.5 text-emerald-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Splitter:",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white font-medium", children: splitterForSub.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        BarMeter,
        {
          value: editSignal,
          colorClass: "bg-blue-500",
          label: "Signal Strength"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider font-medium", children: "Edit Node" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: nameInputId,
            className: "text-xs text-white/50 uppercase tracking-wider",
            children: "Name"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: nameInputId,
            "data-ocid": "auto-design.node_detail.name_input",
            type: "text",
            value: editName,
            onChange: (e) => {
              setEditName(e.target.value);
              setIsDirty(true);
            },
            className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "label",
          {
            htmlFor: statusSelectId,
            className: "text-xs text-white/50 uppercase tracking-wider",
            children: "Status"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            id: statusSelectId,
            "data-ocid": "auto-design.node_detail.status_select",
            value: editStatus,
            onChange: (e) => {
              setEditStatus(e.target.value);
              setIsDirty(true);
            },
            className: "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white appearance-none focus:outline-none focus:ring-1 focus:ring-primary/60 transition-all cursor-pointer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Active", className: "bg-gray-900", children: "Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Inactive", className: "bg-gray-900", children: "Inactive" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            htmlFor: signalSliderId,
            className: "text-xs text-white/50 uppercase tracking-wider flex items-center justify-between",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Signal Strength" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-white/70 font-medium", children: [
                editSignal,
                "%"
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            id: signalSliderId,
            "data-ocid": "auto-design.node_detail.signal_slider",
            type: "range",
            min: 0,
            max: 100,
            value: editSignal,
            readOnly: selectedNode.type === "SUBSCRIBER",
            disabled: selectedNode.type === "SUBSCRIBER",
            onChange: (e) => {
              if (selectedNode.type !== "SUBSCRIBER") {
                setEditSignal(Number(e.target.value));
                setIsDirty(true);
              }
            },
            className: "w-full accent-primary h-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-default"
          }
        ),
        selectedNode.type === "SUBSCRIBER" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/30", children: "Read-only for subscribers" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isDirty2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex gap-2 pt-1",
          initial: { opacity: 0, height: 0 },
          animate: { opacity: 1, height: "auto" },
          exit: { opacity: 0, height: 0 },
          transition: { duration: 0.2 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                "data-ocid": "auto-design.node_detail.save_button",
                onClick: handleSave,
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.97 },
                className: "flex-1 py-2 rounded-lg text-xs font-semibold text-white bg-primary hover:brightness-110 transition-all shadow-lg shadow-primary/20",
                children: "Save Changes"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.button,
              {
                type: "button",
                "data-ocid": "auto-design.node_detail.cancel_button",
                onClick: handleCancel,
                whileHover: { scale: 1.02 },
                whileTap: { scale: 0.97 },
                className: "flex-1 py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition-all",
                children: "Cancel"
              }
            )
          ]
        }
      ) })
    ] })
  ] }) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isVisible && /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "auto-design.node_detail_panel",
      className: `hidden md:flex flex-col absolute left-4 top-4 w-[280px] rounded-2xl ${GLASS} p-4 z-[1000]`,
      initial: { opacity: 0, x: -20, scale: 0.97 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: -20, scale: 0.97 },
      transition: { type: "spring", stiffness: 380, damping: 32 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-sm", children: "Node Details" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "auto-design.node_detail.close_button",
              "aria-label": "Close node detail",
              onClick: () => store.setSelectedNodeId(null),
              className: "p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        panelContent
      ]
    }
  ) }) });
}
function SummaryPanel({
  parameterPanelVisible = false,
  drawerMode = false
}) {
  var _a2;
  const store = useAutoDesignStore();
  const { result, formValues } = store;
  const [minimized, setMinimized] = reactExports.useState(false);
  const isVisible = result !== null;
  const generatedAt = reactExports.useRef("");
  reactExports.useEffect(() => {
    if (result) {
      generatedAt.current = (/* @__PURE__ */ new Date()).toISOString();
    }
  }, [result]);
  if (!isVisible || !result) return null;
  const { summary, nodes, edges } = result;
  const cableKm = (summary.totalCableLength / 1e3).toFixed(2);
  const networkTypeLabel = (formValues == null ? void 0 : formValues.networkType) ?? ((_a2 = edges[0]) == null ? void 0 : _a2.networkType) ?? "FIBER";
  const oltCount = nodes.filter((n2) => n2.type === "OLT").length;
  const splitterCount = nodes.filter((n2) => n2.type === "SPLITTER").length;
  const subscriberCount = nodes.filter((n2) => n2.type === "SUBSCRIBER").length;
  const kpis = [
    {
      label: "Subscribers",
      value: summary.totalSubscribers.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
      colorClass: "text-blue-400",
      bgClass: "bg-blue-500/10"
    },
    {
      label: "Splitters",
      value: summary.totalSplitters.toLocaleString(),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(SquareSplitHorizontal, { className: "w-4 h-4" }),
      colorClass: "text-emerald-400",
      bgClass: "bg-emerald-500/10"
    },
    {
      label: "Cable",
      value: `${cableKm} km`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Cable, { className: "w-4 h-4" }),
      colorClass: "text-purple-400",
      bgClass: "bg-purple-500/10"
    },
    {
      label: "Est. Cost",
      value: `$${summary.estimatedCost.toLocaleString()}`,
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-4 h-4" }),
      colorClass: "text-yellow-400",
      bgClass: "bg-yellow-500/10"
    }
  ];
  const content = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: kpis.map((kpi) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `rounded-xl p-3 ${kpi.bgClass} border border-white/8 flex flex-col gap-1.5`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-1.5 ${kpi.colorClass}`, children: [
            kpi.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-white/50", children: kpi.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: `text-base font-bold leading-tight ${kpi.colorClass}`,
              children: kpi.value
            }
          )
        ]
      },
      kpi.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider font-medium", children: "Network Breakdown" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        [
          {
            label: "OLT Nodes",
            count: oltCount,
            dotClass: "bg-red-500",
            textClass: "text-red-400"
          },
          {
            label: "Splitter Nodes",
            count: splitterCount,
            dotClass: "bg-emerald-500",
            textClass: "text-emerald-400"
          },
          {
            label: "Subscriber Nodes",
            count: subscriberCount,
            dotClass: "bg-blue-500",
            textClass: "text-blue-400"
          }
        ].map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-2 h-2 rounded-full ${row.dotClass}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/70", children: row.label })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-semibold ${row.textClass}`, children: row.count })
            ]
          },
          row.label
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-3 py-1.5 rounded-lg bg-white/5 border border-white/8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `w-2 h-2 rounded-full ${NETWORK_TYPE_COLOR[networkTypeLabel] ?? "bg-white/40"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-white/70", children: "Network Type" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-semibold text-white/80", children: networkTypeLabel })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 uppercase tracking-wider font-medium", children: "Controls" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TooltipBtn,
          {
            label: store.showNodes ? "Hide Nodes" : "Show Nodes",
            icon: store.showNodes ? /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }),
            onClick: () => store.setShowNodes(!store.showNodes),
            active: store.showNodes,
            "data-ocid": "auto-design.summary.toggle_nodes"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TooltipBtn,
          {
            label: store.showEdges ? "Hide Connections" : "Show Connections",
            icon: store.showEdges ? /* @__PURE__ */ jsxRuntimeExports.jsx(Cable, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Cable, { className: "w-4 h-4 opacity-40" }),
            onClick: () => store.setShowEdges(!store.showEdges),
            active: store.showEdges,
            "data-ocid": "auto-design.summary.toggle_edges"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TooltipBtn,
          {
            label: "Fit Map",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Maximize2, { className: "w-4 h-4" }),
            onClick: () => store.setShowNodes(store.showNodes),
            "data-ocid": "auto-design.summary.fit_map"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TooltipBtn,
          {
            label: "Replay Animation",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4" }),
            onClick: () => store.setAnimationPlayed(false),
            "data-ocid": "auto-design.summary.replay_animation"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TooltipBtn,
          {
            label: "Export JSON",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            onClick: () => {
              if (formValues) exportResultAsJson(result, formValues);
            },
            "data-ocid": "auto-design.summary.export_json"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TooltipBtn,
          {
            label: "Re-run Design",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            onClick: () => store.setDrawingMode("done"),
            "data-ocid": "auto-design.summary.rerun_design"
          }
        )
      ] })
    ] }),
    generatedAt.current && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-white/25 text-right", children: [
      "Last generated: ",
      formatDate(generatedAt.current)
    ] })
  ] });
  if (drawerMode) {
    return content;
  }
  const topClass = parameterPanelVisible ? "top-[480px]" : "top-4";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "auto-design.summary_panel",
      className: `hidden md:flex flex-col absolute right-4 ${topClass} w-[300px] rounded-2xl ${GLASS} p-4 z-[1000] transition-[top] duration-300`,
      initial: { opacity: 0, x: 24, scale: 0.97 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 24, scale: 0.97 },
      transition: { type: "spring", stiffness: 380, damping: 32 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-white font-semibold text-sm", children: "Design Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": "auto-design.summary.minimize_toggle",
              "aria-label": minimized ? "Expand summary" : "Minimize summary",
              onClick: () => setMinimized((m) => !m),
              className: "p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors",
              children: minimized ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: !minimized && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            transition: { duration: 0.22 },
            style: { overflow: "hidden" },
            children: content
          }
        ) })
      ]
    }
  );
}
function MobileDrawer({
  title,
  isOpen,
  onClose,
  children,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "md:hidden fixed inset-0 bg-black/50 z-[1050]",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        onClick: onClose
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        "data-ocid": ocid,
        className: `md:hidden fixed bottom-0 left-0 right-0 z-[1060] h-[70vh] rounded-t-2xl ${GLASS} flex flex-col`,
        initial: { y: "100%" },
        animate: { y: 0 },
        exit: { y: "100%" },
        transition: { type: "spring", stiffness: 380, damping: 36 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-white/20" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-white/8 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-white font-semibold text-sm", children: title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": `${ocid}.close_button`,
                "aria-label": "Close drawer",
                onClick: onClose,
                className: "p-1.5 rounded-lg text-white/40 hover:text-white/80 hover:bg-white/8 transition-colors",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto overscroll-contain px-4 py-4", children })
        ]
      }
    )
  ] }) });
}
function ResultPanel() {
  const store = useAutoDesignStore();
  const { result, selectedNodeId, drawingMode } = store;
  const [detailDrawerOpen, setDetailDrawerOpen] = reactExports.useState(false);
  const [summaryDrawerOpen, setSummaryDrawerOpen] = reactExports.useState(false);
  const hasResult = result !== null;
  const hasSelectedNode = selectedNodeId !== null;
  const parameterPanelVisible = drawingMode === "done" || drawingMode === "editing";
  reactExports.useEffect(() => {
    if (hasSelectedNode) setDetailDrawerOpen(true);
  }, [hasSelectedNode]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NodeDetailPanel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasResult && /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryPanel, { parameterPanelVisible }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: hasResult && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        className: "md:hidden fixed bottom-24 right-4 z-[1040] flex flex-col gap-3",
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.8 },
        transition: { type: "spring", stiffness: 400, damping: 30 },
        children: [
          hasSelectedNode && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              "data-ocid": "auto-design.fab.node_detail",
              "aria-label": "Open node details",
              onClick: () => setDetailDrawerOpen(true),
              whileTap: { scale: 0.9 },
              className: `w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${GLASS} border border-primary/40 text-primary`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.button,
            {
              type: "button",
              "data-ocid": "auto-design.fab.summary",
              "aria-label": "Open design summary",
              onClick: () => setSummaryDrawerOpen(true),
              whileTap: { scale: 0.9 },
              className: `w-12 h-12 rounded-full shadow-lg flex items-center justify-center ${GLASS} border border-emerald-500/40 text-emerald-400`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5" })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MobileDrawer,
      {
        title: "Node Details",
        isOpen: detailDrawerOpen,
        onClose: () => setDetailDrawerOpen(false),
        ocid: "auto-design.node_detail_drawer",
        children: hasSelectedNode && result ? (() => {
          const node = result.nodes.find((n2) => n2.id === selectedNodeId);
          if (!node)
            return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm", children: "No node selected." });
          const cfg = NODE_TYPE_CONFIG[node.type];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 ${cfg.color}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `w-1.5 h-1.5 rounded-full ${cfg.dotClass}`
                    }
                  ),
                  cfg.label
                ]
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 font-medium", children: node.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 font-mono text-xs", children: node.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-white/70", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Signal, { className: "w-4 h-4 text-white/40" }),
              "Connected to ",
              node.connectedCount,
              " node",
              node.connectedCount !== 1 ? "s" : ""
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2.5 py-2 rounded-lg bg-white/5 border border-white/8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 mb-0.5", children: "Lat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-white/80", children: formatCoord(node.lat) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2.5 py-2 rounded-lg bg-white/5 border border-white/8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-white/40 mb-0.5", children: "Lng" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-white/80", children: formatCoord(node.lng) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "auto-design.node_detail_drawer.close_button",
                onClick: () => {
                  store.setSelectedNodeId(null);
                  setDetailDrawerOpen(false);
                },
                className: "mt-2 w-full py-2 rounded-lg text-xs font-medium text-white/60 hover:text-white/90 bg-white/5 hover:bg-white/10 border border-white/10 transition-all",
                children: "Deselect Node"
              }
            )
          ] });
        })() : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm", children: "Select a node on the map to view details." })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MobileDrawer,
      {
        title: "Design Summary",
        isOpen: summaryDrawerOpen,
        onClose: () => setSummaryDrawerOpen(false),
        ocid: "auto-design.summary_drawer",
        children: hasResult && /* @__PURE__ */ jsxRuntimeExports.jsx(SummaryPanel, { drawerMode: true, parameterPanelVisible: false })
      }
    )
  ] });
}
const LazyMapCanvas = reactExports.lazy(() => __vitePreload(() => import("./MapCanvas-CB9JucqO.js"), true ? __vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]) : void 0));
function MapFallback() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-950", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-2 border-primary/30 border-t-primary rounded-full animate-spin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-sm", children: "Loading map…" })
  ] }) });
}
function WelcomeBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      "data-ocid": "auto-design.welcome_banner",
      className: "absolute inset-0 z-10 flex items-center justify-center pointer-events-none",
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.96 },
      transition: { type: "spring", stiffness: 360, damping: 30 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-gray-900/85 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl shadow-black/50 p-8 max-w-sm mx-4 flex flex-col items-center gap-4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute inset-0 rounded-full bg-primary/20",
              animate: { scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] },
              transition: {
                duration: 2.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute inset-0 rounded-full bg-primary/10",
              animate: { scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] },
              transition: {
                duration: 2.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 0.4
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-14 h-14 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-6 h-6 text-primary", "aria-hidden": "true" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Sparkles,
              {
                className: "w-3.5 h-3.5 text-primary/70",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-medium text-primary/80 uppercase tracking-widest", children: "AI-Assisted Planning" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-white font-semibold text-xl leading-tight", children: "Network Auto Design" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-sm leading-relaxed", children: "Draw a geographic area on the map to begin AI-assisted network planning" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "flex flex-col items-center gap-1 text-white/30",
            animate: { y: [0, 5, 0] },
            transition: {
              duration: 1.6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-wide", children: "Start below" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDown, { className: "w-4 h-4" })
            ]
          }
        )
      ] })
    },
    "welcome-banner"
  );
}
function AutoDesignPage() {
  const drawingMode = useAutoDesignStore((s2) => s2.drawingMode);
  const showBanner = drawingMode === "idle";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": "auto-design.page",
      className: "relative flex-1 overflow-hidden w-full h-full min-h-0",
      style: { height: "100%" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(MapFallback, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(LazyMapCanvas, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showBanner && /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeBanner, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawControls, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParameterPanel, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResultPanel, {})
      ]
    }
  );
}
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AutoDesignPage
}, Symbol.toStringTag, { value: "Module" }));
export {
  index as i,
  useAutoDesignStore as u
};
