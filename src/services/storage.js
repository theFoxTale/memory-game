const STORAGE_KEY = 'memory-game-leaderboard';

/**
 * Загружает таблицу лидеров из localStorage.
 *
 * @returns {Object[]} - Массив результатов.
 */
export function loadLeaderboard() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка чтения localStorage:', error);
    return [];
  }
}

/**
 * Сохраняет новый результат в таблицу лидеров.
 * Результат добавляется один раз за победу.
 *
 * @param {number} moves - Количество ходов.
 */
export function saveResult(moves) {
  const leaderboard = loadLeaderboard();

  // Форматируем дату в ДД.ММ.ГГГГ
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const date = `${day}.${month}.${year}`;

  leaderboard.push({ moves, date });

  // Сортировка: по ходам (меньше → выше), при равенстве — по дате (раньше → выше)
  leaderboard.sort((a, b) => {
    if (a.moves !== b.moves) return a.moves - b.moves;

    // Парсим дату ДД.ММ.ГГГГ для сравнения
    const [dayA, monthA, yearA] = a.date.split('.').map(Number);
    const [dayB, monthB, yearB] = b.date.split('.').map(Number);

    const dateA = new Date(yearA, monthA - 1, dayA);
    const dateB = new Date(yearB, monthB - 1, dayB);

    return dateA - dateB;
  });

  // Выводим только топ-10
  const top10 = leaderboard.slice(0, 10);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(top10));
  } catch (error) {
    console.error('Ошибка записи в localStorage:', error);
  }
}
