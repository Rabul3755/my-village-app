import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { Link } from 'react-router-dom';
import {
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  ServerIcon,
  ShieldCheckIcon,
  CogIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [systemHealth, setSystemHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('today');

  useEffect(() => {
    loadDashboardData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadDashboardData();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, activityRes, healthRes] = await Promise.all([
        adminAPI.getDashboardStats(),
        adminAPI.getRecentActivity(),
        adminAPI.getSystemHealth()
      ]);
      
      if (statsRes.success) setStats(statsRes.data);
      if (activityRes.success) setRecentActivity(activityRes.data);
      if (healthRes.success) setSystemHealth(healthRes.data);
      
      setError(null);
    } catch (error) {
      setError('Failed to load dashboard data. Please try refreshing.');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ArrowPathIcon className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadDashboardData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Mock data for demonstration (remove when your API is fully implemented)
  const mockIssuesByCategory = [
    { category: 'Roads & Infrastructure', count: 45, color: 'bg-blue-500' },
    { category: 'Drainage & Sanitation', count: 32, color: 'bg-green-500' },
    { category: 'Electricity', count: 28, color: 'bg-yellow-500' },
    { category: 'Water Supply', count: 21, color: 'bg-purple-500' },
    { category: 'Public Safety', count: 18, color: 'bg-red-500' },
  ];

  const quickActions = [
    {
      title: 'Add New Issue',
      description: 'Create a new issue report',
      icon: DocumentTextIcon,
      color: 'bg-blue-500',
      link: '/admin/issues/new'
    },
    {
      title: 'Manage Leaders',
      description: 'Add or update leaders',
      icon: UsersIcon,
      color: 'bg-green-500',
      link: '/admin/leaders'
    },
    {
      title: 'View Reports',
      description: 'Generate system reports',
      icon: ChartBarIcon,
      color: 'bg-purple-500',
      link: '/admin/analytics'
    },
    {
      title: 'System Settings',
      description: 'Configure platform settings',
      icon: CogIcon,
      color: 'bg-gray-500',
      link: '/admin/settings'
    }
  ];

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'issue':
        return <DocumentTextIcon className="h-5 w-5 text-blue-500" />;
      case 'leader':
        return <UsersIcon className="h-5 w-5 text-green-500" />;
      case 'representative':
        return <ShieldCheckIcon className="h-5 w-5 text-purple-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your platform.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            {['today', 'week', 'month', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 text-sm font-medium capitalize ${
                  timeRange === range
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          
          <button
            onClick={loadDashboardData}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            <ArrowPathIcon className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Issues Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.totalIssues || 0}
              </p>
              <div className="flex items-center mt-2">
                <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">
                  +{stats?.recentIssues || 0} this week
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DocumentTextIcon className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Resolution Rate Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.resolutionRate || 0}%
              </p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="text-sm text-gray-600">
                  {stats?.resolvedIssues || 0} resolved
                </span>
                <span className="text-sm text-gray-600">
                  {stats?.pendingIssues || 0} pending
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Leaders & Representatives Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Leaders</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats?.totalLeaders || 0}
              </p>
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  {stats?.totalRepresentatives || 0} Representatives
                </p>
              </div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <UsersIcon className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* System Health Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">System Status</p>
              <div className="flex items-center mt-2">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  systemHealth?.status === 'healthy' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <span className="text-lg font-semibold capitalize">
                  {systemHealth?.status || 'Healthy'}
                </span>
              </div>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600 flex items-center">
                  <ServerIcon className="h-4 w-4 mr-1" />
                  Uptime: {systemHealth?.server?.uptime ? Math.floor(systemHealth.server.uptime / 3600) : 0}h
                </p>
                {systemHealth?.alerts?.criticalIssues > 0 && (
                  <p className="text-sm text-red-600 flex items-center">
                    <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                    {systemHealth.alerts.criticalIssues} critical issues
                  </p>
                )}
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <ShieldCheckIcon className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Activity & Quick Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <Link 
                  to="/admin/issues" 
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all →
                </Link>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {recentActivity.length > 0 ? (
                recentActivity.slice(0, 8).map((activity, index) => (
                  <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-gray-50">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-gray-900">{activity.title}</p>
                          <span className="text-sm text-gray-500">
                            {formatTime(activity.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                        {activity.data?.status && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getStatusColor(activity.data.status)}`}>
                            {activity.data.status}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="px-6 py-8 text-center">
                  <DocumentTextIcon className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No recent activity</p>
                </div>
              )}
            </div>
          </div>

          {/* Issues by Category */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Issues by Category</h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {mockIssuesByCategory.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">
                        {category.category}
                      </span>
                      <span className="text-sm text-gray-900 font-semibold">
                        {category.count}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${category.color} h-2 rounded-full transition-all duration-500`}
                        style={{ 
                          width: `${(category.count / Math.max(...mockIssuesByCategory.map(c => c.count))) * 100}%` 
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Quick Actions & System Info */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            
            <div className="p-4 space-y-3">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="flex items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div className={`p-3 rounded-lg ${action.color} mr-4`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600">
                      {action.title}
                    </h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* System Information */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">System Information</h2>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ServerIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Server Uptime</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {systemHealth?.server?.uptime ? 
                    `${Math.floor(systemHealth.server.uptime / 3600)}h ${Math.floor((systemHealth.server.uptime % 3600) / 60)}m` 
                    : '0h 0m'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ChartBarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Memory Usage</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {systemHealth?.server?.memory ? 
                    `${systemHealth.server.memory.used}MB / ${systemHealth.server.memory.total}MB` 
                    : '0MB / 0MB'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <UsersIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Active Admins</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {stats?.activeAdmins || 1}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ClockIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <span className="text-sm text-gray-600">Last Updated</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-sm p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Platform Performance</h3>
              <div className="p-2 bg-white/20 rounded-lg">
                <ArrowTrendingUpIcon className="h-5 w-5" />
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">User Engagement</span>
                  <span className="text-sm font-semibold">78%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-white h-2 rounded-full w-3/4" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Issue Resolution</span>
                  <span className="text-sm font-semibold">{stats?.resolutionRate || 0}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div 
                    className="bg-green-300 h-2 rounded-full" 
                    style={{ width: `${stats?.resolutionRate || 0}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">System Reliability</span>
                  <span className="text-sm font-semibold">99.9%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2">
                  <div className="bg-yellow-300 h-2 rounded-full w-full" />
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-white/30">
              <p className="text-sm text-white/90">
                All systems operational. Platform is running smoothly.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <DocumentTextIcon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg. Response Time</p>
            <p className="text-lg font-semibold text-gray-900">2.4 hours</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <div className="p-2 bg-green-100 rounded-lg mr-3">
            <UsersIcon className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Users</p>
            <p className="text-lg font-semibold text-gray-900">{(stats?.totalLeaders || 0) + (stats?.totalRepresentatives || 0)}</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 flex items-center">
          <div className="p-2 bg-purple-100 rounded-lg mr-3">
            <CheckCircleIcon className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Satisfaction Rate</p>
            <p className="text-lg font-semibold text-gray-900">92%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;