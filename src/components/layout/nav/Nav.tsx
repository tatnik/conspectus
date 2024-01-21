import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { TypeNavLink } from 'src/markdown/navSite';

import { Button } from '@gravity-ui/uikit';

interface NavProps {
  nav: Array<TypeNavLink>;
}

export const Nav: React.FC<NavProps> = ({ nav }) => {
  const pageUrl = useLocation().pathname;
  return (
    <>
      {nav.map((val) => (
        <Link
          to={val.path}
          key={'l' + val.id}
        >
          <Button
            key={'b' + val.id}
            view="outlined"
            disabled={pageUrl === val.path}
          >
            {val.name}
          </Button>
        </Link>
      ))}
    </>
  );
};

export default Nav;
