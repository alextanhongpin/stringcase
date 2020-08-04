function normalizeCase(str, delimiter = "-") {
  return str
    .replace(/[^a-z0-9-_]/gi, delimiter) // Replace everything expect alphanumeric, hyphen and underscore with the given delimiter.
    .replace(/[_|-]+/g, delimiter) // Replace repeated delimiter with single delimiter.
    .replace(/^[-_]+|[-_]+$/g, ""); // Replace starting and trailing delimiters.
}

module.exports = normalizeCase;
