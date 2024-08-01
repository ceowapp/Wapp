"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsGrid = ChartsGrid;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _styles = require("@mui/material/styles");
var _CartesianContextProvider = require("../context/CartesianContextProvider");
var _useTicks = require("../hooks/useTicks");
var _chartsGridClasses = require("./chartsGridClasses");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["vertical", "horizontal"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GridRoot = (0, _styles.styled)('g', {
  name: 'MuiChartsGrid',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root
})(({
  theme
}) => ({
  [`& .${_chartsGridClasses.chartsGridClasses.line}`]: {
    stroke: (theme.vars || theme).palette.divider,
    shapeRendering: 'crispEdges',
    strokeWidth: 1
  }
}));
const useUtilityClasses = ({
  classes
}) => {
  const slots = {
    root: ['root'],
    verticalLine: ['line', 'verticalLine'],
    horizontalLine: ['line', 'horizontalLine']
  };
  return (0, _composeClasses.default)(slots, _chartsGridClasses.getChartsGridUtilityClass, classes);
};
/**
 * Demos:
 *
 * - [Axis](https://mui.com/x/react-charts/axis/)
 *
 * API:
 *
 * - [ChartsGrid API](https://mui.com/x/api/charts/charts-axis/)
 */
function ChartsGrid(props) {
  const {
      vertical,
      horizontal
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const {
    xAxis,
    xAxisIds,
    yAxis,
    yAxisIds
  } = React.useContext(_CartesianContextProvider.CartesianContext);
  const classes = useUtilityClasses(props);
  const horizontalAxisId = yAxisIds[0];
  const verticalAxisId = xAxisIds[0];
  const {
    scale: xScale,
    tickNumber: xTickNumber,
    tickInterval: xTickInterval
  } = xAxis[verticalAxisId];
  const {
    scale: yScale,
    tickNumber: yTickNumber,
    tickInterval: yTickInterval
  } = yAxis[horizontalAxisId];
  const xTicks = (0, _useTicks.useTicks)({
    scale: xScale,
    tickNumber: xTickNumber,
    tickInterval: xTickInterval
  });
  const yTicks = (0, _useTicks.useTicks)({
    scale: yScale,
    tickNumber: yTickNumber,
    tickInterval: yTickInterval
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(GridRoot, (0, _extends2.default)({}, other, {
    className: classes.root,
    children: [vertical && xTicks.map(({
      formattedValue,
      offset
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      y1: yScale.range()[0],
      y2: yScale.range()[1],
      x1: offset,
      x2: offset,
      className: classes.verticalLine
    }, `vertical-${formattedValue}`)), horizontal && yTicks.map(({
      formattedValue,
      offset
    }) => /*#__PURE__*/(0, _jsxRuntime.jsx)("line", {
      y1: offset,
      y2: offset,
      x1: xScale.range()[0],
      x2: xScale.range()[1],
      className: classes.horizontalLine
    }, `horizontal-${formattedValue}`))]
  }));
}
process.env.NODE_ENV !== "production" ? ChartsGrid.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * Displays horizontal grid.
   */
  horizontal: _propTypes.default.bool,
  /**
   * Displays vertical grid.
   */
  vertical: _propTypes.default.bool
} : void 0;