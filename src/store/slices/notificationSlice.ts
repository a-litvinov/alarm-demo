import type { StateCreator } from 'zustand';
import type { AppNotification, NotificationKind, Role } from '../../types';

export interface NotificationSlice {
  notifications: AppNotification[];

  addNotification: (kind: NotificationKind, title: string, message: string, targetRole: Role | 'both') => void;
  dismissNotification: (id: string) => void;
  clearNotifications: () => void;
}

let notifCounter = 0;

export const createNotificationSlice: StateCreator<NotificationSlice, [], [], NotificationSlice> = (set) => ({
  notifications: [],

  addNotification: (kind, title, message, targetRole) => set((s) => ({
    notifications: [
      {
        id: `n-${++notifCounter}`,
        kind,
        title,
        message,
        timestamp: Date.now(),
        read: false,
        targetRole,
      },
      ...s.notifications,
    ].slice(0, 50),
  })),
  dismissNotification: (id) => set((s) => ({
    notifications: s.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),
  clearNotifications: () => set({ notifications: [] }),
});
