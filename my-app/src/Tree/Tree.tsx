import React, { useState } from 'react';
import SortableTree, { TreeItem } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import data from '../Data';

const ppd2tree = (d: any): TreeItem => {
  const { name, runTest = [], description } = d;
  const children = runTest.map((v: any) => ppd2tree(v));
  return { ...d, ...{ title: description || name, subtitle: name, children } };
};

const Tree = () => {
  const [tree, setTree] = useState([ppd2tree(data)]);
  const [nodeClicked, setNodeClicked] = useState(ppd2tree(data));

  return (
    <div style={{ height: 800 }}>
      <SortableTree
        treeData={tree}
        onChange={(treeData: TreeItem[]) => setTree(treeData)}
        generateNodeProps={(rowInfo) => {
          const { node } = rowInfo;
          // console.log(rowInfo);
          return {
            onClick: () => {
              setNodeClicked(node);
            },
            style:
              node === nodeClicked
                ? {
                    border: '3px solid yellow',
                  }
                : {},
          };
        }}
      />
    </div>
  );
};

export default Tree;
