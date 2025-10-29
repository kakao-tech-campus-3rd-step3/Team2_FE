import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
