import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VillageMap from '../components/map/VillageMap';
import MapLegend from '../components/map/MapLegend';
import MapFilters from '../components/map/MapFilters';
import IssueDetails from '../components/map/IssueDetails';

const Map = () => {
 const { village = {}, issues = [], } = useApp();

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filters, setFilters] = useState({ status: 'all', category: 'all' });
  const [mapView, setMapView] = useState('issues'); 
  const [mapPosition, setMapPosition] = useState({ lat: 17.0389, lng: 75.1773 }); // Jath default

  const filteredIssues = issues.filter(issue => {
    if (filters.status !== 'all' && issue.status !== filters.status) return false;
    if (filters.category !== 'all' && issue.category !== filters.category) return false;
    return true;
  });

  const moveMap = (direction) => {
    const moveStep = 0.002; // small movement step
    setMapPosition(prev => {
      switch (direction) {
        case 'left': return { ...prev, lng: prev.lng - moveStep };
        case 'right': return { ...prev, lng: prev.lng + moveStep };
        case 'up': return { ...prev, lat: prev.lat + moveStep };
        case 'down': return { ...prev, lat: prev.lat - moveStep };
        default: return prev;
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{village.name} Interactive Map</h1>
            <p className="text-gray-600 mt-2">Explore village issues geographically and track their progress</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setMapView('issues')}
              className={`px-4 py-2 rounded-lg font-medium ${
                mapView === 'issues' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🎯 Issues View
            </button>
            <button
              onClick={() => setMapView('village')}
              className={`px-4 py-2 rounded-lg font-medium ${
                mapView === 'village' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              🏡 Village View
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Map Overview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span>Total Issues</span><span>{issues.length}</span></div>
              <div className="flex justify-between"><span>Visible on Map</span><span className="text-blue-600">{filteredIssues.length}</span></div>
              <div className="flex justify-between"><span>Map View</span><span className="capitalize">{mapView}</span></div>
            </div>
          </div>

          <MapFilters filters={filters} onFiltersChange={setFilters} />
          <MapLegend />

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 font-medium">📍 Report New Issue</button>
              <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 font-medium">🗺️ Download Village Map</button>
            </div>
          </div>
        </div>

        {/* Main Map */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden relative">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-gray-800">{mapView === 'issues' ? 'Issues Map' : 'Village Overview'}</h3>
                <span className="text-sm text-gray-500">{filteredIssues.length} issues visible</span>
              </div>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last updated: Today
              </div>
            </div>

            {/* Map */}
            <div className="h-[600px] relative">
              <VillageMap 
                issues={filteredIssues}
                center={[mapPosition.lat, mapPosition.lng]}
                zoom={15}
                onIssueSelect={setSelectedIssue}
                viewMode={mapView}
              />

              {/* Move Controls */}
              <div className="absolute top-4 left-4 bg-white p-2 rounded-lg shadow-md flex flex-col gap-2">
                <button onClick={() => moveMap('up')} className="p-1 hover:bg-gray-100 rounded">⬆️</button>
                <div className="flex gap-2">
                  <button onClick={() => moveMap('left')} className="p-1 hover:bg-gray-100 rounded">⬅️</button>
                  <button onClick={() => moveMap('right')} className="p-1 hover:bg-gray-100 rounded">➡️</button>
                </div>
                <button onClick={() => moveMap('down')} className="p-1 hover:bg-gray-100 rounded">⬇️</button>
              </div>
            </div>
          </div>

          {/* Selected Issue */}
          {selectedIssue && (
            <div className="mt-6">
              <IssueDetails issue={selectedIssue} onClose={() => setSelectedIssue(null)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Map;
