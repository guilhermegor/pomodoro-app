import { render, screen } from '@testing-library/react';

import { initialTaskState } from '../../application/initial-state';
import { TaskContext } from '../../use-task-context';

import { CountDown } from './CountDown';

describe('CountDown', () => {
  it('renders the formattedSecondsRemaining from context', () => {
    const stub = {
      state: { ...initialTaskState, formattedSecondsRemaining: '12:34' },
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
    render(
      <TaskContext.Provider value={stub}>
        <CountDown />
      </TaskContext.Provider>,
    );
    expect(screen.getByText('12:34')).toBeInTheDocument();
  });
});
