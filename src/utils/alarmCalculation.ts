import type { ScheduleEntry, DayOfWeek } from '../types';

const DAY_MAP: Record<number, DayOfWeek> = {
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб',
};

export function getTomorrowDay(): DayOfWeek {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const jsDay = tomorrow.getDay();
  // Sunday (0) has no classes — fall back to Monday for demo purposes
  return DAY_MAP[jsDay] ?? 'Пн';
}

export function getEntriesForDay(entries: ScheduleEntry[], day: DayOfWeek): ScheduleEntry[] {
  return entries
    .filter((e) => e.dayOfWeek === day)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));
}

export function getFirstClass(entries: ScheduleEntry[], day: DayOfWeek): ScheduleEntry | null {
  const dayEntries = getEntriesForDay(entries, day);
  return dayEntries[0] ?? null;
}

export function calculateAlarmTime(firstClassStart: string, prepMinutes: number): string {
  const [hours, minutes] = firstClassStart.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes - prepMinutes;
  const alarmHours = Math.floor(((totalMinutes % 1440) + 1440) % 1440 / 60);
  const alarmMinutes = ((totalMinutes % 60) + 60) % 60;
  return `${String(alarmHours).padStart(2, '0')}:${String(alarmMinutes).padStart(2, '0')}`;
}

export function formatTimeDisplay(time: string): string {
  return time;
}
