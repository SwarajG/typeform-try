import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, InputNumber } from 'antd';
import { Switch } from 'antd';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;

class PeerAssignment extends React.Component {
	constructor(props) {
    	super(props);

    	this.state={
    		AssignName : '',
    		Marks: 0,
    		Skills: '',
    		Duration: 0,
    		Mandetory: false,
    		reAttempt: false,
    		Lock: true,
    		LockLessons: [],
    		responseFormat: 1,
    		PassingMarks: 0,
    		MinReviews: 0


    	}

    	this.handleInputChange1 = this.handleInputChange1.bind(this);
    	this.handleMarks = this.handleMarks.bind(this);
    	this.handleDuration = this.handleDuration.bind(this);
    	this.handleChangeMandetory = this.handleChangeMandetory.bind(this);
    	this.handleChangeReAttempt = this.handleChangeReAttempt.bind(this);
    	this.handleChangeLock = this.handleChangeLock.bind(this);
    	this.addLockLesson = this.addLockLesson.bind(this);
    	this.handleResponseFormat = this.handleResponseFormat.bind(this);
    	this.handlePassingMarks = this.handlePassingMarks.bind(this);
    	this.handleMinReviews = this.handleMinReviews.bind(this);

  	}


  	handleInputChange1(event) {  //Used for text type of inputs
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value
	    });

	    console.log(this.state);
	}

	handleMarks(event) {
	    this.setState({
	      Marks: event
	    });

	    console.log(this.state);
	}

	handleDuration(event) {
	    this.setState({
	      Duration: event
	    });

    	console.log(this.state);
  	}

  	handleChangeMandetory(event){
  	
	    this.setState({
	  		Mandetory: event
	  	})
		console.log(this.state);
  	}

  	handleChangeReAttempt(event){
  	
	    this.setState({
	  		reAttempt: event
	  	})
		console.log(this.state);
  	}

  	handleChangeLock(event){
	  	this.setState({
	  		Lock: event
	  	})
    console.log(this.state);
    
  	}

  	addLockLesson(){
  	
	  	var array = this.state.LockLessons;
	  	array.push(1);
	  	this.setState({
	  		LockLessons : array 
  	})

  	}

  	handleResponseFormat(event){
  		this.setState({
	  		responseFormat: event.target.value
	  	})
    	console.log(this.state);
  	}

  	handlePassingMarks(event){
  		this.setState({
	  		PassingMarks: event
	  	})
    	console.log(this.state);
  	}

  	handleMinReviews(event){
  		this.setState({
	  		MinReviews: event
	  	})
    	console.log(this.state);
  	}

  	handleLockedLessons(event, index){

  		var array = this.state.LockLessons;
  		array[index] = event;
  		this.setState({
  			LockLessons : array
  		})
  		console.log(this.state);
  	}

  	handleRemoveLockLessons(index){
  		var array = this.state.LockLessons;
  		if(array.length ===1)
  			return;

  		array = array.filter((key,i) => key!==index);
  		this.setState({
  			LockLessons : array
  		})	
  	}

  	render(){
  	    var ll = this.state.LockLessons;
  	    return (
	  		<div>
		      <h2> Peer Graded Assignment Form</h2>
		      <form>
		        <label>
		       	Assignment Name:
		        	<Input name="AssignName" defaultValue={this.state.AssignName} placeholder="Enter Lesson Name Here" onChange={this.handleInputChange1}/> 	
		        </label>
		        <label>
		        Marks:
		        	<InputNumber name="Marks" min={0} max={100000} defaultValue={this.state.Marks} onChange={this.handleMarks} />
		        </label>
		        <br />
		        <label>
		        Question:
		        	<Input name="Skills" type="textarea" placeholder="Enter Question For the Assignment" autosize onChange={this.handleInputChange1}/>
		        </label>
		        <label>
		        Enter Primary Response Format for the above Question	
		        	<RadioGroup onChange={this.handleResponseFormat} value={this.state.responseFormat}>
				        <Radio value={1}>Text</Radio>
				        <Radio value={2}>Image</Radio>
				        <Radio value={3}>Audio</Radio>
				        <Radio value={4}>Video</Radio>
			      	</RadioGroup>
		        </label>


		        <label>
		        	<h3>Other Details of the Lesson</h3>
		        </label>

		        <label>
		        Skills:
		        	<Input name="Skills" type="textarea" placeholder="Enter Skills that this lesson Addresses" autosize onChange={this.handleInputChange1}/>
		        </label>
		        <br />
		        <label>
		        Minimum passing marks:
		        	<InputNumber name="PassingMarks" min={0} max={100000} defaultValue={this.state.PassingMarks} onChange={this.handlePassingMarks} />
		        </label>
		        <br />
		        <label>
		        Minimum number of review needed:
		        	<InputNumber name="MinReviews" min={0} max={100000} defaultValue={this.state.MinReviews} onChange={this.handleMinReviews} />
		        </label>
		        <br />
		        <label>
		        Duration:
		        	<InputNumber name="Duration" min={0} max={100000} defaultValue={this.state.Duration} onChange={this.handleDuration} />
		        </label>
		        <br />
		        <label>
		        Mandetory: 
					<Switch name="Mandetory" checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked={this.state.Mandetory} onChange={this.handleChangeMandetory} />	
		        </label>
		        <br />
		        <label>
		        Re-Attempt: 
					<Switch name="reAttempt" checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked={this.state.reAttempt} onChange={this.handleChangeReAttempt} />	
		        </label>
		        <br />
		        <label>
		        Lock the Lesson: 
					<Switch name="Lock" checkedChildren={<Icon type="lock" />} unCheckedChildren={<Icon type="unlock"  />} defaultChecked={this.state.Lock} onChange={this.handleChangeLock}/>	
		        </label>
		        {this.state.Lock && 
		        	<div>
		        		
		        		
			        	<label>
			        		Lessons To Unlock this Lesson<br />
			        		{   
			        			ll.map(function(item,index){
				        			return (
				        				<span>
	                                        <label> 
	                                        Section No.
	                                            <InputNumber min={0} step={0.01} onChange={(e)=>this.handleLockedLessons(e,index)}/>
	                                        </label>
	                                        <Icon type="minus-circle-o" onClick={()=>this.handleRemoveLockLessons(index)} disabled={ll.length===1}>
	                                        </Icon>
		                                    <br />
		                                </span>
				        			);
			        			},this)
		        			}
			        		<br />
			        		<Button type="dashed" onClick={this.addLockLesson}>
			        			<Icon type="plus"/>Add Lesson Number
			        		</Button>
			        	</label>
		        	</div> 
		        }
		      </form>
	     	 </div>
      	)
  	}
}
module.exports = PeerAssignment