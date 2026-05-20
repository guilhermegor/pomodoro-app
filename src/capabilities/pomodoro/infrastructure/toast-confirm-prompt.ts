import { toast, type ToastContent } from 'react-toastify';

import type { IConfirmPrompt } from '../domain/ports';

export class ToastConfirmPrompt implements IConfirmPrompt {
  constructor(private readonly DialogComponent: ToastContent<string>) {}

  ask(question: string, onResponse: (confirmed: boolean) => void): void {
    toast(this.DialogComponent, {
      data: question,
      onClose: (confirmation) => onResponse(!!confirmation),
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    });
  }
}
