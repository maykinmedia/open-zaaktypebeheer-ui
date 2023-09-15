import { useAuth } from '../components/Auth/Auth';

export interface SiteTree {
  label: string;
  to: string;
  onClick?: () => void;
}

interface useSiteTree {
  (): SiteTree[];
}

const useSiteTree = () => {
  const auth = useAuth();
  return [
    {
      label: 'Zaaktypen',
      to: '/zaaktypen',
    },
    {
      label: 'Documenttypen',
      to: '/documenttypen',
    },
    {
      label: 'Admin',
      to: '/admin',
    },
    {
      label: 'Log uit',
      to: '/',
      onClick: () => {
        auth.onSignOut();
      },
    },
  ];
};

export default useSiteTree;
