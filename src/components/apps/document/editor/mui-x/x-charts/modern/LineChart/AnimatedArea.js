import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["d", "skipAnimation", "ownerState"];
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { color as d3Color } from 'd3-color';
import { animated, useSpring } from '@react-spring/web';
import { useAnimatedPath } from '../internals/useAnimatedPath';
import { cleanId } from '../internals/utils';
import { useChartId, useDrawingArea } from '../hooks';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const AreaElementPath = styled(animated.path, {
  name: 'MuiAreaElement',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  stroke: 'none',
  fill: ownerState.gradientId && `url(#${ownerState.gradientId})` || ownerState.isHighlighted && d3Color(ownerState.color).brighter(1).formatHex() || d3Color(ownerState.color).brighter(0.5).formatHex(),
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  opacity: ownerState.isFaded ? 0.3 : 1
}));
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Areas demonstration](https://mui.com/x/react-charts/areas-demo/)
 *
 * API:
 *
 * - [AreaElement API](https://mui.com/x/api/charts/animated-area/)
 */
function AnimatedArea(props) {
  const {
      d,
      skipAnimation,
      ownerState
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const {
    left,
    top,
    right,
    bottom,
    width,
    height
  } = useDrawingArea();
  const chartId = useChartId();
  const path = useAnimatedPath(d, skipAnimation);
  const {
    animatedWidth
  } = useSpring({
    from: {
      animatedWidth: left
    },
    to: {
      animatedWidth: width + left + right
    },
    reset: false,
    immediate: skipAnimation
  });
  const clipId = cleanId(`${chartId}-${ownerState.id}-area-clip`);
  return /*#__PURE__*/_jsxs(React.Fragment, {
    children: [/*#__PURE__*/_jsx("clipPath", {
      id: clipId,
      children: /*#__PURE__*/_jsx(animated.rect, {
        x: 0,
        y: 0,
        width: animatedWidth,
        height: top + height + bottom
      })
    }), /*#__PURE__*/_jsx("g", {
      clipPath: `url(#${clipId})`,
      children: /*#__PURE__*/_jsx(AreaElementPath, _extends({}, other, {
        ownerState: ownerState,
        d: path
      }))
    })]
  });
}
process.env.NODE_ENV !== "production" ? AnimatedArea.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  d: PropTypes.string.isRequired,
  ownerState: PropTypes.shape({
    classes: PropTypes.object,
    color: PropTypes.string.isRequired,
    gradientId: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    isFaded: PropTypes.bool.isRequired,
    isHighlighted: PropTypes.bool.isRequired
  }).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: PropTypes.bool
} : void 0;
export { AnimatedArea };