import React from 'react';

const IssueFilters = ({ filters, onFiltersChange }) => {
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' }
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

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'most-voted', label: 'Most Voted' },
    { value: 'recently-updated', label: 'Recently Updated' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Filter by:</span>
        
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {statusOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {categoryOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </select>
        <select
          value={filters.sortBy}
          onChange={(e) => handleFilterChange('sortBy', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => onFiltersChange({ status: 'all', category: 'all', sortBy: 'newest' })}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium whitespace-nowrap"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default IssueFilters;