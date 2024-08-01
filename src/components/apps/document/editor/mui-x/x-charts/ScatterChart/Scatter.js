"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scatter = Scatter;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useScale = require("../hooks/useScale");
var _useInteractionItemProps = require("../hooks/useInteractionItemProps");
var _InteractionProvider = require("../context/InteractionProvider");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Demos:
 *
 * - [Scatter](https://mui.com/x/react-charts/scatter/)
 * - [Scatter demonstration](https://mui.com/x/react-charts/scatter-demo/)
 *
 * API:
 *
 * - [Scatter API](https://mui.com/x/api/charts/scatter/)
 */
function Scatter(props) {
  const {
    series,
    xScale,
    yScale,
    color,
    colorGetter,
    markerSize,
    onItemClick
  } = props;
  const highlightScope = React.useMemo(() => (0, _extends2.default)({
    highlighted: 'item',
    faded: 'global'
  }, series.highlightScope), [series.highlightScope]);
  const {
    item,
    useVoronoiInteraction
  } = React.useContext(_InteractionProvider.InteractionContext);
  const skipInteractionHandlers = useVoronoiInteraction || series.disableHover;
  const getInteractionItemProps = (0, _useInteractionItemProps.useInteractionItemProps)(highlightScope, skipInteractionHandlers);
  const cleanData = React.useMemo(() => {
    const getXPosition = (0, _useScale.getValueToPositionMapper)(xScale);
    const getYPosition = (0, _useScale.getValueToPositionMapper)(yScale);
    const xRange = xScale.range();
    const yRange = yScale.range();
    const minXRange = Math.min(...xRange);
    const maxXRange = Math.max(...xRange);
    const minYRange = Math.min(...yRange);
    const maxYRange = Math.max(...yRange);
    const temp = [];
    for (let i = 0; i < series.data.length; i += 1) {
      const scatterPoint = series.data[i];
      const x = getXPosition(scatterPoint.x);
      const y = getYPosition(scatterPoint.y);
      const isInRange = x >= minXRange && x <= maxXRange && y >= minYRange && y <= maxYRange;
      const pointCtx = {
        type: 'scatter',
        seriesId: series.id,
        dataIndex: i
      };
      if (isInRange) {
        const isHighlighted = (0, _useInteractionItemProps.getIsHighlighted)(item, pointCtx, highlightScope);
        temp.push({
          x,
          y,
          isHighlighted,
          isFaded: !isHighlighted && (0, _useInteractionItemProps.getIsFaded)(item, pointCtx, highlightScope),
          interactionProps: getInteractionItemProps(pointCtx),
          id: scatterPoint.id,
          dataIndex: i,
          color: colorGetter ? colorGetter(i) : color
        });
      }
    }
    return temp;
  }, [xScale, yScale, series.data, series.id, item, highlightScope, getInteractionItemProps, color, colorGetter]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", {
    children: cleanData.map(dataPoint => /*#__PURE__*/(0, _jsxRuntime.jsx)("circle", (0, _extends2.default)({
      cx: 0,
      cy: 0,
      r: (dataPoint.isHighlighted ? 1.2 : 1) * markerSize,
      transform: `translate(${dataPoint.x}, ${dataPoint.y})`,
      fill: dataPoint.color,
      opacity: dataPoint.isFaded && 0.3 || 1,
      onClick: onItemClick && (event => onItemClick(event, {
        type: 'scatter',
        seriesId: series.id,
        dataIndex: dataPoint.dataIndex
      })),
      cursor: onItemClick ? 'pointer' : 'unset'
    }, dataPoint.interactionProps), dataPoint.id))
  });
}
process.env.NODE_ENV !== "production" ? Scatter.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  color: _propTypes.default.string.isRequired,
  colorGetter: _propTypes.default.func,
  markerSize: _propTypes.default.number.isRequired,
  /**
   * Callback fired when clicking on a scatter item.
   * @param {MouseEvent} event Mouse event recorded on the `<svg/>` element.
   * @param {ScatterItemIdentifier} scatterItemIdentifier The scatter item identifier.
   */
  onItemClick: _propTypes.default.func,
  series: _propTypes.default.object.isRequired,
  xScale: _propTypes.default.func.isRequired,
  yScale: _propTypes.default.func.isRequired
} : void 0;