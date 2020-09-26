declare namespace Hexarc.CSharpDom {

  interface TypeReference {
    readonly namespace?: string | string[];
    readonly name: string;
    readonly nullable?: boolean;
    readonly generics?: Generic[];
  }

}