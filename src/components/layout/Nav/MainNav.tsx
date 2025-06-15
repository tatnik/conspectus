import React from 'react';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';
import { NavPopup } from 'src/components/UI/NavPopup/NavPopup';

interface MainNavProps {
  isMainPage: boolean;
}

// кнопка с главной навигацией (по разделам сайта)
export const MainNav = (props: MainNavProps) => {
  const { isMainPage } = props;
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
