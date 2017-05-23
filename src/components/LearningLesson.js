import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  InputNumber,
  Switch,
  Radio,
} from 'antd';

import Appcss from '../App.css';

const RadioGroup = Radio.Group;
const styles = {
  formTitle: {
    backgroundColor: '#2c3e50',
    padding: '10px',
    color: '#ecf0f1',
    marginBottom: '10px'
  },
  formStyle: {
    height: `${window.innerHeight - 150}px`,
    overflow: 'auto',
  },
}

export default class LearningLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonName: 'Instructions',
      duration: 0,
      optional: false,
      contentRF: 'text',
      contentValue : 'Your content goes here',
    }
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }

  handleDuration(e) {
    this.setState({
      duration: e,
    });
  }

  handleChangeOptional(e) {
    this.setState({
  		optional: e,
  	});
  }

  handleContentRF(e) {
    this.setState({
      contentRF : e.target.value,
    });
  }

  handleContentValue(e) {
    this.setState({
      contentValue : e.target.value,
    });
  }

  submitForm = () => {
    let formData = {
      name: this.state.lessonName,
      type: this.state.contentRF,
      content: this.state.contentValue,
      duration: this.state.duration,
      optional: this.state.optional,
    };
    this.props.formSubmit(formData);
  }

  render() {
    return (
      <div>
        <h1 style={styles.formTitle}>Lerning lesson form</h1>
        <form style={styles.formStyle}>
          <label>
            <span className="label__title">Lesson name</span>
            <br />
          	<Input
              name="lessonName"
              className="label__input"
              size="large"
              defaultValue={this.state.lessonName}
              placeholder="Enter lesson name here"
              onChange={() => this.handleInputChange()}
            />
          </label>
          <br />
          <label>
            <h2>Add learning content here</h2>
            <span className="label__title">Select how will you add content</span>
            <br />
            <RadioGroup
              onChange={(e) => this.handleContentRF(e)}
              value={this.state.contentRF}
              className="label__input"
            >
              <Radio value={'html'}>HTML</Radio>
              <Radio value={'audio'}>Audio</Radio>
              <Radio value={'video'}>Video</Radio>
             </RadioGroup>
             <br/>
             <span className="label__title">Add link for the content</span>
             <br />
             <Input
               className="label__input"
               defaultValue={this.contentValue}
               onChange={() => this.handleContentValue()}
             />
          </label>
          <label>
          	<h2>Other details of the lesson</h2>
          </label>
          <label>
            <span className="label__title">Duration</span>
            <br />
          	<InputNumber
              name="duration"
              className="label__input"
              min={0}
              max={100000}
              defaultValue={this.state.duration}
              onChange={() => this.handleDuration()}
            />
          </label>
          <br />
          <label>
            <span className="label__title">Optional</span>
            <br />
          	<Switch
              name="optional"
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={this.state.optional}
              onChange={(e) => this.handleChangeOptional(e)}
            />
          </label>
          <br />
          <Button
            type="primary"
            size="large"
            style={{ marginTop: '15px' }}
            onClick={() => this.submitForm()}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
