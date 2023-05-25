import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import styles from './style.module.scss';
import { IModalORderProps } from '@/interfaces';

export function ModalOrder({ isOpen, onRequestClose, order, handleFinishOrder, handleAttendOrder, handleCancelOrder }: IModalORderProps) {
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

  function statusButtonOrder(status: number, orderId: string) {
    let buttonContent: string;
    let handleOrderStatus: () => void;

    switch (status) {
      case 0:
        buttonContent = 'Atender Pedido';
        handleOrderStatus = () => handleAttendOrder(orderId);
        break;
      case 1:
        buttonContent = 'Concluir Pedido';
        handleOrderStatus = () => handleFinishOrder(orderId);
        break;
      case 2:
        buttonContent = 'Cancelar Pedido';
        handleOrderStatus = () => handleCancelOrder(orderId);
        break;
      default:
        buttonContent = '';
        handleOrderStatus = null;
        break;
    }

    return { buttonContent, handleOrderStatus };
  }

  const { buttonContent, handleOrderStatus } = statusButtonOrder(order[0].status, order[0].id);

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
        <h2>Detalhes do Pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map((item) => (
          <section key={item.id} className={styles.containerItem}>
            <span>
              {' '}
              {item.amount} - <strong> {item.products.name} </strong>{' '}
            </span>
            <span className={styles.description}> {item.products.description} </span>
          </section>
        ))}

        <button className={styles.buttonOrder} onClick={handleOrderStatus}>
          {buttonContent}
        </button>
      </div>
    </Modal>
  );
}
