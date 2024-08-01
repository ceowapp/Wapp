import _extends from "@babel/runtime/helpers/esm/extends";
import { GRID_DATE_COL_DEF, GRID_DATETIME_COL_DEF } from '@mui/x-data-grid-pro';
import { buildWarning, isObject, isSingleSelectColDef } from '@mui/x-data-grid/internals';
const getExcelJs = async () => {
  const excelJsModule = await import('exceljs');
  return excelJsModule.default ?? excelJsModule;
};
const warnInvalidFormattedValue = buildWarning(['MUI X: When the value of a field is an object or a `renderCell` is provided, the Excel export might not display the value correctly.', 'You can provide a `valueFormatter` with a string representation to be used.']);
const getFormattedValueOptions = (colDef, row, valueOptions, api) => {
  if (!colDef.valueOptions) {
    return [];
  }
  let valueOptionsFormatted = valueOptions;
  if (colDef.valueFormatter) {
    valueOptionsFormatted = valueOptionsFormatted.map(option => {
      if (typeof option === 'object') {
        return option;
      }
      return String(colDef.valueFormatter(option, row, colDef, {
        current: api
      }));
    });
  }
  return valueOptionsFormatted.map(option => typeof option === 'object' ? option.label : option);
};
export const serializeRow = (id, columns, api, defaultValueOptionsFormulae) => {
  const row = {};
  const dataValidation = {};
  const mergedCells = [];
  const firstCellParams = api.getCellParams(id, columns[0].field);
  const outlineLevel = firstCellParams.rowNode.depth;

  // `colSpan` is only calculated for rendered rows, so we need to calculate it during export for every row
  api.calculateColSpan({
    rowId: id,
    minFirstColumn: 0,
    maxLastColumn: columns.length,
    columns
  });
  columns.forEach((column, colIndex) => {
    const colSpanInfo = api.unstable_getCellColSpanInfo(id, colIndex);
    if (colSpanInfo && colSpanInfo.spannedByColSpan) {
      return;
    }
    if (colSpanInfo && colSpanInfo.cellProps.colSpan > 1) {
      mergedCells.push({
        leftIndex: colIndex + 1,
        rightIndex: colIndex + colSpanInfo.cellProps.colSpan
      });
    }
    const cellParams = api.getCellParams(id, column.field);
    switch (cellParams.colDef.type) {
      case 'singleSelect':
        {
          const castColumn = cellParams.colDef;
          if (typeof castColumn.valueOptions === 'function') {
            // If value option depends on the row, set specific options to the cell
            // This dataValidation is buggy with LibreOffice and does not allow to have coma
            const valueOptions = castColumn.valueOptions({
              id,
              row,
              field: cellParams.field
            });
            const formattedValueOptions = getFormattedValueOptions(castColumn, row, valueOptions, api);
            dataValidation[castColumn.field] = {
              type: 'list',
              allowBlank: true,
              formulae: [`"${formattedValueOptions.map(x => x.toString().replaceAll(',', 'CHAR(44)')).join(',')}"`]
            };
          } else {
            const address = defaultValueOptionsFormulae[column.field].address;

            // If value option is defined for the column, refer to another sheet
            dataValidation[castColumn.field] = {
              type: 'list',
              allowBlank: true,
              formulae: [address]
            };
          }
          const formattedValue = api.getCellParams(id, castColumn.field).formattedValue;
          if (process.env.NODE_ENV !== 'production') {
            if (String(cellParams.formattedValue) === '[object Object]') {
              warnInvalidFormattedValue();
            }
          }
          if (isObject(formattedValue)) {
            row[castColumn.field] = formattedValue?.label;
          } else {
            row[castColumn.field] = formattedValue;
          }
          break;
        }
      case 'boolean':
      case 'number':
        row[column.field] = api.getCellParams(id, column.field).value;
        break;
      case 'date':
      case 'dateTime':
        {
          // Excel does not do any timezone conversion, so we create a date using UTC instead of local timezone
          // Solution from: https://github.com/exceljs/exceljs/issues/486#issuecomment-432557582
          // About Date.UTC(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/UTC#exemples
          const value = api.getCellParams(id, column.field).value;
          // value may be `undefined` in auto-generated grouping rows
          if (!value) {
            break;
          }
          const utcDate = new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate(), value.getHours(), value.getMinutes(), value.getSeconds()));
          row[column.field] = utcDate;
          break;
        }
      case 'actions':
        break;
      default:
        row[column.field] = api.getCellParams(id, column.field).formattedValue;
        if (process.env.NODE_ENV !== 'production') {
          if (String(cellParams.formattedValue) === '[object Object]') {
            warnInvalidFormattedValue();
          }
        }
        break;
    }
  });
  return {
    row,
    dataValidation,
    outlineLevel,
    mergedCells
  };
};
const defaultColumnsStyles = {
  [GRID_DATE_COL_DEF.type]: {
    numFmt: 'dd.mm.yyyy'
  },
  [GRID_DATETIME_COL_DEF.type]: {
    numFmt: 'dd.mm.yyyy hh:mm'
  }
};
export const serializeColumn = (column, columnsStyles) => {
  const {
    field,
    type
  } = column;
  return {
    key: field,
    headerText: column.headerName ?? column.field,
    // Excel width must stay between 0 and 255 (https://support.microsoft.com/en-us/office/change-the-column-width-and-row-height-72f5e3cc-994d-43e8-ae58-9774a0905f46)
    // From the example of column width behavior (https://docs.microsoft.com/en-US/office/troubleshoot/excel/determine-column-widths#example-of-column-width-behavior)
    // a value of 10 corresponds to 75px. This is an approximation, because column width depends on the font-size
    width: Math.min(255, column.width ? column.width / 7.5 : 8.43),
    style: _extends({}, type && defaultColumnsStyles?.[type], columnsStyles?.[field])
  };
};
const addColumnGroupingHeaders = (worksheet, columns, columnGroupPaths, columnGroupDetails) => {
  const maxDepth = Math.max(...columns.map(({
    key
  }) => columnGroupPaths[key]?.length ?? 0));
  if (maxDepth === 0) {
    return;
  }
  for (let rowIndex = 0; rowIndex < maxDepth; rowIndex += 1) {
    const row = columns.map(({
      key
    }) => {
      const groupingPath = columnGroupPaths[key];
      if (groupingPath.length <= rowIndex) {
        return {
          groupId: null,
          parents: groupingPath
        };
      }
      return _extends({}, columnGroupDetails[groupingPath[rowIndex]], {
        parents: groupingPath.slice(0, rowIndex)
      });
    });
    const newRow = worksheet.addRow(row.map(group => group.groupId === null ? null : group?.headerName ?? group.groupId));

    // use `rowCount`, since worksheet can have additional rows added in `exceljsPreProcess`
    const lastRowIndex = newRow.worksheet.rowCount;
    let leftIndex = 0;
    let rightIndex = 1;
    while (rightIndex < columns.length) {
      const {
        groupId: leftGroupId,
        parents: leftParents
      } = row[leftIndex];
      const {
        groupId: rightGroupId,
        parents: rightParents
      } = row[rightIndex];
      const areInSameGroup = leftGroupId === rightGroupId && leftParents.length === rightParents.length && leftParents.every((leftParent, index) => rightParents[index] === leftParent);
      if (areInSameGroup) {
        rightIndex += 1;
      } else {
        if (rightIndex - leftIndex > 1) {
          worksheet.mergeCells(lastRowIndex, leftIndex + 1, lastRowIndex, rightIndex);
        }
        leftIndex = rightIndex;
        rightIndex += 1;
      }
    }
    if (rightIndex - leftIndex > 1) {
      worksheet.mergeCells(lastRowIndex, leftIndex + 1, lastRowIndex, rightIndex);
    }
  }
};
export function serializeColumns(columns, styles) {
  return columns.map(column => serializeColumn(column, styles));
}
export async function getDataForValueOptionsSheet(columns, valueOptionsSheetName, api) {
  const candidateColumns = columns.filter(column => isSingleSelectColDef(column) && Array.isArray(column.valueOptions));

  // Creates a temp worksheet to obtain the column letters
  const excelJS = await getExcelJs();
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');
  worksheet.columns = candidateColumns.map(column => ({
    key: column.field
  }));
  return candidateColumns.reduce((acc, column) => {
    const singleSelectColumn = column;
    const formattedValueOptions = getFormattedValueOptions(singleSelectColumn, {}, singleSelectColumn.valueOptions, api);
    const header = column.headerName ?? column.field;
    const values = [header, ...formattedValueOptions];
    const letter = worksheet.getColumn(column.field).letter;
    const address = `${valueOptionsSheetName}!$${letter}$2:$${letter}$${values.length}`;
    acc[column.field] = {
      values,
      address
    };
    return acc;
  }, {});
}
function addSerializedRowToWorksheet(serializedRow, worksheet) {
  const {
    row,
    dataValidation,
    outlineLevel,
    mergedCells
  } = serializedRow;
  const newRow = worksheet.addRow(row);
  Object.keys(dataValidation).forEach(field => {
    newRow.getCell(field).dataValidation = _extends({}, dataValidation[field]);
  });
  if (outlineLevel) {
    newRow.outlineLevel = outlineLevel;
  }

  // use `rowCount`, since worksheet can have additional rows added in `exceljsPreProcess`
  const lastRowIndex = newRow.worksheet.rowCount;
  mergedCells.forEach(mergedCell => {
    worksheet.mergeCells(lastRowIndex, mergedCell.leftIndex, lastRowIndex, mergedCell.rightIndex);
  });
}
async function createValueOptionsSheetIfNeeded(valueOptionsData, sheetName, workbook) {
  if (Object.keys(valueOptionsData).length === 0) {
    return;
  }
  const valueOptionsWorksheet = workbook.addWorksheet(sheetName);
  valueOptionsWorksheet.columns = Object.keys(valueOptionsData).map(key => ({
    key
  }));
  Object.entries(valueOptionsData).forEach(([field, {
    values
  }]) => {
    valueOptionsWorksheet.getColumn(field).values = values;
  });
}
export async function buildExcel(options, api) {
  const {
    columns,
    rowIds,
    includeHeaders,
    includeColumnGroupsHeaders,
    valueOptionsSheetName = 'Options',
    exceljsPreProcess,
    exceljsPostProcess,
    columnsStyles = {}
  } = options;
  const excelJS = await getExcelJs();
  const workbook = new excelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');
  const serializedColumns = serializeColumns(columns, columnsStyles);
  worksheet.columns = serializedColumns;
  if (exceljsPreProcess) {
    await exceljsPreProcess({
      workbook,
      worksheet
    });
  }
  if (includeColumnGroupsHeaders) {
    const columnGroupPaths = columns.reduce((acc, column) => {
      acc[column.field] = api.getColumnGroupPath(column.field);
      return acc;
    }, {});
    addColumnGroupingHeaders(worksheet, serializedColumns, columnGroupPaths, api.getAllGroupDetails());
  }
  if (includeHeaders) {
    worksheet.addRow(columns.map(column => column.headerName ?? column.field));
  }
  const valueOptionsData = await getDataForValueOptionsSheet(columns, valueOptionsSheetName, api);
  createValueOptionsSheetIfNeeded(valueOptionsData, valueOptionsSheetName, workbook);
  rowIds.forEach(id => {
    const serializedRow = serializeRow(id, columns, api, valueOptionsData);
    addSerializedRowToWorksheet(serializedRow, worksheet);
  });
  if (exceljsPostProcess) {
    await exceljsPostProcess({
      workbook,
      worksheet
    });
  }
  return workbook;
}
export function setupExcelExportWebWorker(workerOptions = {}) {
  // eslint-disable-next-line no-restricted-globals
  addEventListener('message', async event => {
    const {
      serializedColumns,
      serializedRows,
      options,
      valueOptionsSheetName,
      valueOptionsData,
      columnGroupDetails,
      columnGroupPaths
    } = event.data;
    const {
      exceljsPostProcess,
      exceljsPreProcess
    } = workerOptions;
    const excelJS = await getExcelJs();
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = serializedColumns;
    if (exceljsPreProcess) {
      await exceljsPreProcess({
        workbook,
        worksheet
      });
    }
    if (options.includeColumnGroupsHeaders) {
      addColumnGroupingHeaders(worksheet, serializedColumns, columnGroupPaths, columnGroupDetails);
    }
    const includeHeaders = options.includeHeaders ?? true;
    if (includeHeaders) {
      worksheet.addRow(serializedColumns.map(column => column.headerText));
    }
    createValueOptionsSheetIfNeeded(valueOptionsData, valueOptionsSheetName, workbook);
    serializedRows.forEach(serializedRow => {
      addSerializedRowToWorksheet(serializedRow, worksheet);
    });
    if (exceljsPostProcess) {
      await exceljsPostProcess({
        workbook,
        worksheet
      });
    }
    postMessage(await workbook.xlsx.writeBuffer());
  });
}