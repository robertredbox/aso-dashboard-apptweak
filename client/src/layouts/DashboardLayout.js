import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiGrid, 
  FiSearch, 
  FiMessageSquare, 
  FiTrello, 
  FiUsers, 
  FiSettings, 
  FiMenu, 
  FiX, 
  FiBell,
  FiUser 
} from 'react-icons/fi';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Navigation items
  const navItems = [
    { icon: <FiHome size={20} />, title: 'Dashboard', path: '/dashboard' },
    { icon: <FiGrid size={20} />, title: 'Apps', path: '/apps' },
    { icon: <FiSearch size={20} />, title: 'Keywords', path: '/keywords' },
    { icon: <FiMessageSquare size={20} />, title: 'Reviews', path: '/reviews' },
    { icon: <FiTrello size={20} />, title: 'Categories', path: '/categories' },
    { icon: <FiUsers size={20} />, title: 'Competitors', path: '/competitors' },
    { icon: <FiSettings size={20} />, title: 'Settings', path: '/settings' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-20 transition-opacity bg-gray-600 opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-white border-r lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'
      }`}>
        <div className="flex items-center justify-center mt-8">
          <div className="flex items-center">
            <span className="mx-2 text-2xl font-semibold text-primary-600 font-slab">ASO Dashboard</span>
          </div>
        </div>

        <nav className="mt-10">
          {navItems.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center px-6 py-3 mt-1 text-gray-500 transition-colors duration-200 ${
                isActive(item.path) 
                  ? 'border-l-4 border-primary-600 bg-primary-50 text-primary-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <span className="mx-3">{item.icon}</span>
              <span className="mx-2 font-medium">{item.title}</span>
            </Link>
          ))}
        </nav>

        {/* User profile section */}
        <div className="absolute bottom-0 w-full border-t border-gray-200">
          <div className="flex items-center p-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <FiUser size={20} />
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                Demo User
              </p>
              <div className="flex mt-1">
                <Link 
                  to="/profile" 
                  className="text-xs font-medium text-gray-500 hover:text-primary-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  Profile
                </Link>
                <span className="mx-1 text-gray-500">·</span>
                <button 
                  className="text-xs font-medium text-gray-500 hover:text-primary-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b">
          {/* Mobile menu button */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-500 focus:outline-none lg:hidden"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Header right side */}
          <div className="flex items-center">
            <button className="relative p-2 mr-4 text-gray-400 hover:text-gray-500 focus:outline-none">
              <FiBell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 mt-1 mr-1 bg-red-500 rounded-full"></span>
            </button>
            <div className="relative">
              <button className="flex items-center text-gray-500 focus:outline-none">
                <div className="w-8 h-8 overflow-hidden rounded-full">
                  <div className="w-full h-full rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <FiUser size={16} />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container px-6 py-8 mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
