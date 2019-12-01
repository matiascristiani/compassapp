import * as actionTypes from '../actions/actionTypes';

const initialState =  {
    data: [],
    isFeching: false,
    error: false
}

export default dataReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.CREATE_NEW_POINT:
            return [
                ...state,
                Object.assign({}, action.point)
            ]
        default:
        return state
    }
}
