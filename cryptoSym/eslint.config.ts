import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import prettierConfig from 'eslint-config-prettier'; // 👈 Добавьте этот импорт

export default [
  // Базовые конфиги
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // Конфиг для React
  {
    files: ['**/*.{jsx,tsx}'],
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },

  // Общие настройки для всех файлов
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  prettierConfig, // 👈 Должен быть ПОСЛЕДНИМ, чтобы отключить правила ESLint, которые конфликтуют с Prettier
];
