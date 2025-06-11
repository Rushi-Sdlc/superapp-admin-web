import { useLocation } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

// Map routes to page titles
const routeTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/agent-management': 'Agent Management',
  '/customer-management': 'Customer Management',
  '/merchant-management': 'Merchant Management',
  '/remittance-management': 'Remittance Management',
  '/all-transactions': 'All Transactions',
  '/kyc-request': 'KYC Request',
  '/virtual-debit-request': 'Virtual Debit Request',
  '/manage-utility': 'Manage Utility',
  '/advertisement': 'Advertisement',
  '/terms-and-conditions': 'Terms & Conditions',
  '/settings': 'Settings',
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const location = useLocation();
  const title = routeTitles[location.pathname] || 'Dashboard';

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} />
      <div
        className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'pl-64' : 'pl-16'}`}
      >
        <Header toggleSidebar={toggleSidebar} title={title} />
        <main className="pt-16 bg-gray-100 min-h-screen p-4">{children}</main>
      </div>
    </div>
  );
}
