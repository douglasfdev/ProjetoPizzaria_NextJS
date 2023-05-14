import Router from "next/router";
import { IAuthProviderProps } from "@/interfaces";
import { AuthContextData, SignProps, UserProps, SignUpProps } from "@/types";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { api } from "@/services/apiClient";

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    toast.success('Deslogando...', {
      position: toast.POSITION.TOP_CENTER,
    });
    destroyCookie(undefined, '@pizza.token');
    Router.push('/');
  } catch (err) {
    toast.error('Erro ao deslogar', {
      position: toast.POSITION.TOP_CENTER,
      theme: 'dark',
    });
  }
}

export function AuthProvider({children}: IAuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignProps) {
    try {
      const { data } = await api.post('/auth/login', {
        email,
        password,
      });

      setCookie(undefined, '@pizza.token', data.access_token, {
        maxAge: 60 * 60 * 24 * 7, // expira em uma semana
        path: '/' // todos caminhos terao acesso ao cookie
      });

      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
      })

      api.defaults.headers['Authorization'] = `Bearer ${data.acess_token}`;

      Router.push('/dashboard');
    } catch (err) {
      toast.error('Erro ao fazer login', {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
      });
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      const { data } = await api.post('/user/', {
        name,
        email,
        password,
      });

      toast.success(`Bem vindo ${data.name}, Cadastrado com Sucesso!`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
      });

      Router.push('/');
    } catch (err) {
      const errorMessage = err.response.data;
      toast.error(`${errorMessage.error}: ${errorMessage.message}`, {
        position: toast.POSITION.TOP_CENTER,
        theme: 'dark',
      });
    }
  }

  return (
      <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
        {children}
      </AuthContext.Provider>
  );
}
