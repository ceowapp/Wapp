import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["id", "dataIndex", "classes", "color", "highlightScope", "slots", "slotProps", "style", "onClick"];
import * as React from 'react';
import PropTypes from 'prop-types';
import composeClasses from '@mui/utils/composeClasses';
import { useSlotProps } from '@mui/base/utils';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { styled } from '@mui/material/styles';
import { color as d3Color } from 'd3-color';
import generateUtilityClasses from '@mui/utils/generateUtilityClasses';
import { animated } from '@react-spring/web';
import { getIsFaded, getIsHighlighted, useInteractionItemProps } from '../hooks/useInteractionItemProps';
import { InteractionContext } from '../context/InteractionProvider';
import { jsx as _jsx } from "react/jsx-runtime";
export function getBarElementUtilityClass(slot) {
  return generateUtilityClass('MuiBarElement', slot);
}
export const barElementClasses = generateUtilityClasses('MuiBarElement', ['root']);
const useUtilityClasses = ownerState => {
  const {
    classes,
    id
  } = ownerState;
  const slots = {
    root: ['root', `series-${id}`]
  };
  return composeClasses(slots, getBarElementUtilityClass, classes);
};
export const BarElementPath = styled(animated.rect, {
  name: 'MuiBarElement',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  stroke: 'none',
  fill: ownerState.isHighlighted ? d3Color(ownerState.color).brighter(0.5).formatHex() : ownerState.color,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  opacity: ownerState.isFaded && 0.3 || 1
}));
function BarElement(props) {
  const {
      id,
      dataIndex,
      classes: innerClasses,
      color,
      highlightScope,
      slots,
      slotProps,
      style,
      onClick
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const getInteractionItemProps = useInteractionItemProps(highlightScope);
  const {
    item
  } = React.useContext(InteractionContext);
  const isHighlighted = getIsHighlighted(item, {
    type: 'bar',
    seriesId: id,
    dataIndex
  }, highlightScope);
  const isFaded = !isHighlighted && getIsFaded(item, {
    type: 'bar',
    seriesId: id,
    dataIndex
  }, highlightScope);
  const ownerState = {
    id,
    dataIndex,
    classes: innerClasses,
    color,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses(ownerState);
  const Bar = slots?.bar ?? BarElementPath;
  const barProps = useSlotProps({
    elementType: Bar,
    externalSlotProps: slotProps?.bar,
    additionalProps: _extends({}, other, getInteractionItemProps({
      type: 'bar',
      seriesId: id,
      dataIndex
    }), {
      style,
      className: classes.root,
      onClick,
      cursor: onClick ? 'pointer' : 'unset'
    }),
    ownerState
  });
  return /*#__PURE__*/_jsx(Bar, _extends({}, barProps));
}
process.env.NODE_ENV !== "production" ? BarElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: PropTypes.object,
  dataIndex: PropTypes.number.isRequired,
  highlightScope: PropTypes.shape({
    faded: PropTypes.oneOf(['global', 'none', 'series']),
    highlighted: PropTypes.oneOf(['item', 'none', 'series'])
  }),
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
export { BarElement };