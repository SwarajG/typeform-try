import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, InputNumber } from 'antd';
import { Switch } from 'antd';


// Save Data of Dynamic Fields is still to be done

class LearningLesson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      LessonName: '',   //this.props.LessonName
      numberOfGuests: 2,
      Skills: '',
      Duration: '',
      Optional: false,
      Lock: true,
      LockLessons: [] 
    }

    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleDuration = this.handleDuration.bind(this);

    this.handleChangeOptional = this.handleChangeOptional.bind(this);
    this.handleChangeLock = this.handleChangeLock.bind(this);
    this.addLockLesson = this.addLockLesson.bind(this);
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
  handleDuration(event) {
    this.setState({
      Duration: event
    });

    console.log(this.state);
  }

  handleChangeOptional(event){
  	
    this.setState({
  		Optional: event
  	})
    

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
  render() {
    
    var ll = this.state.LockLessons;
    console.log(ll);
    return (
      <div>
	      <h2> Lerning Lesson Form</h2>
	      <form>
	        <label>
	       	Lesson Name:
	        	<Input name="LessonName" defaultValue = {this.state.LessonName} placeholder="Enter Lesson Name Here" onChange={this.handleInputChange1}/> 	
	        </label>
	        <label>
	        Dynamic Questions
	        </label>
	        
	        <label>
	        	<h3>Other Details of the Lesson</h3>
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
	        Optional: 
				<Switch name="Optional" checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked={this.state.Optional} onChange={this.handleChangeOptional} />	
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
    );
  }
}



module.exports = LearningLesson