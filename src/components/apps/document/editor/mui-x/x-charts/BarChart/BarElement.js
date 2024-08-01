"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BarElement = BarElement;
exports.barElementClasses = exports.BarElementPath = void 0;
exports.getBarElementUtilityClass = getBarElementUtilityClass;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _utils = require("@mui/base/utils");
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _styles = require("@mui/material/styles");
var _d3Color = require("d3-color");
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _web = require("@react-spring/web");
var _useInteractionItemProps = require("../hooks/useInteractionItemProps");
var _InteractionProvider = require("../context/InteractionProvider");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["id", "dataIndex", "classes", "color", "highlightScope", "slots", "slotProps", "style", "onClick"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getBarElementUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiBarElement', slot);
}
const barElementClasses = exports.barElementClasses = (0, _generateUtilityClasses.default)('MuiBarElement', ['root']);
const useUtilityClasses = ownerState => {
  const {
    classes,
    id
  } = ownerState;
  const slots = {
    root: ['root', `series-${id}`]
  };
  return (0, _composeClasses.default)(slots, getBarElementUtilityClass, classes);
};
const BarElementPath = exports.BarElementPath = (0, _styles.styled)(_web.animated.rect, {
  name: 'MuiBarElement',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState
}) => ({
  stroke: 'none',
  fill: ownerState.isHighlighted ? (0, _d3Color.color)(ownerState.color).brighter(0.5).formatHex() : ownerState.color,
  transition: 'opacity 0.2s ease-in, fill 0.2s ease-in',
  opacity: ownerState.isFaded && 0.3 || 1
}));
function BarElement(props) {
  const {
      id,
      dataIndex,
      classes: innerClasses,
      color,
      highlightScope,
      slots,
      slotProps,
      style,
      onClick
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const getInteractionItemProps = (0, _useInteractionItemProps.useInteractionItemProps)(highlightScope);
  const {
    item
  } = React.useContext(_InteractionProvider.InteractionContext);
  const isHighlighted = (0, _useInteractionItemProps.getIsHighlighted)(item, {
    type: 'bar',
    seriesId: id,
    dataIndex
  }, highlightScope);
  const isFaded = !isHighlighted && (0, _useInteractionItemProps.getIsFaded)(item, {
    type: 'bar',
    seriesId: id,
    dataIndex
  }, highlightScope);
  const ownerState = {
    id,
    dataIndex,
    classes: innerClasses,
    color,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses(ownerState);
  const Bar = slots?.bar ?? BarElementPath;
  const barProps = (0, _utils.useSlotProps)({
    elementType: Bar,
    externalSlotProps: slotProps?.bar,
    additionalProps: (0, _extends2.default)({}, other, getInteractionItemProps({
      type: 'bar',
      seriesId: id,
      dataIndex
    }), {
      style,
      className: classes.root,
      onClick,
      cursor: onClick ? 'pointer' : 'unset'
    }),
    ownerState
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Bar, (0, _extends2.default)({}, barProps));
}
process.env.NODE_ENV !== "production" ? BarElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: _propTypes.default.object,
  dataIndex: _propTypes.default.number.isRequired,
  highlightScope: _propTypes.default.shape({
    faded: _propTypes.default.oneOf(['global', 'none', 'series']),
    highlighted: _propTypes.default.oneOf(['item', 'none', 'series'])
  }),
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
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