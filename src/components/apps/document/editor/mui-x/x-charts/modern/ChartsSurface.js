import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
const _excluded = ["children", "width", "height", "viewBox", "disableAxisListener", "className", "title", "desc"];
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useAxisEvents } from './hooks/useAxisEvents';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const ChartChartsSurfaceStyles = styled('svg', {
  name: 'MuiChartsSurface',
  slot: 'Root'
})(() => ({}));
const ChartsSurface = /*#__PURE__*/React.forwardRef(function ChartsSurface(props, ref) {
  const {
      children,
      width,
      height,
      viewBox,
      disableAxisListener = false,
      title,
      desc
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const svgView = _extends({
    width,
    height,
    x: 0,
    y: 0
  }, viewBox);
  useAxisEvents(disableAxisListener);
  return /*#__PURE__*/_jsxs(ChartChartsSurfaceStyles, _extends({
    width: width,
    height: height,
    viewBox: `${svgView.x} ${svgView.y} ${svgView.width} ${svgView.height}`,
    ref: ref
  }, other, {
    children: [/*#__PURE__*/_jsx("title", {
      children: title
    }), /*#__PURE__*/_jsx("desc", {
      children: desc
    }), children]
  }));
});
process.env.NODE_ENV !== "production" ? ChartsSurface.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  className: PropTypes.string,
  desc: PropTypes.string,
  /**
   * If `true`, the charts will not listen to the mouse move event.
   * It might break interactive features, but will improve performance.
   * @default false
   */
  disableAxisListener: PropTypes.bool,
  /**
   * The height of the chart in px.
   */
  height: PropTypes.number.isRequired,
  sx: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])), PropTypes.func, PropTypes.object]),
  title: PropTypes.string,
  viewBox: PropTypes.shape({
    height: PropTypes.number,
    width: PropTypes.number,
    x: PropTypes.number,
    y: PropTypes.number
  }),
  /**
   * The width of the chart in px.
   */
  width: PropTypes.number.isRequired
} : void 0;
export { ChartsSurface };