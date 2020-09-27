import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Delimiters from "../tokens/delimiters";
import * as Keywords from "../tokens/keywords";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";


export function emitMany(writer: IndentedStringWriter, typeName: string, constructors: Hexarc.CSharpDom.Constructor[] | undefined, isFirst?: boolean) {
  if (constructors == null || constructors.length === 0) return;
  if (!isFirst) writer.writeLine();
  constructors.forEach((c, i, arr) => emitOne(writer, typeName, c, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.Constructor, isLast?: boolean) {
  emitDefinition(writer, typeName, constructor);
  emitBody(writer, constructor);
  emitEnd(writer, isLast);
}

function emitDefinition(writer: IndentedStringWriter, typeName: string, constructor: Hexarc.CSharpDom.Constructor, ) {
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

function emitBody(writer: IndentedStringWriter, constructor: Hexarc.CSharpDom.Constructor) {
  const { body } = constructor;
  body.statements.forEach(s => writer.writeLine(s));
}

function emitEnd(writer: IndentedStringWriter, isLast?: boolean) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
  if (!isLast) writer.writeLine();
}