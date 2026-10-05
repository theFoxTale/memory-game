import { shuffleArray } from '../utils/shuffle.js';

/**
 * Загружает список сказок и возвращает случайную сказку с перемешанными карточками.
 *
 * @returns {Promise<Object>} - Объект сказки с перемешанным массивом карточек.
 */
export async function fetchRandomTale() {
  try {
    const response = await fetch('./data/tales.json');
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    const tales = await response.json();

    // Случайный номер сказки
    const randomIndex = Math.floor(Math.random() * tales.length);
    return tales[randomIndex];
  } catch (error) {
    console.error('Не удалось загрузить сказки:', error);
    throw error;
  }
}

/**
 * Подготавливает колоду: создает пары, добавляет служебные поля и перемешивает.
 *
 * @param {Object[]} cards - Массив базовых карточек из JSON.
 * @returns {Object[]} - Готовая перемешанная колода.
 */
export function prepareDeck(cards) {
  // Формируем массив с парами карточек
  // Для этого добавляем каждую карточку в массив два раза
  const cardsDeck = [];
  for (const card of cards) {
    cardsDeck.push({ ...card, isFlipped: false, isMatched: false });
    cardsDeck.push({ ...card, isFlipped: false, isMatched: false });
  }

  // Перемешиваем набор карточек
  return shuffleArray(cardsDeck);
}
