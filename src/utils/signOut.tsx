import { NavigateFunction } from 'react-router-dom';
import { AuthContextType } from '../components/Auth/Auth';

function signOutHandler(auth: AuthContextType, navigate: NavigateFunction) {
  return () => {
    localStorage.removeItem(`${import.meta.env.VITE_PRODUCT_NAME}_user`);
    auth.signOut(() => navigate('/login'));
  };
}

export default signOutHandler;
