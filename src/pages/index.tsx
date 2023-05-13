import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/home.module.scss'
import Link from 'next/link'
import { FormEvent, useContext } from 'react'
import { logo } from '../../public/images/index'
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { AuthContext } from '@/contexts/AuthContext'

export default function Home() {
  const { signIn } = useContext(AuthContext);

  async function handleLogin(evt: FormEvent) {
    evt.preventDefault();
    const data = {
      email: "admin@admin.com",
      password: "2332354"
    }

    await signIn(data);
  }

  return (
    <>
      <Head>
        <title>Pizzaria XTech - Faça seu login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input placeholder="Digite seu email" type="text" />

            <Input placeholder="Digite sua senha" type="password" />

            <Button type="submit" loading={false}>
              Acessar
            </Button>
          </form>
          <Link href="/signup" className={styles.text}>
            Não possuí uma conta? Cadastre-se
          </Link>
        </div>
      </main>
    </>
  );
}
