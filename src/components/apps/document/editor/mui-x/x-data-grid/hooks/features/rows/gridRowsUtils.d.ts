import * as React from 'react';
import { GridAutoGeneratedGroupNode, GridAutoGeneratedPinnedRowNode, GridFooterNode, GridGroupNode, GridRowId, GridRowIdGetter, GridRowModel, GridRowModelUpdate, GridRowTreeConfig, GridSkeletonRowNode, GridTreeNode } from '../../../models';
import { DataGridProcessedProps } from '../../../models/props/DataGridProps';
import { GridApiCommunity, GridPrivateApiCommunity } from '../../../models/api/gridApiCommunity';
import { GridRowsInternalCache, GridRowsState, GridRowTreeCreationParams } from './gridRowsInterfaces';
export declare const GRID_ROOT_GROUP_ID: GridRowId;
export declare const GRID_ID_AUTOGENERATED: unique symbol;
export declare const buildRootGroup: () => GridGroupNode;
/**
 * A helper function to check if the id provided is valid.
 * @param {GridRowId} id Id as [[GridRowId]].
 * @param {GridRowModel | Partial<GridRowModel>} row Row as [[GridRowModel]].
 * @param {string} detailErrorMessage A custom error message to display for invalid IDs
 */
export declare function checkGridRowIdIsValid(id: GridRowId, row: GridRowModel | Partial<GridRowModel>, detailErrorMessage?: string): void;
export declare const getRowIdFromRowModel: (rowModel: GridRowModel, getRowId?: GridRowIdGetter, detailErrorMessage?: string) => GridRowId;
export declare const createRowsInternalCache: ({ rows, getRowId, loading, rowCount, }: Pick<DataGridProcessedProps, 'rows' | 'getRowId' | 'loading' | 'rowCount'>) => GridRowsInternalCache;
export declare const getTopLevelRowCount: ({ tree, rowCountProp, }: {
    tree: GridRowTreeConfig;
    rowCountProp: DataGridProcessedProps['rowCount'];
}) => number;
export declare const getRowsStateFromCache: ({ apiRef, rowCountProp, loadingProp, previousTree, previousTreeDepths, }: Pick<GridRowTreeCreationParams, 'previousTree' | 'previousTreeDepths'> & {
    apiRef: React.MutableRefObject<GridPrivateApiCommunity>;
    rowCountProp: number | undefined;
    loadingProp: boolean | undefined;
}) => GridRowsState;
export declare const isAutoGeneratedRow: (rowNode: GridTreeNode) => rowNode is GridAutoGeneratedGroupNode | GridFooterNode | GridSkeletonRowNode | GridAutoGeneratedPinnedRowNode;
export declare const getTreeNodeDescendants: (tree: GridRowTreeConfig, parentId: GridRowId, skipAutoGeneratedRows: boolean) => GridRowId[];
export declare const updateCacheWithNewRows: ({ previousCache, getRowId, updates, }: {
    previousCache: GridRowsInternalCache;
    getRowId: DataGridProcessedProps['getRowId'];
    updates: GridRowModelUpdate[];
}) => GridRowsInternalCache;
export declare function calculatePinnedRowsHeight(apiRef: React.MutableRefObject<GridApiCommunity>): {
    top: number;
    bottom: number;
};
export declare function getMinimalContentHeight(apiRef: React.MutableRefObject<GridApiCommunity>): string;
