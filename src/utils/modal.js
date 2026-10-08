import { createElement } from './dom.js';

/**
 * Создаёт универсальную оболочку модального окна.
 *
 * @param {HTMLElement} content - Содержимое модального окна.
 * @param {Object} [options={}] - Дополнительные опции.
 * @param {Function} [options.onClose] - Коллбэк при закрытии.
 *
 * @returns {HTMLElement} - Готовый DOM-элемент модального окна.
 */
export function createModal(content, options = {}) {
  // Затемнённый фон
  const overlay = createElement('div', ['modal', 'modal--open'], {
    'aria-modal': 'true',
    role: 'dialog',
  });

  // Контейнер содержимого
  const dialog = createElement('div', ['modal__dialog']);
  dialog.appendChild(content);

  // Закрытие по клику на фон (overlay), клик по контейнеру не закрывает модалку
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      closeModal(overlay);
      if (options.onClose) options.onClose();
    }
  });

  // Закрытие по Escape
  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      closeModal(overlay);
      document.removeEventListener('keydown', handleEscape);
      if (options.onClose) options.onClose();
    }
  };
  document.addEventListener('keydown', handleEscape);

  overlay.appendChild(dialog);
  return overlay;
}

/**
 * Открывает модальное окно: добавляет в DOM и блокирует прокрутку.
 *
 * @param {HTMLElement} modalElement
 */
export function openModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.add('modal--open');
  document.body.style.overflow = 'hidden'; // Блокирует прокрутку
  document.body.appendChild(modalElement);
}

/**
 * Закрывает модальное окно с анимацией и восстанавливает прокрутку.
 *
 * @param {HTMLElement} modalElement
 */
export function closeModal(modalElement) {
  if (!modalElement) return;
  modalElement.classList.remove('modal--open');
  document.body.style.overflow = ''; // Восстанавливает прокрутку

  // Удаление из DOM после  окончания CSS-анимации
  setTimeout(() => {
    if (modalElement.parentNode) {
      modalElement.remove();
    }
  }, 300);
}
