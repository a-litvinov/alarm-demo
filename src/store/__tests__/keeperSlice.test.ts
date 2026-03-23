import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('keeperSlice', () => {
  beforeEach(() => {
    useAppStore.setState({
      assignedKeeperId: null,
      keeperRequestStatus: 'none',
      keeperAction: 'none',
      oversleepNotified: false,
      notifications: [],
    });
  });

  it('assigns a keeper and sets status to sent', () => {
    useAppStore.getState().assignKeeper('keeper-1');
    expect(useAppStore.getState().assignedKeeperId).toBe('keeper-1');
    expect(useAppStore.getState().keeperRequestStatus).toBe('sent');
  });

  it('updates request status to accepted', () => {
    useAppStore.getState().assignKeeper('keeper-1');
    useAppStore.getState().setKeeperRequestStatus('accepted');
    expect(useAppStore.getState().keeperRequestStatus).toBe('accepted');
  });

  it('updates request status to declined', () => {
    useAppStore.getState().assignKeeper('keeper-1');
    useAppStore.getState().setKeeperRequestStatus('declined');
    expect(useAppStore.getState().keeperRequestStatus).toBe('declined');
  });

  it('sets oversleep notified flag', () => {
    useAppStore.getState().setOversleepNotified(true);
    expect(useAppStore.getState().oversleepNotified).toBe(true);
  });

  it('resets keeper state', () => {
    useAppStore.getState().assignKeeper('keeper-1');
    useAppStore.getState().setKeeperRequestStatus('accepted');
    useAppStore.getState().setOversleepNotified(true);
    useAppStore.getState().resetKeeper();

    const s = useAppStore.getState();
    expect(s.assignedKeeperId).toBeNull();
    expect(s.keeperRequestStatus).toBe('none');
    expect(s.oversleepNotified).toBe(false);
  });

  it('cross-role: assigning keeper creates notification for keeper', () => {
    useAppStore.getState().assignKeeper('keeper-1');
    useAppStore.getState().addNotification(
      'keeper_request', 'Запрос', 'Алексей просит разбудить', 'keeper'
    );
    const notifs = useAppStore.getState().notifications;
    expect(notifs).toHaveLength(1);
    expect(notifs[0].targetRole).toBe('keeper');
    expect(notifs[0].kind).toBe('keeper_request');
  });
});
