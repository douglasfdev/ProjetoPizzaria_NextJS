import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/casSSRAuth';
import Head from 'next/head';
import styles from './style.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';
import { setupAPIClient } from '@/services/api';
import { IHomeProps, IOrderItemProps } from '@/interfaces';
import { useState } from 'react';
import Modal from 'react-modal';
import { ModalOrder } from '@/components/ModalOrder';

export default function Dashboard({orders}: IHomeProps) {
  const [orderList, setOrderList] = useState(orders || []);
  const [modalItem, setModalItem] = useState<Array<IOrderItemProps>>();
  const [modalVisible, setModalVIsible] = useState(false);

  function handleCloseModal() {
    setModalVIsible(false);
  }

  function renderStatus(status: number) {
    switch (status) {
      case 0:
        return 'ABERTO';
      case 1:
        return 'ATENDIDO';
      case 2:
        return 'FINALIZADO';
      case 3:
        return 'CANCELADO';
      default:
        return 'ABERTO';
    }
  }

  function getStatusClassName(status: number) {
    switch (status) {
      case 0:
        return styles.aberto;
      case 1:
        return styles.atendido;
      case 2:
        return styles.finalizado;
      case 3:
        return styles.cancelado;
      default:
        return styles.aberto;
    }
  }

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient();
    const { data } = await apiClient.get(`orders/${id}/item`)

    setModalItem(data);
    setModalVIsible(true);
  }

  async function handleFinishItem(id: string) {
    const apiClient = setupAPIClient();
    await apiClient.patch(`/orders/close/${id}`);

    const { data } = await apiClient.get('/orders');
    setOrderList(data);

    setModalVIsible(false);
  }

  async function handleAttendItem(id: string) {
    const apiClient = setupAPIClient();
    await apiClient.patch(`/orders/attend/${id}`);

    setModalVIsible(false);
  }

  async function handleCancelItem(id: string) {
    const apiClient = setupAPIClient();
    await apiClient.delete(`/orders/${id}`);

    setModalVIsible(false);
  }

  async function handleRefreshOrders() {
    const apiClient = setupAPIClient();
    const { data } = await apiClient.get('/orders/opened/');

    setOrderList(data);
  }

  Modal.setAppElement('#__next');

  return (
    <>
      <Head>
        <title> Painel - Tech Pizza </title>
      </Head>

      <div>
        <Header />

        <main className={styles.container}>
          <div className={styles.containerHeader}>
              <h1>Últimos Pedidos</h1>
            <button onClick={handleRefreshOrders}>
              <FiRefreshCcw size={25} />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.length === 0 && (
              <span className={styles.emptyList}>
                Nenhum pedido aberto foi encontrado...
              </span>
            )}

            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa: {item.table}</span> -
                  <span className={`${styles.status} ${getStatusClassName(item.status)}`}>
                    {renderStatus(item.status)}
                  </span>
                </button>
              </section>
            ))}
          </article>
        </main>

        {modalVisible && (
          <ModalOrder
            isOpen={modalVisible}
            onRequestClose={handleCloseModal}
            order={modalItem}
            handleFinishOrder={handleFinishItem}
            handleAttendOrder={handleAttendItem}
            handleCancelOrder={handleCancelItem}
          />
        )}
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);
  const { data } = await apiclient.get('/orders');

  return {
    props: {
      orders: data,
    },
  };
});
