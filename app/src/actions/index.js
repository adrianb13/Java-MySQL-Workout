import API from "../utils/API.js";
import * as types from "./types.js";

export const getSteps = () => {
	return (dispatch) => {
		return API.getSteps()
		.then(res => {
			dispatch(getStepsSuccess(res.data))
		})
		.catch(err => console.log(err));
	};
};

const getStepsSuccess = (steps) => {
	return {type: types.GET_STEPS_SUCCESS, steps}
};

export const saveStep = (step) => {
	return (dispatch) => {
		return API.saveStep(step)
		.then(res => {
			dispatch(saveStepSuccess(res.data))
			return res;
		})
		.catch(err => console.log(err));
	};
};

const saveStepSuccess = (step) => {
	return {type: types.SAVE_STEP_SUCCESS, step}
};

export const updateStep = (step) => {
	return (dispatch) => {
		return API.updateStep(step)
		.then(res => {
			dispatch(updateStepSuccess(res.data));
			return res;
		})
		.catch(err => console.log(err));
	};
};

const updateStepSuccess = (step) => {
	return {type: types.UPDATE_STEP_SUCCESS, step}
};

export const deleteStep = (step) => {
	return (dispatch) => {
		return API.deleteStep(step)
		.then(res => {
			dispatch(deleteStepSuccess(step))
			API.getSteps();
			return res;
		})
		.catch(err => console.log(err));
	};
};

const deleteStepSuccess = (step) => {
	return {type: types.DELETE_STEP_SUCCESS, step}
};