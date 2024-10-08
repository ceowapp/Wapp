import { AxisConfig, D3Scale } from '../models/axis';
export interface TickParams {
    /**
     * Maximal step between two ticks.
     * When using time data, the value is assumed to be in ms.
     * Not supported by categorical axis (band, points).
     */
    tickMaxStep?: number;
    /**
     * Minimal step between two ticks.
     * When using time data, the value is assumed to be in ms.
     * Not supported by categorical axis (band, points).
     */
    tickMinStep?: number;
    /**
     * The number of ticks. This number is not guaranteed.
     * Not supported by categorical axis (band, points).
     */
    tickNumber?: number;
    /**
     * Defines which ticks are displayed. Its value can be:
     * - 'auto' In such case the ticks are computed based on axis scale and other parameters.
     * - a filtering function of the form `(value, index) => boolean` which is available only if the axis has a data property.
     * - an array containing the values where ticks should be displayed.
     * @default 'auto'
     */
    tickInterval?: 'auto' | ((value: any, index: number) => boolean) | any[];
    /**
     * The placement of ticks in regard to the band interval.
     * Only used if scale is 'band'.
     * @default 'extremities'
     */
    tickPlacement?: 'start' | 'end' | 'middle' | 'extremities';
    /**
     * The placement of ticks label. Can be the middle of the band, or the tick position.
     * Only used if scale is 'band'.
     * @default 'middle'
     */
    tickLabelPlacement?: 'middle' | 'tick';
}
export declare function getTickNumber(params: TickParams & {
    range: any[];
    domain: any[];
}): number;
export type TickItemType = {
    /**
     * This property is undefined only if it's the tick closing the last band
     */
    value?: any;
    formattedValue?: string;
    offset: number;
    labelOffset: number;
};
export declare function useTicks(options: {
    scale: D3Scale;
    valueFormatter?: AxisConfig['valueFormatter'];
} & Pick<TickParams, 'tickNumber' | 'tickInterval' | 'tickPlacement' | 'tickLabelPlacement'>): TickItemType[];
