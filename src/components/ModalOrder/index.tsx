import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './style.module.scss';
import { IModalORderProps } from '@/interfaces';

export function ModalOrder({ isOpen, onRequestClose, order }: IModalORderProps) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      bottom: 'auto',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1d1d2e',
    }
  }

  return (
    <Modal isOpen={isOpen} onAfterClose={onRequestClose} style={customStyles}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close"
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color="#f34748" />
      </button>

      <div className={styles.container}>
        <h2>Detalehes do Pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span> {item.amount} - <strong> {item.products.name} </strong> </span>
            <span className={styles.description}> {item.products.description} </span>
          </section>
        ))}

        <button className={styles.buttonOrder} onClick={ () => {} }>
          Concluir Pedido
        </button>

      </div>
    </Modal>
  );
}
