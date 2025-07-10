import React from 'react';
import { NavList } from '../../UI/NavList/NavList';
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
