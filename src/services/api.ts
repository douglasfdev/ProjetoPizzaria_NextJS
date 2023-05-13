import axios, { AxiosError } from 'axios';
import { parseCookies } from 'nookies';
import { AuthTokenError } from './errors/AuthTokensError';
import { signOut } from '@/contexts/AuthContext';

export function setupAPIClient(context = undefined) {
  let cookies = parseCookies(context);

  const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
      Authorization: `Bearer ${cookies['@pizza.token']}`,
    }
  })

  api.interceptors.response.use(res => {
    return res;
  }, (err: AxiosError) => {
    if (err.response?.status !== 401) {
      return Promise.reject(err);
    }

    // deslogar usuário
    if (typeof window !== undefined) {
      // chama função para deslogar usuário
      signOut();
    } else {
      return Promise.reject(new AuthTokenError());
    }
  });

  return api;
}
