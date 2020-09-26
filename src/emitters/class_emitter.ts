import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as TypeEmitter from "./type_emitter";


export function emitMany(writer: IndentedStringWriter, classes: Hexarc.CSharpDom.Class[] | undefined, isFirst?: boolean) {
  if (classes == null || classes.length === 0) return;
  if (!isFirst) writer.writeLine();
  classes.forEach((c, i, arr) => emitOne(writer, c, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class, isLast?: boolean) {
  TypeEmitter.emitAttributes(writer, _class.attributes);
  emitDefinition(writer, _class);
  TypeEmitter.emitFields(writer, _class.fields);
  TypeEmitter.emitProperties(writer, _class.properties, _class.fields);
  TypeEmitter.emitMethods(writer, _class.methods, _class.properties)
  TypeEmitter.emitEnd(writer, isLast);
}

function emitDefinition(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class) {
  const { access, isNew, isPartial, modifier, name, generics, baseClass } = _class;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const newTokens = isNew ? [Keywords._new, Delimiters.space] : [];
  const modifierTokens = modifier ? [modifier, Delimiters.space] : [];
  const partialTokens = isPartial ? [Keywords.partial, Delimiters.space] : [];
  const genericTokens = GenericTokens.emit(generics)
  const baseClassTokens = baseClass ? TypeReferenceTokens.emit(baseClass) : [];
  const extensionTokens = baseClassTokens.length ? [Delimiters.space, Delimiters.colon, Delimiters.space, ...baseClassTokens] : [];
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...newTokens)
      .write(...modifierTokens)
      .write(...partialTokens)
      .write(Keywords._class, Delimiters.space, name)
      .write(...genericTokens)
      .write(...extensionTokens)
    .writeLineNoTabs()
    .writeLine(ScopeTokens.open)
    .indent();
}