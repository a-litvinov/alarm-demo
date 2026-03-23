import type { KarmaEntry } from '../../types';

export function KarmaHistory({ entries }: { entries: KarmaEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="text-campus-muted/50 text-xs text-center py-4 italic">
        Нет записей
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5">
      {entries.map((entry) => {
        const icon = entry.action === 'self_wakeup' ? '☀️' :
                     entry.action === 'keeper_confirmed' ? '🤝' : '😴';
        const deltaColor = entry.delta > 0 ? 'text-campus-success' : 'text-campus-danger';
        const time = new Date(entry.timestamp).toLocaleTimeString('ru-RU', {
          hour: '2-digit', minute: '2-digit',
        });

        return (
          <div key={entry.id} className="flex items-center gap-2 bg-campus-bg rounded-lg p-2">
            <span className="text-sm">{icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-campus-text text-xs truncate">{entry.description}</div>
              <div className="text-campus-muted text-[10px]">{time}</div>
            </div>
            <span className={`text-sm font-bold font-mono ${deltaColor}`}>
              {entry.delta > 0 ? `+${entry.delta}` : entry.delta}
            </span>
          </div>
        );
      })}
    </div>
  );
}
