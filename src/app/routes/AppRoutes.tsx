import { Routes, Route } from 'react-router-dom';
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

import { ROUTES } from '@/app/routePaths';
function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.SOURCE} element={<Source />} />
        <Route path={ROUTES.CREATE} element={<Create />} />
        <Route path={ROUTES.SOLVE} element={<Solve />} />
        <Route path={ROUTES.LIBRARY} element={<Library />} />
        <Route path={ROUTES.WRONG} element={<Wrong />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      {import.meta.env.DEV && <Route path={ROUTES.TEST_CORS} element={<Test />} />}
    </Routes>
  );
}

export default AppRoutes;
