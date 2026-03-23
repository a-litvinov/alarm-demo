import { useAppStore } from '../../store/useAppStore';
import { Toast } from './Toast';

export function ToastContainer() {
  const notifications = useAppStore((s) => s.notifications);
  const dismissNotification = useAppStore((s) => s.dismissNotification);

  const unread = notifications.filter((n) => !n.read).slice(0, 3);

  if (unread.length === 0) return null;

  return (
    <div className="absolute top-10 left-3 right-3 z-50 flex flex-col gap-1.5">
      {unread.map((n) => (
        <Toast
          key={n.id}
          message={`${n.title}: ${n.message}`}
          type={n.kind.includes('declined') || n.kind.includes('denied') ? 'error' :
                n.kind.includes('accepted') || n.kind.includes('confirmed') ? 'success' : 'info'}
          onDismiss={() => dismissNotification(n.id)}
          duration={4000}
        />
      ))}
    </div>
  );
}
