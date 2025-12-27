import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { Calendar, TrendingUp, Users, FileText, Clock, CheckCircle, AlertCircle, Download } from 'lucide-react';

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [loading, setLoading] = useState(false);

  // Mock data - In a real app, this would come from your API
  const monthlyIssuesData = [
    { month: 'Jan', reported: 45, resolved: 32, pending: 13 },
    { month: 'Feb', reported: 52, resolved: 40, pending: 12 },
    { month: 'Mar', reported: 68, resolved: 55, pending: 13 },
    { month: 'Apr', reported: 61, resolved: 48, pending: 13 },
    { month: 'May', reported: 73, resolved: 60, pending: 13 },
    { month: 'Jun', reported: 65, resolved: 52, pending: 13 },
    { month: 'Jul', reported: 58, resolved: 46, pending: 12 },
  ];

  const userEngagementData = [
    { day: 'Mon', active: 120, new: 15 },
    { day: 'Tue', active: 145, new: 18 },
    { day: 'Wed', active: 168, new: 22 },
    { day: 'Thu', active: 132, new: 16 },
    { day: 'Fri', active: 158, new: 20 },
    { day: 'Sat', active: 98, new: 12 },
    { day: 'Sun', active: 85, new: 10 },
  ];

  const categoryData = [
    { name: 'Infrastructure', value: 35, color: '#0088FE' },
    { name: 'Sanitation', value: 25, color: '#00C49F' },
    { name: 'Education', value: 20, color: '#FFBB28' },
    { name: 'Healthcare', value: 15, color: '#FF8042' },
    { name: 'Other', value: 5, color: '#8884D8' },
  ];

  const leaderPerformanceData = [
    { name: 'Ramesh Kumar', issuesResolved: 42, responseTime: 2.5, satisfaction: 4.2 },
    { name: 'Anjali Patil', issuesResolved: 38, responseTime: 3.1, satisfaction: 4.0 },
    { name: 'Rajesh Verma', issuesResolved: 35, responseTime: 2.8, satisfaction: 4.5 },
    { name: 'Mohan Singh', issuesResolved: 28, responseTime: 4.2, satisfaction: 3.8 },
    { name: 'Kavita Reddy', issuesResolved: 25, responseTime: 3.5, satisfaction: 4.1 },
  ];

  const stats = {
    totalIssues: 421,
    resolvedIssues: 342,
    pendingIssues: 79,
    resolutionRate: 81.2,
    activeUsers: 856,
    newUsersThisMonth: 45,
    avgResponseTime: '2.8 days',
    satisfactionScore: 4.3,
  };

  const recentActivity = [
    { id: 1, user: 'John Doe', action: 'Reported new issue', time: '10 min ago', type: 'issue' },
    { id: 2, user: 'Sarah Smith', action: 'Voted on infrastructure issue', time: '25 min ago', type: 'vote' },
    { id: 3, user: 'Ramesh Kumar', action: 'Resolved sanitation issue', time: '1 hour ago', type: 'resolution' },
    { id: 4, user: 'Municipal Corp', action: 'Updated issue status', time: '2 hours ago', type: 'update' },
    { id: 5, user: 'Anjali Patil', action: 'Added new leader profile', time: '3 hours ago', type: 'profile' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const handleExportData = () => {
    setLoading(true);
    setTimeout(() => {
      alert('Analytics data exported successfully!');
      setLoading(false);
    }, 1000);
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real app, this would trigger an API call
    console.log('Fetching data for:', range);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Platform Analytics</h1>
          <p className="text-gray-600">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-gray-400" />
            <select
              value={timeRange}
              onChange={(e) => handleTimeRangeChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          <button
            onClick={handleExportData}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{loading ? 'Exporting...' : 'Export Data'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Issues</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalIssues}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.resolutionRate}%</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+3.2% improvement</span>
              </div>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.activeUsers}</p>
              <div className="flex items-center mt-2">
                <Users className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">+45 this month</span>
              </div>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stats.avgResponseTime}</p>
              <div className="flex items-center mt-2">
                <Clock className="w-4 h-4 text-orange-500 mr-1" />
                <span className="text-sm text-orange-600">-0.5 days improvement</span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues Trend Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Issues Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyIssuesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="reported" name="Reported" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="resolved" name="Resolved" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Engagement Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Engagement</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userEngagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  name="Active Users"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="new"
                  name="New Users"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Issues by Category */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Issues by Category</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Percentage']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leader Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Leader Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leaderPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" angle={-45} textAnchor="end" height={60} />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="issuesResolved"
                  name="Issues Resolved"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="satisfaction"
                  name="Satisfaction Score"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'issue' ? 'bg-blue-100' :
                    activity.type === 'vote' ? 'bg-green-100' :
                    activity.type === 'resolution' ? 'bg-purple-100' : 'bg-gray-100'
                  }`}>
                    {activity.type === 'issue' && <FileText className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'vote' && <TrendingUp className="w-4 h-4 text-green-600" />}
                    {activity.type === 'resolution' && <CheckCircle className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'update' && <AlertCircle className="w-4 h-4 text-gray-600" />}
                    {activity.type === 'profile' && <Users className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.user}</p>
                    <p className="text-sm text-gray-600">{activity.action}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* System Alerts & Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">System Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start">
                <TrendingUp className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900">Positive Trend Detected</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    User engagement increased by 18% this month. Consider expanding community outreach.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-start">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-green-900">High Resolution Rate</h4>
                  <p className="text-sm text-green-700 mt-1">
                    Infrastructure issues show 92% resolution rate. Best performing category this quarter.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-yellow-900">Attention Required</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    3 pending issues older than 30 days. Consider escalating to higher authorities.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="flex items-start">
                <Users className="w-5 h-5 text-purple-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-purple-900">Community Growth</h4>
                  <p className="text-sm text-purple-700 mt-1">
                    45 new users joined this month. Consider adding more localized content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;