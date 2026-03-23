import { useEffect, useRef } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useAlarmSimulation() {
  const alarmState = useAppStore((s) => s.alarmState);
  const audioRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (alarmState === 'ringing' || alarmState === 'task_active') {
      startAlarmSound();
    } else {
      stopAlarmSound();
    }

    return () => {
      stopAlarmSound();
    };
  }, [alarmState]);

  function startAlarmSound() {
    if (oscillatorRef.current) return;

    try {
      const ctx = new AudioContext();
      audioRef.current = ctx;

      const gain = ctx.createGain();
      gain.gain.value = 0.3;
      gain.connect(ctx.destination);
      gainRef.current = gain;

      // Beep pattern: beep on/off
      let isOn = true;
      const osc = ctx.createOscillator();
      osc.type = 'square';
      osc.frequency.value = 880;
      osc.connect(gain);
      osc.start();
      oscillatorRef.current = osc;

      intervalRef.current = setInterval(() => {
        if (gainRef.current) {
          isOn = !isOn;
          gainRef.current.gain.value = isOn ? 0.3 : 0;
        }
      }, 500);
    } catch {
      // Audio may not be available in test environment
    }
  }

  function stopAlarmSound() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); } catch { /* already stopped */ }
      oscillatorRef.current = null;
    }
    if (audioRef.current) {
      try { audioRef.current.close(); } catch { /* already closed */ }
      audioRef.current = null;
    }
    if (gainRef.current) {
      gainRef.current = null;
    }
  }
}
