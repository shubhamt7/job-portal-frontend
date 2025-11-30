'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

type User = {
  name: string;
  isAdmin: boolean;
} | null;

type AuthContextType = {
  user: User;
  setUser: (u: User) => void;
  login: (user: { name: string; isAdmin?: boolean }) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'app_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(null);

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setUserState(JSON.parse(raw));
      }
    } catch (err) {
      console.error('Failed to read auth from localStorage', err);
    }
  }, []);

  // save to localStorage when user changes
  useEffect(() => {
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error('Failed to write auth to localStorage', err);
    }
  }, [user]);

  const setUser = (u: User) => setUserState(u);

  const login = (u: { name: string; isAdmin?: boolean }) => {
    const userObj: User = { name: u.name, isAdmin: !!u.isAdmin };
    setUserState(userObj);
    // localStorage will be updated by the effect above
  };

  const logout = () => {
    setUserState(null);
    // localStorage removed by effect above
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
