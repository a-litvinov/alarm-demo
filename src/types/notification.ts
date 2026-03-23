export type NotificationKind =
  | 'keeper_request'
  | 'keeper_accepted'
  | 'keeper_declined'
  | 'oversleep_alert'
  | 'wakeup_confirmed'
  | 'wakeup_denied'
  | 'friend_request'
  | 'invitation_sent';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  targetRole: 'anchor' | 'keeper' | 'both';
}
