import type { ReactNode } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { DemoControls } from './DemoControls';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-8 p-8">
      <PhoneFrame>
        {children}
      </PhoneFrame>
      <DemoControls />
    </div>
  );
}
