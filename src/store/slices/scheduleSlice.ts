import type { StateCreator } from 'zustand';
import type { ScheduleEntry } from '../../types';
import { MOCK_SCHEDULE } from '../../mock/scheduleData';

export interface ScheduleSlice {
  scheduleEntries: ScheduleEntry[];
  importStatus: 'idle' | 'importing' | 'success' | 'denied';

  importSchedule: () => void;
  denyImport: () => void;
  resetImportStatus: () => void;
  addScheduleEntry: (entry: Omit<ScheduleEntry, 'id'>) => void;
  removeScheduleEntry: (id: string) => void;
}

let entryCounter = 100;

export const createScheduleSlice: StateCreator<ScheduleSlice, [], [], ScheduleSlice> = (set) => ({
  scheduleEntries: [],
  importStatus: 'idle',

  importSchedule: () => {
    set({ importStatus: 'importing' });
    setTimeout(() => {
      set({ importStatus: 'success', scheduleEntries: [...MOCK_SCHEDULE] });
    }, 1500);
  },
  denyImport: () => set({ importStatus: 'denied' }),
  resetImportStatus: () => set({ importStatus: 'idle' }),
  addScheduleEntry: (entry) => set((s) => ({
    scheduleEntries: [...s.scheduleEntries, { ...entry, id: `s-${++entryCounter}` }],
  })),
  removeScheduleEntry: (id) => set((s) => ({
    scheduleEntries: s.scheduleEntries.filter((e) => e.id !== id),
  })),
});
