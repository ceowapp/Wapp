import React from 'react';
import { BetweenVerticalEnd } from 'lucide-react';
import BaseButton from './base-button';

const InsertBelowButton = ({
  onClick,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <BaseButton
      icon={<BetweenVerticalEnd />}
      buttonProps={{ 'aria-label': 'shift message up' }}
      onClick={onClick}
    />
  );
};

export default InsertBelowButton;