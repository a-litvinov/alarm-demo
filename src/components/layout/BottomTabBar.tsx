import { useAppStore } from '../../store/useAppStore';
import type { Tab } from '../../types';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: '⏰' },
  { id: 'schedule', label: 'Расписание', icon: '📅' },
  { id: 'friends', label: 'Друзья', icon: '👥' },
  { id: 'profile', label: 'Профиль', icon: '👤' },
];

export function BottomTabBar() {
  const activeTab = useAppStore((s) => s.activeTab);
  const setActiveTab = useAppStore((s) => s.setActiveTab);

  return (
    <div className="flex items-center justify-around bg-campus-surface border-t border-campus-border px-2 pb-5 pt-2">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              isActive
                ? 'text-campus-primary'
                : 'text-campus-muted hover:text-campus-text'
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
