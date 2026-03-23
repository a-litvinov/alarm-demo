import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ScheduleScreen } from '../schedule/ScheduleScreen';
import { useAppStore } from '../../store/useAppStore';

describe('ScheduleScreen', () => {
  beforeEach(() => {
    useAppStore.setState({
      scheduleEntries: [
        { id: 't1', dayOfWeek: 'Пн', startTime: '09:00', endTime: '10:30', subjectName: 'Матанализ' },
        { id: 't2', dayOfWeek: 'Пн', startTime: '11:00', endTime: '12:30', subjectName: 'Физика' },
        { id: 't3', dayOfWeek: 'Вт', startTime: '08:30', endTime: '10:00', subjectName: 'Английский' },
      ],
      importStatus: 'idle',
      overlay: null,
      eventLog: [],
    });
  });

  it('renders schedule title', () => {
    render(<ScheduleScreen />);
    expect(screen.getByText('Расписание')).toBeInTheDocument();
  });

  it('shows entries for selected day', () => {
    render(<ScheduleScreen />);
    // Default is Monday (Пн)
    expect(screen.getByText('Матанализ')).toBeInTheDocument();
    expect(screen.getByText('Физика')).toBeInTheDocument();
    expect(screen.queryByText('Английский')).not.toBeInTheDocument();
  });

  it('switches day tabs', async () => {
    const user = userEvent.setup();
    render(<ScheduleScreen />);

    await user.click(screen.getByText('Вт'));
    expect(screen.getByText('Английский')).toBeInTheDocument();
    expect(screen.queryByText('Матанализ')).not.toBeInTheDocument();
  });

  it('shows empty state for day without entries', async () => {
    const user = userEvent.setup();
    render(<ScheduleScreen />);

    await user.click(screen.getByText('Ср'));
    expect(screen.getByText('Нет пар на Ср')).toBeInTheDocument();
  });

  it('removes an entry when delete is clicked', async () => {
    const user = userEvent.setup();
    render(<ScheduleScreen />);

    const deleteButtons = screen.getAllByText('✕');
    await user.click(deleteButtons[0]);
    expect(useAppStore.getState().scheduleEntries).toHaveLength(2);
  });
});
