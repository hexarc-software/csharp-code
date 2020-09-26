import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as TypeEmitter from "./type_emitter";


export function emitMany(writer: IndentedStringWriter, structs: Hexarc.CSharpDom.Struct[] | undefined) {
  if (structs == null || structs.length === 0) return;
  structs.forEach((s, i, arr) => emitOne(writer, s, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.Struct, isLast?: boolean) {
  TypeEmitter.emitAttributes(writer, struct.attributes);
  emitDefinition(writer, struct);
  TypeEmitter.emitFields(writer, struct.fields);
  TypeEmitter.emitProperties(writer, struct.properties, struct.fields);
  TypeEmitter.emitMethods(writer, struct.methods, struct.properties)
  TypeEmitter.emitEnd(writer, isLast);
}

function emitDefinition(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.Struct) {
  const { access, isNew, isPartial, name, generics } = struct;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const newTokens = isNew ? [Keywords._new, Delimiters.space] : [];
  const partialTokens = isPartial ? [Keywords.partial, Delimiters.space] : [];
  const genericTokens = GenericTokens.emit(generics)
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...newTokens)
      .write(...partialTokens)
      .write(Keywords.struct, Delimiters.space, name)
      .write(...genericTokens)
    .writeLineNoTabs()
    .writeLine(ScopeTokens.open)
    .indent();
}