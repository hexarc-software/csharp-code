declare namespace Hexarc.CSharpDom {

  interface GenericParameter {
    readonly kind: "parameter";
    readonly modifier?: "in" | "out";
    readonly name: string;
  }

  interface GenericArgument {
    readonly kind: "argument";
    readonly type: TypeReference;
  }

  type Generic = GenericParameter | GenericArgument;

}