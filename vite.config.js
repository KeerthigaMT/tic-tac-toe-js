import { defineConfig } from 'vite';

export default defineConfig({
  base: '/tic-tac-toe-js/',
  server: {
    port: 5173
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      include: ['js/**/*.js'],
      exclude: ['js/main.js'], // Exclude DOM-heavy main.js for now
      all: true
    }
  }
});
