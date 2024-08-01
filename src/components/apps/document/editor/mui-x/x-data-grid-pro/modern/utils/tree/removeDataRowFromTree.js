import { GRID_ROOT_GROUP_ID } from '@mui/x-data-grid';
import { getNodePathInTree, getGroupRowIdFromPath, removeNodeFromTree, updateGroupNodeIdAndAutoGenerated } from './utils';
const removeNodeAndCleanParent = ({
  node,
  tree,
  treeDepths,
  updatedGroupsManager
}) => {
  removeNodeFromTree({
    node,
    tree,
    treeDepths
  });
  if (node.type === 'group' && node.footerId != null) {
    removeNodeFromTree({
      node: tree[node.footerId],
      tree,
      treeDepths
    });
  }
  const parentNode = tree[node.parent];
  updatedGroupsManager?.addAction(parentNode.id, 'removeChildren');
  const shouldDeleteGroup = parentNode.id !== GRID_ROOT_GROUP_ID && parentNode.children.length === 0;
  if (shouldDeleteGroup) {
    if (parentNode.isAutoGenerated) {
      removeNodeAndCleanParent({
        node: parentNode,
        tree,
        treeDepths
      });
    } else {
      tree[parentNode.id] = {
        type: 'leaf',
        id: parentNode.id,
        depth: parentNode.depth,
        parent: parentNode.parent,
        groupingKey: parentNode.groupingKey
      };
    }
  }
};
const replaceDataGroupWithAutoGeneratedGroup = ({
  node,
  tree,
  treeDepths,
  updatedGroupsManager
}) => {
  updatedGroupsManager?.addAction(node.parent, 'removeChildren');
  updatedGroupsManager?.addAction(node.parent, 'insertChildren');
  updateGroupNodeIdAndAutoGenerated({
    previousTree: null,
    tree,
    treeDepths,
    node,
    updatedNode: {
      id: getGroupRowIdFromPath(getNodePathInTree({
        id: node.id,
        tree
      })),
      isAutoGenerated: true
    }
  });
};

/**
 * Removed a data row from the tree.
 * If the node is a non-empty group, replace it with an auto-generated group to be able to keep displaying its children.
 * If not, remove it and recursively clean its parent with the following rules:
 * - An empty auto-generated should be removed from the tree
 * - An empty non-auto-generated should be turned into a leaf
 */
export const removeDataRowFromTree = ({
  id,
  tree,
  treeDepths,
  updatedGroupsManager
}) => {
  const node = tree[id];
  if (node.type === 'group' && node.children.length > 0) {
    replaceDataGroupWithAutoGeneratedGroup({
      node,
      tree,
      treeDepths,
      updatedGroupsManager
    });
  } else {
    removeNodeAndCleanParent({
      node,
      tree,
      treeDepths,
      updatedGroupsManager
    });
  }
};