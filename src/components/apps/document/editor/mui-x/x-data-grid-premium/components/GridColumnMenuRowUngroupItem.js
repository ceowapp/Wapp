"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridColumnMenuRowUngroupItem = GridColumnMenuRowUngroupItem;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _MenuItem = _interopRequireDefault(require("@mui/material/MenuItem"));
var _ListItemIcon = _interopRequireDefault(require("@mui/material/ListItemIcon"));
var _ListItemText = _interopRequireDefault(require("@mui/material/ListItemText"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
var _useGridApiContext = require("../hooks/utils/useGridApiContext");
var _gridRowGroupingSelector = require("../hooks/features/rowGrouping/gridRowGroupingSelector");
var _useGridRootProps = require("../hooks/utils/useGridRootProps");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function GridColumnMenuRowUngroupItem(props) {
  const {
    colDef,
    onClick
  } = props;
  const apiRef = (0, _useGridApiContext.useGridApiContext)();
  const rowGroupingModel = (0, _xDataGridPro.useGridSelector)(apiRef, _gridRowGroupingSelector.gridRowGroupingSanitizedModelSelector);
  const columnsLookup = (0, _xDataGridPro.useGridSelector)(apiRef, _xDataGridPro.gridColumnLookupSelector);
  const rootProps = (0, _useGridRootProps.useGridRootProps)();
  if (!colDef.groupable) {
    return null;
  }
  const ungroupColumn = event => {
    apiRef.current.removeRowGroupingCriteria(colDef.field);
    onClick(event);
  };
  const groupColumn = event => {
    apiRef.current.addRowGroupingCriteria(colDef.field);
    onClick(event);
  };
  const name = columnsLookup[colDef.field].headerName ?? colDef.field;
  if (rowGroupingModel.includes(colDef.field)) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
      onClick: ungroupColumn,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuUngroupIcon, {
          fontSize: "small"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
        children: apiRef.current.getLocaleText('unGroupColumn')(name)
      })]
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_MenuItem.default, {
    onClick: groupColumn,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemIcon.default, {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(rootProps.slots.columnMenuGroupIcon, {
        fontSize: "small"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItemText.default, {
      children: apiRef.current.getLocaleText('groupColumn')(name)
    })]
  });
}
process.env.NODE_ENV !== "production" ? GridColumnMenuRowUngroupItem.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  onClick: _propTypes.default.func.isRequired
} : void 0;