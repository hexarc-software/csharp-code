import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as FieldEmitter from "./field_emitter";
import * as PropertyEmitter from "./property_emitter";
import * as ConstructorEmitter from "./constructor_emitter";
import * as MethodEmitter from "./method_emitter";
import * as TypeEmitter from "./type_emitter";


export function emitMany(writer: IndentedStringWriter, typeName: string, members: Hexarc.CSharpDom.Member[] | undefined) {
  if (ArrayUtils.isFalsy(members)) return;
  members.forEach((x, i, arr) => emitOne(writer, typeName, x, ArrayUtils.isLastIndex(arr, i)));
}

export function emitOne(writer: IndentedStringWriter, typeName: string, member: Hexarc.CSharpDom.Member, isLast?: boolean) {
  switch (member.kind) {
    case "field":
      FieldEmitter.emit(writer, member);
      break;
    case "property":
      PropertyEmitter.emit(writer, member);
      break;
    case "constructor":
      ConstructorEmitter.emit(writer, typeName, member);
      break;
    case "method":
      MethodEmitter.emit(writer, member);
      break;
    case "type":
      TypeEmitter.emitOne(writer, member.type);
      break;
    default:
      throw new Error(`Not supported type ${JSON.stringify(member, null, 4)}`)
  }
  if (!isLast) writer.writeLine();
}