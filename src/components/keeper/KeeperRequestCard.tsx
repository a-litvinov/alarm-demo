import { useAppStore } from '../../store/useAppStore';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { ANCHOR_USER } from '../../mock/usersData';
import { Avatar } from '../common/Avatar';

export function KeeperRequestCard() {
  const keeperRequestStatus = useAppStore((s) => s.keeperRequestStatus);
  const setKeeperRequestStatus = useAppStore((s) => s.setKeeperRequestStatus);
  const addNotification = useAppStore((s) => s.addNotification);
  const addEventLog = useAppStore((s) => s.addEventLog);
  const setScenarioStep = useAppStore((s) => s.setScenarioStep);

  if (keeperRequestStatus !== 'sent') return null;

  const handleAccept = () => {
    setKeeperRequestStatus('accepted');
    addNotification('keeper_accepted', 'Запрос принят', 'Марина согласилась быть хранителем', 'anchor');
    addEventLog('Марина приняла запрос');
    setScenarioStep(5);
  };

  const handleDecline = () => {
    setKeeperRequestStatus('declined');
    addNotification('keeper_declined', 'Запрос отклонён', 'Марина отклонила запрос', 'anchor');
    addEventLog('Марина отклонила запрос');
  };

  return (
    <Card className="border border-campus-primary/30">
      <div className="flex items-center gap-3 mb-3">
        <Avatar name={ANCHOR_USER.name} />
        <div>
          <div className="text-campus-text text-sm font-medium">{ANCHOR_USER.name}</div>
          <div className="text-campus-muted text-xs">просит тебя разбудить</div>
        </div>
      </div>

      <div className="text-campus-text text-base font-semibold mb-3">
        Разбуди завтра утром
      </div>

      <div className="flex gap-2">
        <Button fullWidth onClick={handleAccept}>
          Принять
        </Button>
        <Button fullWidth variant="danger" onClick={handleDecline}>
          Отклонить
        </Button>
      </div>
    </Card>
  );
}
