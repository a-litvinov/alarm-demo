import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAppStore } from '../useAppStore';

describe('scheduleSlice', () => {
  beforeEach(() => {
    useAppStore.setState({
      scheduleEntries: [],
      importStatus: 'idle',
    });
  });

  it('starts with empty schedule', () => {
    expect(useAppStore.getState().scheduleEntries).toEqual([]);
    expect(useAppStore.getState().importStatus).toBe('idle');
  });

  it('adds a schedule entry with generated id', () => {
    useAppStore.getState().addScheduleEntry({
      dayOfWeek: 'Пн',
      startTime: '09:00',
      endTime: '10:30',
      subjectName: 'Тест',
    });
    const entries = useAppStore.getState().scheduleEntries;
    expect(entries).toHaveLength(1);
    expect(entries[0].subjectName).toBe('Тест');
    expect(entries[0].id).toBeTruthy();
  });

  it('removes a schedule entry by id', () => {
    useAppStore.getState().addScheduleEntry({
      dayOfWeek: 'Пн',
      startTime: '09:00',
      endTime: '10:30',
    });
    const id = useAppStore.getState().scheduleEntries[0].id;
    useAppStore.getState().removeScheduleEntry(id);
    expect(useAppStore.getState().scheduleEntries).toHaveLength(0);
  });

  it('imports schedule from mock data after delay', async () => {
    vi.useFakeTimers();
    useAppStore.getState().importSchedule();
    expect(useAppStore.getState().importStatus).toBe('importing');

    vi.advanceTimersByTime(1500);
    expect(useAppStore.getState().importStatus).toBe('success');
    expect(useAppStore.getState().scheduleEntries.length).toBeGreaterThan(0);
    vi.useRealTimers();
  });

  it('handles denied import', () => {
    useAppStore.getState().denyImport();
    expect(useAppStore.getState().importStatus).toBe('denied');
  });

  it('resets import status', () => {
    useAppStore.getState().denyImport();
    useAppStore.getState().resetImportStatus();
    expect(useAppStore.getState().importStatus).toBe('idle');
  });
});
