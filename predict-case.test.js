const predictCase = require("./predict-case");

describe("predictCase", () => {
  test.each([
    ["helloworld", "lower"],
    ["hello_world", "snake"],
    ["hello-world", "kebab"],
    ["helloWorld", "camel"],
    ["HelloWorld", "pascal"],
    ["HELLOWORLD", "upper"],
    ["HELLO_WORLD", "snake"], // Snake with uppercase.
    ["CREATED AT.", "camel"],
    ["User. ID", "pascal"]
  ])("predictCase(%s) returns %s", (str, expected) => {
    expect(predictCase(str)).toEqual(expected);
  });
});
