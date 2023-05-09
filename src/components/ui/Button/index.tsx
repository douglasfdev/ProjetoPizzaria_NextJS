import { IButtonProps } from '@/interfaces';
import styles from './styles.module.scss';
import { FaSpinner } from 'react-icons/fa';

export function Button({ loading, children, ...props }: IButtonProps) {
  return (
    <button
      className={styles.button}
      disabled={loading}
      {...props}
    >
      { loading ? (
        <FaSpinner color='#fff' size={16} />
      ) : (
        <a className={styles.buttonText}>
          {children}
        </a>
      ) } 
    </button>
  )
}
