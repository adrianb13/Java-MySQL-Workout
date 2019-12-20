import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Home extends React.Component {
	state = {
		loaded: false,
		count: 0
	}
	
	componentDidMount(){
		this.interval();
	}
	
	interval = () => {
		let intervalId = setInterval(this.dataLoad, 100)
		this.setState({
			intervalId: intervalId,
		})
	}
	
	dataLoad = () => {
		if(this.props.steps.length > 0){
			this.setState({
				loaded: true
			},() => {
				clearInterval(this.state.intervalId);
			})
		}
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
								</tr>
							</thead>
							{this.state.loaded ? (
								<tbody>
								{this.props.steps.map( step => (
									<tr key={step.id}>
										<td>{step.name}</td>
										<td>{step.reps}</td>
										<td>{step.description}</td>
									</tr>
								))}
								</tbody>
							) : (
								<tbody>
									<tr>
										<td></td>
										<td></td>
										<td></td>
									</tr>
								</tbody>
							)}
						</table>
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
		return { steps: state.steps}
	}	
}

export default withRouter(connect(mapStateToProps)(Home));