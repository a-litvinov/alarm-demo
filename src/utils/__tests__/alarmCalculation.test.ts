import { describe, it, expect } from 'vitest';
import { calculateAlarmTime, getFirstClass, getEntriesForDay } from '../alarmCalculation';
import type { ScheduleEntry } from '../../types';

const ENTRIES: ScheduleEntry[] = [
  { id: '1', dayOfWeek: 'Пн', startTime: '09:00', endTime: '10:30', subjectName: 'Матан' },
  { id: '2', dayOfWeek: 'Пн', startTime: '11:00', endTime: '12:30', subjectName: 'Физика' },
  { id: '3', dayOfWeek: 'Вт', startTime: '08:30', endTime: '10:00', subjectName: 'Английский' },
];

describe('calculateAlarmTime', () => {
  it('subtracts prep time from class start', () => {
    expect(calculateAlarmTime('09:00', 45)).toBe('08:15');
  });

  it('handles midnight wrap-around', () => {
    expect(calculateAlarmTime('00:30', 45)).toBe('23:45');
  });

  it('handles exact hour boundary', () => {
    expect(calculateAlarmTime('10:00', 60)).toBe('09:00');
  });

  it('handles zero prep time', () => {
    expect(calculateAlarmTime('08:30', 0)).toBe('08:30');
  });

  it('handles large prep time crossing midnight', () => {
    expect(calculateAlarmTime('01:00', 120)).toBe('23:00');
  });
});

describe('getEntriesForDay', () => {
  it('returns entries for the specified day sorted by start time', () => {
    const result = getEntriesForDay(ENTRIES, 'Пн');
    expect(result).toHaveLength(2);
    expect(result[0].startTime).toBe('09:00');
    expect(result[1].startTime).toBe('11:00');
  });

  it('returns empty array for day with no entries', () => {
    expect(getEntriesForDay(ENTRIES, 'Ср')).toEqual([]);
  });
});

describe('getFirstClass', () => {
  it('returns the earliest class for a day', () => {
    const first = getFirstClass(ENTRIES, 'Пн');
    expect(first?.startTime).toBe('09:00');
  });

  it('returns null when no classes on that day', () => {
    expect(getFirstClass(ENTRIES, 'Сб')).toBeNull();
  });
});
