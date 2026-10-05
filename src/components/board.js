import { createElement } from '../utils/dom.js';

/**
 * Создает DOM-элемент одной карточки.
 *
 * @param {Object} cardData - Данные карточки.
 * @returns {HTMLElement}
 */
function createCardElement(cardData) {
  const card = createElement('div', ['card'], {
    'data-pair-id': cardData.pairId,
    'aria-label': 'Закрытая карточка',
  });

  const cardInner = createElement('div', ['card__inner']);

  // Рубашка (видна по умолчанию)
  const cardBack = createElement('div', ['card__back']);

  // Лицевая сторона (скрыта)
  const cardFront = createElement('div', ['card__front']);
  const cardImage = createElement('img', ['card__image'], {
    src: cardData.image,
    alt: cardData.name,
    loading: 'lazy',
  });
  cardFront.appendChild(cardImage);

  cardInner.append(cardBack, cardFront);
  card.appendChild(cardInner);

  return card;
}

/**
 * Рендерит игровое поле с карточками.
 *
 * @param {Object[]} cards - Массив перемешанных карточек.
 * @returns {HTMLElement} - Контейнер игрового поля.
 */
export function renderBoard(cards) {
  const board = createElement('div', ['board']);

  for (const cardData of cards) {
    const cardElement = createCardElement(cardData);
    board.appendChild(cardElement);
  }

  return board;
}
