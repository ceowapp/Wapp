"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChartsLegend = ChartsLegend;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _utils = require("@mui/base/utils");
var _utils2 = require("@mui/utils");
var _styles = require("@mui/material/styles");
var _utils3 = require("./utils");
var _SeriesContextProvider = require("../context/SeriesContextProvider");
var _chartsLegendClasses = require("./chartsLegendClasses");
var _DefaultChartsLegend = require("./DefaultChartsLegend");
var _hooks = require("../hooks");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes,
    direction
  } = ownerState;
  const slots = {
    root: ['root', direction],
    mark: ['mark'],
    label: ['label'],
    series: ['series']
  };
  return (0, _utils2.unstable_composeClasses)(slots, _chartsLegendClasses.getLegendUtilityClass, classes);
};
const defaultProps = {
  position: {
    horizontal: 'middle',
    vertical: 'top'
  },
  direction: 'row'
};
function ChartsLegend(inProps) {
  const props = (0, _styles.useThemeProps)({
    props: (0, _extends2.default)({}, defaultProps, inProps),
    name: 'MuiChartsLegend'
  });
  const {
    position,
    direction,
    hidden,
    slots,
    slotProps
  } = props;
  const theme = (0, _styles.useTheme)();
  const classes = useUtilityClasses((0, _extends2.default)({}, props, {
    theme
  }));
  const drawingArea = (0, _hooks.useDrawingArea)();
  const series = React.useContext(_SeriesContextProvider.SeriesContext);
  const seriesToDisplay = (0, _utils3.getSeriesToDisplay)(series);
  const ChartLegendRender = slots?.legend ?? _DefaultChartsLegend.DefaultChartsLegend;
  const chartLegendRenderProps = (0, _utils.useSlotProps)({
    elementType: ChartLegendRender,
    externalSlotProps: slotProps?.legend,
    additionalProps: {
      position,
      direction,
      classes,
      drawingArea,
      series,
      hidden,
      seriesToDisplay
    },
    ownerState: {}
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ChartLegendRender, (0, _extends2.default)({}, chartLegendRenderProps));
}
process.env.NODE_ENV !== "production" ? ChartsLegend.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  /**
   * The direction of the legend layout.
   * The default depends on the chart.
   */
  direction: _propTypes.default.oneOf(['column', 'row']),
  /**
   * Set to true to hide the legend.
   * @default false
   */
  hidden: _propTypes.default.bool,
  /**
   * The position of the legend.
   */
  position: _propTypes.default.shape({
    horizontal: _propTypes.default.oneOf(['left', 'middle', 'right']).isRequired,
    vertical: _propTypes.default.oneOf(['bottom', 'middle', 'top']).isRequired
  }),
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: _propTypes.default.object
} : void 0;