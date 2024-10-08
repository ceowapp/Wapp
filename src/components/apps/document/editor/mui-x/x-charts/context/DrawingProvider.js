"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrawingContext = void 0;
exports.DrawingProvider = DrawingProvider;
exports.SvgContext = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _useId = _interopRequireDefault(require("@mui/utils/useId"));
var _useChartDimensions = _interopRequireDefault(require("../hooks/useChartDimensions"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Defines the area in which it is possible to draw the charts.
 */

const DrawingContext = exports.DrawingContext = /*#__PURE__*/React.createContext({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  height: 300,
  width: 400,
  chartId: ''
});
if (process.env.NODE_ENV !== 'production') {
  DrawingContext.displayName = 'DrawingContext';
}
const SvgContext = exports.SvgContext = /*#__PURE__*/React.createContext({
  current: null
});
if (process.env.NODE_ENV !== 'production') {
  SvgContext.displayName = 'SvgContext';
}
function DrawingProvider(props) {
  const {
    width,
    height,
    margin,
    svgRef,
    children
  } = props;
  const drawingArea = (0, _useChartDimensions.default)(width, height, margin);
  const chartId = (0, _useId.default)();
  const value = React.useMemo(() => (0, _extends2.default)({
    chartId: chartId ?? ''
  }, drawingArea), [chartId, drawingArea]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgContext.Provider, {
    value: svgRef,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(DrawingContext.Provider, {
      value: value,
      children: children
    })
  });
}