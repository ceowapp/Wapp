"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ZAxisContext = void 0;
exports.ZAxisContextProvider = ZAxisContextProvider;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _colorScale = require("../internals/colorScale");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const ZAxisContext = exports.ZAxisContext = /*#__PURE__*/React.createContext({
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
    return (0, _extends2.default)({}, axisConfig, {
      data: dataset.map(d => d[dataKey])
    });
  }), [inZAxis, dataset]);
  const value = React.useMemo(() => {
    const allZAxis = zAxis?.map((axis, index) => (0, _extends2.default)({
      id: `defaultized-z-axis-${index}`
    }, axis)) ?? [];
    const completedZAxis = {};
    allZAxis.forEach(axis => {
      completedZAxis[axis.id] = (0, _extends2.default)({}, axis, {
        colorScale: axis.colorMap && (axis.colorMap.type === 'ordinal' && axis.data ? (0, _colorScale.getOrdinalColorScale)((0, _extends2.default)({
          values: axis.data
        }, axis.colorMap)) : (0, _colorScale.getColorScale)(axis.colorMap))
      });
    });
    return {
      zAxis: completedZAxis,
      zAxisIds: allZAxis.map(({
        id
      }) => id)
    };
  }, [zAxis]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ZAxisContext.Provider, {
    value: value,
    children: children
  });
}
process.env.NODE_ENV !== "production" ? ZAxisContextProvider.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  children: _propTypes.default.node,
  /**
   * An array of objects that can be used to populate series and axes data using their `dataKey` property.
   */
  dataset: _propTypes.default.arrayOf(_propTypes.default.object),
  /**
   * The configuration of the z-axes.
   */
  zAxis: _propTypes.default.arrayOf(_propTypes.default.shape({
    colorMap: _propTypes.default.oneOfType([_propTypes.default.shape({
      color: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.string.isRequired), _propTypes.default.func]).isRequired,
      max: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.number]),
      min: _propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.number]),
      type: _propTypes.default.oneOf(['continuous']).isRequired
    }), _propTypes.default.shape({
      colors: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
      thresholds: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.number]).isRequired).isRequired,
      type: _propTypes.default.oneOf(['piecewise']).isRequired
    }), _propTypes.default.shape({
      colors: _propTypes.default.arrayOf(_propTypes.default.string).isRequired,
      type: _propTypes.default.oneOf(['ordinal']).isRequired,
      unknownColor: _propTypes.default.string,
      values: _propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.instanceOf(Date), _propTypes.default.number, _propTypes.default.string]).isRequired)
    })]),
    data: _propTypes.default.array,
    dataKey: _propTypes.default.string,
    id: _propTypes.default.string
  }))
} : void 0;