import type { ScheduleEntry } from '../types';

export const MOCK_SCHEDULE: ScheduleEntry[] = [
  { id: 's1', dayOfWeek: 'Пн', startTime: '09:00', endTime: '10:30', subjectName: 'Математический анализ' },
  { id: 's2', dayOfWeek: 'Пн', startTime: '10:45', endTime: '12:15', subjectName: 'Программирование' },
  { id: 's3', dayOfWeek: 'Пн', startTime: '13:00', endTime: '14:30', subjectName: 'Физика' },
  { id: 's4', dayOfWeek: 'Вт', startTime: '08:30', endTime: '10:00', subjectName: 'Английский язык' },
  { id: 's5', dayOfWeek: 'Вт', startTime: '10:15', endTime: '11:45', subjectName: 'История' },
  { id: 's6', dayOfWeek: 'Ср', startTime: '09:00', endTime: '10:30', subjectName: 'Линейная алгебра' },
  { id: 's7', dayOfWeek: 'Ср', startTime: '11:00', endTime: '12:30', subjectName: 'Дискретная математика' },
  { id: 's8', dayOfWeek: 'Чт', startTime: '08:00', endTime: '09:30', subjectName: 'Физкультура' },
  { id: 's9', dayOfWeek: 'Чт', startTime: '10:00', endTime: '11:30', subjectName: 'Базы данных' },
  { id: 's10', dayOfWeek: 'Пт', startTime: '09:30', endTime: '11:00', subjectName: 'Философия' },
  { id: 's11', dayOfWeek: 'Пт', startTime: '11:15', endTime: '12:45', subjectName: 'Операционные системы' },
  { id: 's12', dayOfWeek: 'Сб', startTime: '10:00', endTime: '11:30', subjectName: 'Факультатив: ML' },
];
