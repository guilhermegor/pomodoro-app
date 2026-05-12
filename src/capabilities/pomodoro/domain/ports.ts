export type TimerWorkerInput = {
  activeTask: { startDate: number } | null;
  secondsRemaining: number;
};

export interface ITimerWorker {
  postMessage(input: TimerWorkerInput): void;
  onmessage(cb: (secondsRemaining: number) => void): void;
  terminate(): void;
}
