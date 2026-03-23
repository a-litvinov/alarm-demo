import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { FriendCard } from './FriendCard';
import { AddFriendModal } from './AddFriendModal';
import { Button } from '../common/Button';
import { Avatar } from '../common/Avatar';

export function FriendsScreen() {
  const [showAdd, setShowAdd] = useState(false);
  const friends = useAppStore((s) => s.friends);
  const friendRequests = useAppStore((s) => s.friendRequests);
  const acceptFriendRequest = useAppStore((s) => s.acceptFriendRequest);
  const declineFriendRequest = useAppStore((s) => s.declineFriendRequest);

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-campus-text text-lg font-bold">
          Друзья <span className="text-campus-muted text-sm font-normal">({friends.length})</span>
        </h1>
      </div>

      {/* Incoming requests */}
      {friendRequests.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-campus-muted text-xs">Входящие заявки:</div>
          {friendRequests.map((req) => (
            <div key={req.id} className="flex items-center gap-3 bg-campus-primary/10 rounded-xl p-3 border border-campus-primary/20">
              <Avatar name={req.from.name} size="sm" />
              <div className="flex-1 text-campus-text text-sm">{req.from.name}</div>
              <button
                onClick={() => acceptFriendRequest(req.id)}
                className="text-campus-success text-xs font-medium"
              >
                Принять
              </button>
              <button
                onClick={() => declineFriendRequest(req.id)}
                className="text-campus-danger text-xs font-medium"
              >
                Откл.
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Friends list */}
      <div className="flex flex-col gap-2">
        {friends.length === 0 ? (
          <div className="text-campus-muted/50 text-sm text-center py-8">
            Нет друзей. Добавьте первого!
          </div>
        ) : (
          friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))
        )}
      </div>

      <Button fullWidth onClick={() => setShowAdd(true)}>
        Добавить друга
      </Button>

      <AddFriendModal open={showAdd} onClose={() => setShowAdd(false)} />
    </div>
  );
}
