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

// Save data of dynamic Fields is still to be done
export default class LearningLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lessonName: '',   //this.props.LessonName
      numberOfGuests: 2,
      skills: '',
      duration: '',
      optional: false,
      lock: true,
      lockLessons: [],
      contentRF: 0,
      contentValue : ''
    }
  }

  handleInputChange(e) {  //Used for text type of inputs
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

  handleChangeLock(e) {
  	this.setState({
  		lock: e,
  	});
  }

  addLockLesson() {
  	let array = this.state.lockLessons;
  	array.push(1);
  	this.setState({
  		lockLessons : array,
  	});
  }

  handleLockedLessons(e, index) {
    let array = this.state.lockLessons;
    array[index] = e;
    this.setState({
      lockLessons : array,
    });
  }

  handleRemoveLockLessons(index) {
    let array = this.state.LockLessons;
    if(array.length === 1) {
      return;
    }
    array = array.filter((key,i) => key!==index);
    this.setState({
      lockLessons : array,
    });
  }

  handleContentRF(e) {  //RF  - Response Format
    this.setState({
      contentRF : e.target.value,
    });
  }

  handleContentValue(e) {  //RF  - Response Format
    this.setState({
      contentValue : e.target.value,
    });
  }

  submitForm = () => {
    let formData = {};
    this.props.formSubmit(formData);
  }

  render() {
    let ll = this.state.lockLessons;
    return (
      <div>
        <h2 style={{ backgroundColor: '#bdc3c7', padding: '10px', color: '#34495e', marginBottom: '10px' }}>Lerning Lesson Form</h2>
        <form style={{ maxHeight: '450px', overflow: 'auto' }}>
          <label>
            <span className="label__title">Lesson Name: </span>
          	<Input
              name="LessonName"
              className="label__input"
              defaultValue={this.state.lessonName}
              placeholder="Enter lesson name here"
              onChange={() => this.handleInputChange()}
            />
          </label>
          <br />
          <label>
            <h3>Add learning content here</h3>
            <span className="label__title">Select how will you add content: </span>
            <br />
            <RadioGroup
              onChange={(e) => this.handleContentRF(e)}
              value={this.state.contentRF}
              className="label__input"
            >
              <Radio value={1}>Text</Radio>
              <Radio value={2}>Image</Radio>
              <Radio value={3}>Audio</Radio>
              <Radio value={4}>Video</Radio>
             </RadioGroup>
             <br/>
             <span className="label__title">Add content or its link</span>
             <br />
              <Input
                className="label__input"
                defaultValue={this.contentValue}
                onChange={() => this.handleContentValue()}
              />
          </label>
          <label>
          	<h3>Other details of the lesson</h3>
          </label>
          <label>
            <span className="label__title label__textarea-title">Skills: </span>
            <br />
          	<Input
              name="Skills"
              type="textarea"
              className="label__textarea"
              placeholder="Enter skills that this lesson addresses"
              autosize
              onChange={() => this.handleInputChange()}
            />
          </label>
          <br />
          <label>
            <span className="label__title">Duration: </span>
          	<InputNumber
              name="Duration"
              className="label__input"
              min={0}
              max={100000}
              defaultValue={this.state.duration}
              onChange={() => this.handleDuration()}
            />
          </label>
          <br />
          <label>
            <span className="label__title">Optional: </span>
          	<Switch
              name="Optional"
              className="label__input"
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              defaultChecked={this.state.optional}
              onChange={(e) => this.handleChangeOptional(e)}
            />
          </label>
          <br />
          <label>
            <span className="label__title">Lock the Lesson: </span>
          	<Switch
              name="Lock"
              className="label__input"
              checkedChildren={<Icon type="lock" />}
              unCheckedChildren={<Icon type="unlock"  />}
              defaultChecked={this.state.lock}
              onChange={(e) => this.handleChangeLock(e)}
            />
          </label>
          {
            this.state.lock &&
          	<div>
            	<label>
                <span className="label__title">Lessons to unlock this lesson</span>
            		<br />
            		{
            			ll.map((item,index) => {
            			return (
            				<span key={index}>
                      <label>
                        <span className="label__title">Section no. </span>
                        <InputNumber
                          className="label__input"
                          min={0}
                          step={0.01}
                          onChange={(e) => this.handleLockedLessons(e,index)}
                        />
                      </label>
                      <Icon
                        type="minus-circle-o"
                        onClick={() => this.handleRemoveLockLessons(index)}
                        disabled={ll.length===1}
                      />
                      <br />
                    </span>
            			);
            			},this)
                }
            		<br />
            		<Button type="dashed" onClick={() => this.addLockLesson()}>
            			<Icon type="plus"/> Add lesson number
            		</Button>
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
          	</div>
          }
        </form>
      </div>
    );
  }
}
