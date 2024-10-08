"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTotalPrice = renderTotalPrice;
var React = _interopRequireWildcard(require("react"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const Value = (0, _styles.styled)('div')(({
  theme
}) => ({
  width: '100%',
  height: '100%',
  lineHeight: '100%',
  paddingRight: 8,
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '&.good': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.success.mainChannel} /  0.3)` : (0, _styles.alpha)(theme.palette.success.main, 0.3)
  },
  '&.bad': {
    backgroundColor: theme.vars ? `rgba(${theme.vars.palette.error.mainChannel} /  0.3)` : (0, _styles.alpha)(theme.palette.error.main, 0.3)
  }
}));
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});
const TotalPrice = /*#__PURE__*/React.memo(function TotalPrice(props) {
  const {
    value
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Value, {
    className: (0, _clsx.default)(value > 1000000 && "good", value < 1000000 && "bad"),
    children: currencyFormatter.format(value)
  });
});
function renderTotalPrice(params) {
  if (params.value == null) {
    return '';
  }

  // If the aggregated value does not have the same unit as the other cell
  // Then we fall back to the default rendering based on `valueGetter` instead of rendering the total price UI.
  if (params.aggregation && !params.aggregation.hasCellUnit) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(TotalPrice, {
    value: params.value
  });
}