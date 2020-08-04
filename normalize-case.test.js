const normalizeCase = require("./normalize-case");

describe("normalizeCase", () => {
  test.each([
    ["hello world", "hello-world"], // Word separated by space.
    ["hello_world", "hello-world"], // Snake case.
    ["helloWorld", "helloWorld"], // Camel case.
    ["HelloWorld", "HelloWorld"], // Pascal case.
    ["HELLOWORLD", "HELLOWORLD"], // Upper case.
    ["helloworld", "helloworld"], // Lower case.
    ["!@#$%^", ""] // Random.
  ])(".normalizeCase(%s) returns %s", (str, expected) => {
    expect(normalizeCase(str)).toEqual(expected);
  });
});

describe("normalizeCase with underscore", () => {
  test.each([
    ["hello world", "hello_world"], // Word separated by space.
    ["hello_world", "hello_world"], // Snake case.
    ["helloWorld", "helloWorld"], // Camel case.
    ["HelloWorld", "HelloWorld"], // Pascal case.
    ["HELLOWORLD", "HELLOWORLD"], // Upper case.
    ["helloworld", "helloworld"], // Lower case.
    ["!@#$%^", ""] // Random.
  ])(".normalizeCase(%s) returns %s", (str, expected) => {
    expect(normalizeCase(str, "_")).toEqual(expected);
  });
});
