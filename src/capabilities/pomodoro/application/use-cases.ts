import { useCallback } from 'react';

import { CreateTaskDto } from '../domain/dto';
import { TaskActionTypes } from '../domain/enums';
import type { IConfirmPrompt, INotifier } from '../domain/ports';
import { validateSettings } from '../domain/validators';

import { TaskActionModel } from './actions';
import { createTask } from './factories';
import { TaskStateModel } from './state';
import { getNextCycle, getNextCycleType } from './task-utils';

export function useStartTask(state: TaskStateModel, dispatch: React.Dispatch<TaskActionModel>) {
  return useCallback(
    (dto: CreateTaskDto) => {
      const nextCycle = getNextCycle(state.currentCycle);
      const nextCycleType = getNextCycleType(nextCycle);
      const task = createTask(dto, nextCycleType, state.config[nextCycleType]);
      dispatch({ type: TaskActionTypes.START_TASK, payload: task });
    },
    [state.currentCycle, state.config, dispatch],
  );
}

export function useInterruptTask(dispatch: React.Dispatch<TaskActionModel>) {
  return useCallback(() => dispatch({ type: TaskActionTypes.INTERRUPT_TASK }), [dispatch]);
}

export function useResetState(dispatch: React.Dispatch<TaskActionModel>) {
  return useCallback(() => dispatch({ type: TaskActionTypes.RESET_STATE }), [dispatch]);
}

export function useChangeSettings(dispatch: React.Dispatch<TaskActionModel>) {
  return useCallback(
    (config: TaskStateModel['config']) =>
      dispatch({ type: TaskActionTypes.CHANGE_SETTINGS, payload: config }),
    [dispatch],
  );
}

export function useStartTaskWithValidation(
  state: TaskStateModel,
  dispatch: React.Dispatch<TaskActionModel>,
  notifier: INotifier,
) {
  return useCallback(
    (rawName: string) => {
      notifier.dismiss();
      const taskName = rawName.trim();
      if (!taskName) {
        notifier.warning('Digite o nome da tarefa');
        return;
      }
      const nextCycle = getNextCycle(state.currentCycle);
      const nextCycleType = getNextCycleType(nextCycle);
      const task = createTask({ name: taskName }, nextCycleType, state.config[nextCycleType]);
      dispatch({ type: TaskActionTypes.START_TASK, payload: task });
    },
    [state.currentCycle, state.config, dispatch, notifier],
  );
}

export function useInterruptTaskWithConfirm(
  dispatch: React.Dispatch<TaskActionModel>,
  notifier: INotifier,
  confirmPrompt: IConfirmPrompt,
) {
  return useCallback(() => {
    notifier.dismiss();
    confirmPrompt.ask('Tem certeza que deseja interromper a tarefa em andamento?', (confirmed) => {
      if (!confirmed) return;
      dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
      notifier.info('Tarefa interrompida');
    });
  }, [dispatch, notifier, confirmPrompt]);
}

export function useChangeSettingsWithValidation(
  dispatch: React.Dispatch<TaskActionModel>,
  notifier: INotifier,
) {
  return useCallback(
    (workTimeRaw: string, shortBreakRaw: string, longBreakRaw: string) => {
      notifier.dismiss();
      const result = validateSettings(workTimeRaw, shortBreakRaw, longBreakRaw);
      if (!result.ok) {
        result.errors.forEach((err) => notifier.error(err));
        return;
      }
      dispatch({ type: TaskActionTypes.CHANGE_SETTINGS, payload: result.value });
      notifier.success('Configurações salvas');
    },
    [dispatch, notifier],
  );
}

export function useResetStateWithConfirm(
  dispatch: React.Dispatch<TaskActionModel>,
  notifier: INotifier,
  confirmPrompt: IConfirmPrompt,
) {
  return useCallback(() => {
    notifier.dismiss();
    confirmPrompt.ask('Tem certeza que deseja apagar todo o histórico?', (confirmed) => {
      if (!confirmed) return;
      dispatch({ type: TaskActionTypes.RESET_STATE });
      notifier.info('Histórico apagado');
    });
  }, [dispatch, notifier, confirmPrompt]);
}
