import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as AttributeTokens from "../tokens/attribute_tokens";


export function emitMany(writer: IndentedStringWriter, attributes: Hexarc.CSharpDom.Attribute[] | undefined) {
  if (attributes == null || attributes.length === 0) return;
  attributes.forEach(a => emitOne(writer, a));
}

export function emitOne(writer: IndentedStringWriter, attribute: Hexarc.CSharpDom.Attribute) {
  writer.writeLine(...AttributeTokens.emit(attribute));
}