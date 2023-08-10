import { Routes, Route } from 'react-router-dom';
import BaseView from './views/BaseView';
import DashboardView from './views/DashboardView';
import { PrimeReactProvider } from 'primereact/api';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

function App() {
  return (
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<BaseView />}>
          <Route path="/" element={<DashboardView />} />
          <Route path="/zaaktypen" element={<DashboardView />} />
          <Route path="/zaaktypen/:zaaktype" element={<DashboardView />} />
          <Route path="/attributen" element={<DashboardView />} />
          <Route path="/attributen/:attribuut" element={<DashboardView />} />
        </Route>
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
