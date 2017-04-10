import * as React from 'react';

import choices, * as Choices from '../constants/choices';
import {objectToNestedArray} from '../helpers';
import Choice from '../Choice/component';
import {pickBy} from 'lodash';
import './table.css';
import {ChoiceValues} from '../constants/choices';
import {AppState} from '../Store';
import {connect} from 'react-redux';
import {RouteComponentProps} from "react-router";

interface TableProps {
    values: ChoiceValues;
}

const mapStateToProps = (state: AppState): TableProps => ({
    values: state.choice.values
});

class Table extends React.Component<TableProps, void> {
    render() {
        const error = Choices.checkValidity(this.props.values);
        return (
            <div>
                <div className={`error-bar ${error === null ? 'valid' : 'invalid'}`}>
                    <span className="label">{error === null ? 'Valid' : 'Invalid'}. </span>
                    {error && error.en}
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

export default connect(mapStateToProps)(Table) as React.ComponentClass<TableProps & RouteComponentProps<any>>;
