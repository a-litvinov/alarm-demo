import type { StateCreator } from 'zustand';
import type { AlarmState, TaskType } from '../../types';

export interface AlarmSlice {
  alarmEnabled: boolean;
  alarmManualTime: string | null;
  prepTimeMinutes: number;
  melodyId: string;
  taskType: TaskType;
  alarmState: AlarmState;
  taskProblem: string;
  taskAnswer: number;
  remainingSeconds: number;

  toggleAlarm: () => void;
  setManualTime: (time: string | null) => void;
  setPrepTime: (minutes: number) => void;
  setMelody: (melodyId: string) => void;
  setTaskType: (type: TaskType) => void;
  setAlarmState: (state: AlarmState) => void;
  setTask: (problem: string, answer: number) => void;
  setRemainingSeconds: (seconds: number) => void;
  resetAlarm: () => void;
}

export const createAlarmSlice: StateCreator<AlarmSlice, [], [], AlarmSlice> = (set) => ({
  alarmEnabled: true,
  alarmManualTime: null,
  prepTimeMinutes: 45,
  melodyId: 'classic',
  taskType: 'math',
  alarmState: 'idle',
  taskProblem: '',
  taskAnswer: 0,
  remainingSeconds: 300,

  toggleAlarm: () => set((s) => ({ alarmEnabled: !s.alarmEnabled })),
  setManualTime: (time) => set({ alarmManualTime: time }),
  setPrepTime: (minutes) => set({ prepTimeMinutes: minutes }),
  setMelody: (melodyId) => set({ melodyId }),
  setTaskType: (type) => set({ taskType: type }),
  setAlarmState: (state) => set({ alarmState: state }),
  setTask: (problem, answer) => set({ taskProblem: problem, taskAnswer: answer }),
  setRemainingSeconds: (seconds) => set({ remainingSeconds: seconds }),
  resetAlarm: () => set({
    alarmState: 'idle',
    taskProblem: '',
    taskAnswer: 0,
    remainingSeconds: 300,
  }),
});
