import React, { useEffect, useMemo } from 'react';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';

/**
 * Выпадающее меню для навигации по конспектам (Conspects) текущего раздела (Part).
 * Загружает навигацию по конспектам и отображает NavPopup, если нужно.
 *
 * @component
 * @returns {JSX.Element|null} Popup-меню по конспектам либо null, если не требуется.
 */
export const ConspectsNavPopup: React.FC = () => {
  const { currentPart, siteNav, partNavArray, showPartNav, setShowPartNav, loadPartNav } =
    useAppContext();

  const partNav = useMemo(
    () => partNavArray[currentPart?.id] || [],
    [partNavArray, currentPart?.id]
  );

  useEffect(() => {
    if (partNav.length === 0 && siteNav[currentPart.id]?.path) {
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
