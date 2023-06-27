import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/casSSRAuth';
import Head from 'next/head';
import styles from './style.module.scss';
import { FormEvent, useState } from 'react';
import { setupAPIClient } from '@/services/api';
import { toast } from 'react-toastify';
import { IItemsProps } from '@/interfaces';

export default function ItemDashboard({amount, products, order}: IItemsProps) {
    const [amountData, setAmountData] = useState(0);
    const [productData, setProductData] = useState(products || []);
    const [orderData, setOrder] = useState(order || []);

    async function handleProducts() {
        const apiClient = setupAPIClient();
        const { data } = await apiClient.get('/products/');

        setProductData(data);
    }

    async function hanldeOrders() {
        const apiClient = setupAPIClient();
        const { data } = await apiClient.get('/orders/')
    }

    async function handleRegister(evt: FormEvent) {
        evt.preventDefault();

        try {
            const data = {
                amountData,
                productData,
                orderData,
            };

            const apiClient = setupAPIClient();
            await apiClient.post('/item/', data);
        } catch (err) {
            const errorMessage = err.reponse.data;
            toast.error(
                `Ops, algo de errado não está certo... ${errorMessage.error}: ${errorMessage.message}`,
              {
                position: toast.POSITION.TOP_CENTER,
                theme: 'dark',
              });
        }
    }

    return (
        <>
            <Head>
                <title>Novo Item - Tech Pizzaria</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Novo item ao pedido</h1>

                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="number"
                            placeholder='Quantidade'
                            className={styles.input}
                            value={amountData}
                            onChange={(evt) => setAmountData(Number(evt.target.value))}
                        />

                        <input
                            type="text"
                            className={styles.input}
                            value={productData}
                            onChange={(evt) => setProductData(evt.target.value)}
                        />

                        <input
                            type="text"
                            className={styles.input}
                            value={orderData}
                            onChange={(evt) => setOrderData(evt.target.value)}
                        />
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const orders = await apiClient.get(`/orders`);
    const products = await apiClient.get(`/products/`);

    return {
        props: {
            orders: orders.data,
            products: products.data,
        },
    };
});
