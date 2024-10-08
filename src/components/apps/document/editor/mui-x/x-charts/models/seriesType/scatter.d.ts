import { DefaultizedProps } from '../helpers';
import { CartesianSeriesType, CommonDefaultizedProps, CommonSeriesType, SeriesId } from './common';
export type ScatterValueType = {
    x: number;
    y: number;
    z?: any;
    /**
     * A unique identifier for the scatter point
     */
    id: string | number;
};
export interface ScatterSeriesType extends CommonSeriesType<ScatterValueType>, CartesianSeriesType {
    type: 'scatter';
    data: ScatterValueType[];
    markerSize?: number;
    label?: string;
    /**
     * If true, the interaction will not use element hover for this series.
     * @default false
     */
    disableHover?: boolean;
    /**
     * The id of the z-axis used to render the series.
     */
    zAxisKey?: string;
}
/**
 * An object that allows to identify a single scatter item.
 * Used for item interaction
 */
export type ScatterItemIdentifier = {
    type: 'scatter';
    seriesId: SeriesId;
    dataIndex: number;
};
export interface DefaultizedScatterSeriesType extends DefaultizedProps<ScatterSeriesType, CommonDefaultizedProps | 'color'> {
}
