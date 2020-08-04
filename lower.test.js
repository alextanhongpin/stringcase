const lower = require("./lower");

describe("lower", () => {
  test.each([
    ["", ""],
    [" ", " "],
    ["*", "*"],
    ["a", "a"],
    ["A", "a"],
    ["hello world", "hello world"],
    ["helloWorld", "helloWorld"],
    ["hello_world", "hello_world"],
    ["hello-world", "hello-world"],
    ["helloworld", "helloworld"],
    ["HELLOWORLD", "hELLOWORLD"],
    [" hello world", " hello world"],
    [" Hello world", " Hello world"],
    ["hello world ", "hello world "]
  ])('lower("%s") returns "%s"', (str, expected) => {
    expect(lower(str)).toEqual(expected);
  });
});
