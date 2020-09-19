import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as NamespaceTokens from "../tokens/namespace_tokens";


export function emitMany(writer: IndentedStringWriter, imports: Hexarc.CSharpDom.NamespaceImport[] | undefined) {
  if (imports == null || imports.length === 0) return;

  imports.forEach(x => emitOne(writer, x));
  writer.writeLine();
}

export function emitOne(writer: IndentedStringWriter, _import: Hexarc.CSharpDom.NamespaceImport) {
  const { path } = _import;
  writer.writeLine(Keywords.using, Delimiters.space, ...NamespaceTokens.emit(path), Delimiters.semicolon);
}