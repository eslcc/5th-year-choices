import {pick} from 'lodash';
import * as I18n from './i18n';

// region Type definitions
import I18nField = I18n.I18nField;

export enum ChoiceFieldType {
    INPUT,
    SELECT,
    BOOLEAN
}

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
     * Whether to keep the input field enabled even if `error` returns truthy.
     * Useful for resolving circularities (see geo2p/geo4p for an example).
     */
    keepEnabledEvenIfErrored?: boolean;
    /**
     * A callback that is called with all the current choices to determine whether the user should be warned.
     * Warnings are normally used for choices that are technically valid but dubious
     * (for example, choosing ma4 in 4th/5th but ma5 in 6th/7th)
     * @param choices the current choices by the user
     * @returns falsey if the choice is valid, or a warning to display
     */
    warning?: (choices: ChoiceValues) => I18nField | Falsey;
}

export type Choices = {[P in keyof ChoiceValues]: Choice};
// endregion

// Remove this when typescript/typescript#6480 is closed
// tslint:disable-next-line
function gimpTypeSafetyBeVeryCarefulWithThis(thing: any): ValueList {
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
        default: ''
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
    },
    l2: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l2,
        options: pick(
            I18n.Languages,
            ['en', 'fr', 'de']
        ) as ValueList,
    },
    l3: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l3,
        options: gimpTypeSafetyBeVeryCarefulWithThis(I18n.Languages)
    },
    l4: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l4,
        options: gimpTypeSafetyBeVeryCarefulWithThis({null: I18n.None.None, ...I18n.Languages})
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
        options: gimpTypeSafetyBeVeryCarefulWithThis(I18n.Religions),
        error: values => values.relY4 === null && I18n.Errors.genericBlank,
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
    relY6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.relChange,
        options: gimpTypeSafetyBeVeryCarefulWithThis({null: I18n.None.None, ...I18n.Religions}),
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
        error: values => values.his4p && I18n.Errors.hisGeoPhilo2p,
        keepEnabledEvenIfErrored: true,
        default: true
    },
    geo2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.geo,
        column: 2,
        periods: 2,
        error: values => values.geo4p && I18n.Errors.hisGeoPhilo2p,
        keepEnabledEvenIfErrored: true,
        default: true
    },
    philo2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.philo,
        column: 2,
        periods: 2,
        error: values => values.philo4p && I18n.Errors.hisGeoPhilo2p,
        keepEnabledEvenIfErrored: true,
        default: true
    },
    bio2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.bio,
        column: 2,
        periods: 2,
        error: values => I18n.Errors.bio2p,
        keepEnabledEvenIfErrored: true,
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
        error: values => values.bio2p && I18n.Errors.bio2p,
    },
    art4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.art,
        column: 3,
        periods: 4,
        error: values => values.art2p && I18n.Errors.artMus2p,
        warning: values => !values.artY4 && I18n.Warnings.artMusNotY4,
    },
    mus4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.mus,
        column: 3,
        periods: 4,
        error: values => values.mus2p && I18n.Errors.artMus2p,
    },
    his4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.his,
        column: 3,
        periods: 4,
        error: values => values.his2p && I18n.Errors.hisGeoPhilo2p,
    },
    geo4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.geo,
        column: 3,
        periods: 4,
        error: values => values.geo2p && I18n.Errors.hisGeoPhilo2p,
    },
    philo4p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.philo,
        column: 3,
        periods: 4,
        error: values => values.philo2p && I18n.Errors.hisGeoPhilo2p,
    },
    l3Y6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l3,
        options: gimpTypeSafetyBeVeryCarefulWithThis({null: I18n.None.None, ...I18n.Languages}),
        column: 3,
        periods: {null: 0, default: 4},
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
        error: values => values.ecoY6 && I18n.Errors.ecoAndLatin,
    },
    l4Y6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.l4,
        options: gimpTypeSafetyBeVeryCarefulWithThis({null: I18n.None.None, ...I18n.Languages}),
        column: 3,
        periods: {null: 0, default: 4},
        error: values => values.onlY6 ? I18n.Errors.l4AndOnl : null,
    },
    onlY6: {
        type: ChoiceFieldType.SELECT,
        displayName: I18n.Choices.onl,
        options: gimpTypeSafetyBeVeryCarefulWithThis({
            null: I18n.None.None,
            ...pick(
                I18n.Languages,
                ['ie', 'mt', 'sv', 'fi']
            )
        }),
        periods: {null: 0, default: 4},
        error: values => values.l4Y6 ? I18n.Errors.l4AndOnl : null,
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
        error: values => values.art4p && I18n.Errors.artMus2p,
    },
    mus2p: {
        type: ChoiceFieldType.BOOLEAN,
        displayName: I18n.Choices.mus,
        column: 5,
        periods: 2,
        error: values => values.mus4p && I18n.Errors.artMus2p,
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
