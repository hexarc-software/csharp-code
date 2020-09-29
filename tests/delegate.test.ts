import * as fs from "fs";
import * as path from "path";
import * as CSharpDom from "../lib";


// Create a C# code unit that represents a file with a POCO class
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "delegate.cs",
  namespaces: [{
    path: ["Hexarc", "Delegates"],
    types: [{
      kind: "delegate",
      access: "public",
      name: "Calculator",
      result: { namespace: "System", name: "Int32" },
      parameters: [{
        type: { namespace: "System", name: "Int32" },
        name: "x"
      }, {
        type: { namespace: "System", name: "Int32" },
        name: "y"
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(path.join("tests", codeUnit.name), CSharpDom.emit(codeUnit));