export function query(tag) {
  if (typeof tag === 'string') {
    if (tag[0] === '#') {
      return queryById(tag)
    } else if (tag[0] === '.') {
      warn('please use id selector');
      return queryByClassName(tag)
    }
  } else {

  }

}

function queryById(tag) {
  return document.querySelector(tag)
}

function queryByClassName(tag) {
  return document.querySelector(tag)
}