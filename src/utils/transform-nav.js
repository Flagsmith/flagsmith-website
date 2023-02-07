export default function transformNav(childItems, label, path) {
  const withSubMenu = childItems.nodes.length > 0;
  const coreItems = [];
  const groupedItems = {};

  childItems.nodes.map((node) => {
    if (node.childItems?.nodes?.length) {
      groupedItems[node.label] = { nodes: node.childItems.nodes, path: node.path };
    } else {
      coreItems.push(node);
    }
  });

  const structuredItems = (coreItems?.length
    ? [
        {
          name: label,
          path,
          childItems: coreItems,
        },
      ]
    : []
  ).concat(
    Object.keys(groupedItems).map((groupedItemName) => ({
      name: groupedItemName,
      path: groupedItems[groupedItemName].path,
      childItems: groupedItems[groupedItemName].nodes,
    }))
  );

  return { structuredItems, withSubMenu };
}
