import React from 'react';

import { getNavFromIndex } from 'src/utils/getNavFromIndex';
import { getFile } from 'src/utils/useGetPost';
import Nav, { TypeNavLink } from '../Nav/Nav';

import { Button, Popup } from '@gravity-ui/uikit';

export interface PopupNavProps {
  currentPart: TypeNavLink;
}

export const PopupNav = (props: PopupNavProps) => {
  const { currentPart } = props;
  const [navPart, setNavPart] = React.useState([{ id: 0, name: '', path: '/' }]);
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  console.log('PopupNav currentPart:');
  console.log(currentPart);

  const getIndex = async () => {
    if (currentPart.id === 0) {
      setNavPart([]);
      console.log('1');
    } else {
      const res = await getFile(currentPart.path + '/index.md');
      if (res.err === '') {
        setNavPart(getNavFromIndex(res.text));
        console.log('2');
      } else {
        setNavPart([]);
        console.log(res.err);
      }
    }
  };

  React.useEffect(() => {
    console.log('LayoutEffect navPart:');
    getIndex();
    console.log(navPart);
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
        />
      </Popup>
    </>
  );
};
