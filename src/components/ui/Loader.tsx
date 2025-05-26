import React from 'react';
import { cn } from '../../utils/cn';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({ size = 'medium', className }) => {
  const sizeClasses = {
    small: 'h-4 w-4 border-2',
    medium: 'h-8 w-8 border-3',
    large: 'h-12 w-12 border-4',
  };

  return (
    <div 
      className={cn(
        'rounded-full animate-spin border-t-transparent border-primary-600',
        sizeClasses[size],
        className
      )}
    />
  );
};

export default Loader;