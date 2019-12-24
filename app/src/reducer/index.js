import * as types from "../actions/types.js";

const initialState = {
	steps: []
}

const rootReducer = (state = initialState, action) => {
	switch (action.type){
		case types.GET_STEPS_SUCCESS:
			return Object.assign({}, state, {
				steps: state.steps.concat(action.steps)
			});
						
		case types.SAVE_STEP_SUCCESS:
			return Object.assign({}, state, {
				steps: state.steps.concat(action.step)
			});
			
		case types.UPDATE_STEP_SUCCESS:
			/*const updatedSteps = Object.assign([], state.steps.filter(step => { 
				return parseInt(step.id) !== parseInt(action.step.id)}).concat(action.step));
			console.log(updatedSteps)
			return updatedSteps;*/
			return [
		        ...state.filter(step => step.id !== action.step.id),
		        Object.assign([], action.step)
		      ]
			
		case types.DELETE_STEP_SUCCESS: {
			const newState = Object.assign([], state);
			const removeStep = newState.steps.filter(step => {
				return parseInt(step.id) === parseInt(action.step.id);
			})
			const id = newState.steps.indexOf(removeStep[0]);
			newState.steps.splice(id, 1);
			return newState;
		}
		default: 
			return state;
	}
};
export default rootReducer;