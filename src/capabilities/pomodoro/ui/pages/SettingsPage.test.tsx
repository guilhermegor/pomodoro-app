import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

import { initialTaskState } from '../../application/initial-state';
import { TaskContext } from '../../use-task-context';

import { SettingsPage } from './SettingsPage';

function buildStub(overrides: Partial<typeof initialTaskState> = {}) {
  return {
    state: { ...initialTaskState, ...overrides },
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
        <SettingsPage />
      </TaskContext.Provider>
    </MemoryRouter>,
  );
}

describe('SettingsPage', () => {
  it('renders inputs prefilled with current state.config values', () => {
    const stub = buildStub();
    renderPage(stub);
    expect(screen.getByLabelText('Foco')).toHaveValue(stub.state.config.workTime);
    expect(screen.getByLabelText('Descanso curto')).toHaveValue(stub.state.config.shortBreakTime);
    expect(screen.getByLabelText('Descanso longo')).toHaveValue(stub.state.config.longBreakTime);
  });

  it('dispatches CHANGE_SETTINGS with parsed payload on valid submit', async () => {
    const stub = buildStub();
    renderPage(stub);
    const workInput = screen.getByLabelText('Foco');
    await userEvent.clear(workInput);
    await userEvent.type(workInput, '30');
    await userEvent.click(screen.getByLabelText('Salvar'));
    expect(stub.dispatch).toHaveBeenCalledWith({
      type: 'CHANGE_SETTINGS',
      payload: expect.objectContaining({ workTime: 30 }),
    });
    expect(stub.notifier.success).toHaveBeenCalledWith('Configurações salvas');
  });

  it('shows error toasts and does not dispatch on invalid input', async () => {
    const stub = buildStub();
    renderPage(stub);
    const workInput = screen.getByLabelText('Foco');
    await userEvent.clear(workInput);
    await userEvent.type(workInput, '999');
    await userEvent.click(screen.getByLabelText('Salvar'));
    expect(stub.notifier.error).toHaveBeenCalledWith('Foco: entre 1 e 99');
    expect(stub.dispatch).not.toHaveBeenCalled();
  });
});
