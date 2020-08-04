const normalizeCase = require("./normalize-case");
const predictCase = require("./predict-case");
const upper = require("./upper");
const lower = require("./lower");

class StringCase {
  constructor(value) {
    this.value = value;
  }
  get camel() {
    return this.value;
  }
  get snake() {
    return this.value;
  }
  get kebab() {
    return this.value;
  }
  get pascal() {
    return this.value;
  }
  valueOf() {
    return this.value;
  }
}

function stringCase(str) {
  const caseType = predictCase(str);
  switch (caseType) {
    case "snake":
      return new SnakeCase(str);
    case "camel":
      return new CamelCase(str);
    case "pascal":
      return new PascalCase(str);
    case "kebab":
      return new KebabCase(str);
    case "upper":
      return new UpperCase(str);
    case "lower":
      return new LowerCase(str);
    default:
      throw new Error(`StringCaseError: case "${caseType}" is invalid`);
  }
}

class SnakeCase extends StringCase {
  get snake() {
    return normalizeCase(this.value.toLowerCase(), "_");
  }
  get camel() {
    const result = this.snake.replace(/_[a-z0-9]/gi, str =>
      str.charAt(1).toUpperCase()
    );
    return lower(result);
  }
  get pascal() {
    return upper(this.camel);
  }
  get kebab() {
    return this.snake.replace(/_/g, "-");
  }
}

class CamelCase extends StringCase {
  get camel() {
    const normalized = normalizeCase(this.value);
    const breakWord = normalized.includes("-")
      ? normalized
          .split("-")
          .map((str, i) => (i === 0 ? str.toLowerCase() : upper(str)))
          .join("-")
      : normalized;
    const result = breakWord.replace(/-[a-z0-9]/gi, match =>
      match.charAt(1).toUpperCase()
    );
    return lower(result);
  }
  get pascal() {
    return upper(this.camel);
  }
  get kebab() {
    const result = this.camel.replace(/[a-z][A-Z]/g, word =>
      word.split("").join("-")
    );
    return result.toLowerCase();
  }
  get snake() {
    return this.kebab.replace(/-/g, "_").toLowerCase();
  }
}

class PascalCase extends StringCase {
  get pascal() {
    const normalized = normalizeCase(this.value);
    const result = normalized.replace(/-[a-z0-9]/gi, match =>
      match.charAt(1).toUpperCase()
    );
    return upper(result);
  }

  get camel() {
    return lower(this.pascal);
  }

  get kebab() {
    return this.pascal
      .replace(/[a-z][A-Z0-9]/g, char => char.split("").join("-"))
      .toLowerCase();
  }
  get snake() {
    return this.kebab.replace(/-/g, "_");
  }
}

class KebabCase extends StringCase {
  get kebab() {
    return normalizeCase(this.value.toLowerCase());
  }
  get snake() {
    return this.kebab.replace(/-/g, "_");
  }
  get camel() {
    const result = this.kebab.replace(/-[a-z0-9]/gi, word =>
      word.charAt(1).toUpperCase()
    );
    return lower(result);
  }
  get pascal() {
    return upper(this.camel);
  }
}

class UpperCase extends StringCase {}

class LowerCase extends StringCase {}

module.exports = {
  StringCase,
  stringCase,
  UpperCase,
  LowerCase,
  PascalCase,
  KebabCase,
  SnakeCase,
  CamelCase
};
