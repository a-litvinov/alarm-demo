import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('alarmSlice', () => {
  beforeEach(() => {
    useAppStore.setState({
      alarmEnabled: true,
      alarmManualTime: null,
      prepTimeMinutes: 45,
      melodyId: 'classic',
      taskType: 'math',
      alarmState: 'idle',
      taskProblem: '',
      taskAnswer: 0,
      remainingSeconds: 300,
    });
  });

  it('toggles alarm on/off', () => {
    useAppStore.getState().toggleAlarm();
    expect(useAppStore.getState().alarmEnabled).toBe(false);
    useAppStore.getState().toggleAlarm();
    expect(useAppStore.getState().alarmEnabled).toBe(true);
  });

  it('sets manual time', () => {
    useAppStore.getState().setManualTime('07:30');
    expect(useAppStore.getState().alarmManualTime).toBe('07:30');
  });

  it('clears manual time', () => {
    useAppStore.getState().setManualTime('07:30');
    useAppStore.getState().setManualTime(null);
    expect(useAppStore.getState().alarmManualTime).toBeNull();
  });

  it('sets prep time', () => {
    useAppStore.getState().setPrepTime(60);
    expect(useAppStore.getState().prepTimeMinutes).toBe(60);
  });

  it('sets melody', () => {
    useAppStore.getState().setMelody('birds');
    expect(useAppStore.getState().melodyId).toBe('birds');
  });

  it('sets task type', () => {
    useAppStore.getState().setTaskType('shake');
    expect(useAppStore.getState().taskType).toBe('shake');
  });

  it('resets alarm state', () => {
    useAppStore.getState().setAlarmState('ringing');
    useAppStore.getState().setRemainingSeconds(100);
    useAppStore.getState().resetAlarm();
    expect(useAppStore.getState().alarmState).toBe('idle');
    expect(useAppStore.getState().remainingSeconds).toBe(300);
  });
});
