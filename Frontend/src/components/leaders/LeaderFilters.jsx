import React from 'react';

const LeaderFilters = ({ filters, onFiltersChange, positions, areas }) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleSearchChange = (value) => {
    onFiltersChange({
      ...filters,
      search: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Filter Leaders</h3>
      
      {/* Search */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Search by Name
        </label>
        <div className="relative">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Type leader's name..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Position Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Position
        </label>
        <select
          value={filters.position}
          onChange={(e) => handleFilterChange('position', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Positions</option>
          {positions.map(position => (
            <option key={position} value={position}>{position}</option>
          ))}
        </select>
      </div>

      {/* Area Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Area
        </label>
        <select
          value={filters.area}
          onChange={(e) => handleFilterChange('area', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="all">All Areas</option>
          {areas.map(area => (
            <option key={area} value={area}>{area}</option>
          ))}
        </select>
      </div>

      {/* Active Filters Count */}
      {(filters.search || filters.position !== 'all' || filters.area !== 'all') && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-700">
              Active filters: {' '}
              {(filters.search ? 1 : 0) + 
               (filters.position !== 'all' ? 1 : 0) + 
               (filters.area !== 'all' ? 1 : 0)}
            </span>
            <button
              onClick={() => onFiltersChange({ position: 'all', area: 'all', search: '' })}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">💡 Quick Tips</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Click on any card for full details</li>
          <li>• Use filters to find specific leaders</li>
          <li>• Contact info available in profiles</li>
        </ul>
      </div>
    </div>
  );
};

export default LeaderFilters;