import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as Signs from "../tokens/signs";
import * as CurlyBraces from "../tokens/curly_braces";
import * as ModifierTokens from "../tokens/modifier_tokens";

import * as AttributeEmitter from "./attribute_emitter";


export function emit(writer: IndentedStringWriter, _enum: Hexarc.CSharpDom.EnumType) {
  AttributeEmitter.emitMany(writer, _enum.attributes);
  emitDefinition(writer, _enum);
  emitMembers(writer, _enum.members);
  emitEnd(writer);
}

function emitDefinition(writer: IndentedStringWriter, _enum: Hexarc.CSharpDom.EnumType) {
  const { access, isNew, name } = _enum;
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forNew(isNew))
      .write(Keywords._enum, Delimiters.space, name)
    .writeLineNoTabs()
    .writeLine(CurlyBraces.open)
    .indent();
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

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(CurlyBraces.close);
}