import type { Friend } from '../../types';
import { Avatar } from '../common/Avatar';
import { useAppStore } from '../../store/useAppStore';

export function FriendCard({ friend }: { friend: Friend }) {
  const removeFriend = useAppStore((s) => s.removeFriend);

  return (
    <div className="flex items-center gap-3 bg-campus-surface-light rounded-xl p-3">
      <Avatar name={friend.name} />
      <div className="flex-1 min-w-0">
        <div className="text-campus-text text-sm font-medium">{friend.name}</div>
        <div className="text-campus-muted text-xs">
          Карма: {friend.karmaScore}
          {!friend.isInApp && ' · Не в приложении'}
        </div>
      </div>
      <button
        onClick={() => removeFriend(friend.id)}
        className="text-campus-muted hover:text-campus-danger transition-colors text-xs"
      >
        Удалить
      </button>
    </div>
  );
}
