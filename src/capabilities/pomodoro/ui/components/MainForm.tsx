import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';

import { DefaultButton } from '@/shared/components/DefaultButton';
import { DefaultInput } from '@/shared/components/DefaultInput';

import {
  useInterruptTaskWithConfirm,
  useStartTaskWithValidation,
} from '../../application/use-cases';
import { useTaskContext } from '../../use-task-context';

import { Cycles } from './Cycles';
import { Tips } from './Tips';

export function MainForm() {
  const { state, dispatch, notifier, confirmPrompt } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks.at(-1)?.name ?? '';
  const startTask = useStartTaskWithValidation(state, dispatch, notifier);
  const interruptTask = useInterruptTaskWithConfirm(dispatch, notifier, confirmPrompt);

  function handleCreateNewTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTask(taskNameInput.current?.value ?? '');
  }

  return (
    <form className="form" onSubmit={handleCreateNewTask}>
      <div className="formRow">
        <DefaultInput
          id="taskName"
          type="text"
          labelText="Tarefa"
          placeholder="Digite algo"
          ref={taskNameInput}
          disabled={!!state.activeTask}
          defaultValue={lastTaskName}
        />
      </div>

      <div className="formRow">
        <Tips />
      </div>

      {state.currentCycle > 0 && (
        <div className="formRow">
          <Cycles />
        </div>
      )}

      <div className="formRow">
        {state.activeTask ? (
          <DefaultButton
            type="button"
            color="red"
            icon={<StopCircleIcon />}
            aria-label="Interromper tarefa"
            title="Interromper tarefa"
            onClick={interruptTask}
          />
        ) : (
          <DefaultButton
            type="submit"
            icon={<PlayCircleIcon />}
            aria-label="Iniciar nova tarefa"
            title="Iniciar nova tarefa"
          />
        )}
      </div>
    </form>
  );
}
