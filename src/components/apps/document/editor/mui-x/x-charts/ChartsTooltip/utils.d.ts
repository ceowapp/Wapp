import { AxisInteractionData, ItemInteractionData } from '../context/InteractionProvider';
import { CartesianChartSeriesType, ChartSeriesDefaultized, ChartSeriesType } from '../models/seriesType/config';
export declare function generateVirtualElement(mousePosition: {
    x: number;
    y: number;
} | null): {
    getBoundingClientRect: () => {
        width: number;
        height: number;
        x: number;
        y: number;
        top: number;
        right: number;
        bottom: number;
        left: number;
        toJSON: () => string;
    };
};
export declare function useMouseTracker(): {
    x: number;
    y: number;
} | null;
export type TriggerOptions = 'item' | 'axis' | 'none';
export declare function getTooltipHasData(trigger: TriggerOptions, displayedData: null | AxisInteractionData | ItemInteractionData<ChartSeriesType>): boolean;
export declare function isCartesianSeriesType(seriesType: string): seriesType is CartesianChartSeriesType;
export declare function isCartesianSeries(series: ChartSeriesDefaultized<ChartSeriesType> & {
    getColor: (dataIndex: number) => string;
}): series is ChartSeriesDefaultized<CartesianChartSeriesType> & {
    getColor: (dataIndex: number) => string;
};
export declare function utcFormatter(v: string | number | Date): string;
