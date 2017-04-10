import * as React from 'react';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {Choice as ChoiceInterface, ChoiceValues, ChoiceValueType, ChoiceFieldType, Falsey} from '../constants/choices';
import {I18nField} from '../constants/i18n';

interface ChoiceProps {
    id: string;
    item: ChoiceInterface;
    values: ChoiceValues;
    onChange: (key: string, newValue: ChoiceValueType) => void;
    periods?: number;
    error?: I18nField | Falsey;
    warning?: I18nField | Falsey;
    disabled?: boolean;
}

interface ChoiceState {

}

class BooleanChoice extends React.Component<ChoiceProps, ChoiceState> {
    render() {
        const {item, periods, error, warning, onChange, disabled, id} = this.props;

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
    onChange(_0: {}, value: string) {
        let val = Object.keys(this.props.item.options)[value];
        if (val === 'null') {
            val = null;
        }
        this.props.onChange(this.props.id, val);
    }

    render() {
        const {item, periods, error, warning, disabled, id, values} = this.props;

        return (
            <div className="choice">
                <SelectField
                    floatingLabelText={item.displayName.en}
                    disabled={disabled}
                    value={values[id] === null ? 'null' : (values[id] || item.default || null)}
                    onChange={this.onChange.bind(this)}
                >
                    {Object.keys(item.options).map(key => {
                        return <MenuItem key={key} value={key} primaryText={item.options![key].en}/>;
                    })}
                </SelectField>
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

class Choice extends React.Component<ChoiceProps, {}> {
    render() {
        const {item, values, id} = this.props;

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
                    let value = values[id];
                    if (value || value == null) {
                        if (item.periods['default']) {
                            periods = item.periods['default'];
                            break;
                        }
                    }
                    periods = item.periods[value] || item.periods['default'];
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

        switch (this.props.item.type) {
            case ChoiceFieldType.BOOLEAN:
                return (
                    <BooleanChoice
                        periods={periods}
                        error={error}
                        warning={warning}
                        disabled={disabled}
                        {...this.props}
                    />
                );
            case ChoiceFieldType.INPUT:
                return (
                    <InputChoice
                        periods={periods}
                        error={error}
                        warning={warning}
                        disabled={disabled}
                        {...this.props}
                    />
                );
            case ChoiceFieldType.SELECT:
                return (
                    <SelectChoice
                        periods={periods}
                        error={error}
                        warning={warning}
                        disabled={disabled}
                        {...this.props}
                    />);
            default:
                throw new Error('What the fuck');
        }
    }
}

export default Choice;
