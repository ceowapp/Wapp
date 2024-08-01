"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkElement = MarkElement;
exports.getMarkElementUtilityClass = getMarkElementUtilityClass;
exports.markElementClasses = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _styles = require("@mui/material/styles");
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _d3Shape = require("d3-shape");
var _web = require("@react-spring/web");
var _utils = require("../internals/utils");
var _InteractionProvider = require("../context/InteractionProvider");
var _useInteractionItemProps = require("../hooks/useInteractionItemProps");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["x", "y", "id", "classes", "color", "shape", "dataIndex", "highlightScope", "onClick", "skipAnimation"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getMarkElementUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiMarkElement', slot);
}
const markElementClasses = exports.markElementClasses = (0, _generateUtilityClasses.default)('MuiMarkElement', ['root', 'highlighted', 'faded']);
const useUtilityClasses = ownerState => {
  const {
    classes,
    id,
    isFaded,
    isHighlighted
  } = ownerState;
  const slots = {
    root: ['root', `series-${id}`, isHighlighted && 'highlighted', isFaded && 'faded']
  };
  return (0, _composeClasses.default)(slots, getMarkElementUtilityClass, classes);
};
const MarkElementPath = (0, _styles.styled)(_web.animated.path, {
  name: 'MuiMarkElement',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  ownerState,
  theme
}) => ({
  fill: (theme.vars || theme).palette.background.paper,
  stroke: ownerState.color,
  strokeWidth: 2
}));
MarkElementPath.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  as: _propTypes.default.elementType,
  ownerState: _propTypes.default.shape({
    classes: _propTypes.default.object,
    color: _propTypes.default.string.isRequired,
    id: _propTypes.default.string.isRequired,
    isFaded: _propTypes.default.bool.isRequired,
    isHighlighted: _propTypes.default.bool.isRequired
  }).isRequired,
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object])
};
/**
 * Demos:
 *
 * - [Lines](https://mui.com/x/react-charts/lines/)
 * - [Line demonstration](https://mui.com/x/react-charts/line-demo/)
 *
 * API:
 *
 * - [MarkElement API](https://mui.com/x/api/charts/mark-element/)
 */
function MarkElement(props) {
  const {
      x,
      y,
      id,
      classes: innerClasses,
      color,
      shape,
      dataIndex,
      highlightScope,
      onClick,
      skipAnimation
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const getInteractionItemProps = (0, _useInteractionItemProps.useInteractionItemProps)(highlightScope);
  const {
    item,
    axis
  } = React.useContext(_InteractionProvider.InteractionContext);
  const isHighlighted = axis.x?.index === dataIndex || (0, _useInteractionItemProps.getIsHighlighted)(item, {
    type: 'line',
    seriesId: id
  }, highlightScope);
  const isFaded = !isHighlighted && (0, _useInteractionItemProps.getIsFaded)(item, {
    type: 'line',
    seriesId: id
  }, highlightScope);
  const position = (0, _web.useSpring)({
    x,
    y,
    immediate: skipAnimation
  });
  const ownerState = {
    id,
    classes: innerClasses,
    isHighlighted,
    isFaded,
    color
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(MarkElementPath, (0, _extends2.default)({}, other, {
    style: {
      transform: (0, _web.to)([position.x, position.y], (pX, pY) => `translate(${pX}px, ${pY}px)`),
      transformOrigin: (0, _web.to)([position.x, position.y], (pX, pY) => `${pX}px ${pY}px`)
    },
    ownerState: ownerState,
    className: classes.root,
    d: (0, _d3Shape.symbol)(_d3Shape.symbolsFill[(0, _utils.getSymbol)(shape)])(),
    onClick: onClick,
    cursor: onClick ? 'pointer' : 'unset'
  }, getInteractionItemProps({
    type: 'line',
    seriesId: id,
    dataIndex
  })));
}
process.env.NODE_ENV !== "production" ? MarkElement.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: _propTypes.default.object,
  /**
   * The index to the element in the series' data array.
   */
  dataIndex: _propTypes.default.number.isRequired,
  highlightScope: _propTypes.default.shape({
    faded: _propTypes.default.oneOf(['global', 'none', 'series']),
    highlighted: _propTypes.default.oneOf(['item', 'none', 'series'])
  }),
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  /**
   * The shape of the marker.
   */
  shape: _propTypes.default.oneOf(['circle', 'cross', 'diamond', 'square', 'star', 'triangle', 'wye']).isRequired,
  /**
   * If `true`, animations are skipped.
   * @default false
   */
  skipAnimation: _propTypes.default.bool
} : void 0;