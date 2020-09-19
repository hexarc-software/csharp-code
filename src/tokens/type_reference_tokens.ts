import * as NullableTokens from "./nullable_tokens";
import * as NamespaceTokens from "./namespace_tokens";
import * as GenericTokens from "./generic_tokens";


export function emit(reference: Hexarc.CSharpDom.TypeReference | "void"): string[] {
  if (reference === "void") return ["void"];

  const { namespace, name, nullable, generics } = reference;
  const namespaceTokens = NamespaceTokens.emit(namespace, true);
  const nullableTokens = NullableTokens.emit(nullable);
  const genericTokens = GenericTokens.emit(generics);
  return [...namespaceTokens, name, ...nullableTokens, ...genericTokens];
}