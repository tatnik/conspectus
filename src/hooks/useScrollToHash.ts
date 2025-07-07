import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToHash(deps: any[] = []) {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    console.log(`hash ${hash}`);
    // Даем время на рендер markdown
    setTimeout(() => {
      const id = decodeURIComponent(hash.replace('#', ''));
      console.log(`id ${id}`);
      const el = document.getElementById(id);
      //console.log(`el ${el.id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 500); // задержка нужна, чтобы markdown успел отрисоваться
    // eslint-disable-next-line
  }, [hash, ...deps]);
}
