"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DateTimeRangePickerToolbar = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _clsx = _interopRequireDefault(require("clsx"));
var _styles = require("@mui/material/styles");
var _utils = require("@mui/utils");
var _internals = require("@mui/x-date-pickers/internals");
var _DateTimePicker = require("@mui/x-date-pickers/DateTimePicker");
var _dateTimeRangePickerToolbarClasses = require("./dateTimeRangePickerToolbarClasses");
var _dateRangeManager = require("../internals/utils/date-range-manager");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["value", "rangePosition", "onRangePositionChange", "className", "onViewChange", "toolbarVariant", "onChange", "classes", "view", "isLandscape", "views", "ampm", "disabled", "readOnly", "hidden", "toolbarFormat", "toolbarPlaceholder", "titleId", "sx"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useUtilityClasses = ownerState => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ['root'],
    startToolbar: ['startToolbar'],
    endToolbar: ['endToolbar']
  };
  return (0, _utils.unstable_composeClasses)(slots, _dateTimeRangePickerToolbarClasses.getDateTimeRangePickerToolbarUtilityClass, classes);
};
const DateTimeRangePickerToolbarRoot = (0, _styles.styled)('div', {
  name: 'MuiDateTimeRangePickerToolbar',
  slot: 'Root',
  overridesResolver: (_, styles) => styles.root
})({
  display: 'flex',
  flexDirection: 'column'
});
const DateTimeRangePickerToolbarStart = (0, _styles.styled)(_DateTimePicker.DateTimePickerToolbar, {
  name: 'MuiDateTimeRangePickerToolbar',
  slot: 'StartToolbar',
  overridesResolver: (_, styles) => styles.startToolbar
})({
  borderBottom: 'none',
  variants: [{
    props: ({
      toolbarVariant
    }) => toolbarVariant !== 'desktop',
    style: {
      padding: '12px 8px 0 12px'
    }
  }, {
    props: {
      toolbarVariant: 'desktop'
    },
    style: {
      paddingBottom: 0
    }
  }]
});
const DateTimeRangePickerToolbarEnd = (0, _styles.styled)(_DateTimePicker.DateTimePickerToolbar, {
  name: 'MuiDateTimeRangePickerToolbar',
  slot: 'EndToolbar',
  overridesResolver: (_, styles) => styles.endToolbar
})({
  variants: [{
    props: ({
      toolbarVariant
    }) => toolbarVariant !== 'desktop',
    style: {
      padding: '12px 8px 12px 12px'
    }
  }]
});
const DateTimeRangePickerToolbar = exports.DateTimeRangePickerToolbar = /*#__PURE__*/React.forwardRef(function DateTimeRangePickerToolbar(inProps, ref) {
  const props = (0, _styles.useThemeProps)({
    props: inProps,
    name: 'MuiDateTimeRangePickerToolbar'
  });
  const utils = (0, _internals.useUtils)();
  const {
      value: [start, end],
      rangePosition,
      onRangePositionChange,
      className,
      onViewChange,
      onChange,
      view,
      isLandscape,
      views,
      ampm,
      disabled,
      readOnly,
      hidden,
      toolbarFormat,
      toolbarPlaceholder,
      titleId,
      sx
    } = props,
    other = (0, _objectWithoutPropertiesLoose2.default)(props, _excluded);
  const commonToolbarProps = {
    isLandscape,
    views,
    ampm,
    disabled,
    readOnly,
    hidden,
    toolbarFormat,
    toolbarPlaceholder
  };
  const localeText = (0, _internals.useLocaleText)();
  const ownerState = props;
  const classes = useUtilityClasses(ownerState);
  const handleStartRangeViewChange = React.useCallback(newView => {
    if (newView === 'year' || newView === 'month') {
      return;
    }
    if (rangePosition !== 'start') {
      onRangePositionChange('start');
    }
    onViewChange(newView);
  }, [onRangePositionChange, onViewChange, rangePosition]);
  const handleEndRangeViewChange = React.useCallback(newView => {
    if (newView === 'year' || newView === 'month') {
      return;
    }
    if (rangePosition !== 'end') {
      onRangePositionChange('end');
    }
    onViewChange(newView);
  }, [onRangePositionChange, onViewChange, rangePosition]);
  const handleOnChange = React.useCallback(newDate => {
    const {
      nextSelection,
      newRange
    } = (0, _dateRangeManager.calculateRangeChange)({
      newDate,
      utils,
      range: props.value,
      rangePosition,
      allowRangeFlip: true
    });
    onRangePositionChange(nextSelection);
    onChange(newRange);
  }, [onChange, onRangePositionChange, props.value, rangePosition, utils]);
  if (hidden) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(DateTimeRangePickerToolbarRoot, (0, _extends2.default)({
    className: (0, _clsx.default)(className, classes.root),
    ownerState: ownerState,
    ref: ref,
    sx: sx
  }, other, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(DateTimeRangePickerToolbarStart, (0, _extends2.default)({
      value: start,
      onViewChange: handleStartRangeViewChange,
      toolbarTitle: localeText.start,
      ownerState: ownerState,
      toolbarVariant: "desktop",
      view: rangePosition === 'start' ? view : undefined,
      className: classes.startToolbar,
      onChange: handleOnChange,
      titleId: titleId ? `${titleId}-start-toolbar` : undefined
    }, commonToolbarProps)), /*#__PURE__*/(0, _jsxRuntime.jsx)(DateTimeRangePickerToolbarEnd, (0, _extends2.default)({
      value: end,
      onViewChange: handleEndRangeViewChange,
      toolbarTitle: localeText.end,
      ownerState: ownerState,
      toolbarVariant: "desktop",
      view: rangePosition === 'end' ? view : undefined,
      className: classes.endToolbar,
      onChange: handleOnChange,
      titleId: titleId ? `${titleId}-end-toolbar` : undefined
    }, commonToolbarProps))]
  }));
});
process.env.NODE_ENV !== "production" ? DateTimeRangePickerToolbar.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  ampm: _propTypes.default.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: _propTypes.default.object,
  className: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  /**
   * If `true`, show the toolbar even in desktop mode.
   * @default `true` for Desktop, `false` for Mobile.
   */
  hidden: _propTypes.default.bool,
  isLandscape: _propTypes.default.bool.isRequired,
  onChange: _propTypes.default.func.isRequired,
  onRangePositionChange: _propTypes.default.func.isRequired,
  /**
   * Callback called when a toolbar is clicked
   * @template TView
   * @param {TView} view The view to open
   */
  onViewChange: _propTypes.default.func.isRequired,
  rangePosition: _propTypes.default.oneOf(['end', 'start']).isRequired,
  readOnly: _propTypes.default.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  titleId: _propTypes.default.string,
  /**
   * Toolbar date format.
   */
  toolbarFormat: _propTypes.default.string,
  /**
   * Toolbar value placeholder—it is displayed when the value is empty.
   * @default "––"
   */
  toolbarPlaceholder: _propTypes.default.node,
  toolbarVariant: _propTypes.default.oneOf(['desktop', 'mobile']),
  value: _propTypes.default.arrayOf(_propTypes.default.object).isRequired,
  /**
   * Currently visible picker view.
   */
  view: _propTypes.default.oneOf(['day', 'hours', 'meridiem', 'minutes', 'seconds']).isRequired,
  /**
   * Available views.
   */
  views: _propTypes.default.arrayOf(_propTypes.default.oneOf(['day', 'hours', 'meridiem', 'minutes', 'seconds']).isRequired).isRequired
} : void 0;