import React from 'react';
import { NavList } from 'src/components/UI/NavList/NavList';
import { Button, Popup, Link as LinkGravity, ArrowToggle } from '@gravity-ui/uikit';
import cls from './NavPopup.module.scss';
import { TypeNavLink } from 'src/types/nav';
import { PopperPlacement } from '@gravity-ui/uikit/build/esm/hooks/private';

interface TypeNavPopupProps {
  navLinks: TypeNavLink[];
  placement?: PopperPlacement;
  handleOnClick: (val: TypeNavLink) => void;
  strictHash?: boolean;
}

/**
 * Выпадающее меню навигации.
 *
 * Использует компонент Popup для отображения NavList в выпадающем окне по нажатию на кнопку.
 * Каждый пункт меню обёрнут в ссылку GravityLink, при клике вызывается обработчик handleOnClick и popup закрывается.
 *
 * @param {Object} props - Свойства компонента NavPopup
 * @param {TypeNavLink[]} props.navLinks - Массив объектов навигации (id, name, path).
 * @param {PopperPlacement} [props.placement='bottom'] - Положение popup относительно кнопки (например, 'bottom', 'top').
 * @param {(val: TypeNavLink) => void} props.handleOnClick - Обработчик нажатия на пункт меню (получает объект navLink).
 * @param {boolean} [props.strictHash] - Сравнивать ли hash в url при определении активного пункта.
 *
 * @returns {JSX.Element} Кнопка с выпадающим списком (popup), содержащим навигацию/NavList.
 *
 * @example
 * <NavPopup
 *   navLinks={[{ id: 1, name: 'Главная', path: '/' }]}
 *   handleOnClick={(link) => { ... }}
 * />
 */
export const NavPopup = (props: TypeNavPopupProps) => {
  const { navLinks, placement = 'bottom', handleOnClick, strictHash } = props;
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        <ArrowToggle direction="bottom" />
      </Button>
      <Popup
        anchorRef={buttonRef}
        open={open}
        placement={placement}
        className={cls.NavPopup}
        hasArrow={true}
        onOutsideClick={() => setOpen(false)}
        keepMounted={true}
      >
        <NavList
          navLinkArray={navLinks}
          classNameList={cls.nav}
          strictHash={strictHash}
          renderProps={(val) => {
            return (
              <LinkGravity
                onClick={() => {
                  setOpen(false);
                  handleOnClick(val);
                }}
              >
                {val.name}
              </LinkGravity>
            );
          }}
        />
      </Popup>
    </>
  );
};
