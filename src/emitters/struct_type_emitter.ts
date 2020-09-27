import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as FieldEmitter from "./field_emitter";
import * as PropertyEmitter from "./property_emitter";
import * as ConstructorEmitter from "./constructor_emitter";
import * as MethodEmitter from "./method_emitter";


export function emit(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.StructType) {
  const noFields = struct.fields == null || struct.fields.length === 0;
  const noProperties = struct.properties == null || struct.properties.length === 0;
  const noConstructors = struct.constructors == null || struct.constructors.length === 0;

  AttributeEmitter.emitMany(writer, struct.attributes);
  emitDefinition(writer, struct);
  FieldEmitter.emitMany(writer, struct.fields, true);
  PropertyEmitter.emitMany(writer, struct.properties, noFields);
  ConstructorEmitter.emitMany(writer, struct.name, struct.constructors, noFields && noProperties);
  MethodEmitter.emitMany(writer, struct.methods, noFields && noProperties && noConstructors);
  emitEnd(writer);
}


function emitDefinition(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.StructType) {
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


function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close);
}
