import axios from "axios";

export default {
	getSteps: () => {
		return axios.get("http://localhost:8080/api/steps");
	},
	saveStep: (step) => {
		return axios.post("http://localhost:8080/api/steps", step);
	},
	updateStep: (step) => {
		return axios.put("http://localhost:8080/api/steps/" + step.id , step);
	},
	deleteStep: (step) => {
		return axios.delete("http://localhost:8080/api/steps/" + step.id);
	}
}