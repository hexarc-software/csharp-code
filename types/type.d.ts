declare namespace Hexarc.CSharpDom {

  interface GeneralType {
    readonly attributes?: Attribute[];
    readonly isNew?: boolean;
    readonly access?: Access;
    readonly name: string;
  }

  interface PartialType {
    readonly isPartial?: boolean;
  }

  interface GenericableType {
    readonly generics?: Generic[];
  }

  interface ClassOrStructType extends GeneralType, PartialType, GenericableType {
    readonly fields?: Field[];
    readonly properties?: Property[];
    readonly constructors?: Constructor[];
    readonly methods?: Method[];
    readonly baseType?: TypeReference;
  }

  interface ClassType extends ClassOrStructType {
    readonly kind: "class";
    readonly modifier?: Modifier;
  }

  interface StructType extends ClassOrStructType {
    readonly kind: "struct";
  }

  interface EnumMember {
    readonly attributes?: Attribute[];
    readonly name: string;
    readonly value?: string;
  }

  interface EnumType extends GeneralType {
    readonly kind: "enum";
    readonly members?: EnumMember[];
  }

  interface InterfaceType extends GeneralType, PartialType, GenericableType {
    readonly kind: "interface";
  }

  interface DelegateType extends GeneralType, GenericableType {
    readonly kind: "delegate";
  }

  type Type = 
    | ClassType 
    | StructType 
    | EnumType 
    | InterfaceType
    | DelegateType;
}