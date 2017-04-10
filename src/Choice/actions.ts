import {ChoiceValueType} from "../constants/choices";
export type Action = {
    type: 'choices.CHOICE_CHANGE',
    key: string,
    newValue: ChoiceValueType,
};

export const choiceChange = (key: string, newValue: ChoiceValueType): Action => ({
    type: 'choices.CHOICE_CHANGE',
    key,
    newValue,
});
