import * as Delimiters from "./delimiters";


/**
 * Emits tokens for a given namespace path using the dot separator.
 * @param path The given namespace path to tokenize.
 * @param isEndDot Emits or not the dot token at the end.
 * @returns An array of tokens for the given namespace path.
 */
export function emit(path: string | string[] | undefined, isEndDot?: boolean): string[] {
  if (typeof path === "undefined") {
    return [];
  } else {
    const projector = pickProjector(isEndDot);
    return normalizePath(path).flatMap(projector);
  }
}

function normalizePath(path: string | string[]) {
  return typeof path === "string" ? [path] : path;
}

function pickProjector(isEndDot: boolean | undefined) {
  if (isEndDot) return (x: string) => [x, Delimiters.dot];
  else return (x: string, i: number, arr: string[]) => i === arr.length - 1 ? x : [x, Delimiters.dot];
}