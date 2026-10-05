import { createElement } from './utils/dom.js';
import { fetchRandomTale } from './services/api.js';
import { renderBoard } from './components/board.js';

import './styles/main.scss';

async function init() {
  const app = createElement('div', ['app'], { id: 'app' });

  const loadingMessage = createElement('p', ['app__loading'], {}, ['Загрузка сказки...']);
  app.appendChild(loadingMessage);

  document.body.appendChild(app);

  try {
    const tale = await fetchRandomTale();

    // Очищаем сообщение о загрузке
    loadingMessage.remove();

    // Заголовок с названием сказки
    const title = createElement('h1', ['app__title'], {}, [
      `${tale.title} (${tale.author})`
    ]);
    app.appendChild(title);

    // Игровое поле
    const board = renderBoard(tale.cards);
    app.appendChild(board);

    console.log(`Загружена сказка: ${tale.title}. На поле ${tale.cards.length} карточек.`);
  } catch (error) {
    loadingMessage.textContent = 'Ошибка загрузки данных. Попробуйте обновить страницу.';
    loadingMessage.style.color = 'red';
  }
}

document.addEventListener('DOMContentLoaded', init);
