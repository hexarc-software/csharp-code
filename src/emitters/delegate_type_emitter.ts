import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Delimiters from "../tokens/delimiters";
import * as Keywords from "../tokens/keywords";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as GenericTokens from "../tokens/generic_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";
import * as ModifierTokens from "../tokens/modifier_tokens";

import * as AttributeEmitter from "./attribute_emitter";


export function emit(writer: IndentedStringWriter, delegate: Hexarc.CSharpDom.DelegateType) {
  const { attributes, access, result, name, generics, parameters } = delegate;
  AttributeEmitter.emitMany(writer, attributes);
  writer
    .outputTabs()
      .write(...ModifierTokens.forAccess(access))
      .write(Keywords.delegate, Delimiters.space)
      .write(...TypeReferenceTokens.emit(result))
      .write(Delimiters.space)
      .write(name)
      .write(...GenericTokens.emit(generics))
      .write(...MethodParameterTokens.emit(parameters))
      .write(Delimiters.semicolon)
    .writeLineNoTabs();
}