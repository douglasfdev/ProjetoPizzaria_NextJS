import { Header } from '@/components/Header';
import Head from 'next/head';
import styles from './styles.module.scss';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { setupAPIClient } from '@/services/api';
import { canSSRAuth } from '@/utils/casSSRAuth';

export default function Category() {
  const [name, setName] = useState('');

  async function handleRegister(evt: FormEvent) {
    evt.preventDefault();

    if (!name || name === '') {
      return;
    }

    const apiClient = setupAPIClient(); 
    await apiClient.post('/category/', {
      name,
    });

    toast.success(`Categoria ${name.toLowerCase()} cadastrada com sucesso`, {
      position: toast.POSITION.TOP_CENTER,
      theme: 'dark',
    })

    setName('');
  }

  return (
    <>
      <Head>
        <title>Nova Categoria - Tech Pizzaria</title>
      </Head>
      <div>
        <Header />
    
        <main className={styles.container}>
          <h1>Cadastrar categorias</h1>
          
          <form className={styles.form} onSubmit={handleRegister}>
            <input
              type='text'
              placeholder='Digite o nome da categoria'
              className={styles.input}
              value={name}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
            />
  
            <button className={styles.buttonAdd} type='submit'>
              Cadastrar
            </button>
          </form>
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
