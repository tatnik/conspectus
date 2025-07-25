import { useEffect, useState } from 'react';
import { HeadingInfo } from 'src/types/heading';

/**
 * Хук для определения и управления активным заголовком в структуре markdown-документа при скролле.
 *
 * Используется для подсветки текущего раздела в боковой навигации (например, Table of Contents).
 *
 * Основная логика:
 *   - Отслеживает прокрутку контейнера scrollRef
 *   - Находит ближайший к верху контейнера заголовок (heads)
 *   - Возвращает индекс активного заголовка, либо выбранный пользователем selectedIndex (если не -1)
 *   - При скролле сбрасывает selectedIndex в -1 (режим автоподсветки)
 *
 * @param {HeadingInfo[]} heads — Список заголовков (id, уровень, текст)
 * @param {React.RefObject<HTMLElement>} scrollRef — ref на элемент-контейнер с текстом
 * @param {number} selectedIndex — Индекс выбранного пользователем заголовка (-1 — автоподсветка)
 * @param {(idx: number) => void} setSelectedIndex — Setter для смены выбранного индекса
 *
 * @returns {number} Индекс активного (подсвеченного) заголовка
 *
 * @example
 * const activeIdx = useActiveHeading(heads, markdownRef, selectedIndex, setSelectedIndex);
 */
export const useActiveHeading = (
  heads: HeadingInfo[],
  scrollRef: React.RefObject<HTMLElement>,
  selectedIndex: number,
  setSelectedIndex: (idx: number) => void
) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || !heads.length) return undefined;

    const handleScroll = () => {
      // На любом скролле — сбрасываем selectedIndex
      setSelectedIndex(-1);

      //Собираем позиции заголовков относительно контейнера
      const offsets = heads.map((head) => {
        const elem = container.querySelector(`#${head.id}`);
        return elem
          ? elem.getBoundingClientRect().top - container.getBoundingClientRect().top
          : Infinity;
      });

      //  Находим максимальный заголовок, который не выше верха области (или близко к нему)
      const threshold = 20; //  определяет "насколько выше" может быть активный раздел

      let current = 0;
      for (let i = 0; i < offsets.length; i++) {
        if (offsets[i] - threshold <= 0) {
          current = i;
        }
      }

      // Если дошли до самого низа — всегда подсвечиваем последний пункт
      if (Math.abs(container.scrollHeight - container.scrollTop - container.clientHeight) < 2) {
        current = heads.length - 1;
      }
      setActiveIndex(current);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [heads, scrollRef, selectedIndex, setSelectedIndex]);

  return selectedIndex === -1 ? activeIndex : selectedIndex;
};
