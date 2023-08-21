import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { apiCall, handleSignIn } from '../../api/api';

export interface AuthContextType {
  isSignedIn: any;
  signIn: (formData: FormData, callback: VoidFunction) => void;
  signOut: (callback: VoidFunction) => void;
}

let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [isSignedIn, setIsSignedIn] = React.useState<any>(false);

  // Function works for now but feels like it could be improved
  // There is an delay between the window loading completely and the
  // login screen is shown. After a 100ms~ the login screen is replaced
  // with the dashboard.
  async function checkAuthentication() {
    try {
      if (isSignedIn) return true;
      const response = await apiCall('http://127.0.0.1:8000/admin/');
      if (response.redirected) setIsSignedIn(false);
      else setIsSignedIn(true);
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  }

  checkAuthentication();

  let signIn = async (formData: FormData, callback: VoidFunction) => {
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    try {
      await handleSignIn(data);
      setIsSignedIn(true);
      callback();
    } catch (err) {
      let error = err as Error;
      throw error;
    }
  };

  let signOut = (callback: VoidFunction) => {
    setIsSignedIn(false);
    callback();
  };

  let value = { isSignedIn, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export function RequireNoAuth() {
  let auth = useAuth();
  let location = useLocation();

  if (auth.isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
}
