import React, { Component } from 'react';
import SortableTree, { TreeItem } from 'react-sortable-tree';
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import data from '../Data';

const ppd2tree = (d: any): TreeItem[] => {
  const { name, runTest = [], description } = d;
  const children = runTest.map((v: any) => ppd2tree(v));
  return { ...d, ...{ title: description || name, subtitle: name, children } };
};

type StateType = { treeData: TreeItem[], nodeClicked?: any }

export default class Tree extends Component<{}, StateType> {
  constructor(props: any) {
    super(props);
    this.state = { treeData: [ppd2tree(data)] } ;
  }

  render() {
    return (
      <div style={{ height: 800 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={(treeData) => this.setState({ treeData })}
          generateNodeProps={(rowInfo) => {
            // const {node} = rowInfo;
            // console.log(rowInfo);
            return {
              // onClick: () => {
                // console.log(node)
                // debugger;
              // },
              style: { border: '3px solid yellow' },
            };
          }}
        />
        {/* <span>{JSON.stringify(this.state.treeData, null, 2)}</span> */}
      </div>
    );
  }
}
