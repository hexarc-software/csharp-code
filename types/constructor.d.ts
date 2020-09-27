declare namespace Hexarc.CSharpDom {

  interface Constructor {
    readonly access?: Access;
    readonly isStatic?: boolean;
    readonly parameters?: MethodParameter[];
    readonly body: MethodBody;
  }

}