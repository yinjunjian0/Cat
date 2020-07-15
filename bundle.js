var singleAttrIdentifier = /([^\s"'<>/=]+)/;
var singleAttrAssign = /(?:=)/;
var singleAttrValues = [
  // attr value double quotes
  /"([^"]*)"+/.source,
  // attr value, single quotes
  /'([^']*)'+/.source,
  // attr value, no quotes
  /([^\s"'=<>`]+)/.source
];
var attribute = new RegExp(
  '^\\s*' + singleAttrIdentifier.source +
  '(?:\\s*(' + singleAttrAssign.source + ')' +
  '\\s*(?:' + singleAttrValues.join('|') + '))?'
);
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
var startTagOpen = new RegExp('^<' + qnameCapture);
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');

function parser(template) {
  let html = template.substring(0);
  let stack = [];
  let currentNode = {};

  while (html) {
    if (html[0] === ' ') { advance(1); continue; }
    // console.log(html);

    const tagOpen = html.match(startTagOpen);
    const tagEnd = html.match(endTag);
    // console.log('tagClose', tagClose);
    if (tagOpen) {
      console.log('tagOpen', tagOpen);
      parseTagOpen(tagOpen);
      continue
    }

    if (tagEnd) {
      console.log('tagEnd', tagEnd);
      advance(tagEnd[0].length);
      continue
    }
    // nothing match , advance 1
    advance(1);
  }

  console.log(stack);


  function parseTagOpen(matchTag) {
    const tag = matchTag[1];
    currentNode = { tag, data: {} };
    advance(matchTag[0].length);
    let tagClose = html.match(startTagClose);
    while (!tagClose) {
      tagClose = html.match(startTagClose);
      const attr = html.match(attribute);
      if (!attr) continue
      currentNode['data'][attr[1]] = attr[3];
      console.log('currentNode', currentNode);
      advance(attr[0].length);
    }
    stack.push(currentNode);
    currentNode = {};
  }

  function advance(n) {
    html = html.substring(n);
  }
}

function query(tag) {
  if (typeof tag === 'string') {
    if (tag[0] === '#') {
      return queryById(tag)
    } else if (tag[0] === '.') {
      warn('please use id selector');
      return queryByClassName(tag)
    }
  }

}

function queryById(tag) {
  return document.querySelector(tag)
}

function queryByClassName(tag) {
  return document.querySelector(tag)
}

const Cat = function (options) {
  const { el } = options;
  const _el = query(el);
  if (_el) {
    const template = query(el).outerHTML;
    // const template = '<div><div>{{ message }}</div><div>haha</div></div>'
    parser(template.trim());
  } else {
    warn('can not find dom by el(options)!');
  }

};

export default Cat;
