import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as cn, aw as useComposedRefs, ax as useControllableState, ay as Primitive$1, az as composeEventHandlers, aA as createContextScope$1, aB as useId, aC as useCallbackRef, aD as Presence, aE as FeatureFlag, aF as Key, f as Activity, T as TriangleAlert, a3 as Badge, _ as Clock, a7 as Zap, aG as Settings, a9 as CircleAlert } from "./index-Bz87mU_A.js";
import { F as FeatureGate } from "./PlanComparisonModal-Dub5z98I.js";
import { B as Button } from "./button-B8BV977f.js";
import "./PlanBadge-Dypcn2AC.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardContent } from "./card-C7p6v-oD.js";
import { C as Checkbox } from "./checkbox-BzJilGl1.js";
import { I as Input } from "./input-Ct4jxOCV.js";
import { L as Label } from "./label-BsahP53Y.js";
import { P as Primitive } from "./index-DIQbJmXm.js";
import { u as usePrevious, a as useSize, c as createCollection, b as useDirection } from "./index-BRAlCdAC.js";
import { a as MOCK_API_KEYS, b as MOCK_WEBHOOKS } from "./billingMockData-BghbV9Ao.js";
import { u as useSubscription } from "./useFeature-DvuTyGvk.js";
import { u as ue } from "./index-DgwStYqm.js";
import { P as Plus } from "./plus-BlLogfFb.js";
import { C as Check } from "./check-De6YUaVJ.js";
import { C as Copy } from "./copy-DnZARftl.js";
import { E as EyeOff } from "./eye-off-C7q-6qZX.js";
import { E as Eye } from "./eye-DTk2xKs-.js";
import { T as Trash2 } from "./trash-2-D1n93NYm.js";
import { G as Globe } from "./globe-eG_kpapZ.js";
import { R as RefreshCw } from "./refresh-cw-CQCVoy3A.js";
import { C as ChevronUp } from "./chevron-up-CfiHYuF5.js";
import { C as CircleCheck } from "./circle-check-CwLysUcB.js";
import "./lock-keyhole-CM752Mkt.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M9 17H7A5 5 0 0 1 7 7h2", key: "8i5ue5" }],
  ["path", { d: "M15 7h2a5 5 0 1 1 0 10h-2", key: "1b9ql8" }],
  ["line", { x1: "8", x2: "16", y1: "12", y2: "12", key: "1jonct" }]
];
const Link2 = createLucideIcon("link-2", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
const Terminal = createLucideIcon("terminal", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m19 5 3-3", key: "yk6iyv" }],
  ["path", { d: "m2 22 3-3", key: "19mgm9" }],
  [
    "path",
    { d: "M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z", key: "goz73y" }
  ],
  ["path", { d: "M7.5 13.5 10 11", key: "7xgeeb" }],
  ["path", { d: "M10.5 16.5 13 14", key: "10btkg" }],
  [
    "path",
    { d: "m12 6 6 6 2.3-2.3a2.4 2.4 0 0 0 0-3.4l-2.6-2.6a2.4 2.4 0 0 0-3.4 0Z", key: "1snsnr" }
  ]
];
const Unplug = createLucideIcon("unplug", __iconNode$1);
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
      d: "M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2",
      key: "q3hayz"
    }
  ],
  ["path", { d: "m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06", key: "1go1hn" }],
  ["path", { d: "m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8", key: "qlwsc0" }]
];
const Webhook = createLucideIcon("webhook", __iconNode);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root$2 = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$2,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
var SWITCH_NAME = "Switch";
var [createSwitchContext] = createContextScope$1(SWITCH_NAME);
var [SwitchProvider, useSwitchContext] = createSwitchContext(SWITCH_NAME);
var Switch$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeSwitch,
      name,
      checked: checkedProp,
      defaultChecked,
      required,
      disabled,
      value = "on",
      onCheckedChange,
      form,
      ...switchProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    const [checked, setChecked] = useControllableState({
      prop: checkedProp,
      defaultProp: defaultChecked ?? false,
      onChange: onCheckedChange,
      caller: SWITCH_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(SwitchProvider, { scope: __scopeSwitch, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.button,
        {
          type: "button",
          role: "switch",
          "aria-checked": checked,
          "aria-required": required,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...switchProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            setChecked((prevChecked) => !prevChecked);
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        SwitchBubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Switch$1.displayName = SWITCH_NAME;
var THUMB_NAME = "SwitchThumb";
var SwitchThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeSwitch, ...thumbProps } = props;
    const context = useSwitchContext(THUMB_NAME, __scopeSwitch);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...thumbProps,
        ref: forwardedRef
      }
    );
  }
);
SwitchThumb.displayName = THUMB_NAME;
var BUBBLE_INPUT_NAME = "SwitchBubbleInput";
var SwitchBubbleInput = reactExports.forwardRef(
  ({
    __scopeSwitch,
    control,
    checked,
    bubbles = true,
    ...props
  }, forwardedRef) => {
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(ref, forwardedRef);
    const prevChecked = usePrevious(checked);
    const controlSize = useSize(control);
    reactExports.useEffect(() => {
      const input = ref.current;
      if (!input) return;
      const inputProto = window.HTMLInputElement.prototype;
      const descriptor = Object.getOwnPropertyDescriptor(
        inputProto,
        "checked"
      );
      const setChecked = descriptor.set;
      if (prevChecked !== checked && setChecked) {
        const event = new Event("click", { bubbles });
        setChecked.call(input, checked);
        input.dispatchEvent(event);
      }
    }, [prevChecked, checked, bubbles]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "checkbox",
        "aria-hidden": true,
        defaultChecked: checked,
        ...props,
        tabIndex: -1,
        ref: composedRefs,
        style: {
          ...props.style,
          ...controlSize,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0
        }
      }
    );
  }
);
SwitchBubbleInput.displayName = BUBBLE_INPUT_NAME;
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var Root$1 = Switch$1;
var Thumb = SwitchThumb;
function Switch({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "switch",
      className: cn(
        "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-input/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Thumb,
        {
          "data-slot": "switch-thumb",
          className: cn(
            "bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
          )
        }
      )
    }
  );
}
function Table({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "table-container",
      className: "relative w-full overflow-x-auto",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "table",
        {
          "data-slot": "table",
          className: cn("w-full caption-bottom text-sm", className),
          ...props
        }
      )
    }
  );
}
function TableHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn("[&_tr]:border-b", className),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableRow({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "tr",
    {
      "data-slot": "table-row",
      className: cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      ),
      ...props
    }
  );
}
var ENTRY_FOCUS = "rovingFocusGroup.onEntryFocus";
var EVENT_OPTIONS = { bubbles: false, cancelable: true };
var GROUP_NAME = "RovingFocusGroup";
var [Collection, useCollection, createCollectionScope] = createCollection(GROUP_NAME);
var [createRovingFocusGroupContext, createRovingFocusGroupScope] = createContextScope$1(
  GROUP_NAME,
  [createCollectionScope]
);
var [RovingFocusProvider, useRovingFocusContext] = createRovingFocusGroupContext(GROUP_NAME);
var RovingFocusGroup = reactExports.forwardRef(
  (props, forwardedRef) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Provider, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Collection.Slot, { scope: props.__scopeRovingFocusGroup, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RovingFocusGroupImpl, { ...props, ref: forwardedRef }) }) });
  }
);
RovingFocusGroup.displayName = GROUP_NAME;
var RovingFocusGroupImpl = reactExports.forwardRef((props, forwardedRef) => {
  const {
    __scopeRovingFocusGroup,
    orientation,
    loop = false,
    dir,
    currentTabStopId: currentTabStopIdProp,
    defaultCurrentTabStopId,
    onCurrentTabStopIdChange,
    onEntryFocus,
    preventScrollOnEntryFocus = false,
    ...groupProps
  } = props;
  const ref = reactExports.useRef(null);
  const composedRefs = useComposedRefs(forwardedRef, ref);
  const direction = useDirection(dir);
  const [currentTabStopId, setCurrentTabStopId] = useControllableState({
    prop: currentTabStopIdProp,
    defaultProp: defaultCurrentTabStopId ?? null,
    onChange: onCurrentTabStopIdChange,
    caller: GROUP_NAME
  });
  const [isTabbingBackOut, setIsTabbingBackOut] = reactExports.useState(false);
  const handleEntryFocus = useCallbackRef(onEntryFocus);
  const getItems = useCollection(__scopeRovingFocusGroup);
  const isClickFocusRef = reactExports.useRef(false);
  const [focusableItemsCount, setFocusableItemsCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener(ENTRY_FOCUS, handleEntryFocus);
      return () => node.removeEventListener(ENTRY_FOCUS, handleEntryFocus);
    }
  }, [handleEntryFocus]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RovingFocusProvider,
    {
      scope: __scopeRovingFocusGroup,
      orientation,
      dir: direction,
      loop,
      currentTabStopId,
      onItemFocus: reactExports.useCallback(
        (tabStopId) => setCurrentTabStopId(tabStopId),
        [setCurrentTabStopId]
      ),
      onItemShiftTab: reactExports.useCallback(() => setIsTabbingBackOut(true), []),
      onFocusableItemAdd: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount + 1),
        []
      ),
      onFocusableItemRemove: reactExports.useCallback(
        () => setFocusableItemsCount((prevCount) => prevCount - 1),
        []
      ),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive$1.div,
        {
          tabIndex: isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0,
          "data-orientation": orientation,
          ...groupProps,
          ref: composedRefs,
          style: { outline: "none", ...props.style },
          onMouseDown: composeEventHandlers(props.onMouseDown, () => {
            isClickFocusRef.current = true;
          }),
          onFocus: composeEventHandlers(props.onFocus, (event) => {
            const isKeyboardFocus = !isClickFocusRef.current;
            if (event.target === event.currentTarget && isKeyboardFocus && !isTabbingBackOut) {
              const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
              event.currentTarget.dispatchEvent(entryFocusEvent);
              if (!entryFocusEvent.defaultPrevented) {
                const items = getItems().filter((item) => item.focusable);
                const activeItem = items.find((item) => item.active);
                const currentItem = items.find((item) => item.id === currentTabStopId);
                const candidateItems = [activeItem, currentItem, ...items].filter(
                  Boolean
                );
                const candidateNodes = candidateItems.map((item) => item.ref.current);
                focusFirst(candidateNodes, preventScrollOnEntryFocus);
              }
            }
            isClickFocusRef.current = false;
          }),
          onBlur: composeEventHandlers(props.onBlur, () => setIsTabbingBackOut(false))
        }
      )
    }
  );
});
var ITEM_NAME = "RovingFocusGroupItem";
var RovingFocusGroupItem = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRovingFocusGroup,
      focusable = true,
      active = false,
      tabStopId,
      children,
      ...itemProps
    } = props;
    const autoId = useId();
    const id = tabStopId || autoId;
    const context = useRovingFocusContext(ITEM_NAME, __scopeRovingFocusGroup);
    const isCurrentTabStop = context.currentTabStopId === id;
    const getItems = useCollection(__scopeRovingFocusGroup);
    const { onFocusableItemAdd, onFocusableItemRemove, currentTabStopId } = context;
    reactExports.useEffect(() => {
      if (focusable) {
        onFocusableItemAdd();
        return () => onFocusableItemRemove();
      }
    }, [focusable, onFocusableItemAdd, onFocusableItemRemove]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Collection.ItemSlot,
      {
        scope: __scopeRovingFocusGroup,
        id,
        focusable,
        active,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive$1.span,
          {
            tabIndex: isCurrentTabStop ? 0 : -1,
            "data-orientation": context.orientation,
            ...itemProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!focusable) event.preventDefault();
              else context.onItemFocus(id);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => context.onItemFocus(id)),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if (event.key === "Tab" && event.shiftKey) {
                context.onItemShiftTab();
                return;
              }
              if (event.target !== event.currentTarget) return;
              const focusIntent = getFocusIntent(event, context.orientation, context.dir);
              if (focusIntent !== void 0) {
                if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
                event.preventDefault();
                const items = getItems().filter((item) => item.focusable);
                let candidateNodes = items.map((item) => item.ref.current);
                if (focusIntent === "last") candidateNodes.reverse();
                else if (focusIntent === "prev" || focusIntent === "next") {
                  if (focusIntent === "prev") candidateNodes.reverse();
                  const currentIndex = candidateNodes.indexOf(event.currentTarget);
                  candidateNodes = context.loop ? wrapArray(candidateNodes, currentIndex + 1) : candidateNodes.slice(currentIndex + 1);
                }
                setTimeout(() => focusFirst(candidateNodes));
              }
            }),
            children: typeof children === "function" ? children({ isCurrentTabStop, hasTabStop: currentTabStopId != null }) : children
          }
        )
      }
    );
  }
);
RovingFocusGroupItem.displayName = ITEM_NAME;
var MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function getDirectionAwareKey(key, dir) {
  if (dir !== "rtl") return key;
  return key === "ArrowLeft" ? "ArrowRight" : key === "ArrowRight" ? "ArrowLeft" : key;
}
function getFocusIntent(event, orientation, dir) {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && ["ArrowLeft", "ArrowRight"].includes(key)) return void 0;
  if (orientation === "horizontal" && ["ArrowUp", "ArrowDown"].includes(key)) return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
}
function focusFirst(candidates, preventScroll = false) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement;
  for (const candidate of candidates) {
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) return;
    candidate.focus({ preventScroll });
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) return;
  }
}
function wrapArray(array, startIndex) {
  return array.map((_, index) => array[(startIndex + index) % array.length]);
}
var Root = RovingFocusGroup;
var Item = RovingFocusGroupItem;
var TABS_NAME = "Tabs";
var [createTabsContext] = createContextScope$1(TABS_NAME, [
  createRovingFocusGroupScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var [TabsProvider, useTabsContext] = createTabsContext(TABS_NAME);
var Tabs$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeTabs,
      value: valueProp,
      onValueChange,
      defaultValue,
      orientation = "horizontal",
      dir,
      activationMode = "automatic",
      ...tabsProps
    } = props;
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      onChange: onValueChange,
      defaultProp: defaultValue ?? "",
      caller: TABS_NAME
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      TabsProvider,
      {
        scope: __scopeTabs,
        baseId: useId(),
        value,
        onValueChange: setValue,
        orientation,
        dir: direction,
        activationMode,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive$1.div,
          {
            dir: direction,
            "data-orientation": orientation,
            ...tabsProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
Tabs$1.displayName = TABS_NAME;
var TAB_LIST_NAME = "TabsList";
var TabsList$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, loop = true, ...listProps } = props;
    const context = useTabsContext(TAB_LIST_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Root,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        orientation: context.orientation,
        dir: context.dir,
        loop,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive$1.div,
          {
            role: "tablist",
            "aria-orientation": context.orientation,
            ...listProps,
            ref: forwardedRef
          }
        )
      }
    );
  }
);
TabsList$1.displayName = TAB_LIST_NAME;
var TRIGGER_NAME = "TabsTrigger";
var TabsTrigger$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, disabled = false, ...triggerProps } = props;
    const context = useTabsContext(TRIGGER_NAME, __scopeTabs);
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !disabled,
        active: isSelected,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Primitive$1.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": isSelected,
            "aria-controls": contentId,
            "data-state": isSelected ? "active" : "inactive",
            "data-disabled": disabled ? "" : void 0,
            disabled,
            id: triggerId,
            ...triggerProps,
            ref: forwardedRef,
            onMouseDown: composeEventHandlers(props.onMouseDown, (event) => {
              if (!disabled && event.button === 0 && event.ctrlKey === false) {
                context.onValueChange(value);
              } else {
                event.preventDefault();
              }
            }),
            onKeyDown: composeEventHandlers(props.onKeyDown, (event) => {
              if ([" ", "Enter"].includes(event.key)) context.onValueChange(value);
            }),
            onFocus: composeEventHandlers(props.onFocus, () => {
              const isAutomaticActivation = context.activationMode !== "manual";
              if (!isSelected && !disabled && isAutomaticActivation) {
                context.onValueChange(value);
              }
            })
          }
        )
      }
    );
  }
);
TabsTrigger$1.displayName = TRIGGER_NAME;
var CONTENT_NAME = "TabsContent";
var TabsContent$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeTabs, value, forceMount, children, ...contentProps } = props;
    const context = useTabsContext(CONTENT_NAME, __scopeTabs);
    const triggerId = makeTriggerId(context.baseId, value);
    const contentId = makeContentId(context.baseId, value);
    const isSelected = value === context.value;
    const isMountAnimationPreventedRef = reactExports.useRef(isSelected);
    reactExports.useEffect(() => {
      const rAF = requestAnimationFrame(() => isMountAnimationPreventedRef.current = false);
      return () => cancelAnimationFrame(rAF);
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || isSelected, children: ({ present }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive$1.div,
      {
        "data-state": isSelected ? "active" : "inactive",
        "data-orientation": context.orientation,
        role: "tabpanel",
        "aria-labelledby": triggerId,
        hidden: !present,
        id: contentId,
        tabIndex: 0,
        ...contentProps,
        ref: forwardedRef,
        style: {
          ...props.style,
          animationDuration: isMountAnimationPreventedRef.current ? "0s" : void 0
        },
        children: present && children
      }
    ) });
  }
);
TabsContent$1.displayName = CONTENT_NAME;
function makeTriggerId(baseId, value) {
  return `${baseId}-trigger-${value}`;
}
function makeContentId(baseId, value) {
  return `${baseId}-content-${value}`;
}
var Root2 = Tabs$1;
var List = TabsList$1;
var Trigger = TabsTrigger$1;
var Content = TabsContent$1;
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      "data-slot": "tabs",
      className: cn("flex flex-col gap-2", className),
      ...props
    }
  );
}
function TabsList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      "data-slot": "tabs-list",
      className: cn(
        "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
        className
      ),
      ...props
    }
  );
}
function TabsTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Trigger,
    {
      "data-slot": "tabs-trigger",
      className: cn(
        "data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      ),
      ...props
    }
  );
}
function TabsContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content,
    {
      "data-slot": "tabs-content",
      className: cn("flex-1 outline-none", className),
      ...props
    }
  );
}
const MS = 6e4;
const INTEGRATIONS = [
  // OSS/BSS
  {
    id: "opennms",
    name: "OpenNMS",
    category: "OSS/BSS",
    status: "connected",
    lastSync: Date.now() - 8 * MS,
    icon: "ON",
    iconBg: "bg-sky-500/20 text-sky-400",
    description: "Open-source network management platform for SNMP polling and event correlation."
  },
  {
    id: "netcracker",
    name: "Netcracker",
    category: "OSS/BSS",
    status: "not_connected",
    icon: "NC",
    iconBg: "bg-violet-500/20 text-violet-400",
    description: "BSS/OSS transformation suite for telecom digital operations."
  },
  {
    id: "amdocs",
    name: "Amdocs",
    category: "OSS/BSS",
    status: "beta",
    icon: "AM",
    iconBg: "bg-orange-500/20 text-orange-400",
    description: "Telecom BSS stack — billing, mediation, and order management."
  },
  // CRM
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    status: "connected",
    lastSync: Date.now() - 30 * MS,
    icon: "SF",
    iconBg: "bg-blue-500/20 text-blue-400",
    description: "Sync SLA incidents and customer accounts to Salesforce Service Cloud."
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    category: "CRM",
    status: "not_connected",
    icon: "SN",
    iconBg: "bg-emerald-500/20 text-emerald-400",
    description: "ITSM platform for incident, problem, and change management workflows."
  },
  // Ticketing
  {
    id: "jira",
    name: "Jira Service Desk",
    category: "Ticketing",
    status: "connected",
    lastSync: Date.now() - 15 * MS,
    icon: "JS",
    iconBg: "bg-blue-600/20 text-blue-300",
    description: "Create and sync tickets for fault events and NOC escalations."
  },
  {
    id: "pagerduty",
    name: "PagerDuty",
    category: "Ticketing",
    status: "connected",
    lastSync: Date.now() - 3 * MS,
    icon: "PD",
    iconBg: "bg-rose-500/20 text-rose-400",
    description: "On-call alerting and incident response for critical network faults."
  },
  {
    id: "opsgenie",
    name: "OpsGenie",
    category: "Ticketing",
    status: "beta",
    icon: "OG",
    iconBg: "bg-amber-500/20 text-amber-400",
    description: "Alert management and on-call scheduling for NOC teams."
  },
  // Monitoring
  {
    id: "prometheus",
    name: "Prometheus",
    category: "Monitoring",
    status: "connected",
    lastSync: Date.now() - 2 * MS,
    icon: "PR",
    iconBg: "bg-orange-500/20 text-orange-400",
    description: "Metrics scraping and time-series storage for device telemetry."
  },
  {
    id: "grafana",
    name: "Grafana",
    category: "Monitoring",
    status: "connected",
    lastSync: Date.now() - 5 * MS,
    icon: "GF",
    iconBg: "bg-amber-500/20 text-amber-400",
    description: "Visualization dashboards for network metrics and SLA reporting."
  },
  {
    id: "datadog",
    name: "Datadog",
    category: "Monitoring",
    status: "not_connected",
    icon: "DD",
    iconBg: "bg-violet-500/20 text-violet-400",
    description: "APM and infrastructure monitoring with full-stack correlation."
  }
];
const API_ACTIVITY = [
  {
    endpoint: "/api/v2/devices",
    timestamp: Date.now() - 1 * MS,
    responseTime: 48,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/alerts",
    timestamp: Date.now() - 3 * MS,
    responseTime: 122,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/devices/ont-4821/metrics",
    timestamp: Date.now() - 7 * MS,
    responseTime: 65,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/workflows/wf-003/execute",
    timestamp: Date.now() - 12 * MS,
    responseTime: 340,
    status: 202,
    method: "POST"
  },
  {
    endpoint: "/api/v2/sla/customers",
    timestamp: Date.now() - 18 * MS,
    responseTime: 89,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/predictive/risks",
    timestamp: Date.now() - 22 * MS,
    responseTime: 210,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/devices/olt-0017",
    timestamp: Date.now() - 31 * MS,
    responseTime: 55,
    status: 404,
    method: "GET"
  },
  {
    endpoint: "/api/v2/audit/logs",
    timestamp: Date.now() - 45 * MS,
    responseTime: 178,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/capacity/forecast",
    timestamp: Date.now() - 60 * MS,
    responseTime: 412,
    status: 200,
    method: "GET"
  },
  {
    endpoint: "/api/v2/topology/graph",
    timestamp: Date.now() - 75 * MS,
    responseTime: 284,
    status: 200,
    method: "GET"
  }
];
const WEBHOOK_EVENTS = [
  "device.updated",
  "fault.detected",
  "signal.changed",
  "sla.breach",
  "workflow.executed"
];
const KEY_PERMISSIONS = [
  "devices:read",
  "devices:write",
  "alerts:read",
  "alerts:write",
  "metrics:read",
  "workflows:execute",
  "audit:read",
  "admin"
];
function formatRelativeTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 6e4) return `${Math.floor(diff / 1e3)}s ago`;
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return `${Math.floor(diff / 864e5)}d ago`;
}
function generateFakeKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const suffix = Array.from(
    { length: 4 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  const body = Array.from(
    { length: 32 },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
  return `sk-${body}${suffix}`;
}
function StatusBadge({ status }) {
  const cfg = {
    connected: {
      label: "Connected",
      className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
    },
    not_connected: {
      label: "Not Connected",
      className: "bg-muted text-muted-foreground border-border"
    },
    beta: {
      label: "Beta",
      className: "bg-amber-500/15 text-amber-400 border-amber-500/30"
    }
  }[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: cn("text-xs font-medium border", cfg.className),
      children: cfg.label
    }
  );
}
function WebhookStatusBadge({ status }) {
  if (status === "active")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30 text-xs",
        children: "Active"
      }
    );
  if (status === "error")
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Badge,
      {
        variant: "outline",
        className: "bg-rose-500/15 text-rose-400 border-rose-500/30 text-xs",
        children: "Error"
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Badge,
    {
      variant: "outline",
      className: "bg-muted text-muted-foreground border-border text-xs",
      children: "Inactive"
    }
  );
}
function HttpStatusBadge({ code }) {
  const ok = code >= 200 && code < 300;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 text-xs font-mono font-medium",
        ok ? "text-emerald-400" : "text-rose-400"
      ),
      children: [
        ok ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-3" }),
        code
      ]
    }
  );
}
function ApiKeysTab() {
  const [keys, setKeys] = reactExports.useState(MOCK_API_KEYS);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newKeyName, setNewKeyName] = reactExports.useState("");
  const [newKeyExpiry, setNewKeyExpiry] = reactExports.useState("never");
  const [newKeyPerms, setNewKeyPerms] = reactExports.useState([
    "devices:read",
    "alerts:read"
  ]);
  const [generatedKey, setGeneratedKey] = reactExports.useState(null);
  const [copied, setCopied] = reactExports.useState(false);
  const [revealId, setRevealId] = reactExports.useState(null);
  function togglePerm(perm) {
    setNewKeyPerms(
      (p) => p.includes(perm) ? p.filter((x) => x !== perm) : [...p, perm]
    );
  }
  function handleGenerate() {
    if (!newKeyName.trim()) {
      ue.error("Key name is required");
      return;
    }
    const fullKey = generateFakeKey();
    const masked = `sk-****...${fullKey.slice(-4)}`;
    const newKey = {
      id: `key-${Date.now()}`,
      name: newKeyName.trim(),
      key: masked,
      created: Date.now(),
      lastUsed: Date.now(),
      permissions: newKeyPerms
    };
    setKeys((k) => [newKey, ...k]);
    setGeneratedKey(fullKey);
  }
  function handleCopy() {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2e3);
      ue.success("API key copied to clipboard");
    });
  }
  function handleRevoke(id) {
    setKeys((k) => k.filter((key) => key.id !== id));
    ue.success("API key revoked");
  }
  function handleDone() {
    setShowForm(false);
    setGeneratedKey(null);
    setNewKeyName("");
    setNewKeyPerms(["devices:read", "alerts:read"]);
    setNewKeyExpiry("never");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage API keys for programmatic access to the FiberNMS API. Keys inherit your organization's plan limits." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2 shrink-0",
          onClick: () => {
            setShowForm(true);
            setGeneratedKey(null);
          },
          "data-ocid": "api-keys-generate-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
            "Generate New Key"
          ]
        }
      )
    ] }),
    showForm && !generatedKey && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-4 text-primary" }),
        "New API Key"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "key-name", className: "text-xs", children: "Key Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "key-name",
                placeholder: "e.g. Grafana Integration",
                value: newKeyName,
                onChange: (e) => setNewKeyName(e.target.value),
                "data-ocid": "api-key-name-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "key-expiry", className: "text-xs", children: "Expiry" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                id: "key-expiry",
                value: newKeyExpiry,
                onChange: (e) => setNewKeyExpiry(e.target.value),
                className: "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring",
                "data-ocid": "api-key-expiry-select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "never", children: "Never expires" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "30d", children: "30 days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "90d", children: "90 days" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "1y", children: "1 year" })
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Permissions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-2", children: KEY_PERMISSIONS.map((perm) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `perm-${perm}`,
                checked: newKeyPerms.includes(perm),
                onCheckedChange: () => togglePerm(perm),
                "data-ocid": `perm-checkbox-${perm}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: `perm-${perm}`,
                className: "text-xs font-mono cursor-pointer",
                children: perm
              }
            )
          ] }, perm)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleGenerate,
              "data-ocid": "api-key-confirm-btn",
              children: "Generate Key"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", onClick: handleDone, children: "Cancel" })
        ] })
      ] })
    ] }),
    generatedKey && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-amber-500/40 bg-amber-500/5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-5 text-amber-400 shrink-0 mt-0.5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Copy your API key now" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "This key will only be shown once. Store it securely." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "flex-1 rounded-lg bg-muted px-3 py-2 text-xs font-mono text-foreground break-all border border-border", children: generatedKey }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "gap-1.5 shrink-0",
            onClick: handleCopy,
            "data-ocid": "api-key-copy-btn",
            children: [
              copied ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "size-3.5" }),
              copied ? "Copied" : "Copy"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          size: "sm",
          variant: "default",
          onClick: handleDone,
          "data-ocid": "api-key-done-btn",
          children: "Done"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Key Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Key" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Created" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Last Used" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Permissions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: keys.map((k) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        TableRow,
        {
          className: "hover:bg-muted/30 transition-colors",
          "data-ocid": `api-key-row-${k.id}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium text-sm text-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-3.5 text-primary shrink-0" }),
              k.name
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-muted-foreground", children: revealId === k.id ? k.key : k.key }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "size-6 hover:bg-muted",
                  onClick: () => setRevealId(revealId === k.id ? null : k.id),
                  "aria-label": revealId === k.id ? "Hide key" : "Show key info",
                  children: revealId === k.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-3" })
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatRelativeTime(k.created) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatRelativeTime(k.lastUsed) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              k.permissions.slice(0, 2).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs font-mono px-1.5 py-0 border-border text-muted-foreground",
                  children: p
                },
                p
              )),
              k.permissions.length > 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Badge,
                {
                  variant: "outline",
                  className: "text-xs border-border text-muted-foreground",
                  children: [
                    "+",
                    k.permissions.length - 2
                  ]
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 h-7 gap-1.5",
                onClick: () => handleRevoke(k.id),
                "data-ocid": `api-key-revoke-${k.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" }),
                  "Revoke"
                ]
              }
            ) })
          ]
        },
        k.id
      )) })
    ] }) })
  ] });
}
function WebhooksTab() {
  const [webhooks, setWebhooks] = reactExports.useState(MOCK_WEBHOOKS);
  const [showForm, setShowForm] = reactExports.useState(false);
  const [newUrl, setNewUrl] = reactExports.useState("");
  const [newDescription, setNewDescription] = reactExports.useState("");
  const [newEvents, setNewEvents] = reactExports.useState(["fault.detected"]);
  const [testingId, setTestingId] = reactExports.useState(null);
  const [testSuccess, setTestSuccess] = reactExports.useState(null);
  function toggleEvent(event) {
    setNewEvents(
      (e) => e.includes(event) ? e.filter((x) => x !== event) : [...e, event]
    );
  }
  function handleToggleStatus(id) {
    setWebhooks(
      (wh) => wh.map(
        (w) => w.id === id ? { ...w, status: w.status === "active" ? "inactive" : "active" } : w
      )
    );
  }
  function handleDelete(id) {
    setWebhooks((wh) => wh.filter((w) => w.id !== id));
    ue.success("Webhook deleted");
  }
  async function handleTest(id) {
    setTestingId(id);
    setTestSuccess(null);
    await new Promise((r) => setTimeout(r, 1200));
    setTestingId(null);
    setTestSuccess(id);
    ue.success("Test payload delivered — HTTP 200 OK");
    setTimeout(() => setTestSuccess(null), 3e3);
  }
  function handleAdd() {
    if (!newUrl.trim()) {
      ue.error("Endpoint URL is required");
      return;
    }
    if (newEvents.length === 0) {
      ue.error("Select at least one event");
      return;
    }
    const newWh = {
      id: `wh-${Date.now()}`,
      url: newUrl.trim(),
      events: newEvents,
      status: "active",
      lastTriggered: Date.now()
    };
    setWebhooks((wh) => [newWh, ...wh]);
    setShowForm(false);
    setNewUrl("");
    setNewEvents(["fault.detected"]);
    ue.success("Webhook added");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Receive real-time HTTP callbacks when network events occur. FiberNMS sends POST requests with JSON payloads." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          size: "sm",
          className: "gap-2 shrink-0",
          onClick: () => setShowForm(true),
          "data-ocid": "add-webhook-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }),
            "Add Webhook"
          ]
        }
      )
    ] }),
    showForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-primary/30 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-sm font-semibold flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Webhook, { className: "size-4 text-primary" }),
        "New Webhook Endpoint"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wh-url", className: "text-xs", children: "Endpoint URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "wh-url",
                placeholder: "https://hooks.example.com/nms-events",
                value: newUrl,
                onChange: (e) => setNewUrl(e.target.value),
                "data-ocid": "webhook-url-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "wh-desc", className: "text-xs", children: "Description (optional)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "wh-desc",
                placeholder: "e.g. PagerDuty fault escalation",
                value: newDescription,
                onChange: (e) => setNewDescription(e.target.value)
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Events to subscribe" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: WEBHOOK_EVENTS.map((evt) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Checkbox,
              {
                id: `evt-${evt}`,
                checked: newEvents.includes(evt),
                onCheckedChange: () => toggleEvent(evt),
                "data-ocid": `webhook-event-${evt}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Label,
              {
                htmlFor: `evt-${evt}`,
                className: "text-xs font-mono cursor-pointer",
                children: evt
              }
            )
          ] }, evt)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              onClick: handleAdd,
              "data-ocid": "webhook-save-btn",
              children: "Save Webhook"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: "ghost",
              onClick: () => setShowForm(false),
              children: "Cancel"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: webhooks.map((wh) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "border-border",
        "data-ocid": `webhook-row-${wh.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "size-3.5 text-primary shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs font-mono text-foreground break-all", children: wh.url }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(WebhookStatusBadge, { status: wh.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: wh.events.map((ev) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "outline",
                className: "text-xs font-mono border-border text-muted-foreground",
                children: ev
              },
              ev
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3" }),
              "Last triggered ",
              formatRelativeTime(wh.lastTriggered)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: wh.status === "active" ? "On" : "Off" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Switch,
                {
                  checked: wh.status === "active",
                  onCheckedChange: () => handleToggleStatus(wh.id),
                  "data-ocid": `webhook-toggle-${wh.id}`,
                  "aria-label": `Toggle ${wh.url}`
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 h-7 text-xs",
                onClick: () => handleTest(wh.id),
                disabled: testingId === wh.id,
                "data-ocid": `webhook-test-${wh.id}`,
                children: [
                  testingId === wh.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3 animate-spin" }) : testSuccess === wh.id ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-emerald-400" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3" }),
                  testingId === wh.id ? "Testing…" : testSuccess === wh.id ? "Success" : "Test"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "ghost",
                size: "sm",
                className: "text-rose-400 hover:bg-rose-500/10 h-7 gap-1 text-xs",
                onClick: () => handleDelete(wh.id),
                "data-ocid": `webhook-delete-${wh.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3.5" })
              }
            )
          ] })
        ] }) })
      },
      wh.id
    )) })
  ] });
}
const CATEGORIES = ["OSS/BSS", "CRM", "Ticketing", "Monitoring"];
function IntegrationCard({ integration }) {
  const [configOpen, setConfigOpen] = reactExports.useState(false);
  const [connected, setConnected] = reactExports.useState(
    integration.status === "connected"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "border-border hover:border-primary/30 transition-colors",
      "data-ocid": `integration-card-${integration.id}`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "size-10 rounded-lg flex items-center justify-center text-sm font-bold font-mono shrink-0",
                  integration.iconBg
                ),
                children: integration.icon
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: integration.name }),
              connected && integration.lastSync && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Synced ",
                formatRelativeTime(integration.lastSync)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusBadge, { status: connected ? "connected" : "not_connected" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: integration.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              className: "gap-1.5 h-7 text-xs flex-1",
              onClick: () => setConfigOpen(!configOpen),
              "data-ocid": `integration-configure-${integration.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "size-3" }),
                "Configure"
              ]
            }
          ),
          connected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              className: "text-rose-400 hover:bg-rose-500/10 h-7 text-xs gap-1.5",
              onClick: () => {
                setConnected(false);
                ue.success(`${integration.name} disconnected`);
              },
              "data-ocid": `integration-disconnect-${integration.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Unplug, { className: "size-3.5" }),
                "Disconnect"
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "h-7 text-xs gap-1.5 flex-1",
              onClick: () => {
                setConnected(true);
                setConfigOpen(false);
                ue.success(`${integration.name} connected`);
              },
              "data-ocid": `integration-connect-${integration.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "size-3" }),
                "Connect"
              ]
            }
          )
        ] }),
        configOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 border-t border-border space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "Endpoint / API Base URL" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                defaultValue: connected ? `https://${integration.id}.fibernms.internal` : "",
                placeholder: "https://…",
                className: "h-8 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs", children: "API Token / Secret" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                type: "password",
                placeholder: "Enter integration secret…",
                className: "h-8 text-xs"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                className: "h-7 text-xs",
                onClick: () => {
                  setConfigOpen(false);
                  ue.success("Settings saved");
                },
                children: "Save"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                size: "sm",
                variant: "ghost",
                className: "h-7 text-xs",
                onClick: () => setConfigOpen(false),
                children: "Cancel"
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function IntegrationsTab() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-6", children: CATEGORIES.map((cat) => {
    const items = INTEGRATIONS.filter((i) => i.category === cat);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: cat }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-border text-muted-foreground",
            children: items.length
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3", children: items.map((int) => /* @__PURE__ */ jsxRuntimeExports.jsx(IntegrationCard, { integration: int }, int.id)) })
    ] }, cat);
  }) });
}
const PLAN_RATE_LIMITS = {
  BASIC: { monthly: 5e4, perMinute: 20, burst: 50 },
  PROFESSIONAL: { monthly: 5e5, perMinute: 100, burst: 200 },
  ENTERPRISE: { monthly: 5e6, perMinute: 1e3, burst: 2e3 },
  ULTRA: { monthly: 5e7, perMinute: 1e4, burst: 25e3 }
};
function formatNum(n) {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(0)}K`;
  return String(n);
}
function RateLimitsTab() {
  const sub = useSubscription();
  const limits = PLAN_RATE_LIMITS[sub.currentPlan] ?? PLAN_RATE_LIMITS.ENTERPRISE;
  const apiPct = sub.apiQuota > 0 ? Math.min(100, sub.apiUsed / sub.apiQuota * 100) : 0;
  const resetDate = new Date(Date.now() + 14 * 864e5).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
      {
        label: "Monthly Quota",
        value: formatNum(limits.monthly),
        icon: Activity,
        sub: "calls / month"
      },
      {
        label: "Rate Limit",
        value: `${formatNum(limits.perMinute)}/min`,
        icon: Zap,
        sub: "sustained rate"
      },
      {
        label: "Burst Limit",
        value: formatNum(limits.burst),
        icon: ChevronUp,
        sub: "short bursts"
      }
    ].map(({ label, value, icon: Icon, sub: subLabel }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-9 rounded-lg bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold font-mono text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subLabel })
      ] })
    ] }) }) }, label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "pt-4 pb-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: "Monthly Usage" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            "Resets on ",
            resetDate
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-mono font-semibold text-foreground", children: [
            formatNum(sub.apiUsed),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground font-normal", children: [
              "/ ",
              formatNum(sub.apiQuota)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            apiPct.toFixed(1),
            "% used"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          value: apiPct,
          className: cn(
            "h-2",
            apiPct > 85 ? "[&>div]:bg-rose-500" : apiPct > 60 ? "[&>div]:bg-amber-500" : "[&>div]:bg-primary"
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground mb-3 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "size-4 text-primary" }),
        "Recent API Activity",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "outline",
            className: "text-xs border-border text-muted-foreground",
            children: "Last 10 calls"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-border overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { className: "bg-muted/40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground w-16", children: "Method" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Endpoint" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground", children: "Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Response" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-xs font-semibold text-muted-foreground text-right", children: "Status" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: API_ACTIVITY.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          TableRow,
          {
            className: "hover:bg-muted/30 transition-colors",
            "data-ocid": `api-activity-row-${i}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: cn(
                    "text-xs font-mono border",
                    entry.method === "POST" ? "border-primary/40 text-primary" : "border-border text-muted-foreground"
                  ),
                  children: entry.method
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-mono text-xs text-foreground", children: entry.endpoint }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-xs text-muted-foreground", children: formatRelativeTime(entry.timestamp) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right text-xs font-mono text-muted-foreground", children: [
                entry.responseTime,
                "ms"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HttpStatusBadge, { code: entry.status }) })
            ]
          },
          `${entry.endpoint}-${entry.timestamp}`
        )) })
      ] }) })
    ] })
  ] });
}
function Integrations() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6 max-w-6xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold text-foreground font-display", children: "API & Integrations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Manage API keys, webhook endpoints, and third-party integrations for your FiberNMS organization." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FeatureGate,
      {
        feature: FeatureFlag.API_ACCESS,
        mode: "replace",
        featureLabel: "API & Integrations",
        description: "Access the API management panel, webhook configuration, and OSS/BSS integration connectors. Available on Enterprise plan and above.",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "api-keys", className: "space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            TabsList,
            {
              className: "bg-muted/60 gap-1 h-9",
              "data-ocid": "integrations-tabs",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "api-keys",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-api-keys",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "size-3.5" }),
                      "API Keys"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "webhooks",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-webhooks",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Webhook, { className: "size-3.5" }),
                      "Webhooks"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "integrations",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-integrations",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Link2, { className: "size-3.5" }),
                      "Integrations"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsTrigger,
                  {
                    value: "rate-limits",
                    className: "text-xs gap-1.5 data-[state=active]:bg-card",
                    "data-ocid": "tab-rate-limits",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-3.5" }),
                      "Rate Limits"
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "api-keys", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ApiKeysTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "webhooks", children: /* @__PURE__ */ jsxRuntimeExports.jsx(WebhooksTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "integrations", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IntegrationsTab, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "rate-limits", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RateLimitsTab, {}) })
        ] })
      }
    )
  ] });
}
export {
  Integrations as default
};
