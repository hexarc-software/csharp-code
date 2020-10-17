import * as ArrayUtils from "../utils/array_utils";


export const open = "(";
export const close = ")";

export function enclose(tokens: string | readonly string[] | undefined, omitEmpty?: boolean): readonly string[] {
  const normalizedTokens = normalizeTokens(tokens);
  if (normalizeTokens.length === 0 && omitEmpty) return ArrayUtils.empty();
  else return [open, ...normalizedTokens, close];
}

function normalizeTokens(tokens: string | readonly string[] | undefined): readonly string[] {
  if (typeof tokens === "undefined") return ArrayUtils.empty();
  else if (typeof tokens === "string") return [tokens];
  else return tokens;
}