import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useAppStore } from '../../store/useAppStore';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function ScheduleImportModal({ open, onClose }: Props) {
  const importStatus = useAppStore((s) => s.importStatus);
  const importSchedule = useAppStore((s) => s.importSchedule);
  const denyImport = useAppStore((s) => s.denyImport);
  const resetImportStatus = useAppStore((s) => s.resetImportStatus);
  const addEventLog = useAppStore((s) => s.addEventLog);

  const handleImport = () => {
    importSchedule();
    addEventLog('Импорт расписания из календаря...');
  };

  const handleDeny = () => {
    denyImport();
    addEventLog('Доступ к календарю запрещён');
  };

  const handleClose = () => {
    resetImportStatus();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} title="Импорт из календаря">
      {importStatus === 'idle' && (
        <div className="flex flex-col gap-3">
          <p className="text-campus-muted text-sm">
            Приложение запрашивает доступ к календарю вашего устройства для импорта учебного расписания.
          </p>
          <div className="text-campus-muted text-xs bg-campus-bg rounded-lg p-3">
            Демо-режим: выберите сценарий
          </div>
          <Button fullWidth onClick={handleImport}>
            Разрешить доступ
          </Button>
          <Button fullWidth variant="danger" onClick={handleDeny}>
            Запретить доступ
          </Button>
        </div>
      )}

      {importStatus === 'importing' && (
        <div className="flex flex-col items-center gap-3 py-6">
          <div className="text-3xl animate-spin">⏳</div>
          <p className="text-campus-muted text-sm">Импортируем расписание...</p>
        </div>
      )}

      {importStatus === 'success' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-3xl">✅</div>
          <p className="text-campus-text text-sm font-medium">Расписание успешно импортировано!</p>
          <Button fullWidth onClick={handleClose}>
            Готово
          </Button>
        </div>
      )}

      {importStatus === 'denied' && (
        <div className="flex flex-col items-center gap-3 py-4">
          <div className="text-3xl">🚫</div>
          <p className="text-campus-text text-sm font-medium">Доступ к календарю запрещён</p>
          <p className="text-campus-muted text-xs text-center">
            Вы можете добавить расписание вручную или повторить попытку импорта.
          </p>
          <Button fullWidth onClick={handleClose}>
            Добавить вручную
          </Button>
        </div>
      )}
    </Modal>
  );
}
