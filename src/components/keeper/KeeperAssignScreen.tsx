import { useAppStore } from '../../store/useAppStore';
import { Avatar } from '../common/Avatar';
import { Button } from '../common/Button';
import { getFirstClass, getTomorrowDay, calculateAlarmTime } from '../../utils/alarmCalculation';

export function KeeperAssignScreen() {
  const friends = useAppStore((s) => s.friends);
  const assignKeeper = useAppStore((s) => s.assignKeeper);
  const setOverlay = useAppStore((s) => s.setOverlay);
  const addNotification = useAppStore((s) => s.addNotification);
  const addEventLog = useAppStore((s) => s.addEventLog);
  const alarmManualTime = useAppStore((s) => s.alarmManualTime);
  const scheduleEntries = useAppStore((s) => s.scheduleEntries);
  const prepTime = useAppStore((s) => s.prepTimeMinutes);

  const tomorrowDay = getTomorrowDay();
  const firstClass = getFirstClass(scheduleEntries, tomorrowDay);
  const calculatedTime = firstClass ? calculateAlarmTime(firstClass.startTime, prepTime) : null;
  const effectiveTime = alarmManualTime ?? calculatedTime ?? '08:00';

  const handleAssign = (friendId: string, friendName: string) => {
    assignKeeper(friendId);
    addNotification(
      'keeper_request',
      'Запрос на хранение',
      `Алексей просит тебя разбудить его в ${effectiveTime}`,
      'keeper'
    );
    addEventLog(`Запрос отправлен: ${friendName}`);
    setOverlay(null);
  };

  const handleInvite = (name: string) => {
    addNotification('invitation_sent', 'Приглашение отправлено', `Приглашение отправлено для ${name}`, 'anchor');
    addEventLog(`Приглашение отправлено: ${name}`);
  };

  return (
    <div className="absolute inset-0 z-30 bg-campus-bg/95 flex flex-col">
      <div className="flex items-center justify-between p-4 pt-10">
        <h2 className="text-campus-text text-lg font-bold">Выбери хранителя</h2>
        <button
          onClick={() => setOverlay(null)}
          className="w-8 h-8 rounded-full bg-campus-surface flex items-center justify-center text-campus-muted hover:text-campus-text"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex flex-col gap-2">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-3 bg-campus-surface rounded-xl p-3"
            >
              <Avatar name={friend.name} />
              <div className="flex-1 min-w-0">
                <div className="text-campus-text text-sm font-medium">{friend.name}</div>
                <div className="text-campus-muted text-xs">
                  Карма: {friend.karmaScore}
                  {!friend.isInApp && ' · Не в приложении'}
                </div>
              </div>
              {friend.isInApp ? (
                <Button onClick={() => handleAssign(friend.id, friend.name)}>
                  Выбрать
                </Button>
              ) : (
                <Button variant="secondary" onClick={() => handleInvite(friend.name)}>
                  Пригласить
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
