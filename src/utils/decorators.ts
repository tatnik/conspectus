/**
 * Декоратор для перехвата ошибок в асинхронных функциях.
 *
 * @param fn - Асинхронная функция, которую нужно обернуть
 * @returns Новая функция, автоматически перехватывающая ошибки
 */
export const withAsyncError = <Args extends unknown[], R>(
  fn: (...args: Args) => Promise<R>
): ((...args: Args) => Promise<R>) => {
  return async (...args: Args): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      // Можно добавить логирование
      throw error instanceof Error ? error : new Error(String(error));
    }
  };
};

/**
 * Декоратор для перехвата ошибок в синхронных функциях.
 *
 * @param fn - Синхронная функция, которую нужно обернуть
 * @returns Новая функция, автоматически перехватывающая ошибки
 */
export const withError = <Args extends unknown[], R>(
  fn: (...args: Args) => R
): ((...args: Args) => R) => {
  return (...args: Args): R => {
    try {
      return fn(...args);
    } catch (error) {
      // Можно добавить логирование
      throw error instanceof Error ? error : new Error(String(error));
    }
  };
};
