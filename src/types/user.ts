export interface User {
  id: string;
  name: string;
  phone: string;
}

export interface Friend extends User {
  karmaScore: number;
  isInApp: boolean;
}

export type FriendRequestStatus = 'pending' | 'accepted' | 'declined';

export interface FriendRequest {
  id: string;
  from: User;
  status: FriendRequestStatus;
  timestamp: number;
}

export type KeeperRequestStatus = 'none' | 'sent' | 'accepted' | 'declined' | 'timeout';
