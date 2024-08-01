"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderPnl = renderPnl;
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
  fontVariantNumeric: 'tabular-nums',
  '&.positive': {
    color: theme.palette.mode === 'light' ? theme.palette.success.dark : theme.palette.success.light
  },
  '&.negative': {
    color: theme.palette.mode === 'light' ? theme.palette.error.dark : theme.palette.error.light
  }
}));
function pnlFormatter(value) {
  return value < 0 ? `(${Math.abs(value).toLocaleString()})` : value.toLocaleString();
}
const Pnl = /*#__PURE__*/React.memo(function Pnl(props) {
  const {
    value
  } = props;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Value, {
    className: (0, _clsx.default)(value > 0 && "positive", value < 0 && "negative"),
    children: pnlFormatter(value)
  });
});
function renderPnl(params) {
  if (params.value == null) {
    return '';
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Pnl, {
    value: params.value
  });
}