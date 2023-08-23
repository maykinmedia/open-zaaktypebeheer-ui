import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { api } from '../../api/api';

export interface AuthContextType {
  user: any;
  signIn: (formData: FormData, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<any>({
    user: null,
    authChecked: false,
  });

  useEffect(() => {
    const fetchUser = async () => {
      const user = await api.getUser();
      setAuthState({
        user,
        authChecked: true,
      });
    };
    if (!authState.authChecked) fetchUser();
  }, []);

  const signIn = useCallback(async (formData: FormData, callback: VoidFunction) => {
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };
    const user = await api.signIn(data);
    setAuthState({
      user,
      authChecked: true,
    });
    callback();
  }, []);

  const signOut = useCallback(async (callback: VoidFunction) => {
    await api.signOut();
    setAuthState({
      user: null,
      authChecked: true,
    });
    callback();
  }, []);

  const value = useMemo(() => ({ user: authState.user, signIn, signOut }), [authState.user]);

  return (
    <AuthContext.Provider value={value}>{authState.authChecked && children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export function RequireNoAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
