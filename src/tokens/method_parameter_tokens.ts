import * as ArrayUtils from "../utils/array_utils";
import * as Delimiters from "./delimiters";
import * as TypeReferenceTokens from "./type_reference_tokens";
import * as Parentheses from "./parentheses";


export function emit(parameters: Hexarc.CSharpDom.MethodParameter[] | undefined) {
  const parameterTokens = ArrayUtils.isFalsy(parameters) ? ArrayUtils.empty<string>() : precursors(parameters);
  return Parentheses.enclose(...parameterTokens);
}

function precursors(parameters: Hexarc.CSharpDom.MethodParameter[]): readonly string[] {
  return Delimiters.commaSeparated(...parameters.map(p => precursor(p)));
}

function precursor(parameter: Hexarc.CSharpDom.MethodParameter) {
  const { type, name } = parameter;
  return [...TypeReferenceTokens.emit(type), Delimiters.space, name];
}