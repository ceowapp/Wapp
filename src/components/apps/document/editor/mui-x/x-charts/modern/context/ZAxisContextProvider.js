import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import PropTypes from 'prop-types';
import { getColorScale, getOrdinalColorScale } from '../internals/colorScale';
import { jsx as _jsx } from "react/jsx-runtime";
export const ZAxisContext = /*#__PURE__*/React.createContext({
  zAxis: {},
  zAxisIds: []
});
if (process.env.NODE_ENV !== 'production') {
  ZAxisContext.displayName = 'ZAxisContext';
}
function ZAxisContextProvider(props) {
  const {
    zAxis: inZAxis,
    dataset,
    children
  } = props;
  const zAxis = React.useMemo(() => inZAxis?.map(axisConfig => {
    const dataKey = axisConfig.dataKey;
    if (dataKey === undefined || axisConfig.data !== undefined) {
      return axisConfig;
    }
    if (dataset === undefined) {
      throw Error('MUI X Charts: z-axis uses `dataKey` but no `dataset` is provided.');
    }
    return _extends({}, axisConfig, {
      data: dataset.map(d => d[dataKey])
    });
  }), [inZAxis, dataset]);
  const value = React.useMemo(() => {
    const allZAxis = zAxis?.map((axis, index) => _extends({
      id: `defaultized-z-axis-${index}`
    }, axis)) ?? [];
    const completedZAxis = {};
    allZAxis.forEach(axis => {
      completedZAxis[axis.id] = _extends({}, axis, {
        colorScale: axis.colorMap && (axis.colorMap.type === 'ordinal' && axis.data ? getOrdinalColorScale(_extends({
          values: axis.data
        }, axis.colorMap)) : getColorScale(axis.colorMap))
      });
    });
    return {
      zAxis: completedZAxis,
      zAxisIds: allZAxis.map(({
        id
      }) => id)
    };
  }, [zAxis]);
  return /*#__PURE__*/_jsx(ZAxisContext.Provider, {
    value: value,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? ZAxisContextProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: PropTypes.node,
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: PropTypes.arrayOf(PropTypes.object),
  /**
   * The configuration of the z-axes.
   */
  zAxis: PropTypes.arrayOf(PropTypes.shape({
    colorMap: PropTypes.oneOfType([PropTypes.shape({
      color: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string.isRequired), PropTypes.func]).isRequired,
      max: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
      min: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]),
      type: PropTypes.oneOf(['continuous']).isRequired
    }), PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string).isRequired,
      thresholds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number]).isRequired).isRequired,
      type: PropTypes.oneOf(['piecewise']).isRequired
    }), PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string).isRequired,
      type: PropTypes.oneOf(['ordinal']).isRequired,
      unknownColor: PropTypes.string,
      values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number, PropTypes.string]).isRequired)
    })]),
    data: PropTypes.array,
    dataKey: PropTypes.string,
    id: PropTypes.string
  }))
} : void 0;
export { ZAxisContextProvider };