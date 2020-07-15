import { attribute, startTagOpen, startTagClose, endTag } from './regular-expression'

export function createElement(tag, data, children = []) {
  return {
    tag,
    data,
    children
  }
}

export function parser(template) {
  let html = template.substring(0)
  let stack = []
  let currentNode = {}

  while (html) {
    if (html[0] === ' ') { advance(1); continue; }
    // console.log(html);

    const tagOpen = html.match(startTagOpen)
    const tagEnd = html.match(endTag)
    // console.log('tagClose', tagClose);
    if (tagOpen) {
      console.log('tagOpen', tagOpen);
      parseTagOpen(tagOpen)
      continue
    }

    if (tagEnd) {
      console.log('tagEnd', tagEnd);
      advance(tagEnd[0].length)
      continue
    }
    // nothing match , advance 1
    advance(1)
  }

  console.log(stack);


  function parseTagOpen(matchTag) {
    const tag = matchTag[1]
    currentNode = { tag, data: {} }
    advance(matchTag[0].length)
    let tagClose = html.match(startTagClose)
    while (!tagClose) {
      tagClose = html.match(startTagClose)
      const attr = html.match(attribute)
      if (!attr) continue
      currentNode['data'][attr[1]] = attr[3]
      console.log('currentNode', currentNode);
      advance(attr[0].length)
    }
    stack.push(currentNode)
    currentNode = {}
  }

  function advance(n) {
    html = html.substring(n);
  }
}
