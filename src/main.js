import { createElement } from './utils/dom.js';
import './styles/main.scss';

function init() {
  const app = createElement('div', ['app'], { id: 'app' }, [
    createElement('h1', ['app__title'], {}, ['Memory Game: Русские Сказки']),
    createElement('p', ['app__subtitle'], {}, ['Загрузка...'])
  ]);

  document.body.appendChild(app);
}

document.addEventListener('DOMContentLoaded', init);
