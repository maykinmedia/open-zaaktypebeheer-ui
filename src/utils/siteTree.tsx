import LogoutIcon from '@mui/icons-material/Logout';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { NavigateFunction } from 'react-router-dom';

export const siteTree = (navigate: NavigateFunction, signOutHandler: () => void) => [
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
    onClick: () => signOutHandler(),
  },
];
