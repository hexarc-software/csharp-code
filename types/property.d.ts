declare namespace Hexarc.CSharpDom {

  interface Property {
    readonly attributes?: Attribute[];
    readonly access?: "private" | "public" | "internal";
    readonly type: TypeReference;
    readonly name: string;
  }

}