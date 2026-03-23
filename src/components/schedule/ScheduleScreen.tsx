import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ALL_DAYS, type DayOfWeek } from '../../types';
import { ScheduleEntryCard } from './ScheduleEntryCard';
import { ScheduleImportModal } from './ScheduleImportModal';
import { ScheduleEntryForm } from './ScheduleEntryForm';
import { Button } from '../common/Button';

export function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Пн');
  const [showImport, setShowImport] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const entries = useAppStore((s) => s.scheduleEntries);
  const dayEntries = entries
    .filter((e) => e.dayOfWeek === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-campus-text text-lg font-bold">Расписание</h1>

      {/* Day tabs */}
      <div className="flex gap-1 bg-campus-surface rounded-xl p-1">
        {ALL_DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors ${
              selectedDay === day
                ? 'bg-campus-primary text-white'
                : 'text-campus-muted hover:text-campus-text'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Entries list */}
      <div className="flex flex-col gap-2">
        {dayEntries.length === 0 ? (
          <div className="text-campus-muted/50 text-sm text-center py-8">
            Нет пар на {selectedDay}
          </div>
        ) : (
          dayEntries.map((entry) => (
            <ScheduleEntryCard key={entry.id} entry={entry} />
          ))
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 mt-auto">
        <Button fullWidth onClick={() => setShowImport(true)}>
          Импорт из календаря
        </Button>
        <Button fullWidth variant="secondary" onClick={() => setShowForm(true)}>
          Добавить пару
        </Button>
      </div>

      <ScheduleImportModal open={showImport} onClose={() => setShowImport(false)} />
      <ScheduleEntryForm open={showForm} onClose={() => setShowForm(false)} />
    </div>
  );
}
