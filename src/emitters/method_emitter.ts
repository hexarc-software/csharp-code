import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Delimiters from "../tokens/delimiters";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as GenericTokens from "../tokens/generic_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";


export function emitMany(writer: IndentedStringWriter, methods: Hexarc.CSharpDom.Method[] | undefined, isFirst?: boolean) {
  if (ArrayUtils.isFalsy(methods)) return;
  if (!isFirst) writer.writeLine();
  methods.forEach((m, i, arr) => emitOne(writer, m, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, method: Hexarc.CSharpDom.Method, isLast?: boolean) {
  emitDefinition(writer, method);
  emitBody(writer, method);
  emitEnd(writer, isLast);
}

function emitDefinition(writer: IndentedStringWriter, method: Hexarc.CSharpDom.Method, ) {
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

function emitBody(writer: IndentedStringWriter, method: Hexarc.CSharpDom.Method) {
  const { body } = method;
  body.statements.forEach(s => writer.writeLine(s));
}

function emitEnd(writer: IndentedStringWriter, isLast?: boolean) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
  if (!isLast) writer.writeLine();
}