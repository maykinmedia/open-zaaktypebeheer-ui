import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import api from '../../api/api';

const LOCALSTORAGE_USER_NAME = 'zaaktypenbeheer_user';

interface AuthContextType {
  user: any;
  signIn: (formData: FormData, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(localStorage.getItem(LOCALSTORAGE_USER_NAME));

  let signIn = async (formData: FormData, callback: VoidFunction) => {
    await api.signIn(formData);
    localStorage.setItem(LOCALSTORAGE_USER_NAME, formData.get('username') as string);
    setUser(formData.get('username'));
    callback();
  };

  let signOut = (callback: VoidFunction) => {
    setUser(null);
    callback();
  };

  let value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();
  console.log(location);

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <Outlet />;
}

export function RequireNoAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
