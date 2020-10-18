import * as ArrayUtils from "../utils/array_utils";


export const dot = ".";
export const comma = ",";
export const space = " ";
export const semicolon = ";";
export const colon = ":";

export function commaSeparated(...tokenGroups: readonly string[][]): readonly string[] {
  return tokenGroups.flatMap((g, i, arr) => 
    ArrayUtils.isLastIndex(arr, i) ? g : [...g, comma, space]);
}