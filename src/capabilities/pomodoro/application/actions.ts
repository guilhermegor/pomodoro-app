import { TaskModel } from '../domain/entities';
import { TaskActionTypes } from '../domain/enums';
import { TaskStateModel } from './state';

export type TaskActionsWithPayload = 
  | {type: TaskActionTypes.START_TASK; payload: TaskModel}
  | {type: TaskActionTypes.COUNT_DOWN; payload: {secondsRemaining: number}}
  | {type: TaskActionTypes.CHANGE_SETTINGS; payload: TaskStateModel['config']};

export type TaskActionsWithoutPayload = 
  | {type: TaskActionTypes.RESET_STATE}
  | {type: TaskActionTypes.INTERRUPT_TASK}
  | {type: TaskActionTypes.COMPLETE_TASK};

export type TaskActionModel = TaskActionsWithPayload | TaskActionsWithoutPayload