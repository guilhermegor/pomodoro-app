import { useEffect, useMemo, useReducer, useRef } from 'react';

import { Dialog } from '@/shared/components/Dialog';

import { initialTaskState } from './application/initial-state';
import { taskReducer } from './application/reducer';
import { TaskActionTypes } from './domain/enums';
import { showMessage } from './infrastructure/show-message';
import { TimerWorkerManager } from './infrastructure/timer-worker-manager';
import { ToastConfirmPrompt } from './infrastructure/toast-confirm-prompt';
import { TaskContext } from './use-task-context';

type TaskContextProviderProps = { children: React.ReactNode };

export function TaskContextProvider({ children }: TaskContextProviderProps) {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
    const stored = localStorage.getItem('pomodoro_state');
    if (!stored) return initialTaskState;
    const parsed = JSON.parse(stored) as typeof initialTaskState;
    return {
      ...parsed,
      activeTask: null,
      secondsRemaining: 0,
      formattedSecondsRemaining: '00:00',
    };
  });

  const playBeepRef = useRef<(() => void) | null>(null);
  const worker = TimerWorkerManager.getInstance();
  const confirmPrompt = useMemo(() => new ToastConfirmPrompt(Dialog), []);

  useEffect(() => {
    worker.onmessage((countDownSeconds) => {
      if (countDownSeconds <= 0) {
        playBeepRef.current?.();
        playBeepRef.current = null;
        dispatch({ type: TaskActionTypes.COMPLETE_TASK });
        worker.terminate();
      } else {
        dispatch({
          type: TaskActionTypes.COUNT_DOWN,
          payload: { secondsRemaining: countDownSeconds },
        });
      }
    });
  }, [worker]);

  useEffect(() => {
    localStorage.setItem('pomodoro_state', JSON.stringify(state));
    if (!state.activeTask) worker.terminate();
    document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;
    worker.postMessage({
      activeTask: state.activeTask ? { startDate: state.activeTask.startDate } : null,
      secondsRemaining: state.secondsRemaining,
    });
  }, [worker, state]);

  useEffect(() => {
    if (state.activeTask && !playBeepRef.current) {
      playBeepRef.current = createBeep();
    } else if (!state.activeTask) {
      playBeepRef.current = null;
    }
  }, [state.activeTask]);

  return (
    <TaskContext.Provider value={{ state, dispatch, notifier: showMessage, confirmPrompt }}>
      {children}
    </TaskContext.Provider>
  );
}

function createBeep() {
  const audioContext = new AudioContext();
  return () => {
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.type = 'sine';
    oscillator.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };
}
