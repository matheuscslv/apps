import React, { useState, createContext, useEffect } from 'react';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';
import {
  subscribeToNotification,
  unsubscribeToNotification,
} from '../services/notification';

interface Response {
  responseState: boolean;
  responseStatus: string;
}

interface IUser {
  id: string;
  nome: string;
  telefone_whatsapp: string;
  email: string;
  cpf: string;
  cep: string;
  logradouro: string;
  bairro: string;
  numero_local: number;
}

interface AuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  logIn(cpf: string, password: string): Promise<Response>;
  signOut(data: object): Promise<Response>;
  updateProfile(data: object): Promise<Response>;
  logOut(): void;
}

interface IResponseData {
  cpf: string;
  senha: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData(): Promise<void> {
      setLoading(true);
      const userLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Consumidor:user',
      );
      const tokenLoaded = await AsyncStorage.getItem(
        '@QueroAçaí-Consumidor:token',
      );
      if (userLoaded && tokenLoaded) {
        setUser(JSON.parse(userLoaded));

        subscribeToNotification(JSON.parse(userLoaded).id);
      }

      api.defaults.headers.authorization = `Bearer ${tokenLoaded}`;

      setLoading(false);
    }
    loadData();
  }, []);

  async function logIn(cpf: string, password: string): Promise<Response> {
    try {
      const response = await api.post('sessao/consumidor', {
        cpf,
        senha: password,
      });

      setUser(response.data.consumidor);

      api.defaults.headers.authorization = `Bearer ${response.data.tokenConsumidor}`;

      subscribeToNotification(response.data.consumidor.id);

      await AsyncStorage.setItem(
        '@QueroAçaí-Consumidor:user',
        JSON.stringify(response.data.consumidor),
      );

      await AsyncStorage.setItem(
        '@QueroAçaí-Consumidor:token',
        response.data.tokenConsumidor,
      );

      return new Promise((resolve) => {
        resolve({
          responseState: true,
          responseStatus: '',
        });
      });
    } catch (error) {
      return new Promise((resolve) => {
        resolve({
          responseState: false,
          responseStatus: error.response.data.error,
        });
      });
    }
  }

  async function signOut(data: IResponseData): Promise<Response> {
    try {
      await api.post('consumidor', data);

      const response = await logIn(data.cpf, data.senha);

      return new Promise((resolve) => {
        resolve({
          responseState: response.responseState,
          responseStatus: response.responseStatus,
        });
      });
    } catch (error) {
      return new Promise((resolve) => {
        resolve({
          responseState: false,
          responseStatus: error.response.data.error,
        });
      });
    }
  }

  async function updateProfile(data: IResponseData): Promise<Response> {
    try {
      const user = await api.put('consumidor', data);

      setUser(user.data);

      await AsyncStorage.setItem(
        '@QueroAçaí-Consumidor:user',
        JSON.stringify(user.data),
      );

      return new Promise((resolve) => {
        resolve({
          responseState: true,
          responseStatus: '',
        });
      });
    } catch (error) {
      return new Promise((resolve) => {
        resolve({
          responseState: false,
          responseStatus: error.response.data.error,
        });
      });
    }
  }

  async function logOut(): Promise<void> {
    unsubscribeToNotification(user?.id);
    await AsyncStorage.removeItem('@QueroAçaí-Consumidor:token');
    AsyncStorage.removeItem('@QueroAçaí-Consumidor:user').then(() => {
      setUser(null);
    });
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        logIn,
        updateProfile,
        signOut,
        logOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
