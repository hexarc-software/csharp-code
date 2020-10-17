import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as CurlyBraces from "../tokens/curly_braces";


export function emit(writer: IndentedStringWriter, bodyEmitter: (writer: IndentedStringWriter) => void) {
  emitOpen(writer);
  bodyEmitter(writer);
  emitClose(writer);
}

function emitOpen(writer: IndentedStringWriter) {
  writer
    .writeLine(CurlyBraces.open)
    .indent();
}

function emitClose(writer: IndentedStringWriter) {
  writer
    .unindent()
    .writeLine(CurlyBraces.close);
}