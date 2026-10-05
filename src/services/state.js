/**
 * Состояние игры.
 */
export const gameState = {
  /** @type {Object[]} - Все карточки на поле */
  cards: [],

  /** @type {Object[]} - Открытые карточки (максимум 2) */
  flippedCards: [],

  /** @type {number} - Счетчик ходов */
  moves: 0,

  /** @type {number} - Счетчик найденных пар */
  matchedPairs: 0,

  /** @type {boolean} - Флаг блокировки (пока открыта несовпавшая пара) */
  isLocked: false,

  /** @type {number|null} - ID таймера закрытия несовпавшей пары */
  closeTimerId: null,

  /** @type {Object|null} - Данные текущей сказки */
  currentTale: null,
};

/**
 * Сбрасывает состояние игры для нового раунда.
 */
export function resetGameState() {
  gameState.flippedCards = [];
  gameState.moves = 0;
  gameState.matchedPairs = 0;
  gameState.isLocked = false;

  // Отменяем таймер, если он был
  if (gameState.closeTimerId !== null) {
    clearTimeout(gameState.closeTimerId);
    gameState.closeTimerId = null;
  }

  // Сбрасываем статус всех карточек
  for (const card of gameState.cards) {
    card.isFlipped = false;
    card.isMatched = false;
  }
}
