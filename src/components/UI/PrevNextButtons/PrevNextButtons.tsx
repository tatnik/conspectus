import React from 'react';

import { Card } from '@gravity-ui/uikit';

import cls from './PrevNextButtons.module.scss';

import { TypeNavLink } from 'src/types/nav';

import { PrevButton } from './PrevButton';

import { NextButton } from './NextButton';

interface PrevNextButtonsProps {
  prevPost?: TypeNavLink;
  nextPost?: TypeNavLink;
}

export const PrevNextButtons = (props: PrevNextButtonsProps) => {
  const { prevPost, nextPost } = props;

  return (
    <Card
      type="container"
      theme="normal"
      className={cls.navCard}
      view="clear"
    >
      {prevPost && (
        <PrevButton
          postPath={prevPost.path}
          postName={prevPost.name}
          className={cls.prevButton}
        />
      )}
      {nextPost && (
        <NextButton
          postPath={nextPost.path}
          postName={nextPost.name}
          className={cls.nextButton}
        />
      )}
    </Card>
  );
};
