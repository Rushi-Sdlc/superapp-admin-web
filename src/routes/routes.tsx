import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import AgentManagement from '../pages/Agent/AgentManagement';
import GetTransactions from '../pages/Transactions/GetAllTransactions';
import LoginPage from '../pages/Auth/AdminLogin';
import PrivateRoute from './PrivateRoute';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/agent-management"
        element={
          <PrivateRoute>
            <AgentManagement />
          </PrivateRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <GetTransactions />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
