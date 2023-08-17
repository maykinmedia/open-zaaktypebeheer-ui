import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { GetSiteTreeFunction } from '../types/types';

export const getSiteTree: GetSiteTreeFunction = (navigate, auth) => [
  {
    label: 'Zaaktypen',
    Icon: <AppRegistrationIcon />,
    onClick: () => navigate('/zaaktypen'),
  },
  {
    label: 'Documenttypen',
    Icon: <AttachFileIcon />,
    onClick: () => navigate('/documenttypen'),
  },
  {
    label: 'Admin',
    Icon: <AdminPanelSettingsIcon />,
    onClick: () => navigate('/admin'),
  },
  {
    label: 'Log uit',
    Icon: <LogoutIcon />,
    onClick: () => {
      localStorage.removeItem(`${import.meta.env.VITE_PRODUCT_NAME}_user`);
      auth.signOut(() => navigate('/login'));
    },
  },
];
