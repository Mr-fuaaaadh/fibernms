import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b0 as useId, b1 as useControllableState, aS as useComposedRefs, aT as Primitive, aW as composeEventHandlers, aU as Presence, b4 as Portal$1, ba as DismissableLayer, aV as createContextScope, bi as createSlottable, e as cn, m as motion, as as Lock, A as AnimatePresence, ab as Server, al as Workflow, Z as Zap, B as Bell, aI as ShieldCheck, aL as Users, aG as Settings, ay as CreditCard, ak as Map$1, R as Route, af as Wrench, F as FileText, an as Brain, aR as Info, ai as Shield, ae as Badge, X } from "./index-X_EKDj9u.js";
import { G as GlassCard } from "./GlassCard-CANNf_pm.js";
import { B as Button } from "./button-BWMGcdf6.js";
import { C as Checkbox } from "./checkbox-CyiFF7RJ.js";
import { D as Dialog, a as DialogContent, b as DialogHeader, c as DialogTitle } from "./dialog-S3vhSuEE.js";
import { I as Input } from "./input-jUSTCimG.js";
import { L as Label } from "./label-rOrIkp_p.js";
import { R as Root2, A as Anchor, f as Arrow, e as createPopperScope, C as Content, g as Root, S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-EmfiibqV.js";
import { S as Switch } from "./switch-BSOLQA0O.js";
import { T as Textarea } from "./textarea-Dm8vrpap.js";
import { M as MOCK_COMPANIES } from "./superAdminMockData-SJ6Z2k0y.js";
import { u as ue } from "./index-_psX7bNU.js";
import { P as Pen } from "./pen-zjP7iHeg.js";
import { T as Trash2 } from "./trash-2-MaRbIygj.js";
import { E as Eye } from "./eye-wXVMeBXo.js";
import { P as Pencil } from "./pencil-BsjTv8VQ.js";
import { C as Check } from "./check-v0Xde9xE.js";
import { D as Download } from "./download-CAkJGGcZ.js";
import { R as RefreshCw } from "./refresh-cw-BxlXyXiN.js";
import { P as Plus } from "./plus-BuZPJEPe.js";
import "./index-CpZg9EmB.js";
import "./index-B9F1MoVn.js";
import "./index-IXOTxK3N.js";
import "./index-BBIttsv-.js";
import "./chevron-up-Cia-Yfm_.js";
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
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
var [createTooltipContext] = createContextScope("Tooltip", [
  createPopperScope
]);
var usePopperScope = createPopperScope();
var PROVIDER_NAME = "TooltipProvider";
var DEFAULT_DELAY_DURATION = 700;
var TOOLTIP_OPEN = "tooltip.open";
var [TooltipProviderContextProvider, useTooltipProviderContext] = createTooltipContext(PROVIDER_NAME);
var TooltipProvider$1 = (props) => {
  const {
    __scopeTooltip,
    delayDuration = DEFAULT_DELAY_DURATION,
    skipDelayDuration = 300,
    disableHoverableContent = false,
    children
  } = props;
  const isOpenDelayedRef = reactExports.useRef(true);
  const isPointerInTransitRef = reactExports.useRef(false);
  const skipDelayTimerRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    const skipDelayTimer = skipDelayTimerRef.current;
    return () => window.clearTimeout(skipDelayTimer);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TooltipProviderContextProvider,
    {
      scope: __scopeTooltip,
      isOpenDelayedRef,
      delayDuration,
      onOpen: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        isOpenDelayedRef.current = false;
      }, []),
      onClose: reactExports.useCallback(() => {
        window.clearTimeout(skipDelayTimerRef.current);
        skipDelayTimerRef.current = window.setTimeout(
          () => isOpenDelayedRef.current = true,
          skipDelayDuration
        );
      }, [skipDelayDuration]),
      isPointerInTransitRef,
      onPointerInTransitChange: reactExports.useCallback((inTransit) => {
        isPointerInTransitRef.current = inTransit;
      }, []),
      disableHoverableContent,
      children
    }
  );
};
TooltipProvider$1.displayName = PROVIDER_NAME;
var TOOLTIP_NAME = "Tooltip";
var [TooltipContextProvider, useTooltipContext] = createTooltipContext(TOOLTIP_NAME);
var Tooltip$1 = (props) => {
  const {
    __scopeTooltip,
    children,
    open: openProp,
    defaultOpen,
    onOpenChange,
    disableHoverableContent: disableHoverableContentProp,
    delayDuration: delayDurationProp
  } = props;
  const providerContext = useTooltipProviderContext(TOOLTIP_NAME, props.__scopeTooltip);
  const popperScope = usePopperScope(__scopeTooltip);
  const [trigger, setTrigger] = reactExports.useState(null);
  const contentId = useId();
  const openTimerRef = reactExports.useRef(0);
  const disableHoverableContent = disableHoverableContentProp ?? providerContext.disableHoverableContent;
  const delayDuration = delayDurationProp ?? providerContext.delayDuration;
  const wasOpenDelayedRef = reactExports.useRef(false);
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen ?? false,
    onChange: (open2) => {
      if (open2) {
        providerContext.onOpen();
        document.dispatchEvent(new CustomEvent(TOOLTIP_OPEN));
      } else {
        providerContext.onClose();
      }
      onOpenChange == null ? void 0 : onOpenChange(open2);
    },
    caller: TOOLTIP_NAME
  });
  const stateAttribute = reactExports.useMemo(() => {
    return open ? wasOpenDelayedRef.current ? "delayed-open" : "instant-open" : "closed";
  }, [open]);
  const handleOpen = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    wasOpenDelayedRef.current = false;
    setOpen(true);
  }, [setOpen]);
  const handleClose = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = 0;
    setOpen(false);
  }, [setOpen]);
  const handleDelayedOpen = reactExports.useCallback(() => {
    window.clearTimeout(openTimerRef.current);
    openTimerRef.current = window.setTimeout(() => {
      wasOpenDelayedRef.current = true;
      setOpen(true);
      openTimerRef.current = 0;
    }, delayDuration);
  }, [delayDuration, setOpen]);
  reactExports.useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        window.clearTimeout(openTimerRef.current);
        openTimerRef.current = 0;
      }
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root2, { ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    TooltipContextProvider,
    {
      scope: __scopeTooltip,
      contentId,
      open,
      stateAttribute,
      trigger,
      onTriggerChange: setTrigger,
      onTriggerEnter: reactExports.useCallback(() => {
        if (providerContext.isOpenDelayedRef.current) handleDelayedOpen();
        else handleOpen();
      }, [providerContext.isOpenDelayedRef, handleDelayedOpen, handleOpen]),
      onTriggerLeave: reactExports.useCallback(() => {
        if (disableHoverableContent) {
          handleClose();
        } else {
          window.clearTimeout(openTimerRef.current);
          openTimerRef.current = 0;
        }
      }, [handleClose, disableHoverableContent]),
      onOpen: handleOpen,
      onClose: handleClose,
      disableHoverableContent,
      children
    }
  ) });
};
Tooltip$1.displayName = TOOLTIP_NAME;
var TRIGGER_NAME = "TooltipTrigger";
var TooltipTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...triggerProps } = props;
    const context = useTooltipContext(TRIGGER_NAME, __scopeTooltip);
    const providerContext = useTooltipProviderContext(TRIGGER_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref, context.onTriggerChange);
    const isPointerDownRef = reactExports.useRef(false);
    const hasPointerMoveOpenedRef = reactExports.useRef(false);
    const handlePointerUp = reactExports.useCallback(() => isPointerDownRef.current = false, []);
    reactExports.useEffect(() => {
      return () => document.removeEventListener("pointerup", handlePointerUp);
    }, [handlePointerUp]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { asChild: true, ...popperScope, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.button,
      {
        "aria-describedby": context.open ? context.contentId : void 0,
        "data-state": context.stateAttribute,
        ...triggerProps,
        ref: composedRefs,
        onPointerMove: composeEventHandlers(props.onPointerMove, (event) => {
          if (event.pointerType === "touch") return;
          if (!hasPointerMoveOpenedRef.current && !providerContext.isPointerInTransitRef.current) {
            context.onTriggerEnter();
            hasPointerMoveOpenedRef.current = true;
          }
        }),
        onPointerLeave: composeEventHandlers(props.onPointerLeave, () => {
          context.onTriggerLeave();
          hasPointerMoveOpenedRef.current = false;
        }),
        onPointerDown: composeEventHandlers(props.onPointerDown, () => {
          if (context.open) {
            context.onClose();
          }
          isPointerDownRef.current = true;
          document.addEventListener("pointerup", handlePointerUp, { once: true });
        }),
        onFocus: composeEventHandlers(props.onFocus, () => {
          if (!isPointerDownRef.current) context.onOpen();
        }),
        onBlur: composeEventHandlers(props.onBlur, context.onClose),
        onClick: composeEventHandlers(props.onClick, context.onClose)
      }
    ) });
  }
);
TooltipTrigger$1.displayName = TRIGGER_NAME;
var PORTAL_NAME = "TooltipPortal";
var [PortalProvider, usePortalContext] = createTooltipContext(PORTAL_NAME, {
  forceMount: void 0
});
var TooltipPortal = (props) => {
  const { __scopeTooltip, forceMount, children, container } = props;
  const context = useTooltipContext(PORTAL_NAME, __scopeTooltip);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PortalProvider, { scope: __scopeTooltip, forceMount, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { asChild: true, container, children }) }) });
};
TooltipPortal.displayName = PORTAL_NAME;
var CONTENT_NAME = "TooltipContent";
var TooltipContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const portalContext = usePortalContext(CONTENT_NAME, props.__scopeTooltip);
    const { forceMount = portalContext.forceMount, side = "top", ...contentProps } = props;
    const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.open, children: context.disableHoverableContent ? /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentImpl, { side, ...contentProps, ref: forwardedRef }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentHoverable, { side, ...contentProps, ref: forwardedRef }) });
  }
);
var TooltipContentHoverable = reactExports.forwardRef((props, forwardedRef) => {
  const context = useTooltipContext(CONTENT_NAME, props.__scopeTooltip);
  const providerContext = useTooltipProviderContext(CONTENT_NAME, props.__scopeTooltip);
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const [pointerGraceArea, setPointerGraceArea] = reactExports.useState(null);
  const { trigger, onClose } = context;
  const content = ref.current;
  const { onPointerInTransitChange } = providerContext;
  const handleRemoveGraceArea = reactExports.useCallback(() => {
    setPointerGraceArea(null);
    onPointerInTransitChange(false);
  }, [onPointerInTransitChange]);
  const handleCreateGraceArea = reactExports.useCallback(
    (event, hoverTarget) => {
      const currentTarget = event.currentTarget;
      const exitPoint = { x: event.clientX, y: event.clientY };
      const exitSide = getExitSideFromRect(exitPoint, currentTarget.getBoundingClientRect());
      const paddedExitPoints = getPaddedExitPoints(exitPoint, exitSide);
      const hoverTargetPoints = getPointsFromRect(hoverTarget.getBoundingClientRect());
      const graceArea = getHull([...paddedExitPoints, ...hoverTargetPoints]);
      setPointerGraceArea(graceArea);
      onPointerInTransitChange(true);
    },
    [onPointerInTransitChange]
  );
  reactExports.useEffect(() => {
    return () => handleRemoveGraceArea();
  }, [handleRemoveGraceArea]);
  reactExports.useEffect(() => {
    if (trigger && content) {
      const handleTriggerLeave = (event) => handleCreateGraceArea(event, content);
      const handleContentLeave = (event) => handleCreateGraceArea(event, trigger);
      trigger.addEventListener("pointerleave", handleTriggerLeave);
      content.addEventListener("pointerleave", handleContentLeave);
      return () => {
        trigger.removeEventListener("pointerleave", handleTriggerLeave);
        content.removeEventListener("pointerleave", handleContentLeave);
      };
    }
  }, [trigger, content, handleCreateGraceArea, handleRemoveGraceArea]);
  reactExports.useEffect(() => {
    if (pointerGraceArea) {
      const handleTrackPointerGrace = (event) => {
        const target = event.target;
        const pointerPosition = { x: event.clientX, y: event.clientY };
        const hasEnteredTarget = (trigger == null ? void 0 : trigger.contains(target)) || (content == null ? void 0 : content.contains(target));
        const isPointerOutsideGraceArea = !isPointInPolygon(pointerPosition, pointerGraceArea);
        if (hasEnteredTarget) {
          handleRemoveGraceArea();
        } else if (isPointerOutsideGraceArea) {
          handleRemoveGraceArea();
          onClose();
        }
      };
      document.addEventListener("pointermove", handleTrackPointerGrace);
      return () => document.removeEventListener("pointermove", handleTrackPointerGrace);
    }
  }, [trigger, content, pointerGraceArea, onClose, handleRemoveGraceArea]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipContentImpl, { ...props, ref: composedRefs });
});
var [VisuallyHiddenContentContextProvider, useVisuallyHiddenContentContext] = createTooltipContext(TOOLTIP_NAME, { isInside: false });
var Slottable = createSlottable("TooltipContent");
var TooltipContentImpl = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTooltip,
      children,
      "aria-label": ariaLabel,
      onEscapeKeyDown,
      onPointerDownOutside,
      ...contentProps
    } = props;
    const context = useTooltipContext(CONTENT_NAME, __scopeTooltip);
    const popperScope = usePopperScope(__scopeTooltip);
    const { onClose } = context;
    reactExports.useEffect(() => {
      document.addEventListener(TOOLTIP_OPEN, onClose);
      return () => document.removeEventListener(TOOLTIP_OPEN, onClose);
    }, [onClose]);
    reactExports.useEffect(() => {
      if (context.trigger) {
        const handleScroll = (event) => {
          const target = event.target;
          if (target == null ? void 0 : target.contains(context.trigger)) onClose();
        };
        window.addEventListener("scroll", handleScroll, { capture: true });
        return () => window.removeEventListener("scroll", handleScroll, { capture: true });
      }
    }, [context.trigger, onClose]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DismissableLayer,
      {
        asChild: true,
        disableOutsidePointerEvents: false,
        onEscapeKeyDown,
        onPointerDownOutside,
        onFocusOutside: (event) => event.preventDefault(),
        onDismiss: onClose,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Content,
          {
            "data-state": context.stateAttribute,
            ...popperScope,
            ...contentProps,
            ref: forwardedRef,
            style: {
              ...contentProps.style,
              // re-namespace exposed content custom properties
              ...{
                "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
                "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
                "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
                "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
                "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
              }
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Slottable, { children }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHiddenContentContextProvider, { scope: __scopeTooltip, isInside: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { id: context.contentId, role: "tooltip", children: ariaLabel || children }) })
            ]
          }
        )
      }
    );
  }
);
TooltipContent$1.displayName = CONTENT_NAME;
var ARROW_NAME = "TooltipArrow";
var TooltipArrow = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTooltip, ...arrowProps } = props;
    const popperScope = usePopperScope(__scopeTooltip);
    const visuallyHiddenContentContext = useVisuallyHiddenContentContext(
      ARROW_NAME,
      __scopeTooltip
    );
    return visuallyHiddenContentContext.isInside ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow, { ...popperScope, ...arrowProps, ref: forwardedRef });
  }
);
TooltipArrow.displayName = ARROW_NAME;
function getExitSideFromRect(point, rect) {
  const top = Math.abs(rect.top - point.y);
  const bottom = Math.abs(rect.bottom - point.y);
  const right = Math.abs(rect.right - point.x);
  const left = Math.abs(rect.left - point.x);
  switch (Math.min(top, bottom, right, left)) {
    case left:
      return "left";
    case right:
      return "right";
    case top:
      return "top";
    case bottom:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function getPaddedExitPoints(exitPoint, exitSide, padding = 5) {
  const paddedExitPoints = [];
  switch (exitSide) {
    case "top":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y + padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "bottom":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y - padding }
      );
      break;
    case "left":
      paddedExitPoints.push(
        { x: exitPoint.x + padding, y: exitPoint.y - padding },
        { x: exitPoint.x + padding, y: exitPoint.y + padding }
      );
      break;
    case "right":
      paddedExitPoints.push(
        { x: exitPoint.x - padding, y: exitPoint.y - padding },
        { x: exitPoint.x - padding, y: exitPoint.y + padding }
      );
      break;
  }
  return paddedExitPoints;
}
function getPointsFromRect(rect) {
  const { top, right, bottom, left } = rect;
  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom }
  ];
}
function isPointInPolygon(point, polygon) {
  const { x, y } = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const ii = polygon[i];
    const jj = polygon[j];
    const xi = ii.x;
    const yi = ii.y;
    const xj = jj.x;
    const yj = jj.y;
    const intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
function getHull(points) {
  const newPoints = points.slice();
  newPoints.sort((a, b) => {
    if (a.x < b.x) return -1;
    else if (a.x > b.x) return 1;
    else if (a.y < b.y) return -1;
    else if (a.y > b.y) return 1;
    else return 0;
  });
  return getHullPresorted(newPoints);
}
function getHullPresorted(points) {
  if (points.length <= 1) return points.slice();
  const upperHull = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    while (upperHull.length >= 2) {
      const q = upperHull[upperHull.length - 1];
      const r = upperHull[upperHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) upperHull.pop();
      else break;
    }
    upperHull.push(p);
  }
  upperHull.pop();
  const lowerHull = [];
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    while (lowerHull.length >= 2) {
      const q = lowerHull[lowerHull.length - 1];
      const r = lowerHull[lowerHull.length - 2];
      if ((q.x - r.x) * (p.y - r.y) >= (q.y - r.y) * (p.x - r.x)) lowerHull.pop();
      else break;
    }
    lowerHull.push(p);
  }
  lowerHull.pop();
  if (upperHull.length === 1 && lowerHull.length === 1 && upperHull[0].x === lowerHull[0].x && upperHull[0].y === lowerHull[0].y) {
    return upperHull;
  } else {
    return upperHull.concat(lowerHull);
  }
}
var Provider = TooltipProvider$1;
var Root3 = Tooltip$1;
var Trigger = TooltipTrigger$1;
var Portal = TooltipPortal;
var Content2 = TooltipContent$1;
var Arrow2 = TooltipArrow;
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Root3, { "data-slot": "tooltip", ...props }) });
}
function TooltipTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "tooltip-trigger", ...props });
}
function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Content2,
    {
      "data-slot": "tooltip-content",
      sideOffset,
      className: cn(
        "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Arrow2, { className: "bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" })
      ]
    }
  ) });
}
const PERMISSIONS = [
  {
    id: "view_devices",
    label: "View Devices",
    description: "Read device metadata, status, and location",
    category: "Devices",
    icon: Server
  },
  {
    id: "edit_devices",
    label: "Edit Devices",
    description: "Modify device configuration, location, and metadata",
    category: "Devices",
    icon: Pen
  },
  {
    id: "delete_devices",
    label: "Delete Devices",
    description: "Remove devices from the inventory permanently",
    category: "Devices",
    icon: Trash2
  },
  {
    id: "view_topology",
    label: "View Topology",
    description: "View L1/L2/L3 network topology graphs",
    category: "Topology",
    icon: Eye
  },
  {
    id: "edit_topology",
    label: "Edit Topology",
    description: "Add, remove, or modify fiber links and topology elements",
    category: "Topology",
    icon: Pencil
  },
  {
    id: "create_workflow",
    label: "Create Workflow",
    description: "Build new automation workflows and triggers",
    category: "Workflows",
    icon: Workflow
  },
  {
    id: "execute_workflow",
    label: "Execute Workflow",
    description: "Run existing workflows on demand or on schedule",
    category: "Workflows",
    icon: Zap
  },
  {
    id: "delete_workflow",
    label: "Delete Workflow",
    description: "Permanently remove workflows from the system",
    category: "Workflows",
    icon: Trash2
  },
  {
    id: "view_alerts",
    label: "View Alerts",
    description: "See active and historical network alerts",
    category: "Alerts",
    icon: Bell
  },
  {
    id: "ack_alerts",
    label: "Acknowledge Alerts",
    description: "Acknowledge alert notifications to indicate awareness",
    category: "Alerts",
    icon: Check
  },
  {
    id: "clear_alerts",
    label: "Clear Alerts",
    description: "Close and archive resolved alerts",
    category: "Alerts",
    icon: ShieldCheck
  },
  {
    id: "view_users",
    label: "View Users",
    description: "View user list, profiles, and session information",
    category: "Users",
    icon: Users
  },
  {
    id: "manage_users",
    label: "Manage Users",
    description: "Invite, disable, assign roles, and force logout users",
    category: "Users",
    icon: Settings
  },
  {
    id: "view_billing",
    label: "View Billing",
    description: "Access invoices, subscription info, and billing history",
    category: "Billing",
    icon: CreditCard
  },
  {
    id: "export_reports",
    label: "Export Reports",
    description: "Download CSV, PDF reports from any module",
    category: "Reports",
    icon: Download
  },
  {
    id: "access_map",
    label: "Access Map",
    description: "View the GIS network map dashboard",
    category: "Map",
    icon: Map$1
  },
  {
    id: "draw_routes",
    label: "Draw Routes",
    description: "Draw and edit fiber routes on the map",
    category: "Map",
    icon: Route
  },
  {
    id: "api_access",
    label: "API Access",
    description: "Use API keys and access the REST/GraphQL API",
    category: "API",
    icon: Wrench
  },
  {
    id: "view_audit",
    label: "View Audit Logs",
    description: "Read the full platform audit trail and compliance logs",
    category: "Audit",
    icon: FileText
  },
  {
    id: "ai_assistant",
    label: "AI Assistant",
    description: "Use the AI copilot for fault diagnosis and optimization",
    category: "AI",
    icon: Brain
  }
];
const ROLES = ["Admin", "Network Engineer", "NOC Operator", "Viewer"];
function buildDefault() {
  const m = {};
  for (const p of PERMISSIONS) {
    m[p.id] = {
      Admin: true,
      "Network Engineer": [
        "view_devices",
        "edit_devices",
        "view_topology",
        "edit_topology",
        "create_workflow",
        "execute_workflow",
        "view_alerts",
        "ack_alerts",
        "clear_alerts",
        "view_users",
        "export_reports",
        "access_map",
        "draw_routes",
        "api_access",
        "ai_assistant"
      ].includes(p.id),
      "NOC Operator": [
        "view_devices",
        "view_topology",
        "view_alerts",
        "ack_alerts",
        "clear_alerts",
        "view_users",
        "access_map",
        "ai_assistant"
      ].includes(p.id),
      Viewer: [
        "view_devices",
        "view_topology",
        "view_alerts",
        "access_map"
      ].includes(p.id)
    };
  }
  return m;
}
const DEFAULT_MATRIX = buildDefault();
const INITIAL_ABAC = [
  {
    id: "r1",
    name: "Network Engineer — India Region Only",
    description: "Network Engineers can only access devices in the India region",
    role: "Network Engineer",
    attributeType: "Region",
    condition: "Is",
    value: "India",
    effect: "Allow",
    active: true
  },
  {
    id: "r2",
    name: "NOC Operator — No Billing Access",
    description: "NOC Operators cannot view billing information or subscription details",
    role: "NOC Operator",
    attributeType: "Feature Category",
    condition: "Is",
    value: "Billing",
    effect: "Deny",
    active: true
  },
  {
    id: "r3",
    name: "Viewer — Read Only on Alerts",
    description: "Viewers can only view alerts, not acknowledge or close them",
    role: "Viewer",
    attributeType: "Feature Category",
    condition: "Contains",
    value: "Alerts",
    effect: "Allow",
    active: true
  },
  {
    id: "r4",
    name: "EU GDPR Compliance Barrier",
    description: "EU-region data accessible only to operators with GDPR clearance",
    role: "Network Engineer",
    attributeType: "Region",
    condition: "Is",
    value: "EU",
    effect: "Allow",
    active: false
  },
  {
    id: "r5",
    name: "OLT Device Restriction",
    description: "Viewers cannot access OLT device configurations",
    role: "Viewer",
    attributeType: "Device Type",
    condition: "Is",
    value: "OLT",
    effect: "Deny",
    active: true
  },
  {
    id: "r6",
    name: "NOC — US Region Scope",
    description: "NOC Operators assigned to US region can acknowledge alerts for US tenants only",
    role: "NOC Operator",
    attributeType: "Region",
    condition: "Is",
    value: "US",
    effect: "Allow",
    active: true
  },
  {
    id: "r7",
    name: "Engineer — No Delete Devices",
    description: "Network Engineers cannot permanently delete devices without Admin approval",
    role: "Network Engineer",
    attributeType: "Feature Category",
    condition: "Is",
    value: "Device Delete",
    effect: "Deny",
    active: true
  }
];
const ROLE_META = {
  Admin: {
    color: "text-red-400",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    icon: Shield,
    count: 148
  },
  "Network Engineer": {
    color: "text-blue-400",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    icon: Wrench,
    count: 612
  },
  "NOC Operator": {
    color: "text-amber-400",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    icon: Eye,
    count: 943
  },
  Viewer: {
    color: "text-slate-400",
    badge: "bg-muted/40 text-muted-foreground border-border",
    icon: Info,
    count: 741
  }
};
const CATEGORY_ORDER = [
  "Devices",
  "Topology",
  "Workflows",
  "Alerts",
  "Users",
  "Billing",
  "Reports",
  "Map",
  "API",
  "Audit",
  "AI"
];
function groupedPermissions() {
  const map = /* @__PURE__ */ new Map();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const p of PERMISSIONS) {
    const arr = map.get(p.category);
    if (arr) arr.push(p);
  }
  return Array.from(map.entries()).filter(([, p]) => p.length > 0).map(([category, perms]) => ({ category, perms }));
}
function AddRuleModal({
  open,
  onClose,
  onAdd
}) {
  const [name, setName] = reactExports.useState("");
  const [desc, setDesc] = reactExports.useState("");
  const [role, setRole] = reactExports.useState("Admin");
  const [attrType, setAttrType] = reactExports.useState("Region");
  const [condition, setCondition] = reactExports.useState("Is");
  const [value, setValue] = reactExports.useState("");
  const [effect, setEffect] = reactExports.useState("Allow");
  function reset() {
    setName("");
    setDesc("");
    setRole("Admin");
    setAttrType("Region");
    setCondition("Is");
    setValue("");
    setEffect("Allow");
  }
  function handleClose() {
    reset();
    onClose();
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !value.trim()) return;
    onAdd({
      id: `abac-${Date.now()}`,
      name,
      description: desc,
      role,
      attributeType: attrType,
      condition,
      value,
      effect,
      active: true
    });
    ue.success("ABAC rule created", { description: name });
    handleClose();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: handleClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "bg-card border-border max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-display text-foreground flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-violet-400" }),
      "Add ABAC Rule"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Rule Name *" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            value: name,
            onChange: (e) => setName(e.target.value),
            placeholder: "India Region Isolation",
            className: "bg-background border-input",
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Textarea,
          {
            value: desc,
            onChange: (e) => setDesc(e.target.value),
            placeholder: "Describe what this rule restricts or allows",
            className: "bg-background border-input text-sm resize-none h-18",
            rows: 3
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Applies To Role" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: role, onValueChange: (v) => setRole(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { className: "bg-popover border-border", children: ROLES.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Effect" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: effect,
              onValueChange: (v) => setEffect(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-popover border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Allow", children: "Allow" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Deny", children: "Deny" })
                ] })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Attribute" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: attrType,
              onValueChange: (v) => setAttrType(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-popover border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Region", children: "Region" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Device Type", children: "Device Type" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Feature Category", children: "Feature Category" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Condition" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Select,
            {
              value: condition,
              onValueChange: (v) => setCondition(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "bg-background border-input text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { className: "bg-popover border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Is", children: "Is" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Is Not", children: "Is Not" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "Contains", children: "Contains" })
                ] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs text-muted-foreground", children: "Value *" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              value,
              onChange: (e) => setValue(e.target.value),
              placeholder: "India",
              className: "bg-background border-input text-xs",
              required: true
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "button",
            variant: "outline",
            onClick: handleClose,
            className: "flex-1 border-border",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            type: "submit",
            className: "flex-1 bg-primary text-primary-foreground",
            "data-ocid": "abac-rule-submit",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 mr-1" }),
              "Add Rule"
            ]
          }
        )
      ] })
    ] })
  ] }) });
}
function RBACTab({
  matrix,
  setMatrix
}) {
  const groups = reactExports.useMemo(groupedPermissions, []);
  const [saved, setSaved] = reactExports.useState(false);
  function toggle(permId, role, val) {
    if (role === "Admin") return;
    setMatrix((prev) => ({
      ...prev,
      [permId]: { ...prev[permId], [role]: val }
    }));
  }
  function handleReset() {
    setMatrix(buildDefault());
    ue.info("Permissions reset to defaults");
  }
  function handleSave() {
    setSaved(true);
    ue.success("Permissions saved successfully", {
      description: "Changes will take effect on next session refresh."
    });
    setTimeout(() => setSaved(false), 2500);
  }
  const permCountByRole = reactExports.useMemo(
    () => ({
      Admin: PERMISSIONS.length,
      "Network Engineer": PERMISSIONS.filter(
        (p) => {
          var _a;
          return (_a = matrix[p.id]) == null ? void 0 : _a["Network Engineer"];
        }
      ).length,
      "NOC Operator": PERMISSIONS.filter((p) => {
        var _a;
        return (_a = matrix[p.id]) == null ? void 0 : _a["NOC Operator"];
      }).length,
      Viewer: PERMISSIONS.filter((p) => {
        var _a;
        return (_a = matrix[p.id]) == null ? void 0 : _a.Viewer;
      }).length
    }),
    [matrix]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: ROLES.map((role) => {
      const { badge, icon: Icon } = ROLE_META[role];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-4 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${badge}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs font-semibold text-foreground font-display truncate", children: role }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-muted-foreground", children: [
            permCountByRole[role],
            "/",
            PERMISSIONS.length,
            " permissions",
            role === "Admin" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 text-amber-400 text-[10px]", children: "(locked)" })
          ] })
        ] })
      ] }, role);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 300, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm min-w-[700px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest w-64", children: "Permission" }),
        ROLES.map((role) => {
          const { badge } = ROLE_META[role];
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "th",
            {
              className: "px-4 py-3 text-center min-w-[130px]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs px-2.5 py-1 border ${badge}`, children: role })
            },
            role
          );
        })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: groups.map(({ category, perms }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-display font-bold uppercase tracking-[0.18em] text-muted-foreground/60", children: category }) }) }, `cat-${category}`),
        perms.map((perm, ri) => {
          const Icon = perm.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-border/20 last:border-0 transition-colors hover:bg-muted/10 ${ri % 2 === 0 ? "" : "bg-muted/5"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 cursor-default w-fit", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-foreground font-body", children: perm.label }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3 h-3 text-muted-foreground/40" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    TooltipContent,
                    {
                      side: "right",
                      className: "bg-popover border-border text-xs max-w-[240px]",
                      children: perm.description
                    }
                  )
                ] }) }),
                ROLES.map((role) => {
                  var _a;
                  const isAdmin = role === "Admin";
                  const checked = ((_a = matrix[perm.id]) == null ? void 0 : _a[role]) ?? false;
                  return /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Checkbox,
                    {
                      checked,
                      onCheckedChange: (v) => {
                        toggle(perm.id, role, !!v);
                        if (!isAdmin) {
                          ue.success(
                            `${perm.label} ${v ? "enabled" : "disabled"} for ${role}`,
                            { duration: 2e3 }
                          );
                        }
                      },
                      disabled: isAdmin,
                      "data-ocid": `perm-${perm.id}-${role.replace(/\s+/g, "-").toLowerCase()}`,
                      className: isAdmin ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                    }
                  ) }) }, role);
                })
              ]
            },
            perm.id
          );
        })
      ] })) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          onClick: handleSave,
          className: "bg-primary text-primary-foreground gap-2",
          "data-ocid": "rbac-save-btn",
          children: [
            saved ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-4 h-4" }),
            saved ? "Saved!" : "Save Changes"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          onClick: handleReset,
          className: "gap-2 border-border",
          "data-ocid": "rbac-reset-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-4 h-4" }),
            "Reset to Defaults"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          className: "gap-2 border-border ml-auto",
          "data-ocid": "rbac-export-btn",
          onClick: () => {
            const json = JSON.stringify(
              { matrix, exportedAt: (/* @__PURE__ */ new Date()).toISOString() },
              null,
              2
            );
            const blob = new Blob([json], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "rbac-policy.json";
            a.click();
            URL.revokeObjectURL(url);
            ue.success("Policy exported as JSON");
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-4 h-4" }),
            "Export Policy"
          ]
        }
      )
    ] })
  ] });
}
function ABACTab({
  rules,
  setRules
}) {
  const [addOpen, setAddOpen] = reactExports.useState(false);
  function toggleActive(id) {
    setRules(
      (prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r)
    );
  }
  function deleteRule(id) {
    setRules((prev) => prev.filter((r) => r.id !== id));
    ue.success("Rule deleted");
  }
  function handleAdd(rule) {
    setRules((prev) => [rule, ...prev]);
  }
  const effectColor = (effect) => effect === "Allow" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-red-500/15 text-red-400 border-red-500/30";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Attribute-based rules augment role permissions with contextual constraints (region, device type, feature access)." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          onClick: () => setAddOpen(true),
          className: "bg-primary text-primary-foreground gap-1.5",
          "data-ocid": "add-abac-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
            "Add Rule"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 xl:grid-cols-2 gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: rules.map((rule, i) => {
      const { badge, icon: RoleIcon } = ROLE_META[rule.role];
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95 },
          transition: { delay: i * 0.04 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              className: `p-4 border-l-2 ${rule.active ? "border-l-primary" : "border-l-muted-foreground/30"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleIcon, { className: "w-4 h-4 text-muted-foreground flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `text-sm font-semibold font-display truncate ${rule.active ? "text-foreground" : "text-muted-foreground/60"}`,
                        children: rule.name
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        checked: rule.active,
                        onCheckedChange: () => toggleActive(rule.id),
                        "data-ocid": `abac-toggle-${rule.id}`,
                        className: "scale-75 data-[state=checked]:bg-emerald-500"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => deleteRule(rule.id),
                        className: "text-muted-foreground hover:text-destructive transition-colors",
                        "aria-label": "Delete rule",
                        "data-ocid": `abac-delete-${rule.id}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-3 leading-relaxed", children: rule.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs px-2 py-0.5 border ${badge}`, children: rule.role }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs px-2 py-0.5 border-border font-mono text-muted-foreground",
                      children: rule.attributeType
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs px-2 py-0.5 border-border font-mono text-muted-foreground",
                      children: rule.condition
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: "text-xs px-2 py-0.5 border-border font-mono text-primary",
                      children: [
                        '"',
                        rule.value,
                        '"'
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      className: `text-xs px-2 py-0.5 border ${effectColor(rule.effect)}`,
                      children: rule.effect
                    }
                  )
                ] })
              ]
            }
          )
        },
        rule.id
      );
    }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AddRuleModal,
      {
        open: addOpen,
        onClose: () => setAddOpen(false),
        onAdd: handleAdd
      }
    )
  ] });
}
function AppliedRolesSummary({
  matrix,
  rules
}) {
  const rows = reactExports.useMemo(
    () => ROLES.map((role) => ({
      role,
      permCount: PERMISSIONS.filter((p) => {
        var _a;
        return (_a = matrix[p.id]) == null ? void 0 : _a[role];
      }).length,
      abacCount: rules.filter((r) => r.role === role && r.active).length
    })),
    [matrix, rules]
  );
  function handleExport() {
    const policy = {
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      rbac: Object.fromEntries(
        ROLES.map((r) => [
          r,
          PERMISSIONS.filter((p) => {
            var _a;
            return (_a = matrix[p.id]) == null ? void 0 : _a[r];
          }).map((p) => p.id)
        ])
      ),
      abac: rules.filter((r) => r.active)
    };
    const blob = new Blob([JSON.stringify(policy, null, 2)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "access-policy.json";
    a.click();
    URL.revokeObjectURL(url);
    ue.success("Full policy exported");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-b border-border/50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest", children: "Applied Roles Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: handleExport,
          className: "gap-1.5 border-border text-xs",
          "data-ocid": "export-policy-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
            "Export Policy"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Role" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-center text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Permissions Granted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-center text-xs font-display text-muted-foreground uppercase tracking-widest", children: "Active ABAC Rules" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-center text-xs font-display text-muted-foreground uppercase tracking-widest", children: "User Count" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map(({ role, permCount, abacCount }, i) => {
        const { badge, icon: Icon } = ROLE_META[role];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: `border-b border-border/20 last:border-0 ${i % 2 === 0 ? "bg-muted/5" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-3.5 h-3.5 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: `text-xs px-2 py-0.5 border ${badge}`, children: role })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-2.5 text-center text-xs text-foreground font-mono", children: [
                permCount,
                " / ",
                PERMISSIONS.length
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center text-xs", children: abacCount > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-primary/15 text-primary border border-primary/30 text-xs px-2", children: abacCount }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/50", children: "—" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center text-xs text-muted-foreground font-mono", children: ROLE_META[role].count.toLocaleString() })
            ]
          },
          role
        );
      }) })
    ] })
  ] });
}
function CompanyRoleTable() {
  const companies = reactExports.useMemo(() => MOCK_COMPANIES.slice(0, 12), []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-x-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest", children: "Company Role Distribution" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/40", children: [
        "Company",
        "Region",
        "Plan",
        "Admins",
        "Engineers",
        "Operators",
        "Viewers"
      ].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-2.5 text-left text-xs font-display text-muted-foreground uppercase tracking-widest first:text-left [&:not(:first-child)]:text-center",
          children: h
        },
        h
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: companies.map((co, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: `border-b border-border/20 last:border-0 hover:bg-muted/10 transition-colors ${i % 2 === 0 ? "bg-muted/5" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs font-medium text-foreground truncate max-w-[180px]", children: co.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-xs text-muted-foreground text-center", children: co.region }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs px-2 font-mono border-border",
                children: co.plan
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center text-xs text-red-400 font-mono", children: Math.max(1, Math.floor(co.activeUsers * 0.05)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center text-xs text-blue-400 font-mono", children: Math.floor(co.activeUsers * 0.25) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center text-xs text-amber-400 font-mono", children: Math.floor(co.activeUsers * 0.4) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-center text-xs text-muted-foreground font-mono", children: Math.floor(co.activeUsers * 0.3) })
          ]
        },
        co.id
      )) })
    ] })
  ] });
}
function AccessControl() {
  const [tab, setTab] = reactExports.useState("rbac");
  const [matrix, setMatrix] = reactExports.useState(DEFAULT_MATRIX);
  const [abacRules, setAbacRules] = reactExports.useState(INITIAL_ABAC);
  const handleSetMatrix = reactExports.useCallback(setMatrix, []);
  const handleSetRules = reactExports.useCallback(setAbacRules, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 md:p-6 space-y-5 md:space-y-8 max-w-[1600px]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5 text-violet-400" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: "Access Control" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-mono tracking-wider", children: "Configure role-based and attribute-based permissions" })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 bg-muted/30 p-1 rounded-xl w-fit border border-border/40", children: ["rbac", "abac"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => setTab(t),
        "data-ocid": `tab-${t}`,
        className: `px-5 py-2 rounded-lg text-sm font-display font-medium transition-smooth ${tab === t ? "bg-card text-foreground shadow-sm border border-border/60" : "text-muted-foreground hover:text-foreground"}`,
        children: t === "rbac" ? "Role Permissions (RBAC)" : "Attribute Rules (ABAC)"
      },
      t
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 6 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -6 },
        transition: { duration: 0.2 },
        children: tab === "rbac" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RBACTab, { matrix, setMatrix: handleSetMatrix }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ABACTab, { rules: abacRules, setRules: handleSetRules })
      },
      tab
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Applied Roles Summary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AppliedRolesSummary, { matrix, rules: abacRules })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3", children: "Company Role Distribution" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompanyRoleTable, {})
    ] })
  ] });
}
export {
  AccessControl as default
};
