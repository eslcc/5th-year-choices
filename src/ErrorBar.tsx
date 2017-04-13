import * as React from 'react';
import {ChoiceValues, checkValidity} from './constants/choices';
import {I18nField} from './constants/i18n';

const classNames = require('classnames');

function isError(err: I18nField | number): err is I18nField {
    return err.hasOwnProperty('en');
}

export default ({ values }: { values: ChoiceValues }) => {
    const errorOrTotal = checkValidity(values);
    const valid = typeof errorOrTotal === 'number';

    return (
        <div className={classNames('error-bar', valid ? 'valid' : 'invalid')}>
            <span className="label">{valid ? `Valid. Total periods: ${errorOrTotal}` : 'Invalid'}. </span>
            {isError(errorOrTotal) && errorOrTotal.en}
        </div>
    );
};
