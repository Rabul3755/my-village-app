import React from 'react';
import { Link } from 'react-router-dom';

const VillageMapPreview = () => {
  const keyLocations = [
    { name: 'Panchayat Office', type: 'Administration', emoji: '🏛️' },
    { name: 'Primary School', type: 'Education', emoji: '🏫' },
    { name: 'Health Center', type: 'Healthcare', emoji: '🏥' },
    { name: 'Main Market', type: 'Commerce', emoji: '🛒' },
    { name: 'Community Park', type: 'Recreation', emoji: '🌳' },
    { name: 'Bus Stand', type: 'Transport', emoji: '🚌' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="font-bold text-gray-800 text-xl mb-4 flex items-center gap-2">
        <span>🗺️</span>
        Village Layout
      </h3>
      
      {/* Simplified Map Visualization */}
      <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 border border-blue-200 mb-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          {/* This is a very simplified visual representation */}
          <div className="bg-white p-3 rounded border border-gray-300">
            <div className="text-lg">🏛️</div>
            <div className="text-xs text-gray-600 mt-1">Center</div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <div className="text-lg">🏫</div>
            <div className="text-xs text-gray-600 mt-1">School</div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <div className="text-lg">🏥</div>
            <div className="text-xs text-gray-600 mt-1">Health</div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <div className="text-lg">🛒</div>
            <div className="text-xs text-gray-600 mt-1">Market</div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <div className="text-lg">🌳</div>
            <div className="text-xs text-gray-600 mt-1">Park</div>
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <div className="text-lg">🚌</div>
            <div className="text-xs text-gray-600 mt-1">Bus</div>
          </div>
        </div>
      </div>

      {/* Key Locations List */}
      <div className="space-y-3 mb-4">
        {keyLocations.map((location, index) => (
          <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-xl">{location.emoji}</span>
            <div className="flex-1">
              <div className="font-medium text-gray-800 text-sm">{location.name}</div>
              <div className="text-gray-500 text-xs">{location.type}</div>
            </div>
          </div>
        ))}
      </div>

      <Link 
        to="/map"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm flex items-center justify-center gap-2"
      >
        <span>Explore Interactive Map</span>
        <span>→</span>
      </Link>
    </div>
  );
};

export default VillageMapPreview;