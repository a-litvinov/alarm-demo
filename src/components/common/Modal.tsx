import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;

  return (
    <div className="absolute inset-0 z-30 flex flex-col justify-end">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-campus-surface rounded-t-3xl p-5 pb-8 animate-slide-up max-h-[80%] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-campus-text">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-campus-bg flex items-center justify-center text-campus-muted hover:text-campus-text"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
