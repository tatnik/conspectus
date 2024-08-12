import React from 'react';
import NavList from '../../UI/NavList/NavList';
import { Button, Popup, Link as LinkGravity } from '@gravity-ui/uikit';
import cls from './NavPopup.module.scss';
import { TypeNavLink } from 'src/app/App';

interface TypeNavPopupProps {
  navLinks: TypeNavLink[];
  placement?: 'bottom' | 'top';
  handleOnClick: (val: TypeNavLink) => void;
}

export const NavPopup = (props: TypeNavPopupProps) => {
  const { navLinks, placement = 'bottom', handleOnClick } = props;
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
      >
        ...
      </Button>
      <Popup
        anchorRef={buttonRef}
        open={open}
        placement={placement}
        className={cls.NavPopup}
        hasArrow={true}
        onOutsideClick={() => setOpen(false)}
      >
        <NavList
          navLinkArray={navLinks}
          classNameList={cls.nav}
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
