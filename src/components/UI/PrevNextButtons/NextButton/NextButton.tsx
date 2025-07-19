import React from 'react';

import { ArrowToggle, Button, Text } from '@gravity-ui/uikit';

import { Link } from 'react-router-dom';

interface NextButtonProps {
  postPath: string;
  postName: string;
  className: string;
}
export const NextButton = (props: NextButtonProps) => {
  const { postPath, postName, className } = props;
  return (
    <Link
      to={postPath}
      className={className}
    >
      <Text
        variant="subheader-1"
        color="info"
      >
        {postName}
      </Text>
      <Button>
        <ArrowToggle direction="right" />
      </Button>
    </Link>
  );
};
