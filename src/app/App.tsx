import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './auth/AuthProvider';

function App() {
  throw new Error('3은 허용되지 않습니다!');
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
