declare namespace Hexarc.CSharpDom {
  
  interface CodeUnit {
    readonly name: string;
    readonly imports?: NamespaceImport[];
    readonly namespaces?: Namespace[];
  }

}