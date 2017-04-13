import * as React from 'react';
import choices, { Choice as ChoiceType} from '../constants/choices';
import Choice from '../Choice/component';
import FlatButton from 'material-ui/FlatButton';
import {AppState} from '../Store';
import {ChoiceValues} from '../constants/choices';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {pick, toPairs, values} from 'lodash';

const BASICS = ['name', 'classCode', 'classTeacher', 'l1', 'l2', 'l3', 'l4', 'onl', 'matY4',
                            'relY4', 'ecoY4', 'latY4', 'artY4', 'musY4'];

interface BasicsProps {
    values: ChoiceValues;
}

const mapStateToProps = (state: AppState): BasicsProps => ({
    values: state.choice.values
});

// tslint:disable-next-line
class Basics extends React.Component<RouteComponentProps<any> & BasicsProps, void> {
    allValid() {
        return !(values(pick(choices, BASICS)) as ChoiceType[])
        .find(i => typeof i.error !== 'function' ? false : !!i.error(this.props.values));
    }

    continue() {
        const {history} = this.props;
        history.push('/choice/table');
    }

    render() {
        return (
            <div>
                {toPairs(
                    pick(choices, BASICS)
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

// tslint:disable-next-line
export default connect(mapStateToProps)(Basics) as React.ComponentClass<RouteComponentProps<any> & BasicsProps>;