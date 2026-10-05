import { createElement } from '../utils/dom.js';
import { createModal, openModal, closeModal } from '../utils/modal.js';
import { restartGame } from '../services/game.js';
import { saveResult } from '../services/storage.js';

/**
 * Показывает модальное окно победы.
 *
 * @param {number} moves - Итоговое количество ходов.
 */
export function showVictoryModal(moves) {
  // Сохраняем результат в localStorage
  saveResult(moves);

  // Модальное окно
  const content = createElement('div', ['victory-modal']);

  const title = createElement('h2', ['victory-modal__title'], {}, ['🎉 Победа!']);
  const message = createElement('p', ['victory-modal__message'], {}, [
    `Вы нашли все пары за ${moves} ${getMovesWord(moves)}!`
  ]);

  const controls = createElement('div', ['victory-modal__controls']);

  const newGameBtn = createElement('button', ['btn', 'btn--primary'], {
    type: 'button',
  }, ['Новая игра']);

  const closeBtn = createElement('button', ['btn', 'btn--secondary'], {
    type: 'button',
  }, ['✖ Закрыть']);

  controls.append(newGameBtn, closeBtn);
  content.append(title, message, controls);

  const modal = createModal(content);

  newGameBtn.addEventListener('click', () => {
    closeModal(modal);
    restartGame();
  });

  closeBtn.addEventListener('click', () => {
    closeModal(modal);
  });

  openModal(modal);
}

/**
 * Склоняет слово "ход" в зависимости от числа.
 */
function getMovesWord(n) {
  const abs = Math.abs(n) % 100;
  const lastDigit = abs % 10;

  if (abs > 10 && abs < 20) return 'ходов';
  if (lastDigit === 1) return 'ход';
  if (lastDigit >= 2 && lastDigit <= 4) return 'хода';
  return 'ходов';
}
