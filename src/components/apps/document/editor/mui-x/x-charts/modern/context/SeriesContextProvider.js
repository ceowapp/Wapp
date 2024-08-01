import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import barSeriesFormatter from '../BarChart/formatter';
import scatterSeriesFormatter from '../ScatterChart/formatter';
import lineSeriesFormatter from '../LineChart/formatter';
import pieSeriesFormatter from '../PieChart/formatter';
import { defaultizeColor } from '../internals/defaultizeColor';
import { blueberryTwilightPalette } from '../colorPalettes';
import { jsx as _jsx } from "react/jsx-runtime";
export const SeriesContext = /*#__PURE__*/React.createContext({});
if (process.env.NODE_ENV !== 'production') {
  SeriesContext.displayName = 'SeriesContext';
}
const seriesTypeFormatter = {
  bar: barSeriesFormatter,
  scatter: scatterSeriesFormatter,
  line: lineSeriesFormatter,
  pie: pieSeriesFormatter
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
    seriesGroups[type].series[id] = _extends({
      id
    }, defaultizeColor(seriesData, seriesIndex, colors));
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
    colors = blueberryTwilightPalette,
    children
  } = props;
  const theme = useTheme();
  const formattedSeries = React.useMemo(() => formatSeries(series, typeof colors === 'function' ? colors(theme.palette.mode) : colors, dataset), [series, colors, theme.palette.mode, dataset]);
  return /*#__PURE__*/_jsx(SeriesContext.Provider, {
    value: formattedSeries,
    children: children
  });
}
export { SeriesContextProvider };