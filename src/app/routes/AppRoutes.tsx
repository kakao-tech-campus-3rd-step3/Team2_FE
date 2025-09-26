import { Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Test from '@/pages/test/Test';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import { ROUTES } from '@/app/routePaths';

function AppRoutes() {
  return (
    <Routes>
      {/* 추후 로그인 여부에 따라 / 경로가 로그인 페이지 혹은 main 페이지로 유동적 이동 */}
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.TEST_CORS} element={<Test />} />
=======
import AppLayout from '@/pages/layout/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Source from '@/pages/Source';
import Create from '@/pages/Create';
import Solve from '@/pages/Solve';
import Library from '@/pages/Library';
import Wrong from '@/pages/Wrong';
import NotFound from '@/pages/NotFound';
import Test from '@/pages/test/Test';
import LoginSuccess from '@/pages/LoginSuccess';

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
          <Route path={ROUTES.ROOT} element={<Create />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.SOURCE} element={<Source />} />
          <Route path={ROUTES.CREATE} element={<Create />} />
          <Route path={ROUTES.SOLVE} element={<Solve />} />
          <Route path={ROUTES.LIBRARY} element={<Library />} />
          <Route path={ROUTES.WRONG} element={<Wrong />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
      {import.meta.env.DEV && <Route path={ROUTES.TEST_CORS} element={<Test />} />}
>>>>>>> 12709ae9c1c9ac078bcdb053b5f519bdaf116f32
    </Routes>
  );
}

export default AppRoutes;
