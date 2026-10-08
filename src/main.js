import { createElement } from './utils/dom.js';
import { fetchRandomTale, prepareDeck } from './services/api.js';
import { renderBoard } from './components/board.js';
import { renderCounters } from './components/counters.js';
import { gameState } from './services/state.js';
import { renderHeader } from "./components/header";

import './styles/main.scss';

async function init() {
  const app = createElement('div', ['app'], { id: 'app' });

  const loadingMessage = createElement('p', ['app__loading'], {}, ['Загрузка сказки...']);
  app.appendChild(loadingMessage);

  document.body.appendChild(app);

  try {
    const tale = await fetchRandomTale();

    // Сохраняем данные в состояние
    gameState.currentTale = tale;
    gameState.cards = prepareDeck(tale.cards);

    // Очищаем сообщение о загрузке
    loadingMessage.remove();

    // Рендерим хедер
    const header = renderHeader();
    app.appendChild(header);

    // Счетчики
    const counters = renderCounters();
    app.appendChild(counters);

    // Игровое поле
    const board = renderBoard(gameState.cards);
    app.appendChild(board);

    console.log(`Загружена сказка: ${tale.title}. На поле ${tale.cards.length} карточек.`);
  } catch (error) {
    loadingMessage.textContent = 'Ошибка загрузки данных. Попробуйте обновить страницу.';
    loadingMessage.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', init);
