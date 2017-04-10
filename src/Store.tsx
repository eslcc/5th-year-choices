import * as redux from 'redux';
import {ChoiceValues} from './constants/choices';

import ChoiceReducer from './Choice/reducer';

export type ChoiceState = {
    values: ChoiceValues;
};

export type AppState = {
    choice: ChoiceState;
};

export default function createStore(): redux.Store<AppState> {
    const store = redux.createStore<AppState>(redux.combineReducers<AppState>({
            choice: ChoiceReducer
        }),
        // tslint:disable-next-line
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    );

    return store;
}
