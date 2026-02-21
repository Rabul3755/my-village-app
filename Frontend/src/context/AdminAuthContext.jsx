import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { adminAuthAPI } from '../services/api';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  // Check if admin is logged in on initial load
  useEffect(() => {
    console.log('🔍 Checking admin login status on mount...');
    checkAdminLoggedIn();
  }, []);

  const checkAdminLoggedIn = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      console.log('🔐 Token in localStorage:', token ? 'Exists' : 'Missing');
      
      if (token) {
        console.log('📡 Making getMe API call to verify token...');
        const response = await adminAuthAPI.getMe();
        console.log('✅ getMe API response:', response);
        
        if (response && response.success) {
          const adminData = response.data?.admin || response.data;
          console.log('👤 Setting admin data from getMe:', adminData);
          setAdmin(adminData);
        } else {
          console.log('❌ Invalid token response, clearing token');
          localStorage.removeItem('adminToken');
          setAdmin(null);
        }
      } else {
        console.log('❌ No token found');
        setAdmin(null);
      }
    } catch (error) {
      console.error('💥 Auth check failed:', error);
      localStorage.removeItem('adminToken');
      setAdmin(null);
    } finally {
      console.log('🏁 Auth check completed');
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log('🚀 Starting login process...');
      setLoading(true);
      setError(null);
      
      console.log('📧 Login credentials:', { email, password: '***' });
      
      const response = await adminAuthAPI.login({ email, password });
      
      console.log('📨 Login API response:', response);
      
      if (response && response.success) {
        const { data } = response;
        console.log('🔑 Token received:', data.token ? 'YES' : 'NO');
        
        if (data.token) {
          // Save token to localStorage
          localStorage.setItem('adminToken', data.token);
          console.log('💾 Token saved to localStorage');
          
          // Get admin data
          const adminData = data.admin || data;
          console.log('👤 Admin data to set:', adminData);
          
          // Set admin state
          setAdmin(adminData);
          console.log('✅ Admin state updated in context');
          
          return { success: true, message: response.message, data };
        } else {
          console.log('❌ No token in response');
          throw new Error('No token received from server');
        }
      } else {
        const errorMessage = response?.message || 'Admin login failed';
        console.log('❌ Login failed:', errorMessage);
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('💥 Login process error:', error);
      const errorMessage = error.message || 'Admin login failed. Please check your credentials.';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      console.log('🏁 Login process completed');
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('👋 Logging out admin');
    localStorage.removeItem('adminToken');
    setAdmin(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    admin,
    loading,
    error,
    isAuthenticated: !!admin,
    login,
    logout,
    clearError,
    checkAdminLoggedIn
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export default AdminAuthContext;