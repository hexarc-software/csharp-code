declare namespace Hexarc.CSharpDom {

  interface Namespace {
    readonly path: string | string[];
    readonly imports?: NamespaceImport[];
    readonly types?: Type[];
  }

  interface NamespaceImport {
    readonly path: string | string[];
  }

}