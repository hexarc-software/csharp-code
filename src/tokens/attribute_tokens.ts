import * as SquareBrackets from "./square_brackets";
import * as MethodArgumentTokens from "./method_argument_tokens";
import * as TypeReferenceTokens from "./type_reference_tokens";


export function emit(attribute: Hexarc.CSharpDom.Attribute) {
  const { type, arguments: _arguments } = attribute;
  return [
    SquareBrackets.open,
    ...TypeReferenceTokens.emit(type),
    ...MethodArgumentTokens.emit(_arguments),
    SquareBrackets.close
  ]
}