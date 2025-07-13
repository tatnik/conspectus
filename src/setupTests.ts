import '@testing-library/jest-dom';

// Мок для ResizeObserver
/* eslint-disable @typescript-eslint/no-empty-function */
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
  // @ts-ignore
  global.ResizeObserver = ResizeObserver;
}
/* eslint-enable @typescript-eslint/no-empty-function */

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
  const originalError = console.error;

  // Подавляем varning'и от React Router в console.warn
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
      return;
    }
    originalWarn(...args);
  };

  // Подавляем warning'и act(...) от React в console.error
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('not wrapped in act')) {
      return;
    }
    originalError(...args);
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
