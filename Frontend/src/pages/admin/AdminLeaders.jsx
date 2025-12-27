import React, { useState, useEffect } from 'react';
import { adminAPI } from '../../services/api';
import { useAdminAuth } from '../../context/AdminAuthContext';

const AdminLeaders = () => {
  const { admin } = useAdminAuth();
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    position: 'all',
    search: '',
    isActive: 'true',
    page: 1,
    limit: 10
  });
  const [pagination, setPagination] = useState({});
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadLeaders();
  }, [filters]);

  const loadLeaders = async () => {
    try {
      setLoading(true);
      const response = await adminAPI.getAdminLeaders(filters);
      setLeaders(response.data);
      setPagination(response.pagination);
    } catch (error) {
      setError('Failed to load leaders');
      console.error('Leaders error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (leaderId, currentStatus) => {
    try {
      await adminAPI.toggleLeaderActive(leaderId);
      await loadLeaders();
    } catch (error) {
      setError('Failed to update leader status');
    }
  };

  const handleDelete = async (leaderId, leaderName) => {
    if (!window.confirm(`Are you sure you want to delete ${leaderName}?`)) {
      return;
    }

    try {
      await adminAPI.deleteLeader(leaderId);
      await loadLeaders();
    } catch (error) {
      setError('Failed to delete leader');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Leader Management</h1>
          <p className="text-gray-600">Manage local leaders and representatives</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Add Leader
          </button>
          <button
            onClick={() => loadLeaders()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <select
              value={filters.position}
              onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="all">All Positions</option>
              <option value="Ward Councillor">Ward Councillor</option>
              <option value="Sarpanch">Sarpanch</option>
              <option value="Education Officer">Education Officer</option>
              <option value="Health Officer">Health Officer</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={filters.isActive}
              onChange={(e) => setFilters(prev => ({ ...prev, isActive: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
              <option value="all">All</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search leaders..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value, page: 1 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Items per page</label>
            <select
              value={filters.limit}
              onChange={(e) => setFilters(prev => ({ ...prev, limit: parseInt(e.target.value), page: 1 }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-600 mr-3">⚠️</div>
            <div>
              <h3 className="text-red-800 font-medium">Error</h3>
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Leaders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leaders.map((leader) => (
          <div key={leader._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{leader.name}</h3>
                  <p className="text-blue-600 font-medium">{leader.position}</p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  leader.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {leader.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{leader.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🏛️</span>
                  <span>{leader.party}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <span>{leader.contact?.phone}</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                {leader.bio}
              </p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleToggleActive(leader._id, leader.isActive)}
                  className={`px-3 py-1 text-sm rounded ${
                    leader.isActive
                      ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                      : 'bg-green-100 text-green-800 hover:bg-green-200'
                  }`}
                >
                  {leader.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <div className="flex gap-2">
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200">
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(leader._id, leader.name)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {leaders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No leaders found</h3>
          <p className="text-gray-500">Try adjusting your filters or add a new leader.</p>
        </div>
      )}

      {/* Pagination */}
      {pagination.total > 1 && (
        <div className="bg-white px-6 py-3 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing page {pagination.current} of {pagination.total}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={filters.page === 1}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={filters.page === pagination.total}
                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeaders;