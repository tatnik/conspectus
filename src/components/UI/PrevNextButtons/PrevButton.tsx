import React from 'react';

import { ArrowToggle, Button, Text } from '@gravity-ui/uikit';

import { Link } from 'react-router-dom';

interface PrevButtonProps {
  postPath: string;
  postName: string;
  className: string;
}
export const PrevButton = (props: PrevButtonProps) => {
  const { postPath, postName, className } = props;
  return (
    <Link
      to={postPath}
      className={className}
    >
      <Button>
        <ArrowToggle direction="left" />
      </Button>
      <Text
        variant="subheader-1"
        color="info"
      >
        {postName}
      </Text>
    </Link>
  );
};
