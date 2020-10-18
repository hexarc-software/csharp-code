import * as ArrayUtils from "../utils/array_utils";
import * as Delimiters from "./delimiters";
import * as TypeReferenceTokens from "./type_reference_tokens";


export function emit(typeReferences: Hexarc.CSharpDom.TypeReference[] | undefined): readonly string[] {
  if (ArrayUtils.isFalsy(typeReferences)) return ArrayUtils.empty<string>();
  else return [
    Delimiters.space, Delimiters.colon, Delimiters.space, 
    ...Delimiters.commaSeparated(...typeReferences.map(x => TypeReferenceTokens.emit(x)))
  ];
}