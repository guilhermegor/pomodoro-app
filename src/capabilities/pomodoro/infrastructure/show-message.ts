import { toast, type ToastContent } from 'react-toastify';

export const showMessage = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warning: (msg: string) => toast.warn(msg),
  info: (msg: string) => toast.info(msg),
  dismiss: () => toast.dismiss(),
  confirm: <T>(Component: ToastContent<T>, data: T, onClosing: (confirmation: boolean) => void) =>
    toast(Component, {
      data,
      onClose: (confirmation) => onClosing(!!confirmation),
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
    }),
};
