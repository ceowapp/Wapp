"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PieArcLabel = PieArcLabel;
exports.getPieArcLabelUtilityClass = getPieArcLabelUtilityClass;
exports.pieArcLabelClasses = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _web = require("@react-spring/web");
var _d3Shape = require("d3-shape");
var _composeClasses = _interopRequireDefault(require("@mui/utils/composeClasses"));
var _generateUtilityClass = _interopRequireDefault(require("@mui/utils/generateUtilityClass"));
var _styles = require("@mui/material/styles");
var _generateUtilityClasses = _interopRequireDefault(require("@mui/utils/generateUtilityClasses"));
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["id", "classes", "color", "startAngle", "endAngle", "paddingAngle", "arcLabelRadius", "innerRadius", "outerRadius", "cornerRadius", "formattedArcLabel", "isHighlighted", "isFaded", "style"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function getPieArcLabelUtilityClass(slot) {
  return (0, _generateUtilityClass.default)('MuiPieArcLabel', slot);
}
const pieArcLabelClasses = exports.pieArcLabelClasses = (0, _generateUtilityClasses.default)('MuiPieArcLabel', ['root', 'highlighted', 'faded']);
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
  return (0, _composeClasses.default)(slots, getPieArcLabelUtilityClass, classes);
};
const PieArcLabelRoot = (0, _styles.styled)(_web.animated.text, {
  name: 'MuiPieArcLabel',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})(({
  theme
}) => ({
  fill: (theme.vars || theme).palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'middle'
}));
/**
 * Helper to compute label position.
 * It's not an inline function because we need it in inerpolation.
 */
const getLabelPosition = (formattedArcLabel, variable) => (startAngle, endAngle, padAngle, arcLabelRadius, cornerRadius) => {
  if (!formattedArcLabel) {
    return 0;
  }
  const [x, y] = (0, _d3Shape.arc)().cornerRadius(cornerRadius).centroid({
    padAngle,
    startAngle,
    endAngle,
    innerRadius: arcLabelRadius,
    outerRadius: arcLabelRadius
  });
  if (variable === 'x') {
    return x;
  }
  return y;
};
function PieArcLabel(props) {
  const {
      id,
      classes: innerClasses,
      color,
      startAngle,
      endAngle,
      paddingAngle,
      arcLabelRadius,
      cornerRadius,
      formattedArcLabel,
      isHighlighted,
      isFaded,
      style
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const ownerState = {
    id,
    classes: innerClasses,
    color,
    isFaded,
    isHighlighted
  };
  const classes = useUtilityClasses(ownerState);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(PieArcLabelRoot, (0, _extends2.default)({
    className: classes.root
  }, other, {
    style: (0, _extends2.default)({
      x: (0, _web.to)([startAngle, endAngle, paddingAngle, arcLabelRadius, cornerRadius], getLabelPosition(formattedArcLabel, 'x')),
      y: (0, _web.to)([startAngle, endAngle, paddingAngle, arcLabelRadius, cornerRadius], getLabelPosition(formattedArcLabel, 'y'))
    }, style),
    children: formattedArcLabel
  }));
}
process.env.NODE_ENV !== "production" ? PieArcLabel.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  classes: _propTypes.default.object,
  formattedArcLabel: _propTypes.default.string,
  id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired,
  isFaded: _propTypes.default.bool.isRequired,
  isHighlighted: _propTypes.default.bool.isRequired
} : void 0;