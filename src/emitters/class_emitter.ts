import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as AttributeEmitter from "./attribute_emitter";
import * as FieldEmitter from "./field_emitter";
import * as PropertyEmitter from "./property_emitter";
import * as MethodEmitter from "./method_emitter";


export function emitMany(writer: IndentedStringWriter, classes: Hexarc.CSharpDom.Class[] | undefined) {
  if (classes == null || classes.length === 0) return;
  classes.forEach((c, i, arr) => emitOne(writer, c, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class, isLast?: boolean) {
  emitAttributes(writer, _class);
  emitDefinition(writer, _class);
  emitFields(writer, _class);
  emitProperties(writer, _class);
  emitMethods(writer, _class);
  emitEnd(writer, isLast);
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

function emitAttributes(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class) {
  const { attributes } = _class;
  AttributeEmitter.emitMany(writer, attributes);
}

function emitFields(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class) {
  const { fields } = _class;
  FieldEmitter.emitMany(writer, fields, true);
}

function emitProperties(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class) {
  const { properties, fields } = _class;
  PropertyEmitter.emitMany(writer, properties, (fields == null || fields.length === 1));
}

function emitMethods(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.Class) {
  const { methods, properties } = _class;
  MethodEmitter.emitMany(writer, methods, (properties == null || properties.length === 1));
}

function emitEnd(writer: IndentedStringWriter, isLast?: boolean) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
  if (!isLast) writer.writeLine();
}