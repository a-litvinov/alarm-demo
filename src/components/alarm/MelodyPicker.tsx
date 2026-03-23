import { Modal } from '../common/Modal';
import { useAppStore } from '../../store/useAppStore';
import { MELODIES } from '../../mock/melodies';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function MelodyPicker({ open, onClose }: Props) {
  const melodyId = useAppStore((s) => s.melodyId);
  const setMelody = useAppStore((s) => s.setMelody);

  return (
    <Modal open={open} onClose={onClose} title="Выбор мелодии">
      <div className="flex flex-col gap-2">
        {MELODIES.map((melody) => (
          <button
            key={melody.id}
            onClick={() => { setMelody(melody.id); onClose(); }}
            className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
              melodyId === melody.id
                ? 'bg-campus-primary/20 border border-campus-primary'
                : 'bg-campus-bg hover:bg-campus-surface-light'
            }`}
          >
            <span className="text-xl">{melody.icon}</span>
            <span className="text-campus-text text-sm font-medium">{melody.name}</span>
            {melodyId === melody.id && (
              <span className="ml-auto text-campus-primary text-sm">✓</span>
            )}
          </button>
        ))}
      </div>
    </Modal>
  );
}
