const normalizeCase = require("./normalize-case");
const predictCase = require("./predict-case");
const upper = require("./upper");
const lower = require("./lower");

class StringCase {
  #norm = "";
  constructor(value) {
    this.value = value;
    this.#norm = normalizeCase(value, "_");
  }
  get camel() {
    return this.#norm.replace(/_[a-z0-9]/g, match =>
      match.charAt(1).toUpperCase()
    );
  }
  get snake() {
    return this.#norm;
  }
  get kebab() {
    return this.#norm.replace(/_/g, "-");
  }
  get pascal() {
    return upper(this.camel);
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
    case "unknown":
      return new UnknownCase(str);
    default:
      throw new Error(`StringCaseError: case "${caseType}" is invalid`);
  }
}

class SnakeCase extends StringCase {}
class CamelCase extends StringCase {}
class PascalCase extends StringCase {}
class KebabCase extends StringCase {}
class UpperCase extends StringCase {}
class LowerCase extends StringCase {}
class UnknownCase extends StringCase {}

module.exports = {
  StringCase,
  stringCase,
  UpperCase,
  LowerCase,
  PascalCase,
  KebabCase,
  SnakeCase,
  CamelCase,
  UnknownCase
};
