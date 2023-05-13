import { AuthProviderProps } from "@/interfaces";
import { AuthContextData, SignProps, UserProps } from "@/types";
import { createContext, useState } from "react";

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({
    id: "1",
    name: 'User',
    email: 'alo@.com'
  });
  const isAuthenticated = !!user;

  async function signIn({email, password}: SignProps) {
    console.table(
      {
        data: {
          email,
          password
        },
      }
    )
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
    {children}
  </AuthContext.Provider>;
}
