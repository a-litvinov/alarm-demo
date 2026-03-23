import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

const TARGET_TAPS = 50;

export function ShakeTaskView() {
  const [taps, setTaps] = useState(0);
  const setAlarmState = useAppStore((s) => s.setAlarmState);
  const addKarmaEvent = useAppStore((s) => s.addKarmaEvent);
  const addEventLog = useAppStore((s) => s.addEventLog);
  const setScenarioStep = useAppStore((s) => s.setScenarioStep);

  const progress = Math.min(taps / TARGET_TAPS, 1);

  const handleTap = () => {
    const next = taps + 1;
    setTaps(next);
    if (next >= TARGET_TAPS) {
      setAlarmState('completed');
      addKarmaEvent('self_wakeup', 1, 'Проснулся самостоятельно');
      addEventLog('Будильник отключён (задание выполнено)');
      setScenarioStep(8);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-campus-muted text-sm">Тряси телефон! (нажимай быстро)</div>

      <button
        onClick={handleTap}
        className="w-32 h-32 rounded-full bg-campus-danger/20 border-4 border-campus-danger text-campus-danger text-4xl font-bold active:scale-95 transition-transform"
      >
        📳
      </button>

      <div className="w-48 h-3 bg-campus-border rounded-full overflow-hidden">
        <div
          className="h-full bg-campus-primary rounded-full transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="text-campus-text text-sm font-mono">
        {taps} / {TARGET_TAPS}
      </div>
    </div>
  );
}
