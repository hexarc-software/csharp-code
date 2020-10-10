declare namespace Hexarc.CSharpDom {

  interface MethodBody {
    readonly statements: string[];
  }

  interface MethodParameter {
    readonly name: string;
    readonly type: TypeReference;
  }

  type MethodArgument = string;

}