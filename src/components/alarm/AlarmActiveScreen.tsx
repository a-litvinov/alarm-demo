import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useCountdown, formatCountdown } from '../../hooks/useCountdown';
import { useAlarmSimulation } from '../../hooks/useAlarmSimulation';
import { MathTaskView } from './MathTaskView';
import { ShakeTaskView } from './ShakeTaskView';

export function AlarmActiveScreen() {
  const alarmState = useAppStore((s) => s.alarmState);
  const taskType = useAppStore((s) => s.taskType);
  const remainingSeconds = useAppStore((s) => s.remainingSeconds);
  const setAlarmState = useAppStore((s) => s.setAlarmState);
  const setOversleepNotified = useAppStore((s) => s.setOversleepNotified);
  const addNotification = useAppStore((s) => s.addNotification);
  const addEventLog = useAppStore((s) => s.addEventLog);
  const setScenarioStep = useAppStore((s) => s.setScenarioStep);
  const assignedKeeperId = useAppStore((s) => s.assignedKeeperId);

  useCountdown();
  useAlarmSimulation();

  // Handle timeout → oversleep
  useEffect(() => {
    if (remainingSeconds === 0 && (alarmState === 'ringing' || alarmState === 'task_active')) {
      setAlarmState('overslept');
      setOversleepNotified(true);
      addEventLog('Время вышло! Алексей проспал');
      setScenarioStep(6);

      if (assignedKeeperId) {
        addNotification(
          'oversleep_alert',
          'Проспал!',
          'Алексей не смог проснуться! Позвони ему!',
          'keeper'
        );
        addEventLog('Уведомление отправлено хранителю');
        setScenarioStep(7);
      }
    }
  }, [remainingSeconds, alarmState, setAlarmState, setOversleepNotified, addNotification, addEventLog, setScenarioStep, assignedKeeperId]);

  if (alarmState !== 'ringing' && alarmState !== 'task_active' && alarmState !== 'overslept') {
    return null;
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="absolute inset-0 z-40 bg-campus-bg flex flex-col items-center justify-center p-6">
      {/* Pulsating alarm icon */}
      <div className="text-6xl mb-4 animate-pulse-alarm">
        ⏰
      </div>

      {/* Current time */}
      <div className="text-campus-text text-5xl font-bold font-mono mb-2">
        {timeStr}
      </div>

      {/* Countdown */}
      {alarmState !== 'overslept' && (
        <div className={`text-xl font-mono mb-6 ${
          remainingSeconds <= 60 ? 'text-campus-danger animate-pulse' : 'text-campus-warning'
        }`}>
          Осталось: {formatCountdown(remainingSeconds)}
        </div>
      )}

      {alarmState === 'overslept' && (
        <div className="text-campus-danger text-lg font-bold mb-6 animate-pulse">
          Время вышло!
        </div>
      )}

      {/* Task area */}
      {(alarmState === 'ringing' || alarmState === 'task_active') && (
        <div className="w-full">
          {taskType === 'math' ? <MathTaskView /> : <ShakeTaskView />}
        </div>
      )}

      {alarmState === 'overslept' && (
        <div className="text-campus-muted text-sm text-center">
          Хранитель уведомлён. Переключитесь на роль Хранителя.
        </div>
      )}
    </div>
  );
}
