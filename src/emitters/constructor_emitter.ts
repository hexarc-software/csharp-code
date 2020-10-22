import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as MethodParameterTokens from "../tokens/method_parameter_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";
import * as InvokeConstructorTokens from "../tokens/invoke_constructor_tokens";

import * as ScopeEmitter from "./scope_emitter";


export function emit(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.ConstructorMember) {
  emitDefinition(writer, typeName, constructor);
  emitBody(writer, constructor);
}

function emitDefinition(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.ConstructorMember) {
  const { access, isStatic, parameters, invokeConstructor } = constructor;
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forStatic(isStatic))
      .write(typeName)
      .write(...MethodParameterTokens.emit(parameters))
      .write(...InvokeConstructorTokens.emit(invokeConstructor))
    .writeLineNoTabs();
}

function emitBody(writer: IndentedStringWriter, constructor: Hexarc.CSharpDom.ConstructorMember) {
  const { body } = constructor;
  ScopeEmitter.emit(writer, writer => body.statements.forEach(s => writer.writeLine(s)));
}