export type KarmaAction = 'self_wakeup' | 'keeper_intervention' | 'keeper_confirmed';

export interface KarmaEntry {
  id: string;
  action: KarmaAction;
  delta: number;
  description: string;
  timestamp: number;
}
