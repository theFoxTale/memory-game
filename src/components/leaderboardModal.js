// src/components/leaderboardModal.js
import { createElement } from '../utils/dom.js';
import { createModal, openModal, closeModal } from '../utils/modal.js';
import { loadLeaderboard } from '../services/storage.js';

/**
 * Показывает модальное окно с таблицей лидеров.
 */
export function showLeaderboardModal() {
  const leaderboard = loadLeaderboard();

  const content = createElement('div', ['leaderboard-modal']);

  const title = createElement('h2', ['leaderboard-modal__title'], {}, ['Таблица лидеров']);
  content.appendChild(title);

  if (leaderboard.length === 0) {
    // Если результатов нет
    const emptyMessage = createElement('p', ['leaderboard-modal__empty'], {}, [
      'Пока нет результатов. Сыграйте первую игру!'
    ]);
    content.appendChild(emptyMessage);
  } else {
    // Создаём таблицу
    const table = createElement('table', ['leaderboard-modal__table']);

    const thead = createElement('thead');
    const headerRow = createElement('tr');
    headerRow.append(
      createElement('th', [], {}, ['Место']),
      createElement('th', [], {}, ['Ходы']),
      createElement('th', [], {}, ['Дата'])
    );
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = createElement('tbody');
    leaderboard.forEach((result, index) => {
      const row = createElement('tr');
      row.append(
        createElement('td', [], {}, [String(index + 1)]),
        createElement('td', [], {}, [String(result.moves)]),
        createElement('td', [], {}, [result.date])
      );
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    content.appendChild(table);
  }

  // Кнопка "Закрыть"
  const closeBtn = createElement('button', ['btn', 'btn--secondary'], {
    type: 'button',
  }, ['✖ Закрыть']);
  content.appendChild(closeBtn);

  // Создаём и открываем модалку
  const modal = createModal(content);

  closeBtn.addEventListener('click', () => {
    closeModal(modal);
  });

  openModal(modal);
}
