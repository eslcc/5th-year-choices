import * as React from 'react';
import choices from '../constants/choices';
import Choice from '../Choice/component';
import {objectToNestedArray} from '../helpers';
import FlatButton from 'material-ui/FlatButton';
import {AppState} from '../Store';
import {ChoiceValues} from '../constants/choices';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {pick} from 'lodash';

interface BasicsProps {
    values: ChoiceValues;
}

const mapStateToProps = (state: AppState): BasicsProps => ({
    values: state.choice.values
});

class Basics extends React.Component<RouteComponentProps<any> & BasicsProps, void> {
    allValid() {
        const {values} = this.props;
        return values.name.length > 0
            && values.classCode.length > 0
            && values.classTeacher.length > 0;
    }

    continue() {
        const {history} = this.props;
        history.push('/choice/table');
    }

    render() {
        return (
            <div>
                {objectToNestedArray(
                    pick(choices,
                         ['name', 'classCode', 'classTeacher', 'l1', 'l2', 'l3', 'l4', 'onl', 'matY4',
                            'relY4', 'ecoY4', 'latY4', 'artY4', 'musY4']
                    )
                ).map(item => (
                    /* tslint:disable */
                    <Choice
                        key={item[0]}
                        id={item[0]}
                        item={item[1] as any}
                    />
                    /* tslint:enable */
                ))
                }
                <FlatButton disabled={!this.allValid()} primary label="Continue" onTouchTap={this.continue.bind(this)}/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Basics) as React.ComponentClass<RouteComponentProps<any> & BasicsProps>;