import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/casSSRAuth';
import Head from 'next/head';
import styles from './style.module.scss';
import { FiRefreshCcw } from 'react-icons/fi';

export default function Dashboard() {
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

            <section className={styles.orderItem}>
              <button>
                <div className={styles.tag}></div>
                <span>Mesa 30</span>
              </button>
            </section>

          </article>

        </main>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
});
