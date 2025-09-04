import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../routePaths';

import Home from '@/pages/Home';
import Test from '@/pages/test/Test';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.TEST_CORS} element={<Test />} />
    </Routes>
  );
}

export default AppRoutes;
