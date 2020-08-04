const caseScore = require("./case-score");

describe("caseScore", () => {
  test.each([
    ["is upper", "HELLO", 5],
    ["is upper with underscore", "HELLO_WORLD", 0],
    ["is upper with hyphen", "HELLO-WORLD", 0]
  ])(`given %s then caseScore(%s, "upper") returns %i`, (_, str, expected) => {
    expect(caseScore(str, "upper")).toEqual(expected);
  });
});
