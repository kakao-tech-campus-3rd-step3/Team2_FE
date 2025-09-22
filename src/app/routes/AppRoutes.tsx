import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/app/routePaths';
import Home from '@/pages/Home';

// 페이지들
import Login from '@/pages/Login';
import Dashboard from '@/pages/HomeSection/Dashboard';
import Source from '@/pages/HomeSection/Source';
import Create from '@/pages/HomeSection/Create';
import Solve from '@/pages/HomeSection/Solve';
import Wrong from '@/pages/HomeSection/Wrong';
import Test from '@/pages/test/Test';

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route element={<Home />}>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />}/>
        <Route path={ROUTES.SOURCE} element={<Source />}/>
        <Route path={ROUTES.CREATE} element={<Create />}/>
        <Route path={ROUTES.SOLVE} element={<Solve />}/>
        <Route path={ROUTES.WRONG} element={<Wrong />}/>
      </Route>
      <Route path={ROUTES.TEST_CORS} element={<Test />} />
    </Routes>
  );
}

export default AppRoutes;
