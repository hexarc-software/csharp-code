import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as FieldEmitter from "./field_emitter";
import * as PropertyEmitter from "./property_emitter";
import * as ConstructorEmitter from "./constructor_emitter";
import * as MethodEmitter from "./method_emitter";


export function emit(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.ClassType) {
  const noFields = _class.fields == null || _class.fields.length === 0;
  const noProperties = _class.properties == null || _class.properties.length === 0;
  const noConstructors = _class.constructors == null || _class.constructors.length === 0;

  AttributeEmitter.emitMany(writer, _class.attributes);
  emitDefinition(writer, _class);
  FieldEmitter.emitMany(writer, _class.fields, true);
  PropertyEmitter.emitMany(writer, _class.properties, noFields);
  ConstructorEmitter.emitMany(writer, _class.name, _class.constructors, noFields && noProperties);
  MethodEmitter.emitMany(writer, _class.methods, noFields && noProperties && noConstructors);
  emitEnd(writer);
}

function emitDefinition(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.ClassType) {
  const { access, isNew, isPartial, modifier, name, generics, baseType } = _class;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const newTokens = isNew ? [Keywords._new, Delimiters.space] : [];
  const modifierTokens = modifier ? [modifier, Delimiters.space] : [];
  const partialTokens = isPartial ? [Keywords.partial, Delimiters.space] : [];
  const genericTokens = GenericTokens.emit(generics)
  const baseTypeTokens = baseType ? TypeReferenceTokens.emit(baseType) : [];
  const extensionTokens = baseTypeTokens.length ? [Delimiters.space, Delimiters.colon, Delimiters.space, ...baseTypeTokens] : [];
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

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
}

