import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Auth/Auth';
import logo from '/logo.svg';
import dummyZaken from '../../dummydata/zaaktypen.json';
import dummyAttributen from '../../dummydata/attributen.json';

export default function Header() {
  const auth = useAuth();
  const navigate = useNavigate();
  const { zaaktype, attribuut } = useParams();

  const start = (
    <Link to="/">
      <img alt="logo" src={logo} height="50" className="block mr-auto" />
    </Link>
  );

  return (
    <header className="surface-card shadow-1">
      {start}
      <h1>Header</h1>
    </header>
  );
}
