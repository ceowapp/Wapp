"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEnrichedRangePickerFieldProps = void 0;
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _utils = require("@mui/base/utils");
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
var _useForkRef = _interopRequireDefault(require("@mui/utils/useForkRef"));
var _internals = require("@mui/x-date-pickers/internals");
const _excluded = ["clearable", "onClear"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
const useMultiInputFieldSlotProps = ({
  wrapperVariant,
  open,
  actions,
  readOnly,
  labelId,
  disableOpenPicker,
  onBlur,
  rangePosition,
  onRangePositionChange,
  localeText: inLocaleText,
  pickerSlotProps,
  pickerSlots,
  fieldProps,
  anchorRef,
  currentView,
  initialView,
  onViewChange,
  startFieldRef,
  endFieldRef
}) => {
  const localeText = (0, _internals.useLocaleText)();
  const handleStartFieldRef = (0, _useForkRef.default)(fieldProps.unstableStartFieldRef, startFieldRef);
  const handleEndFieldRef = (0, _useForkRef.default)(fieldProps.unstableEndFieldRef, endFieldRef);
  const previousRangePosition = React.useRef(rangePosition);
  React.useEffect(() => {
    if (!open) {
      return;
    }
    const currentFieldRef = rangePosition === 'start' ? startFieldRef : endFieldRef;
    currentFieldRef.current?.focusField();
    if (!currentFieldRef.current || !currentView) {
      // could happen when the user is switching between the inputs
      previousRangePosition.current = rangePosition;
      return;
    }

    // bring back focus to the field
    currentFieldRef.current.setSelectedSections(
    // use the current view or `0` when the range position has just been swapped
    previousRangePosition.current === rangePosition ? currentView : 0);
    previousRangePosition.current = rangePosition;
  }, [rangePosition, open, currentView, startFieldRef, endFieldRef]);
  const openRangeStartSelection = event => {
    event.stopPropagation();
    onRangePositionChange('start');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen(event);
    }
  };
  const openRangeEndSelection = event => {
    event.stopPropagation();
    onRangePositionChange('end');
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen(event);
    }
  };
  const handleFocusStart = () => {
    if (open) {
      onRangePositionChange('start');
      if (previousRangePosition.current !== 'start' && initialView) {
        onViewChange?.(initialView);
      }
    }
  };
  const handleFocusEnd = () => {
    if (open) {
      onRangePositionChange('end');
      if (previousRangePosition.current !== 'end' && initialView) {
        onViewChange?.(initialView);
      }
    }
  };
  const slots = (0, _extends2.default)({
    textField: pickerSlots?.textField,
    root: pickerSlots?.fieldRoot,
    separator: pickerSlots?.fieldSeparator
  }, fieldProps.slots);
  const slotProps = (0, _extends2.default)({}, fieldProps.slotProps, {
    textField: ownerState => {
      const resolvedComponentProps = (0, _utils.resolveComponentProps)(pickerSlotProps?.textField, ownerState);
      let textFieldProps;
      let InputProps;
      if (ownerState.position === 'start') {
        textFieldProps = (0, _extends2.default)({
          label: inLocaleText?.start ?? localeText.start,
          onKeyDown: (0, _internals.onSpaceOrEnter)(openRangeStartSelection),
          onFocus: handleFocusStart,
          focused: open ? rangePosition === 'start' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeStartSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        if (anchorRef) {
          InputProps = (0, _extends2.default)({}, resolvedComponentProps?.InputProps, {
            ref: anchorRef
          });
        }
      } else {
        textFieldProps = (0, _extends2.default)({
          label: inLocaleText?.end ?? localeText.end,
          onKeyDown: (0, _internals.onSpaceOrEnter)(openRangeEndSelection),
          onFocus: handleFocusEnd,
          focused: open ? rangePosition === 'end' : undefined
        }, !readOnly && !fieldProps.disabled && {
          onClick: openRangeEndSelection
        }, wrapperVariant === 'mobile' && {
          readOnly: true
        });
        InputProps = resolvedComponentProps?.InputProps;
      }
      return (0, _extends2.default)({}, labelId != null && {
        id: `${labelId}-${ownerState.position}`
      }, textFieldProps, (0, _utils.resolveComponentProps)(pickerSlotProps?.textField, ownerState), {
        InputProps
      });
    },
    root: ownerState => {
      const rootProps = {
        onBlur
      };
      return (0, _extends2.default)({}, rootProps, (0, _utils.resolveComponentProps)(pickerSlotProps?.fieldRoot, ownerState));
    },
    separator: pickerSlotProps?.fieldSeparator
  });

  /* TODO: remove this when a clearable behavior for multiple input range fields is implemented */
  const _ref = fieldProps,
    restFieldProps = (0, _objectWithoutPropertiesLoose2.default)(_ref, _excluded);
  const enrichedFieldProps = (0, _extends2.default)({}, restFieldProps, {
    unstableStartFieldRef: handleStartFieldRef,
    unstableEndFieldRef: handleEndFieldRef,
    slots,
    slotProps
  });
  return enrichedFieldProps;
};
const useSingleInputFieldSlotProps = ({
  wrapperVariant,
  open,
  actions,
  readOnly,
  labelId,
  disableOpenPicker,
  label,
  onBlur,
  rangePosition,
  onRangePositionChange,
  startFieldRef,
  endFieldRef,
  pickerSlots,
  pickerSlotProps,
  fieldProps,
  anchorRef,
  currentView
}) => {
  const handleFieldRef = (0, _useForkRef.default)(fieldProps.unstableFieldRef, startFieldRef, endFieldRef);
  React.useEffect(() => {
    if (!open || !startFieldRef.current) {
      return;
    }
    if (startFieldRef.current.isFieldFocused()) {
      return;
    }

    // bring back focus to the field with the current view section selected
    if (currentView) {
      const sections = startFieldRef.current.getSections().map(section => section.type);
      const newSelectedSection = rangePosition === 'start' ? sections.indexOf(currentView) : sections.lastIndexOf(currentView);
      startFieldRef.current?.focusField(newSelectedSection);
    }
  }, [rangePosition, open, currentView, startFieldRef]);
  const updateRangePosition = () => {
    if (!startFieldRef.current?.isFieldFocused()) {
      return;
    }
    const sections = startFieldRef.current.getSections();
    const activeSectionIndex = startFieldRef.current?.getActiveSectionIndex();
    const domRangePosition = activeSectionIndex == null || activeSectionIndex < sections.length / 2 ? 'start' : 'end';
    if (domRangePosition != null && domRangePosition !== rangePosition) {
      onRangePositionChange(domRangePosition);
    }
  };
  const handleSelectedSectionsChange = (0, _useEventCallback.default)(selectedSection => {
    setTimeout(updateRangePosition);
    fieldProps.onSelectedSectionsChange?.(selectedSection);
  });
  const openPicker = event => {
    event.stopPropagation();
    if (!readOnly && !disableOpenPicker) {
      actions.onOpen(event);
    }
  };
  const slots = (0, _extends2.default)({}, fieldProps.slots, {
    textField: pickerSlots?.textField,
    clearButton: pickerSlots?.clearButton,
    clearIcon: pickerSlots?.clearIcon
  });
  const slotProps = (0, _extends2.default)({}, fieldProps.slotProps, {
    textField: pickerSlotProps?.textField,
    clearButton: pickerSlots?.clearButton,
    clearIcon: pickerSlots?.clearIcon
  });
  const enrichedFieldProps = (0, _extends2.default)({}, fieldProps, {
    slots,
    slotProps,
    label,
    unstableFieldRef: handleFieldRef,
    onKeyDown: (0, _internals.onSpaceOrEnter)(openPicker, fieldProps.onKeyDown),
    onSelectedSectionsChange: handleSelectedSectionsChange,
    onBlur,
    InputProps: (0, _extends2.default)({
      ref: anchorRef
    }, fieldProps?.InputProps),
    focused: open ? true : undefined
  }, labelId != null && {
    id: labelId
  }, wrapperVariant === 'mobile' && {
    readOnly: true
  }, !readOnly && !fieldProps.disabled && {
    onClick: openPicker
  });
  return enrichedFieldProps;
};
const useEnrichedRangePickerFieldProps = params => {
  /* eslint-disable react-hooks/rules-of-hooks */
  if (process.env.NODE_ENV !== 'production') {
    const fieldTypeRef = React.useRef(params.fieldType);
    if (params.fieldType !== fieldTypeRef.current) {
      console.error('Should not switch between a multi input field and a single input field on a range picker.');
    }
  }
  if (params.fieldType === 'multi-input') {
    return useMultiInputFieldSlotProps(params);
  }
  return useSingleInputFieldSlotProps(params);
  /* eslint-enable react-hooks/rules-of-hooks */
};
exports.useEnrichedRangePickerFieldProps = useEnrichedRangePickerFieldProps;