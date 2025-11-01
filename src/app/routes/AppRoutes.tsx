import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/pages/layout/AppLayout';
import Login from '@/pages/Login';
import LoginSuccess from '@/pages/LoginSuccess';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import Solve from '@/pages/Solve';
import Library from '@/pages/Library';
import Wrong from '@/pages/Wrong';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';

import { ROUTES } from '@/app/routePaths';
import ProtectedRoute from '@/app/auth/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGIN_SUCCESS} element={<LoginSuccess />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.CREATE} element={<Create />} />
          <Route path={ROUTES.SOLVE} element={<Solve />} />
          <Route path={ROUTES.LIBRARY} element={<Library />} />
          <Route path={ROUTES.WRONG} element={<Wrong />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
