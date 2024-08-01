"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedLine = AnimatedLine;
exports.LineElementPath = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _web = require("@react-spring/web");
var _d3Color = require("d3-color");
var _styles = require("@mui/material/styles");
var _useAnimatedPath = require("../internals/useAnimatedPath");
var _utils = require("../internals/utils");
var _useChartId = require("../hooks/useChartId");
var _useDrawingArea = require("../hooks/useDrawingArea");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["d", "skipAnimation", "ownerState"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const LineElementPath = exports.LineElementPath = (0, _styles.styled)(_web.animated.path, {
  name: 'MuiLineElement',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  strokeWidth: 2,
  strokeLinejoin: 'round',
  fill: 'none',
  stroke: ownerState.gradientId && `url(#${ownerState.gradientId})` || ownerState.isHighlighted && (0, _d3Color.color)(ownerState.color).brighter(0.5).formatHex() || ownerState.color,
  transition: 'opacity 0.2s ease-in, stroke 0.2s ease-in',
  opacity: ownerState.isFaded ? 0.3 : 1
}));
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [AnimatedLine API](https://mui.com/x/api/charts/animated-line/)
 */
function AnimatedLine(props) {
  const {
      d,
      skipAnimation,
      ownerState
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    left,
    top,
    bottom,
    width,
    height,
    right
  } = (0, _useDrawingArea.useDrawingArea)();
  const chartId = (0, _useChartId.useChartId)();
  const path = (0, _useAnimatedPath.useAnimatedPath)(d, skipAnimation);
  const {
    animatedWidth
  } = (0, _web.useSpring)({
    from: {
      animatedWidth: left
    },
    to: {
      animatedWidth: width + left + right
    },
    reset: false,
    immediate: skipAnimation
  });
  const clipId = (0, _utils.cleanId)(`${chartId}-${ownerState.id}-line-clip`);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("clipPath", {
      id: clipId,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_web.animated.rect, {
        x: 0,
        y: 0,
        width: animatedWidth,
        height: top + height + bottom
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
      clipPath: `url(#${clipId})`,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(LineElementPath, (0, _extends2.default)({}, other, {
        ownerState: ownerState,
        d: path
      }))
    })]
  });
}
process.env.NODE_ENV !== "production" ? AnimatedLine.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  d: _propTypes.default.string.isRequired,
  ownerState: _propTypes.default.shape({
    classes: _propTypes.default.object,
    color: _propTypes.default.string.isRequired,
    gradientId: _propTypes.default.string,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
    isFaded: _propTypes.default.bool.isRequired,
    isHighlighted: _propTypes.default.bool.isRequired
  }).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: _propTypes.default.bool
} : void 0;