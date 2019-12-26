import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import {saveStep} from "../actions/index.js";

class Add extends React.Component {
	state = {
		name: "",
		reps: null,
		description: ""
	}
	
	stepInfo = (event) => {
		event.preventDefault();
	    const { name, value } = event.target;
	    this.setState({
	    	[name]: value,
	    })
	}
	
	saveStep = () => {
		if(this.state.name === ("" || null)){
			this.setState({
				message: "Please Name Your Workout Step."
			})
		} else if (this.state.reps === ("" || null)){
			this.setState({
				message: "Please Add Reps To Your Workout Step."
			})
		} else if (this.state.description === ("" || null)){
			this.setState({
				message: "Please Add A Description To Your Workout Step"
			})
		} else {
			this.props.saveStep({
				name: this.state.name,
				reps: parseInt(this.state.reps),
				description: this.state.description
			})
			.then(res => {
				this.props.addButton();
			})
			.catch(err => console.log(err));
		}
	}
	
	render(){
		return(
			<div id="addCont">
				<h2>Add To Your Workout</h2>
				<div onChange={this.stepInfo}>
					<div>{this.state.message}</div>
					<div>
						<div className="header">Name:</div>
						<input name="name"></input>
					</div>
					<div>
						<div className="header">Reps:</div>
						<input name="reps"></input>
					</div>
					<div>
						<div className="header">Description:</div>
						<textarea name="description"></textarea>
					</div>
				</div>
				<button className="bAdd" onClick={this.saveStep}>Add</button>
				<button className="bAdd" id="bCxl" onClick={this.props.addButton}>Cancel</button>
			</div>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {saveStep: step => dispatch(saveStep(step))}
}

export default withRouter(connect(null, mapDispatchToProps)(Add));