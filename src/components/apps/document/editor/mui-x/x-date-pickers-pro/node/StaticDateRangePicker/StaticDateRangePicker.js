"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticDateRangePicker = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _useStaticRangePicker = require("../internals/hooks/useStaticRangePicker");
var _shared = require("../DateRangePicker/shared");
var _dateRangeViewRenderers = require("../dateRangeViewRenderers");
var _valueManagers = require("../internals/utils/valueManagers");
var _validateDateRange = require("../internals/utils/validation/validateDateRange");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
/**
 * Demos:
 *
 * - [DateRangePicker](https://mui.com/x/react-date-pickers/date-range-picker/)
 * - [Validation](https://mui.com/x/react-date-pickers/validation/)
 *
 * API:
 *
 * - [StaticDateRangePicker API](https://mui.com/x/api/date-pickers/static-date-range-picker/)
 */
const StaticDateRangePicker = exports.StaticDateRangePicker = /*#__PURE__*/React.forwardRef(function StaticDateRangePicker(inProps, ref) {
  const defaultizedProps = (0, _shared.useDateRangePickerDefaultizedProps)(inProps, 'MuiStaticDateRangePicker');
  const displayStaticWrapperAs = defaultizedProps.displayStaticWrapperAs ?? 'mobile';
  const viewRenderers = (0, _extends2.default)({
    day: _dateRangeViewRenderers.renderDateRangeViewCalendar
  }, defaultizedProps.viewRenderers);

  // Props with the default values specific to the static variant
  const props = (0, _extends2.default)({}, defaultizedProps, {
    viewRenderers,
    displayStaticWrapperAs,
    views: ['day'],
    openTo: 'day',
    calendars: defaultizedProps.calendars ?? (displayStaticWrapperAs === 'mobile' ? 1 : 2),
    slotProps: (0, _extends2.default)({}, defaultizedProps.slotProps, {
      toolbar: (0, _extends2.default)({
        hidden: displayStaticWrapperAs === 'desktop'
      }, defaultizedProps.slotProps?.toolbar)
    })
  });
  const {
    renderPicker
  } = (0, _useStaticRangePicker.useStaticRangePicker)({
    props,
    valueManager: _valueManagers.rangeValueManager,
    valueType: 'date',
    validator: _validateDateRange.validateDateRange,
    ref
  });
  return renderPicker();
});
StaticDateRangePicker.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * If `true`, the main element is focused during the first mount.
   * This main element is:
   * - the element chosen by the visible view if any (i.e: the selected day on the `day` view).
   * - the `input` element if there is a field rendered.
   */
  autoFocus: _propTypes.default.bool,
  /**
   * The number of calendars to render.
   * @default 1 if `displayStaticWrapperAs === 'mobile'`, 2 otherwise.
   */
  calendars: _propTypes.default.oneOf([1, 2, 3]),
  className: _propTypes.default.string,
  /**
   * Position the current month is rendered in.
   * @default 1
   */
  currentMonthCalendarPosition: _propTypes.default.oneOf([1, 2, 3]),
  /**
   * Formats the day of week displayed in the calendar header.
   * @param {TDate} date The date of the day of week provided by the adapter.
   * @returns {string} The name to display.
   * @default (date: TDate) => adapter.format(date, 'weekdayShort').charAt(0).toUpperCase()
   */
  dayOfWeekFormatter: _propTypes.default.func,
  /**
   * The initial position in the edited date range.
   * Used when the component is not controlled.
   * @default 'start'
   */
  defaultRangePosition: _propTypes.default.oneOf(['end', 'start']),
  /**
   * The default value.
   * Used when the component is not controlled.
   */
  defaultValue: _propTypes.default.arrayOf(_propTypes.default.object),
  /**
   * If `true`, after selecting `start` date calendar will not automatically switch to the month of `end` date.
   * @default false
   */
  disableAutoMonthSwitching: _propTypes.default.bool,
  /**
   * If `true`, the picker and text field are disabled.
   * @default false
   */
  disabled: _propTypes.default.bool,
  /**
   * If `true`, editing dates by dragging is disabled.
   * @default false
   */
  disableDragEditing: _propTypes.default.bool,
  /**
   * If `true`, disable values after the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disableFuture: _propTypes.default.bool,
  /**
   * If `true`, today's date is rendering without highlighting with circle.
   * @default false
   */
  disableHighlightToday: _propTypes.default.bool,
  /**
   * If `true`, disable values before the current date for date components, time for time components and both for date time components.
   * @default false
   */
  disablePast: _propTypes.default.bool,
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   * @default "mobile"
   */
  displayStaticWrapperAs: _propTypes.default.oneOf(['desktop', 'mobile']),
  /**
   * If `true`, the week number will be display in the calendar.
   */
  displayWeekNumber: _propTypes.default.bool,
  /**
   * The day view will show as many weeks as needed after the end of the current month to match this value.
   * Put it to 6 to have a fixed number of weeks in Gregorian calendars
   */
  fixedWeekNumber: _propTypes.default.number,
  /**
   * If `true`, calls `renderLoading` instead of rendering the day calendar.
   * Can be used to preload information and show it in calendar.
   * @default false
   */
  loading: _propTypes.default.bool,
  /**
   * Locale for components texts.
   * Allows overriding texts coming from `LocalizationProvider` and `theme`.
   */
  localeText: _propTypes.default.object,
  /**
   * Maximal selectable date.
   */
  maxDate: _propTypes.default.object,
  /**
   * Minimal selectable date.
   */
  minDate: _propTypes.default.object,
  /**
   * Callback fired when the value is accepted.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The value that was just accepted.
   */
  onAccept: _propTypes.default.func,
  /**
   * Callback fired when the value changes.
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TValue} value The new value.
   * @param {FieldChangeHandlerContext<TError>} context The context containing the validation result of the current value.
   */
  onChange: _propTypes.default.func,
  /**
   * Callback fired when component requests to be closed.
   * Can be fired when selecting (by default on `desktop` mode) or clearing a value.
   * @deprecated Please avoid using as it will be removed in next major version.
   */
  onClose: _propTypes.default.func,
  /**
   * Callback fired when the error associated to the current value changes.
   * If the error has a non-null value, then the `TextField` will be rendered in `error` state.
   *
   * @template TValue The value type. Will be either the same type as `value` or `null`. Can be in `[start, end]` format in case of range value.
   * @template TError The validation error type. Will be either `string` or a `null`. Can be in `[start, end]` format in case of range value.
   * @param {TError} error The new error describing why the current value is not valid.
   * @param {TValue} value The value associated to the error.
   */
  onError: _propTypes.default.func,
  /**
   * Callback fired on month change.
   * @template TDate
   * @param {TDate} month The new month.
   */
  onMonthChange: _propTypes.default.func,
  /**
   * Callback fired when the range position changes.
   * @param {RangePosition} rangePosition The new range position.
   */
  onRangePositionChange: _propTypes.default.func,
  /**
   * The position in the currently edited date range.
   * Used when the component position is controlled.
   */
  rangePosition: _propTypes.default.oneOf(['end', 'start']),
  readOnly: _propTypes.default.bool,
  /**
   * If `true`, disable heavy animations.
   * @default `@media(prefers-reduced-motion: reduce)` || `navigator.userAgent` matches Android <10 or iOS <13
   */
  reduceAnimations: _propTypes.default.bool,
  /**
   * The date used to generate the new value when both `value` and `defaultValue` are empty.
   * @default The closest valid date-time using the validation props, except callbacks like `shouldDisable<...>`.
   */
  referenceDate: _propTypes.default.object,
  /**
   * Component rendered on the "day" view when `props.loading` is true.
   * @returns {React.ReactNode} The node to render when loading.
   * @default () => "..."
   */
  renderLoading: _propTypes.default.func,
  /**
   * Disable specific date.
   *
   * Warning: This function can be called multiple times (for example when rendering date calendar, checking if focus can be moved to a certain date, etc.). Expensive computations can impact performance.
   *
   * @template TDate
   * @param {TDate} day The date to test.
   * @param {string} position The date to test, 'start' or 'end'.
   * @returns {boolean} Returns `true` if the date should be disabled.
   */
  shouldDisableDate: _propTypes.default.func,
  /**
   * If `true`, days outside the current month are rendered:
   *
   * - if `fixedWeekNumber` is defined, renders days to have the weeks requested.
   *
   * - if `fixedWeekNumber` is not defined, renders day to fill the first and last week of the current month.
   *
   * - ignored if `calendars` equals more than `1` on range pickers.
   * @default false
   */
  showDaysOutsideCurrentMonth: _propTypes.default.bool,
  /**
   * The props used for each component slot.
   * @default {}
   */
  slotProps: _propTypes.default.object,
  /**
   * Overridable component slots.
   * @default {}
   */
  slots: _propTypes.default.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: _propTypes.default.oneOfType([_propTypes.default.arrayOf(_propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.object, _propTypes.default.bool])), _propTypes.default.func, _propTypes.default.object]),
  /**
   * Choose which timezone to use for the value.
   * Example: "default", "system", "UTC", "America/New_York".
   * If you pass values from other timezones to some props, they will be converted to this timezone before being used.
   * @see See the {@link https://mui.com/x/react-date-pickers/timezone/ timezones documentation} for more details.
   * @default The timezone of the `value` or `defaultValue` prop is defined, 'default' otherwise.
   */
  timezone: _propTypes.default.string,
  /**
   * The selected value.
   * Used when the component is controlled.
   */
  value: _propTypes.default.arrayOf(_propTypes.default.object),
  /**
   * Define custom view renderers for each section.
   * If `null`, the section will only have field editing.
   * If `undefined`, internally defined view will be the used.
   */
  viewRenderers: _propTypes.default.shape({
    day: _propTypes.default.func
  })
};