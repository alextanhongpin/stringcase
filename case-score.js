const stringScore = require("./string-score");

function caseScore(str, name) {
  const scores = stringScore(str);
  switch (name) {
    case "upper":
      // Scores should not fall below zero - this happens when there are no upper case but has kebab, snake or camel.
      return Math.max(
        0,
        scores.upper - scores.snake - scores.kebab - scores.camel
      );
    case "lower":
      return Math.max(
        0,
        scores.lower - scores.snake - scores.kebab - scores.camel
      );
    case "kebab":
      const kebabScore =
        scores.kebab - scores.pascal - scores.snake - scores.camel;
      // Include upper/lower case if at least one hyphen is present.
      return kebabScore ? kebabScore + scores.upper + scores.lower : kebabScore;
    case "snake":
      const snakeScore =
        scores.snake - scores.camel - scores.pascal - scores.kebab;
      return snakeScore ? snakeScore + scores.upper + scores.lower : snakeScore;
    case "pascal":
      return scores.pascal + scores.camel - scores.kebab - scores.snake;
    case "camel":
      const camelScore = scores.camel - scores.kebab - scores.snake;
      return camelScore ? camelScore - (scores.pascal ? 1 : -1) : camelScore;
    default:
      throw new Error(`"${name}" is not valid`);
  }
}

module.exports = caseScore;
