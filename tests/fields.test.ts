import * as fs from "fs";
import * as CSharpDom from "../lib";


// Create a C# code unit that represents a file with a POCO class
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "Fields.cs",
  namespaces: [{
    path: ["Hexarc", "Geometry"],
    classes: [{
      access: "public",
      modifier: "sealed",
      name: "Point2D",
      fields: [{
        access: "public",
        type: { namespace: "System", name: "Int32" },
        name: "X1",
        value: "2"
      }, {
        access: "public",
        isStatic: true,
        type: { namespace: "System", name: "Int32" },
        name: "X2"
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(codeUnit.name, CSharpDom.emit(codeUnit));