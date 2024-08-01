"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKeepGroupedColumnsHidden = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _xDataGridPro = require("@mui/x-data-grid-pro");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const updateColumnVisibilityModel = (columnVisibilityModel, rowGroupingModel, prevRowGroupingModel) => {
  const newColumnVisibilityModel = (0, _extends2.default)({}, columnVisibilityModel);
  rowGroupingModel?.forEach(field => {
    if (!prevRowGroupingModel?.includes(field)) {
      newColumnVisibilityModel[field] = false;
    }
  });
  prevRowGroupingModel?.forEach(field => {
    if (!rowGroupingModel?.includes(field)) {
      newColumnVisibilityModel[field] = true;
    }
  });
  return newColumnVisibilityModel;
};

/**
 * Automatically hide columns when added to the row grouping model and stop hiding them when they are removed.
 * Handles both the `props.initialState.rowGrouping.model` and `props.rowGroupingModel`
 * Does not work when used with the `hide` property of `GridColDef`
 */
const useKeepGroupedColumnsHidden = props => {
  const initialProps = React.useRef(props);
  const rowGroupingModel = React.useRef(props.rowGroupingModel ?? props.initialState?.rowGrouping?.model);
  React.useEffect(() => {
    props.apiRef.current.subscribeEvent('rowGroupingModelChange', newModel => {
      const columnVisibilityModel = updateColumnVisibilityModel((0, _xDataGridPro.gridColumnVisibilityModelSelector)(props.apiRef), newModel, rowGroupingModel.current);
      props.apiRef.current.setColumnVisibilityModel(columnVisibilityModel);
      rowGroupingModel.current = newModel;
    });
  }, [props.apiRef]);
  return React.useMemo(() => {
    const invariantInitialState = initialProps.current.initialState;
    const columnVisibilityModel = updateColumnVisibilityModel(invariantInitialState?.columns?.columnVisibilityModel, rowGroupingModel.current, undefined);
    return (0, _extends2.default)({}, invariantInitialState, {
      columns: (0, _extends2.default)({}, invariantInitialState?.columns, {
        columnVisibilityModel
      })
    });
  }, []);
};
exports.useKeepGroupedColumnsHidden = useKeepGroupedColumnsHidden;