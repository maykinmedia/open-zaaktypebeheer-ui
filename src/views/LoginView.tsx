/**
 * Based on primeblocks example login view
 * @link https://blocks.primereact.org/free#:~:text=85%20responded-,Sign%2DIn,-Free
 */

import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/Auth';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import logo from '/logo.svg';

export default function LoginView() {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      auth.signIn(data, () => {
        navigate('/', { replace: true });
      });
    } catch (error: any) {
      setError(error?.message as string);
    }
  }

  return (
    <main className="surface-ground h-screen">
      <section className="flex align-items-center h-full">
        <section className="flex flex-column align-items-center m-auto justify-content-center surface-card p-4 shadow-1 border-round w-11 max-w-30rem lg:w-6">
          <section className="text-center mb-3">
            <img src={logo} alt="logo" height={40} className="mb-3" />
            <h1 className="text-800 text-4xl font-bold mb-3">OpenZaak Beheer</h1>
          </section>
          <form className="w-full" onSubmit={handleLogin}>
            <label htmlFor="email" className="block text-900 font-medium mb-2">
              Email
            </label>
            <InputText
              name="username"
              id="username"
              type="text"
              placeholder="Gebruikersnaam"
              className="w-full mb-3"
            />

            <label htmlFor="password" className="block text-900 font-medium mb-2">
              Password
            </label>
            <Password
              name="password"
              autoComplete="password"
              id="password"
              type="password"
              placeholder="Wachtwoord"
              className="w-full mb-3"
              feedback={false}
              inputStyle={{ width: '100%' }}
              toggleMask
            />
            {error && <p className="text-500 mb-4">{error}</p>}

            <div className="flex align-items-center justify-content-between mb-5">
              <div className="flex align-items-center gap-2">
                <Checkbox
                  onChange={(e: CheckboxChangeEvent) => setChecked(e.checked!)}
                  checked={checked}
                />
                <label className="text-600" htmlFor="rememberme">
                  Onthoud mij
                </label>
              </div>
              <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
                Wachtwoord vergeten?
              </a>
            </div>

            <Button label="Log in" icon="pi pi-user" className="w-full" />
          </form>
        </section>
      </section>
    </main>
  );
}
