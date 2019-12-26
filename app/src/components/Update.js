import React from "react";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/index.js";

class Update extends React.Component {
	state = {
		name: this.props.step.name,
		reps: this.props.step.reps,
		description: this.props.step.description,
		redirect: false
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
		this.props.actions.updateStep({
			id: this.props.id,
			name: this.state.name,
			reps: parseInt(this.state.reps),
			description: this.state.description
		})
		.then(res => {
			//this.props.updateStep(res.data)
			console.log(res.data)})
		.catch(err => console.log(err))
		this.props.updateButton();
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
					<button className="bAdd" id="bCxl" onClick={this.props.updateButton}>Cancel</button>
				</div>
			</div>
		)
	}
}


const mapDispatchToProps = dispatch => {
	  return {actions: bindActionCreators(actions, dispatch)}
	}

export default withRouter(connect(null, mapDispatchToProps)(Update));