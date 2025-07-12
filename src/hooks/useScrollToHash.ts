import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
