declare namespace Hexarc.CSharpDom {

  interface Struct {
    readonly attributes?: Attribute[];
    readonly access?: Access;
    readonly isNew?: boolean;
    readonly isPartial?: boolean;
    readonly name: string;
    readonly generics?: Generic[];
    readonly fields?: Field[];
    readonly properties?: Property[];
    readonly methods?: Method[];
  }

}