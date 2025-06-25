import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import AgentManagement from '../pages/Agent/AgentManagement';
import GetTransactions from '../pages/Transactions/GetAllTransactions';

const AppRoutes = () => {
  return React.createElement(
    Routes,
    null,
    React.createElement(Route, {
      path: '/',
      element: React.createElement(Dashboard),
    }),
    React.createElement(Route, {
      path: '/agent-management',
      element: React.createElement(AgentManagement),
    }),
    React.createElement(Route, {
      path: '/transactions',
      element: React.createElement(GetTransactions),
    }),
  );
};

export default AppRoutes;
