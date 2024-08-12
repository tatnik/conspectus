import React from 'react';

import { Link, Text } from '@gravity-ui/uikit';

import cls from './MdNavigation.module.scss';
import { useAppContext } from 'src/app/AppContext/AppContextProvider';

interface Heading {
  text: string;
  id: string;
}

interface MdNavigationProps {
  headings: Heading[];
}

const MdNavigation: React.FC<MdNavigationProps> = ({ headings }) => {
  const { pageTitle } = useAppContext();
  return (
    <nav className={cls.MdNavigation}>
      <Text
        variant="subheader-1"
        color={'info'}
      >
        {pageTitle}
      </Text>
      <ul>
        {headings.map((heading) => (
          <li key={heading.id}>
            <Link href={`#${heading.id}`}>{heading.text}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MdNavigation;
