import * as React from 'react';
import PropTypes from 'prop-types';
import { SeriesContext } from '../context/SeriesContextProvider';
import { DrawingContext } from '../context/DrawingProvider';
import { PieArcPlot } from './PieArcPlot';
import { PieArcLabelPlot } from './PieArcLabelPlot';
import { getPercentageValue } from '../internals/utils';
import { getPieCoordinates } from './getPieCoordinates';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Demos:
 *
 * - [Pie](https://mui.com/x/react-charts/pie/)
 * - [Pie demonstration](https://mui.com/x/react-charts/pie-demo/)
 *
 * API:
 *
 * - [PiePlot API](https://mui.com/x/api/charts/pie-plot/)
 */
function PiePlot(props) {
  const {
    skipAnimation,
    slots,
    slotProps,
    onItemClick
  } = props;
  const seriesData = React.useContext(SeriesContext).pie;
  const {
    left,
    top,
    width,
    height
  } = React.useContext(DrawingContext);
  if (seriesData === undefined) {
    return null;
  }
  const {
    series,
    seriesOrder
  } = seriesData;
  return /*#__PURE__*/_jsxs("g", {
    children: [seriesOrder.map(seriesId => {
      const {
        innerRadius: innerRadiusParam,
        outerRadius: outerRadiusParam,
        cornerRadius,
        paddingAngle,
        data,
        cx: cxParam,
        cy: cyParam,
        highlighted,
        faded,
        highlightScope
      } = series[seriesId];
      const {
        cx,
        cy,
        availableRadius
      } = getPieCoordinates({
        cx: cxParam,
        cy: cyParam
      }, {
        width,
        height
      });
      const outerRadius = getPercentageValue(outerRadiusParam ?? availableRadius, availableRadius);
      const innerRadius = getPercentageValue(innerRadiusParam ?? 0, availableRadius);
      return /*#__PURE__*/_jsx("g", {
        transform: `translate(${left + cx}, ${top + cy})`,
        children: /*#__PURE__*/_jsx(PieArcPlot, {
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          cornerRadius: cornerRadius,
          paddingAngle: paddingAngle,
          id: seriesId,
          data: data,
          skipAnimation: skipAnimation,
          highlightScope: highlightScope,
          highlighted: highlighted,
          faded: faded,
          onItemClick: onItemClick,
          slots: slots,
          slotProps: slotProps
        })
      }, seriesId);
    }), seriesOrder.map(seriesId => {
      const {
        innerRadius: innerRadiusParam,
        outerRadius: outerRadiusParam,
        arcLabelRadius: arcLabelRadiusParam,
        cornerRadius,
        paddingAngle,
        arcLabel,
        arcLabelMinAngle,
        data,
        cx: cxParam,
        cy: cyParam,
        highlightScope
      } = series[seriesId];
      const {
        cx,
        cy,
        availableRadius
      } = getPieCoordinates({
        cx: cxParam,
        cy: cyParam
      }, {
        width,
        height
      });
      const outerRadius = getPercentageValue(outerRadiusParam ?? availableRadius, availableRadius);
      const innerRadius = getPercentageValue(innerRadiusParam ?? 0, availableRadius);
      const arcLabelRadius = arcLabelRadiusParam === undefined ? (outerRadius + innerRadius) / 2 : getPercentageValue(arcLabelRadiusParam, availableRadius);
      return /*#__PURE__*/_jsx("g", {
        transform: `translate(${left + cx}, ${top + cy})`,
        children: /*#__PURE__*/_jsx(PieArcLabelPlot, {
          innerRadius: innerRadius,
          outerRadius: outerRadius ?? availableRadius,
          arcLabelRadius: arcLabelRadius,
          cornerRadius: cornerRadius,
          paddingAngle: paddingAngle,
          id: seriesId,
          data: data,
          skipAnimation: skipAnimation,
          arcLabel: arcLabel,
          arcLabelMinAngle: arcLabelMinAngle,
          highlightScope: highlightScope,
          slots: slots,
          slotProps: slotProps
        })
      }, seriesId);
    })]
  });
}
process.env.NODE_ENV !== "production" ? PiePlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Callback fired when a pie item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
   * @param {DefaultizedPieValueType} item The pie item.
   */
  onItemClick: PropTypes.func,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: PropTypes.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: PropTypes.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: PropTypes.object
} : void 0;
export { PiePlot };