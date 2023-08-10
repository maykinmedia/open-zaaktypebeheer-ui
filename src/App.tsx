import { Routes, Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import DashboardView from './views/DashboardView';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css'; //icons
import 'primeflex/primeflex.css'; // flex

function App() {
  return (
    <PrimeReactProvider>
      <Routes>
        <Route path="/" element={<DashboardView />} />
      </Routes>
    </PrimeReactProvider>
  );
}

export default App;
