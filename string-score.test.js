const stringScore = require("./string-score");

describe("stringScore(str).lower", () => {
  test.each([
    ["", 0], // Empty string.
    ["a", 1], // Single lower character.
    ["A", 0], // Single upper character.
    ["-", 0], // Single symbol.
    ["hello", 5], // All lower.
    ["world", 5], // All lower.
    ["Hello", 4], // Has uppercase in the beginning.
    ["hEllo", 4], // Has uppercase in between.
    ["hellO", 4], // Has uppercase in the end.
    ["hell-o", 5], // Has hyphen in between.
    ["-hello", 5], // Has hyphen in the beginning.
    ["hello-", 5], // Has hyphen in the end.
    ["hell_o", 5], // Has underscore in between.
    ["_hello", 5], // Has underscore in the beginning.
    ["hello_", 5], // Has underscore in the end.
    ["HELL_O", 0], // Has underscore in between.
    ["_HELLO", 0], // Has underscore in the beginning.
    ["HELLO_", 0] // Has underscore in the end.
  ])("stringScore(%s).lower returns %i", (str, expected) => {
    expect(stringScore(str).lower).toEqual(expected);
  });
});

describe("stringScore(str).upper", () => {
  test.each([
    ["", 0], // Empty string.
    ["a", 0], // Single lower character.
    ["A", 1], // Single upper character.
    ["-", 0], // Single symbol.
    ["hello", 0], // All lower.
    ["world", 0], // All lower.
    ["Hello", 1], // Has uppercase in the beginning.
    ["hEllo", 1], // Has uppercase in between.
    ["hellO", 1], // Has uppercase in the end.
    ["hell-o", 0], // Has hyphen in between.
    ["-hello", 0], // Has hyphen in the beginning.
    ["hello-", 0], // Has hyphen in the end.
    ["HELLO", 5], // All upper.
    ["HELL-O", 5], // Has hyphen in between.
    ["-HELLO", 5], // Has hyphen in the beginning.
    ["HELLO-", 5], // Has hyphen in the end.
    ["hell_o", 0], // Has underscore in between.
    ["_hello", 0], // Has underscore in the beginning.
    ["hello_", 0], // Has underscore in the end.
    ["HELL_O", 5], // Has underscore in between.
    ["_HELLO", 5], // Has underscore in the beginning.
    ["HELLO_", 5] // Has underscore in the end.
  ])("stringScore(%s).upper returns %i", (str, expected) => {
    expect(stringScore(str).upper).toEqual(expected);
  });
});

describe("stringScore(str).pascal", () => {
  test.each([
    ["", 0],
    ["", 0], // Empty string.
    ["a", 0], // Single lower character.
    ["A", 0], // Single upper character.
    ["-", 0], // Single symbol.
    ["hello", 0], // All lower.
    ["world", 0], // All lower.
    ["Hello", 1], // Has uppercase in the beginning.
    ["hEllo", 0], // Has uppercase in between.
    ["hellO", 0], // Has uppercase in the end.
    ["hell-o", 0], // Has hyphen in between.
    ["-hello", 0], // Has hyphen in the beginning.
    ["hello-", 0], // Has hyphen in the end.
    ["HELLO", 0], // All upper.
    ["HELL-O", 0], // Has hyphen in between.
    ["-HELLO", 0], // Has hyphen in the beginning.
    ["HELLO-", 0], // Has hyphen in the end.
    ["hell_o", 0], // Has underscore in between.
    ["_hello", 0], // Has underscore in the beginning.
    ["hello_", 0], // Has underscore in the end.
    ["HELL_O", 0], // Has underscore in between.
    ["_HELLO", 0], // Has underscore in the beginning.
    ["HELLO_", 0] // Has underscore in the end.
  ])("stringScore(%s).pascal returns %i", (str, expected) => {
    expect(stringScore(str).pascal).toEqual(expected);
  });
});

describe("stringScore(str).camel", () => {
  test.each([
    ["", 0],
    ["", 0], // Empty string.
    ["a", 0], // Single lower character.
    ["A", 0], // Single upper character.
    ["-", 0], // Single symbol.
    ["hello", 0], // All lower.
    ["world", 0], // All lower.
    ["Hello", 0], // Has uppercase in the beginning.
    ["hEllo", 1], // Has uppercase in between.
    ["hellO", 1], // Has uppercase in the end.
    ["hell-o", 0], // Has hyphen in between.
    ["-hello", 0], // Has hyphen in the beginning.
    ["hello-", 0], // Has hyphen in the end.
    ["HELLO", 0], // All upper.
    ["HELL-O", 0], // Has hyphen in between.
    ["-HELLO", 0], // Has hyphen in the beginning.
    ["HELLO-", 0], // Has hyphen in the end.
    ["hell_o", 0], // Has underscore in between.
    ["_hello", 0], // Has underscore in the beginning.
    ["hello_", 0], // Has underscore in the end.
    ["HELL_O", 0], // Has underscore in between.
    ["_HELLO", 0], // Has underscore in the beginning.
    ["HELLO_", 0] // Has underscore in the end.
  ])("stringScore(%s).camel returns %i", (str, expected) => {
    expect(stringScore(str).camel).toEqual(expected);
  });
});

describe("stringScore(str).kebab", () => {
  test.each([
    ["", 0],
    ["", 0], // Empty string.
    ["a", 0], // Single lower character.
    ["A", 0], // Single upper character.
    ["-", 1], // Single symbol.
    ["hello", 0], // All lower.
    ["world", 0], // All lower.
    ["Hello", 0], // Has uppercase in the beginning.
    ["hEllo", 0], // Has uppercase in between.
    ["hellO", 0], // Has uppercase in the end.
    ["hell-o", 1], // Has hyphen in between.
    ["-hello", 1], // Has hyphen in the beginning.
    ["hello-", 1], // Has hyphen in the end.
    ["HELLO", 0], // All upper.
    ["HELL-O", 1], // Has hyphen in between.
    ["-HELLO", 1], // Has hyphen in the beginning.
    ["HELLO-", 1], // Has hyphen in the end.
    ["hell_o", 0], // Has underscore in between.
    ["_hello", 0], // Has underscore in the beginning.
    ["hello_", 0], // Has underscore in the end.
    ["HELL_O", 0], // Has underscore in between.
    ["_HELLO", 0], // Has underscore in the beginning.
    ["HELLO_", 0] // Has underscore in the end.
  ])("stringScore(%s).kebab returns %i", (str, expected) => {
    expect(stringScore(str).kebab).toEqual(expected);
  });
});

describe("stringScore(str).snake", () => {
  test.each([
    ["", 0],
    ["", 0], // Empty string.
    ["a", 0], // Single lower character.
    ["A", 0], // Single upper character.
    ["-", 0], // Single symbol.
    ["_", 1], // Single symbol.
    ["hello", 0], // All lower.
    ["world", 0], // All lower.
    ["Hello", 0], // Has uppercase in the beginning.
    ["hEllo", 0], // Has uppercase in between.
    ["hellO", 0], // Has uppercase in the end.
    ["hell-o", 0], // Has hyphen in between.
    ["-hello", 0], // Has hyphen in the beginning.
    ["hello-", 0], // Has hyphen in the end.
    ["HELLO", 0], // All upper.
    ["HELL-O", 0], // Has hyphen in between.
    ["-HELLO", 0], // Has hyphen in the beginning.
    ["HELLO-", 0], // Has hyphen in the end.
    ["hell_o", 1], // Has underscore in between.
    ["_hello", 1], // Has underscore in the beginning.
    ["hello_", 1], // Has underscore in the end.
    ["HELL_O", 1], // Has underscore in between.
    ["_HELLO", 1], // Has underscore in the beginning.
    ["HELLO_", 1] // Has underscore in the end.
  ])("stringScore(%s).snake returns %i", (str, expected) => {
    expect(stringScore(str).snake).toEqual(expected);
  });
});
