import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as MemberEmitter from "./member_emitter";


export function emit(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.ClassType) {
  AttributeEmitter.emitMany(writer, _class.attributes);
  emitDefinition(writer, _class);
  MemberEmitter.emitMany(writer, _class.name, _class.members);
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