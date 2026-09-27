import type { ReactNode } from 'react';

type SectionLabelProps = {
  children: ReactNode;
  className?: string;
};

export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-orange-500 ${className}`}>
      <span className="h-px w-8 bg-gradient-to-r from-orange-500 to-transparent" />
      {children}
    </div>
  );
}
