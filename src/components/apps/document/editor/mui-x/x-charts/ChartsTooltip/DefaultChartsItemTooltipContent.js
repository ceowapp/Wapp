"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultChartsItemTooltipContent = DefaultChartsItemTooltipContent;
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _ChartsTooltipTable = require("./ChartsTooltipTable");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function DefaultChartsItemTooltipContent(props) {
  const {
    series,
    itemData,
    sx,
    classes,
    getColor
  } = props;
  if (itemData.dataIndex === undefined || !series.data[itemData.dataIndex]) {
    return null;
  }
  const {
    displayedLabel,
    color
  } = series.type === 'pie' ? {
    color: getColor(itemData.dataIndex),
    displayedLabel: series.data[itemData.dataIndex].label
  } : {
    color: getColor(itemData.dataIndex) ?? series.color,
    displayedLabel: series.label
  };
  const value = series.data[itemData.dataIndex];
  const formattedValue = series.valueFormatter?.(value, {
    dataIndex: itemData.dataIndex
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsTooltipTable.ChartsTooltipPaper, {
    sx: sx,
    className: classes.root,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsTooltipTable.ChartsTooltipTable, {
      className: classes.table,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("tbody", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ChartsTooltipTable.ChartsTooltipRow, {
          className: classes.row,
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsTooltipTable.ChartsTooltipCell, {
            className: (0, _clsx.default)(classes.markCell, classes.cell),
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsTooltipTable.ChartsTooltipMark, {
              color: color,
              className: classes.mark
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsTooltipTable.ChartsTooltipCell, {
            className: (0, _clsx.default)(classes.labelCell, classes.cell),
            children: displayedLabel
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ChartsTooltipTable.ChartsTooltipCell, {
            className: (0, _clsx.default)(classes.valueCell, classes.cell),
            children: formattedValue
          })]
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" ? DefaultChartsItemTooltipContent.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object.isRequired,
  /**
   * Get the color of the item with index `dataIndex`.
   * @param {number} dataIndex The data index of the item.
   * @returns {string} The color to display.
   */
  getColor: _propTypes.default.func.isRequired,
  /**
   * The data used to identify the triggered item.
   */
  itemData: _propTypes.default.shape({
    dataIndex: _propTypes.default.number,
    seriesId: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
    type: _propTypes.default.oneOf(['bar', 'line', 'pie', 'scatter']).isRequired
  }).isRequired,
  /**
   * The series linked to the triggered axis.
   */
  series: _propTypes.default.object.isRequired,
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
} : void 0;