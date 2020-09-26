declare namespace Hexarc.CSharpDom {

  interface Namespace {
    readonly path: string | string[];
    readonly imports?: NamespaceImport[];
    readonly structs?: Struct[];
    readonly classes?: Class[];
  }

  interface NamespaceImport {
    readonly path: string | string[];
  }

}