import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as ScopeEmitter from "./scope_emitter";
import * as MemberEmitter from "./member_emitter";


export function emit(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.StructType) {
  AttributeEmitter.emitMany(writer, struct.attributes);
  emitDefinition(writer, struct);
  emitBody(writer, struct);
}

function emitDefinition(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.StructType) {
  const { access, isNew, isPartial, name, generics } = struct;
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(...ModifierTokens.forNew(isNew))
      .write(...ModifierTokens.forPartial(isPartial))
      .write(Keywords.struct, Delimiters.space, name)
      .write(...GenericTokens.emit(generics))
    .writeLineNoTabs();
}

function emitBody(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.StructType) {
  ScopeEmitter.emit(writer, writer => MemberEmitter.emitMany(writer, struct.name, struct.members));
}