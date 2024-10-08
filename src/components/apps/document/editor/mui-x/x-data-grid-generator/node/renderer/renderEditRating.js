"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderEditRating = renderEditRating;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _Box = _interopRequireDefault(require("@mui/material/Box"));
var _Rating = _interopRequireDefault(require("@mui/material/Rating"));
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function EditRating(props) {
  const {
    id,
    value,
    field
  } = props;
  const apiRef = (0, _xDataGridPremium.useGridApiContext)();
  const changedThroughKeyboard = React.useRef(false);
  const handleChange = async event => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: Number(event.target.value)
    }, event);
    if (!changedThroughKeyboard.current) {
      apiRef.current.stopCellEditMode({
        id,
        field
      });
    }
    changedThroughKeyboard.current = false;
  };
  const handleRef = element => {
    if (element) {
      if (value !== 0) {
        element.querySelector(`input[value="${value}"]`).focus();
      } else {
        element.querySelector('input[value=""]').focus();
      }
    }
  };
  const handleKeyDown = event => {
    if (event.key.startsWith('Arrow')) {
      changedThroughKeyboard.current = true;
    } else {
      changedThroughKeyboard.current = false;
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Box.default, {
    sx: {
      display: 'flex',
      alignItems: 'center',
      lineHeight: '24px',
      color: 'text.secondary',
      mr: 1
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Rating.default, {
      ref: handleRef,
      name: "rating",
      value: Number(value),
      precision: 1,
      onChange: handleChange,
      sx: {
        mr: 1
      },
      onKeyDown: handleKeyDown
    }), Number(value)]
  });
}
function renderEditRating(params) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(EditRating, (0, _extends2.default)({}, params));
}