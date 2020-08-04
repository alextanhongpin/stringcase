const upper = require("./upper");

describe("upper", () => {
  test.each([
    ["", ""],
    [" ", " "],
    ["*", "*"],
    ["a", "A"],
    ["hello world", "Hello world"],
    ["helloWorld", "HelloWorld"],
    ["hello_world", "Hello_world"],
    ["hello-world", "Hello-world"],
    ["helloworld", "Helloworld"],
    ["HELLOWORLD", "HELLOWORLD"],
    [" hello world", " hello world"],
    ["hello world ", "Hello world "]
  ])('upper("%s") returns "%s"', (str, expected) => {
    expect(upper(str)).toEqual(expected);
  });
});
