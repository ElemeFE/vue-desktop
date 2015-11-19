const matchHtmlRegExp = /["'&<>]/;
const ESCAPE_CHAR_MAP = {
  34: '&quot;',
  38: '&amp;',
  39: '&#39;',
  60: '&lt;',
  62: '&gt;'
};

var escapeHTML = function (string) {
  string = '' + string;
  var match = matchHtmlRegExp.exec(string);

  if (!match) {
    return string;
  }

  var html = '';
  var lastIndex = 0;
  var escape, index;

  for (index = match.index; index < string.length; index++) {
    var charCode = string.charCodeAt(index);
    if (ESCAPE_CHAR_MAP[charCode]) {
      escape = ESCAPE_CHAR_MAP[charCode];
    } else {
      continue;
    }

    if (lastIndex !== index) {
      html += string.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index ? html + string.substring(lastIndex, index) : html;
};

export default {
  escapeHTML: escapeHTML
}