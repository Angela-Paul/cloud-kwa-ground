import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card({ children, className = '', onClick, hover = false }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        glass-card p-6
        ${hover ? 'transition-all duration-200 hover:border-violet/40 hover:shadow-lg hover:shadow-violet/10 cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
