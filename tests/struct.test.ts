import * as fs from "fs";
import * as path from "path";
import * as CSharpDom from "../lib";


// Create a C# code unit that represents a file with a POCO class
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "struct.cs",
  namespaces: [{
    path: ["Hexarc", "Geometry"],
    types: [{
      kind: "struct",
      access: "public",
      name: "Point2D",
      members: [{
        kind: "property",
        access: "public",
        type: { namespace: "System", name: "Single" },
        name: "X",
        value: "default"
      }, {
        kind: "property",
        access: "public",
        type: { namespace: "System", name: "Single" },
        name: "Y",
        value: "default"
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(path.join("tests", codeUnit.name), CSharpDom.emit(codeUnit));