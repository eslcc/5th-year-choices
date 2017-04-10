export function filterObject<T>(inObj: { [S: string]: T }, accepted: string[]): { [S: string]: T } {
    const result: { [S: string]: T } = {};
    for (const item in inObj) {
        if (accepted.indexOf(item) > -1) {
            result[item] = inObj[item];
        }
    }
    return result;
}

export function objectToNestedArray<T>(input: T): Array<[keyof T, T[keyof T]]> {
    const result: Array<[keyof T, T[keyof T]]> = [];
    for (let key in input) {
        if (input.hasOwnProperty(key)) {
            result.push([key, input[key]]);
        }
    }
    return result;
}
