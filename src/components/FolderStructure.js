import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Tabs,
  Row,
  Col,
  Icon,
  Card,
  Button,
  message,
  Progress,
  Modal,
  Input,
} from 'antd';
import CopyToClipboard from 'react-copy-to-clipboard';
import '../App.css';

const style = {
  list: {
    listStyleType: 'none',
    cursor: 'pointer',
    width: '600px',
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
    lineHeight: '30px',
  },
}

const bucketName = 'lyearn-test';
const region = 'ap-southeast-1';
const url = 'https://lyearn.s3.amazonaws.com/dev/lyearn/company1';
const objectURL = 'https://s3.amazonaws.com/lyearn/dev/lyearn/company1/';

export default class FolderStructure extends Component {
  constructor(props) {
    super();
    this.state = {
      currentPath: '',
      copied: false,
      progressVisiable: false,
      progress: 0,
      folderNamevisible: false,
      folderName: '',
    }
  }

  onFileClick = (url) => {
    window.open(url,'_blank');
  }

  onFolderClick = (name) => {
    const currentPath = `${this.state.currentPath}${name}/`;
    this.setState({
      currentPath,
    });
  }

  createFolder = (name) => {

  }

  uploadToS3 = (s3Url, mp3Data, contentType, uploadProgress) => {

      var formData = new FormData();
      //formData.append('fname', fileName);
      formData.append('data', mp3Data);

      //var file = new File([mp3Data], fileName);
    console.log("s3 url = ",s3Url);

    return new Promise(
      // resolve on success, reject on error or non-200
      function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', s3Url);
        xhr.setRequestHeader('x-amz-acl', 'public-read');
        xhr.setRequestHeader('Content-Type', contentType || 'audio/wav');
        xhr.onreadystatechange = (e) => {
          if (xhr.readyState !== 4) {//not comoleted
            return;
          }
          if (xhr.status === 200) {
            console.log('xhr success', xhr.responseText);
            resolve(200);
          } else {
            console.log('xhr error');
            reject();
          }
        };

        xhr.onload = function() {
          if (xhr.status === 200) {
            console.log('xhr success onload');

          } else {
            console.log('result err = ', xhr);
          }
        };

        if (xhr.upload) {
          xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
              uploadProgress && uploadProgress(event)
            }
          };
        }

        xhr.onerror = function(err) {
          console.log('err xhr', err);
          reject(err);
        };
        if(contentType)
          xhr.send(mp3Data);
        else
          xhr.send(formData);
      }
    );
  }

  uploadProgress = (e) => {
    const progress = Math.ceil((e.loaded/e.total) * 100) ;
    if (progress >= 100) {
      this.setState({
        progressVisiable: false,
      });
    }
    this.setState({
      progress,
      progressVisiable: true,
    });
  }

  fileUploadChange = (e) => {
    e.persist();
    const event = e;
    const uploadFile = event.target.files[0];
    event.target.value = null;
    if (!uploadFile) return;
    const fileSize = uploadFile.size / (1000 * 1000);
    console.log('fileSize', fileSize);
    if (fileSize > 2000) {
      message.warning('File size should not be larger then 2MB, provided file size is ' + fileSize + 'MB...', 0);
      console.log('fileupload:: ', 'File size error');
      return false;
    }

    const fileName = uploadFile.name.split(' ').join('_');

    let s3Url;
    if (this.state.currentPath !== '') {
      s3Url = `${url}/${this.state.currentPath}${fileName}`;
    } else {
      s3Url = `${url}/${fileName}`;
    }

    const uploadPromise = this.uploadToS3(s3Url, uploadFile, uploadFile.type, this.uploadProgress);
    let processingMessageHide;
    uploadPromise.then((data) => {
      this.props.getFolderStructureOnAWS();
    })
    .catch((reason) => {
      message.error('Something went wrong, Please try again or contact support...');
    });
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
      const text = (objectURL + this.state.currentPath + item.name).split(' ').join('_');
      return (
          <li onClick={() => this.onFileClick(text)} key={item.name} style={style.list__li} className="childList">
            <Icon type="file" style={style.iconStyle}/>
            <span style={style.titleStyle}>
              {item.name}
            </span>
            <CopyToClipboard
              text={text}
              onCopy={() => this.setState({ copied: true })}
            >
              <Button style={{ marginLeft: '5px' }}>Copy</Button>
            </CopyToClipboard>
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

  backButtonClick = () => {
    if (this.state.currentPath !== '') {
      let temp = this.state.currentPath.split('/');
      temp.pop();
      temp.pop();
      let currentPath = temp.join('/') + '/';
      if (currentPath === '/') {
        currentPath = '';
      }
      this.setState({
        currentPath,
      });
    }
  }

  showProgress = () => {
    return (
      <Progress type="circle" percent={this.state.progress} />
    );
  }

  handleOk = () => {
    const folderName = this.state.folderName;
    this.setState({
      folderNamevisible: false,
      folderName,
    });
  }

  handleCancel = () => {
    this.setState({
      folderNamevisible: false,
      folderName: '',
    });
  }

  folderNameChange = (e) => {
    const folderName = e.target.value;
    this.setState({
      folderName,
    });
  }

  render() {
    let list = this.renderList(this.props.fileList);
    const { progressVisiable, progress } = this.state;
    return (
      <div style={{ textAlign: 'left', marginLeft: '10px' }}>
        {
          progressVisiable && progress &&
          this.showProgress()
        }
        <Modal
          visible={this.state.folderNamevisible}
          onOk={() => this.handleOk()}
          onCancel={() => this.handleCancel()}
        >
          <Input
            placeholder="Folder name"
            value={this.state}
            onChange={(e) => this.folderNameChange(e)}
          />
        </Modal>
        <ul style={style.list}>
          <li style={style.list__li} onClick={() => this.backButtonClick()}>
            <Icon type="rollback" style={style.iconStyle} /> Go back
          </li>
          <li style={style.list__li} className="childList">
            <Icon type="file-add" style={style.iconStyle} /> Add file
          </li>
          <li style={style.list__li} className="childList" onClick={() => this.createFolder()}>
            <Icon type="folder-add" style={style.iconStyle} /> Add folder
          </li>
          {
            list.map((item) => {
              return this.renderActiveChild(item);
            })
          }
        </ul>
        <form>
          <input type="file" onChange={(e) => this.fileUploadChange(e)} />
        </form>
      </div>
    );
  }
}
