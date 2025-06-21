import { useEffect, useState } from 'react';

export const useActiveHeading = (
  heads: string[],
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
      const offsets = heads.map((_, idx) => {
        const elem = container.querySelector(`#h2-${idx}`);
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
