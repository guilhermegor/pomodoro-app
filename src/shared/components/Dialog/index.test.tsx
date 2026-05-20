import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ToastContentProps } from 'react-toastify';

import { Dialog } from './index';

function stubProps(closeToast: (v: boolean) => void): ToastContentProps<string> {
  return { closeToast, data: 'Are you sure?' } as ToastContentProps<string>;
}

describe('Dialog', () => {
  it('renders the prompt text from `data`', () => {
    render(<Dialog {...stubProps(() => {})} />);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('renders both Confirm and Cancel buttons', () => {
    render(<Dialog {...stubProps(() => {})} />);
    expect(screen.getByLabelText('Confirmar')).toBeInTheDocument();
    expect(screen.getByLabelText('Cancelar')).toBeInTheDocument();
  });

  it('calls closeToast(true) when Confirm is clicked', async () => {
    const closeToast = jest.fn();
    render(<Dialog {...stubProps(closeToast)} />);
    await userEvent.click(screen.getByLabelText('Confirmar'));
    expect(closeToast).toHaveBeenCalledWith(true);
  });

  it('calls closeToast(false) when Cancel is clicked', async () => {
    const closeToast = jest.fn();
    render(<Dialog {...stubProps(closeToast)} />);
    await userEvent.click(screen.getByLabelText('Cancelar'));
    expect(closeToast).toHaveBeenCalledWith(false);
  });
});
