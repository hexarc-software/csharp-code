import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "../tokens/keywords";
import * as Delimiters from "../tokens/delimiters";
import * as NamespaceTokens from "../tokens/namespace_tokens";

import * as NamespaceImportEmitter from "./namespace_import_emitter";
import * as ScopeEmitter from "./scope_emitter";
import * as TypeEmitter from "./type_emitter";


export function emitMany(writer: IndentedStringWriter, namespaces: Hexarc.CSharpDom.Namespace[] | undefined) {
  if (ArrayUtils.isFalsy(namespaces)) return;
  namespaces.forEach((ns, i, arr) => emitOne(writer, ns, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, namespace: Hexarc.CSharpDom.Namespace, isLast?: boolean) {
  emitDefinition(writer, namespace.path);
  emitBody(writer, namespace, isLast);
}

function emitDefinition(writer: IndentedStringWriter, path: string | string[]) {
  writer
    .outputTabs()
      .write(Keywords.namespace)
      .write(Delimiters.space)
      .write(...NamespaceTokens.emit(path))
    .writeLineNoTabs();
}

function emitBody(writer: IndentedStringWriter, namespace: Hexarc.CSharpDom.Namespace, isLast?: boolean) {
  ScopeEmitter.emit(writer, writer => {
    NamespaceImportEmitter.emitMany(writer, namespace.imports);
    TypeEmitter.emitMany(writer, namespace.types);
    if (!isLast) writer.writeLine();
  });
}