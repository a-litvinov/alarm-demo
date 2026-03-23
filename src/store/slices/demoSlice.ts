import type { StateCreator } from 'zustand';
import type { Role, Tab, OverlayScreen } from '../../types';

export interface DemoSlice {
  currentRole: Role;
  scenarioStep: number;
  activeTab: Tab;
  overlay: OverlayScreen;
  eventLog: string[];

  switchRole: () => void;
  setRole: (role: Role) => void;
  setScenarioStep: (step: number) => void;
  setActiveTab: (tab: Tab) => void;
  setOverlay: (overlay: OverlayScreen) => void;
  addEventLog: (event: string) => void;
  resetDemo: () => void;
}

export const createDemoSlice: StateCreator<DemoSlice, [], [], DemoSlice> = (set) => ({
  currentRole: 'anchor',
  scenarioStep: 1,
  activeTab: 'home',
  overlay: null,
  eventLog: [],

  switchRole: () => set((s) => ({
    currentRole: s.currentRole === 'anchor' ? 'keeper' : 'anchor',
  })),
  setRole: (role) => set({ currentRole: role }),
  setScenarioStep: (step) => set({ scenarioStep: step }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setOverlay: (overlay) => set({ overlay }),
  addEventLog: (event) => set((s) => ({
    eventLog: [event, ...s.eventLog].slice(0, 20),
  })),
  resetDemo: () => set({
    currentRole: 'anchor',
    scenarioStep: 1,
    activeTab: 'home',
    overlay: null,
    eventLog: [],
  }),
});
