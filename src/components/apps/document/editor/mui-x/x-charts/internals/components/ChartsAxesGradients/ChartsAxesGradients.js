"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsAxesGradients = ChartsAxesGradients;
exports.useChartGradient = useChartGradient;
var React = _interopRequireWildcard(require("react"));
var _CartesianContextProvider = require("../../../context/CartesianContextProvider");
var _DrawingProvider = require("../../../context/DrawingProvider");
var _hooks = require("../../../hooks");
var _ChartsPiecewiseGradient = _interopRequireDefault(require("./ChartsPiecewiseGradient"));
var _ChartsContinuousGradient = _interopRequireDefault(require("./ChartsContinuousGradient"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function useChartGradient() {
  const {
    chartId
  } = React.useContext(_DrawingProvider.DrawingContext);
  return React.useCallback((axisId, direction) => `${chartId}-graient-${direction}-${axisId}`, [chartId]);
}
function ChartsAxesGradients() {
  const {
    top,
    height,
    bottom,
    left,
    width,
    right
  } = (0, _hooks.useDrawingArea)();
  const svgHeight = top + height + bottom;
  const svgWidth = left + width + right;
  const getGradientId = useChartGradient();
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React.useContext(_CartesianContextProvider.CartesianContext);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("defs", {
    children: [yAxisIds.filter(axisId => yAxis[axisId].colorMap !== undefined).map(axisId => {
      const gradientId = getGradientId(axisId, 'y');
      const {
        colorMap,
        scale,
        colorScale,
        reverse
      } = yAxis[axisId];
      if (colorMap?.type === 'piecewise') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsPiecewiseGradient.default, {
          isReveresed: !reverse,
          scale: scale,
          colorMap: colorMap,
          size: svgHeight,
          gradientId: gradientId,
          direction: "y"
        }, gradientId);
      }
      if (colorMap?.type === 'continuous') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsContinuousGradient.default, {
          isReveresed: !reverse,
          scale: scale,
          colorScale: colorScale,
          colorMap: colorMap,
          size: svgHeight,
          gradientId: gradientId,
          direction: "y"
        }, gradientId);
      }
      return null;
    }), xAxisIds.filter(axisId => xAxis[axisId].colorMap !== undefined).map(axisId => {
      const gradientId = getGradientId(axisId, 'x');
      const {
        colorMap,
        scale,
        reverse,
        colorScale
      } = xAxis[axisId];
      if (colorMap?.type === 'piecewise') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsPiecewiseGradient.default, {
          isReveresed: reverse,
          scale: scale,
          colorMap: colorMap,
          size: svgWidth,
          gradientId: gradientId,
          direction: "x"
        }, gradientId);
      }
      if (colorMap?.type === 'continuous') {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsContinuousGradient.default, {
          isReveresed: reverse,
          scale: scale,
          colorScale: colorScale,
          colorMap: colorMap,
          size: svgWidth,
          gradientId: gradientId,
          direction: "x"
        }, gradientId);
      }
      return null;
    })]
  });
}