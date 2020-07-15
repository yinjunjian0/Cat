import { parser } from '../parser/index'
import { query } from '../utils/query'

const Cat = function (options) {
  const { el } = options
  const _el = query(el)
  if (_el) {
    const template = query(el).outerHTML
    // const template = '<div><div>{{ message }}</div><div>haha</div></div>'
    parser(template.trim())
  } else {
    warn('can not find dom by el(options)!')
  }

}


export default Cat