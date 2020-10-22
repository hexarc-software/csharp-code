import * as ArrayUtils from "../utils/array_utils";
import * as Delimiters from "./delimiters";
import * as Parentheses from "./parentheses";

/**
 * Emits tokens for an array of method arguments including parenthesis.
 * @param _arguments An array of arguments to emit into tokens.
 */
export function emit(_arguments: Hexarc.CSharpDom.MethodArgument[] | undefined) {
  return Parentheses.enclose(...precursors(_arguments));
}

function precursors(_arguments: Hexarc.CSharpDom.MethodArgument[] | undefined): readonly string[] {
  if (ArrayUtils.isFalsy(_arguments)) return ArrayUtils.empty();
  else return Delimiters.commaSeparated(..._arguments.map(x => [x]));
}