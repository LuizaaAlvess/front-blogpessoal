// src/contexts/AuthContext.tsx

import { createContext, ReactNode, useState } from "react";
import { login } from "../services/Service";

export interface UsuarioLogin {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto: string;
  token: string;
}

interface AuthContextProps {
  usuario: UsuarioLogin;
  handleLogin(usuarioLogin: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {

  const [usuario, setUsuario] = useState<UsuarioLogin>({
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: ""
  });

  const [isLoading, setIsLoading] = useState(false);

async function handleLogin(usuarioLogin: UsuarioLogin) {
  setIsLoading(true);

  try {
    await login("/auth/logar", {
      usuario: usuarioLogin.usuario,
      senha: usuarioLogin.senha
    }, setUsuario);

    alert("Usuário autenticado com sucesso!");
  } catch (error) {
    alert("Erro no login. Verifique as credenciais.");
  }

  setIsLoading(false);
}

  return (
    <AuthContext.Provider
      value={{
        usuario,
        handleLogin,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}