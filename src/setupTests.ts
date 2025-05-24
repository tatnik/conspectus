import '@testing-library/jest-dom';

// Мок для localStorage (если Vitest/jest/jsdom вдруг не определяет его сам)
if (!globalThis.localStorage) {
  let storage: Record<string, string> = {};
  // Простейший мок
  globalThis.localStorage = {
    getItem: (key) => (key in storage ? storage[key] : null),
    setItem: (key, value) => {
      storage[key] = value.toString();
    },
    removeItem: (key) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
    key: (index) => Object.keys(storage)[index] || null,
    length: 0,
  };
}
