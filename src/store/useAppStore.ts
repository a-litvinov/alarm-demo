import { create } from 'zustand';
import { createDemoSlice, type DemoSlice } from './slices/demoSlice';
import { createScheduleSlice, type ScheduleSlice } from './slices/scheduleSlice';
import { createAlarmSlice, type AlarmSlice } from './slices/alarmSlice';
import { createKeeperSlice, type KeeperSlice } from './slices/keeperSlice';
import { createFriendsSlice, type FriendsSlice } from './slices/friendsSlice';
import { createKarmaSlice, type KarmaSlice } from './slices/karmaSlice';
import { createNotificationSlice, type NotificationSlice } from './slices/notificationSlice';

export type AppStore =
  & DemoSlice
  & ScheduleSlice
  & AlarmSlice
  & KeeperSlice
  & FriendsSlice
  & KarmaSlice
  & NotificationSlice;

export const useAppStore = create<AppStore>()((...a) => ({
  ...createDemoSlice(...a),
  ...createScheduleSlice(...a),
  ...createAlarmSlice(...a),
  ...createKeeperSlice(...a),
  ...createFriendsSlice(...a),
  ...createKarmaSlice(...a),
  ...createNotificationSlice(...a),
}));
