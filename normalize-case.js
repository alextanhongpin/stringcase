function normalizeCase(str, delimiter = "-") {
  return str
    .replace(/[^a-z0-9-_]/gi, delimiter) // Replace everything except alphanumeric, hyphen and underscore with the given delimiter.
    .replace(/[a-z][A-Z0-9]/g, match => match.split("").join(delimiter)) // Split camel-case word with the delimiter.
    .replace(/[_|-]+/g, delimiter) // Replace repeated delimiter with single delimiter.
    .replace(/^[-_]+|[-_]+$/g, "") // Replace starting and trailing delimiters.
    .toLowerCase();
}

module.exports = normalizeCase;
