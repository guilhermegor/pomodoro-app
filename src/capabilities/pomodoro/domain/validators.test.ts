import { validateSettings } from './validators';

describe('validateSettings', () => {
  it('returns ok with parsed numbers when all inputs are valid', () => {
    const result = validateSettings('25', '5', '15');
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value).toEqual({ workTime: 25, shortBreakTime: 5, longBreakTime: 15 });
    }
  });

  it('rejects non-numeric input', () => {
    const result = validateSettings('abc', '5', '15');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain('Digite apenas números');
  });

  it('rejects workTime out of [1, 99]', () => {
    const tooLow = validateSettings('0', '5', '15');
    const tooHigh = validateSettings('100', '5', '15');
    expect(tooLow.ok).toBe(false);
    expect(tooHigh.ok).toBe(false);
    if (!tooLow.ok) expect(tooLow.errors).toContain('Foco: entre 1 e 99');
    if (!tooHigh.ok) expect(tooHigh.errors).toContain('Foco: entre 1 e 99');
  });

  it('rejects shortBreakTime out of [1, 30]', () => {
    const result = validateSettings('25', '31', '15');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain('Descanso curto: entre 1 e 30');
  });

  it('rejects longBreakTime out of [1, 60]', () => {
    const result = validateSettings('25', '5', '61');
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.errors).toContain('Descanso longo: entre 1 e 60');
  });
});
