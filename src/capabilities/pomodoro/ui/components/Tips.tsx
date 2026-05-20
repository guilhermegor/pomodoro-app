import { getNextCycle, getNextCycleType } from '../../application/task-utils';
import { useTaskContext } from '../../use-task-context';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const active = state.activeTask;

  if (active) {
    const tips = {
      workTime: <span>Foque por {state.config.workTime}min</span>,
      shortBreakTime: <span>Descanse por {state.config.shortBreakTime}min</span>,
      longBreakTime: <span>Descanso longo</span>,
    };
    return <>{tips[active.type]}</>;
  }

  const tips = {
    workTime: <span>Próximo ciclo é de {state.config.workTime}min</span>,
    shortBreakTime: (
      <span>
        Próximo descanso é de <b>{state.config.shortBreakTime}min</b>
      </span>
    ),
    longBreakTime: <span>Próximo descanso será longo</span>,
  };
  return <>{tips[nextCycleType]}</>;
}
