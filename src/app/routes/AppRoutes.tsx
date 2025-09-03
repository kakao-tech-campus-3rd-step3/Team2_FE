import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import Test from '@/pages/test/Test';
import Login from '@/pages/Login';
import { ROUTES } from '../routePaths';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.TEST_CORS} element={<Test />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
    </Routes>
  );
}

export default AppRoutes;
