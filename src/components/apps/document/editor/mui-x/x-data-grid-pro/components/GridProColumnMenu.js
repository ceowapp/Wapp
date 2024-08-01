"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridProColumnMenu = exports.GRID_COLUMN_MENU_SLOT_PROPS_PRO = exports.GRID_COLUMN_MENU_SLOTS_PRO = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _xDataGrid = require("@mui/x-data-grid");
var _GridColumnMenuPinningItem = require("./GridColumnMenuPinningItem");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const GRID_COLUMN_MENU_SLOTS_PRO = exports.GRID_COLUMN_MENU_SLOTS_PRO = (0, _extends2.default)({}, _xDataGrid.GRID_COLUMN_MENU_SLOTS, {
  columnMenuPinningItem: _GridColumnMenuPinningItem.GridColumnMenuPinningItem
});
const GRID_COLUMN_MENU_SLOT_PROPS_PRO = exports.GRID_COLUMN_MENU_SLOT_PROPS_PRO = (0, _extends2.default)({}, _xDataGrid.GRID_COLUMN_MENU_SLOT_PROPS, {
  columnMenuPinningItem: {
    displayOrder: 15
  }
});
const GridProColumnMenu = exports.GridProColumnMenu = /*#__PURE__*/React.forwardRef(function GridProColumnMenu(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_xDataGrid.GridGenericColumnMenu, (0, _extends2.default)({
    ref: ref
  }, props, {
    defaultSlots: GRID_COLUMN_MENU_SLOTS_PRO,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS_PRO
  }));
});
process.env.NODE_ENV !== "production" ? GridProColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  hideMenu: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired
} : void 0;