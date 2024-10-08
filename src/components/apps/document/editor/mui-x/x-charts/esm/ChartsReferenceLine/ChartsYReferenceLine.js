import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import composeClasses from '@mui/utils/composeClasses';
import { useDrawingArea, useYScale } from '../hooks';
import { ReferenceLineRoot } from './common';
import { ChartsText } from '../ChartsText';
import { getReferenceLineUtilityClass } from './chartsReferenceLineClasses';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const getTextParams = ({
  left,
  width,
  spacingX,
  labelAlign = 'middle'
}) => {
  switch (labelAlign) {
    case 'start':
      return {
        x: left + spacingX,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'start'
        }
      };
    case 'end':
      return {
        x: left + width - spacingX,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'end'
        }
      };
    default:
      return {
        x: left + width / 2,
        style: {
          dominantBaseline: 'auto',
          textAnchor: 'middle'
        }
      };
  }
};
let warnedOnce = false;
export function getYReferenceLineClasses(classes) {
  return composeClasses({
    root: ['root', 'horizontal'],
    line: ['line'],
    label: ['label']
  }, getReferenceLineUtilityClass, classes);
}
function ChartsYReferenceLine(props) {
  const {
    y,
    label = '',
    spacing = 5,
    classes: inClasses,
    labelAlign,
    lineStyle,
    labelStyle,
    axisId
  } = props;
  const {
    left,
    width
  } = useDrawingArea();
  const yAxisScale = useYScale(axisId);
  const yPosition = yAxisScale(y);
  if (yPosition === undefined) {
    if (process.env.NODE_ENV !== 'production') {
      if (!warnedOnce) {
        warnedOnce = true;
        console.error(`MUI X Charts: the value ${y} does not exist in the data of y axis with id ${axisId}.`);
      }
    }
    return null;
  }
  const d = `M ${left} ${yPosition} l ${width} 0`;
  const classes = getYReferenceLineClasses(inClasses);
  const spacingX = typeof spacing === 'object' ? spacing.x ?? 0 : spacing;
  const spacingY = typeof spacing === 'object' ? spacing.y ?? 0 : spacing;
  const textParams = _extends({
    y: yPosition - spacingY,
    text: label,
    fontSize: 12
  }, getTextParams({
    left,
    width,
    spacingX,
    labelAlign
  }), {
    className: classes.label
  });
  return /*#__PURE__*/_jsxs(ReferenceLineRoot, {
    className: classes.root,
    children: [/*#__PURE__*/_jsx("path", {
      d: d,
      className: classes.line,
      style: lineStyle
    }), /*#__PURE__*/_jsx(ChartsText, _extends({}, textParams, {
      style: _extends({}, textParams.style, labelStyle)
    }))]
  });
}
export { ChartsYReferenceLine };