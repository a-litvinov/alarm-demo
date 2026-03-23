import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('friendsSlice', () => {
  beforeEach(() => {
    useAppStore.setState({
      friends: [
        { id: 'f1', name: 'Тест', phone: '123', karmaScore: 5, isInApp: true },
      ],
      friendRequests: [],
    });
  });

  it('adds a friend', () => {
    useAppStore.getState().addFriend({
      id: 'f2', name: 'Новый', phone: '456', karmaScore: 0, isInApp: true,
    });
    expect(useAppStore.getState().friends).toHaveLength(2);
  });

  it('removes a friend by id', () => {
    useAppStore.getState().removeFriend('f1');
    expect(useAppStore.getState().friends).toHaveLength(0);
  });

  it('accepts a friend request', () => {
    useAppStore.getState().addFriendRequest({
      id: 'r1',
      from: { id: 'f3', name: 'Запрос', phone: '789' },
      status: 'pending',
      timestamp: Date.now(),
    });
    useAppStore.getState().acceptFriendRequest('r1');

    expect(useAppStore.getState().friendRequests).toHaveLength(0);
    expect(useAppStore.getState().friends).toHaveLength(2);
    expect(useAppStore.getState().friends[1].name).toBe('Запрос');
  });

  it('declines a friend request', () => {
    useAppStore.getState().addFriendRequest({
      id: 'r1',
      from: { id: 'f3', name: 'Запрос', phone: '789' },
      status: 'pending',
      timestamp: Date.now(),
    });
    useAppStore.getState().declineFriendRequest('r1');

    expect(useAppStore.getState().friendRequests).toHaveLength(0);
    expect(useAppStore.getState().friends).toHaveLength(1);
  });
});

describe('karmaSlice', () => {
  beforeEach(() => {
    useAppStore.setState({
      anchorKarma: 5,
      keeperKarma: 10,
      karmaHistory: [],
    });
  });

  it('adds karma for self_wakeup (anchor)', () => {
    useAppStore.getState().addKarmaEvent('self_wakeup', 1, 'Проснулся сам');
    expect(useAppStore.getState().anchorKarma).toBe(6);
    expect(useAppStore.getState().keeperKarma).toBe(10);
    expect(useAppStore.getState().karmaHistory).toHaveLength(1);
  });

  it('deducts karma for keeper_intervention (anchor)', () => {
    useAppStore.getState().addKarmaEvent('keeper_intervention', -1, 'Помощь хранителя');
    expect(useAppStore.getState().anchorKarma).toBe(4);
    expect(useAppStore.getState().keeperKarma).toBe(10);
  });

  it('adds karma for keeper_confirmed (keeper)', () => {
    useAppStore.getState().addKarmaEvent('keeper_confirmed', 1, 'Подтвердил пробуждение');
    expect(useAppStore.getState().anchorKarma).toBe(5);
    expect(useAppStore.getState().keeperKarma).toBe(11);
  });

  it('records history entries in reverse chronological order', () => {
    useAppStore.getState().addKarmaEvent('self_wakeup', 1, 'Первое');
    useAppStore.getState().addKarmaEvent('keeper_confirmed', 1, 'Второе');

    const history = useAppStore.getState().karmaHistory;
    expect(history[0].description).toBe('Второе');
    expect(history[1].description).toBe('Первое');
  });

  it('resets karma', () => {
    useAppStore.getState().addKarmaEvent('self_wakeup', 1, 'test');
    useAppStore.getState().resetKarma();
    expect(useAppStore.getState().anchorKarma).toBe(5);
    expect(useAppStore.getState().keeperKarma).toBe(12);
    expect(useAppStore.getState().karmaHistory).toEqual([]);
  });
});
