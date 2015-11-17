var RE_ARGS = /\{([0-9a-zA-Z]+)\}/g

module.exports = function(string, ...args) {
  if (!string) return null;
  if (arguments.length === 2 && typeof arguments[1] === "object") {
    args = arguments[1];
  }

  if (!args || !args.hasOwnProperty) {
    args = {};
  }

  return string.replace(RE_ARGS, function replaceArg(match, i, index) {
    var result;

    if (string[index - 1] === "{" && string[index + match.length] === "}") {
      return i;
    } else {
      result = args.hasOwnProperty(i) ? args[i] : null;
      if (result === null || result === undefined) {
        return "";
      }

      return result;
    }
  });
};