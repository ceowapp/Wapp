import * as React from 'react';
import { CartesianContext } from '../../../context/CartesianContextProvider';
import { DrawingContext } from '../../../context/DrawingProvider';
import { useDrawingArea } from '../../../hooks';
import ChartsPiecewiseGradient from './ChartsPiecewiseGradient';
import ChartsContinuousGradient from './ChartsContinuousGradient';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function useChartGradient() {
  const {
    chartId
  } = React.useContext(DrawingContext);
  return React.useCallback((axisId, direction) => `${chartId}-graient-${direction}-${axisId}`, [chartId]);
}
export function ChartsAxesGradients() {
  const {
    top,
    height,
    bottom,
    left,
    width,
    right
  } = useDrawingArea();
  const svgHeight = top + height + bottom;
  const svgWidth = left + width + right;
  const getGradientId = useChartGradient();
  const {
    xAxisIds,
    xAxis,
    yAxisIds,
    yAxis
  } = React.useContext(CartesianContext);
  return /*#__PURE__*/_jsxs("defs", {
    children: [yAxisIds.filter(axisId => yAxis[axisId].colorMap !== undefined).map(axisId => {
      const gradientId = getGradientId(axisId, 'y');
      const {
        colorMap,
        scale,
        colorScale,
        reverse
      } = yAxis[axisId];
      if (colorMap?.type === 'piecewise') {
        return /*#__PURE__*/_jsx(ChartsPiecewiseGradient, {
          isReveresed: !reverse,
          scale: scale,
          colorMap: colorMap,
          size: svgHeight,
          gradientId: gradientId,
          direction: "y"
        }, gradientId);
      }
      if (colorMap?.type === 'continuous') {
        return /*#__PURE__*/_jsx(ChartsContinuousGradient, {
          isReveresed: !reverse,
          scale: scale,
          colorScale: colorScale,
          colorMap: colorMap,
          size: svgHeight,
          gradientId: gradientId,
          direction: "y"
        }, gradientId);
      }
      return null;
    }), xAxisIds.filter(axisId => xAxis[axisId].colorMap !== undefined).map(axisId => {
      const gradientId = getGradientId(axisId, 'x');
      const {
        colorMap,
        scale,
        reverse,
        colorScale
      } = xAxis[axisId];
      if (colorMap?.type === 'piecewise') {
        return /*#__PURE__*/_jsx(ChartsPiecewiseGradient, {
          isReveresed: reverse,
          scale: scale,
          colorMap: colorMap,
          size: svgWidth,
          gradientId: gradientId,
          direction: "x"
        }, gradientId);
      }
      if (colorMap?.type === 'continuous') {
        return /*#__PURE__*/_jsx(ChartsContinuousGradient, {
          isReveresed: reverse,
          scale: scale,
          colorScale: colorScale,
          colorMap: colorMap,
          size: svgWidth,
          gradientId: gradientId,
          direction: "x"
        }, gradientId);
      }
      return null;
    })]
  });
}