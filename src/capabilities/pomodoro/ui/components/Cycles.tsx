import { getNextCycle, getNextCycleType } from '../../application/task-utils';
import { useTaskContext } from '../../use-task-context';

import styles from './Cycles.module.css';

export function Cycles() {
  const { state } = useTaskContext();
  const cycleStep = Array.from({ length: state.currentCycle });
  const labels = {
    workTime: 'foco',
    shortBreakTime: 'descanso curto',
    longBreakTime: 'descanso longo',
  };

  return (
    <div className={styles.cycles}>
      <span>Ciclos:</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, i) => {
          const cycle = getNextCycle(i);
          const type = getNextCycleType(cycle);
          return (
            <span
              key={cycle}
              className={`${styles.cycleDot} ${styles[type]}`}
              aria-label={`Ciclo de ${labels[type]}`}
              title={labels[type]}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
