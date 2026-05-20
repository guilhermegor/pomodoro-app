import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import { initialTaskState } from '../../application/initial-state';
import type { TaskModel } from '../../domain/entities';
import { TaskContext } from '../../use-task-context';

import { HistoryPage } from './HistoryPage';

function buildStub(tasks: TaskModel[] = []) {
  return {
    state: { ...initialTaskState, tasks },
    dispatch: jest.fn(),
    notifier: {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn(),
      dismiss: jest.fn(),
    },
    confirmPrompt: { ask: jest.fn() },
  };
}

function renderPage(stub: ReturnType<typeof buildStub>) {
  return render(
    <MemoryRouter>
      <TaskContext.Provider value={stub}>
        <HistoryPage />
      </TaskContext.Provider>
    </MemoryRouter>,
  );
}

const sampleTask = (overrides: Partial<TaskModel> = {}): TaskModel => ({
  id: 't-1',
  name: 'Sample',
  duration: 25,
  type: 'workTime',
  startDate: 1_700_000_000_000,
  completeDate: null,
  interruptDate: null,
  ...overrides,
});

describe('HistoryPage', () => {
  it('shows fallback text when there are no tasks', () => {
    renderPage(buildStub([]));
    expect(screen.getByText('Ainda não existem tarefas criadas.')).toBeInTheDocument();
    expect(screen.queryByLabelText('Apagar histórico')).not.toBeInTheDocument();
  });

  it('renders rows for each task and the trash button when tasks exist', () => {
    const stub = buildStub([
      sampleTask({ id: 't-1', name: 'First' }),
      sampleTask({ id: 't-2', name: 'Second' }),
    ]);
    renderPage(stub);
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getByLabelText('Apagar histórico')).toBeInTheDocument();
  });

  it('calls confirmPrompt.ask when the trash button is clicked', async () => {
    const stub = buildStub([sampleTask()]);
    renderPage(stub);
    await userEvent.click(screen.getByLabelText('Apagar histórico'));
    expect(stub.confirmPrompt.ask).toHaveBeenCalledWith(
      'Tem certeza que deseja apagar todo o histórico?',
      expect.any(Function),
    );
  });
});
