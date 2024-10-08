"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsSurface = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _styles = require("@mui/material/styles");
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _useAxisEvents = require("./hooks/useAxisEvents");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children", "width", "height", "viewBox", "disableAxisListener", "className", "title", "desc"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ChartChartsSurfaceStyles = (0, _styles.styled)('svg', {
  name: 'MuiChartsSurface',
  slot: 'Root'
})(() => ({}));
const ChartsSurface = exports.ChartsSurface = /*#__PURE__*/React.forwardRef(function ChartsSurface(props, ref) {
  const {
      children,
      width,
      height,
      viewBox,
      disableAxisListener = false,
      title,
      desc
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const svgView = (0, _extends2.default)({
    width,
    height,
    x: 0,
    y: 0
  }, viewBox);
  (0, _useAxisEvents.useAxisEvents)(disableAxisListener);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(ChartChartsSurfaceStyles, (0, _extends2.default)({
    width: width,
    height: height,
    viewBox: `${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("title", {
      children: title
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("desc", {
      children: desc
    }), children]
  }));
});
process.env.NODE_ENV !== "production" ? ChartsSurface.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  className: _propTypes.default.string,
  desc: _propTypes.default.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: _propTypes.default.bool,
  /**
   * The height of the chart in px.
   */
  height: _propTypes.default.number.isRequired,
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  title: _propTypes.default.string,
  viewBox: _propTypes.default.shape({
    height: _propTypes.default.number,
    width: _propTypes.default.number,
    x: _propTypes.default.number,
    y: _propTypes.default.number
  }),
  /**
   * The width of the chart in px.
   */
  width: _propTypes.default.number.isRequired
} : void 0;