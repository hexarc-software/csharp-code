declare namespace Hexarc.CSharpDom {

  interface TypeReference {
    readonly namespace?: string | string[];
    readonly name: string;
    readonly nullable?: boolean;
    readonly generics?: Generic[];
  }

  // interface ClassTypeReference {
  //   readonly namespace: string | string[];
  //   readonly name: string;
  //   readonly nullable?: boolean;
  // }

  // interface StructTypeReference {
  //   readonly namespace: string | string[];
  //   readonly name: string;
  //   readonly nullable?: boolean;
  // }

  // interface GenericTypeReference {
  //   name: string;
  // }

}