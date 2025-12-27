import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import LeaderCard from '../components/leaders/LeaderCard';
import LeaderFilters from '../components/leaders/LeaderFilters';
import LeaderModal from '../components/leaders/LeaderModal';

const Leaders = () => {
  const { village = {}, leaders = [] } = useApp();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [filters, setFilters] = useState({
    position: 'all',
    area: 'all',
    search: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Filter leaders based on current filters with safety checks
  const filteredLeaders = leaders.filter(leader => {
    if (!leader) return false;
    
    if (filters.position !== 'all' && leader.position !== filters.position) return false;
    if (filters.area !== 'all' && leader.area !== filters.area) return false;
    if (filters.search && !leader.name?.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  // Get unique positions and areas for filters with safety checks
  const positions = [...new Set(leaders.map(leader => leader?.position).filter(Boolean))];
  const areas = [...new Set(leaders.map(leader => leader?.area).filter(Boolean))];

  const handleLeaderClick = (leader) => {
    if (leader && leader._id) {
      setSelectedLeader(leader);
    } else {
      console.error('Invalid leader data:', leader);
    }
  };

  // Safe village name fallback
  const villageName = village?.name || 'our village';

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading leaders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Local Leaders & Representatives
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the people working for {villageName}. Contact your representatives, 
              learn about their work, and stay informed about local governance.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Leadership Overview</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Leaders</span>
                    <span className="font-semibold text-blue-600">{leaders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Showing</span>
                    <span className="font-semibold">{filteredLeaders.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Positions</span>
                    <span className="font-semibold">{positions.length}</span>
                  </div>
                </div>
              </div>

              {/* Filters */}
              <LeaderFilters 
                filters={filters} 
                onFiltersChange={setFilters}
                positions={positions}
                areas={areas}
              />

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Can't find your representative? Have questions about local governance?
                </p>
                <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
                  📞 Contact Village Office
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Results Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Our Representatives</h2>
                  <p className="text-gray-600 mt-1">
                    {filteredLeaders.length} leader{filteredLeaders.length !== 1 ? 's' : ''} found
                    {filters.search && ` for "${filters.search}"`}
                  </p>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated: Today
                </div>
              </div>
            </div>

            {/* Leaders Grid */}
            {filteredLeaders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLeaders.map(leader => (
                  <LeaderCard 
                    key={leader.id || `leader-${leader.name}-${leader.position}`}
                    leader={leader} 
                    onClick={() => handleLeaderClick(leader)}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No leaders found</h3>
                <p className="text-gray-500 mb-4">
                  {filters.search || filters.position !== 'all' || filters.area !== 'all'
                    ? "Try adjusting your filters to see more results."
                    : "No leaders have been added yet. Check back soon!"
                  }
                </p>
                {(filters.search || filters.position !== 'all' || filters.area !== 'all') && (
                  <button
                    onClick={() => setFilters({ position: 'all', area: 'all', search: '' })}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Reset all filters
                  </button>
                )}
              </div>
            )}

            {/* Election Notice */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <span className="text-2xl">🗳️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Upcoming Elections</h3>
                  <p className="text-yellow-700 text-sm">
                    Municipal elections are scheduled for March 2024. Candidate information 
                    will be updated as the election approaches. Stay tuned for more details!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leader Detail Modal */}
      {selectedLeader && (
        <LeaderModal 
          leader={selectedLeader} 
          onClose={() => setSelectedLeader(null)} 
        />
      )}
    </div>
  );
};

export default Leaders;