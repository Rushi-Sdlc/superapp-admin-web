// src/App.tsx
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import AppRoutes from './routes/routes';
import DashboardLayout from './layouts/DashboardLayout';
import { AuthProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppLayout() {
  const location = useLocation();
  const isLoginRoute = location.pathname === '/login';

  return (
    <>
      {isLoginRoute ? (
        <AppRoutes />
      ) : (
        <DashboardLayout>
          <AppRoutes />
        </DashboardLayout>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
