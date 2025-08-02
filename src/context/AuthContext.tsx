// context/AuthContext.tsx
import React, {createContext, useContext, useEffect, useState} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

type BackendUser = {
  name: string;
  email: string;
  photo?: string;
  code?: string;
  diamond?: number;
  coins?: number;
  type?: 'New User' | 'Existing User';
  id: number;
  jwt: string;
};

type AuthContextType = {
  user: BackendUser | null;
  loading: boolean;
  loginWithGoogle: () => Promise<BackendUser>;
  normalLogin: (token: string, password: string) => Promise<BackendUser>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  loginWithGoogle: async () => {
    throw new Error('loginWithGoogle not implemented');
  },
  logout: async () => {
    throw new Error('logout not implemented');
  },
  normalLogin: async () => {
    throw new Error('normalLogin not implemented');
  },
});

const STORAGE_KEY = '@auth_user';

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '86858029732-03i0h1sic7vcppm08k318qmv5ng5nknm.apps.googleusercontent.com',
      offlineAccess: true,
    });

    const restoreSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.warn('Failed to restore user session:', err);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const loginWithGoogle = async (): Promise<BackendUser> => {
    try {
      await GoogleSignin.hasPlayServices();
      const googleUser = await GoogleSignin.signIn();

      const {data} = googleUser;
      if (!data?.idToken) {
        throw new Error('Google sign-in failed to provide token.');
      }

      // Validate token with backend and get backend user data
      const response = await axios.post(
        'https://shubhamkohad.site/auth/google',
        {token: data.idToken},
        {headers: {'Content-Type': 'application/json'}},
      );

      // Set user from backend response
      setUser(response.data);
      // Store backend user in AsyncStorage to persist session
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));

      console.log('✅ Backend auth success:', response.data);

      return response.data; // Return the user so caller can check `type`
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('❌ Axios Error:');
        console.log('Message:', error.message);
        console.log('Status:', error.response?.status);
        console.log('Response data:', error.response?.data);
      } else {
        console.log('❌ Non-Axios Error:', error);
      }

      throw error;
    }
  };

  const normalLogin = async (
    email: string,
    password: string,
  ): Promise<BackendUser> => {
    const response = await axios.post('https://shubhamkohad.site/auth/login', {
      email,
      password,
    });
    console.log(response.data);

    const userData: BackendUser = response.data;
    setUser(userData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(userData));

    return userData;
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await AsyncStorage.removeItem(STORAGE_KEY);
      setUser(null);
    } catch (error) {
      console.warn('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{user, loading, loginWithGoogle, normalLogin, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
