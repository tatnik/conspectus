import React, { useEffect, useMemo } from 'react';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';

// кнопка с навигацией по конспектам внутри раздела
export const SectionNav = () => {
  const { currentPart, siteNav, partNavArray, showPartNav, setShowPartNav, loadPartNav } =
    useAppContext();

  const partNav = useMemo(
    () => partNavArray[currentPart?.id] || [],
    [partNavArray, currentPart?.id]
  );

  useEffect(() => {
    if (partNav.length === 0 && siteNav[currentPart.id]?.path) {
      // Если нет навигации для текущего раздела, получаем ее из файла
      loadPartNav(currentPart.id, siteNav[currentPart.id].path);
    }
  }, [currentPart, siteNav, loadPartNav, partNav.length]);

  if (!showPartNav || partNav.length === 0) return null;
  return (
    <NavPopup
      navLinks={partNav}
      handleOnClick={() => setShowPartNav(true)}
    />
  );
};
