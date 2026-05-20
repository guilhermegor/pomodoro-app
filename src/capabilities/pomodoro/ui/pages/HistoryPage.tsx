import { TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Container } from '@/shared/components/Container';
import { DefaultButton } from '@/shared/components/DefaultButton';
import { Heading } from '@/shared/components/Heading';
import { MainTemplate } from '@/shared/templates/MainTemplate';

import { formatDate, getTaskStatus, sortTasks } from '../../application/task-utils';
import { useResetStateWithConfirm } from '../../application/use-cases';
import type { TaskModel } from '../../domain/entities';
import { useTaskContext } from '../../use-task-context';

import styles from './HistoryPage.module.css';

export function HistoryPage() {
  const { state, dispatch, notifier, confirmPrompt } = useTaskContext();
  const hasTasks = state.tasks.length > 0;
  const resetWithConfirm = useResetStateWithConfirm(dispatch, notifier, confirmPrompt);

  const [sortField, setSortField] = useState<keyof TaskModel>('startDate');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortedTasks = sortTasks({
    tasks: state.tasks,
    field: sortField,
    direction: sortDirection,
  });

  useEffect(() => {
    document.title = 'Histórico - Chronos Pomodoro';
  }, []);

  useEffect(
    () => () => {
      notifier.dismiss();
    },
    [notifier],
  );

  function handleSort(field: keyof TaskModel) {
    if (field === sortField) {
      setSortDirection((d) => (d === 'desc' ? 'asc' : 'desc'));
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  }

  const typeLabel = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
  };

  return (
    <MainTemplate>
      <Container>
        <Heading>
          <span>Histórico</span>
          {hasTasks && (
            <span className={styles.buttonContainer}>
              <DefaultButton
                icon={<TrashIcon />}
                color="red"
                aria-label="Apagar histórico"
                title="Apagar histórico"
                onClick={resetWithConfirm}
              />
            </span>
          )}
        </Heading>
      </Container>
      <Container>
        {hasTasks ? (
          <div className={styles.responsiveTable}>
            <table>
              <thead>
                <tr>
                  <th className={styles.thSort} onClick={() => handleSort('name')}>
                    Tarefa ↕
                  </th>
                  <th className={styles.thSort} onClick={() => handleSort('duration')}>
                    Duração ↕
                  </th>
                  <th className={styles.thSort} onClick={() => handleSort('startDate')}>
                    Data ↕
                  </th>
                  <th>Status</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {sortedTasks.map((task) => (
                  <tr key={task.id}>
                    <td>{task.name}</td>
                    <td>{task.duration}min</td>
                    <td>{formatDate(task.startDate)}</td>
                    <td>{getTaskStatus(task, state.activeTask)}</td>
                    <td>{typeLabel[task.type]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ textAlign: 'center', fontWeight: 'bold' }}>
            Ainda não existem tarefas criadas.
          </p>
        )}
      </Container>
    </MainTemplate>
  );
}
