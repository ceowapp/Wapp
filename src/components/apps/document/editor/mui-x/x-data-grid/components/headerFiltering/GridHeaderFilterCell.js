import _extends from "@babel/runtime/helpers/esm/extends";
import * as React from 'react';
import { getDataGridUtilityClass } from '../../constants/gridClasses';
import * as _utils from '@mui/utils';
import { useGridPrivateApiContext } from '../../hooks/utils/useGridPrivateApiContext';
import { useGridSelector } from '../../hooks/utils/useGridSelector';
import { useGridRootProps } from '../../hooks/utils/useGridRootProps';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as _styles from "@mui/material/styles";
import * as _propTypes from "prop-types";
import * as _clsx from "clsx";
import { GridHeaderFilterMenuContainer } from "./GridHeaderFilterMenuContainer";
import { GridHeaderFilterClearButton } from "./GridHeaderFilterClearButton";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import { gridVisibleColumnFieldsSelector } from '../../hooks/features/columns/gridColumnsSelector';
import { gridHeaderFilteringEditFieldSelector } from '../../hooks/features/headerFiltering/gridHeaderFilteringSelectors';
import { gridHeaderFilteringMenuSelector } from '../../hooks/features/headerFiltering/gridHeaderFilteringSelectors';
import { isNavigationKey } from '../../utils/keyboardUtils';
import { fastMemo } from '../../utils/fastMemo';
import { shouldCellShowLeftBorder, shouldCellShowRightBorder } from '../../utils/cellBorderUtils';

const _excluded = ["colIndex", "height", "hasFocus", "width", "headerClassName", "colDef", "item", "headerFilterMenuRef", "InputComponentProps", "showClearIcon", "pinnedPosition", "style", "indexInSection", "sectionLength", "gridHasFiller"];
const useUtilityClasses = ownerState => {
  const {
    colDef,
    classes,
    showRightBorder,
    showLeftBorder,
    pinnedPosition
  } = ownerState;
  const slots = {
    root: ['columnHeader', colDef.headerAlign === 'left' && 'columnHeader--alignLeft', colDef.headerAlign === 'center' && 'columnHeader--alignCenter', colDef.headerAlign === 'right' && 'columnHeader--alignRight', 'withBorderColor', showRightBorder && 'columnHeader--withRightBorder', showLeftBorder && 'columnHeader--withLeftBorder', pinnedPosition === 'left' && 'columnHeader--pinnedLeft', pinnedPosition === 'right' && 'columnHeader--pinnedRight']
  };
  return _utils.unstable_composeClasses(slots, getDataGridUtilityClass, classes);
};

const dateSx = {
  [`& input[value=""]:not(:focus)`]: {
    color: 'transparent'
  }
};

const GridHeaderFilterCell = /*#__PURE__*/React.forwardRef((props, ref) => {
  const {
      colIndex,
      height,
      hasFocus,
      width,
      headerClassName,
      colDef,
      item,
      headerFilterMenuRef,
      InputComponentProps,
      showClearIcon = true,
      pinnedPosition,
      style: styleProp,
      indexInSection,
      sectionLength,
      gridHasFiller
    } = props,
    other = _objectWithoutPropertiesLoose(props, _excluded);
  const apiRef = useGridPrivateApiContext();
  const columnFields = useGridSelector(apiRef, gridVisibleColumnFieldsSelector);
  const rootProps = useGridRootProps();
  const cellRef = React.useRef(null);
  const handleRef = _utils.unstable_useForkRef(ref, cellRef);
  const inputRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const editingField = useGridSelector(apiRef, gridHeaderFilteringEditFieldSelector);
  const isEditing = editingField === colDef.field;
  const menuOpenField = useGridSelector(apiRef, gridHeaderFilteringMenuSelector);
  const isMenuOpen = menuOpenField === colDef.field;

  // TODO: Support for `isAnyOf` operator
  const filterOperators = colDef.filterOperators?.filter(operator => operator.value !== 'isAnyOf') ?? [];
  const filterModel = useGridSelector(apiRef, gridFilterModelSelector);
  const filterableColumnsLookup = useGridSelector(apiRef, gridFilterableColumnLookupSelector);
  const isFilterReadOnly = React.useMemo(() => {
    if (!filterModel?.items.length) {
      return false;
    }
    const filterModelItem = filterModel.items.find(it => it.field === colDef.field);
    return filterModelItem ? !filterableColumnsLookup[filterModelItem.field] : false;
  }, [colDef.field, filterModel, filterableColumnsLookup]);
  const currentOperator = filterOperators[0];
  const InputComponent = colDef.filterable || isFilterReadOnly ? currentOperator.InputComponent : null;
  const applyFilterChanges = React.useCallback(updatedItem => {
    if (item.value && !updatedItem.value) {
      apiRef.current.deleteFilterItem(updatedItem);
      return;
    }
    apiRef.current.upsertFilterItem(updatedItem);
  }, [apiRef, item]);
  const clearFilterItem = React.useCallback(() => {
    apiRef.current.deleteFilterItem(item);
  }, [apiRef, item]);

  let headerFilterComponent;
  if (colDef.renderHeaderFilter) {
    headerFilterComponent = colDef.renderHeaderFilter(_extends({}, props, {
      inputRef
    }));
  }

  React.useLayoutEffect(() => {
    if (hasFocus && !isMenuOpen) {
      let focusableElement = cellRef.current.querySelector('[tabindex="0"]');
      if (isEditing && InputComponent) {
        focusableElement = inputRef.current;
      }
      const elementToFocus = focusableElement || cellRef.current;
      elementToFocus?.focus();
      apiRef.current.columnHeadersContainerRef.current.scrollLeft = 0;
    }
  }, [InputComponent, apiRef, hasFocus, isEditing, isMenuOpen]);

  const onKeyDown = React.useCallback(event => {
    if (isMenuOpen || isNavigationKey(event.key) || isFilterReadOnly) {
      return;
    }
    switch (event.key) {
      case 'Escape':
        if (isEditing) {
          apiRef.current.stopHeaderFilterEditMode();
        }
        break;
      case 'Enter':
        if (isEditing) {
          if (!event.defaultPrevented) {
            apiRef.current.stopHeaderFilterEditMode();
            break;
          }
        }
        if (event.metaKey || event.ctrlKey) {
          headerFilterMenuRef.current = buttonRef.current;
          apiRef.current.showHeaderFilterMenu(colDef.field);
          break;
        }
        apiRef.current.startHeaderFilterEditMode(colDef.field);
        break;
      case 'Tab':
        if (isEditing) {
          const fieldToFocus = columnFields[colIndex + (event.shiftKey ? -1 : 1)] ?? null;
          if (fieldToFocus) {
            apiRef.current.startHeaderFilterEditMode(fieldToFocus);
            apiRef.current.setColumnHeaderFilterFocus(fieldToFocus, event);
          }
        }
        break;
      default:
        if (isEditing || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) {
          break;
        }
        apiRef.current.startHeaderFilterEditMode(colDef.field);
        break;
    }
  }, [apiRef, colDef.field, colIndex, columnFields, headerFilterMenuRef, isEditing, isFilterReadOnly, isMenuOpen]);

  const publish = React.useCallback((eventName, propHandler) => event => {
    apiRef.current.publishEvent(eventName, apiRef.current.getColumnHeaderParams(colDef.field), event);
    if (propHandler) {
      propHandler(event);
    }
  }, [apiRef, colDef.field]);

  const onMouseDown = React.useCallback(event => {
    if (!hasFocus) {
      if (inputRef.current?.contains?.(event.target)) {
        inputRef.current.focus();
      }
      apiRef.current.setColumnHeaderFilterFocus(colDef.field, event);
    }
  }, [apiRef, colDef.field, hasFocus]);

  const mouseEventsHandlers = React.useMemo(() => ({
    onKeyDown: publish('headerFilterKeyDown', onKeyDown),
    onClick: publish('headerFilterClick'),
    onMouseDown: publish('headerFilterMouseDown', onMouseDown),
    onBlur: publish('headerFilterBlur')
  }), [onMouseDown, onKeyDown, publish]);

  const showLeftBorder = shouldCellShowLeftBorder(pinnedPosition, indexInSection);
  const showRightBorder = shouldCellShowRightBorder(pinnedPosition, indexInSection, sectionLength, rootProps.showCellVerticalBorder, gridHasFiller);

  const ownerState = _extends({}, rootProps, {
    pinnedPosition,
    colDef,
    showLeftBorder,
    showRightBorder
  });
  const classes = useUtilityClasses(ownerState);

  const isNoInputOperator = filterOperators?.find(({ value }) => item.operator === value)?.requiresFilterValue === false;
  const isApplied = Boolean(item?.value) || isNoInputOperator;
  const label = currentOperator.headerLabel ?? apiRef.current.getLocaleText(`headerFilterOperator${_utils.unstable_capitalize(item.operator)}`);
  const isFilterActive = isApplied || hasFocus;

  return /*#__PURE__*/_jsxs("div", _extends({
    className: _clsx(classes.root, headerClassName),
    ref: handleRef,
    style: _extends({
      height,
      width,
      minWidth: width,
      maxWidth: width
    }, styleProp),
    role: "columnheader",
    "aria-colindex": colIndex + 1,
    "aria-label": headerFilterComponent == null ? colDef.headerName ?? colDef.field : undefined
  }, other, mouseEventsHandlers, {
    children: [headerFilterComponent, InputComponent && headerFilterComponent === undefined ? /*#__PURE__*/_jsxs(React.Fragment, {
      children: [/*#__PURE__*/_jsx(InputComponent, _extends({
        apiRef: apiRef,
        item: item,
        inputRef: inputRef,
        applyValue: applyFilterChanges,
        onFocus: () => apiRef.current.startHeaderFilterEditMode(colDef.field),
        onBlur: event => {
          apiRef.current.stopHeaderFilterEditMode();
          // Blurring an input element should reset focus state only if `relatedTarget` is not the header filter cell
          if (!event.relatedTarget?.className.includes('columnHeader')) {
            apiRef.current.setState(state => _extends({}, state, {
              focus: {
                cell: null,
                columnHeader: null,
                columnHeaderFilter: null,
                columnGroupHeader: null
              }
            }));
          }
        },
        label: _utils.unstable_capitalize(label),
        placeholder: "",
        isFilterActive: isFilterActive,
        clearButton: showClearIcon && isApplied ? /*#__PURE__*/_jsx(GridHeaderFilterClearButton, {
          onClick: clearFilterItem,
          disabled: isFilterReadOnly
        }) : null,
        disabled: isFilterReadOnly || isNoInputOperator,
        tabIndex: -1,
        InputLabelProps: null,
        sx: colDef.type === 'date' || colDef.type === 'dateTime' ? dateSx : undefined
      }, isNoInputOperator ? {
        value: ''
      } : {}, currentOperator?.InputComponentProps, InputComponentProps)), /*#__PURE__*/_jsx(GridHeaderFilterMenuContainer, {
        operators: filterOperators,
        item: item,
        field: colDef.field,
        disabled: isFilterReadOnly,
        applyFilterChanges: applyFilterChanges,
        headerFilterMenuRef: headerFilterMenuRef,
        buttonRef: buttonRef
      })]
    }) : null]
  }));
});

process.env.NODE_ENV !== "production" ? GridHeaderFilterCell.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // | To update them edit the TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  colDef: _propTypes.default.object.isRequired,
  colIndex: _propTypes.default.number.isRequired,
  gridHasFiller: _propTypes.default.bool.isRequired,
  hasFocus: _propTypes.default.bool,
  /**
   * Class name that will be added in the column header cell.
   */
  headerClassName: _propTypes.default.oneOfType([_propTypes.default.func, _propTypes.default.string]),
  headerFilterMenuRef: _propTypes.default.shape({
    current: _propTypes.default.object
  }).isRequired,
  height: _propTypes.default.number.isRequired,
  indexInSection: _propTypes.default.number.isRequired,
  InputComponentProps: _propTypes.default.object,
  item: _propTypes.default.shape({
    field: _propTypes.default.string.isRequired,
    id: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
    operator: _propTypes.default.string.isRequired,
    value: _propTypes.default.any
  }).isRequired,
  pinnedPosition: _propTypes.default.oneOf(['left', 'right']),
  sectionLength: _propTypes.default.number.isRequired,
  showClearIcon: _propTypes.default.bool,
  sortIndex: _propTypes.default.number,
  style: _propTypes.default.object,
  tabIndex: _propTypes.default.oneOf([-1, 0]).isRequired,
  width: _propTypes.default.number.isRequired
} : void 0;

const Memoized = fastMemo(GridHeaderFilterCell);
export { Memoized as GridHeaderFilterCell };


