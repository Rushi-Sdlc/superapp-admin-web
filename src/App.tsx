import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;
