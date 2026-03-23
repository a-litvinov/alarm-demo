import { useAppStore } from '../../store/useAppStore';
import { generateMathProblem } from '../../utils/mathProblems';

const SCENARIO_LABELS: Record<number, string> = {
  1: 'Загрузка расписания',
  2: 'Настройка будильника',
  3: 'Назначение хранителя',
  4: 'Ответ хранителя',
  5: 'Срабатывание будильника',
  6: 'Уведомление хранителя',
  7: 'Подтверждение пробуждения',
  8: 'Просмотр рейтинга',
};

export function DemoControls() {
  const currentRole = useAppStore((s) => s.currentRole);
  const setRole = useAppStore((s) => s.setRole);
  const scenarioStep = useAppStore((s) => s.scenarioStep);
  const eventLog = useAppStore((s) => s.eventLog);
  const alarmState = useAppStore((s) => s.alarmState);

  const handleTriggerAlarm = () => {
    const store = useAppStore.getState();
    const problem = generateMathProblem();
    store.setTask(problem.display, problem.answer);
    store.setAlarmState('ringing');
    store.setRemainingSeconds(300);
    store.setRole('anchor');
    store.setActiveTab('home');
    store.addEventLog('Будильник сработал!');
    store.setScenarioStep(5);
  };

  const handleFastForward = () => {
    useAppStore.getState().setRemainingSeconds(0);
    useAppStore.getState().addEventLog('Промотка: 5 минут прошли');
  };

  const handleReset = () => {
    const store = useAppStore.getState();
    store.resetDemo();
    store.resetAlarm();
    store.resetKeeper();
    store.resetKarma();
    store.clearNotifications();
    store.addEventLog('Демо сброшено');
  };

  return (
    <div className="w-[280px] bg-[#111122] rounded-2xl border border-campus-border p-5 flex flex-col gap-4 text-campus-text text-sm">
      <h2 className="text-base font-bold text-campus-primary-light tracking-wide uppercase">
        Панель управления
      </h2>

      {/* Role switcher */}
      <div>
        <div className="text-campus-muted text-xs mb-1.5">Текущая роль:</div>
        <div className="flex bg-campus-surface rounded-lg overflow-hidden">
          <button
            onClick={() => setRole('anchor')}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${
              currentRole === 'anchor'
                ? 'bg-campus-primary text-white'
                : 'text-campus-muted hover:text-white'
            }`}
          >
            Якорь
          </button>
          <button
            onClick={() => setRole('keeper')}
            className={`flex-1 py-2 text-xs font-semibold transition-colors ${
              currentRole === 'keeper'
                ? 'bg-campus-primary text-white'
                : 'text-campus-muted hover:text-white'
            }`}
          >
            Хранитель
          </button>
        </div>
      </div>

      {/* Scenario step */}
      <div className="bg-campus-surface rounded-lg p-3">
        <div className="text-campus-muted text-xs">Сценарий</div>
        <div className="text-base font-bold mt-0.5">Шаг {scenarioStep} из 8</div>
        <div className="text-campus-secondary text-xs mt-0.5">
          {SCENARIO_LABELS[scenarioStep] ?? ''}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-2">
        <button
          onClick={handleTriggerAlarm}
          disabled={alarmState === 'ringing' || alarmState === 'task_active'}
          className="w-full py-2 px-3 bg-campus-danger/20 text-campus-danger rounded-lg text-xs font-semibold hover:bg-campus-danger/30 transition-colors disabled:opacity-40"
        >
          Сработать будильник
        </button>
        <button
          onClick={handleFastForward}
          disabled={alarmState !== 'ringing' && alarmState !== 'task_active'}
          className="w-full py-2 px-3 bg-campus-warning/20 text-campus-warning rounded-lg text-xs font-semibold hover:bg-campus-warning/30 transition-colors disabled:opacity-40"
        >
          Промотать 5 минут
        </button>
        <button
          onClick={handleReset}
          className="w-full py-2 px-3 bg-campus-surface text-campus-muted rounded-lg text-xs font-semibold hover:text-white transition-colors"
        >
          Сбросить демо
        </button>
      </div>

      {/* Event log */}
      <div>
        <div className="text-campus-muted text-xs mb-1.5">Последние события:</div>
        <div className="bg-campus-surface rounded-lg p-2 max-h-[200px] overflow-y-auto">
          {eventLog.length === 0 ? (
            <div className="text-campus-muted/50 text-xs italic py-2 text-center">
              Нет событий
            </div>
          ) : (
            eventLog.map((event, i) => (
              <div key={i} className="text-xs py-1 border-b border-campus-border/30 last:border-0 text-campus-muted">
                {event}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
