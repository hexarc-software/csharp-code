declare namespace Hexarc.CSharpDom {

  // interface InvokeStaticMethod {
  //   readonly type: TypeReference;
  //   readonly name: string;
  //   readonly generics?: Generic[];
  //   readonly arguments?: MethodArgument[];
  // }

  // interface InvokeInstanceMethod {
  //   readonly name: string;
  //   readonly generics?: Generic[];
  //   readonly arguments?: MethodArgument[];
  // }

  interface InvokeBaseConstructor {
    readonly kind: "base";
    readonly arguments?: MethodArgument[];
  }

  interface InvokeThisConstructor {
    readonly kind: "this";
    readonly arguments?: MethodArgument[];
  }

  type InvokeConstructor = 
    | InvokeBaseConstructor
    | InvokeThisConstructor;

}