import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth, RequireNoAuth } from './components/Auth/Auth';
import BaseView from './views/BaseView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';
import ZaaktypeEditView from './views/ZaaktypeEditView';
import { ThemeProvider } from '@emotion/react';
import { theme } from './utils/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<BaseView />}>
              <Route path="/" element={<DashboardView />} />
              <Route path="/zaaktypen/:zaaktypeUuid/wijzigen" element={<ZaaktypeEditView />} />
            </Route>
          </Route>
          <Route element={<RequireNoAuth />}>
            <Route path="/login" element={<LoginView />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
