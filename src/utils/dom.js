/**
 * Создает DOM-элемент с классами, атрибутами и дочерними элементами.
 *
 * @param {string} tag - Тег элемента (div, button, img, span и т.д.)
 * @param {string[]} [classes=[]] - Массив CSS-классов (BEM)
 * @param {Object} [attributes={}] - Объект с атрибутами (src, alt, aria-label, data-*)
 * @param {(Node|string)[]} [children=[]] - Дочерние элементы или текст
 *
 * @returns {HTMLElement}
 */
export function createElement(tag, classes = [], attributes = {}, children = []) {
  const element = document.createElement(tag);

  if (classes.length) {
    element.classList.add(...classes);
  }

  for (const [key, value] of Object.entries(attributes)) {
    element.setAttribute(key, value);
  }

  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  }

  return element;
}
