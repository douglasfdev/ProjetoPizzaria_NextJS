import Router from "next/router";
import { AuthProviderProps } from "@/interfaces";
import { AuthContextData, SignProps, UserProps } from "@/types";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { api } from "@/services/apiClient";
import 'react-toastify/dist/ReactToastify.css';

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

export function AuthProvider({children}: AuthProviderProps) {
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
      
    }
  }

  return (
    <>
      <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
        {children}
      </AuthContext.Provider>
      <ToastContainer />
    </>
  );
}
