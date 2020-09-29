import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as NamespaceEmitter from "./namespace_emitter";
import * as NamespaceImportEmitter from "./namespace_import_emitter";


export function emit(writer: IndentedStringWriter, unit: Hexarc.CSharpDom.CodeUnit) {
  const { imports, namespaces } = unit;
  NamespaceImportEmitter.emitMany(writer, imports);
  NamespaceEmitter.emitMany(writer, namespaces);
}