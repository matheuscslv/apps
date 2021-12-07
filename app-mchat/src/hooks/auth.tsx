import React, { createContext, useState, useEffect, useContext } from 'react';

interface IUser {
  name: string;
  email: string;
}

interface ISignInData {
  password: string;
}

interface IAuthContextData {
  signed: boolean;
  user: IUser | null;
  loading: boolean;
  signIn(data: ISignInData): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // async function loadStorageData(): Promise<void> {
    //   const storagedUser = await AsyncStorage.getItem('@RNAuth:user');
    //   const storagedToken = await AsyncStorage.getItem('@RNAuth:token');
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   if (storagedToken && storagedUser) {
    //     setUser(JSON.parse(storagedUser));
    //     api.defaults.headers.Authorization = `Bearer ${storagedToken}`;
    //   }
    //   setLoading(false);
    // }
    // loadStorageData();
  }, []);

  async function signIn({ password }: ISignInData): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (password !== 'admin') return;

    setUser({
      name: 'Manoel',
      email: 'manoel@gmail.com',
    });
    // const response = await auth.signIn();
    // setUser(response.user);
    // api.defaults.headers.Authorization = `Bearer ${response.token}`;
    // await AsyncStorage.setItem('@RNAuth:user', JSON.stringify(response.user));
    // await AsyncStorage.setItem('@RNAuth:token', response.token);
    // console.log(response);
  }

  async function signOut(): Promise<void> {
    setUser(null);
    // await AsyncStorage.removeItem('@RNAuth:token', response.token);
  }

  return (
    <AuthContext.Provider
      value={{ user, signOut, loading, signed: !!user, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext);

  return context;
}
