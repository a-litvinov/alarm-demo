import type { ScheduleEntry } from '../../types';
import { useAppStore } from '../../store/useAppStore';

export function ScheduleEntryCard({ entry }: { entry: ScheduleEntry }) {
  const removeScheduleEntry = useAppStore((s) => s.removeScheduleEntry);

  return (
    <div className="flex items-center gap-3 bg-campus-surface-light rounded-xl p-3">
      <div className="text-campus-primary font-mono font-bold text-sm whitespace-nowrap">
        {entry.startTime}
        <div className="text-campus-muted text-xs font-normal">{entry.endTime}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-campus-text text-sm font-medium truncate">
          {entry.subjectName || 'Без названия'}
        </div>
      </div>
      <button
        onClick={() => removeScheduleEntry(entry.id)}
        className="text-campus-muted hover:text-campus-danger transition-colors text-lg shrink-0"
      >
        ✕
      </button>
    </div>
  );
}
