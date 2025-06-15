export function withAsyncError<T extends (...args: any[]) => Promise<any>>(fn: T) {
  return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
    try {
      // @ts-ignore
      return await fn(...args);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}

export function withError<T extends (...args: any[]) => any>(fn: T) {
  return function (...args: Parameters<T>): ReturnType<T> {
    try {
      // @ts-ignore
      return fn(...args);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
}
