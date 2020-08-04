// upper.js
// Converts the first character to uppercase, and the rest remains the same.

function upper(str = "") {
  return str.length ? str.charAt(0).toUpperCase() + str.substring(1) : str;
}

module.exports = upper;
