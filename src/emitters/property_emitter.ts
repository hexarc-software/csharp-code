import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Signs from "../tokens/signs";
import * as Delimiters from "../tokens/delimiters";
import * as CurlyBraces from "../tokens/curly_braces";
import * as PropertyTokens from "../tokens/property_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";

import * as AttributeEmitter from "./attribute_emitter";


export function emit(writer: IndentedStringWriter, property: Hexarc.CSharpDom.PropertyMember) {
  const { access, type, name, value } = property;
  const valueTokens = value != null ? [Delimiters.space, Signs.equal, Delimiters.space, value, Delimiters.semicolon] : [];
  emitAttributes(writer, property);
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...TypeReferenceTokens.emit(type))
      .write(Delimiters.space)
      .write(name)
      .write(Delimiters.space)
      .write(...emitBody())
      .write(...valueTokens)
    .writeLineNoTabs();
}

function emitAttributes(writer: IndentedStringWriter, property: Hexarc.CSharpDom.PropertyMember) {
  const { attributes } = property;
  AttributeEmitter.emitMany(writer, attributes);
}

function emitBody() {
  return CurlyBraces.enclose(
    Delimiters.space, ...emitGetter(),
    Delimiters.space, ...emitSetter(), 
    Delimiters.space
  )
}

function emitGetter() {
  return [PropertyTokens.get, Delimiters.semicolon];
}

function emitSetter() {
  return [PropertyTokens.set, Delimiters.semicolon];
}