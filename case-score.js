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
