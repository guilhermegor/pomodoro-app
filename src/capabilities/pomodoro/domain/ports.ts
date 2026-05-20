export type TimerWorkerInput = {
  activeTask: { startDate: number } | null;
  secondsRemaining: number;
};

export interface ITimerWorker {
  postMessage(input: TimerWorkerInput): void;
  onmessage(cb: (secondsRemaining: number) => void): void;
  terminate(): void;
}

export interface INotifier {
  success(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  info(message: string): void;
  dismiss(): void;
}

export interface IConfirmPrompt {
  ask(question: string, onResponse: (confirmed: boolean) => void): void;
}
