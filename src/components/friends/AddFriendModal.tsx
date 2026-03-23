import { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AddFriendModal({ open, onClose }: Props) {
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'phone' | 'contacts'>('phone');
  const addFriend = useAppStore((s) => s.addFriend);
  const addEventLog = useAppStore((s) => s.addEventLog);

  const handleAdd = () => {
    if (!phone.trim()) return;
    addFriend({
      id: `f-${Date.now()}`,
      name: `Друг (${phone})`,
      phone,
      karmaScore: 0,
      isInApp: true,
    });
    addEventLog(`Друг добавлен: ${phone}`);
    setPhone('');
    onClose();
  };

  const MOCK_CONTACTS = [
    { name: 'Елена', phone: '+7 (999) 222-33-44' },
    { name: 'Сергей', phone: '+7 (999) 555-66-77' },
  ];

  const handleAddContact = (name: string, contactPhone: string) => {
    addFriend({
      id: `f-${Date.now()}`,
      name,
      phone: contactPhone,
      karmaScore: 0,
      isInApp: false,
    });
    addEventLog(`Контакт добавлен: ${name}`);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Добавить друга">
      {/* Mode tabs */}
      <div className="flex gap-1 bg-campus-bg rounded-lg p-1 mb-4">
        <button
          onClick={() => setMode('phone')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'phone' ? 'bg-campus-primary text-white' : 'text-campus-muted'
          }`}
        >
          По номеру
        </button>
        <button
          onClick={() => setMode('contacts')}
          className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-colors ${
            mode === 'contacts' ? 'bg-campus-primary text-white' : 'text-campus-muted'
          }`}
        >
          Из контактов
        </button>
      </div>

      {mode === 'phone' ? (
        <div className="flex flex-col gap-3">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+7 (999) 123-45-67"
            className="w-full bg-campus-bg text-campus-text rounded-lg px-3 py-2 text-sm border border-campus-border focus:border-campus-primary outline-none placeholder:text-campus-muted/40"
          />
          <Button fullWidth onClick={handleAdd} disabled={!phone.trim()}>
            Добавить
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="text-campus-muted text-xs mb-1">Контакты устройства (демо):</div>
          {MOCK_CONTACTS.map((c) => (
            <button
              key={c.phone}
              onClick={() => handleAddContact(c.name, c.phone)}
              className="flex items-center justify-between bg-campus-bg rounded-xl p-3 hover:bg-campus-surface-light transition-colors"
            >
              <div>
                <div className="text-campus-text text-sm font-medium">{c.name}</div>
                <div className="text-campus-muted text-xs">{c.phone}</div>
              </div>
              <span className="text-campus-primary text-xs">Добавить</span>
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
