import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
// import AgentManagement from '../pages/Agent/AgentManagement';
import GetTransactions from '../pages/Transactions/GetAllTransactions';
import LoginPage from '../pages/Auth/AdminLogin';
import MerchantManagement from '../pages/Merchant/MerchantManagement';
import CustomerManagement from '../pages/Customer/CustomerManagement';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/customer" element={<CustomerManagement />} />
      <Route path="/merchant" element={<MerchantManagement />} />
      <Route path="/transactions" element={<GetTransactions />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoutes;
