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
