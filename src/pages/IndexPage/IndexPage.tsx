import React, { SetStateAction, useState } from 'react';
import { ShowMd } from 'src/components/ShowMd/ShowMd';
import { TypeNavLink } from 'src/markdown/navSite';
import { useGetPost } from 'src/utils/useGetPost';

import cls from './IndexPage.module.scss';

export interface IndexPageProps {
  setTitlePage: React.Dispatch<SetStateAction<string>>;
  navItem: TypeNavLink;
}

export const IndexPage: React.FC<IndexPageProps> = (props) => {
  const { setTitlePage, navItem } = props;
  setTitlePage(`КОНСПЕКТЫ  ${navItem.name} `);

  const fileName = navItem.path + '/index.md';
  const [post, setPost] = useState('');

  useGetPost({ fileName, setPost });

  return (
    <main className={cls.IndexPage}>
      <ShowMd
        post={post}
        isIndex={true}
      />
    </main>
  );
};
