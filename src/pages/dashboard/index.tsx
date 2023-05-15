import { Header } from '@/components/Header';
import { canSSRAuth } from '@/utils/casSSRAuth';
import Head from 'next/head';

export default function Dashboard() {
  return(
    <>
      <Head>
        <title> Painel - Tech Pizza </title>
      </Head>

      <main>
        <Header />
        <h1>Painel</h1>
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {}
  }
});
