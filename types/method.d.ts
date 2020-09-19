declare namespace Hexarc.CSharpDom {

  interface Method {
    readonly access?: Access;
    readonly modifier?: Modifier;
    readonly result: TypeReference | "void";
    readonly name: string;
    readonly generics?: Generic[];
    readonly parameters?: MethodParameter[];
    readonly body: MethodBody;
  }

  interface MethodBody {
    readonly statements: string[];
  }

  interface MethodParameter {
    readonly name: string;
    readonly type: TypeReference;
  }

  type MethodArgument = string;

}