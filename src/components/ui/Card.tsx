import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'md'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  };

  const hoverClasses = hover 
    ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-200' 
    : '';

  return (
    <div className={`
      bg-white rounded-xl border border-gray-100
      ${paddingClasses[padding]}
      ${shadowClasses[shadow]}
      ${hoverClasses}
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;