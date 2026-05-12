import { useCallback } from 'react';
import { CreateTaskDto } from '../domain/dto';
import { TaskActionTypes } from '../domain/enums';
import { TaskActionModel } from './actions';
import { createTask } from './factories';
import { TaskStateModel } from './state';
import { getNextCycle, getNextCycleType } from './task-utils';

export function useStartTask(
  state: TaskStateModel,
  dispatch: React.Dispatch<TaskActionModel>
) {
  return useCallback(
    (dto: CreateTaskDto) => {
      const nextCycle = getNextCycle(state.currentCycle);
      const nextCycleType = getNextCycleType(nextCycle);
      const task = createTask(dto, nextCycleType, state.config[nextCycleType]);
      dispatch({type: TaskActionTypes.START_TASK, payload: task});
    },
    [state.currentCycle, state.config, dispatch],
  );
}

export function useInterruptTask(
  dispatch: React.Dispatch<TaskActionModel>
) {
      return useCallback(() => dispatch({type: TaskActionTypes.INTERRUPT_TASK}),
      [dispatch],
    );
  };

export function useResetState(
  dispatch: React.Dispatch<TaskActionModel>
) {
      return useCallback(() => dispatch({type: TaskActionTypes.RESET_STATE}),
      [dispatch],
    );
  };

export function useChangeSettings(
  dispatch: React.Dispatch<TaskActionModel>
) {
    return useCallback(
      (config: TaskStateModel['config']) => dispatch({type: TaskActionTypes.CHANGE_SETTINGS, payload: config}),
      [dispatch],
    );
  };