"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ChartsPiecewiseGradient;
var React = _interopRequireWildcard(require("react"));
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function ChartsPiecewiseGradient(props) {
  const {
    isReveresed,
    gradientId,
    size,
    direction,
    scale,
    colorMap
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("linearGradient", {
    id: gradientId,
    x1: "0",
    x2: "0",
    y1: "0",
    y2: "0",
    [`${direction}${isReveresed ? 1 : 2}`]: `${size}px`,
    gradientUnits: "userSpaceOnUse" // Use the SVG coordinate instead of the component ones.
    ,
    children: colorMap.thresholds.map((threshold, index) => {
      const x = scale(threshold);
      if (x === undefined) {
        return null;
      }
      const offset = isReveresed ? 1 - x / size : x / size;
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(React.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("stop", {
          offset: offset,
          stopColor: colorMap.colors[index],
          stopOpacity: 1
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("stop", {
          offset: offset,
          stopColor: colorMap.colors[index + 1],
          stopOpacity: 1
        })]
      }, threshold.toString() + index);
    })
  });
}