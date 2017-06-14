import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Row,
  Col,
  Icon,
  Card,
  Button,
} from 'antd';
import '../App.css';

const style = {
  list: {
    listStyleType: 'none',
    cursor: 'pointer',
    width: '400px',
  },
  iconStyle: {
    fontSize: '14px',
    marginRight: '3px',
  },
  titleStyle: {
    wordWrap: 'breakWord',
  },
  list__li: {
    padding: '3px 5px',
    display: 'inlineBlock',
  },
}

const bucketName = 'elasticbeanstalk-ap-northeast-1-320677128500';

export default class FolderStructure extends Component {
  constructor(props) {
    super();
    this.state = {
      currentPath: '',
    }
  }

  onFileClick = (name) => {
    const url = `https://s3-ap-northeast-1.amazonaws.com/${bucketName}/${this.state.currentPath}${name}`;
    window.open(url,'_blank');
  }

  onFolderClick = (name) => {
    const currentPath = `${this.state.currentPath}${name}/`;
    console.log(currentPath);
    this.setState({
      currentPath,
    });
  }

  addNewFolder = () => {

  }

  renderActiveChild = (item) => {
    if (item.type === 'folder') {
      return (
        <li onClick={() => this.onFolderClick(item.name)} key={item.name} style={style.list__li} className="childList">
          <Icon type="folder" style={style.iconStyle}/>
          <span style={style.titleStyle}>
            {item.name}
          </span>
        </li>
      );
    } else if(item.type === 'file') {
      return (
        <li onClick={() => this.onFileClick(item.name)} key={item.name} style={style.list__li} className="childList">
          <Icon type="file" style={style.iconStyle}/>
          <span style={style.titleStyle}>
            {item.name}
          </span>
        </li>
      );
    }
  }

  renderList = (list) => {
    let filesList = [];
    for(let item in list) {
      if (list.hasOwnProperty(item)) {
        if (list[item].absolute_path.split('/').length === (this.state.currentPath.split('/').length + 1)) {
          if (list[item].absolute_path.indexOf(this.state.currentPath) >= 0) {
            filesList.push({
              type: 'folder',
              name: item,
            });
          }
        }
        if (list[item].absolute_path.split('/').length === this.state.currentPath.split('/').length) {
          if (list[item].absolute_path.indexOf(this.state.currentPath) >= 0) {
            list[item].files.forEach((file) => {
              filesList.push({
                type: 'file',
                name: file,
              })
            });
          }
        }
      }
    }
    return filesList;
  }

  onSubmit = () => {
    var fileChooser = document.getElementById('file-chooser');
    let file = fileChooser.files[0];
    var data = new FormData();
    data.append('file', file);
    fetch('http://localhost:8000/put', {
      method: 'POST',
      body: data,
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  backButtonClick = () => {
    if (this.state.currentPath !== '') {
      let temp = this.state.currentPath.split('/');
      temp.pop();
      temp.pop();
      const currentPath = temp.join('/');
      console.log(currentPath);
      this.setState({
        currentPath,
      });
    }
  }

  render() {
    let list = this.renderList(this.props.fileList);
    return (
      <div style={{ textAlign: 'left', marginLeft: '10px' }}>
        <ul style={style.list}>
          <li style={style.list__li} onClick={() => this.backButtonClick()}>
            <Icon type="rollback" style={style.iconStyle} /> Go back
          </li>
          <li style={style.list__li} className="childList">
            <Icon type="file-add" style={style.iconStyle} /> Add file
          </li>
          <li style={style.list__li} className="childList">
            <Icon type="folder-add" style={style.iconStyle} /> Add folder
          </li>
          {
            list.map((item) => {
              return this.renderActiveChild(item);
            })
          }
        </ul>
        {/* <input type="file" id="file-chooser" />
        <Button
          type="primary"
          onClick={() => this.onSubmit()}
        >
          Submit a File
        </Button> */}
      </div>
    );
  }
}
