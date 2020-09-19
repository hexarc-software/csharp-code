import * as Delimiters from "./delimiters";
import * as TypeReferenceTokens from "./type_reference_tokens";
import * as RoundBrackets from "./round_brackets";


export function emit(parameters: Hexarc.CSharpDom.MethodParameter[] | undefined) {
  const parameterTokens = parameters == null || parameters.length === 0 ? [] : precursors(parameters);
  return [RoundBrackets.open, ...parameterTokens, RoundBrackets.close];
}

function precursors(parameters: Hexarc.CSharpDom.MethodParameter[]) {
  return parameters
    .map(p => precursor(p))
    .flatMap((g, i, arr) => 
      i === arr.length - 1 ? g : [...g, Delimiters.comma, Delimiters.space]);
}

function precursor(parameter: Hexarc.CSharpDom.MethodParameter) {
  const { type, name } = parameter;
  return [...TypeReferenceTokens.emit(type), Delimiters.space, name];
}