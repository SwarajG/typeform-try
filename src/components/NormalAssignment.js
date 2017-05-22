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

export default class NormalAssignment extends React.Component {
	constructor(props) {
    	super(props);
    	this.state={
    		AssignName : '',
    		Marks: 0,
    		Skills: '',
    		Duration: 0,
    		Mandetory: false,
    		reAttempt: false,
    		Lock: false,
    		LockLessons: [0],
    		PassingMarks: 0,
    		questions: []
    	}
    	this.handleInputChange1 = this.handleInputChange1.bind(this);
    	this.handleMarks = this.handleMarks.bind(this);
    	this.handleDuration = this.handleDuration.bind(this);
    	this.handleChangeMandetory = this.handleChangeMandetory.bind(this);
    	this.handleChangeReAttempt = this.handleChangeReAttempt.bind(this);
    	this.handleChangeLock = this.handleChangeLock.bind(this);
    	this.addLockLesson = this.addLockLesson.bind(this);
    	this.handlePassingMarks = this.handlePassingMarks.bind(this);
    	this.handleLockedLessons = this.handleLockedLessons.bind(this);
    	this.handleRemoveLockLessons = this.handleRemoveLockLessons.bind(this);
    	this.addMCQ = this.addMCQ.bind(this);
    	this.addNormalQuestion = this.addNormalQuestion.bind(this);
    	this.Removequestions = this.Removequestions.bind(this);
    	this.handleResponseFormat = this.handleResponseFormat.bind(this);
    	this.handleQuestionInput = this.handleQuestionInput.bind(this);
    	this.addOption = this.addOption.bind(this);
    	this.Removequestions = this.Removequestions.bind(this);
    	this.handleOptionChange = this.handleOptionChange.bind(this);
    	this.handleOptionCheck = this.handleOptionCheck.bind(this);
    	this.handleOptionScore = this.handleOptionScore.bind(this);
  	}

  	handleInputChange1(event) {  //Used for text type of inputs
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;
	    this.setState({
	      [name]: value
	    });
		}

		handleMarks(event) {
	    this.setState({
	      Marks: event
	    });
		}

		handleDuration(event) {
	    this.setState({
	      Duration: event
	    });
  	}

  	handleChangeMandetory(event){
  		this.setState({
	  		Mandetory: event
	  	});
  	}

  	handleChangeReAttempt(event){
  		this.setState({
	  		reAttempt: event
	  	});
  	}

  	handleChangeLock(event){
	  	this.setState({
	  		Lock: event
	  	});
  	}

  	addLockLesson(){
	  	let array = this.state.LockLessons;
	  	array.push(1);
	  	this.setState({
	  		LockLessons : array
  		});
  	}

  	handlePassingMarks(event){
  		this.setState({
	  		PassingMarks: event
	  	});
  	}

  	handleLockedLessons(event, index){
		let array = this.state.LockLessons;
  		array[index] = event;
  		this.setState({
  			LockLessons : array
  		});
  	}

  	handleRemoveLockLessons(index){
  		let array = this.state.LockLessons;
  		if(array.length === 1) {
				return;
			}
  		array = array.filter((key,i) => i!==index);
  		this.setState({
  			LockLessons : array
  		});
  	}

  	addMCQ(){
  		let array = this.state.questions;
  		let obj2 = {
  			correct: false,
  			relativeScore: 0,
  			text: ''
  		}
  		let obj = {
  			type: 1,
  			question: '',
  			options: [obj2 ,obj2],
  			rtype: 0
  		}
  		array.push(obj);
  		this.setState({
  			questions : array,
  		});
  	}

  	addNormalQuestion(){
  		let array = this.state.questions;
  		let obj = {
  			type: 2,
  			question: '',
  			options: [],
  			rtype: 1
  		}
  		array.push(obj);
  		this.setState({
  			questions : array,
  		});
  	}

  	Removequestions(index){
  		let array = this.state.questions;
  		if(array.length === 1) {
				return;
			}
  		array = array.filter((key,i) => i!==index);
  		this.setState({
  			questions : array,
  		});
  	}

  	handleResponseFormat(event,index){
  		let array = this.state.questions;
  		array[index].rtype = event.target.value;
  		this.setState({
  			questions : array
  		});
  	}

  	handleQuestionInput(event,index){
  		let array = this.state.questions;
  		array[index].question = event.target.value;
  		this.setState({
  			questions : array,
  		});
  	}

  	addOption(event,index){
  		let array = this.state.questions;
  		let obj2 = {
  			correct: false,
  			relativeScore: 0,
  			text: ''
  		}
  		array[index].options.push(obj2);
  		this.setState({
  			questions : array,
  		});
  	}

  	RemoveOptions(i,j){
  		let array = this.state.questions;
  		let question = array[i];
			let options = question.options.filter((key,ind) => ind!==j);
			array[i].options = options;
			this.setState({
				questions : array
			});
  	}

  	handleOptionChange(event,i,j){
  		let array = this.state.questions;
  		array[i].options[j].text = event.target.value;
  		this.setState({
  			questions: array
  		});
  	}

  	handleOptionCheck(event,i,j){
  		let array = this.state.questions;
  		array[i].options[j].correct = event;
  		this.setState({
  			questions: array,
  		});
  	}

  	handleOptionScore(event,i,j){
  		var array = this.state.questions;
  		array[i].options[j].relativeScore = event;
  		this.setState({
  			questions: array
  		})
  	}

  	render() {
	    let ll = this.state.LockLessons;
	    let questions = this.state.questions;
	    return (
	  		<div>
		      <h2 style={{ backgroundColor: '#bdc3c7', padding: '10px', color: '#34495e', marginBottom: '10px' }}>Normal Assignment Form</h2>
		      <form style={{ maxHeight: '450px', overflow: 'auto' }} >
		        <label>
							<span className="label__title">Assignment name: </span>
		        	<Input
								name="AssignName"
								className="label__input"
								defaultValue={this.state.AssignName}
								placeholder="Enter lesson name here"
								onChange={this.handleInputChange1}
							/>
		        </label>
						<br />
		        <label>
							<span className="label__title">Maximum marks: </span>
		        	<InputNumber
								name="Marks"
								className="label__input"
								min={0}
								max={100000}
								defaultValue={this.state.Marks}
								onChange={this.handleMarks}
							/>
		        </label>
		        <br />
		        <div>
			        <label>
								<span className="label__title">Add questions for this assignment: </span>
			        	<br />
			        	{
			        		questions.map((q,index) => {
			        			return(
			        				<span key={index}>
			        					<label>
													<span className="label__title">Question {index+1}: </span>
			        						<Input
														className="label__input"
														defaultValue={q.question}
														placeholder="Enter Question Text Here"
														onChange={(e)=>this.handleQuestionInput(e,index)}
													/>
			        					</label>
												<br />
			        					<Icon
													type="minus-circle-o"
													onClick={()=>this.Removequestions(index)}
													disabled={questions.length===1}
												/>
			        					{
			        						(q.type === 1) ?
			        						 <span> Add options here. <br/>Check the option if they are the correct choices. <br/>Enter relative score for each.<br/>
												{
													q.options.map((option,ind) => {
														return(
															<span>
																<span className="label__title">Option {ind+1}: </span>
																<Input
																	className="label__input"
																	defaultValue={option.text}
																	onChange={(e)=>this.handleOptionChange(e,index,ind)}
																/>
																<Checkbox
																	className="label__input"
																	defaultValue={option.correct}
																	onChange={(e)=>this.handleOptionCheck(e,index,ind)}
																/>
																<InputNumber
																	className="label__input"
																	defaultValue={option.relativeScore}
																	onChange={(e)=>this.handleOptionScore(e,index,ind)}
																/>
																<Icon
																	type="minus-circle-o"
																	onClick={()=>this.RemoveOptions(index,ind)}
																	disabled={questions.length===2}
																/>
																<br />
															</span>
														);
													},this)
												}
		        						<Button type="dashed" onClick={(e)=>this.addOption(e,index)}>
		        							<Icon type="plus"/> Add option
		        						</Button>
				        				<br/>
			        					</span>:
			        						 <span>
			        						 	<RadioGroup
															onChange={(e)=>this.handleResponseFormat(e,index)}
															value={q.rtype}
															className="label__input"
														>
											        <Radio value={1}>Text</Radio>
											        <Radio value={2}>Image</Radio>
											        <Radio value={3}>Audio</Radio>
											        <Radio value={4}>Video</Radio>
										      	</RadioGroup><br/>
			        					</span>
			        					}
			        				</span>
			        			);
			        		},this)
			        	}
			        	<Button type="dashed" onClick={this.addMCQ} style={{ marginBottom: '10px' }}>
				        	<Icon type="plus"/> Add multiple choice question
				        </Button>
				         <span> or </span>
				        <Button type="dashed" onClick={this.addNormalQuestion}>
				        	<Icon type="plus"/> Add normal question
				        </Button>
			        </label>
		        </div>
		        <label>
		        	<h3>Other details of the lesson</h3>
		        </label>
		        <label>
							<span className="label__title">Minimum passing marks: </span>
		        	<InputNumber
								name="PassingMarks"
								className="label__input"
								min={0}
								max={100000}
								defaultValue={this.state.PassingMarks}
								onChange={this.handlePassingMarks}
							/>
		        </label>
						<br />
		        <label>
							<span className="label__title label__textarea-title">Skills: </span>
							<br />
		        	<Input
								name="Skills"
								className="label__textarea"
								type="textarea"
								placeholder="Enter Skills that this lesson Addresses"
								autosize
								onChange={this.handleInputChange1}
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
								defaultValue={this.state.Duration}
								onChange={this.handleDuration}
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
								defaultChecked={this.state.Mandetory}
								onChange={this.handleChangeMandetory}
							/>
		        </label>
		        <br />
		        <label>
							<span className="label__title">Re-attempt: </span>
							<Switch
								name="reAttempt"
								className="label__input"
								checkedChildren={<Icon type="check" />}
								unCheckedChildren={<Icon type="close" />}
								defaultChecked={this.state.reAttempt}
								onChange={this.handleChangeReAttempt}
							/>
		        </label>
		        <br />
		        <label>
							<span className="label__title">Lock the lesson: </span>
							<Switch
								name="Lock"
								className="label__input"
								checkedChildren={<Icon type="lock" />}
								unCheckedChildren={<Icon type="unlock"  />}
								defaultChecked={this.state.Lock}
								onChange={this.handleChangeLock}
							/>
		        </label>
		        {
							this.state.Lock &&
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
															onChange={(e)=>this.handleLockedLessons(e,index)}
														/>
					        				</label>
					        				<Icon
														type="minus-circle-o"
														onClick={()=>this.handleRemoveLockLessons(index)}
														disabled={ll.length===1}
													/>
				        					<br />
				        				</span>
				        			);
			        			},this)
		        			}
			        		<br />
			        		<Button type="dashed" onClick={this.addLockLesson}>
			        			<Icon type="plus"/> Add lesson
			        		</Button>
			        	</label>
		        	</div>
		        }
		      </form>
	     	</div>
    	)
  	}
}
