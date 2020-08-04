function stringScore(str = "") {
  const [lower] = str.match(/^[a-z]+$/) || [""];
  const [upper] = str.match(/^[A-Z]+$/) || [""];
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
