import Head from 'next/head'
import styles from '@/styles/home.module.scss'
import { logo } from '../../public/images/index'
import Image from 'next/image'
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Pizzaria XTech - Faça seu login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <div>
          <Image src={logo} alt="Logo Sujeito Pizzaria" />

          <div className={styles.login}>
            <form>
              <Input
                placeholder='Digite seu email'
                type='text'
              />

              <Input
                placeholder='Digite sua senha'
                type='password'
              />

              <Button
                type='submit'
                loading={true}
              >
                Acessar
              </Button>
            </form>
          </div>
        </div>
        <div></div>
      </main>
    </>
  );
}
