import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Delimiters from "../tokens/delimiters";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as GenericTokens from "../tokens/generic_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";


export function emit(writer: IndentedStringWriter, method: Hexarc.CSharpDom.MethodMember) {
  emitDefinition(writer, method);
  emitBody(writer, method);
  emitEnd(writer);
}

function emitDefinition(writer: IndentedStringWriter, method: Hexarc.CSharpDom.MethodMember) {
  const { access, modifier, result, name, generics, parameters } = method;
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forModifier(modifier))
      .write(...TypeReferenceTokens.emit(result))
      .write(Delimiters.space)
      .write(name)
      .write(...GenericTokens.emit(generics))
      .write(...MethodParameterTokens.emit(parameters))
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