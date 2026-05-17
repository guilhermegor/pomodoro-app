import { createContext, useContext } from 'react';
import type { TaskActionModel } from './application/actions';
import { initialTaskState } from './application/initial-state';
import type { TaskStateModel } from './application/state';

export type TaskContextProps = {
  state: TaskStateModel;
  dispatch: React.Dispatch<TaskActionModel>;
};

export const TaskContext = createContext<TaskContextProps>({
  state: initialTaskState,
  dispatch: () => {},
});

export function useTaskContext() {
  return useContext(TaskContext);
}
