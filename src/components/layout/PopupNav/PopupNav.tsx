import React from 'react';

import Nav, { TypeNavLink } from '../Nav/Nav';

import { Button, Popup } from '@gravity-ui/uikit';
import { getFile, getNavFromIndex } from 'src/utils/utils';

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
      >
        <Nav
          nav={navPart}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
          setOpen={setOpen}
        />
      </Popup>
    </>
  );
};
