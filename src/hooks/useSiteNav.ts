import { useState, useEffect } from 'react';
import { apiGetSiteNav } from 'src/data/Api';
import { TypeNavArray } from 'src/types/nav';
import { EMPTY_LINK } from 'src/constants';

export const useSiteNav = () => {
  const [siteNav, setSiteNav] = useState<TypeNavArray>([EMPTY_LINK]);
  useEffect(() => {
    apiGetSiteNav(EMPTY_LINK, setSiteNav);
  }, []);
  return siteNav;
};
