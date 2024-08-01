"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieArcPlot = PieArcPlot;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _web = require("@react-spring/web");
var _PieArc = require("./PieArc");
var _transition = require("./dataTransform/transition");
var _useTransformData = require("./dataTransform/useTransformData");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["slots", "slotProps", "innerRadius", "outerRadius", "cornerRadius", "paddingAngle", "id", "highlightScope", "highlighted", "faded", "data", "onItemClick", "skipAnimation"],
  _excluded2 = ["startAngle", "endAngle", "paddingAngle", "innerRadius", "arcLabelRadius", "outerRadius", "cornerRadius"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function PieArcPlot(props) {
  const {
      slots,
      slotProps,
      innerRadius = 0,
      outerRadius,
      cornerRadius = 0,
      paddingAngle = 0,
      id,
      highlightScope,
      highlighted,
      faded = {
        additionalRadius: -5
      },
      data,
      onItemClick,
      skipAnimation
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const transformedData = (0, _useTransformData.useTransformData)({
    innerRadius,
    outerRadius,
    cornerRadius,
    paddingAngle,
    id,
    highlightScope,
    highlighted,
    faded,
    data
  });
  const transition = (0, _web.useTransition)(transformedData, (0, _extends2.default)({}, _transition.defaultTransitionConfig, {
    immediate: skipAnimation
  }));
  if (data.length === 0) {
    return null;
  }
  const Arc = slots?.pieArc ?? _PieArc.PieArc;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("g", (0, _extends2.default)({}, other, {
    children: transition((_ref, item, _, index) => {
      let {
          startAngle,
          endAngle,
          paddingAngle: pA,
          innerRadius: iR,
          outerRadius: oR,
          cornerRadius: cR
        } = _ref,
        style = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded2);
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(Arc, (0, _extends2.default)({
        startAngle: startAngle,
        endAngle: endAngle,
        paddingAngle: pA,
        innerRadius: iR,
        outerRadius: oR,
        cornerRadius: cR,
        style: style,
        id: id,
        color: item.color,
        dataIndex: index,
        highlightScope: highlightScope,
        isFaded: item.isFaded,
        isHighlighted: item.isHighlighted,
        onClick: onItemClick && (event => {
          onItemClick(event, {
            type: 'pie',
            seriesId: id,
            dataIndex: index
          }, item);
        })
      }, slotProps?.pieArc));
    })
  }));
}
process.env.NODE_ENV !== "production" ? PieArcPlot.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The radius between circle center and the arc label in px.
   * @default (innerRadius - outerRadius) / 2
   */
  arcLabelRadius: _propTypes.default.number,
  /**
   * The radius applied to arc corners (similar to border radius).
   * @default 0
   */
  cornerRadius: _propTypes.default.number,
  data: _propTypes.default.arrayOf(_propTypes.default.shape({
    color: _propTypes.default.string.isRequired,
    endAngle: _propTypes.default.number.isRequired,
    formattedValue: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
    index: _propTypes.default.number.isRequired,
    label: _propTypes.default.string,
    padAngle: _propTypes.default.number.isRequired,
    startAngle: _propTypes.default.number.isRequired,
    value: _propTypes.default.number.isRequired
  })).isRequired,
  /**
   * Override the arc attibutes when it is faded.
   * @default { additionalRadius: -5 }
   */
  faded: _propTypes.default.shape({
    additionalRadius: _propTypes.default.number,
    arcLabelRadius: _propTypes.default.number,
    color: _propTypes.default.string,
    cornerRadius: _propTypes.default.number,
    innerRadius: _propTypes.default.number,
    outerRadius: _propTypes.default.number,
    paddingAngle: _propTypes.default.number
  }),
  /**
   * Override the arc attibutes when it is highlighted.
   */
  highlighted: _propTypes.default.shape({
    additionalRadius: _propTypes.default.number,
    arcLabelRadius: _propTypes.default.number,
    color: _propTypes.default.string,
    cornerRadius: _propTypes.default.number,
    innerRadius: _propTypes.default.number,
    outerRadius: _propTypes.default.number,
    paddingAngle: _propTypes.default.number
  }),
  highlightScope: _propTypes.default.shape({
    faded: _propTypes.default.oneOf(['global', 'none', 'series']),
    highlighted: _propTypes.default.oneOf(['item', 'none', 'series'])
  }),
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  /**
   * The radius between circle center and the begining of the arc.
   * @default 0
   */
  innerRadius: _propTypes.default.number,
  /**
   * Callback fired when a pie item is clicked.
   * @param {React.MouseEvent<SVGPathElement, MouseEvent>} event The event source of the callback.
   * @param {PieItemIdentifier} pieItemIdentifier The pie item identifier.
   * @param {DefaultizedPieValueType} item The pie item.
   */
  onItemClick: _propTypes.default.func,
  /**
   * The radius between circle center and the end of the arc.
   */
  outerRadius: _propTypes.default.number.isRequired,
  /**
   * The padding angle (deg) between two arcs.
   * @default 0
   */
  paddingAngle: _propTypes.default.number,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: _propTypes.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: _propTypes.default.object
} : void 0;