import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useCountdown() {
  const alarmState = useAppStore((s) => s.alarmState);
  const remainingSeconds = useAppStore((s) => s.remainingSeconds);
  const setRemainingSeconds = useAppStore((s) => s.setRemainingSeconds);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (alarmState !== 'ringing' && alarmState !== 'task_active') {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      const current = useAppStore.getState().remainingSeconds;
      if (current <= 1) {
        clearInterval(intervalRef.current!);
        intervalRef.current = null;
        setRemainingSeconds(0);
      } else {
        setRemainingSeconds(current - 1);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [alarmState, setRemainingSeconds]);

  return { remainingSeconds };
}

export function formatCountdown(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
