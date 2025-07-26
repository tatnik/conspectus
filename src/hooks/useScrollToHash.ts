import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Хук для автоматической прокрутки к заголовку по hash в URL.
 *
 * Используется для плавного скролла к нужному разделу после перехода по якорной ссылке в markdown или смене маршрута.
 *
 * Поведение:
 *   - После каждого изменения hash или содержимого post ищет элемент с id, равным hash (без #)
 *   - Если элемент найден — вызывает scrollIntoView с анимацией
 *   - Добавляет небольшую задержку, чтобы DOM успел отрисовать markdown и заголовки
 *
 * @param {string} post — Содержимое markdown (или другой зависимости, после которой появляются якоря)
 * @returns {void}
 *
 * @example
 * useScrollToHash(post)
 */
export const useScrollToHash = (post: string) => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    // Даем время на рендер markdown
    setTimeout(() => {
      const id = decodeURIComponent(hash.replace('#', ''));

      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }, [hash, post]);
};
