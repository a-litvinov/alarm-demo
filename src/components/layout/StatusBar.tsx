import { useEffect, useState } from 'react';

export function StatusBar() {
  const [time, setTime] = useState(formatTime());

  useEffect(() => {
    const interval = setInterval(() => setTime(formatTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-between px-6 py-1.5 text-campus-text text-xs font-semibold">
      <span>{time}</span>
      <div className="flex items-center gap-1">
        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="0.5" />
          <rect x="4" y="5" width="3" height="7" rx="0.5" />
          <rect x="8" y="2" width="3" height="10" rx="0.5" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="20" height="12" viewBox="0 0 20 12" fill="currentColor">
          <rect x="0.5" y="0.5" width="17" height="11" rx="2" stroke="currentColor" strokeWidth="1" fill="none" />
          <rect x="2" y="2" width="12" height="8" rx="1" />
          <rect x="18" y="3.5" width="2" height="5" rx="0.5" />
        </svg>
      </div>
    </div>
  );
}

function formatTime() {
  const now = new Date();
  return now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}
