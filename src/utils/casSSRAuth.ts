import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '@/services/errors/AuthTokensError';

export function canSSRAuth<T>(fn: GetServerSideProps<T>) {
  return async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<T>> => {
    const cookies = parseCookies(context);

    const token = cookies['@pizza.token'];

    if (!token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }

    try {
      return await fn(context);
    } catch (err) {
      if (err instanceof AuthTokenError) {
        destroyCookie(context, '@pizza.token');

        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }
  }
}
