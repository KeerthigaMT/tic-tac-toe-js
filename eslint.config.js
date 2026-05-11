import js from '@eslint/js';
import noUnsanitized from 'eslint-plugin-no-unsanitized';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
    plugins: {
      'no-unsanitized': noUnsanitized
    },
    rules: {
      'no-unsanitized/method': 'error',
      'no-unsanitized/property': 'error'
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly'
      }
    }
  },
  {
    files: ['js/main.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        alert: 'readonly'
      }
    }
  }
];
