declare namespace Hexarc.CSharpDom {

  interface Field {
    readonly attributes?: Attribute[];
    readonly access?: "private" | "public" | "internal";
    readonly type: TypeReference;
    readonly name: string;
  }

}