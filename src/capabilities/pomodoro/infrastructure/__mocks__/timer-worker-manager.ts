import type { ITimerWorker, TimerWorkerInput } from '../../domain/ports';

/**
 * Jest manual mock. The real implementation uses `new URL('./timer-worker.js', import.meta.url)`
 * which only Webpack rewrites; Jest's babel transform doesn't handle it. Tests that mount
 * `TaskContextProvider` (directly or transitively via the barrel) pick up this stub instead.
 *
 * The stub satisfies `ITimerWorker` and records nothing — tests that need to assert worker
 * interactions should mock `TimerWorkerManager.getInstance` per-test instead of relying on
 * this default.
 */
export class TimerWorkerManager implements ITimerWorker {
  private static instance: TimerWorkerManager | null = null;

  private constructor() {}

  static getInstance(): TimerWorkerManager {
    if (!TimerWorkerManager.instance) {
      TimerWorkerManager.instance = new TimerWorkerManager();
    }
    return TimerWorkerManager.instance;
  }

  postMessage(_input: TimerWorkerInput): void {}
  onmessage(_cb: (secondsRemaining: number) => void): void {}
  terminate(): void {
    TimerWorkerManager.instance = null;
  }
}
