import { createElement } from '../utils/dom.js';
import { restartGame } from '../services/game.js';

/**
 * Создает хедер с кнопками управления.
 *
 * @returns {HTMLElement}
 */
export function renderHeader() {
  const header = createElement('header', ['header']);

  const controls = createElement('div', ['header__controls']);

  // Кнопка "Новая игра"
  const newGameBtn = createElement('button', ['header__btn', 'header__btn--new-game'], {
    type: 'button',
    'aria-label': 'Новая игра',
  }, ['Новая игра']);

  // Кнопка "Таблица лидеров"
  const leaderboardBtn = createElement('button', ['header__btn', 'header__btn--leaderboard'], {
    type: 'button',
    'aria-label': 'Таблица лидеров',
  }, ['Таблица лидеров']);

  // Обработчики
  newGameBtn.addEventListener('click', restartGame);
  leaderboardBtn.addEventListener('click', onLeaderboardClick);

  controls.append(newGameBtn, leaderboardBtn);
  header.append(controls);

  const title = createElement('h1', ['header__title'], {}, ['Русские Сказки']);
  header.append(title);

  return header;
}

function onLeaderboardClick() {
  console.log('Открыть таблицу лидеров');
}
