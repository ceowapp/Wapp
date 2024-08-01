"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderEditIncoterm = renderEditIncoterm;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGridPremium = require("@mui/x-data-grid-premium");
var _Select = _interopRequireDefault(require("@mui/material/Select"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _staticData = require("../services/static-data");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function EditIncoterm(props) {
  const {
    id,
    value,
    field
  } = props;
  const apiRef = (0, _xDataGridPremium.useGridApiContext)();
  const handleChange = async event => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value
    }, event);
    apiRef.current.stopCellEditMode({
      id,
      field
    });
  };
  const handleClose = (event, reason) => {
    if (reason === 'backdropClick') {
      apiRef.current.stopCellEditMode({
        id,
        field
      });
    }
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Select.default, {
    value: value,
    onChange: handleChange,
    MenuProps: {
      onClose: handleClose
    },
    sx: {
      height: '100%',
      '& .MuiSelect-select': {
        display: 'flex',
        alignItems: 'center',
        pl: 1
      }
    },
    autoFocus: true,
    fullWidth: true,
    open: true,
    children: _staticData.INCOTERM_OPTIONS.map(option => {
      const tooltip = option.slice(option.indexOf('(') + 1, option.indexOf(')'));
      const code = option.slice(0, option.indexOf('(')).trim();
      return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
        value: option,
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
          sx: {
            minWidth: 36
          },
          children: code
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
          primary: tooltip,
          sx: {
            overflow: 'hidden'
          }
        })]
      }, option);
    })
  });
}
function renderEditIncoterm(params) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(EditIncoterm, (0, _extends2.default)({}, params));
}