import { XButton } from '../atoms';
import type { ReactNode } from 'react';

interface IconButtonProps {
  onClick: () => void;
  'aria-label': string;
  children: ReactNode;
}

export function IconButton({ onClick, 'aria-label': ariaLabel, children }: IconButtonProps) {
  return (
    <XButton variant="ghost" size="md" iconOnly onClick={onClick} aria-label={ariaLabel}>
      {children}
    </XButton>
  );
}
