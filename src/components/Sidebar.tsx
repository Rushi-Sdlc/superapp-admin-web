import { LuLayoutDashboard } from 'react-icons/lu';
import { FaUserFriends } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const menuItems = [
  { name: 'Dashboard', icon: <LuLayoutDashboard />, path: '/' },
  {
    name: 'Customer Management',
    icon: <FaUserFriends />,
    path: '/customer-management',
  },
  {
    name: 'Merchant Management',
    icon: <FaUserFriends />,
    path: '/merchant-management',
  },
  {
    name: 'Agent Management',
    icon: <FaUserFriends />,
    path: '/agent-management',
  },
  {
    name: 'Remittance Management',
    icon: <FaUserFriends />,
    path: '/remittance-management',
  },
  { name: 'All Transactions', icon: <FaUserFriends />, path: '/transactions' },
  { name: 'KYC Request', icon: <FaUserFriends />, path: '/kyc-request' },
  {
    name: 'Virtual Debit Request',
    icon: <FaUserFriends />,
    path: '/virtual-debit-request',
  },
  { name: 'Manage Utility', icon: <FaUserFriends />, path: '/manage-utility' },
  { name: 'Advertisement', icon: <FaUserFriends />, path: '/advertisement' },
  {
    name: 'Terms & Conditions',
    icon: <FaUserFriends />,
    path: '/terms-and-conditions',
  },
  { name: 'Settings', icon: <FaUserFriends />, path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();

  return (
    <aside
      className={`h-screen bg-white fixed top-0 left-0 shadow z-10 pt-5 border-r border-gray-200 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}`}
    >
      <div className="flex justify-center mb-6 overflow-hidden">
        <img
          src={logo}
          alt="App Logo"
          className={`object-contain transition-all duration-300 ${isOpen ? 'w-[100px]' : 'w-0'}`}
        />
      </div>
      <nav className="px-2 space-y-1">
        {menuItems.map(({ name, icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              className={`flex items-center px-3 py-2 text-sm rounded-xl font-medium w-full transition-all duration-200
                ${isActive ? 'bg-teal-500 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
            >
              <span className="text-base sm:text-lg mr-3">{icon}</span>
              {isOpen && <span className="truncate">{name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
