import { ITimerWorker, TimerWorkerInput } from '../domain/ports';

let instance: TimerWorkerManager | null = null;

export class TimerWorkerManager implements ITimerWorker {
  private worker: Worker;

  private constructor() {
    this.worker = new Worker(new URL('./timer-worker.js', import.meta.url));
  }

  static getInstance(): TimerWorkerManager {
    if (!instance) instance = new TimerWorkerManager();
    return instance;
  }

  postMessage(input: TimerWorkerInput): void {
    this.worker.postMessage(input);
  }

  onmessage(cb: (secondsRemaining: number) => void): void {
    this.worker.onmessage = (e: MessageEvent) => cb(e.data as number);
  }

  terminate(): void {
    this.worker.terminate();
    instance = null;
  }
}
