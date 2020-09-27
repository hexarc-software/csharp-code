import * as fs from "fs";
import * as path from "path";
import * as CSharpDom from "../lib";


// Create a C# code unit that represents a file with a POCO class
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "enum.cs",
  namespaces: [{
    path: ["Hexarc", "Flags"],
    types: [{
      kind: "enum",
      access: "public",
      name: "Direction",
      members: [{
        name: "Up"
      }, {
        name: "Down"
      }, {
        name: "Left"
      }, {
        name: "Right"
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(path.join("tests", codeUnit.name), CSharpDom.emit(codeUnit));