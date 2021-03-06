import React from "react";
import "./ThreadForm.css";
import { Form } from 'react-bootstrap';

class ThreadForm extends React.Component{
	constructor(props) {
	    super(props);
	    this.state = {textValue: '', id: props.threadID}; // need to change this to allow multiple ids
	    this.handleChange = this.handleChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
  	}
	
	handleChange(e) {
		this.setState({textValue: e.target.value})
	}

	handleSubmit(e) {
		e.preventDefault();
		fetch("http://localhost:8000/quizbank/api/v1/threadposts/post/?format=json",{
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json',
			}),
			body: JSON.stringify({"text": this.state.textValue, "id": this.state.id})
		})
		.then((response) => response.text())
		.then((responseText) => {
		  console.log(responseText);
		})
		.catch((error) => {
		    console.error(error);
		});


		window.location.reload()
	}


	
	render() {
		return (
			<>
				<div className="text-area-border">
				<Form onSubmit={this.handleSubmit} className = "ant-table">
				  <Form.Control as="textarea" className="text-form" placeholder="Input your thoughts here!" rows="6" onChange={this.handleChange}/>
				  
				  <input className="text-area-button"type="submit" value="Submit" />
				  
				</Form>
				</div>
			</>
		);
	}
	
}

export default ThreadForm;
