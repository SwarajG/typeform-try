import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox, InputNumber } from 'antd';
import { Switch } from 'antd';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;


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
      LockLessons: [],
      contentRF: 0,
      contentValue : ''
    }

    this.handleInputChange1 = this.handleInputChange1.bind(this);
    this.handleDuration = this.handleDuration.bind(this);

    this.handleChangeOptional = this.handleChangeOptional.bind(this);
    this.handleChangeLock = this.handleChangeLock.bind(this);
    this.addLockLesson = this.addLockLesson.bind(this);
    this.handleLockedLessons = this.handleLockedLessons.bind(this);
    this.handleRemoveLockLessons = this.handleRemoveLockLessons.bind(this);
    this.handleContentRF = this.handleContentRF.bind(this);
    this.handleContentValue = this.handleContentValue.bind(this);
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

    handleContentRF(event){  //RF  - Response Format
        this.setState({
            contentRF : event.target.value
        })
    }

    handleContentValue(event){  //RF  - Response Format
        this.setState({
            contentValue : event.target.value
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
            Add Learning Content here:<br/>
            Select How will You Add content:
                <RadioGroup onChange={this.handleContentRF} value={this.state.contentRF}>
                    <Radio value={1}>Text</Radio>
                    <Radio value={2}>Image</Radio>
                    <Radio value={3}>Audio</Radio>
                    <Radio value={4}>Video</Radio>
                 </RadioGroup><br/>
            Add Content or its link
                <Input defaultValue={this.contentValue} onChange={this.handleContentValue}/>
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
                			ll.map(function(item,index){
                			return (
                				<span key={index}>
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
    );
  }
}



module.exports = LearningLesson