import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/index.js";
import "../App.css";

import Add from "./Add.js";
import Update from "./Update.js";

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			steps: [],
			step: {},
			loaded: false,
			add: false
		}
	}
	componentDidMount = () => {
		this.dataLoad();
	}
	componentDidUpdate(nextProps){
		console.log(nextProps.steps)
		if(this.props.steps !== nextProps.steps){
			this.dataLoad();
		}
	}	
	
	componentWillUnmount = () => {
		clearInterval(this.state.intervalId);
	}
		
	dataLoad = () => {
		console.log("dataLoad")
		if(this.props.steps){
			this.setState({
				steps: this.props.steps
			}, () => {
				console.log(this.state.steps.length)
				if(this.state.steps.length > 0){
					this.setState({
						loaded: true
					}, () => {
						console.log("loading")
					})
				}
			})
		}
	}
			
	deleteStep = (step) => {
		this.props.actions.deleteStep(step)
		.then(res => {
			this.dataLoad();
			console.log(res);
		})
	}
	
	addButton = () => {
		this.setState({
			add: !this.state.add
		})
	}
	
	updateButton = () => {
		this.setState({
			update: !this.state.update
		})
	}
	
	findOne = (step) => {
		this.setState({
			step: step
		}, () => {
			this.updateButton()
		})
	}
	
	updateStep = (step) => {
		this.setState({
			step: step
		}, () => {
			console.log(this.state.step)
			const list = this.state.steps;
			const item = list.filter(step => step.id === this.state.step.id)
			const index = list.indexOf(item[0]);	
			list.splice(index, 1, this.state.step)
			console.log(list)
			this.setState({
				steps: list
			})
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
										<td id="bUpd" onClick={() => this.findOne(step)}>Update</td>
										<td id="bDel" onClick={() => this.deleteStep(step)}>Delete</td>
									</tr>
								))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td> </td>
										<td> </td>
										<td> </td>
										<td> </td>
										<td> </td>
									</tr>
								</tbody>
							)}
						</table>
						<div>
							{this.state.update ? (
								<Update
									id= {this.state.step.id}
									step = {this.state.step}
									updateButton = {this.updateButton}
									updateStep = {this.updateStep}
								>
								</Update>
							) : (
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
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	/*if(state.steps.length > 0){
		console.log(state.steps)
		return { steps: state.steps}
	} else {
		return { steps: [{id: null, name: "", reps: null, description: ""}]};
	}*/
	console.log(state.steps)
	return { steps: state.steps}
}

const mapDispatchToProps = dispatch => {
	  return {actions: bindActionCreators(actions, dispatch)}
	}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));