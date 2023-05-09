import styles from './styles.module.scss';
import { IInputProps, ITextAreaProps } from '@/interfaces/index'

export function Input({...props}: IInputProps): JSX.Element {
  return (
    <>
      <input className={styles.input} {...props} />
    </>
  )
}

export function TextArea({...props}: ITextAreaProps) {
  return (
    <textarea className={styles.input} {...props}></textarea>
  )
}
