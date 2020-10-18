import * as ArrayUtils from "../utils/array_utils";


export const question = "?";

export function emit(nullable?: boolean): readonly string[] {
  if (nullable) return [question];
  else return ArrayUtils.empty();
}