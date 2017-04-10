import * as React from 'react';
import {
    Step,
    Stepper as StepperComponent,
    StepLabel,
} from 'material-ui/Stepper';
import {RouteComponentProps} from 'react-router-dom';

export default class Stepper extends React.Component<RouteComponentProps<any>, void> {
    render() {
        const { match } = this.props;
        let index = 0;
        switch (match.params.step) {
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
                <StepperComponent activeStep={index} orientation="horizontal">
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
