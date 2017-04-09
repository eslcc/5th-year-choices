export function filterObject<T>(inObj: { [S: string]: T }, accepted: string[]): { [S: string]: T } {
    const result: { [S: string]: T } = {};
    for (const item in inObj)
        if (accepted.indexOf(item) > -1)
            result[item] = inObj[item];
    return result;
}