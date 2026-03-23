import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('demoSlice', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentRole: 'anchor',
      scenarioStep: 1,
      activeTab: 'home',
      overlay: null,
      eventLog: [],
    });
  });

  it('initializes with anchor role', () => {
    expect(useAppStore.getState().currentRole).toBe('anchor');
  });

  it('switches role from anchor to keeper', () => {
    useAppStore.getState().switchRole();
    expect(useAppStore.getState().currentRole).toBe('keeper');
  });

  it('switches role from keeper back to anchor', () => {
    useAppStore.getState().switchRole();
    useAppStore.getState().switchRole();
    expect(useAppStore.getState().currentRole).toBe('anchor');
  });

  it('sets role directly', () => {
    useAppStore.getState().setRole('keeper');
    expect(useAppStore.getState().currentRole).toBe('keeper');
  });

  it('sets scenario step', () => {
    useAppStore.getState().setScenarioStep(5);
    expect(useAppStore.getState().scenarioStep).toBe(5);
  });

  it('sets active tab', () => {
    useAppStore.getState().setActiveTab('schedule');
    expect(useAppStore.getState().activeTab).toBe('schedule');
  });

  it('sets overlay screen', () => {
    useAppStore.getState().setOverlay('alarm_active');
    expect(useAppStore.getState().overlay).toBe('alarm_active');
  });

  it('adds events to log (newest first, max 20)', () => {
    useAppStore.getState().addEventLog('Event 1');
    useAppStore.getState().addEventLog('Event 2');
    const log = useAppStore.getState().eventLog;
    expect(log[0]).toBe('Event 2');
    expect(log[1]).toBe('Event 1');
  });

  it('resets demo state', () => {
    useAppStore.getState().setRole('keeper');
    useAppStore.getState().setScenarioStep(5);
    useAppStore.getState().setActiveTab('friends');
    useAppStore.getState().addEventLog('test');
    useAppStore.getState().resetDemo();

    const s = useAppStore.getState();
    expect(s.currentRole).toBe('anchor');
    expect(s.scenarioStep).toBe(1);
    expect(s.activeTab).toBe('home');
    expect(s.eventLog).toEqual([]);
  });
});
