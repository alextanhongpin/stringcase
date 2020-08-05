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


## Use Cases

- detecting the difference type of cases allows you to predict what language is being used, e.g. snake case is most likely SQL or Python
- converting between different cases, useful for code generation, where a user just provide a file name,e
 E.g. user-service, and UserService can be generated
- counting occurances of a particular case to detect trends, if a lot of text has underscore, the text is most likely related to tech article, if camel case then JS code snippets
- finding wrong case, e.g. if the code snippet case should only be snake case, but a camel case is detected
- normalizing cases, say we are extracting headers from CSV and we want to dynamically generate field names (or compare to existing ones for validation), we can convert all to camel case
