import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as NamespaceTokens from "../tokens/namespace_tokens";
import * as ScopeTokens from "../tokens/scope_tokens";
import * as ClassEmitter from "./class_emitter";
import * as NamespaceImportEmitter from "./namespace_import_emitter";


export function emitMany(writer: IndentedStringWriter, namespaces: Hexarc.CSharpDom.Namespace[] | undefined) {
  if (namespaces == null || namespaces.length === 0) return;
  namespaces.forEach(ns => emitOne(writer, ns));
}

export function emitOne(writer: IndentedStringWriter, namespace: Hexarc.CSharpDom.Namespace) {
  const { path, imports, classes } = namespace;
  emitDefinition(writer, path);
  imports && NamespaceImportEmitter.emitMany(writer, imports);
  classes && ClassEmitter.emitMany(writer, classes);
  emitEnd(writer);
}

function emitDefinition( writer: IndentedStringWriter, path: string | string[]) {
  writer
    .writeLine(Keywords.namespace, Delimiters.space, ...NamespaceTokens.emit(path))
    .writeLine(ScopeTokens.open)
    .indent();
}

function emitEnd(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(ScopeTokens.close)
    .writeLine();
}