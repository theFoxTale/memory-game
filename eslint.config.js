import js from '@eslint/js';
import globals from 'globals';

export default [
  // Игнорируемые папки
  {
    ignores: ['dist/**', 'node_modules/**', 'public/**'],
  },

  // Базовые рекомендуемые правила ESLint
  js.configs.recommended,

  {
    files: ['src/**/*.js', 'vite.config.js', 'eslint.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // Используем официальный пакет globals для всех браузерных API
      globals: globals.browser,
    },

    rules: {
      // Запрет присваивания innerHTML и outerHTML через селекторы
      'no-restricted-syntax': [
        'error',
        {
          selector: 'AssignmentExpression[left.property.name="innerHTML"]',
          message: '❌ innerHTML запрещен заданием RS School. Используй createElement и textContent.',
        },
        {
          selector: 'AssignmentExpression[left.property.name="outerHTML"]',
          message: '❌ outerHTML запрещен заданием RS School.',
        },
        {
          selector: 'CallExpression[callee.property.name="insertAdjacentHTML"]',
          message: '❌ insertAdjacentHTML запрещен заданием.',
        },
        {
          selector: 'CallExpression[callee.object.name="document"][callee.property.name="write"]',
          message: '❌ document.write запрещен заданием.',
        },
        {
          selector: 'CallExpression[callee.object.name="document"][callee.property.name="writeln"]',
          message: '❌ document.writeln запрещен заданием.',
        },
      ],

      // Запрет alert, confirm, prompt (-100 баллов)
      'no-alert': 'error',

      // Предупреждение о неиспользуемых переменных (не ошибка, чтобы не мешать разработке)
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],

      // Запрет использования var (только let и const)
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];
