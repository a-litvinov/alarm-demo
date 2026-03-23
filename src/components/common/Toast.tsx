import { useEffect } from 'react';

interface Props {
  message: string;
  type?: 'info' | 'success' | 'error';
  onDismiss: () => void;
  duration?: number;
}

const typeClasses = {
  info: 'bg-campus-primary',
  success: 'bg-campus-success',
  error: 'bg-campus-danger',
};

export function Toast({ message, type = 'info', onDismiss, duration = 3000 }: Props) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [onDismiss, duration]);

  return (
    <div className={`${typeClasses[type]} text-white text-xs font-medium px-4 py-2.5 rounded-xl shadow-lg animate-slide-up`}>
      {message}
    </div>
  );
}
