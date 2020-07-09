function parser(template) {
  let index = 0
  let html = template.substring(index)
  console.log(html);
  while (html) {
    console.log(html);
    advance(1)
  }

  function advance(n) {
    index += n;
    html = html.substring(n);
  }
}

export { parser }