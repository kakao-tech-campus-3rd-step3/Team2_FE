import { Routes, Route } from 'react-router-dom';
import AppLayout from '@/pages/layout/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Create from '@/pages/Create';
import Solve from '@/pages/Solve';
import Library from '@/pages/Library';
import Wrong from '@/pages/Wrong';
import NotFound from '@/pages/NotFound';
import LoginSuccess from '@/pages/LoginSuccess';

import { ROUTES } from '@/app/routePaths';
import ProtectedRoute from '@/app/auth/ProtectedRoute';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import Settings from '@/pages/Settings';
function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.LOGIN_SUCCESS} element={<LoginSuccess />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <ErrorBoundary key={ROUTES.DASHBOARD}>
                <Dashboard />
              </ErrorBoundary>
            }
          />
          <Route
            path={ROUTES.CREATE}
            element={
              <ErrorBoundary key={ROUTES.CREATE}>
                <Create />
              </ErrorBoundary>
            }
          />
          <Route
            path={ROUTES.SOLVE}
            element={
              <ErrorBoundary key={ROUTES.SOLVE}>
                <Solve />
              </ErrorBoundary>
            }
          />
          <Route
            path={ROUTES.LIBRARY}
            element={
              <ErrorBoundary key={ROUTES.LIBRARY}>
                <Library />
              </ErrorBoundary>
            }
          />
          <Route
            path={ROUTES.WRONG}
            element={
              <ErrorBoundary key={ROUTES.WRONG}>
                <Wrong />
              </ErrorBoundary>
            }
          />
          <Route
            path={ROUTES.SETTINGS}
            element={
              <ErrorBoundary key={ROUTES.SETTINGS}>
                <Settings />
              </ErrorBoundary>
            }
          />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
