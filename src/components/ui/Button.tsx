'use client';

import { type ReactNode } from 'react';

type Variant = 'primary' | 'outline' | 'white';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  target?: string;
  rel?: string;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-brand-red text-white border border-brand-red hover:bg-brand-red-dark btn-glow',
  outline:
    'bg-transparent text-white border border-white/60 hover:border-white hover:bg-white/5 transition-all duration-200',
  white:
    'bg-white text-brand-red border border-white hover:bg-brand-gray-light transition-all duration-200',
};

export default function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  className = '',
  target,
  rel,
  fullWidth = false,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold font-sans tracking-wide cursor-pointer select-none min-h-[44px]';
  const classes = `${base} ${variantClasses[variant]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
