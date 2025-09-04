import { Routes, Route } from 'react-router-dom';
import Test from '@/pages/test/Test';
import Login from '@/pages/Login';
import Home from '@/pages/Home';
import { ROUTES } from '@/app/routePaths';

function AppRoutes() {
  return (
    <Routes>
      //추후 로그인 여부에 따라 / 경로가 로그인 페이지 혹은 main 페이지로 유동적 이동
      <Route path={ROUTES.HOME} element={<Login />} />
      <Route path={ROUTES.TEST_CORS} element={<Test />} />
      <Route path={ROUTES.MAIN} element={<Home />} />
    </Routes>
  );
}

export default AppRoutes;
