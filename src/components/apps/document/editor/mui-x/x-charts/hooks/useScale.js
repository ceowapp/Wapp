"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getValueToPositionMapper = getValueToPositionMapper;
exports.useXScale = useXScale;
exports.useYScale = useYScale;
var React = _interopRequireWildcard(require("react"));
var _CartesianContextProvider = require("../context/CartesianContextProvider");
var _isBandScale = require("../internals/isBandScale");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * For a given scale return a function that map value to their position.
 * Usefull when dealing with specific scale such as band.
 * @param scale The scale to use
 * @returns (value: any) => number
 */
function getValueToPositionMapper(scale) {
  if ((0, _isBandScale.isBandScale)(scale)) {
    return value => scale(value) + scale.bandwidth() / 2;
  }
  return value => scale(value);
}
function useXScale(identifier) {
  const {
    xAxis,
    xAxisIds
  } = React.useContext(_CartesianContextProvider.CartesianContext);
  const id = typeof identifier === 'string' ? identifier : xAxisIds[identifier ?? 0];
  return xAxis[id].scale;
}
function useYScale(identifier) {
  const {
    yAxis,
    yAxisIds
  } = React.useContext(_CartesianContextProvider.CartesianContext);
  const id = typeof identifier === 'string' ? identifier : yAxisIds[identifier ?? 0];
  return yAxis[id].scale;
}