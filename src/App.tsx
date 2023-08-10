import { Routes, Route } from 'react-router-dom';
import BaseView from './views/BaseView';
import DashboardView from './views/DashboardView';
import { AuthProvider, RequireAuth } from './components/Auth/Auth';
import LoginView from './views/LoginView';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

function App() {
  return (
    <AuthProvider>
      <PrimeReactProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<BaseView />}>
              <Route path="/" element={<DashboardView />} />
              <Route path="/zaaktypen" element={<DashboardView />} />
              <Route path="/zaaktypen/:zaaktype" element={<DashboardView />} />
              <Route path="/attributen" element={<DashboardView />} />
              <Route path="/attributen/:attribuut" element={<DashboardView />} />
            </Route>
          </Route>
          <Route path="/login" element={<LoginView />}></Route>
        </Routes>
      </PrimeReactProvider>
    </AuthProvider>
  );
}

export default App;
