import '@testing-library/jest-dom';

// Мок window.matchMedia
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = function (query: string) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {}, // deprecated
      removeListener: () => {}, // deprecated
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as MediaQueryList;
  };
}

// Подавление warning от React Router
beforeAll(() => {
  const originalWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
      return;
    }
    originalWarn(...args);
  };
});

// Мок для localStorage
if (typeof globalThis.localStorage === 'undefined') {
  let storage: Record<string, string> = {};
  globalThis.localStorage = {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => {
      storage[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      storage = {};
    },
    key: (index: number) => Object.keys(storage)[index] || null,
    get length() {
      return Object.keys(storage).length;
    },
  };
}
