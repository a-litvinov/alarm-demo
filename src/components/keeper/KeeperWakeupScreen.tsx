import { useAppStore } from '../../store/useAppStore';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';
import { ANCHOR_USER } from '../../mock/usersData';

export function KeeperWakeupScreen() {
  const oversleepNotified = useAppStore((s) => s.oversleepNotified);
  const currentRole = useAppStore((s) => s.currentRole);
  const setAlarmState = useAppStore((s) => s.setAlarmState);
  const setKeeperAction = useAppStore((s) => s.setKeeperAction);
  const setOversleepNotified = useAppStore((s) => s.setOversleepNotified);
  const addKarmaEvent = useAppStore((s) => s.addKarmaEvent);
  const addNotification = useAppStore((s) => s.addNotification);
  const addEventLog = useAppStore((s) => s.addEventLog);
  const setScenarioStep = useAppStore((s) => s.setScenarioStep);
  const keeperAction = useAppStore((s) => s.keeperAction);

  if (!oversleepNotified || currentRole !== 'keeper') return null;
  if (keeperAction === 'confirmed_up') return null;

  const handleConfirm = () => {
    setKeeperAction('confirmed_up');
    setAlarmState('completed');
    setOversleepNotified(false);
    addKarmaEvent('keeper_confirmed', 1, 'Подтвердил пробуждение друга');
    addKarmaEvent('keeper_intervention', -1, 'Потребовалась помощь хранителя');
    addNotification('wakeup_confirmed', 'Доброе утро!', 'Марина подтвердила, что ты проснулся', 'anchor');
    addEventLog('Хранитель подтвердил пробуждение');
    setScenarioStep(8);
  };

  const handleDeny = () => {
    setKeeperAction('not_up');
    addNotification('wakeup_denied', 'Не встал', 'Алексей не берёт трубку', 'both');
    addEventLog('Хранитель: не удалось разбудить');
  };

  return (
    <div className="absolute inset-0 z-40 bg-campus-bg flex flex-col items-center justify-center p-6">
      <div className="text-5xl mb-4 animate-pulse-alarm">🚨</div>

      <Avatar name={ANCHOR_USER.name} size="lg" />

      <div className="text-campus-text text-lg font-bold mt-4 text-center">
        {ANCHOR_USER.name} не может проснуться!
      </div>
      <div className="text-campus-muted text-sm mt-1 text-center">
        Позвони ему и убедись, что он встал
      </div>

      <div className="flex flex-col gap-3 w-full mt-8">
        <Button fullWidth onClick={handleConfirm}>
          Я позвонил(а), встал(а)
        </Button>
        <Button fullWidth variant="danger" onClick={handleDeny}>
          Не берёт трубку / не встал(а)
        </Button>
      </div>

      {keeperAction === 'not_up' && (
        <div className="mt-4 text-campus-warning text-sm text-center">
          Будильник продолжает звучать. Попробуйте позвонить ещё раз.
        </div>
      )}
    </div>
  );
}
