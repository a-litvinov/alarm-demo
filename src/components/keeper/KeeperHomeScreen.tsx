import { useAppStore } from '../../store/useAppStore';
import { KeeperRequestCard } from './KeeperRequestCard';
import { KEEPER_USER } from '../../mock/usersData';

export function KeeperHomeScreen() {
  const keeperRequestStatus = useAppStore((s) => s.keeperRequestStatus);
  const oversleepNotified = useAppStore((s) => s.oversleepNotified);

  return (
    <div className="p-4 flex flex-col gap-3">
      <div>
        <div className="text-campus-muted text-xs">Доброй ночи,</div>
        <div className="text-campus-text text-lg font-bold">{KEEPER_USER.name}</div>
      </div>

      <KeeperRequestCard />

      {keeperRequestStatus === 'none' && !oversleepNotified && (
        <div className="flex-1 flex items-center justify-center py-12">
          <div className="text-campus-muted text-sm text-center">
            <div className="text-3xl mb-2">😴</div>
            <div>Нет активных запросов</div>
            <div className="text-xs mt-1 text-campus-muted/50">
              Ваши друзья пока не назначили вас хранителем
            </div>
          </div>
        </div>
      )}

      {keeperRequestStatus === 'accepted' && !oversleepNotified && (
        <div className="bg-campus-surface rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-campus-text text-sm font-medium">Вы приняли запрос</div>
          <div className="text-campus-muted text-xs mt-1">
            Если Алексей не проснётся, вы получите уведомление
          </div>
        </div>
      )}

      {keeperRequestStatus === 'declined' && (
        <div className="bg-campus-surface rounded-2xl p-4 text-center">
          <div className="text-2xl mb-2">❌</div>
          <div className="text-campus-text text-sm font-medium">Запрос отклонён</div>
          <div className="text-campus-muted text-xs mt-1">
            Алексей уведомлён и может выбрать другого хранителя
          </div>
        </div>
      )}
    </div>
  );
}
