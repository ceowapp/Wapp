"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = exports.GRID_COLUMN_MENU_SLOTS_PREMIUM = void 0;
exports.GridColumnMenuGroupingItem = GridColumnMenuGroupingItem;
exports.GridPremiumColumnMenu = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _GridColumnMenuAggregationItem = require("./GridColumnMenuAggregationItem");
var _rowGrouping = require("../hooks/features/rowGrouping");
var _GridColumnMenuRowGroupItem = require("./GridColumnMenuRowGroupItem");
var _GridColumnMenuRowUngroupItem = require("./GridColumnMenuRowUngroupItem");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridColumnMenuGroupingItem(props) {
  const {
    colDef
  } = props;
  if ((0, _rowGrouping.isGroupingColumn)(colDef.field)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnMenuRowGroupItem.GridColumnMenuRowGroupItem, (0, _extends2.default)({}, props));
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_GridColumnMenuRowUngroupItem.GridColumnMenuRowUngroupItem, (0, _extends2.default)({}, props));
}
const GRID_COLUMN_MENU_SLOTS_PREMIUM = exports.GRID_COLUMN_MENU_SLOTS_PREMIUM = (0, _extends2.default)({}, _xDataGridPro.GRID_COLUMN_MENU_SLOTS, {
  columnMenuAggregationItem: _GridColumnMenuAggregationItem.GridColumnMenuAggregationItem,
  columnMenuGroupingItem: GridColumnMenuGroupingItem
});
const GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = exports.GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM = (0, _extends2.default)({}, _xDataGridPro.GRID_COLUMN_MENU_SLOT_PROPS, {
  columnMenuAggregationItem: {
    displayOrder: 23
  },
  columnMenuGroupingItem: {
    displayOrder: 27
  }
});
const GridPremiumColumnMenu = exports.GridPremiumColumnMenu = /*#__PURE__*/React.forwardRef(function GridPremiumColumnMenuSimple(props, ref) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_xDataGridPro.GridGenericColumnMenu, (0, _extends2.default)({
    ref: ref
  }, props, {
    defaultSlots: GRID_COLUMN_MENU_SLOTS_PREMIUM,
    defaultSlotProps: GRID_COLUMN_MENU_SLOT_PROPS_PREMIUM
  }));
});
process.env.NODE_ENV !== "production" ? GridPremiumColumnMenu.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  hideMenu: _propTypes.default.func.isRequired,
  open: _propTypes.default.bool.isRequired
} : void 0;