import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
	Icon,
	Input,
	Button,
	InputNumber,
	Switch,
	Radio,
} from 'antd';

import Appcss from '../App.css';

const RadioGroup = Radio.Group;

export default class PeerAssignment extends React.Component {

	constructor(props) {
  	super(props);
  	this.state = {
  		assignmentName : '',
  		marks: 0,
  		skills: '',
  		duration: 0,
  		mandetory: false,
  		reAttempt: false,
  		lock: true,
  		lockLessons: [],
  		responseFormat: 1,
  		passingMarks: 0,
  		minReviews: 0,
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

	handleMarks(event) {
    this.setState({
      marks: event,
    });
	}

	handleDuration(event) {
    this.setState({
      duration: event,
    });
  }

	handleChangeMandetory(event){
    this.setState({
  		mandetory: event,
  	});
	}

	handleChangeReAttempt(event){
    this.setState({
  		reAttempt: event,
  	});
	}

	handleChangeLock(lockStatus){
  	this.setState({
  		lock: lockStatus,
  	});
	}

	addLockLesson(){
  	let array = this.state.lockLessons;
  	array.push(1);
  	this.setState({
  		lockLessons : array,
		});
	}

	handleResponseFormat(event){
		this.setState({
  		responseFormat: event.target.value
  	});
	}

	handlePassingMarks(event) {
		this.setState({
  		passingMarks: event,
  	});
	}

	handleMinReviews(event){
		this.setState({
  		minReviews: event,
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
		let array = this.state.lockLessons;
		if (array.length === 1) {
			return;
		}
		array = array.filter((key,i) => key !== index);
		this.setState({
			lockLessons: array,
		});
	}

	render(){
    let lockLessons = this.state.lockLessons;
    return (
  		<div>
	      <h2 style={{ backgroundColor: '#bdc3c7', padding: '10px', color: '#34495e', marginBottom: '10px', }}>Peer Graded Assignment Form</h2>
	      <form style={{ maxHeight: '450px', overflow: 'auto' }}>
	        <label>
	       		<span className="label__title">Assignment Name: </span>
	        	<Input
							name="AssignName"
							className="label__input"
							defaultValue={this.state.assignmentName}
							placeholder="Enter lesson name here"
							onChange={() => this.handleInputChange()}
						/>
	        </label>
					<br />
	        <label>
						<span className="label__title">Marks: </span>
	        	<InputNumber
							name="Marks"
							className="label__input"
							min={0}
							max={100000}
							defaultValue={this.state.marks}
							onChange={() => this.handleMarks()}
						/>
	        </label>
	        <br />
	        <label>
						<span className="label__title label__textarea-title">Question: </span>
						<br />
	        	<Input
							name="Skills"
							className="label__textarea"
							type="textarea"
							placeholder="Enter Question For the Assignment"
							autosize
							onChange={() => this.handleInputChange()}
						/>
	        </label>
					<br />
	        <label>
						<span className="label__title">Enter Primary Response Format for the above Question</span>
						<br />
	        	<RadioGroup
							onChange={(event) => this.handleResponseFormat(event)}
							value={this.state.responseFormat}
							className="label__input"
						>
			        <Radio value={1}>Text</Radio>
			        <Radio value={2}>Image</Radio>
			        <Radio value={3}>Audio</Radio>
			        <Radio value={4}>Video</Radio>
		      	</RadioGroup>
	        </label>
					<br />
	        <label>
	        	<h3>Other Details of the Lesson</h3>
	        </label>
	        <label>
						<span className="label__title label__textarea-title">Skills: </span>
						<br />
	        	<Input
							name="Skills"
							className="label__textarea"
							type="textarea"
							placeholder="Enter skills that this lesson addresses"
							autosize
							onChange={() => this.handleInputChange()}
						/>
	        </label>
	        <br />
	        <label>
						<span className="label__title">Minimum passing marks: </span>
	        	<InputNumber
							name="PassingMarks"
							className="label__input"
							min={0}
							max={100000}
							defaultValue={this.state.passingMarks}
							onChange={() => this.handlePassingMarks()}
						/>
	        </label>
	        <br />
	        <label>
						<span className="label__title">Minimum number of review needed: </span>
	        	<InputNumber
							name="MinReviews"
							className="label__input"
							min={0}
							max={100000}
							defaultValue={this.state.minReviews}
							onChange={() => this.handleMinReviews()}
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
						<span className="label__title">Mandetory: </span>
						<Switch
							name="Mandetory"
							className="label__input"
							checkedChildren={<Icon type="check" />}
							unCheckedChildren={<Icon type="close" />}
							defaultChecked={this.state.mandetory}
							onChange={() => this.handleChangeMandetory()}
						/>
	        </label>
	        <br />
	        <label>
						<span className="label__title">Re-attempt:</span>
						<Switch
							name="reAttempt"
							className="label__input"
							checkedChildren={<Icon type="check" />}
							unCheckedChildren={<Icon type="close" />}
							defaultChecked={this.state.reAttempt}
							onChange={() => this.handleChangeReAttempt()}
						/>
	        </label>
	        <br />
	        <label>
						<span className="label__title">Lock the Lesson:</span>
						<Switch
							name="Lock"
							className="label__input"
							checkedChildren={<Icon type="lock" />}
							unCheckedChildren={<Icon type="unlock" />}
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
		        			lockLessons.map((item,index) => {
			        			return (
			        				<span>
                      	<label>
													<span className="label__title">Section no.</span>
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
														disabled={lockLessons.length === 1}
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
	        	</div>
	        }
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
  	)
	}
}
