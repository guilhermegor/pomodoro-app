import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { ToastContentProps } from 'react-toastify';
import { DefaultButton } from '../DefaultButton';
import styles from './styles.module.css';

export function Dialog({ closeToast, data }: ToastContentProps<string>) {
  return (
    <div className={styles.container}>
      <p>{data}</p>
      <div className={styles.buttonsContainer}>
        <DefaultButton
          onClick={() => closeToast(true)}
          icon={<ThumbsUpIcon />}
          aria-label="Confirmar"
          title="Confirmar"
        ></DefaultButton>
        <DefaultButton
          onClick={() => closeToast(false)}
          icon={<ThumbsDownIcon />}
          color="red"
          aria-label="Cancelar"
          title="Cancelar"
        ></DefaultButton>
      </div>
    </div>
  );
}
