import { onCLS, onFCP, onLCP, onINP, onTTFB, ReportCallback } from 'web-vitals';

/**
 * Сбор web-vitals метрик. Передай функцию-колбэк (например, для отправки в аналитику).
 * @param onReport Функция обратного вызова для полученных метрик.
 * @return {void}
 */
const reportWebVitals = (onReport?: ReportCallback): void => {
  if (typeof onReport !== 'function') return;
  onCLS(onReport);
  onFCP(onReport);
  onLCP(onReport);
  onINP(onReport);
  onTTFB(onReport);
};

export default reportWebVitals;
