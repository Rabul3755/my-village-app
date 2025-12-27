import React, { useState } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { Navigate, useLocation, useNavigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const { admin, logout, loading } = useAdminAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!admin && !localStorage.getItem('adminToken')) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (localStorage.getItem('adminToken') && !admin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading your session...</div>
      </div>
    );
  }

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊', current: location.pathname === '/admin' || location.pathname === '/admin/dashboard' },
    { name: 'Issues', href: '/admin/issues', icon: '📝', current: location.pathname.includes('/admin/issues') },
    { name: 'Leaders', href: '/admin/leaders', icon: '👥', current: location.pathname.includes('/admin/leaders') },
    { name: 'Representatives', href: '/admin/representatives', icon: '🏛️', current: location.pathname.includes('/admin/representatives') },
    { name: 'Analytics', href: '/admin/analytics', icon: '📈', current: location.pathname.includes('/admin/analytics') },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', current: location.pathname.includes('/admin/settings') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const handleNavigation = (href) => {
    navigate(href);
    setSidebarOpen(false);
  };

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 flex z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 transform transition duration-300 ease-in-out md:relative md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white hover:text-blue-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.href)}
                className={`w-full text-left flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  item.current
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-blue-100 hover:bg-blue-700 hover:text-white'
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Admin Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-700 bg-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {admin?.name?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{admin?.name || 'Admin'}</p>
                <p className="text-xs text-blue-200 capitalize">{admin?.role || 'user'}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="text-blue-200 hover:text-white text-sm p-2 hover:bg-blue-700 rounded-lg transition-colors"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="ml-4 md:ml-0 text-lg font-semibold text-gray-800">
                {navigation.find(item => item.current)?.name || 'Admin Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.open('/', '_blank')}
                className="flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Site
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;