import React from 'react';

const MapFilters = ({ filters, onFiltersChange }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'red' },
    { value: 'in-progress', label: 'In Progress', color: 'orange' },
    { value: 'resolved', label: 'Resolved', color: 'green' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'Roads & Infrastructure', label: 'Roads & Infrastructure' },
    { value: 'Drainage & Sanitation', label: 'Drainage & Sanitation' },
    { value: 'Water Supply', label: 'Water Supply' },
    { value: 'Electricity', label: 'Electricity' },
    { value: 'Waste Management', label: 'Waste Management' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Education', label: 'Education' },
    { value: 'Public Safety', label: 'Public Safety' },
    { value: 'Parks & Recreation', label: 'Parks & Recreation' },
    { value: 'Other', label: 'Other' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Map Filters</h3>
      
      {/* Status Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Status
        </label>
        <div className="space-y-2">
          {statusOptions.map(option => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="status"
                value={option.value}
                checked={filters.status === option.value}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: option.color }}
                ></div>
                <span className="text-sm text-gray-700">{option.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => onFiltersChange({ status: 'all', category: 'all' })}
        className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 py-2 rounded-md hover:bg-blue-50 transition-colors"
      >
        Reset All Filters
      </button>
    </div>
  );
};

export default MapFilters;