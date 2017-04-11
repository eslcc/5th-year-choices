import { clone } from 'lodash';

export interface I18nField {
    en: string;
    fr?: string;
    de?: string;
}

export interface I18nSubstitutableError extends I18nField {}

export class Choices {
    static readonly personName: I18nField = {
        en: 'Name'
    };
    static readonly class: I18nField = {
        en: 'Class'
    };
    static readonly classTeacher: I18nField = {
        en: 'Class Teacher'
    };
    static readonly l1: I18nField = {
        en: 'Language 1'
    };
    static readonly l2: I18nField = {
        en: 'Language 2'
    };
    static readonly l3: I18nField = {
        en: 'Language 3'
    };
    static readonly l4: I18nField = {
        en: 'Language 4'
    };
    static readonly onl: I18nField = {
        en: 'Other National Language (ONL)'
    };
    static readonly mat: I18nField = {
        en: 'Mathematics'
    };
    static readonly relY4: I18nField = {
        en: 'Religion/Ethics'
    };
    static readonly eco: I18nField = {
        en: 'Economics'
    };
    static readonly lat: I18nField = {
        en: 'Latin'
    };
    static readonly art: I18nField = {
        en: 'Art'
    };
    static readonly mus: I18nField = {
        en: 'Music'
    };
    static readonly relChange: I18nField = {
        en: 'Change of religion/ethics'
    };
    static readonly gym: I18nField = {
        en: 'Sport'
    };
    static readonly his: I18nField = {
        en: 'History'
    };
    static readonly geo: I18nField = {
        en: 'Geography'
    };
    static readonly philo: I18nField = {
        en: 'Philosophy'
    };
    static readonly bio: I18nField = {
        en: 'Biology'
    };
    static readonly chemo: I18nField = {
        en: 'Chemistry'
    };
    static readonly phy: I18nField = {
        en: 'Physics'
    };
    static readonly l1adv: I18nField = {
        en: 'Language 1 Advanced'
    };
    static readonly l2adv: I18nField = {
        en: 'Language 2 Advanced'
    };
    static readonly matadv: I18nField = {
        en: 'Mathematics Advanced'
    };
    static readonly ict: I18nField = {
        en: 'ICT'
    };
    static readonly introEco: I18nField = {
        en: 'Introduction to Economics'
    };
    static readonly soc: I18nField = {
        en: 'Sociology'
    };
    static readonly lux: I18nField = {
        en: 'Lëtzebuergesch'
    };
    static readonly scp: I18nField = {
        en: 'Politics'
    };
    static readonly sport: I18nField = {
        en: 'Sport'
    };
    static readonly labBio: I18nField = {
        en: 'Laboratory Biology'
    };
    static readonly labChi: I18nField = {
        en: 'Laboratory Chemistry'
    };
    static readonly labPhy: I18nField = {
        en: 'Laboratory Physics'
    };
}
export class Languages {
    readonly [k: string]: I18nField;
    static readonly bg: I18nField = {
        en: 'Bulgarian'
    };
    static readonly hr: I18nField = {
        en: 'Croatian'
    };
    static readonly cs: I18nField = {
        en: 'Czech'
    };
    static readonly da: I18nField = {
        en: 'Danish'
    };
    static readonly nl: I18nField = {
        en: 'Dutch'
    };
    static readonly en: I18nField = {
        en: 'English'
    };
    static readonly ee: I18nField = {
        en: 'Estonian'
    };
    static readonly fi: I18nField = {
        en: 'Finnish'
    };
    static readonly fr: I18nField = {
        en: 'French'
    };
    static readonly de: I18nField = {
        en: 'German'
    };
    static readonly gr: I18nField = {
        en: 'Greek'
    };
    static readonly hu: I18nField = {
        en: 'Hungarian'
    };
    static readonly ie: I18nField = {
        en: 'Irish'
    };
    static readonly it: I18nField = {
        en: 'Italian'
    };
    static readonly lv: I18nField = {
        en: 'Latvian'
    };
    static readonly lt: I18nField = {
        en: 'Lithuanian'
    };
    static readonly mt: I18nField = {
        en: 'Maltese'
    };
    static readonly pl: I18nField = {
        en: 'Polish'
    };
    static readonly po: I18nField = {
        en: 'Portuguese'
    };
    static readonly ro: I18nField = {
        en: 'Romanian'
    };
    static readonly sk: I18nField = {
        en: 'Slovak'
    };
    static readonly sl: I18nField = {
        en: 'Slovenian'
    };
    static readonly es: I18nField = {
        en: 'Spanish'
    };
    static readonly sv: I18nField = {
        en: 'Swedish'
    };
}
export class Maths {
    static readonly ma4: I18nField = {
        en: '4 period mathematics'
    };
    static readonly ma6: I18nField = {
        en: '6 period mathematics'
    };
    static readonly ma3: I18nField = {
        en: '3 period mathematics'
    };
    static readonly ma5: I18nField = {
        en: '5 period mathematics'
    };
}
export class Religions {
    static readonly rca: I18nField = {
        en: 'Catholic Religion'
    };
    static readonly rpr: I18nField = {
        en: 'Protestant Religion'
    };
    static readonly ror: I18nField = {
        en: 'Orthodox Religion'
    };
    static readonly rju: I18nField = {
        en: 'Jewish Religion'
    };
    static readonly mor: I18nField = {
        en: 'Ethics'
    };
}
export class None {
    static readonly None: I18nField = {
        en: 'None'
    };
}

export class Warnings {
    static readonly artMusNotY4: I18nField = {
        en: 'If Art or Music has not been followed in years 4 and 5 the pupil must provide satisfactory ' +
        'evidence that s(he) is able to follow it at this level.'
    };
    static readonly ma5AfterMa4: I18nField = {
        en: 'The 5 period mathematics course can be chosen by a pupil who has followed the 4 period' +
        ' course in years 4 and 5 only on the recommendation of the teacher of mathematics and on' +
        ' condition that the pupil has been successful in a required test in June and that a request' +
        ' has been handed in with the choice form in February'
    };
}

export class Errors {
    static readonly genericBlank: I18nField = {
        en: 'Cannot be blank.'
    };
    static readonly nameBlank: I18nField = {
        en: 'Your name cannot be blank.'
    };
    static readonly classNameBlank: I18nField = {
        en: 'Your class cannot be blank.'
    };
    static readonly classTeacherBlank: I18nField = {
        en: 'Your class teacher cannot be blank.'
    };
    static readonly notEnoughCols1To4: I18nSubstitutableError = {
        en: 'The total number of periods in columns 1-4 must add up to at least 29 (you have %s).'
    };
    static readonly notEnough: I18nSubstitutableError = {
        en: 'The total number of periods must be at least 31 (you have %s).'
    };
    static readonly tooMany: I18nSubstitutableError = {
        en: 'The total number of periods cannot be more than 35 (you have %s).'
    };
    static readonly hisGeoPhilo2p: I18nField = {
        en: '2 period History, Geography and Philosophy are compulsory if not chosen as a 4 period course.'
    };
    static readonly bio2p: I18nField = {
        en: '2 period Biology is compulsory unless Biology 4; Chemistry or Physics is chosen.'
    };
    static readonly generic2pNot4p: I18nField = {
        en: 'A 2 period subject cannot be chosen together with its 4 period counterpart.'
    };
    static readonly notEnoughCol3: I18nField = {
        en: 'At least 2 optional subjects must be chosen (you have %s).'
    };
    static readonly tooManyCol3: I18nField = {
        en: 'No more than 4 optional subjects may be chosen (you have %s).'
    };
    static readonly ecoAndLatin: I18nField = {
        en: 'Economics and Latin cannot both be chosen as they are timetabled simultaneously.'
    };
    static readonly l4AndOnl: I18nField = {
        en: 'Language 4 and ONL cannot both be chosen as they are timetabled simultaneously.'
    };
    static readonly ecoY6NotY4: I18nField = {
        en: 'Economics is only available if Economics was studied in Years 4-5.'
    };
    static readonly latY6NotY4: I18nField = {
        en: 'Latin is only available if Latin was studied in Years 4-5.'
    };
    static readonly onlY6NotY4: I18nField = {
        en: 'ONL is only available if ONL was studied in Years 4-5.'
    };
    static readonly l4Y6NotY4: I18nField = {
        en: 'Language 4 is only available if Language 4 was studied in Years 4-5.'
    };
    static readonly onlyOneAdvanced: I18nField = {
        en: 'Only one advanced subject may be chosen.'
    };
    static readonly matadvNotMa5: I18nField = {
        en: 'Advanced Mathematics can only be chosen if 5 Period Mathematics is also chosen.'
    };
    static readonly introEco: I18nField = {
        en: 'Introduction to Economics can only be chosen if Economics is not chosen' +
        ' and if Economics was not chosen in Year 4.'
    };
    static readonly labBio: I18nField = {
        en: 'Laboratory Biology can only be chosen if 4 period Biology is chosen.'
    };
    static readonly labChi: I18nField = {
        en: 'Laboratory Chemistry can only be chosen if Chemistry is chosen.'
    };
    static readonly labPhy: I18nField = {
        en: 'Laboratory Physics can only be chosen if Physics is chosen.'
    };
    static readonly labOnlyOne: I18nField = {
        en: 'Only one laboratory subject can be chosen.'
    };

    public static substitute(error: I18nSubstitutableError, ...subs: string[]): I18nField {
        const result = clone(error);
        for (const lang in result) {
            if (result.hasOwnProperty(lang)) {
                subs.forEach(sub => {
                    result[lang] = result[lang].replace(/%s/, sub);
                });
            }
        }
        return result;
    }
}