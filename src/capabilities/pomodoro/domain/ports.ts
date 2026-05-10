export interface ITimerWorker {
  postMessage(message: unknown): void;
  onmessage(cb: (e: MessageEvent) => void): void;
  terminate(): void;
}