import type { UpdateSettingsDto } from './dto';

/**
 * Domain-owned validation for raw settings input.
 *
 * Rules ("what counts as valid Settings") are domain knowledge, not
 * application orchestration — they live alongside ports and DTOs. The
 * function is pure and React-free; use it from any layer that needs to
 * validate raw user input against the domain contract.
 *
 * Returns a discriminated union so TypeScript narrows `.value` /
 * `.errors` access depending on the `ok` flag — no runtime guards
 * needed at the call site.
 */
export type SettingsValidationResult =
  | { ok: true; value: UpdateSettingsDto }
  | { ok: false; errors: string[] };

export function validateSettings(
  workTimeRaw: string,
  shortBreakRaw: string,
  longBreakRaw: string,
): SettingsValidationResult {
  const workTime = Number(workTimeRaw);
  const shortBreakTime = Number(shortBreakRaw);
  const longBreakTime = Number(longBreakRaw);
  const errors: string[] = [];

  if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
    errors.push('Digite apenas números');
  }
  if (workTime < 1 || workTime > 99) errors.push('Foco: entre 1 e 99');
  if (shortBreakTime < 1 || shortBreakTime > 30) {
    errors.push('Descanso curto: entre 1 e 30');
  }
  if (longBreakTime < 1 || longBreakTime > 60) {
    errors.push('Descanso longo: entre 1 e 60');
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, value: { workTime, shortBreakTime, longBreakTime } };
}
