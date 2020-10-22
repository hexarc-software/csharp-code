import * as ArrayUtils from "../utils/array_utils";

import * as Keywords from "./keywords";
import * as Delimiters from "./delimiters";
import * as MethodArgumentTokens from "./method_argument_tokens";


export function emit(statement: Hexarc.CSharpDom.InvokeConstructor | undefined): readonly string[] {
  if (statement == null) return ArrayUtils.empty();
  switch (statement.kind) {
    case "this": return emitInvokeThisConstructor(statement);
    case "base": return emitInvokeBaseConstructor(statement);
    default: throw new Error(`Unknown invoke constructor statement ${statement}`);
  }
}

function emitInvokeThisConstructor(statement: Hexarc.CSharpDom.InvokeThisConstructor): readonly string[] {
  return [
    Delimiters.space, Delimiters.colon, Delimiters.space,
    Keywords._this, ...MethodArgumentTokens.emit(statement.arguments)
  ];
}

function emitInvokeBaseConstructor(statement: Hexarc.CSharpDom.InvokeBaseConstructor): readonly string[] {
  return [
    Delimiters.space, Delimiters.colon, Delimiters.space,
    Keywords.base, ...MethodArgumentTokens.emit(statement.arguments)
  ];
}