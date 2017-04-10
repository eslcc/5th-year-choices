import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';

import {Choice as ChoiceInterface, ChoiceValues, ChoiceValueType, ChoiceFieldType, Falsey} from '../constants/choices';
import {I18nField} from '../constants/i18n';

interface ChoiceProps {
    id: string;
    item: ChoiceInterface;
    values: ChoiceValues;
    onChange: (key: string, newValue: ChoiceValueType) => void;
}

interface ChoiceState {

}

class BooleanChoice extends React.Component<ChoiceProps, ChoiceState> {
    render() {
        const { item, values, id, onChange } = this.props;

        let error: I18nField | Falsey = null;
        if (item.error) {
            error = item.error(values);
        }

        let warning: I18nField | Falsey = null;
        if (item.warning) {
            warning = item.warning(values);
        }

        let periods;
        if (item.periods) {
            switch (typeof item.periods) {
                case 'number':
                    periods = item.periods;
                    break;
                case 'object':
                    periods = item.periods[values[id]];
                    break;
                default:
                    periods = null;
            }
        }

        let disabled;
        if (item.overrideDisabled) {
            disabled = item.overrideDisabled(values);
        } else {
            disabled = !!error;
        }

        return (
            <div className="choice">
                <Checkbox
                    label={item.displayName.en}
                    disabled={disabled}
                    defaultChecked={(item.default as boolean) || false}
                    onCheck={(evt, checked) => onChange(id, checked)}
                />
                {periods && (
                    <i>{periods} periods</i>
                )}
                {error && (
                    <b className="error">{error.en}</b>
                )}
                {warning && (
                    <b className="warning">{warning.en}</b>
                )}
            </div>
        );
    }
}

class InputChoice extends React.Component<ChoiceProps, ChoiceState> {
    render() {
        return <div>fuck</div>;
    }
}

class SelectChoice extends React.Component<ChoiceProps, ChoiceState> {
    render() {
        return <div>shit</div>;
    }
}

class Choice extends React.Component<ChoiceProps, {}> {
    render() {
        switch (this.props.item.type) {
            case ChoiceFieldType.BOOLEAN:
                return <BooleanChoice {...this.props} />;
            case ChoiceFieldType.INPUT:
                return <InputChoice {...this.props} />;
            case ChoiceFieldType.SELECT:
                return <SelectChoice {...this.props} />;
            default:
                throw new Error('What the fuck');
        }
    }
}

export default Choice;
