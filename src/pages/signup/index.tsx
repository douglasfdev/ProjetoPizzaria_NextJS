import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/home.module.scss';
import Link from 'next/link';
import { logo } from '../../../public/images/index';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { RiAlarmWarningFill } from 'react-icons/ri';
import { AuthContext } from '@/contexts/AuthContext';

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSignUp(evt: FormEvent) {
    evt.preventDefault();
    const verifyUser = name === '' || email === '' || password === '';

    if (verifyUser) {
      toast.warn('Preencha todos os Campos', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
        icon: RiAlarmWarningFill,
      });
    }

    setLoading(true);

    const data = {
      name,
      email,
      password,
    }

    await signUp(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Faça seu cadastro agora!</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.containerCenter}>
        <Image src={logo} alt="Logo Sujeito Pizzaria" />

        <div className={styles.login}>
          <h1>Criando sua conta</h1>

          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setName(ev.target.value)}
            />

            <Input
              placeholder="Digite seu email"
              type="text"
              value={email}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setEmail(ev.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(ev: ChangeEvent<HTMLInputElement>) => setPassword(ev.target.value)}
            />

            <Button type="submit" loading={loading}>
              Cadastrar
            </Button>
          </form>
          <Link href="/" className={styles.text}>
            Já possuí uma conta? Faça login!
          </Link>
        </div>
      </main>
    </>
  );
}
