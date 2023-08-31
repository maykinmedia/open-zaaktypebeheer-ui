import { Routes, Route } from 'react-router-dom';
import { AuthProvider, RequireAuth, RequireNoAuth } from './components/Auth/Auth';
import BaseView from './views/BaseView';
import LoginView from './views/LoginView';
import DashboardView from './views/DashboardView';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<BaseView />}>
            <Route path="/" element={<DashboardView />} />
          </Route>
        </Route>
        <Route element={<RequireNoAuth />}>
          <Route path="/login" element={<LoginView />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
