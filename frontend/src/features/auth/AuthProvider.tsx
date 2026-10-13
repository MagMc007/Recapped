'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User } from '@/types/api';
import { logoutAction } from './actions';
import { USER_COOKIE } from '@/lib/auth-constants';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialUser(initialUser: User | null): User | null {
  if (initialUser) return initialUser;
  if (typeof document === 'undefined') return null;
  try {
    const cookies = document.cookie.split('; ');
    const userCookie = cookies.find((row) => row.startsWith(`${USER_COOKIE}=`));
    if (userCookie) {
      const rawValue = decodeURIComponent(userCookie.split('=')[1]);
      return JSON.parse(rawValue) as User;
    }
  } catch {
    return null;
  }
  return null;
}

interface AuthProviderProps {
  children: React.ReactNode;
  initialUser?: User | null;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser = null,
}) => {
  const [user, setUser] = useState<User | null>(() => getInitialUser(initialUser));
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await logoutAction();
      setUser(null);
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
