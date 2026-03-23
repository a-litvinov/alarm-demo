import { useAppStore } from '../../store/useAppStore';
import { Avatar } from '../common/Avatar';
import { Card } from '../common/Card';
import { KarmaDisplay } from './KarmaDisplay';
import { KarmaHistory } from './KarmaHistory';
import { ANCHOR_USER, KEEPER_USER } from '../../mock/usersData';

export function ProfileScreen() {
  const currentRole = useAppStore((s) => s.currentRole);
  const anchorKarma = useAppStore((s) => s.anchorKarma);
  const keeperKarma = useAppStore((s) => s.keeperKarma);
  const karmaHistory = useAppStore((s) => s.karmaHistory);

  const user = currentRole === 'anchor' ? ANCHOR_USER : KEEPER_USER;
  const karma = currentRole === 'anchor' ? anchorKarma : keeperKarma;
  const label = currentRole === 'anchor' ? 'Карма якоря' : 'Карма хранителя';

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* User info */}
      <div className="flex flex-col items-center py-4">
        <Avatar name={user.name} size="lg" />
        <div className="text-campus-text text-lg font-bold mt-3">{user.name}</div>
        <div className="text-campus-muted text-xs">{user.phone}</div>
      </div>

      {/* Karma */}
      <Card className="flex flex-col items-center py-6">
        <KarmaDisplay score={karma} label={label} />
        <div className="text-campus-muted text-[10px] mt-3 text-center max-w-[200px]">
          {currentRole === 'anchor'
            ? '+1 за самостоятельное пробуждение, -1 за вмешательство хранителя'
            : '+1 за подтверждение пробуждения друга'}
        </div>
      </Card>

      {/* History */}
      <div>
        <div className="text-campus-muted text-xs mb-2">История изменений</div>
        <KarmaHistory entries={karmaHistory} />
      </div>
    </div>
  );
}
