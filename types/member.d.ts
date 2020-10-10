declare namespace Hexarc.CSharpDom {

  interface FieldMember {
    readonly kind: "field";
    readonly attributes?: Attribute[];
    readonly access?: Access;
    readonly isNew?: boolean;
    readonly isStatic?: boolean;
    readonly assignment?: "readonly" | "const";
    readonly type: TypeReference;
    readonly name: string;
    readonly value?: string;
  }

  interface PropertyMember {
    readonly kind: "property";
    readonly attributes?: Attribute[];
    readonly access?: "private" | "public" | "internal";
    readonly type: TypeReference;
    readonly name: string;
    readonly value?: string;
  }

  interface ConstructorMember {
    readonly kind: "constructor";
    readonly access?: Access;
    readonly isStatic?: boolean;
    readonly parameters?: MethodParameter[];
    readonly body: MethodBody;
  }

  interface MethodMember {
    readonly kind: "method";
    readonly access?: Access;
    readonly modifier?: Modifier;
    readonly result: TypeReference | "void";
    readonly name: string;
    readonly generics?: Generic[];
    readonly parameters?: MethodParameter[];
    readonly body: MethodBody;
  }

  interface TypeMember {
    readonly kind: "type";
    readonly type: Type;
  }

  type Member =
    | FieldMember
    | PropertyMember
    | ConstructorMember
    | MethodMember
    | TypeMember;
}