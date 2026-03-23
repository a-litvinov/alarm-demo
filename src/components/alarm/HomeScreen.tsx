import { useAppStore } from '../../store/useAppStore';
import { Card } from '../common/Card';
import { Toggle } from '../common/Toggle';
import { Button } from '../common/Button';
import { MelodyPicker } from './MelodyPicker';
import { TaskTypePicker } from './TaskTypePicker';
import { PrepTimePicker } from './PrepTimePicker';
import { calculateAlarmTime, getTomorrowDay, getEntriesForDay, getFirstClass } from '../../utils/alarmCalculation';
import { MELODIES } from '../../mock/melodies';
import { ANCHOR_USER } from '../../mock/usersData';
import { useState } from 'react';

export function HomeScreen() {
  const entries = useAppStore((s) => s.scheduleEntries);
  const alarmEnabled = useAppStore((s) => s.alarmEnabled);
  const toggleAlarm = useAppStore((s) => s.toggleAlarm);
  const manualTime = useAppStore((s) => s.alarmManualTime);
  const setManualTime = useAppStore((s) => s.setManualTime);
  const prepTime = useAppStore((s) => s.prepTimeMinutes);
  const melodyId = useAppStore((s) => s.melodyId);
  const taskType = useAppStore((s) => s.taskType);
  const setActiveTab = useAppStore((s) => s.setActiveTab);
  const setOverlay = useAppStore((s) => s.setOverlay);
  const keeperRequestStatus = useAppStore((s) => s.keeperRequestStatus);
  const friends = useAppStore((s) => s.friends);
  const assignedKeeperId = useAppStore((s) => s.assignedKeeperId);

  const [showMelody, setShowMelody] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showPrep, setShowPrep] = useState(false);
  const [editingTime, setEditingTime] = useState(false);

  const tomorrowDay = getTomorrowDay();
  const tomorrowEntries = getEntriesForDay(entries, tomorrowDay);
  const firstClass = getFirstClass(entries, tomorrowDay);

  const calculatedTime = firstClass ? calculateAlarmTime(firstClass.startTime, prepTime) : null;
  const effectiveTime = manualTime ?? calculatedTime;

  const selectedMelody = MELODIES.find((m) => m.id === melodyId);
  const assignedKeeper = friends.find((f) => f.id === assignedKeeperId);

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Greeting */}
      <div>
        <div className="text-campus-muted text-xs">Доброй ночи,</div>
        <div className="text-campus-text text-lg font-bold">{ANCHOR_USER.name}</div>
      </div>

      {/* Tomorrow's schedule */}
      <Card>
        <div className="text-campus-muted text-xs mb-2">Завтра ({tomorrowDay})</div>
        {tomorrowEntries.length === 0 ? (
          <div className="text-campus-text text-sm">Нет пар</div>
        ) : (
          <div className="flex flex-col gap-1.5">
            {tomorrowEntries.slice(0, 3).map((e) => (
              <div key={e.id} className="flex items-center gap-2 text-sm">
                <span className="text-campus-primary font-mono text-xs">{e.startTime}</span>
                <span className="text-campus-text truncate">{e.subjectName || 'Без названия'}</span>
              </div>
            ))}
            {tomorrowEntries.length > 3 && (
              <button
                onClick={() => setActiveTab('schedule')}
                className="text-campus-primary text-xs text-left hover:underline"
              >
                + ещё {tomorrowEntries.length - 3}
              </button>
            )}
          </div>
        )}
      </Card>

      {/* Alarm card */}
      <Card className="relative">
        <div className="flex items-center justify-between mb-3">
          <div className="text-campus-muted text-xs">Будильник</div>
          <Toggle checked={alarmEnabled} onChange={toggleAlarm} />
        </div>

        {effectiveTime ? (
          <>
            {editingTime ? (
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="time"
                  value={manualTime ?? calculatedTime ?? '08:00'}
                  onChange={(e) => setManualTime(e.target.value)}
                  className="bg-campus-bg text-campus-text text-3xl font-bold rounded-lg px-3 py-1 border border-campus-border focus:border-campus-primary outline-none font-mono"
                />
                <button
                  onClick={() => setEditingTime(false)}
                  className="text-campus-primary text-sm"
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditingTime(true)}
                className="text-campus-text text-4xl font-bold font-mono tracking-wider mb-1 hover:text-campus-primary transition-colors"
              >
                {effectiveTime}
              </button>
            )}
            {firstClass && (
              <div className="text-campus-muted text-xs">
                Первая пара: {firstClass.startTime} — {firstClass.subjectName || 'Без названия'}
              </div>
            )}
            {manualTime && (
              <button
                onClick={() => setManualTime(null)}
                className="text-campus-primary text-xs mt-1 hover:underline"
              >
                Сбросить на авто
              </button>
            )}
          </>
        ) : (
          <div className="text-campus-muted text-sm">
            {entries.length === 0 ? (
              <>
                Добавьте расписание, чтобы рассчитать время.{' '}
                <button onClick={() => setActiveTab('schedule')} className="text-campus-primary hover:underline">
                  Перейти
                </button>
              </>
            ) : (
              'Завтра нет пар. Установите время вручную.'
            )}
          </div>
        )}
      </Card>

      {/* Settings row */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowPrep(true)}
          className="flex-1 bg-campus-surface rounded-xl p-3 text-left"
        >
          <div className="text-campus-muted text-[10px]">На сборы</div>
          <div className="text-campus-text text-sm font-semibold">{prepTime} мин</div>
        </button>
        <button
          onClick={() => setShowMelody(true)}
          className="flex-1 bg-campus-surface rounded-xl p-3 text-left"
        >
          <div className="text-campus-muted text-[10px]">Мелодия</div>
          <div className="text-campus-text text-sm font-semibold">{selectedMelody?.icon} {selectedMelody?.name}</div>
        </button>
        <button
          onClick={() => setShowTask(true)}
          className="flex-1 bg-campus-surface rounded-xl p-3 text-left"
        >
          <div className="text-campus-muted text-[10px]">Задание</div>
          <div className="text-campus-text text-sm font-semibold">{taskType === 'math' ? 'Математика' : 'Тряска'}</div>
        </button>
      </div>

      {/* Keeper status or assign button */}
      {assignedKeeper && keeperRequestStatus !== 'none' ? (
        <Card>
          <div className="text-campus-muted text-xs mb-1">Хранитель</div>
          <div className="flex items-center justify-between">
            <div className="text-campus-text text-sm font-medium">{assignedKeeper.name}</div>
            <div className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              keeperRequestStatus === 'accepted' ? 'bg-campus-success/20 text-campus-success' :
              keeperRequestStatus === 'declined' ? 'bg-campus-danger/20 text-campus-danger' :
              'bg-campus-warning/20 text-campus-warning'
            }`}>
              {keeperRequestStatus === 'sent' && 'Ожидание'}
              {keeperRequestStatus === 'accepted' && 'Принял'}
              {keeperRequestStatus === 'declined' && 'Отклонил'}
              {keeperRequestStatus === 'timeout' && 'Не ответил'}
            </div>
          </div>
        </Card>
      ) : (
        <Button fullWidth onClick={() => setOverlay('keeper_assign')}>
          Назначить хранителя
        </Button>
      )}

      {/* Pickers */}
      <MelodyPicker open={showMelody} onClose={() => setShowMelody(false)} />
      <TaskTypePicker open={showTask} onClose={() => setShowTask(false)} />
      <PrepTimePicker open={showPrep} onClose={() => setShowPrep(false)} />
    </div>
  );
}
