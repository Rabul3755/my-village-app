import React from 'react';

const MapLegend = () => {
  const issueLegendItems = [
    { color: 'red', label: 'Pending Issues', icon: '⏳' },
    { color: 'orange', label: 'In Progress', icon: '🔄' },
    { color: 'green', label: 'Resolved', icon: '✅' }
  ];

  const landmarkLegendItems = [
    { icon: '🛕', label: 'Temple' },
    { icon: '🏫', label: 'School' },
    { icon: '🏥', label: 'Hospital' },
    { icon: '🛒', label: 'Market' },
    { icon: '🌳', label: 'Park' },
    { icon: '🏛️', label: 'Office' }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Map Legend</h3>
      
      {/* Issues Legend */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Issue Status</h4>
        <div className="space-y-2">
          {issueLegendItems.map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div 
                className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: item.color }}
              ></div>
              <div className="flex items-center gap-2">
                <span>{item.icon}</span>
                <span className="text-sm text-gray-600">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Landmarks Legend */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Village Landmarks</h4>
        <div className="space-y-2">
          {landmarkLegendItems.map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-[8px] text-white">
                {item.icon}
              </div>
              <span className="text-sm text-gray-600">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Tips */}
      <div className="mt-6 p-3 bg-blue-50 rounded-md border border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Map Tips</h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Click on markers to see details</li>
          <li>• Use filters to focus on specific issues</li>
          <li>• Switch views to see different map layers</li>
          <li>• Zoom in/out to explore different areas</li>
        </ul>
      </div>
    </div>
  );
};

export default MapLegend;
