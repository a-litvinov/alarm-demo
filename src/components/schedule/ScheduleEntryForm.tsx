import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAppStore } from '../../store/useAppStore';
import { ALL_DAYS, type DayOfWeek } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ScheduleEntryForm({ open, onClose }: Props) {
  const [dayOfWeek, setDayOfWeek] = useState<DayOfWeek>('Пн');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [subjectName, setSubjectName] = useState('');

  const addScheduleEntry = useAppStore((s) => s.addScheduleEntry);
  const addEventLog = useAppStore((s) => s.addEventLog);

  const handleSubmit = () => {
    addScheduleEntry({ dayOfWeek, startTime, endTime, subjectName: subjectName || undefined });
    addEventLog(`Добавлена пара: ${subjectName || 'Без названия'} (${dayOfWeek} ${startTime})`);
    setSubjectName('');
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Добавить пару">
      <div className="flex flex-col gap-4">
        {/* Day of week */}
        <div>
          <label className="text-campus-muted text-xs block mb-1.5">День недели</label>
          <div className="flex gap-1">
            {ALL_DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setDayOfWeek(day)}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  dayOfWeek === day
                    ? 'bg-campus-primary text-white'
                    : 'bg-campus-bg text-campus-muted hover:text-campus-text'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time pickers */}
        <div className="flex gap-3">
          <div className="flex-1">
            <label className="text-campus-muted text-xs block mb-1.5">Начало</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full bg-campus-bg text-campus-text rounded-lg px-3 py-2 text-sm border border-campus-border focus:border-campus-primary outline-none"
            />
          </div>
          <div className="flex-1">
            <label className="text-campus-muted text-xs block mb-1.5">Конец</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full bg-campus-bg text-campus-text rounded-lg px-3 py-2 text-sm border border-campus-border focus:border-campus-primary outline-none"
            />
          </div>
        </div>

        {/* Subject name */}
        <div>
          <label className="text-campus-muted text-xs block mb-1.5">Предмет (необязательно)</label>
          <input
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="Математический анализ"
            className="w-full bg-campus-bg text-campus-text rounded-lg px-3 py-2 text-sm border border-campus-border focus:border-campus-primary outline-none placeholder:text-campus-muted/40"
          />
        </div>

        <Button fullWidth onClick={handleSubmit}>
          Сохранить
        </Button>
      </div>
    </Modal>
  );
}
