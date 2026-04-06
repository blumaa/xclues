import type { DifficultyColor } from '../types';
import './Dot.css';

interface DotProps {
  size?: 'sm' | 'lg';
  variant: 'filled' | 'empty' | 'color';
  color?: DifficultyColor;
  className?: string;
}

export function Dot({ size = 'sm', variant, color, className = '' }: DotProps) {
  const classes = [
    'xclues-dot',
    `xclues-dot--${size}`,
    `xclues-dot--${variant}`,
    color ? `xclues-dot--${color}` : '',
    className,
  ].filter(Boolean).join(' ');

  return <div className={classes} />;
}
