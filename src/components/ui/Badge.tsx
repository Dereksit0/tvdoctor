import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-brand-red/60 bg-brand-red/10 px-4 py-1.5 text-xs font-medium font-sans tracking-wide text-brand-red-light ${className}`}
    >
      {children}
    </span>
  );
}
