import type { User, Friend } from '../types';

export const ANCHOR_USER: User = {
  id: 'anchor-1',
  name: 'Алексей',
  phone: '+7 (999) 123-45-67',
};

export const KEEPER_USER: User = {
  id: 'keeper-1',
  name: 'Марина',
  phone: '+7 (999) 765-43-21',
};

export const MOCK_FRIENDS: Friend[] = [
  { id: 'keeper-1', name: 'Марина', phone: '+7 (999) 765-43-21', karmaScore: 12, isInApp: true },
  { id: 'friend-2', name: 'Дмитрий', phone: '+7 (999) 111-22-33', karmaScore: 8, isInApp: true },
  { id: 'friend-3', name: 'Анна', phone: '+7 (999) 444-55-66', karmaScore: 5, isInApp: true },
  { id: 'friend-4', name: 'Игорь', phone: '+7 (999) 777-88-99', karmaScore: 0, isInApp: false },
];
