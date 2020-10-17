import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as CurlyBraces from "../tokens/curly_braces";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";


export function emit(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.ConstructorMember) {
  emitDefinition(writer, typeName, constructor);
  emitBody(writer, constructor);
  emitEnd(writer);
}

function emitDefinition(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.ConstructorMember) {
  const { access, isStatic, parameters } = constructor;
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forStatic(isStatic))
      .write(typeName)
      .write(...MethodParameterTokens.emit(parameters))
    .writeLineNoTabs()
    .writeLine(CurlyBraces.open)
    .indent();
}

function emitBody(writer: IndentedStringWriter, constructor: Hexarc.CSharpDom.ConstructorMember) {
  const { body } = constructor;
  body.statements.forEach(s => writer.writeLine(s));
}

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(CurlyBraces.close);
}