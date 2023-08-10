import { Link, useNavigate } from 'react-router-dom';
import { Menubar } from 'primereact/menubar';
import { useAuth } from '../Auth/Auth';
import { BreadCrumb } from 'primereact/breadcrumb';
import logo from '/logo.svg';
import dummyZaken from '../../dummydata/zaaktypen.json';
import dummyAttributen from '../../dummydata/attributen.json';

export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate();

  const items = [
    {
      label: 'Zaaktypen',
      icon: 'pi pi-fw pi-id-card',
      items: Object.keys(dummyZaken).map((value) => {
        const zaak = value as keyof typeof dummyZaken;
        return {
          label: dummyZaken[zaak].label,
          command: () => navigate(`/zaaktypen/${dummyZaken[zaak].label.toLowerCase()}`),
        };
      }),
    },
    {
      label: 'Attributen',
      icon: 'pi pi-fw pi-list',
      items: Object.keys(dummyAttributen).map((value) => {
        const zaak = value as keyof typeof dummyAttributen;
        return {
          label: dummyAttributen[zaak].label,
          command: () => navigate(`/attributen/${dummyAttributen[zaak].label.toLowerCase()}`),
        };
      }),
    },
    {
      label: 'Log uit',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        auth.signOut(() => navigate('/login', { replace: true }));
      },
    },
  ];

  const start = (
    <Link to="/">
      <img alt="logo" src={logo} height="50" className="block mr-auto" />
    </Link>
  );

  return (
    <header className="surface-card">
      <Menubar
        className="flex justify-content-between border-noround surface-card p-3 md:px-5"
        model={items}
        start={start}
      />
      <BreadCrumb
        className="border-noround border-none border-bottom-1 shadow-1 surface-card md:px-5"
        home={{ icon: 'pi pi-home', command: () => navigate('/') }}
        model={[
          { icon: 'pi-home', label: 'Zaak', command: () => navigate('/zaaktypen') },
          { icon: 'pi-home', label: 'Naam', command: () => navigate('/zaaktypen/naam') },
        ]}
      />
    </header>
  );
}
