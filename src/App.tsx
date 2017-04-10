import * as React from 'react';
import './App.css';
import {pickBy} from 'lodash';

import choices, {buildChoiceDefaults, ChoiceValueType} from './constants/choices';
import {ChoiceValues} from './constants/choices';
import {objectToNestedArray} from './helpers';
import Choice from './Choice/component';

interface AppState {
    values: ChoiceValues;
}

function onChoiceChange(key: string, value: ChoiceValueType): (state: AppState) => AppState {
    return state => ({
        values: {
            ...state.values,
            [key]: value
        }
    });
}

class App extends React.Component<{}, AppState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            values: buildChoiceDefaults()
        };
    }

    render() {
        return (
            <div className="App">
                <div className="columns">
                    {[1, 2, 3, 4, 5]
                        .map(column => pickBy(choices, c => c.column === column))
                        .map((items, column) => (
                                <div className="column" key={`column-${column}`}>
                                    {objectToNestedArray(items)
                                        .map(choice => (
                                                <Choice
                                                    key={choice[0]}
                                                    id={choice[0]}
                                                    item={choice[1]}
                                                    values={this.state.values}
                                                    onChange={(key, value) => this.setState(onChoiceChange(key, value))}
                                                />
                                            )
                                        )}
                                </div>
                            )
                        )}
                </div>
            </div>
        );
    }
}

export default App;
