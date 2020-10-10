import * as fs from "fs";
import * as path from "path";
import * as CSharpDom from "../lib";


// Create a C# code unit that represents a file with a POCO class
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "constructor.cs",
  namespaces: [{
    path: ["Hexarc", "Geometry"],
    types: [{
      kind: "class",
      access: "public",
      modifier: "sealed",
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
      }, {
        kind: "constructor",
        access: "public",
        parameters: [{
          type: { namespace: "System", name: "Single" },
          name: "x"
        }, {
          type: { namespace: "System", name: "Single" },
          name: "y"
        }],
        body: {
          statements: [
            "this.X = x;",
            "this.Y = y;" 
          ]
        }
      }, {
        kind: "constructor",
        access: "public",
        body: {
          statements: [
            "this.X = 0.0f;",
            "this.Y = 0.0f;"
          ]
        }
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(path.join("tests", codeUnit.name), CSharpDom.emit(codeUnit));