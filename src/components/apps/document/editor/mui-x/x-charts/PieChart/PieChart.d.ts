import * as React from 'react';
import { ResponsiveChartContainerProps } from '../ResponsiveChartContainer';
import { ChartsAxisProps } from '../ChartsAxis/ChartsAxis';
import { PieSeriesType } from '../models/seriesType';
import { MakeOptional } from '../models/helpers';
import { ChartsTooltipProps, ChartsTooltipSlotProps, ChartsTooltipSlots } from '../ChartsTooltip';
import { ChartsLegendProps, ChartsLegendSlotProps, ChartsLegendSlots } from '../ChartsLegend';
import { ChartsAxisHighlightProps } from '../ChartsAxisHighlight';
import { PiePlotProps, PiePlotSlotProps, PiePlotSlots } from './PiePlot';
import { PieValueType } from '../models/seriesType/pie';
import { ChartsAxisSlots, ChartsAxisSlotProps, ChartsXAxisProps, ChartsYAxisProps } from '../models/axis';
export interface PieChartSlots extends ChartsAxisSlots, PiePlotSlots, ChartsLegendSlots, ChartsTooltipSlots {
}
export interface PieChartSlotProps extends ChartsAxisSlotProps, PiePlotSlotProps, ChartsLegendSlotProps, ChartsTooltipSlotProps {
}
export interface PieChartProps extends Omit<ResponsiveChartContainerProps, 'series' | 'leftAxis' | 'bottomAxis'>, Omit<ChartsAxisProps, 'slots' | 'slotProps'>, Pick<PiePlotProps, 'skipAnimation'> {
    /**
     * Indicate which axis to display the bottom of the charts.
     * Can be a string (the id of the axis) or an object `ChartsXAxisProps`.
     * @default null
     */
    bottomAxis?: null | string | ChartsXAxisProps;
    /**
     * Indicate which axis to display the left of the charts.
     * Can be a string (the id of the axis) or an object `ChartsYAxisProps`.
     * @default null
     */
    leftAxis?: null | string | ChartsYAxisProps;
    /**
     * The series to display in the pie chart.
     * An array of [[PieSeriesType]] objects.
     */
    series: MakeOptional<PieSeriesType<MakeOptional<PieValueType, 'id'>>, 'type'>[];
    /**
     * The configuration of the tooltip.
     * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
     * @default { trigger: 'item' }
     */
    tooltip?: ChartsTooltipProps;
    /**
     * The configuration of axes highlight.
     * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
     * @default { x: 'none', y: 'none' }
     */
    axisHighlight?: ChartsAxisHighlightProps;
    /**
     * The props of the legend.
     * @default { direction: 'column', position: { vertical: 'middle', horizontal: 'right' } }
     * @deprecated Consider using `slotProps.legend` instead.
     */
    legend?: ChartsLegendProps;
    /**
     * Callback fired when a pie arc is clicked.
     */
    onItemClick?: PiePlotProps['onItemClick'];
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: PieChartSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: PieChartSlotProps;
}
/**
 * Demos:
 *
 * - [Pie](https://mui.com/x/react-charts/pie/)
 * - [Pie demonstration](https://mui.com/x/react-charts/pie-demo/)
 *
 * API:
 *
 * - [PieChart API](https://mui.com/x/api/charts/pie-chart/)
 */
declare function PieChart(props: PieChartProps): React.JSX.Element;
declare namespace PieChart {
    var propTypes: any;
}
export { PieChart };
