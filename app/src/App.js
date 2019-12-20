import React from 'react';
import { Router, Route, Switch} from "react-router-dom";
import './App.css';

import history from "./history/history.js";
import Home from "./components/Home.js";

class App extends React.Component {
	render(){
		return(
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route component={Home} />
				</Switch>
			</Router>
		)
	}
}

export default App;
