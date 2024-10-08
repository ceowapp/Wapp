"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GaugeContext = void 0;
exports.GaugeProvider = GaugeProvider;
exports.useGaugeState = useGaugeState;
var React = _interopRequireWildcard(require("react"));
var _utils = require("../internals/utils");
var _utils2 = require("./utils");
var _useDrawingArea = require("../hooks/useDrawingArea");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
// @ignore - do not document.

const GaugeContext = exports.GaugeContext = /*#__PURE__*/React.createContext({
  value: null,
  valueMin: 0,
  valueMax: 0,
  startAngle: 0,
  endAngle: 0,
  innerRadius: 0,
  outerRadius: 0,
  cornerRadius: 0,
  cx: 0,
  cy: 0,
  maxRadius: 0,
  valueAngle: null
});
if (process.env.NODE_ENV !== 'production') {
  GaugeContext.displayName = 'GaugeContext';
}
function GaugeProvider(props) {
  const {
    value = null,
    valueMin = 0,
    valueMax = 100,
    startAngle = 0,
    endAngle = 360,
    outerRadius: outerRadiusParam,
    innerRadius: innerRadiusParam,
    cornerRadius: cornerRadiusParam,
    cx: cxParam,
    cy: cyParam,
    children
  } = props;
  const {
    left,
    top,
    width,
    height
  } = (0, _useDrawingArea.useDrawingArea)();
  const ratios = (0, _utils2.getArcRatios)(startAngle, endAngle);
  const innerCx = cxParam ? (0, _utils.getPercentageValue)(cxParam, width) : ratios.cx * width;
  const innerCy = cyParam ? (0, _utils.getPercentageValue)(cyParam, height) : ratios.cy * height;
  let cx = left + innerCx;
  let cy = top + innerCy;
  const maxRadius = (0, _utils2.getAvailableRadius)(innerCx, innerCy, width, height, ratios);

  // If the center is not defined, after computation of the available radius, udpate the center to use the remaining space.
  if (cxParam === undefined) {
    const usedWidth = maxRadius * (ratios.maxX - ratios.minX);
    cx = left + (width - usedWidth) / 2 + ratios.cx * usedWidth;
  }
  if (cyParam === undefined) {
    const usedHeight = maxRadius * (ratios.maxY - ratios.minY);
    cy = top + (height - usedHeight) / 2 + ratios.cy * usedHeight;
  }
  const outerRadius = (0, _utils.getPercentageValue)(outerRadiusParam ?? maxRadius, maxRadius);
  const innerRadius = (0, _utils.getPercentageValue)(innerRadiusParam ?? '80%', maxRadius);
  const cornerRadius = (0, _utils.getPercentageValue)(cornerRadiusParam ?? 0, outerRadius - innerRadius);
  const contextValue = React.useMemo(() => {
    const startAngleRad = Math.PI * startAngle / 180;
    const endAngleRad = Math.PI * endAngle / 180;
    return {
      value,
      valueMin,
      valueMax,
      startAngle: startAngleRad,
      endAngle: endAngleRad,
      outerRadius,
      innerRadius,
      cornerRadius,
      cx,
      cy,
      maxRadius,
      valueAngle: value === null ? null : startAngleRad + (endAngleRad - startAngleRad) * (value - valueMin) / (valueMax - valueMin)
    };
  }, [value, valueMin, valueMax, startAngle, endAngle, outerRadius, innerRadius, cornerRadius, cx, cy, maxRadius]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(GaugeContext.Provider, {
    value: contextValue,
    children: children
  });
}
function useGaugeState() {
  return React.useContext(GaugeContext);
}