import * as Delimiters from "./delimiters";
import * as RoundBrackets from "./round_brackets";


export function emit(_arguments: Hexarc.CSharpDom.MethodArgument[] | undefined) {
  return [RoundBrackets.open, ...precursors(_arguments), RoundBrackets.close];
}

function precursors(_arguments: Hexarc.CSharpDom.MethodArgument[] | undefined) {
  if (_arguments == null || _arguments.length === 0) return [];
  return _arguments
    .flatMap((g, i, arr) => 
      i === arr.length - 1 ? g : [...g, Delimiters.comma, Delimiters.space]);
}