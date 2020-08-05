const caseScore = require("./case-score");

describe("caseScore", () => {
  test.each([
    ["is upper character", "A", 2],
    ["is upper word", "HELLO", 10],
    ["is upper with underscore", "HELLO_WORLD", 9],
    ["is upper with hyphen", "HELLO-WORLD", 9],
    ["is upper with space", "HELLO WORLD", 10]
  ])(`given %s then caseScore(%s, "upper") returns %i`, (_, str, expected) => {
    expect(caseScore(str, "upper")).toEqual(expected);
  });
});
