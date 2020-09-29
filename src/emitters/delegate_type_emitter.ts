import { IndentedStringWriter } from "../utils/indented_string_writer";

import * as Delimiters from "../tokens/delimiters";
import * as Keywords from "../tokens/keywords";
import * as TypeReferenceTokens from "../tokens/type_reference_tokens";
import * as GenericTokens from "../tokens/generic_tokens";
import * as MethodParameterTokens from "../tokens/method_parameter_tokens";

import * as AttributeEmitter from "./attribute_emitter";


export function emit(writer: IndentedStringWriter, delegate: Hexarc.CSharpDom.DelegateType) {
  const { attributes, access, result, name, generics, parameters } = delegate;
  const accessTokens = access ? [access, Delimiters.space] : [];
  const resultTokens = TypeReferenceTokens.emit(result);
  const genericTokens = GenericTokens.emit(generics);
  const methodParameterTokens = MethodParameterTokens.emit(parameters);
  AttributeEmitter.emitMany(writer, attributes);
  writer
    .outputTabs()
      .write(...accessTokens)
      .write(Keywords.delegate, Delimiters.space)
      .write(...resultTokens)
      .write(Delimiters.space)
      .write(name)
      .write(...genericTokens)
      .write(...methodParameterTokens)
      .write(Delimiters.semicolon)
    .writeLineNoTabs()
}