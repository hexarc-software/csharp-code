import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as Signs from "../tokens/signs";
import * as ModifierTokens from "../tokens/modifier_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as ScopeEmitter from "./scope_emitter";


export function emit(writer: IndentedStringWriter, _enum: Hexarc.CSharpDom.EnumType) {
  AttributeEmitter.emitMany(writer, _enum.attributes);
  emitDefinition(writer, _enum);
  emitBody(writer, _enum);
}

function emitDefinition(writer: IndentedStringWriter, _enum: Hexarc.CSharpDom.EnumType) {
  const { access, isNew, name } = _enum;
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forNew(isNew))
      .write(Keywords._enum, Delimiters.space, name)
    .writeLineNoTabs();
}

function emitBody(writer: IndentedStringWriter, _enum: Hexarc.CSharpDom.EnumType) {
  ScopeEmitter.emit(writer, writer => emitMembers(writer, _enum.members));
}

function emitMembers(writer: IndentedStringWriter, members: Hexarc.CSharpDom.EnumMember[] | undefined) {
  if (ArrayUtils.isFalsy(members)) return;
  members.forEach((m, i, arr) => emitMember(writer, m, i === arr.length - 1));
}

function emitMember(writer: IndentedStringWriter, member: Hexarc.CSharpDom.EnumMember, isLast?: boolean) {
  const { attributes, name, value } = member;
  const valueTokens = value ? [Delimiters.space, Signs.equal, Delimiters.space, value] : [];
  const endTokens = isLast ? [] : [Delimiters.comma];

  AttributeEmitter.emitMany(writer, attributes);
  writer
    .outputTabs()
      .write(name)
      .write(...valueTokens)
      .write(...endTokens)
    .writeLineNoTabs();
}