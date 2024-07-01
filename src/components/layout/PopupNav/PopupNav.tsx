import React from 'react';

import Nav, { TypeNavLink } from '../Nav/Nav';

import { Button, Popup, Link as LinkGravity } from '@gravity-ui/uikit';
import { getFile, getNavFromIndex } from 'src/utils/utils';

import cls from './PopupNav.module.scss';

export interface PopupNavProps {
  currentPart: TypeNavLink;
}

export const PopupNav = (props: PopupNavProps) => {
  const { currentPart } = props;
  const [navPart, setNavPart] = React.useState([{ id: 0, name: '', path: '/' }]);
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);

  const getIndex = async () => {
    if (currentPart.id === 0) {
      setNavPart([]);
    } else {
      const res = await getFile(currentPart.path + '/index.md');
      setNavPart(res.err === '' ? getNavFromIndex(res.text) : []);
    }
  };

  React.useEffect(() => {
    getIndex();
  }, [currentPart]);

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
        placement="bottom"
        className={cls.PopupNav}
        hasArrow={true}
        onOutsideClick={() => setOpen(false)}
      >
        <Nav
          nav={navPart}
          classNameList={cls.nav}
          renderProps={(val) => {
            return <LinkGravity onClick={() => setOpen(false)}>{val.name}</LinkGravity>;
          }}
        />
      </Popup>
    </>
  );
};
