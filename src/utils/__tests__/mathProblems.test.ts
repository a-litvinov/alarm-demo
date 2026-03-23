import { describe, it, expect } from 'vitest';
import { generateMathProblem } from '../mathProblems';

describe('generateMathProblem', () => {
  it('generates a problem with display string and numeric answer', () => {
    const problem = generateMathProblem();
    expect(problem.display).toMatch(/\d+ [+\-×] \d+ = \?/);
    expect(typeof problem.answer).toBe('number');
  });

  it('generates correct addition problems', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateMathProblem(1);
      const match = problem.display.match(/(\d+) ([+\-×]) (\d+)/);
      if (match && match[2] === '+') {
        expect(problem.answer).toBe(Number(match[1]) + Number(match[3]));
      }
    }
  });

  it('generates correct subtraction problems (result >= 0)', () => {
    for (let i = 0; i < 20; i++) {
      const problem = generateMathProblem(1);
      const match = problem.display.match(/(\d+) ([+\-×]) (\d+)/);
      if (match && match[2] === '-') {
        expect(problem.answer).toBe(Number(match[1]) - Number(match[3]));
        expect(problem.answer).toBeGreaterThanOrEqual(0);
      }
    }
  });

  it('generates problems at different difficulty levels', () => {
    const easy = generateMathProblem(1);
    const hard = generateMathProblem(3);
    expect(easy.display).toBeTruthy();
    expect(hard.display).toBeTruthy();
  });
});
