import type { StateCreator } from 'zustand';
import type { Friend, FriendRequest } from '../../types';
import { MOCK_FRIENDS } from '../../mock/usersData';

export interface FriendsSlice {
  friends: Friend[];
  friendRequests: FriendRequest[];

  loadMockFriends: () => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (id: string) => void;
  addFriendRequest: (request: FriendRequest) => void;
  acceptFriendRequest: (requestId: string) => void;
  declineFriendRequest: (requestId: string) => void;
}

export const createFriendsSlice: StateCreator<FriendsSlice, [], [], FriendsSlice> = (set) => ({
  friends: MOCK_FRIENDS,
  friendRequests: [],

  loadMockFriends: () => set({ friends: [...MOCK_FRIENDS] }),
  addFriend: (friend) => set((s) => ({ friends: [...s.friends, friend] })),
  removeFriend: (id) => set((s) => ({ friends: s.friends.filter((f) => f.id !== id) })),
  addFriendRequest: (request) => set((s) => ({ friendRequests: [...s.friendRequests, request] })),
  acceptFriendRequest: (requestId) => set((s) => {
    const request = s.friendRequests.find((r) => r.id === requestId);
    if (!request) return s;
    return {
      friendRequests: s.friendRequests.filter((r) => r.id !== requestId),
      friends: [...s.friends, { ...request.from, karmaScore: 0, isInApp: true }],
    };
  }),
  declineFriendRequest: (requestId) => set((s) => ({
    friendRequests: s.friendRequests.filter((r) => r.id !== requestId),
  })),
});
