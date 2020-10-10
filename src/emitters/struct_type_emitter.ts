import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as GenericTokens from "../tokens/generic_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";

import * as AttributeEmitter from "./attribute_emitter";
import * as MemberEmitter from "./member_emitter";


export function emit(writer: IndentedStringWriter, struct: Hexarc.CSharpDom.StructType) {
  AttributeEmitter.emitMany(writer, struct.attributes);
  emitDefinition(writer, struct);
  MemberEmitter.emitMany(writer, struct.name, struct.members);
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
