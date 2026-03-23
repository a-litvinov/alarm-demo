import type { StateCreator } from 'zustand';
import type { KarmaEntry, KarmaAction } from '../../types';

export interface KarmaSlice {
  anchorKarma: number;
  keeperKarma: number;
  karmaHistory: KarmaEntry[];

  addKarmaEvent: (action: KarmaAction, delta: number, description: string) => void;
  resetKarma: () => void;
}

let karmaCounter = 0;

export const createKarmaSlice: StateCreator<KarmaSlice, [], [], KarmaSlice> = (set) => ({
  anchorKarma: 5,
  keeperKarma: 12,
  karmaHistory: [],

  addKarmaEvent: (action, delta, description) => set((s) => {
    const entry: KarmaEntry = {
      id: `k-${++karmaCounter}`,
      action,
      delta,
      description,
      timestamp: Date.now(),
    };
    const isAnchorAction = action === 'self_wakeup' || action === 'keeper_intervention';
    return {
      karmaHistory: [entry, ...s.karmaHistory],
      anchorKarma: isAnchorAction ? s.anchorKarma + delta : s.anchorKarma,
      keeperKarma: action === 'keeper_confirmed' ? s.keeperKarma + delta : s.keeperKarma,
    };
  }),
  resetKarma: () => set({ anchorKarma: 5, keeperKarma: 12, karmaHistory: [] }),
});
