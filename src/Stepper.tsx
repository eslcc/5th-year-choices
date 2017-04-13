import * as React from 'react';
import {
    Step,
    Stepper as StepperComponent,
    StepLabel,
} from 'material-ui/Stepper';
import {RouteComponentProps} from 'react-router-dom';

interface StepperState {
    smallScreen: boolean;
}

export default class Stepper extends React.Component<RouteComponentProps<{step: string}>, StepperState> {
    list: MediaQueryList = null;
    listener: MediaQueryListListener = (query: MediaQueryList) => {
        this.setState({
            smallScreen: query.matches
        });
    }

    constructor(props: RouteComponentProps<{step: string}>) {
        super(props);
        this.state = {
            smallScreen: false,
        };
    }

    componentDidMount() {
        this.list = window.matchMedia('screen and (max-width: 580px)');
        this.list.addListener(this.listener);
    }

    componentWillUnmount() {
        this.list.removeListener(this.listener);
    }

    render() {
        const { match } = this.props;
        let index = 0;
        switch ((match.params).step) {
            case 'basics':
                index = 0;
                break;
            case 'table':
                index = 1;
                break;
            case 'form':
                index = 2;
                break;
            default:
                throw new Error('Unrecognised Stepper step ' + match.params.step);
        }
        return (
            <div>
                <StepperComponent
                    activeStep={index}
                    orientation={this.state.smallScreen ? 'vertical' : 'horizontal'}
                >
                    <Step>
                        <StepLabel>Input basic information</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Make your choices</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel>Print pre-filled form</StepLabel>
                    </Step>
                </StepperComponent>
            </div>
        );
    }
}
