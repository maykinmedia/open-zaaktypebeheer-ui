import { Link } from 'react-router-dom';
import logo from '/logo.svg';

export default function Header() {
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
