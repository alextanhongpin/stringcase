(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { stringCase } = require("@alextanhongpin/stringcase");

const CASES = "camel snake kebab pascal".split(" ");
const $ = el => document.getElementById(el);
$("input").addEventListener("input", evt => {
  const value = evt.currentTarget.value;
  if (!value) return;
  const str = stringCase(value);
  $("output").textContent = [
    `Detected stringcase: ${str.constructor.name}`,
    ...CASES.map(caseType => [caseType, str[caseType]].join(": "))
  ].join("\n");
});

},{"@alextanhongpin/stringcase":3}],2:[function(require,module,exports){
const stringScore = require("./string-score");

function caseScore(str, name) {
  const scores = stringScore(str);
  switch (name) {
    case "upper":
      const upperMultiplier = scores.upper === str.length ? 2 : 1;
      const upperScore = (scores.upper - scores.lower) * upperMultiplier;
      return upperScore
        ? upperScore - scores.snake - scores.kebab - scores.camel
        : upperScore;
    case "lower":
      const lowerMultiplier = scores.lower === str.length ? 2 : 1;
      const lowerScore = (scores.lower - scores.upper) * lowerMultiplier;
      return lowerScore
        ? lowerScore - scores.snake - scores.kebab - scores.camel
        : lowerScore;
    case "kebab":
      // Either fully lower, fully upper, or prefer lower over upper.
      const kebabMultiplier =
        scores.lower === 0
          ? scores.upper
          : scores.upper === 0
          ? scores.lower
          : scores.lower - scores.upper;
      return (
        scores.kebab -
        scores.pascal -
        scores.snake -
        scores.camel +
        kebabMultiplier
      );
    case "snake":
      const snakeMultiplier =
        scores.lower === 0
          ? scores.upper
          : scores.upper === 0
          ? scores.lower
          : scores.lower - scores.upper;
      return (
        scores.snake -
        scores.camel -
        scores.pascal -
        scores.kebab +
        snakeMultiplier
      );
    case "pascal":
      return (
        scores.pascal +
        scores.camel -
        scores.kebab -
        scores.snake +
        scores.upper +
        scores.lower
      );
    case "camel":
      // If it starts with capital letter, deduct 1, else add 1.
      const camelPenalty = scores.pascal ? 1 : -1;
      const camelScore =
        scores.camel -
        scores.kebab -
        scores.snake +
        scores.upper +
        scores.lower;
      return camelScore ? camelScore - camelPenalty : camelScore;
    default:
      throw new Error(`"${name}" is not valid`);
  }
}

module.exports = caseScore;

},{"./string-score":7}],3:[function(require,module,exports){
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

},{"./lower":4,"./normalize-case":5,"./predict-case":6,"./upper":8}],4:[function(require,module,exports){
// lower.js
// Converts the first character to lower-case, and the rest remains the same.

function lower(str = "") {
  return str.length ? str.charAt(0).toLowerCase() + str.substring(1) : str;
}

module.exports = lower;

},{}],5:[function(require,module,exports){
function normalizeCase(str, delimiter = "-") {
  return str
    .replace(/[^a-z0-9-_]/gi, delimiter) // Replace everything except alphanumeric, hyphen and underscore with the given delimiter.
    .replace(/[a-z][A-Z0-9]/g, match => match.split("").join(delimiter)) // Split camel-case word with the delimiter.
    .replace(/[_|-]+/g, delimiter) // Replace repeated delimiter with single delimiter.
    .replace(/^[-_]+|[-_]+$/g, "") // Replace starting and trailing delimiters.
    .toLowerCase();
}

module.exports = normalizeCase;

},{}],6:[function(require,module,exports){
const caseScore = require("./case-score");

const CASES = ["camel", "kebab", "pascal", "snake", "lower", "upper"];

function predictCase(str) {
  const caseScores = CASES.map(caseType => ({
    score: caseScore(str, caseType),
    caseType
  }));
  const scores = caseScores.map(item => item.score);
  // When the scores are the same, it means all
  // the cases have score of 0. To simplify
  // things, we just use the unknown case.
  const [min, max] = [Math.min(...scores), Math.max(...scores)];
  if (min === max) return "unknown";
  const item = caseScores.find(item => item.score === max);
  return item.caseType || "unknown";
}

module.exports = predictCase;

},{"./case-score":2}],7:[function(require,module,exports){
function stringScore(str = "") {
  const lower = str.match(/[a-z]/g) || [];
  const upper = str.match(/[A-Z]/g) || [];
  const pascal = str.match(/^[A-Z][a-z]/) || [];
  const camel = str.match(/[a-z][A-Z]/g) || [];
  const kebab = str.match(/-/g) || [];
  const snake = str.match(/_/g) || [];
  return {
    upper: upper.length,
    lower: lower.length,
    pascal: pascal.length,
    camel: camel.length,
    kebab: kebab.length,
    snake: snake.length
  };
}

module.exports = stringScore;

},{}],8:[function(require,module,exports){
// upper.js
// Converts the first character to uppercase, and the rest remains the same.

function upper(str = "") {
  return str.length ? str.charAt(0).toUpperCase() + str.substring(1) : str;
}

module.exports = upper;

},{}]},{},[1]);
