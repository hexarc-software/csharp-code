declare namespace Hexarc.CSharpDom {

  interface Class {
    readonly attributes?: Attribute[];
    readonly access?: Access;
    readonly isNew?: boolean;
    readonly isPartial?: boolean;
    readonly modifier?: Modifier;
    readonly name: string;
    readonly generics?: Generic[];
    readonly fields?: Field[];
    readonly properties?: Property[];
    readonly methods?: Method[];
    readonly baseClass?: TypeReference;
  }

}