import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from '@/app/routes/AppRoutes'

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
