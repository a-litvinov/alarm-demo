import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppShell } from '../layout/AppShell';
import { useAppStore } from '../../store/useAppStore';

describe('Layout components', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentRole: 'anchor',
      activeTab: 'home',
      scenarioStep: 1,
      eventLog: [],
      overlay: null,
    });
  });

  it('renders phone frame with children', () => {
    render(
      <AppShell>
        <div data-testid="content">Hello</div>
      </AppShell>
    );
    expect(screen.getByTestId('content')).toHaveTextContent('Hello');
  });

  it('renders bottom tab bar with 4 tabs', () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );
    expect(screen.getByText('Главная')).toBeInTheDocument();
    expect(screen.getByText('Расписание')).toBeInTheDocument();
    expect(screen.getByText('Друзья')).toBeInTheDocument();
    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  it('switches tabs on click', async () => {
    const user = userEvent.setup();
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    await user.click(screen.getByText('Расписание'));
    expect(useAppStore.getState().activeTab).toBe('schedule');

    await user.click(screen.getByText('Друзья'));
    expect(useAppStore.getState().activeTab).toBe('friends');
  });

  it('renders demo controls with role switcher', () => {
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );
    expect(screen.getByText('Якорь')).toBeInTheDocument();
    expect(screen.getByText('Хранитель')).toBeInTheDocument();
  });

  it('switches role via demo controls', async () => {
    const user = userEvent.setup();
    render(
      <AppShell>
        <div>content</div>
      </AppShell>
    );

    await user.click(screen.getByText('Хранитель'));
    expect(useAppStore.getState().currentRole).toBe('keeper');

    await user.click(screen.getByText('Якорь'));
    expect(useAppStore.getState().currentRole).toBe('anchor');
  });
});
