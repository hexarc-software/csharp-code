declare namespace Hexarc.CSharpDom {

  interface Field {
    readonly attributes?: Attribute[];
    readonly access?: Access;
    readonly isNew?: boolean;
    readonly isStatic?: boolean;
    readonly assignment?: "readonly" | "const";
    readonly type: TypeReference;
    readonly name: string;
    readonly value?: string;
  }

}