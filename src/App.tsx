import { AppShell } from './components/layout/AppShell';
import { HomeScreen } from './components/alarm/HomeScreen';
import { AlarmActiveScreen } from './components/alarm/AlarmActiveScreen';
import { KeeperHomeScreen } from './components/keeper/KeeperHomeScreen';
import { KeeperAssignScreen } from './components/keeper/KeeperAssignScreen';
import { KeeperWakeupScreen } from './components/keeper/KeeperWakeupScreen';
import { ScheduleScreen } from './components/schedule/ScheduleScreen';
import { FriendsScreen } from './components/friends/FriendsScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { useAppStore } from './store/useAppStore';

function OverlayRouter() {
  const overlay = useAppStore((s) => s.overlay);

  switch (overlay) {
    case 'keeper_assign':
      return <KeeperAssignScreen />;
    default:
      return null;
  }
}

function ScreenRouter() {
  const activeTab = useAppStore((s) => s.activeTab);
  const currentRole = useAppStore((s) => s.currentRole);

  switch (activeTab) {
    case 'home':
      if (currentRole === 'anchor') return <HomeScreen />;
      return <KeeperHomeScreen />;
    case 'schedule':
      return <ScheduleScreen />;
    case 'friends':
      return <FriendsScreen />;
    case 'profile':
      return <ProfileScreen />;
    default:
      return null;
  }
}

export default function App() {
  return (
    <AppShell>
      <ScreenRouter />
      <OverlayRouter />
      <AlarmActiveScreen />
      <KeeperWakeupScreen />
    </AppShell>
  );
}
