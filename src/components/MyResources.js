import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Row,
  Col,
  Breadcrumb,
} from 'antd';

import FolderStructure from './FolderStructure';

let tree = {
  // Represents the "root" directory, like in a filesystem.
  root: {
    absolute_path: '',
    files: []
  }
};

export default class MyResources extends Component {
  constructor(props) {
    super();
    this.state = {
      resourceList: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:8000/list')
    .then((response) => response.json())
    .then((response) => {
      this.setState({
        resourceList: response,
      });
    });
  }

 buildTree = (parts) => {
    let lastDir = 'root';
    let abs_path = '';

    parts.forEach((name) => {
      // It's a directory
      if(name !== '') {
        if (name.indexOf('.') === -1) {
          lastDir = name;
          abs_path += lastDir + '/';

          if (!tree[name]) {
            tree[name] = {
              absolute_path: abs_path,
              files: []
            };
          }
        } else {
          tree[lastDir].files.push(name);
        }
      }
    });
  }

  createFolderStructure = () => {
    let list = this.state.resourceList;
    list.forEach((path, index, array) => {
      this.buildTree(path.split('/'));
    });
    return (
      <FolderStructure
        fileList={tree}
      />
    );
  }

  render() {
    return (
      <div>
        {
          this.createFolderStructure()
        }
      </div>
    );
  }
}
