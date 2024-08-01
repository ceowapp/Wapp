"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsText = ChartsText;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _getWordsByLines = require("../internals/getWordsByLines");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["x", "y", "style", "text", "ownerState"],
  _excluded2 = ["angle", "textAnchor", "dominantBaseline"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Helper component to manage multiline text in SVG
 */
function ChartsText(props) {
  const {
      x,
      y,
      style: styleProps,
      text
    } = props,
    textProps = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const _ref = styleProps ?? {},
    {
      angle,
      textAnchor,
      dominantBaseline
    } = _ref,
    style = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
  const wordsByLines = React.useMemo(() => (0, _getWordsByLines.getWordsByLines)({
    style,
    needsComputation: text.includes('\n'),
    text
  }), [style, text]);
  let startDy;
  switch (dominantBaseline) {
    case 'hanging':
      startDy = 0;
      break;
    case 'central':
      startDy = (wordsByLines.length - 1) / 2 * -wordsByLines[0].height;
      break;
    default:
      startDy = (wordsByLines.length - 1) * -wordsByLines[0].height;
      break;
  }
  const transforms = [];
  // if (scaleToFit) {
  //   const lineWidth = wordsByLines[0].width;
  //   transforms.push(`scale(${(isNumber(width as number) ? (width as number) / lineWidth : 1) / lineWidth})`);
  // }
  if (angle) {
    transforms.push(`rotate(${angle}, ${x}, ${y})`);
  }
  if (transforms.length) {
    textProps.transform = transforms.join(' ');
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("text", (0, _extends2.default)({}, textProps, {
    x: x,
    y: y,
    textAnchor: textAnchor,
    dominantBaseline: dominantBaseline,
    style: style,
    children: wordsByLines.map((line, index) => /*#__PURE__*/(0, _jsxRuntime.jsx)("tspan", {
      x: x,
      dy: `${index === 0 ? startDy : wordsByLines[0].height}px`,
      dominantBaseline: dominantBaseline // Propagated to fix Safari issue: https://github.com/mui/mui-x/issues/10808
      ,
      children: line.text
    }, index))
  }));
}
process.env.NODE_ENV !== "production" ? ChartsText.propTypes = {
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
  /**
   * Text displayed.
   */
  text: _propTypes.default.string.isRequired
} : void 0;