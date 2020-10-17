import * as ArrayUtils from "../utils/array_utils";
import * as Delimiters from "./delimiters";
import * as Parentheses from "./parentheses";


export function emit(_arguments: Hexarc.CSharpDom.MethodArgument[] | undefined) {
  return Parentheses.enclose(precursors(_arguments));
}

function precursors(_arguments: Hexarc.CSharpDom.MethodArgument[] | undefined): readonly string[] {
  if (ArrayUtils.isFalsy(_arguments)) return ArrayUtils.empty();
  else return _arguments.flatMap((g, i, arr) => i === arr.length - 1 ? g : [...g, Delimiters.comma, Delimiters.space]);
}