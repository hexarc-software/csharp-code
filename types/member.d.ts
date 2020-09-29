declare namespace Hexarc.CSharpDom {

  interface FieldMember {
    readonly kind: "field";
  }

  interface PropertyMember {
    readonly kind: "property";
  }

  interface ConstructorMember {
    readonly kind: "constructor";
  }

  interface MethodMember {
    readonly kind: "method";
  }

  type Member =
    | FieldMember
    | PropertyMember
    | ConstructorMember
    | MethodMember;
}