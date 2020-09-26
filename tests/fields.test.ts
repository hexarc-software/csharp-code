import * as fs from "fs";
import * as path from "path";
import * as CSharpDom from "../lib";


// Test fields generation
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "fields.cs",
  namespaces: [{
    path: ["Hexarc", "Geometry"],
    classes: [{
      access: "public",
      modifier: "sealed",
      name: "Foo",
      fields: [{
        type: { namespace: "System", name: "Int32" },
        name: "bar00"
      }, {
        access: "public",
        type: { namespace: "System", name: "Int32" },
        name: "bar01",
        value: "2"
      }, {
        access: "public",
        isStatic: true,
        type: { namespace: "System", name: "Int32" },
        name: "bar02"
      }, {
        access: "public",
        type: { namespace: "System", name: "Single" },
        assignment: "const",
        name: "bar03",
        value: "3.0f"
      }, {
        access: "private",
        isNew: true,
        type: { namespace: "System", name: "Int32" },
        name: "bar04"
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(path.join("tests", codeUnit.name), CSharpDom.emit(codeUnit));