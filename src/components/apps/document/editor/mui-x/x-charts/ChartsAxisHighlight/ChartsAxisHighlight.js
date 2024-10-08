"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsAxisHighlight = ChartsAxisHighlight;
exports.chartsAxisHighlightClasses = exports.ChartsAxisHighlightPath = void 0;
exports.getAxisHighlightUtilityClass = getAxisHighlightUtilityClass;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _styles = require("@mui/material/styles");
var _InteractionProvider = require("../context/InteractionProvider");
var _CartesianContextProvider = require("../context/CartesianContextProvider");
var _useScale = require("../hooks/useScale");
var _isBandScale = require("../internals/isBandScale");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getAxisHighlightUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiChartsAxisHighlight', slot);
}
const chartsAxisHighlightClasses = exports.chartsAxisHighlightClasses = (0, _generateUtilityClasses.default)('MuiChartsAxisHighlight', ['root']);
const useUtilityClasses = () => {
  const slots = {
    root: ['root']
  };
  return (0, _composeClasses.default)(slots, getAxisHighlightUtilityClass);
};
const ChartsAxisHighlightPath = exports.ChartsAxisHighlightPath = (0, _styles.styled)('path', {
  name: 'MuiChartsAxisHighlight',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState,
  theme
}) => (0, _extends2.default)({
  pointerEvents: 'none'
}, ownerState.axisHighlight === 'band' && {
  fill: theme.palette.mode === 'light' ? 'gray' : 'white',
  fillOpacity: 0.1
}, ownerState.axisHighlight === 'line' && {
  strokeDasharray: '5 2',
  stroke: theme.palette.mode === 'light' ? '#000000' : '#ffffff'
}));
/**
 * Demos:
 *
 * - [Custom components](https://mui.com/x/react-charts/components/)
 *
 * API:
 *
 * - [ChartsAxisHighlight API](https://mui.com/x/api/charts/charts-axis-highlight/)
 */
function ChartsAxisHighlight(props) {
  const {
    x: xAxisHighlight,
    y: yAxisHighlight
  } = props;
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React.useContext(_CartesianContextProvider.CartesianContext);
  const classes = useUtilityClasses();
  const USED_X_AXIS_ID = xAxisIds[0];
  const USED_Y_AXIS_ID = yAxisIds[0];
  const xScale = xAxis[USED_X_AXIS_ID].scale;
  const yScale = yAxis[USED_Y_AXIS_ID].scale;
  const {
    axis
  } = React.useContext(_InteractionProvider.InteractionContext);
  const getXPosition = (0, _useScale.getValueToPositionMapper)(xScale);
  const getYPosition = (0, _useScale.getValueToPositionMapper)(yScale);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
    children: [xAxisHighlight === 'band' && axis.x !== null && (0, _isBandScale.isBandScale)(xScale) && /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale(axis.x.value) - (xScale.step() - xScale.bandwidth()) / 2} ${yScale.range()[0]} l ${xScale.step()} 0 l 0 ${yScale.range()[1] - yScale.range()[0]} l ${-xScale.step()} 0 Z`,
      className: classes.root,
      ownerState: {
        axisHighlight: 'band'
      }
    }), yAxisHighlight === 'band' && axis.y !== null && (0, _isBandScale.isBandScale)(yScale) && /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale.range()[0]} ${yScale(axis.y.value) - (yScale.step() - yScale.bandwidth()) / 2} l 0 ${yScale.step()} l ${xScale.range()[1] - xScale.range()[0]} 0 l 0 ${-yScale.step()} Z`,
      className: classes.root,
      ownerState: {
        axisHighlight: 'band'
      }
    }), xAxisHighlight === 'line' && axis.x !== null && /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartsAxisHighlightPath, {
      d: `M ${getXPosition(axis.x.value)} ${yScale.range()[0]} L ${getXPosition(axis.x.value)} ${yScale.range()[1]}`,
      className: classes.root,
      ownerState: {
        axisHighlight: 'line'
      }
    }), yAxisHighlight === 'line' && axis.y !== null && /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartsAxisHighlightPath, {
      d: `M ${xScale.range()[0]} ${getYPosition(axis.y.value)} L ${xScale.range()[1]} ${getYPosition(axis.y.value)}`,
      className: classes.root,
      ownerState: {
        axisHighlight: 'line'
      }
    })]
  });
}
process.env.NODE_ENV !== "production" ? ChartsAxisHighlight.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  x: _propTypes.default.oneOf(['band', 'line', 'none']),
  y: _propTypes.default.oneOf(['band', 'line', 'none'])
} : void 0;