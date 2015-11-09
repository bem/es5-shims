es5-shims
=========

This module provides shim for some commonly used ES5 methods.

```js
Array.prototype.indexOf
Array.prototype.forEach
Array.prototype.map
Array.prototype.filter
Array.prototype.reduce
Array.prototype.some
Array.prototype.every
Array.isArray

Date.now

Object.keys

JSON.stringify
JSON.parse

Function.prototype.bind

String.prototype.trim
```

## Usage

You could use `es5-shims` as a standalone JS-library or as a BEM-library.

### As standalone library

Add JS-file from Yandex CDN:

```html
<script src="https://yastatic.net/es5-shims/0.0.2/es5-shims.min.js"></script>
```

### As BEM library

Add `es5-shims` to your project's `bower.json` config:

```json
{
  "dependencies": {
    "es5-shims": "bem/es5-shims~0.0.2"
  }
}
```

Define shims that you need as your block's dependencies:

```js
// prj/common.blocks/link/link.deps.js

({
    mustDeps : [
        {
            block : 'ecma',
            elem : [
                'array',
                'date',
                'function',
                'json',
                'object',
                'string'
            ]
        }
    ]
})
```

*Don't forget to configure your build system, so it could find blocks from `es5-shims/common.blocks`.*
