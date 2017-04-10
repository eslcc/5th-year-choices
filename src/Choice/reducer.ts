import * as actionTypes from './actionTypes';
import {buildChoiceDefaults} from '../constants/choices';
import {Action} from './actions';

const initialState = {
    values: buildChoiceDefaults(),
};

export default (state = initialState, action: Action) => {
    switch (action.type) {
        case actionTypes.CHOICE_CHANGE:
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.key]: action.newValue
                },
            };
        default:
            return state;
    }
}