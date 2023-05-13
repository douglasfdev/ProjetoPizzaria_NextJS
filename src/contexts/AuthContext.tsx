import { AuthProviderProps } from "@/interfaces";
import { AuthContextData, SignProps, UserProps } from "@/types";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { createContext, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    toast.success('Deslogando...', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
    destroyCookie(undefined, '@pizza.token');
    Router.push('/');
  } catch (err) {
    toast.error('Erro ao deslogar', {
      position: toast.POSITION.TOP_RIGHT
    })
  }
}

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | undefined>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignProps) {
    console.table(
      {
        data: {
          email,
          password
        },
      }
    )
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
    {children}
  </AuthContext.Provider>;
}
