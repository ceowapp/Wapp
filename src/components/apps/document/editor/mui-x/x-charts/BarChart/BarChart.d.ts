import * as React from 'react';
import { BarPlotProps, BarPlotSlotProps, BarPlotSlots } from './BarPlot';
import { ResponsiveChartContainerProps } from '../ResponsiveChartContainer';
import { ChartsAxisProps } from '../ChartsAxis';
import { BarSeriesType } from '../models/seriesType/bar';
import { MakeOptional } from '../models/helpers';
import { ChartsTooltipProps, ChartsTooltipSlotProps, ChartsTooltipSlots } from '../ChartsTooltip';
import { ChartsLegendProps, ChartsLegendSlots, ChartsLegendSlotProps } from '../ChartsLegend';
import { ChartsAxisHighlightProps } from '../ChartsAxisHighlight';
import { ChartsAxisSlots, ChartsAxisSlotProps } from '../models/axis';
import { ChartsGridProps } from '../ChartsGrid';
import { ChartsOnAxisClickHandlerProps } from '../ChartsOnAxisClickHandler';
export interface BarChartSlots extends ChartsAxisSlots, BarPlotSlots, ChartsLegendSlots, ChartsTooltipSlots {
}
export interface BarChartSlotProps extends ChartsAxisSlotProps, BarPlotSlotProps, ChartsLegendSlotProps, ChartsTooltipSlotProps {
}
export interface BarChartProps extends Omit<ResponsiveChartContainerProps, 'series'>, Omit<ChartsAxisProps, 'slots' | 'slotProps'>, Omit<BarPlotProps, 'slots' | 'slotProps'>, ChartsOnAxisClickHandlerProps {
    /**
     * The series to display in the bar chart.
     * An array of [[BarSeriesType]] objects.
     */
    series: MakeOptional<BarSeriesType, 'type'>[];
    /**
     * The configuration of the tooltip.
     * @see See {@link https://mui.com/x/react-charts/tooltip/ tooltip docs} for more details.
     */
    tooltip?: ChartsTooltipProps;
    /**
     * Option to display a cartesian grid in the background.
     */
    grid?: Pick<ChartsGridProps, 'vertical' | 'horizontal'>;
    /**
     * The configuration of axes highlight.
     * Default is set to 'band' in the bar direction.
     * Depends on `layout` prop.
     * @see See {@link https://mui.com/x/react-charts/tooltip/#highlights highlight docs} for more details.
     *
     */
    axisHighlight?: ChartsAxisHighlightProps;
    /**
     * @deprecated Consider using `slotProps.legend` instead.
     */
    legend?: ChartsLegendProps;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: BarChartSlots;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: BarChartSlotProps;
    /**
     * The direction of the bar elements.
     * @default 'vertical'
     */
    layout?: BarSeriesType['layout'];
}
/**
 * Demos:
 *
 * - [Bars](https://mui.com/x/react-charts/bars/)
 * - [Bar demonstration](https://mui.com/x/react-charts/bar-demo/)
 * - [Stacking](https://mui.com/x/react-charts/stacking/)
 *
 * API:
 *
 * - [BarChart API](https://mui.com/x/api/charts/bar-chart/)
 */
declare const BarChart: React.ForwardRefExoticComponent<BarChartProps & React.RefAttributes<unknown>>;
export { BarChart };
