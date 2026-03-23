export type TaskType = 'math' | 'shake';
export type AlarmState = 'idle' | 'ringing' | 'task_active' | 'completed' | 'overslept';

export interface MathProblem {
  display: string;
  answer: number;
}

export interface Melody {
  id: string;
  name: string;
  icon: string;
}
