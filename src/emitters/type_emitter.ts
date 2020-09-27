import { IndentedStringWriter } from "../utils/indented_string_writer";
import * as ArrayUtils from "../utils/array_utils";

import * as ClassTypeEmitter from "./class_type_emitter";
import * as StructTypeEmitter from "./struct_type_emitter";
import * as EnumTypeEmitter from "./enum_type_emitter";
import * as InterfaceTypeEmitter from "./interface_type_emitter";
import * as DelegateTypeEmitter from "./delegate_type_emitter";


export function emitMany(writer: IndentedStringWriter, types: Hexarc.CSharpDom.Type[] | undefined) {
  if (ArrayUtils.isFalsy(types)) return;
  types.forEach((x, i, arr) => emitOne(writer, x, i === arr.length - 1));
}

export function emitOne(writer: IndentedStringWriter, type: Hexarc.CSharpDom.Type, isLast?: boolean) {
  switch (type.kind) {
    case "class":
      ClassTypeEmitter.emit(writer, type);
      break;
    case "struct":
      StructTypeEmitter.emit(writer, type);
      break;
    case "enum":
      EnumTypeEmitter.emit(writer, type);
      break;
    case "interface":
      InterfaceTypeEmitter.emit(writer, type);
      break;
    case "delegate":
      DelegateTypeEmitter.emit(writer, type);
      break;
    default:
      throw new Error(`Not supported type ${JSON.stringify(type, null, 4)}`)
  }
  if (!isLast) writer.writeLine();
}