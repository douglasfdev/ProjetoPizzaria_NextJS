import { useContext } from 'react';
import styles from './styles.module.scss';
import Link from 'next/link';
import { logo } from '../../../public/images/index';
import Image from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '@/contexts/AuthContext';

export function Header() {
  const { signOut } = useContext(AuthContext);
  return (
    <header className={styles.headerContainer}>
      <main className={styles.headerContent}>
        <Link href="/dashboard">
          <Image src={logo} alt="Tech Pizza Logo" width={190} height={60} />
        </Link>

        <nav className={styles.menuNav}>
          <Link href="/category">Categoria</Link>

          <Link href="/product">Cardapio</Link>

          <button onClick={signOut}>
            <FiLogOut size={23} />
            <p> Logout </p>
          </button>
        </nav>
      </main>
    </header>
  );
}
