import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as MemberEmitter from "./member_emitter";
import * as ScopeEmitter from "./scope_emitter";


export function emit(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.ClassType) {
  AttributeEmitter.emitMany(writer, _class.attributes);
  emitDefinition(writer, _class);
  emitBody(writer, _class);
}

function emitDefinition(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.ClassType) {
  const { access, isNew, isPartial, modifier, name, generics, baseType } = _class;
  const baseTypeTokens = baseType ? TypeReferenceTokens.emit(baseType) : [];
  const extensionTokens = baseTypeTokens.length ? [Delimiters.space, Delimiters.colon, Delimiters.space, ...baseTypeTokens] : [];
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forNew(isNew))
      .write(...ModifierTokens.forModifier(modifier))
      .write(...ModifierTokens.forPartial(isPartial))
      .write(Keywords._class, Delimiters.space, name)
      .write(...GenericTokens.emit(generics))
      .write(...extensionTokens)
    .writeLineNoTabs();
}

function emitBody(writer: IndentedStringWriter, _class: Hexarc.CSharpDom.ClassType) {
  const { name, members } = _class;
  ScopeEmitter.emit(writer, writer => MemberEmitter.emitMany(writer, name, members));
}