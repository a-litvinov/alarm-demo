import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { Button } from '../common/Button';

export function MathTaskView() {
  const [userAnswer, setUserAnswer] = useState('');
  const [showError, setShowError] = useState(false);
  const taskProblem = useAppStore((s) => s.taskProblem);
  const taskAnswer = useAppStore((s) => s.taskAnswer);
  const setAlarmState = useAppStore((s) => s.setAlarmState);
  const addKarmaEvent = useAppStore((s) => s.addKarmaEvent);
  const addEventLog = useAppStore((s) => s.addEventLog);
  const setScenarioStep = useAppStore((s) => s.setScenarioStep);

  const handleSubmit = () => {
    const parsed = parseInt(userAnswer, 10);
    if (parsed === taskAnswer) {
      setAlarmState('completed');
      addKarmaEvent('self_wakeup', 1, 'Проснулся самостоятельно');
      addEventLog('Будильник отключён (задание выполнено)');
      setScenarioStep(8);
    } else {
      setShowError(true);
      setUserAnswer('');
      setTimeout(() => setShowError(false), 1500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-campus-muted text-sm">Реши пример:</div>
      <div className="text-campus-text text-3xl font-bold font-mono">
        {taskProblem}
      </div>

      {showError && (
        <div className="text-campus-danger text-sm font-medium animate-shake">
          Неправильно! Попробуй ещё раз
        </div>
      )}

      <input
        type="number"
        inputMode="numeric"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        placeholder="Ответ"
        className="w-32 bg-white/10 text-campus-text text-2xl text-center rounded-xl px-4 py-3 border border-campus-border focus:border-campus-primary outline-none font-mono"
        autoFocus
      />

      <Button onClick={handleSubmit} className="px-8">
        Ответить
      </Button>
    </div>
  );
}
