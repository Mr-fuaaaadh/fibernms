import { c as createLucideIcon, o, ar as clsx, g as getDefaultExportFromCjs, r as reactExports, u as useNetworkStore, j as jsxRuntimeExports, m as motion, T as TriangleAlert, aj as TrendingUp, l as Clock, w as ChartColumn, Z as Zap } from "./index-CBnSp17V.js";
import { G as GlassCard } from "./GlassCard-Dc3khF0M.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DgM9IYdD.js";
import { f as filterProps, p as polarToCartesian, i as isFunction, D as Dot, b as Layer, A as Animate, c as interpolateNumber, d as isEqual, e as LabelList, G as Global, g as getValueByDataKey, l as last, h as isNil, S as Shape, j as Symbols, k as adaptEventsOfChild, m as findAllByType, E as ErrorBar, n as getLinearRegression, o as Curve, C as Cell, q as getCateCoordinateOfLine, u as uniqueId, r as generateCategoricalChart, s as formatAxisMap, B as Bar, t as formatAxisMap$1, R as ResponsiveContainer, T as Tooltip, L as Legend, v as ReferenceLine } from "./generateCategoricalChart-YlFgKX6A.js";
import { B as BarChart } from "./BarChart-D5-KTN1T.js";
import { C as CartesianGrid } from "./CartesianGrid-DZqv2f_s.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DrrMaTBu.js";
import { A as Area } from "./Area-ClUT1A8g.js";
import { L as Line } from "./Line-C9HtKurI.js";
import { A as ArrowUpRight } from "./arrow-up-right-CR-lhKbl.js";
import { P as Polygon, a as PolarAngleAxis, b as PolarRadiusAxis } from "./PolarAngleAxis-DSxl4L9Y.js";
import { C as CircleCheckBig } from "./circle-check-big-nzvg8BBj.js";
import "./index-IXOTxK3N.js";
import "./index-BalHobZ-.js";
import "./index-Ch1uvbOx.js";
import "./check-ow6agwNW.js";
import "./chevron-up-DjlMizU_.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["line", { x1: "22", x2: "2", y1: "12", y2: "12", key: "1y58io" }],
  [
    "path",
    {
      d: "M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
      key: "oot6mr"
    }
  ],
  ["line", { x1: "6", x2: "6.01", y1: "16", y2: "16", key: "sgf278" }],
  ["line", { x1: "10", x2: "10.01", y1: "16", y2: "16", key: "1l4acy" }]
];
const HardDrive = createLucideIcon("hard-drive", __iconNode$1);
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
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
var _excluded$2 = ["cx", "cy", "innerRadius", "outerRadius", "gridType", "radialLines"];
function _typeof$3(o2) {
  "@babel/helpers - typeof";
  return _typeof$3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$3(o2);
}
function _objectWithoutProperties$2(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$2(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$2(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends$3() {
  _extends$3 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
function ownKeys$2(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread$2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$2(Object(t), true).forEach(function(r2) {
      _defineProperty$3(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$2(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _defineProperty$3(obj, key, value) {
  key = _toPropertyKey$3(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$3(t) {
  var i = _toPrimitive$3(t, "string");
  return "symbol" == _typeof$3(i) ? i : i + "";
}
function _toPrimitive$3(t, r) {
  if ("object" != _typeof$3(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$3(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var getPolygonPath = function getPolygonPath2(radius, cx, cy, polarAngles) {
  var path = "";
  polarAngles.forEach(function(angle, i) {
    var point = polarToCartesian(cx, cy, radius, angle);
    if (i) {
      path += "L ".concat(point.x, ",").concat(point.y);
    } else {
      path += "M ".concat(point.x, ",").concat(point.y);
    }
  });
  path += "Z";
  return path;
};
var PolarAngles = function PolarAngles2(props) {
  var cx = props.cx, cy = props.cy, innerRadius = props.innerRadius, outerRadius = props.outerRadius, polarAngles = props.polarAngles, radialLines = props.radialLines;
  if (!polarAngles || !polarAngles.length || !radialLines) {
    return null;
  }
  var polarAnglesProps = _objectSpread$2({
    stroke: "#ccc"
  }, filterProps(props, false));
  return /* @__PURE__ */ o.createElement("g", {
    className: "recharts-polar-grid-angle"
  }, polarAngles.map(function(entry) {
    var start = polarToCartesian(cx, cy, innerRadius, entry);
    var end = polarToCartesian(cx, cy, outerRadius, entry);
    return /* @__PURE__ */ o.createElement("line", _extends$3({}, polarAnglesProps, {
      key: "line-".concat(entry),
      x1: start.x,
      y1: start.y,
      x2: end.x,
      y2: end.y
    }));
  }));
};
var ConcentricCircle = function ConcentricCircle2(props) {
  var cx = props.cx, cy = props.cy, radius = props.radius, index = props.index;
  var concentricCircleProps = _objectSpread$2(_objectSpread$2({
    stroke: "#ccc"
  }, filterProps(props, false)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ o.createElement("circle", _extends$3({}, concentricCircleProps, {
    className: clsx("recharts-polar-grid-concentric-circle", props.className),
    key: "circle-".concat(index),
    cx,
    cy,
    r: radius
  }));
};
var ConcentricPolygon = function ConcentricPolygon2(props) {
  var radius = props.radius, index = props.index;
  var concentricPolygonProps = _objectSpread$2(_objectSpread$2({
    stroke: "#ccc"
  }, filterProps(props, false)), {}, {
    fill: "none"
  });
  return /* @__PURE__ */ o.createElement("path", _extends$3({}, concentricPolygonProps, {
    className: clsx("recharts-polar-grid-concentric-polygon", props.className),
    key: "path-".concat(index),
    d: getPolygonPath(radius, props.cx, props.cy, props.polarAngles)
  }));
};
var ConcentricPath = function ConcentricPath2(props) {
  var polarRadius = props.polarRadius, gridType = props.gridType;
  if (!polarRadius || !polarRadius.length) {
    return null;
  }
  return /* @__PURE__ */ o.createElement("g", {
    className: "recharts-polar-grid-concentric"
  }, polarRadius.map(function(entry, i) {
    var key = i;
    if (gridType === "circle") return /* @__PURE__ */ o.createElement(ConcentricCircle, _extends$3({
      key
    }, props, {
      radius: entry,
      index: i
    }));
    return /* @__PURE__ */ o.createElement(ConcentricPolygon, _extends$3({
      key
    }, props, {
      radius: entry,
      index: i
    }));
  }));
};
var PolarGrid = function PolarGrid2(_ref) {
  var _ref$cx = _ref.cx, cx = _ref$cx === void 0 ? 0 : _ref$cx, _ref$cy = _ref.cy, cy = _ref$cy === void 0 ? 0 : _ref$cy, _ref$innerRadius = _ref.innerRadius, innerRadius = _ref$innerRadius === void 0 ? 0 : _ref$innerRadius, _ref$outerRadius = _ref.outerRadius, outerRadius = _ref$outerRadius === void 0 ? 0 : _ref$outerRadius, _ref$gridType = _ref.gridType, gridType = _ref$gridType === void 0 ? "polygon" : _ref$gridType, _ref$radialLines = _ref.radialLines, radialLines = _ref$radialLines === void 0 ? true : _ref$radialLines, props = _objectWithoutProperties$2(_ref, _excluded$2);
  if (outerRadius <= 0) {
    return null;
  }
  return /* @__PURE__ */ o.createElement("g", {
    className: "recharts-polar-grid"
  }, /* @__PURE__ */ o.createElement(PolarAngles, _extends$3({
    cx,
    cy,
    innerRadius,
    outerRadius,
    gridType,
    radialLines
  }, props)), /* @__PURE__ */ o.createElement(ConcentricPath, _extends$3({
    cx,
    cy,
    innerRadius,
    outerRadius,
    gridType,
    radialLines
  }, props)));
};
PolarGrid.displayName = "PolarGrid";
function head(array) {
  return array && array.length ? array[0] : void 0;
}
var head_1 = head;
var first = head_1;
const first$1 = /* @__PURE__ */ getDefaultExportFromCjs(first);
var _excluded$1 = ["key"];
function _typeof$2(o2) {
  "@babel/helpers - typeof";
  return _typeof$2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$2(o2);
}
function _objectWithoutProperties$1(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose$1(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose$1(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
function ownKeys$1(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread$1(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys$1(Object(t), true).forEach(function(r2) {
      _defineProperty$2(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck$2(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$2(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$2(descriptor.key), descriptor);
  }
}
function _createClass$2(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$2(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$2(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$2(t, o2, e) {
  return o2 = _getPrototypeOf$2(o2), _possibleConstructorReturn$2(t, _isNativeReflectConstruct$2() ? Reflect.construct(o2, e || [], _getPrototypeOf$2(t).constructor) : o2.apply(t, e));
}
function _possibleConstructorReturn$2(self, call) {
  if (call && (_typeof$2(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$2(self);
}
function _assertThisInitialized$2(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$2() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$2 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$2(o2) {
  _getPrototypeOf$2 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf$2(o2);
}
function _inherits$2(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$2(subClass, superClass);
}
function _setPrototypeOf$2(o2, p) {
  _setPrototypeOf$2 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf$2(o2, p);
}
function _defineProperty$2(obj, key, value) {
  key = _toPropertyKey$2(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$2(t) {
  var i = _toPrimitive$2(t, "string");
  return "symbol" == _typeof$2(i) ? i : i + "";
}
function _toPrimitive$2(t, r) {
  if ("object" != _typeof$2(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$2(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return String(t);
}
var Radar = /* @__PURE__ */ function(_PureComponent) {
  function Radar2() {
    var _this;
    _classCallCheck$2(this, Radar2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper$2(this, Radar2, [].concat(args));
    _defineProperty$2(_this, "state", {
      isAnimationFinished: false
    });
    _defineProperty$2(_this, "handleAnimationEnd", function() {
      var onAnimationEnd = _this.props.onAnimationEnd;
      _this.setState({
        isAnimationFinished: true
      });
      if (isFunction(onAnimationEnd)) {
        onAnimationEnd();
      }
    });
    _defineProperty$2(_this, "handleAnimationStart", function() {
      var onAnimationStart = _this.props.onAnimationStart;
      _this.setState({
        isAnimationFinished: false
      });
      if (isFunction(onAnimationStart)) {
        onAnimationStart();
      }
    });
    _defineProperty$2(_this, "handleMouseEnter", function(e) {
      var onMouseEnter = _this.props.onMouseEnter;
      if (onMouseEnter) {
        onMouseEnter(_this.props, e);
      }
    });
    _defineProperty$2(_this, "handleMouseLeave", function(e) {
      var onMouseLeave = _this.props.onMouseLeave;
      if (onMouseLeave) {
        onMouseLeave(_this.props, e);
      }
    });
    return _this;
  }
  _inherits$2(Radar2, _PureComponent);
  return _createClass$2(Radar2, [{
    key: "renderDots",
    value: function renderDots(points) {
      var _this$props = this.props, dot = _this$props.dot, dataKey = _this$props.dataKey;
      var baseProps = filterProps(this.props, false);
      var customDotProps = filterProps(dot, true);
      var dots = points.map(function(entry, i) {
        var dotProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
          key: "dot-".concat(i),
          r: 3
        }, baseProps), customDotProps), {}, {
          dataKey,
          cx: entry.x,
          cy: entry.y,
          index: i,
          payload: entry
        });
        return Radar2.renderDotItem(dot, dotProps);
      });
      return /* @__PURE__ */ o.createElement(Layer, {
        className: "recharts-radar-dots"
      }, dots);
    }
  }, {
    key: "renderPolygonStatically",
    value: function renderPolygonStatically(points) {
      var _this$props2 = this.props, shape = _this$props2.shape, dot = _this$props2.dot, isRange = _this$props2.isRange, baseLinePoints = _this$props2.baseLinePoints, connectNulls = _this$props2.connectNulls;
      var radar;
      if (/* @__PURE__ */ o.isValidElement(shape)) {
        radar = /* @__PURE__ */ o.cloneElement(shape, _objectSpread$1(_objectSpread$1({}, this.props), {}, {
          points
        }));
      } else if (isFunction(shape)) {
        radar = shape(_objectSpread$1(_objectSpread$1({}, this.props), {}, {
          points
        }));
      } else {
        radar = /* @__PURE__ */ o.createElement(Polygon, _extends$2({}, filterProps(this.props, true), {
          onMouseEnter: this.handleMouseEnter,
          onMouseLeave: this.handleMouseLeave,
          points,
          baseLinePoints: isRange ? baseLinePoints : null,
          connectNulls
        }));
      }
      return /* @__PURE__ */ o.createElement(Layer, {
        className: "recharts-radar-polygon"
      }, radar, dot ? this.renderDots(points) : null);
    }
  }, {
    key: "renderPolygonWithAnimation",
    value: function renderPolygonWithAnimation() {
      var _this2 = this;
      var _this$props3 = this.props, points = _this$props3.points, isAnimationActive = _this$props3.isAnimationActive, animationBegin = _this$props3.animationBegin, animationDuration = _this$props3.animationDuration, animationEasing = _this$props3.animationEasing, animationId = _this$props3.animationId;
      var prevPoints = this.state.prevPoints;
      return /* @__PURE__ */ o.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "radar-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        var prevPointsDiffFactor = prevPoints && prevPoints.length / points.length;
        var stepData = points.map(function(entry, index) {
          var prev = prevPoints && prevPoints[Math.floor(index * prevPointsDiffFactor)];
          if (prev) {
            var _interpolatorX = interpolateNumber(prev.x, entry.x);
            var _interpolatorY = interpolateNumber(prev.y, entry.y);
            return _objectSpread$1(_objectSpread$1({}, entry), {}, {
              x: _interpolatorX(t),
              y: _interpolatorY(t)
            });
          }
          var interpolatorX = interpolateNumber(entry.cx, entry.x);
          var interpolatorY = interpolateNumber(entry.cy, entry.y);
          return _objectSpread$1(_objectSpread$1({}, entry), {}, {
            x: interpolatorX(t),
            y: interpolatorY(t)
          });
        });
        return _this2.renderPolygonStatically(stepData);
      });
    }
  }, {
    key: "renderPolygon",
    value: function renderPolygon() {
      var _this$props4 = this.props, points = _this$props4.points, isAnimationActive = _this$props4.isAnimationActive, isRange = _this$props4.isRange;
      var prevPoints = this.state.prevPoints;
      if (isAnimationActive && points && points.length && !isRange && (!prevPoints || !isEqual(prevPoints, points))) {
        return this.renderPolygonWithAnimation();
      }
      return this.renderPolygonStatically(points);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props5 = this.props, hide = _this$props5.hide, className = _this$props5.className, points = _this$props5.points, isAnimationActive = _this$props5.isAnimationActive;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = clsx("recharts-radar", className);
      return /* @__PURE__ */ o.createElement(Layer, {
        className: layerClass
      }, this.renderPolygon(), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }, {
    key: "renderDotItem",
    value: function renderDotItem(option, props) {
      var dotItem;
      if (/* @__PURE__ */ o.isValidElement(option)) {
        dotItem = /* @__PURE__ */ o.cloneElement(option, props);
      } else if (isFunction(option)) {
        dotItem = option(props);
      } else {
        var key = props.key, dotProps = _objectWithoutProperties$1(props, _excluded$1);
        dotItem = /* @__PURE__ */ o.createElement(Dot, _extends$2({}, dotProps, {
          key,
          className: clsx("recharts-radar-dot", typeof option !== "boolean" ? option.className : "")
        }));
      }
      return dotItem;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty$2(Radar, "displayName", "Radar");
_defineProperty$2(Radar, "defaultProps", {
  angleAxisId: 0,
  radiusAxisId: 0,
  hide: false,
  activeDot: true,
  dot: false,
  legendType: "rect",
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
});
_defineProperty$2(Radar, "getComposedData", function(_ref2) {
  var radiusAxis = _ref2.radiusAxis, angleAxis = _ref2.angleAxis, displayedData = _ref2.displayedData, dataKey = _ref2.dataKey, bandSize = _ref2.bandSize;
  var cx = angleAxis.cx, cy = angleAxis.cy;
  var isRange = false;
  var points = [];
  var angleBandSize = angleAxis.type !== "number" ? bandSize !== null && bandSize !== void 0 ? bandSize : 0 : 0;
  displayedData.forEach(function(entry, i) {
    var name = getValueByDataKey(entry, angleAxis.dataKey, i);
    var value = getValueByDataKey(entry, dataKey);
    var angle = angleAxis.scale(name) + angleBandSize;
    var pointValue = Array.isArray(value) ? last(value) : value;
    var radius = isNil(pointValue) ? void 0 : radiusAxis.scale(pointValue);
    if (Array.isArray(value) && value.length >= 2) {
      isRange = true;
    }
    points.push(_objectSpread$1(_objectSpread$1({}, polarToCartesian(cx, cy, radius, angle)), {}, {
      name,
      value,
      cx,
      cy,
      radius,
      angle,
      payload: entry
    }));
  });
  var baseLinePoints = [];
  if (isRange) {
    points.forEach(function(point) {
      if (Array.isArray(point.value)) {
        var baseValue = first$1(point.value);
        var radius = isNil(baseValue) ? void 0 : radiusAxis.scale(baseValue);
        baseLinePoints.push(_objectSpread$1(_objectSpread$1({}, point), {}, {
          radius
        }, polarToCartesian(cx, cy, radius, point.angle)));
      } else {
        baseLinePoints.push(point);
      }
    });
  }
  return {
    points,
    isRange,
    baseLinePoints
  };
});
function _typeof$1(o2) {
  "@babel/helpers - typeof";
  return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof$1(o2);
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey$1(descriptor.key), descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper$1(t, o2, e) {
  return o2 = _getPrototypeOf$1(o2), _possibleConstructorReturn$1(t, _isNativeReflectConstruct$1() ? Reflect.construct(o2, e || [], _getPrototypeOf$1(t).constructor) : o2.apply(t, e));
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct$1() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct$1 = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf$1(o2) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf$1(o2);
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _setPrototypeOf$1(o2, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf$1(o2, p);
}
function _defineProperty$1(obj, key, value) {
  key = _toPropertyKey$1(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey$1(t) {
  var i = _toPrimitive$1(t, "string");
  return "symbol" == _typeof$1(i) ? i : i + "";
}
function _toPrimitive$1(t, r) {
  if ("object" != _typeof$1(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof$1(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var ZAxis = /* @__PURE__ */ function(_React$Component) {
  function ZAxis2() {
    _classCallCheck$1(this, ZAxis2);
    return _callSuper$1(this, ZAxis2, arguments);
  }
  _inherits$1(ZAxis2, _React$Component);
  return _createClass$1(ZAxis2, [{
    key: "render",
    value: function render() {
      return null;
    }
  }]);
}(reactExports.Component);
_defineProperty$1(ZAxis, "displayName", "ZAxis");
_defineProperty$1(ZAxis, "defaultProps", {
  zAxisId: 0,
  range: [64, 64],
  scale: "auto",
  type: "number"
});
var _excluded = ["option", "isActive"];
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function ScatterSymbol(_ref) {
  var option = _ref.option, isActive = _ref.isActive, props = _objectWithoutProperties(_ref, _excluded);
  if (typeof option === "string") {
    return /* @__PURE__ */ reactExports.createElement(Shape, _extends$1({
      option: /* @__PURE__ */ reactExports.createElement(Symbols, _extends$1({
        type: option
      }, props)),
      isActive,
      shapeType: "symbols"
    }, props));
  }
  return /* @__PURE__ */ reactExports.createElement(Shape, _extends$1({
    option,
    isActive,
    shapeType: "symbols"
  }, props));
}
function _typeof(o2) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o3) {
    return typeof o3;
  } : function(o3) {
    return o3 && "function" == typeof Symbol && o3.constructor === Symbol && o3 !== Symbol.prototype ? "symbol" : typeof o3;
  }, _typeof(o2);
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o2 = Object.getOwnPropertySymbols(e);
    r && (o2 = o2.filter(function(r2) {
      return Object.getOwnPropertyDescriptor(e, r2).enumerable;
    })), t.push.apply(t, o2);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
      _defineProperty(e, r2, t[r2]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
      Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
    });
  }
  return e;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _callSuper(t, o2, e) {
  return o2 = _getPrototypeOf(o2), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o2, e || [], _getPrototypeOf(t).constructor) : o2.apply(t, e));
}
function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
  } catch (t2) {
  }
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
    return !!t;
  })();
}
function _getPrototypeOf(o2) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o3) {
    return o3.__proto__ || Object.getPrototypeOf(o3);
  };
  return _getPrototypeOf(o2);
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });
  Object.defineProperty(subClass, "prototype", { writable: false });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o2, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o3, p2) {
    o3.__proto__ = p2;
    return o3;
  };
  return _setPrototypeOf(o2, p);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
var Scatter = /* @__PURE__ */ function(_PureComponent) {
  function Scatter2() {
    var _this;
    _classCallCheck(this, Scatter2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Scatter2, [].concat(args));
    _defineProperty(_this, "state", {
      isAnimationFinished: false
    });
    _defineProperty(_this, "handleAnimationEnd", function() {
      _this.setState({
        isAnimationFinished: true
      });
    });
    _defineProperty(_this, "handleAnimationStart", function() {
      _this.setState({
        isAnimationFinished: false
      });
    });
    _defineProperty(_this, "id", uniqueId("recharts-scatter-"));
    return _this;
  }
  _inherits(Scatter2, _PureComponent);
  return _createClass(Scatter2, [{
    key: "renderSymbolsStatically",
    value: function renderSymbolsStatically(points) {
      var _this2 = this;
      var _this$props = this.props, shape = _this$props.shape, activeShape = _this$props.activeShape, activeIndex = _this$props.activeIndex;
      var baseProps = filterProps(this.props, false);
      return points.map(function(entry, i) {
        var isActive = activeIndex === i;
        var option = isActive ? activeShape : shape;
        var props = _objectSpread(_objectSpread({}, baseProps), entry);
        return /* @__PURE__ */ o.createElement(Layer, _extends({
          className: "recharts-scatter-symbol",
          key: "symbol-".concat(entry === null || entry === void 0 ? void 0 : entry.cx, "-").concat(entry === null || entry === void 0 ? void 0 : entry.cy, "-").concat(entry === null || entry === void 0 ? void 0 : entry.size, "-").concat(i)
        }, adaptEventsOfChild(_this2.props, entry, i), {
          role: "img"
        }), /* @__PURE__ */ o.createElement(ScatterSymbol, _extends({
          option,
          isActive,
          key: "symbol-".concat(i)
        }, props)));
      });
    }
  }, {
    key: "renderSymbolsWithAnimation",
    value: function renderSymbolsWithAnimation() {
      var _this3 = this;
      var _this$props2 = this.props, points = _this$props2.points, isAnimationActive = _this$props2.isAnimationActive, animationBegin = _this$props2.animationBegin, animationDuration = _this$props2.animationDuration, animationEasing = _this$props2.animationEasing, animationId = _this$props2.animationId;
      var prevPoints = this.state.prevPoints;
      return /* @__PURE__ */ o.createElement(Animate, {
        begin: animationBegin,
        duration: animationDuration,
        isActive: isAnimationActive,
        easing: animationEasing,
        from: {
          t: 0
        },
        to: {
          t: 1
        },
        key: "pie-".concat(animationId),
        onAnimationEnd: this.handleAnimationEnd,
        onAnimationStart: this.handleAnimationStart
      }, function(_ref) {
        var t = _ref.t;
        var stepData = points.map(function(entry, index) {
          var prev = prevPoints && prevPoints[index];
          if (prev) {
            var interpolatorCx = interpolateNumber(prev.cx, entry.cx);
            var interpolatorCy = interpolateNumber(prev.cy, entry.cy);
            var interpolatorSize = interpolateNumber(prev.size, entry.size);
            return _objectSpread(_objectSpread({}, entry), {}, {
              cx: interpolatorCx(t),
              cy: interpolatorCy(t),
              size: interpolatorSize(t)
            });
          }
          var interpolator = interpolateNumber(0, entry.size);
          return _objectSpread(_objectSpread({}, entry), {}, {
            size: interpolator(t)
          });
        });
        return /* @__PURE__ */ o.createElement(Layer, null, _this3.renderSymbolsStatically(stepData));
      });
    }
  }, {
    key: "renderSymbols",
    value: function renderSymbols() {
      var _this$props3 = this.props, points = _this$props3.points, isAnimationActive = _this$props3.isAnimationActive;
      var prevPoints = this.state.prevPoints;
      if (isAnimationActive && points && points.length && (!prevPoints || !isEqual(prevPoints, points))) {
        return this.renderSymbolsWithAnimation();
      }
      return this.renderSymbolsStatically(points);
    }
  }, {
    key: "renderErrorBar",
    value: function renderErrorBar() {
      var isAnimationActive = this.props.isAnimationActive;
      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _this$props4 = this.props, points = _this$props4.points, xAxis = _this$props4.xAxis, yAxis = _this$props4.yAxis, children = _this$props4.children;
      var errorBarItems = findAllByType(children, ErrorBar);
      if (!errorBarItems) {
        return null;
      }
      return errorBarItems.map(function(item, i) {
        var _item$props = item.props, direction = _item$props.direction, errorDataKey = _item$props.dataKey;
        return /* @__PURE__ */ o.cloneElement(item, {
          key: "".concat(direction, "-").concat(errorDataKey, "-").concat(points[i]),
          data: points,
          xAxis,
          yAxis,
          layout: direction === "x" ? "vertical" : "horizontal",
          dataPointFormatter: function dataPointFormatter(dataPoint, dataKey) {
            return {
              x: dataPoint.cx,
              y: dataPoint.cy,
              value: direction === "x" ? +dataPoint.node.x : +dataPoint.node.y,
              errorVal: getValueByDataKey(dataPoint, dataKey)
            };
          }
        });
      });
    }
  }, {
    key: "renderLine",
    value: function renderLine() {
      var _this$props5 = this.props, points = _this$props5.points, line = _this$props5.line, lineType = _this$props5.lineType, lineJointType = _this$props5.lineJointType;
      var scatterProps = filterProps(this.props, false);
      var customLineProps = filterProps(line, false);
      var linePoints, lineItem;
      if (lineType === "joint") {
        linePoints = points.map(function(entry) {
          return {
            x: entry.cx,
            y: entry.cy
          };
        });
      } else if (lineType === "fitting") {
        var _getLinearRegression = getLinearRegression(points), xmin = _getLinearRegression.xmin, xmax = _getLinearRegression.xmax, a = _getLinearRegression.a, b = _getLinearRegression.b;
        var linearExp = function linearExp2(x) {
          return a * x + b;
        };
        linePoints = [{
          x: xmin,
          y: linearExp(xmin)
        }, {
          x: xmax,
          y: linearExp(xmax)
        }];
      }
      var lineProps = _objectSpread(_objectSpread(_objectSpread({}, scatterProps), {}, {
        fill: "none",
        stroke: scatterProps && scatterProps.fill
      }, customLineProps), {}, {
        points: linePoints
      });
      if (/* @__PURE__ */ o.isValidElement(line)) {
        lineItem = /* @__PURE__ */ o.cloneElement(line, lineProps);
      } else if (isFunction(line)) {
        lineItem = line(lineProps);
      } else {
        lineItem = /* @__PURE__ */ o.createElement(Curve, _extends({}, lineProps, {
          type: lineJointType
        }));
      }
      return /* @__PURE__ */ o.createElement(Layer, {
        className: "recharts-scatter-line",
        key: "recharts-scatter-line"
      }, lineItem);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props6 = this.props, hide = _this$props6.hide, points = _this$props6.points, line = _this$props6.line, className = _this$props6.className, xAxis = _this$props6.xAxis, yAxis = _this$props6.yAxis, left = _this$props6.left, top = _this$props6.top, width = _this$props6.width, height = _this$props6.height, id = _this$props6.id, isAnimationActive = _this$props6.isAnimationActive;
      if (hide || !points || !points.length) {
        return null;
      }
      var isAnimationFinished = this.state.isAnimationFinished;
      var layerClass = clsx("recharts-scatter", className);
      var needClipX = xAxis && xAxis.allowDataOverflow;
      var needClipY = yAxis && yAxis.allowDataOverflow;
      var needClip = needClipX || needClipY;
      var clipPathId = isNil(id) ? this.id : id;
      return /* @__PURE__ */ o.createElement(Layer, {
        className: layerClass,
        clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : null
      }, needClipX || needClipY ? /* @__PURE__ */ o.createElement("defs", null, /* @__PURE__ */ o.createElement("clipPath", {
        id: "clipPath-".concat(clipPathId)
      }, /* @__PURE__ */ o.createElement("rect", {
        x: needClipX ? left : left - width / 2,
        y: needClipY ? top : top - height / 2,
        width: needClipX ? width : width * 2,
        height: needClipY ? height : height * 2
      }))) : null, line && this.renderLine(), this.renderErrorBar(), /* @__PURE__ */ o.createElement(Layer, {
        key: "recharts-scatter-symbols"
      }, this.renderSymbols()), (!isAnimationActive || isAnimationFinished) && LabelList.renderCallByParent(this.props, points));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.animationId !== prevState.prevAnimationId) {
        return {
          prevAnimationId: nextProps.animationId,
          curPoints: nextProps.points,
          prevPoints: prevState.curPoints
        };
      }
      if (nextProps.points !== prevState.curPoints) {
        return {
          curPoints: nextProps.points
        };
      }
      return null;
    }
  }]);
}(reactExports.PureComponent);
_defineProperty(Scatter, "displayName", "Scatter");
_defineProperty(Scatter, "defaultProps", {
  xAxisId: 0,
  yAxisId: 0,
  zAxisId: 0,
  legendType: "circle",
  lineType: "joint",
  lineJointType: "linear",
  data: [],
  shape: "circle",
  hide: false,
  isAnimationActive: !Global.isSsr,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "linear"
});
_defineProperty(Scatter, "getComposedData", function(_ref2) {
  var xAxis = _ref2.xAxis, yAxis = _ref2.yAxis, zAxis = _ref2.zAxis, item = _ref2.item, displayedData = _ref2.displayedData, xAxisTicks = _ref2.xAxisTicks, yAxisTicks = _ref2.yAxisTicks, offset = _ref2.offset;
  var tooltipType = item.props.tooltipType;
  var cells = findAllByType(item.props.children, Cell);
  var xAxisDataKey = isNil(xAxis.dataKey) ? item.props.dataKey : xAxis.dataKey;
  var yAxisDataKey = isNil(yAxis.dataKey) ? item.props.dataKey : yAxis.dataKey;
  var zAxisDataKey = zAxis && zAxis.dataKey;
  var defaultRangeZ = zAxis ? zAxis.range : ZAxis.defaultProps.range;
  var defaultZ = defaultRangeZ && defaultRangeZ[0];
  var xBandSize = xAxis.scale.bandwidth ? xAxis.scale.bandwidth() : 0;
  var yBandSize = yAxis.scale.bandwidth ? yAxis.scale.bandwidth() : 0;
  var points = displayedData.map(function(entry, index) {
    var x = getValueByDataKey(entry, xAxisDataKey);
    var y = getValueByDataKey(entry, yAxisDataKey);
    var z = !isNil(zAxisDataKey) && getValueByDataKey(entry, zAxisDataKey) || "-";
    var tooltipPayload = [{
      name: isNil(xAxis.dataKey) ? item.props.name : xAxis.name || xAxis.dataKey,
      unit: xAxis.unit || "",
      value: x,
      payload: entry,
      dataKey: xAxisDataKey,
      type: tooltipType
    }, {
      name: isNil(yAxis.dataKey) ? item.props.name : yAxis.name || yAxis.dataKey,
      unit: yAxis.unit || "",
      value: y,
      payload: entry,
      dataKey: yAxisDataKey,
      type: tooltipType
    }];
    if (z !== "-") {
      tooltipPayload.push({
        name: zAxis.name || zAxis.dataKey,
        unit: zAxis.unit || "",
        value: z,
        payload: entry,
        dataKey: zAxisDataKey,
        type: tooltipType
      });
    }
    var cx = getCateCoordinateOfLine({
      axis: xAxis,
      ticks: xAxisTicks,
      bandSize: xBandSize,
      entry,
      index,
      dataKey: xAxisDataKey
    });
    var cy = getCateCoordinateOfLine({
      axis: yAxis,
      ticks: yAxisTicks,
      bandSize: yBandSize,
      entry,
      index,
      dataKey: yAxisDataKey
    });
    var size = z !== "-" ? zAxis.scale(z) : defaultZ;
    var radius = Math.sqrt(Math.max(size, 0) / Math.PI);
    return _objectSpread(_objectSpread({}, entry), {}, {
      cx,
      cy,
      x: cx - radius,
      y: cy - radius,
      xAxis,
      yAxis,
      zAxis,
      width: 2 * radius,
      height: 2 * radius,
      size,
      node: {
        x,
        y,
        z
      },
      tooltipPayload,
      tooltipPosition: {
        x: cx,
        y: cy
      },
      payload: entry
    }, cells && cells[index] && cells[index].props);
  });
  return _objectSpread({
    points
  }, offset);
});
var RadarChart = generateCategoricalChart({
  chartName: "RadarChart",
  GraphicalChild: Radar,
  axisComponents: [{
    axisType: "angleAxis",
    AxisComp: PolarAngleAxis
  }, {
    axisType: "radiusAxis",
    AxisComp: PolarRadiusAxis
  }],
  formatAxisMap,
  defaultProps: {
    layout: "centric",
    startAngle: 90,
    endAngle: -270,
    cx: "50%",
    cy: "50%",
    innerRadius: 0,
    outerRadius: "80%"
  }
});
var ComposedChart = generateCategoricalChart({
  chartName: "ComposedChart",
  GraphicalChild: [Line, Area, Bar, Scatter],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }, {
    axisType: "zAxis",
    AxisComp: ZAxis
  }],
  formatAxisMap: formatAxisMap$1
});
const REGIONS = [
  "All Regions",
  "North America",
  "Europe",
  "Asia-Pacific",
  "Middle East",
  "South America"
];
function utilColor(pct) {
  if (pct >= 90) return "#ef4444";
  if (pct >= 75) return "#f97316";
  if (pct >= 60) return "#eab308";
  return "#22c55e";
}
function priorityLevel(months) {
  if (months <= 3) return "Critical";
  if (months <= 6) return "High";
  if (months <= 12) return "Medium";
  return "Low";
}
const PRIORITY_COLORS = {
  Critical: "text-red-400 bg-red-500/15 border-red-500/30",
  High: "text-orange-400 bg-orange-500/15 border-orange-500/30",
  Medium: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  Low: "text-green-400 bg-green-500/15 border-green-500/30"
};
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 flex gap-4 items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${accent}`,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-5 h-5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs uppercase tracking-widest mb-1", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold text-foreground", children: value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
        ] })
      ] })
    }
  );
}
function CapacityPlanning() {
  const capacityRecords = useNetworkStore((s) => s.capacityRecords);
  const [region, setRegion] = reactExports.useState("All Regions");
  const [sortKey, setSortKey] = reactExports.useState("exhaustionMonths");
  const [sortAsc, setSortAsc] = reactExports.useState(true);
  const filtered = reactExports.useMemo(
    () => region === "All Regions" ? capacityRecords : capacityRecords.filter((r) => r.region === region),
    [capacityRecords, region]
  );
  const sorted = reactExports.useMemo(
    () => [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sortAsc ? cmp : -cmp;
    }),
    [filtered, sortKey, sortAsc]
  );
  const criticalCount = filtered.filter(
    (r) => r.currentUtilization >= 90
  ).length;
  const avgUtil = filtered.length ? Math.round(
    filtered.reduce(
      (s, r) => s + r.currentUtilization,
      0
    ) / filtered.length
  ) : 0;
  const earliest = filtered.length ? Math.min(...filtered.map((r) => r.exhaustionMonths)) : 0;
  const barData = filtered.map((r) => ({
    name: r.routeName.length > 18 ? `${r.routeName.slice(0, 18)}…` : r.routeName,
    utilization: r.currentUtilization,
    fill: utilColor(r.currentUtilization)
  }));
  const forecastData = reactExports.useMemo(() => {
    if (!filtered.length) return [];
    const months = filtered[0].forecastData.map(
      (d) => d.month
    );
    return months.map((month, mi) => {
      const avgActual = filtered.reduce(
        (s, r) => s + r.forecastData[mi].utilization,
        0
      ) / filtered.length;
      const projected = Math.min(100, avgActual * 1.08);
      return {
        month,
        actual: Math.round(avgActual),
        projected: Math.round(projected)
      };
    });
  }, [filtered]);
  const exhaustionIdx = reactExports.useMemo(() => {
    var _a;
    const firstOver = forecastData.findIndex(
      (d) => d.projected >= 95
    );
    return firstOver >= 0 ? (_a = forecastData[firstOver]) == null ? void 0 : _a.month : null;
  }, [forecastData]);
  const regionData = reactExports.useMemo(() => {
    const groups = {};
    for (const r of capacityRecords) {
      if (!groups[r.region]) groups[r.region] = [];
      groups[r.region].push(r.currentUtilization);
    }
    return Object.entries(groups).map(([reg, utils]) => ({
      region: reg.replace(" America", " Am.").replace("-Pacific", "-Pac"),
      headroom: Math.round(
        100 - utils.reduce((s, v) => s + v, 0) / utils.length
      )
    }));
  }, [capacityRecords]);
  const recommendations = reactExports.useMemo(
    () => sorted.filter((r) => r.exhaustionMonths <= 9).slice(0, 4).map((r) => ({
      text: `${r.routeName}: Plan capacity upgrade in ${r.exhaustionMonths} months to avoid exhaustion. Current utilization ${r.currentUtilization.toFixed(1)}%.`,
      severity: priorityLevel(r.exhaustionMonths)
    })),
    [sorted]
  );
  function handleSortKeyboard(e, key) {
    if (e.key === "Enter" || e.key === " ") toggleSort(key);
  }
  function toggleSort(key) {
    if (sortKey === key) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex-1 overflow-y-auto bg-background p-4 md:p-6 space-y-5 md:space-y-6",
      "data-ocid": "capacity-planning-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.35 },
            className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-2xl font-bold text-foreground tracking-wide", children: "Capacity Planning & Forecasting" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: "Fiber utilization trends, demand forecasts, and upgrade scheduling" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: region, onValueChange: setRegion, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SelectTrigger,
                  {
                    className: "w-48 bg-card border-border/60 text-sm",
                    "data-ocid": "region-filter",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "All Regions" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: REGIONS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: r, children: r }, r)) })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Total Routes",
              value: filtered.length,
              sub: "Monitored in selection",
              icon: HardDrive,
              accent: "bg-primary/15 text-primary border border-primary/30",
              delay: 0
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Critical Utilization",
              value: criticalCount,
              sub: "Routes above 90%",
              icon: TriangleAlert,
              accent: "bg-red-500/15 text-red-400 border border-red-500/30",
              delay: 0.07
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Avg Utilization",
              value: `${avgUtil}%`,
              sub: "Across filtered routes",
              icon: TrendingUp,
              accent: "bg-accent/15 text-accent border border-accent/30",
              delay: 0.14
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KpiCard,
            {
              label: "Earliest Exhaustion",
              value: `${earliest} mo`,
              sub: "Months until first route maxes",
              icon: Clock,
              accent: earliest <= 3 ? "bg-red-500/15 text-red-400 border border-red-500/30" : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
              delay: 0.21
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-5 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.45, delay: 0.1 },
              className: "xl:col-span-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "w-4 h-4 text-primary" }),
                  "Utilization Overview"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  BarChart,
                  {
                    layout: "vertical",
                    data: barData,
                    margin: { top: 4, right: 16, left: 4, bottom: 4 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CartesianGrid,
                        {
                          strokeDasharray: "3 3",
                          stroke: "rgba(255,255,255,0.06)",
                          horizontal: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        XAxis,
                        {
                          type: "number",
                          domain: [0, 100],
                          tick: { fill: "rgba(255,255,255,0.45)", fontSize: 10 },
                          tickFormatter: (v) => `${v}%`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          type: "category",
                          dataKey: "name",
                          width: 96,
                          tick: { fill: "rgba(255,255,255,0.55)", fontSize: 9 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          formatter: (v) => [`${v}%`, "Utilization"],
                          contentStyle: {
                            background: "rgba(20,22,30,0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8,
                            fontSize: 12
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Bar,
                        {
                          dataKey: "utilization",
                          radius: [0, 4, 4, 0],
                          isAnimationActive: true,
                          children: barData.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.fill }, entry.name))
                        }
                      )
                    ]
                  }
                ) }) }) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: 20 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.45, delay: 0.15 },
              className: "xl:col-span-3",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 h-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
                  "Demand vs Capacity Forecast (12-Month)"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[500px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 260, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  ComposedChart,
                  {
                    data: forecastData,
                    margin: { top: 8, right: 16, left: 0, bottom: 4 },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CartesianGrid,
                        {
                          strokeDasharray: "3 3",
                          stroke: "rgba(255,255,255,0.06)"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        XAxis,
                        {
                          dataKey: "month",
                          tick: { fill: "rgba(255,255,255,0.45)", fontSize: 10 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          domain: [0, 100],
                          tick: { fill: "rgba(255,255,255,0.45)", fontSize: 10 },
                          tickFormatter: (v) => `${v}%`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          formatter: (v, name) => [
                            `${v}%`,
                            name === "actual" ? "Actual Utilization" : "Projected Demand"
                          ],
                          contentStyle: {
                            background: "rgba(20,22,30,0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8,
                            fontSize: 12
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Legend,
                        {
                          formatter: (v) => v === "actual" ? "Actual Utilization" : "Projected Demand",
                          wrapperStyle: {
                            fontSize: 11,
                            color: "rgba(255,255,255,0.6)"
                          }
                        }
                      ),
                      exhaustionIdx && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ReferenceLine,
                        {
                          x: exhaustionIdx,
                          stroke: "#ef4444",
                          strokeDasharray: "5 3",
                          label: {
                            value: "Exhaustion",
                            fill: "#ef4444",
                            fontSize: 10,
                            position: "insideTopRight"
                          }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Line,
                        {
                          type: "monotone",
                          dataKey: "actual",
                          stroke: "#22d3ee",
                          strokeWidth: 2.5,
                          dot: false,
                          activeDot: { r: 4 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Line,
                        {
                          type: "monotone",
                          dataKey: "projected",
                          stroke: "#fb923c",
                          strokeWidth: 2,
                          strokeDasharray: "6 4",
                          dot: false,
                          activeDot: { r: 4 }
                        }
                      )
                    ]
                  }
                ) }) }) })
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 xl:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, delay: 0.2 },
              className: "xl:col-span-2",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wider flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-accent" }),
                    "Upgrade Timeline"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    sorted.length,
                    " routes"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "table",
                  {
                    className: "w-full text-sm",
                    "data-ocid": "upgrade-timeline-table",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/40", children: [
                        [
                          ["routeName", "Route Name"],
                          ["currentUtilization", "Current %"],
                          ["exhaustionMonths", "Exhaustion In"]
                        ].map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "th",
                          {
                            className: "text-left text-xs text-muted-foreground font-medium tracking-wider py-2 px-2 cursor-pointer hover:text-foreground transition-colors select-none",
                            onClick: () => toggleSort(key),
                            onKeyDown: (e) => handleSortKeyboard(e, key),
                            "data-ocid": `sort-${key}`,
                            children: [
                              label,
                              " ",
                              sortKey === key ? sortAsc ? "↑" : "↓" : ""
                            ]
                          },
                          key
                        )),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs text-muted-foreground font-medium tracking-wider py-2 px-2", children: "Region" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left text-xs text-muted-foreground font-medium tracking-wider py-2 px-2", children: "Priority" })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((r, i) => {
                        const priority = priorityLevel(r.exhaustionMonths);
                        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          motion.tr,
                          {
                            initial: { opacity: 0, x: -10 },
                            animate: { opacity: 1, x: 0 },
                            transition: { delay: i * 0.04 },
                            className: "border-b border-border/20 hover:bg-muted/20 transition-colors",
                            "data-ocid": `capacity-row-${r.id}`,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2 font-medium text-foreground/90 text-xs", children: r.routeName }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-1.5 bg-muted/60 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  "div",
                                  {
                                    className: "h-full rounded-full transition-all",
                                    style: {
                                      width: `${r.currentUtilization}%`,
                                      background: utilColor(r.currentUtilization)
                                    }
                                  }
                                ) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                                  "span",
                                  {
                                    className: "text-xs font-mono",
                                    style: {
                                      color: utilColor(r.currentUtilization)
                                    },
                                    children: [
                                      r.currentUtilization.toFixed(1),
                                      "%"
                                    ]
                                  }
                                )
                              ] }) }),
                              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "py-2.5 px-2 text-xs text-muted-foreground font-mono", children: [
                                r.exhaustionMonths,
                                " mo"
                              ] }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2 text-xs text-muted-foreground", children: r.region }),
                              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                "span",
                                {
                                  className: `text-xs px-2 py-0.5 rounded-full border font-medium ${PRIORITY_COLORS[priority]}`,
                                  children: priority
                                }
                              ) })
                            ]
                          },
                          r.id
                        );
                      }) })
                    ]
                  }
                ) })
              ] })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, delay: 0.25 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5 h-full flex flex-col", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "w-4 h-4 text-primary" }),
                  "Capacity Headroom by Region"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-h-[220px] overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-[300px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  RadarChart,
                  {
                    cx: "50%",
                    cy: "50%",
                    outerRadius: "70%",
                    data: regionData,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(PolarGrid, { stroke: "rgba(255,255,255,0.1)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PolarAngleAxis,
                        {
                          dataKey: "region",
                          tick: { fill: "rgba(255,255,255,0.5)", fontSize: 9 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Radar,
                        {
                          name: "Headroom %",
                          dataKey: "headroom",
                          stroke: "#22d3ee",
                          fill: "#22d3ee",
                          fillOpacity: 0.18,
                          strokeWidth: 1.5
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Tooltip,
                        {
                          formatter: (v) => [`${v}%`, "Available Headroom"],
                          contentStyle: {
                            background: "rgba(20,22,30,0.95)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: 8,
                            fontSize: 12
                          }
                        }
                      )
                    ]
                  }
                ) }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center mt-2", children: "Higher = more available capacity" })
              ] })
            }
          )
        ] }),
        recommendations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.3 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wider mb-4 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-4 h-4 text-accent" }),
                "AI Capacity Recommendations"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: recommendations.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  transition: { delay: 0.35 + i * 0.06 },
                  className: "flex gap-3 items-start p-3 rounded-xl bg-muted/30 border border-border/30",
                  "data-ocid": `recommendation-${i}`,
                  children: [
                    rec.severity === "Critical" || rec.severity === "High" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `text-xs font-medium px-1.5 py-0.5 rounded border mr-2 ${PRIORITY_COLORS[rec.severity]}`,
                          children: rec.severity
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: rec.text })
                    ] })
                  ]
                },
                rec.text
              )) })
            ] })
          }
        )
      ]
    }
  );
}
export {
  CapacityPlanning as default
};
