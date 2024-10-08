import * as React from 'react';
import { AxisConfig, AxisDefaultized } from '../models/axis';
import { DatasetType } from '../models/seriesType/config';
import { MakeOptional } from '../models/helpers';
export type CartesianContextProviderProps = {
    /**
     * The configuration of the x-axes.
     * If not provided, a default axis config is used.
     * An array of [[AxisConfig]] objects.
     */
    xAxis?: MakeOptional<AxisConfig, 'id'>[];
    /**
     * The configuration of the y-axes.
     * If not provided, a default axis config is used.
     * An array of [[AxisConfig]] objects.
     */
    yAxis?: MakeOptional<AxisConfig, 'id'>[];
    /**
     * An array of objects that can be used to populate series and axes data using their `dataKey` property.
     */
    dataset?: DatasetType;
    children: React.ReactNode;
};
type DefaultizedAxisConfig = {
    [axisKey: string]: AxisDefaultized;
};
export declare const CartesianContext: React.Context<{
    /**
     * Mapping from x-axis key to scaling configuration.
     */
    xAxis: {
        DEFAULT_X_AXIS_KEY: AxisDefaultized;
    } & DefaultizedAxisConfig;
    /**
     * Mapping from y-axis key to scaling configuration.
     */
    yAxis: {
        DEFAULT_X_AXIS_KEY: AxisDefaultized;
    } & DefaultizedAxisConfig;
    /**
     * The x-axes IDs sorted by order they got provided.
     */
    xAxisIds: string[];
    /**
     * The y-axes IDs sorted by order they got provided.
     */
    yAxisIds: string[];
}>;
declare function CartesianContextProvider(props: CartesianContextProviderProps): React.JSX.Element;
export { CartesianContextProvider };
