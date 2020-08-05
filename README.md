# @alextanhongpin/stringcase

A package to auto-detect lettercase, and converts to different format.

## Installation

```bash
$ npm i @alextanhongpin/stringcase
```

## Usage

```js
const assert = require("assert");
const {
  stringCase,
  StringCase,
  CamelCase
} = require("@alextanhongpin/stringcase");

// Factory method, produces a class instance that extends StringCase.
// Can be either CamelCase, SnakeCase, PascalCase, KebabCase,
// UpperCase, LowerCase or UnknownCase.
const greeting = stringCase("helloWorld");

assert(greeting instanceof StringCase);
assert(greeting instanceof CamelCase);
assert.equal("helloWorld", greeting.camel);
assert.equal("HelloWorld", greeting.pascal);
assert.equal("hello-world", greeting.kebab);
assert.equal("hello_world", greeting.snake);
```
