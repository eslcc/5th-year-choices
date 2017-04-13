import * as React from 'react';

import choices from '../constants/choices';
import Choice from '../Choice/component';
import {pickBy, toPairs} from 'lodash';
import './table.css';
import { ChoiceValues, Choice as ChoiceType } from '../constants/choices';
import {AppState} from '../Store';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import ErrorBar from '../ErrorBar';

interface TableProps {
    values: ChoiceValues;
}

const mapStateToProps = (state: AppState): TableProps => ({
    values: state.choice.values
});

class Table extends React.Component<TableProps, void> {
    render() {
        return (
            <div>
                <ErrorBar values={this.props.values} />
                <div className="columns">
                    {[1, 2, 3, 4, 5]
                        .map(column => pickBy(choices, c => c.column === column))
                        .map((items, column) => (
                                <div className="column" key={`column-${column}`}>
                                    {toPairs(items)
                                        .map((keyValuePair: [string, ChoiceType]) => (
                                                <Choice
                                                    key={keyValuePair[0]}
                                                    id={keyValuePair[0]}
                                                    item={keyValuePair[1]}
                                                    screen="table"
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

// tslint:disable-next-line
export default connect(mapStateToProps)(Table) as React.ComponentClass<TableProps & RouteComponentProps<any>>;
