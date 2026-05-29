import { type ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  id?: string;
  className?: string;
  dark?: boolean;
  dotPattern?: boolean;
}

export default function SectionWrapper({
  children,
  id,
  className = '',
  dark = false,
  dotPattern = false,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={`relative py-20 lg:py-28 px-5 lg:px-8 ${
        dark ? 'bg-brand-dark-2' : 'bg-brand-black'
      } ${dotPattern ? 'dot-pattern' : ''} ${className}`}
    >
      <div className="max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
