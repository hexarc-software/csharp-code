import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Delimiters from "../tokens/delimiters";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as PropertyTokens from "../tokens/property_tokens";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as AttributeEmitter from "./attribute_emitter";


export function emitMany(writer: IndentedStringWriter, fields: Hexarc.CSharpDom.Field[] | undefined, isFirst?: boolean) {
  if (fields == null || fields.length === 0) return;
  if (!isFirst) writer.writeLine();
  fields.forEach((f, i, arr) => emitOne(writer, f, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, field: Hexarc.CSharpDom.Field, isLast?: boolean) {
  const { access, type, name } = field;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const resultTokens = TypeReferenceTokens.emit(type);
  emitAttributes(writer, field);
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(...resultTokens)
      .write(Delimiters.space)
      .write(name)
      .write(Delimiters.semicolon)
    .writeLineNoTabs();
  if (!isLast) writer.writeLine();
}

function emitAttributes(writer: IndentedStringWriter, field: Hexarc.CSharpDom.Field) {
  const { attributes } = field;
  AttributeEmitter.emitMany(writer, attributes);
}