import type { ReactNode } from 'react';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-campus-surface rounded-2xl p-4 ${className}`}>
      {children}
    </div>
  );
}
