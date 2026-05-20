import { createContext, useContext } from 'react';

import type { TaskActionModel } from './application/actions';
import { initialTaskState } from './application/initial-state';
import type { TaskStateModel } from './application/state';
import type { IConfirmPrompt, INotifier } from './domain/ports';

export type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
  notifier: INotifier;
  confirmPrompt: IConfirmPrompt;
};

const noopNotifier: INotifier = {
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {},
  dismiss: () => {},
};

const noopConfirmPrompt: IConfirmPrompt = {
  ask: () => {},
};

export const TaskContext = createContext<TaskContextProps>({
  state: initialTaskState,
  dispatch: () => {},
  notifier: noopNotifier,
  confirmPrompt: noopConfirmPrompt,
});

export function useTaskContext() {
  return useContext(TaskContext);
}
