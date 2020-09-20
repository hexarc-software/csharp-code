import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as Signs from "../tokens/signs";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as AttributeEmitter from "./attribute_emitter";


export function emitMany(writer: IndentedStringWriter, fields: Hexarc.CSharpDom.Field[] | undefined, isFirst?: boolean) {
  if (fields == null || fields.length === 0) return;
  if (!isFirst) writer.writeLine();
  fields.forEach((f, i, arr) => emitOne(writer, f, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, field: Hexarc.CSharpDom.Field, isLast?: boolean) {
  const { access, isNew, isStatic, assignment, type, name, value } = field;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const newTokens = isNew ? [Keywords._new, Delimiters.space] : [];
  const staticTokens = isStatic ? [Keywords._static, Delimiters.space] : [];
  const assignmentTokens = assignment ? [assignment, Delimiters.space] : [];
  const resultTokens = [...TypeReferenceTokens.emit(type), Delimiters.space];
  const valueTokens = value != null ? [Delimiters.space, Signs.equal, Delimiters.space, value] : [];
  emitAttributes(writer, field);
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...newTokens)
      .write(...staticTokens)
      .write(...assignmentTokens)
      .write(...resultTokens)
      .write(name)
      .write(...valueTokens)
      .write(Delimiters.semicolon)
    .writeLineNoTabs();
  if (!isLast) writer.writeLine();
}

function emitAttributes(writer: IndentedStringWriter, field: Hexarc.CSharpDom.Field) {
  const { attributes } = field;
  AttributeEmitter.emitMany(writer, attributes);
}