import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PREP_OPTIONS = [15, 30, 45, 60, 90];

export function PrepTimePicker({ open, onClose }: Props) {
  const prepTime = useAppStore((s) => s.prepTimeMinutes);
  const setPrepTime = useAppStore((s) => s.setPrepTime);

  return (
    <Modal open={open} onClose={onClose} title="Время на сборы">
      <div className="flex flex-col gap-2">
        {PREP_OPTIONS.map((mins) => (
          <button
            key={mins}
            onClick={() => { setPrepTime(mins); onClose(); }}
            className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
              prepTime === mins
                ? 'bg-campus-primary/20 border border-campus-primary'
                : 'bg-campus-bg hover:bg-campus-surface-light'
            }`}
          >
            <span className="text-campus-text text-sm font-medium">{mins} минут</span>
            {prepTime === mins && (
              <span className="text-campus-primary text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
