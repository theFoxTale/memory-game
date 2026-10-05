import { createElement } from '../utils/dom.js';

let movesElement = null;
let pairsElement = null;

/**
 * Создает контейнер со счетчиками.
 *
 * @returns {HTMLElement}
 */
export function renderCounters() {
  const counters = createElement('div', ['counters']);

  const movesCounter = createElement('div', ['counters__item']);
  const movesLabel = createElement('span', ['counters__label'], {}, ['Ходы: ']);
  movesElement = createElement('span', ['counters__value'], {}, ['0']);
  movesCounter.append(movesLabel, movesElement);

  const pairsCounter = createElement('div', ['counters__item']);
  const pairsLabel = createElement('span', ['counters__label'], {}, ['Пары: ']);
  pairsElement = createElement('span', ['counters__value'], {}, ['0 / 8']);
  pairsCounter.append(pairsLabel, pairsElement);

  counters.append(movesCounter, pairsCounter);

  return counters;
}

/**
 * Обновляет значения счетчиков.
 *
 * @param {number} moves
 * @param {number} pairs
 */
export function updateCounters(moves, pairs) {
  if (movesElement) {
    movesElement.textContent = String(moves);
  }
  if (pairsElement) {
    pairsElement.textContent = `${pairs} / 8`;
  }
}
