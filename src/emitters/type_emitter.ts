import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as AttributeEmitter from "./attribute_emitter";
import * as FieldEmitter from "./field_emitter";
import * as PropertyEmitter from "./property_emitter";
import * as MethodEmitter from "./method_emitter";


export function emitAttributes(writer: IndentedStringWriter, attributes: Hexarc.CSharpDom.Attribute[] | undefined) {
  AttributeEmitter.emitMany(writer, attributes);
}

export function emitFields(writer: IndentedStringWriter, fields: Hexarc.CSharpDom.Field[] | undefined) {
  FieldEmitter.emitMany(writer, fields, true);
}

export function emitProperties(writer: IndentedStringWriter, properties: Hexarc.CSharpDom.Property[] | undefined, fields: Hexarc.CSharpDom.Field[] | undefined) {
  PropertyEmitter.emitMany(writer, properties, (fields == null || fields.length === 0));
}

export function emitMethods(writer: IndentedStringWriter, methods: Hexarc.CSharpDom.Method[] | undefined, properties: Hexarc.CSharpDom.Property[] | undefined) {
  MethodEmitter.emitMany(writer, methods, (properties == null || properties.length === 0));
}

export function emitEnd(writer: IndentedStringWriter, isLast?: boolean) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
  if (!isLast) writer.writeLine();
}