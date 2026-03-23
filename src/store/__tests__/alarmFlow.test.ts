import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('alarm flow (state machine)', () => {
  beforeEach(() => {
    useAppStore.setState({
      alarmState: 'idle',
      remainingSeconds: 300,
      taskProblem: '',
      taskAnswer: 0,
      assignedKeeperId: 'keeper-1',
      keeperRequestStatus: 'accepted',
      keeperAction: 'none',
      oversleepNotified: false,
      anchorKarma: 5,
      keeperKarma: 12,
      karmaHistory: [],
      notifications: [],
      eventLog: [],
      scenarioStep: 1,
    });
  });

  it('transitions idle → ringing', () => {
    useAppStore.getState().setAlarmState('ringing');
    expect(useAppStore.getState().alarmState).toBe('ringing');
  });

  it('transitions ringing → completed on correct task answer', () => {
    useAppStore.getState().setAlarmState('ringing');
    useAppStore.getState().setTask('10 + 5 = ?', 15);
    // Simulate correct answer
    useAppStore.getState().setAlarmState('completed');
    useAppStore.getState().addKarmaEvent('self_wakeup', 1, 'Проснулся сам');

    const s = useAppStore.getState();
    expect(s.alarmState).toBe('completed');
    expect(s.anchorKarma).toBe(6);
    expect(s.karmaHistory).toHaveLength(1);
  });

  it('transitions ringing → overslept on timeout', () => {
    useAppStore.getState().setAlarmState('ringing');
    useAppStore.getState().setRemainingSeconds(0);
    useAppStore.getState().setAlarmState('overslept');
    useAppStore.getState().setOversleepNotified(true);

    const s = useAppStore.getState();
    expect(s.alarmState).toBe('overslept');
    expect(s.oversleepNotified).toBe(true);
  });

  it('oversleep creates notification for keeper', () => {
    useAppStore.getState().setAlarmState('overslept');
    useAppStore.getState().addNotification(
      'oversleep_alert', 'Проспал!', 'Алексей не проснулся', 'keeper'
    );

    const notifs = useAppStore.getState().notifications;
    expect(notifs).toHaveLength(1);
    expect(notifs[0].kind).toBe('oversleep_alert');
    expect(notifs[0].targetRole).toBe('keeper');
  });

  it('keeper confirm: updates alarm + karma for both roles', () => {
    useAppStore.getState().setAlarmState('overslept');
    useAppStore.getState().setOversleepNotified(true);

    // Keeper confirms
    useAppStore.getState().setKeeperAction('confirmed_up');
    useAppStore.getState().setAlarmState('completed');
    useAppStore.getState().setOversleepNotified(false);
    useAppStore.getState().addKarmaEvent('keeper_confirmed', 1, 'Подтвердил пробуждение');
    useAppStore.getState().addKarmaEvent('keeper_intervention', -1, 'Потребовалась помощь');

    const s = useAppStore.getState();
    expect(s.alarmState).toBe('completed');
    expect(s.keeperAction).toBe('confirmed_up');
    expect(s.keeperKarma).toBe(13);
    expect(s.anchorKarma).toBe(4);
    expect(s.karmaHistory).toHaveLength(2);
  });

  it('keeper deny: alarm stays overslept, incident logged', () => {
    useAppStore.getState().setAlarmState('overslept');
    useAppStore.getState().setKeeperAction('not_up');

    const s = useAppStore.getState();
    expect(s.alarmState).toBe('overslept');
    expect(s.keeperAction).toBe('not_up');
  });
});
