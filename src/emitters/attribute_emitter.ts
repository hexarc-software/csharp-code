import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";
import * as AttributeTokens from "../tokens/attribute_tokens";


export function emitMany(writer: IndentedStringWriter, attributes: Hexarc.CSharpDom.Attribute[] | undefined) {
  if (ArrayUtils.isFalsy(attributes)) return;
  attributes.forEach(a => emitOne(writer, a));
}

export function emitOne(writer: IndentedStringWriter, attribute: Hexarc.CSharpDom.Attribute) {
  writer.writeLine(...AttributeTokens.emit(attribute));
}