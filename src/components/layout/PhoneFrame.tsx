import type { ReactNode } from 'react';
import { StatusBar } from './StatusBar';
import { BottomTabBar } from './BottomTabBar';
import { ToastContainer } from '../common/ToastContainer';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-[375px] h-[812px] bg-campus-bg rounded-[40px] border-2 border-campus-border shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-20" />

      {/* Status bar */}
      <div className="pt-7 relative z-10">
        <StatusBar />
      </div>

      {/* Toast notifications */}
      <ToastContainer />

      {/* Screen content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {children}
      </div>

      {/* Bottom tab bar */}
      <BottomTabBar />
    </div>
  );
}
