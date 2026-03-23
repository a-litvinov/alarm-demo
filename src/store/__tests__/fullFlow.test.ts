import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('full demo flow (end-to-end store)', () => {
  beforeEach(() => {
    // Reset all state
    useAppStore.setState({
      currentRole: 'anchor',
      scenarioStep: 1,
      activeTab: 'home',
      overlay: null,
      eventLog: [],
      scheduleEntries: [],
      importStatus: 'idle',
      alarmEnabled: true,
      alarmManualTime: null,
      prepTimeMinutes: 45,
      melodyId: 'classic',
      taskType: 'math',
      alarmState: 'idle',
      taskProblem: '',
      taskAnswer: 0,
      remainingSeconds: 300,
      assignedKeeperId: null,
      keeperRequestStatus: 'none',
      keeperAction: 'none',
      oversleepNotified: false,
      friends: [
        { id: 'keeper-1', name: 'Марина', phone: '+7', karmaScore: 12, isInApp: true },
      ],
      friendRequests: [],
      anchorKarma: 5,
      keeperKarma: 12,
      karmaHistory: [],
      notifications: [],
    });
  });

  it('completes the happy path: schedule → alarm → self-wakeup', () => {
    const s = useAppStore.getState;

    // Step 1: Import schedule
    vi.useFakeTimers();
    s().importSchedule();
    vi.advanceTimersByTime(1500);
    expect(s().scheduleEntries.length).toBeGreaterThan(0);
    vi.useRealTimers();

    // Step 2: Alarm is enabled by default
    expect(s().alarmEnabled).toBe(true);

    // Step 3: Assign keeper
    s().assignKeeper('keeper-1');
    expect(s().keeperRequestStatus).toBe('sent');

    // Step 4: Keeper accepts
    s().setKeeperRequestStatus('accepted');

    // Step 5: Alarm triggers
    s().setAlarmState('ringing');
    s().setTask('10 + 5 = ?', 15);
    s().setRemainingSeconds(300);
    expect(s().alarmState).toBe('ringing');

    // Step 5: User solves task correctly → alarm completed
    s().setAlarmState('completed');
    s().addKarmaEvent('self_wakeup', 1, 'Проснулся самостоятельно');

    expect(s().alarmState).toBe('completed');
    expect(s().anchorKarma).toBe(6);
  });

  it('completes the escalation path: schedule → alarm → oversleep → keeper confirm', () => {
    const s = useAppStore.getState;

    // Import schedule
    vi.useFakeTimers();
    s().importSchedule();
    vi.advanceTimersByTime(1500);
    vi.useRealTimers();

    // Assign and accept keeper
    s().assignKeeper('keeper-1');
    s().setKeeperRequestStatus('accepted');

    // Alarm triggers and times out
    s().setAlarmState('ringing');
    s().setTask('99 + 88 = ?', 187);
    s().setRemainingSeconds(0);

    // Oversleep
    s().setAlarmState('overslept');
    s().setOversleepNotified(true);
    s().addNotification('oversleep_alert', 'Проспал!', 'Позвони!', 'keeper');

    expect(s().notifications).toHaveLength(1);

    // Keeper confirms
    s().setKeeperAction('confirmed_up');
    s().setAlarmState('completed');
    s().setOversleepNotified(false);
    s().addKarmaEvent('keeper_confirmed', 1, 'Подтвердил');
    s().addKarmaEvent('keeper_intervention', -1, 'Помощь');

    expect(s().alarmState).toBe('completed');
    expect(s().keeperKarma).toBe(13);
    expect(s().anchorKarma).toBe(4);
  });

  it('handles edge case: no classes tomorrow', () => {
    // Schedule is empty, no first class
    expect(useAppStore.getState().scheduleEntries).toEqual([]);
    // Manual time should be settable
    useAppStore.getState().setManualTime('09:00');
    expect(useAppStore.getState().alarmManualTime).toBe('09:00');
  });

  it('handles edge case: keeper declines', () => {
    const s = useAppStore.getState;
    s().assignKeeper('keeper-1');
    s().setKeeperRequestStatus('declined');
    expect(s().keeperRequestStatus).toBe('declined');
    // Anchor can reassign
    s().resetKeeper();
    s().assignKeeper('keeper-1');
    expect(s().keeperRequestStatus).toBe('sent');
  });
});
