import React from "react";
import {withRouter, Link} from "react-router-dom";
import {connect} from "react-redux";

import {updateStep} from "../actions/index.js";

class Update extends React.Component {
	state = {
		name: this.props.step.name,
		reps: this.props.step.reps,
		description: this.props.step.description
	}
			
	stepInfo = (event) => {
		event.preventDefault();
	    const { name, value } = event.target;
	    this.setState({
	    	[name]: value,
	    })
	}
	
	updateStep = () => {
		if(this.state.name === ("" || null)){
			this.setState({
				name: this.props.step.name
			})
		}
		if(this.state.reps === ("" || null)){
			this.setState({
				reps: this.props.step.reps
			})
		}
		if(this.state.description === ("" || null)){
			this.setState({
				description: this.props.step.description
			})
		}
		this.props.updateStep({
			id: this.props.stepId,
			name: this.state.name,
			reps: parseInt(this.state.reps),
			description: this.state.description
		})
		.then(res => {
			
		})
		.catch(err => console.log(err));
		this.props.history.push("/steps");
	}
	
	render(){
		return(
			<div className="back">
				<div id="updCont" onChange={this.stepInfo}>
					<h2>Updating "{this.props.step.name}"</h2>
					<div>
						<div className="header">New Name:</div>
						<input name="name" placeholder={this.props.step.name}></input>
					</div>
					<div>
						<div className="header">New Rep Count:</div>
						<input name="reps" placeholder={this.props.step.reps}></input>
					</div>
					<div>
						<div className="header">New Description:</div>
						<textarea name="description" placeholder={this.props.step.description}></textarea>
					</div>
					<button className="bAdd" onClick={this.updateStep}>Update</button>
					<button className="bAdd" id="bCxl"><Link id="noUnd" to={"/steps"}>Cancel</Link></button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state, props) => {
	let stepId = props.match.params.id;
	let step = {id: null, name: "", reps: null, description: ""};
	console.log(state.steps)
	if(stepId && state.steps.length !== 0) {
		step = Object.assign({}, state.steps.find(step => parseInt(step.id) === parseInt(stepId)))
	}
	return {
		step: step,
		stepId: stepId
	}
}

const mapDispatchToProps = dispatch => {
	  return { updateStep: step => dispatch(updateStep(step))}
	}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Update));