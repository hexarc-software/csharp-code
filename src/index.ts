/// <reference path="../types/index.d.ts" />
export * as Utils from "./utils/indented_string_writer";
export * as Emitters from "./emitters";
export * as Tokens from "./tokens";

import * as CodeUnitEmitter from "./emitters/code_unit_emitter";
import { IndentedStringWriter } from "./utils/indented_string_writer";


/**
 * Emits a C# source text for a given language code unit object.
 * @param codeUnit The given C# code unit object to generate a source text. 
 * @returns A C# source text for the given language code unit object.
 */
export function emit(codeUnit: Hexarc.CSharpDom.CodeUnit): string {
  const writer = new IndentedStringWriter(4);
  CodeUnitEmitter.emit(writer, codeUnit);
  return writer.toString();
}