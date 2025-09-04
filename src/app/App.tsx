import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { MenuProvider } from "@/shared/hooks/SideBarContext/MenuContext";

function App() {
  return (
    <MenuProvider>
      <Router>
        <AppRoutes />
      </Router>
    </MenuProvider>

  );
}

export default App;
