import * as React from 'react';
import { HighlightScope } from '../context/HighlightProvider';
import { AnimatedAreaProps } from './AnimatedArea';
import { SeriesId } from '../models/seriesType/common';
export interface AreaElementClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element when higlighted. */
    highlighted: string;
    /** Styles applied to the root element when faded. */
    faded: string;
}
export type AreaElementClassKey = keyof AreaElementClasses;
export interface AreaElementOwnerState {
    id: SeriesId;
    color: string;
    gradientId?: string;
    isFaded: boolean;
    isHighlighted: boolean;
    classes?: Partial<AreaElementClasses>;
}
export declare function getAreaElementUtilityClass(slot: string): string;
export declare const areaElementClasses: AreaElementClasses;
export interface AreaElementSlots {
    /**
     * The component that renders the area.
     * @default AnimatedArea
     */
    area?: React.JSXElementConstructor<AnimatedAreaProps>;
}
export interface AreaElementSlotProps {
    area?: AnimatedAreaProps;
}
export interface AreaElementProps extends Omit<AreaElementOwnerState, 'isFaded' | 'isHighlighted'>, Pick<AnimatedAreaProps, 'skipAnimation'>, Omit<React.ComponentPropsWithoutRef<'path'>, 'color' | 'id'> {
    d: string;
    highlightScope?: Partial<HighlightScope>;
    /**
     * The props used for each component slot.
     * @default {}
     */
    slotProps?: AreaElementSlotProps;
    /**
     * Overridable component slots.
     * @default {}
     */
    slots?: AreaElementSlots;
}
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Areas demonstration](https://mui.com/x/react-charts/areas-demo/)
 *
 * API:
 *
 * - [AreaElement API](https://mui.com/x/api/charts/area-element/)
 */
declare function AreaElement(props: AreaElementProps): React.JSX.Element;
declare namespace AreaElement {
    var propTypes: any;
}
export { AreaElement };
