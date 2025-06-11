import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import AgentManagement from '../pages/Agent/AgentManagement';

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
  );
};

export default AppRoutes;
