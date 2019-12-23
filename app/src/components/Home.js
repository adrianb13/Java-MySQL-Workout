import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {deleteStep} from "../actions/index.js";

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
		})
		if(this.state.steps.length > 0){
			this.setState({
				loaded: true,
				steps: this.props.steps
			})
		}
	}
	
	deleteStep = (step) => {
		this.props.deleteStep(step)
		.then(res => {
			console.log(res);			
		})
	}
	
	addButton = (event) => {
		event.preventDefault();
		this.setState({
			add: !this.state.add
		})
	}
	
	render(){
		return(
			<div>
				<div>
					<div className="container-table">
						<table className="table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Reps</th>
									<th>Description</th>
									<th>Update</th>
									<th>Delete</th>
								</tr>
							</thead>
							{this.state.loaded ? (
								<tbody>
								{this.state.steps.map( step => (
									<tr key={step.id}>
										<td>{step.name}</td>
										<td>{step.reps}</td>
										<td>{step.description}</td>
										<td><button><Link to={"/steps/" + step.id}>Update</Link></button></td>
										<td><button onClick={() => this.deleteStep(step)}>Delete</button></td>
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
								<div>
									<div>Add Me</div>
									<button onClick={this.addButton}>Cancel</button>
								</div>
							) : (
								<div>
									<button onClick={this.addButton}>Add Workout Step</button>
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
	if(!state.steps.length > 0){
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