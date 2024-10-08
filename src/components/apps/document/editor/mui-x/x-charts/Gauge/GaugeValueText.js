"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GaugeValueText = GaugeValueText;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _GaugeProvider = require("./GaugeProvider");
var _ChartsText = require("../ChartsText");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["text", "className"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function defaultFormatter({
  value
}) {
  return value === null ? null : value.toLocaleString();
}
function GaugeValueText(props) {
  const {
      text = defaultFormatter,
      className
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    value,
    valueMin,
    valueMax,
    cx,
    cy
  } = (0, _GaugeProvider.useGaugeState)();
  const formattedText = typeof text === 'function' ? text({
    value,
    valueMin,
    valueMax
  }) : text;
  if (formattedText === null) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsText.ChartsText, (0, _extends2.default)({
      x: cx,
      y: cy,
      text: formattedText,
      style: {
        textAnchor: 'middle',
        dominantBaseline: 'central'
      }
    }, other))
  });
}
process.env.NODE_ENV !== "production" ? GaugeValueText.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Height of a text line (in `em`).
   */
  lineHeight: _propTypes.default.number,
  /**
   * If `true`, the line width is computed.
   * @default false
   */
  needsComputation: _propTypes.default.bool,
  ownerState: _propTypes.default.any,
  /**
   * Style applied to text elements.
   */
  style: _propTypes.default.object,
  text: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string])
} : void 0;