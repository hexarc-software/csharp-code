import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Delimiters from "../tokens/delimiters";
import * as Keywords from "../tokens/keywords";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";


export function emit(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.ConstructorMember) {
  emitDefinition(writer, typeName, constructor);
  emitBody(writer, constructor);
  emitEnd(writer);
}

function emitDefinition(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.ConstructorMember) {
  const { access, isStatic, parameters } = constructor;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const staticTokens = isStatic ? [Keywords._static, Delimiters.space] : [];
  const methodParameterTokens = MethodParameterTokens.emit(parameters);
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...staticTokens)
      .write(typeName)
      .write(...methodParameterTokens)
    .writeLineNoTabs()
    .writeLine(ScopeTokens.open)
    .indent();
}

function emitBody(writer: IndentedStringWriter, constructor: Hexarc.CSharpDom.ConstructorMember) {
  const { body } = constructor;
  body.statements.forEach(s => writer.writeLine(s));
}

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
}