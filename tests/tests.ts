import * as fs from "fs";
import * as CSharpDom from "../lib";


const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "Test.cs",
  namespaces: [{
    path: ["Hexarc", "Api"],
    classes: [{
      modifier: "sealed",
      access: "public",
      name: "Matrix2x2",
      fields: [{
        access: "public",
        type: {
          namespace: "System",
          name: "Single"
        },
        name: "x"
      }, {
        access: "public",
        type: {
          namespace: "System",
          name: "Single"
        },
        name: "y"
      }]
    }, {
      attributes: [{
        type: {
          namespace: ["Microsoft", "AspNetCore", "Mvc"],
          name: "ApiController"
        }
      }, {
          type: {
          namespace: ["Microsoft", "AspNetCore", "Mvc"],
          name: "RequireHttps"
        }
      }],
      access: "public",
      isPartial: true,
      modifier: "sealed",
      name: "Point",
      baseClass: {
        namespace: "System",
        name: "Object"
      },
      methods: [{
        access: "public",
        name: "Sum",
        result: { namespace: "System", name: "Int32" },
        parameters: [{
          type: { namespace: "System", name: "Int32" },
          name: "x"
        }, {
          type: { namespace: "System", name: "Int32" },
          name: "y"
        }],
        body: {
          statements: [
            "return x + y;"
          ]
        }
      }, {
        access: "public",
        name: "Print",
        result: "void",
        parameters: [{
          type: { namespace: "System", name: "Int32" },
          name: "x"
        }],
        body: {
          statements: [
            "System.Console.WriteLine(x);"
          ]
        }
      }],
      properties: [{
        attributes: [{
          type: {
            namespace: ["System"],
            name: "Obsolete",
          },
          arguments: ["\"Use something else\""]
        }, {
          type: {
            namespace: ["Newtonsoft", "Json"],
            name: "JsonProperty"
          },
          arguments: ["\"x\""]
        }],
        access: "public",
        type: { namespace: "System", name: "Int32" },
        name: "X"
      }, {
        access: "public",
        type: { namespace: "System", name: "Int32" },
        name: "Y"
      }]
    }, {
      access: "public",
      modifier: "static",
      name: "PointFactory"
    }, {
      access: "internal",
      modifier: "abstract",
      name: "PrinterBase",
      generics: [{
        kind: "parameter",
        name: "T",
        modifier: "in"
      }],
      methods: [{
        access: "public",
        name: "Print",
        result: {
          namespace: ["System", "Collections", "Generic"],
          name: "HashSet",
          generics: [{ kind: "parameter", name: "T" }]
        },
        body: {
          statements: [
            "throw new System.NotImplementedException();"
          ]
        }
      }, {
        access: "public",
        name: "Any",
        result: {
          namespace: ["System", "Collections", "Generic"],
          name: "HashSet",
          generics: [{ kind: "parameter", name: "V" }]
        },
        generics: [{
          kind: "parameter",
          name: "V"
        }],
        body: {
          statements: [
            "throw new System.NotImplementedException();"
          ]
        }
      }]
    }, {
      access: "public",
      modifier: "abstract",
      name: "KeyValue",
      generics: [{
        kind: "parameter",
        name: "TKey"
      }, {
        kind: "parameter",
        name: "TValue"
      }]
    }]
  }]
};

fs.writeFileSync(codeUnit.name, CSharpDom.emit(codeUnit));