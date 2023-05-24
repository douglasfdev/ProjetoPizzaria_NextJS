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

  async function handleOpenModalView(id: string) {
    const apiClient = setupAPIClient();
    const { data } = await apiClient.get(`order/${id}/item`)
    console.log(data);

    setModalItem(data);
    setModalVIsible(true);
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
            <button>
              <FiRefreshCcw size={25} />
            </button>
          </div>

          <article className={styles.listOrders}>
            
            {orderList.map((item) => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={() => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
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
          />
        )}

      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiclient = setupAPIClient(ctx);
  const { data } = await apiclient.get('/order/orders');

  return {
    props: {
      orders: data,
    },
  };
});
