Microsoft C# source code generation based on the language document object model
======================================================

[![Version](http://img.shields.io/npm/v/@hexarc/csharp-dom.svg)](https://www.npmjs.org/package/@hexarc/csharp-dom)
[![License](http://img.shields.io/:license-mit-blue.svg)](http://badges.mit-license.org)
[![Downloads](http://img.shields.io/npm/dm/@hexarc/csharp-dom.svg)](https://npmjs.org/package/@hexarc/csharp-dom)
[![Downloads](http://img.shields.io/npm/dt/@hexarc/csharp-dom.svg)](https://npmjs.org/package/@hexarc/csharp-dom)

Generate Microsoft C# source files from any Node.js projects just using a simple and well-structured language document object model API.

This package is designed for usage with TypeScript and provides extensive typings for the C# document object model.

## Setup
Install with npm:

```sh
npm install @hexarc/csharp-dom
```

Using with node.js (ES6 syntax):

```js
import * as CSharpDom from "@hexarc/csharp-dom";
```

Or using the CommonJS module syntax:

```js
const CSharpDom = require("@hexarc/csharp-dom");
```

## Usage
Generating a POCO class:
```ts
import * as fs from "fs";
import * as CSharpDom from "@hexarc/csharp-dom";


// Create a C# code unit that represents a file with a POCO class
const codeUnit: Hexarc.CSharpDom.CodeUnit = {
  name: "Point2D.cs",
  namespaces: [{
    path: ["Hexarc", "Geometry"],
    types: [{
      kind: "class",
      access: "public",
      modifier: "sealed",
      name: "Point2D",
      properties: [{
        access: "public",
        type: { namespace: "System", name: "Single" },
        name: "X"
      }, {
        access: "public",
        type: { namespace: "System", name: "Single" },
        name: "Y"
      }]
    }]
  }]
};

// Generate a C# source file from the code uint
fs.writeFileSync(codeUnit.name, CSharpDom.emit(codeUnit));
```

This code generates a `Point2D.cs` file with the `Point2D` POCO class:
```cs
namespace Hexarc.Geometry
{
    public sealed class Point2D
    {
        public System.Single X { get; set; }
        
        public System.Single Y { get; set; }
    }
}
```

## License

[MIT](LICENSE)