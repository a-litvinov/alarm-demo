import type { MathProblem } from '../types';

type Op = '+' | '-' | '*';

export function generateMathProblem(difficulty: number = 1): MathProblem {
  const ops: Op[] = ['+', '-', '*'];
  const op = ops[Math.floor(Math.random() * (difficulty > 2 ? 3 : 2))];

  let a: number, b: number, answer: number;

  switch (op) {
    case '+':
      a = randInt(10, 50 + difficulty * 20);
      b = randInt(10, 50 + difficulty * 20);
      answer = a + b;
      break;
    case '-':
      a = randInt(20, 60 + difficulty * 20);
      b = randInt(5, a);
      answer = a - b;
      break;
    case '*':
      a = randInt(2, 9 + difficulty);
      b = randInt(2, 9 + difficulty);
      answer = a * b;
      break;
  }

  const opSymbol = op === '*' ? '×' : op;
  return {
    display: `${a} ${opSymbol} ${b} = ?`,
    answer,
  };
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
