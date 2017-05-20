import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, InputNumber } from 'antd';
import { Switch } from 'antd';

class NormalAssignment extends React.Component {
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
    		PassingMarks: 0
    	}

    	this.handleInputChange1 = this.handleInputChange1.bind(this);
    	this.handleMarks = this.handleMarks.bind(this);
    	this.handleDuration = this.handleDuration.bind(this);
    	this.handleChangeMandetory = this.handleChangeMandetory.bind(this);
    	this.handleChangeReAttempt = this.handleChangeReAttempt.bind(this);
    	this.handleChangeLock = this.handleChangeLock.bind(this);
    	this.addLockLesson = this.addLockLesson.bind(this);
    	this.handlePassingMarks = this.handlePassingMarks.bind(this);


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

  	handlePassingMarks(event){
  		this.setState({
	  		PassingMarks: event
	  	})
    	console.log(this.state);
  	}

  	render(){
  	    var ll = this.state.LockLessons;
  	    return (
	  		<div>
		      <h2> Normal Assignment Form</h2>
		      <form>
		        <label>
		       	Assignment Name:
		        	<Input name="AssignName" defaultValue = {this.state.AssignName} placeholder="Enter Lesson Name Here" onChange={this.handleInputChange1}/> 	
		        </label>
		        <label>
		        Maximum Marks:
		        	<InputNumber name="Marks" min={0} max={100000} defaultValue={this.state.Marks} onChange={this.handleMarks} />
		        </label>
		        <br />
		        <label>
		        Dynamic Questions
		        </label>
		        
		        <label>
		        	<h3>Other Details of the Lesson</h3>
		        </label>

		        <label>
		        Minimum passing marks:
		        	<InputNumber name="PassingMarks" min={0} max={100000} defaultValue={this.state.PassingMarks} onChange={this.handlePassingMarks} />
		        </label>

		        <label>
		        Skills:
		        	<Input name="Skills" type="textarea" placeholder="Enter Skills that this lesson Addresses" autosize onChange={this.handleInputChange1}/>
		        </label>

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
		        			ll.map(function(item){
		        			return (
		        				<span><InputNumber /><br/></span>
		        			);
		        			},this)}
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
module.exports = NormalAssignment