import * as React from 'react';

import choices, {buildChoiceDefaults, ChoiceValueType} from '../constants/choices';
import {ChoiceValues} from '../constants/choices';
import {objectToNestedArray} from '../helpers';
import Choice from '../Choice/component';
import {pickBy} from 'lodash';
import './table.css';

interface TableState {
    values: ChoiceValues;
}

function onChoiceChange(key: string, value: ChoiceValueType): (state: TableState) => TableState {
    return state => ({
        values: {
            ...state.values,
            [key]: value
        }
    });
}

export default class Table extends React.Component<{}, TableState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            values: buildChoiceDefaults(),
        };
    }

    render() {
        return (
            <div>
                <div className="error-bar valid">
                    <span className="label">Valid. </span>
                    {/*{I18n.Errors.notEnoughCols1To4.en}*/}
                </div>
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