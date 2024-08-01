"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SeriesContext = void 0;
exports.SeriesContextProvider = SeriesContextProvider;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _formatter = _interopRequireDefault(require("../BarChart/formatter"));
var _formatter2 = _interopRequireDefault(require("../ScatterChart/formatter"));
var _formatter3 = _interopRequireDefault(require("../LineChart/formatter"));
var _formatter4 = _interopRequireDefault(require("../PieChart/formatter"));
var _defaultizeColor = require("../internals/defaultizeColor");
var _colorPalettes = require("../colorPalettes");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const SeriesContext = exports.SeriesContext = /*#__PURE__*/React.createContext({});
if (process.env.NODE_ENV !== 'production') {
  SeriesContext.displayName = 'SeriesContext';
}
const seriesTypeFormatter = {
  bar: _formatter.default,
  scatter: _formatter2.default,
  line: _formatter3.default,
  pie: _formatter4.default
};

/**
 * This methods is the interface between what the developer is providing and what components receives
 * To simplify the components behaviors, it groups series by type, such that LinePlots props are not updated if some line data are modified
 * It also add defaultized values such as the ids, colors
 * @param series The array of series provided by devs
 * @param colors The color palette used to defaultize series colors
 * @returns An object structuring all the series by type.
 */
const formatSeries = (series, colors, dataset) => {
  // Group series by type
  const seriesGroups = {};
  series.forEach((seriesData, seriesIndex) => {
    const {
      id = `auto-generated-id-${seriesIndex}`,
      type
    } = seriesData;
    if (seriesGroups[type] === undefined) {
      seriesGroups[type] = {
        series: {},
        seriesOrder: []
      };
    }
    if (seriesGroups[type]?.series[id] !== undefined) {
      throw new Error(`MUI X Charts: series' id "${id}" is not unique.`);
    }
    seriesGroups[type].series[id] = (0, _extends2.default)({
      id
    }, (0, _defaultizeColor.defaultizeColor)(seriesData, seriesIndex, colors));
    seriesGroups[type].seriesOrder.push(id);
  });
  const formattedSeries = {};
  // Apply formater on a type group
  Object.keys(seriesTypeFormatter).forEach(type => {
    if (seriesGroups[type] !== undefined) {
      formattedSeries[type] = seriesTypeFormatter[type]?.(seriesGroups[type], dataset) ?? seriesGroups[type];
    }
  });
  return formattedSeries;
};
function SeriesContextProvider(props) {
  const {
    series,
    dataset,
    colors = _colorPalettes.blueberryTwilightPalette,
    children
  } = props;
  const theme = (0, _styles.useTheme)();
  const formattedSeries = React.useMemo(() => formatSeries(series, typeof colors === 'function' ? colors(theme.palette.mode) : colors, dataset), [series, colors, theme.palette.mode, dataset]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(SeriesContext.Provider, {
    value: formattedSeries,
    children: children
  });
}