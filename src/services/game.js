import { gameState, resetGameState } from './state';
import { updateCounters } from '../components/counters';
import { prepareDeck } from "./api";
import { renderBoard } from "../components/board";
import { showVictoryModal } from "../components/victoryModal";

/**
 * Обрабатывает клик по карточке.
 *
 * @param {HTMLElement} cardElement - DOM-элемент карточки.
 */
export function handleCardClick(cardElement) {
  // Игнорируем клики, если игра заблокирована
  if (gameState.isLocked) return;

  // Игнорируем клики по уже открытым или найденным карточкам
  if (cardElement.classList.contains('card--flipped') ||
    cardElement.classList.contains('card--matched')) {
    return;
  }

  // Получаем данные карточки из DOM
  const pairId = Number(cardElement.dataset.pairId);
  const cardData = gameState.cards.find(card => card.pairId === pairId);

  if (!cardData) return;

  // Переворачиваем карточку
  flipCard(cardElement, cardData);

  // Добавляем в список открытых
  gameState.flippedCards.push({ element: cardElement, data: cardData });

  // Если открыты две карточки — проверяем совпадение
  if (gameState.flippedCards.length === 2) {
    gameState.moves++;
    updateCounters(gameState.moves, gameState.matchedPairs);

    checkMatch();
  }
}

/**
 * Переворачивает карточку (добавляет CSS-класс).
 *
 * @param {HTMLElement} cardElement
 * @param {Object} cardData
 */
function flipCard(cardElement, cardData) {
  cardElement.classList.add('card--flipped');
  cardData.isFlipped = true;
}

/**
 * Проверяет совпадение двух открытых карточек.
 */
function checkMatch() {
  const [first, second] = gameState.flippedCards;

  if (first.data.pairId === second.data.pairId) {
    // Совпадение!
    handleMatch(first.element, second.element);
  } else {
    // Не совпадение — закрываем через задержку
    handleMismatch(first.element, second.element);
  }
}

/**
 * Обрабатывает совпадение пары.
 *
 * @param {HTMLElement} firstCard
 * @param {HTMLElement} secondCard
 */
function handleMatch(firstCard, secondCard) {
  // Добавляем класс "найдено"
  firstCard.classList.add('card--matched');
  secondCard.classList.add('card--matched');

  // Обновляем состояние
  gameState.matchedPairs++;
  updateCounters(gameState.moves, gameState.matchedPairs);

  // Очищаем список открытых карточек
  gameState.flippedCards = [];

  // Проверяем победу
  if (gameState.matchedPairs === 8) {
    handleVictory();
  }
}

/**
 * Обрабатывает несовпадение пары.
 *
 * @param {HTMLElement} firstCard
 * @param {HTMLElement} secondCard
 */
function handleMismatch(firstCard, secondCard) {
  // Блокируем игру
  gameState.isLocked = true;

  // Запускаем таймер закрытия (1000 мс — в пределах 700-1500 мс)
  gameState.closeTimerId = setTimeout(() => {
    closeCards(firstCard, secondCard);
  }, 1000);
}

/**
 * Закрывает две несовпавшие карточки.
 *
 * @param {HTMLElement} firstCard
 * @param {HTMLElement} secondCard
 */
function closeCards(firstCard, secondCard) {
  firstCard.classList.remove('card--flipped');
  secondCard.classList.remove('card--flipped');

  // Обновляем состояние
  firstCard.dataset.isFlipped = 'false';
  secondCard.dataset.isFlipped = 'false';

  gameState.flippedCards = [];
  gameState.isLocked = false;
  gameState.closeTimerId = null;
}

/**
 * Обрабатывает победу (все 8 пар найдены).
 */
function handleVictory() {
  showVictoryModal(gameState.moves);
}

/**
 * Начинает новую игру.
 *
 * @param {Function} startGameFn - Функция запуска игры из main.js.
 */
export function startNewGame(startGameFn) {
  // Сбрасываем состояние
  resetGameState();

  // Перезапускаем игру
  startGameFn();
}

/**
 * Перезапускает игру (кнопка "Новая игра").
 * Отменяет таймеры, сбрасывает состояние и перемешивает карты.
 */
export function restartGame() {
  // Отменяем таймер закрытия несовпавшей пары
  if (gameState.closeTimerId !== null) {
    clearTimeout(gameState.closeTimerId);
    gameState.closeTimerId = null;
  }

  // Сбрасываем состояние
  gameState.flippedCards = [];
  gameState.moves = 0;
  gameState.matchedPairs = 0;
  gameState.isLocked = false;

  // Закрываем модальное окно победы, если оно открыто (функцию добавим позже)
  const victoryModal = document.querySelector('.modal--open');
  if (victoryModal) {
    victoryModal.remove();
    document.body.style.overflow = '';
  }

  // Перемешиваем текущую сказку заново
  const newDeck = prepareDeck(gameState.currentTale.cards);
  gameState.cards = newDeck;

  // Обновляем счетчики
  updateCounters(0, 0);

  // Перерисовываем игровое поле
  const oldBoard = document.querySelector('.board');
  const newBoard = renderBoard(newDeck);
  if (oldBoard) {
    oldBoard.replaceWith(newBoard);
  }
}
