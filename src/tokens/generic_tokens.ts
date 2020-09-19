import * as Delimiters from "./delimiters";
import * as TypeReferenceTokens from "./type_reference_tokens";


export const open = "<";
export const close = ">";

export function emit(generics: Hexarc.CSharpDom.Generic[] | undefined) {
  if (generics == null || generics.length === 0) return [];
  return [open, ...precursors(generics), close];
}

function precursors(generics: Hexarc.CSharpDom.Generic[]) {
  return generics
    .map(g => precursor(g))
    .flatMap((g, i, arr) => 
      i === arr.length - 1 ? g : [...g, Delimiters.comma, Delimiters.space]);
}

function precursor(generic: Hexarc.CSharpDom.Generic) {
  switch (generic.kind) {
    case "argument": return precursorArgument(generic);
    case "parameter": return precursorParameter(generic);
    default: throw new Error(`Invalid generic`);
  }
}

function precursorParameter(genericParameter: Hexarc.CSharpDom.GenericParameter): string[] {
  const { modifier, name } = genericParameter;
  const modifierTokens = modifier ? [modifier, Delimiters.space] : [];
  return [...modifierTokens, name];
}

function precursorArgument(genericArgument: Hexarc.CSharpDom.GenericArgument): string[] {
  const { type } = genericArgument;
  return [...TypeReferenceTokens.emit(type)];
}