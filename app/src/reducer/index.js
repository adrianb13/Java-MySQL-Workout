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
			const list = Object.assign([], state.steps);
			const item = list.filter(step => step.id === action.step.id)
			const index = list.indexOf(item[0]);	
			list.splice(index, 1, action.step)
			console.log(list)
			return Object.assign({}, state, {
				steps: list
			})
			
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