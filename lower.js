// lower.js
// Converts the first character to lower-case, and the rest remains the same.

function lower(str = "") {
  return str.length ? str.charAt(0).toLowerCase() + str.substring(1) : str;
}

module.exports = lower;
