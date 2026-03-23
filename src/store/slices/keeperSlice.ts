import type { StateCreator } from 'zustand';
import type { KeeperRequestStatus } from '../../types';

export interface KeeperSlice {
  assignedKeeperId: string | null;
  keeperRequestStatus: KeeperRequestStatus;
  keeperAction: 'none' | 'pending_wakeup' | 'confirmed_up' | 'not_up';
  oversleepNotified: boolean;

  assignKeeper: (friendId: string) => void;
  setKeeperRequestStatus: (status: KeeperRequestStatus) => void;
  setKeeperAction: (action: KeeperSlice['keeperAction']) => void;
  setOversleepNotified: (value: boolean) => void;
  resetKeeper: () => void;
}

export const createKeeperSlice: StateCreator<KeeperSlice, [], [], KeeperSlice> = (set) => ({
  assignedKeeperId: null,
  keeperRequestStatus: 'none',
  keeperAction: 'none',
  oversleepNotified: false,

  assignKeeper: (friendId) => set({ assignedKeeperId: friendId, keeperRequestStatus: 'sent' }),
  setKeeperRequestStatus: (status) => set({ keeperRequestStatus: status }),
  setKeeperAction: (action) => set({ keeperAction: action }),
  setOversleepNotified: (value) => set({ oversleepNotified: value }),
  resetKeeper: () => set({
    assignedKeeperId: null,
    keeperRequestStatus: 'none',
    keeperAction: 'none',
    oversleepNotified: false,
  }),
});
