import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {deleteStep} from "../actions/index.js";
import "../App.css";

import Add from "./Add.js";

class Home extends React.Component {
	state = {
		loaded: false,
		add: false
	}
	
	componentDidMount(){
		this.interval();
	}
	
	componentWillUnmount = () => {
		clearInterval(this.state.intervalId);
	}
	
	interval = () => {
		let intervalId = setInterval(this.dataLoad, 100)
		this.setState({
			intervalId: intervalId,
		})
	}
	
	dataLoad = () => {
		this.setState({
			steps: this.props.steps
		}, () => {
		if(this.state.steps.length > 0){
			this.setState({
				loaded: true,
				steps: this.state.steps
			})
		}
		})
	}
	
	deleteStep = (step) => {
		this.props.deleteStep(step)
		.then(res => {
			console.log(res);			
		})
	}
	
	addButton = () => {
		this.setState({
			add: !this.state.add
		})
	}
	
	render(){
		return(
			<div className="back">
				<div>
					<h1 className="header">Workout Routine</h1>
					<div className="container-table">
						<table className="table">
							<thead>
								<tr>
									<th id="tId">Name</th>
									<th id="tReps">Reps</th>
									<th id="tDesc">Description</th>
									<th id="tUpd">Update</th>
									<th id="tDel">Delete</th>
								</tr>
							</thead>
							{this.state.loaded ? (
								<tbody>
								{this.state.steps.map( step => (
									<tr key={step.id}>
										<td>{step.name}</td>
										<td id="tReps">{step.reps}</td>
										<td>{step.description}</td>
										<td id="bUpd"><Link to={"/steps/" + step.id}>Update</Link></td>
										<td id="bDel" onClick={() => this.deleteStep(step)}>Delete</td>
									</tr>
								))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							)}
						</table>
						<div>
							{this.state.add ? (
								<div id="add">
									<Add
										addButton={this.addButton}
									/>
									
								</div>
							) : (
								<div id="add">
									<button className="bAdd" onClick={this.addButton}>Add To Workout</button>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	let step = {id: null, name: "", reps: null, description: ""};
	if(!state.steps.length){
		return { steps: step};
	} else {
		console.log(state.steps)
		return { steps: state.steps}
	}
}

const mapDispatchToProps = dispatch => {
	  return { deleteStep: step => dispatch(deleteStep(step))}
	}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));