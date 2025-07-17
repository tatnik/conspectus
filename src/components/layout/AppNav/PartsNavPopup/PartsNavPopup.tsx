import React from 'react';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';

export interface PartsNavPopupProps {
  /** Флаг — находимся ли на главной странице (тогда меню не показывается) */
  isMainPage: boolean;
}

/**
 * Выпадающее меню по разделам (Parts) приложения.
 * Отображает NavPopup с выбором раздела.
 *
 * @component
 * @param {PartsNavPopupProps} props
 * @returns {JSX.Element|null} Popup-меню по разделам либо null на главной.
 */
export const PartsNavPopup: React.FC<PartsNavPopupProps> = ({ isMainPage }) => {
  const { setCurrentPart, setShowPartNav, siteNav } = useAppContext();

  if (isMainPage) return null;

  return (
    <NavPopup
      navLinks={siteNav.slice(1)}
      handleOnClick={(val) => {
        setCurrentPart(val);
        setShowPartNav(false);
      }}
    />
  );
};
