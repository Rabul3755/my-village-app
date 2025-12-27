import React from 'react';

const LeaderCard = ({ leader, onClick }) => {
  const getPositionIcon = (position) => {
    const icons = {
      'Ward Councillor': '🏛️',
      'Sarpanch': '👑',
      'MLA': '📜',
      'MP': '🇮🇳',
      'Mayor': '🏙️',
      'Deputy Mayor': '🏢',
      'default': '👤'
    };
    return icons[position] || icons.default;
  };

  const getPartyColor = (party) => {
    const colors = {
      'Independent': 'bg-gray-100 text-gray-800 border-gray-300',
      'Village Development Party': 'bg-green-100 text-green-800 border-green-300',
      'People\'s Alliance': 'bg-blue-100 text-blue-800 border-blue-300',
      'United Front': 'bg-orange-100 text-orange-800 border-orange-300',
      'default': 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return colors[party] || colors.default;
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      {/* Leader Photo */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
        <img 
          src={leader.photo} 
          alt={leader.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="hidden w-full h-full items-center justify-center text-white text-6xl"
          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
        >
          {leader.name.split(' ').map(n => n[0]).join('')}
        </div>
        
        {/* Position Badge */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2">
          <span className="text-sm">{getPositionIcon(leader.position)}</span>
          <span className="text-xs font-medium text-gray-700">{leader.position}</span>
        </div>
      </div>

      {/* Leader Info */}
      <div className="p-6">
        {/* Name and Party */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{leader.name}</h3>
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPartyColor(leader.party)}`}>
            {leader.party}
          </span>
        </div>

        {/* Area/Constituency */}
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm">{leader.area}</span>
        </div>

        {/* Contact Info (minimal) */}
        <div className="space-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span className="truncate">{leader.contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="truncate">{leader.contact.email}</span>
          </div>
        </div>

        {/* Quick Bio Preview */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {leader.bio}
        </p>

        {/* Action Button */}
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default LeaderCard;