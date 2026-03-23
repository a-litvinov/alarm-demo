import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useAppStore';
import type { TaskType } from '../../types';

interface Props {
  open: boolean;
  onClose: () => void;
}

const TASK_OPTIONS: { id: TaskType; name: string; icon: string; desc: string }[] = [
  { id: 'math', name: 'Математика', icon: '🔢', desc: 'Решить пример для отключения' },
  { id: 'shake', name: 'Тряска', icon: '📳', desc: 'Быстро нажимать кнопку (вместо тряски)' },
];

export function TaskTypePicker({ open, onClose }: Props) {
  const taskType = useAppStore((s) => s.taskType);
  const setTaskType = useAppStore((s) => s.setTaskType);

  return (
    <Modal open={open} onClose={onClose} title="Тип задания">
      <div className="flex flex-col gap-2">
        {TASK_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => { setTaskType(opt.id); onClose(); }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors text-left ${
              taskType === opt.id
                ? 'bg-campus-primary/20 border border-campus-primary'
                : 'bg-campus-bg hover:bg-campus-surface-light'
            }`}
          >
            <span className="text-xl">{opt.icon}</span>
            <div>
              <div className="text-campus-text text-sm font-medium">{opt.name}</div>
              <div className="text-campus-muted text-xs">{opt.desc}</div>
            </div>
            {taskType === opt.id && (
              <span className="ml-auto text-campus-primary text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
