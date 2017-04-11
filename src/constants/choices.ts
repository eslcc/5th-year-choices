import {pick} from 'lodash';
import * as I18n from './i18n';

// region Type definitions
import I18nField = I18n.I18nField;

export enum ChoiceFieldType {
    INPUT,
    SELECT,
    BOOLEAN
}

export type ChoiceValueType = boolean | string | null;

export type Falsey = false | null | undefined;

export interface ChoiceValues {
    name: string;
    classCode: string;
    classTeacher: string;
    l1: string;
    l2: string;
    l3: string;
    l4: string;
    onl: string;
    matY4: 'ma4' | 'ma6';
    relY4: string;
    ecoY4: boolean;
    latY4: boolean;
    artY4: boolean;
    musY4: boolean;
    gym: boolean;
    relY6: string;
    matY6: 'ma3' | 'ma5';
    his2p: boolean;
    geo2p: boolean;
    philo2p: boolean;
    bio2p: boolean;
    chi: boolean;
    phy: boolean;
    bio4p: boolean;
    art4p: boolean;
    mus4p: boolean;
    his4p: boolean;
    geo4p: boolean;
    philo4p: boolean;
    l3Y6: string;
    ecoY6: boolean;
    latY6: boolean;
    l4Y6: string;
    onlY6: string;
    l1adv: boolean;
    l2adv: boolean;
    matadv: boolean;
    art2p: boolean;
    mus2p: boolean;
    ict: boolean;
    introEco: boolean;
    soc: boolean;
    scp: boolean;
    lux: boolean;
    sport: boolean;
    labBio: boolean;
    labChi: boolean;
    labPhy: boolean;
}

export type ValueList = {[s: string]: I18nField};

/**
 * A single choice definition.
 */
export interface Choice {
    /**
     * The type of the choice option
     */
        type: ChoiceFieldType;
    /**
     * The name to display in the browser. May be translated.
     */
    displayName: I18nField;
    /**
     * The default value of the choice. If blank, assumes the default for the type
     * (blank for select, empty string for input, false for boolean)
     */
        default?: null | boolean | string | ValueList;
    /**
     * If the choice type is select, the options.
     */
    options?: ValueList;
    /**
     * The column of the choice on the form.
     */
    column?: number;
    /**
     * The number of periods of this subject.
     * The period count is resolved as follows:
     * 1. if `periods` is a number, use that.
     * 2. if `periods` is an object and has a key named the same as the current value of the choice, use that.
     * 3. use the `periods` object's `default` key.
     */
    periods?: number | {[s: string]: number};
    /**
     * A callback that is called with all the current choices to determine if they are valid.
     * @param choices the current choices by the user
     * @returns falsey if the choice is valid, or an error to display and disable the field.
     */
    error?: (choices: ChoiceValues) => I18nField | Falsey;
    /**
     * A callback that is called with all the current choices to determine whether the user should be warned.
     * Warnings are normally used for choices that are technically valid but dubious
     * (for example, choosing ma4 in 4th/5th but ma5 in 6th/7th)
     * @param choices the current choices by the user
     * @returns falsey if the choice is valid, or a warning to display
     */
    warning?: (choices: ChoiceValues) => I18nField | Falsey;
    /**
     * This can be used to enable/disable the choice, whatever the return value of error.
     */
    overrideDisabled?: (choices: ChoiceValues) => boolean;
}

export type Choices = {[P in keyof ChoiceValues]: Choice};
// endregion

// Remove this when microsoft/typescript#6480 is closed
// tslint:disable-next-line
function gimpTypeSafetyDoNotUseOrYouWillBeFired<T>(thing: any): T {
    return thing;
}

const choices: Choices = {
    // region Basic details
    name: {
        type: ChoiceFieldType.INPUT,
        displayName: I18n.Choices.personName,
        default: '',
        error: values => (values.name as string).length === 0 && I18n.Errors.nameBlank,
    },
    classCode: {
        type: ChoiceFieldType.INPUT,
        displayName: I18n.Choices.class,
        default: '',
        error: values => (values.classCode as string).length === 0 && I18n.Errors.classNameBlank,
    },
    classTeacher: {
        type: ChoiceFieldType.INPUT,
        displayName: I18n.Choices.classTeacher,
        default: '',
        error: values => (values.classTeacher as string).length === 0 && I18n.Errors.classTeacherBlank,
    },
    // endregion
    // region Year 4 baseline subjects
    l1: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l1,
        options: pick(
            I18n.Languages,
            ['bg', 'de', 'en', 'es', 'ee', 'fr', 'lv', 'lt', 'nl', 'pl', 'po', 'fi', 'sv']
        ) as ValueList,
        periods: 4,
    },
    l2: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l2,
        options: pick(
            I18n.Languages,
            ['en', 'fr', 'de']
        ) as ValueList,
        periods: 3,
    },
    l3: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l3,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>(I18n.Languages)
    },
    l4: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l4,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>({null: I18n.None.None, ...I18n.Languages})
    },
    onl: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.onl,
        options: pick(
            I18n.Languages,
            ['ie', 'mt', 'sv', 'fi']
        ) as ValueList,
    },
    matY4: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.mat,
        options: pick(
            I18n.Maths,
            ['ma4', 'ma6']
        ) as ValueList,
        error: values => values.matY4 === null && I18n.Errors.genericBlank,
    },
    relY4: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.relY4,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>(I18n.Religions),
        error: values => values.relY4 === null && I18n.Errors.genericBlank,
        periods: 0,
    },
    ecoY4: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.eco,
    },
    latY4: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.lat,
    },
    artY4: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.art,
    },
    musY4: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.mus,
    },
    // endregion
    // region Column 1

    gym: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.gym,
        default: true,
        overrideDisabled: () => true,
        column: 1,
        periods: 2,
    },
    relY6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.relChange,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>(I18n.Religions),
        periods: 1,
        column: 1,
    },
    matY6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.mat,
        options: pick(
            I18n.Maths,
            ['ma3', 'ma5']
        ) as ValueList,
        column: 1,
        periods: {ma3: 3, ma5: 5},
        warning: values => (values.matY6 === 'ma5' && values.matY4 === 'ma4') && I18n.Warnings.ma5AfterMa4,
    },
    // endregion
    // region Column 2
    his2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.his,
        column: 2,
        periods: 2,
        error: values => {
            if (values.his4p) {
                return I18n.Errors.generic2pNot4p;
            }
            if (!values.his2p) {
                return I18n.Errors.hisGeoPhilo2p;
            }
            return null;
        },
        overrideDisabled: values => values.his4p,
        default: true
    },
    geo2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.geo,
        column: 2,
        periods: 2,
        error: values => {
            if (values.geo4p) {
                return I18n.Errors.generic2pNot4p;
            }
            if (!values.geo2p) {
                return I18n.Errors.hisGeoPhilo2p;
            }
            return null;
        },
        overrideDisabled: values => values.geo4p,
        default: true
    },
    philo2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.philo,
        column: 2,
        periods: 2,
        error: values => {
            if (values.philo4p) {
                return I18n.Errors.generic2pNot4p;
            }
            if (!values.philo2p) {
                return I18n.Errors.hisGeoPhilo2p;
            }
            return null;
        },
        overrideDisabled: values => values.philo4p,
        default: true
    },
    bio2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.bio,
        column: 2,
        periods: 2,
        error: values => {
            if (values.bio4p) {
                return I18n.Errors.generic2pNot4p;
            }
            if (!values.bio2p && !values.bio4p && !values.chi && !values.phy) {
                return I18n.Errors.bio2p;
            }
            return null;
        },
        overrideDisabled: values => values.bio4p,
    },
    // endregion
    // region Column 3
    chi: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.chemo,
        column: 3,
        periods: 4,
    },
    phy: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.phy,
        column: 3,
        periods: 4,
    },
    bio4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.bio,
        column: 3,
        periods: 4,
        error: values => values.bio2p && I18n.Errors.generic2pNot4p,
    },
    art4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.art,
        column: 3,
        periods: 4,
        error: values => values.art2p && I18n.Errors.generic2pNot4p,
        warning: values => values.art4p && !values.artY4 && I18n.Warnings.artMusNotY4,
    },
    mus4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.mus,
        column: 3,
        periods: 4,
        error: values => values.mus2p && I18n.Errors.generic2pNot4p,
        warning: values => values.mus4p && !values.musY4 && I18n.Warnings.artMusNotY4,
    },
    his4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.his,
        column: 3,
        periods: 4,
        error: values => values.his2p && I18n.Errors.generic2pNot4p,
    },
    geo4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.geo,
        column: 3,
        periods: 4,
        error: values => values.geo2p && I18n.Errors.generic2pNot4p,
    },
    philo4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.philo,
        column: 3,
        periods: 4,
        error: values => values.philo2p && I18n.Errors.generic2pNot4p,
    },
    l3Y6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l3,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>({null: I18n.None.None, ...I18n.Languages}),
        column: 3,
        periods: {null: 0, default: 4},
        default: null,
    },
    ecoY6: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.eco,
        column: 3,
        periods: 4,
        error: values => {
            if (!values.ecoY4) {
                return I18n.Errors.ecoY6NotY4;
            }
            if (values.introEco) {
                return I18n.Errors.introEco;
            }
            if (values.latY6) {
                return I18n.Errors.ecoAndLatin;
            }
            return null;
        }
    },
    latY6: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.lat,
        column: 3,
        periods: 4,
        error: values => !values.latY4 ? I18n.Errors.latY6NotY4 : values.ecoY6 && I18n.Errors.ecoAndLatin,
    },
    l4Y6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l4,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>({null: I18n.None.None, ...I18n.Languages}),
        column: 3,
        periods: {null: 0, default: 4},
        error: values => !values.l4 ? I18n.Errors.l4Y6NotY4 : values.onlY6 ? I18n.Errors.l4AndOnl : null,
        default: null,
    },
    onlY6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.onl,
        options: gimpTypeSafetyDoNotUseOrYouWillBeFired<ValueList>({
            null: I18n.None.None,
            ...pick(
                I18n.Languages,
                ['ie', 'mt', 'sv', 'fi']
            )
        }),
        column: 3,
        periods: {null: 0, default: 4},
        default: null,
        error: values => !values.onl ? I18n.Errors.onlY6NotY4 : values.l4Y6 ? I18n.Errors.l4AndOnl : null,
    },
    // endregion
    // region Column 4
    l1adv: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.l1adv,
        column: 4,
        periods: 3,
        error: values => (values.l2adv || values.matadv) && I18n.Errors.onlyOneAdvanced,
    },
    l2adv: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.l2adv,
        column: 4,
        periods: 3,
        error: values => (values.l1adv || values.matadv) && I18n.Errors.onlyOneAdvanced,
    },
    matadv: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.matadv,
        column: 4,
        periods: 3,
        error: values => (values.l1adv || values.l2adv)
            ? I18n.Errors.l4AndOnl
            : (values.matY6 !== 'ma5' && I18n.Errors.matadvNotMa5),
    },
    // endregion
    // region Column 5
    art2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.art,
        column: 5,
        periods: 2,
        error: values => values.art4p && I18n.Errors.generic2pNot4p,
    },
    mus2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.mus,
        column: 5,
        periods: 2,
        error: values => values.mus4p && I18n.Errors.generic2pNot4p,
    },
    ict: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.ict,
        column: 5,
        periods: 2,
    },
    introEco: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.introEco,
        column: 5,
        periods: 2,
        error: values => (values.ecoY4 || values.ecoY6) && I18n.Errors.introEco,
    },
    soc: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.soc,
        column: 5,
        periods: 2,
    },
    lux: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.lux,
        column: 5,
        periods: 2,
    },
    scp: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.scp,
        column: 5,
        periods: 2
    },
    sport: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.sport,
        column: 5,
        periods: 2,
    },
    labBio: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.labBio,
        column: 5,
        periods: 2,
        error: values => {
            if (values.labChi || values.labPhy) {
                return I18n.Errors.labOnlyOne;
            }
            if (!values.bio4p) {
                return I18n.Errors.labBio;
            }
            return null;
        }
    },
    labChi: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.labChi,
        column: 5,
        periods: 2,
        error: values => {
            if (values.labBio || values.labPhy) {
                return I18n.Errors.labOnlyOne;
            }
            if (!values.chi) {
                return I18n.Errors.labChi;
            }
            return null;
        }
    },
    labPhy: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.labPhy,
        column: 5,
        periods: 2,
        error: values => {
            if (values.labBio || values.labChi) {
                return I18n.Errors.labOnlyOne;
            }
            if (!values.phy) {
                return I18n.Errors.labPhy;
            }
            return null;
        }
    },
    // endregion
};

export default choices;

export function buildChoiceDefaults(): ChoiceValues {
    const result = {};
    Object.keys(choices).forEach(key => {
        result[key] = choices[key].default;
    });
    return gimpTypeSafetyDoNotUseOrYouWillBeFired<ChoiceValues>(result);
}

export function getPeriodCount(id: string, values: ChoiceValues): number {
    const item = choices[id];
    switch (typeof item.periods) {
        case 'number':
            return item.periods as number;
        case 'object':
            let value = values[id];
            if (value || value == null) {
                if (item.periods['default']) {
                    return item.periods['default'];
                }
            }
            return item.periods[value] || item.periods['default'];
        default:
            return null;
    }
}

function sumOfPeriods(values: ChoiceValues, filter: (c: Choice, v: ChoiceValueType) => boolean = () => true) {
    let sum = 0;
    Object.keys(values).forEach(key => {
        if (values[key]) {
            // console.log([key, filter(values[key])]);
            if (filter(choices[key], values[key])) {
                sum += getPeriodCount(key, values);
            }
        }
    });
    return sum;
}

function countChoices(values: ChoiceValues, filter: (c: Choice, v: ChoiceValueType) => boolean = () => true) {
    let count = 0;
    Object.keys(values).forEach(key => {
        if (values[key]) {
            // console.log([key, filter(values[key])]);
            if (filter(choices[key], values[key])) {
                count += 1;
            }
        }
    });
    return count;
}

export function checkValidity(values: ChoiceValues): I18nField | number {

    // First, check the sum of all the columns
    const sum = sumOfPeriods(values);

    if (sum < 31) {
        return I18n.Errors.substitute(I18n.Errors.notEnough, sum.toFixed(0));
    }
    if (sum > 35) {
        return I18n.Errors.substitute(I18n.Errors.tooMany, sum.toFixed(0));
    }

    // Second, check the sum of columns 1-4
    const sum1To4 = sumOfPeriods(values, c => (c.column && c.column >= 1 && c.column <= 4))
        + 4 + 3; // L1 and L2 aren't included in the count because they don't have a column field
    if (sum1To4 < 29) {
        return I18n.Errors.substitute(I18n.Errors.notEnoughCols1To4, sum1To4.toFixed(0));
    }

    // Check the number of optional subjects
    const countOptional = countChoices(values, c => c.column === 3);
    if (countOptional < 2) {
        return I18n.Errors.substitute(I18n.Errors.notEnoughCol3, countOptional.toFixed(0));
    }
    if (countOptional > 4) {
        return I18n.Errors.substitute(I18n.Errors.tooManyCol3, countOptional.toFixed(0));
    }

    return sum;
}
