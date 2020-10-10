import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Delimiters from "../tokens/delimiters";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as GenericTokens from "../tokens/generic_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";


export function emit(writer: IndentedStringWriter, method: Hexarc.CSharpDom.MethodMember) {
  emitDefinition(writer, method);
  emitBody(writer, method);
  emitEnd(writer);
}

function emitDefinition(writer: IndentedStringWriter, method: Hexarc.CSharpDom.MethodMember) {
  const { access, modifier, result, name, generics, parameters } = method;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const modifierTokens = modifier ? [modifier, Delimiters.space] : [];
  const resultTokens = TypeReferenceTokens.emit(result);
  const genericTokens = GenericTokens.emit(generics);
  const methodParameterTokens = MethodParameterTokens.emit(parameters);
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...modifierTokens)
      .write(...resultTokens)
      .write(Delimiters.space)
      .write(name)
      .write(...genericTokens)
      .write(...methodParameterTokens)
    .writeLineNoTabs()
    .writeLine(ScopeTokens.open)
    .indent();
}

function emitBody(writer: IndentedStringWriter, method: Hexarc.CSharpDom.MethodMember) {
  const { body } = method;
  body.statements.forEach(s => writer.writeLine(s));
}

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
}