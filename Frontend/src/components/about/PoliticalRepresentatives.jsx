import React, { useState } from 'react';
import { politicalRepresentatives } from '../../data/mockdata.js';

const PoliticalRepresentatives = () => {
  const [selectedRep, setSelectedRep] = useState(null);
  const [activeLevel, setActiveLevel] = useState('all');

  const levels = [
    { id: 'all', name: 'All Levels', icon: '🏛️' },
    { id: 'mp', name: 'MP (National)', icon: '🇮🇳' },
    { id: 'mla', name: 'MLA (State)', icon: '🏛️' },
    { id: 'zilla', name: 'Zilla Parishad', icon: '🏢' },
    { id: 'sarpanch', name: 'Sarpanch (Village)', icon: '👑' }
  ];

  const filteredRepresentatives = activeLevel === 'all' 
    ? politicalRepresentatives 
    : politicalRepresentatives.filter(rep => {
        if (activeLevel === 'mp') return rep.position.includes('MP');
        if (activeLevel === 'mla') return rep.position.includes('MLA');
        if (activeLevel === 'zilla') return rep.position.includes('Zilla');
        if (activeLevel === 'sarpanch') return rep.position.includes('Sarpanch');
        return true;
      });

  const getPositionIcon = (position) => {
    if (position.includes('MP')) return '🇮🇳';
    if (position.includes('MLA')) return '🏛️';
    if (position.includes('Zilla')) return '🏢';
    if (position.includes('Sarpanch')) return '👑';
    return '👤';
  };

  const openModal = (rep) => {
    setSelectedRep(rep);
  };

  const closeModal = () => {
    setSelectedRep(null);
  };

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Political Representatives</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Meet your elected representatives at various levels of governance - from our village to the national parliament.
        </p>
      </div>

      {/* Level Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {levels.map(level => (
          <button
            key={level.id}
            onClick={() => setActiveLevel(level.id)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all ${
              activeLevel === level.id
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <span className="text-xl">{level.icon}</span>
            {level.name}
          </button>
        ))}
      </div>

      {/* Representatives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRepresentatives.map(rep => (
          <div 
            key={rep.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => openModal(rep)}
          >
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border-2 border-white border-opacity-30 overflow-hidden">
                  <img 
                    src={rep.photo} 
                    alt={rep.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="hidden w-full h-full items-center justify-center text-white text-lg font-bold"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)' }}
                  >
                    {rep.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{rep.name}</h3>
                  <p className="text-blue-100">{rep.position}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Party and Constituency */}
              <div className="space-y-3 mb-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${rep.partyColor}`}>
                  {rep.party}
                </span>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  {rep.constituency}
                </div>
              </div>

              {/* Quick Bio */}
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {rep.bio}
              </p>

              {/* Key Achievements Preview */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Achievements:</h4>
                <ul className="space-y-1">
                  {rep.achievements.slice(0, 2).map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                      <span className="text-green-500 mt-1">✓</span>
                      <span className="line-clamp-2">{achievement}</span>
                    </li>
                  ))}
                </ul>
                {rep.achievements.length > 2 && (
                  <p className="text-xs text-blue-600 mt-1">
                    +{rep.achievements.length - 2} more achievements
                  </p>
                )}
              </div>

              {/* Contact Preview */}
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{rep.contact.phone}</span>
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                View Full Profile
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRepresentatives.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No representatives found</h3>
          <p className="text-gray-500">Try selecting a different level to see more representatives.</p>
        </div>
      )}

      {/* Governance Structure Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Understanding Governance Structure</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              level: 'National (MP)',
              role: 'Represents constituency in Parliament',
              responsibilities: ['Law Making', 'National Policy', 'MPLADS Funds'],
              icon: '🇮🇳'
            },
            {
              level: 'State (MLA)',
              role: 'Represents constituency in State Assembly',
              responsibilities: ['State Laws', 'Local Development', 'Public Grievances'],
              icon: '🏛️'
            },
            {
              level: 'District (Zilla)',
              role: 'District-level planning and development',
              responsibilities: ['District Projects', 'Scheme Implementation', 'Coordination'],
              icon: '🏢'
            },
            {
              level: 'Village (Sarpanch)',
              role: 'Head of village local governance',
              responsibilities: ['Village Development', 'Local Issues', 'Panchayat Meetings'],
              icon: '👑'
            }
          ].map((gov, index) => (
            <div key={index} className="text-center p-4">
              <div className="text-4xl mb-4">{gov.icon}</div>
              <h4 className="font-semibold text-gray-800 mb-2">{gov.level}</h4>
              <p className="text-sm text-gray-600 mb-3">{gov.role}</p>
              <ul className="space-y-1 text-xs text-gray-500">
                {gov.responsibilities.map((resp, idx) => (
                  <li key={idx}>• {resp}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Representative Detail Modal */}
      {selectedRep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  
                  {/* Photo */}
                  <div className="relative">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border-2 border-white border-opacity-30 overflow-hidden">
                      <img 
                        src={selectedRep.photo} 
                        alt={selectedRep.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getPositionIcon(selectedRep.position)}</span>
                      <h1 className="text-3xl font-bold">{selectedRep.name}</h1>
                    </div>
                    <p className="text-xl text-blue-100 mb-2">{selectedRep.position}</p>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedRep.partyColor}`}>
                        {selectedRep.party}
                      </span>
                      <span className="text-blue-100">•</span>
                      <span className="text-blue-100 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        </svg>
                        {selectedRep.constituency}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content */}
                <div className="lg:col-span-2">
                  
                  {/* Biography */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">About</h2>
                    <p className="text-gray-600 leading-relaxed">{selectedRep.bio}</p>
                  </section>

                  {/* Key Responsibilities */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Responsibilities</h2>
                    <div className="bg-gray-50 rounded-lg p-6">
                      <ul className="space-y-3 text-gray-600">
                        {selectedRep.responsibilities.map((responsibility, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{responsibility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Major Achievements */}
                  <section className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Major Achievements</h2>
                    <div className="space-y-4">
                      {selectedRep.achievements.map((achievement, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4 py-1">
                          <p className="text-gray-600">{achievement}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Current Initiatives */}
                  <section>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Current Initiatives</h2>
                    <div className="space-y-4">
                      {selectedRep.currentInitiatives.map((initiative, index) => (
                        <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                          <h3 className="font-semibold text-gray-800">{initiative}</h3>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  
                  {/* Contact Information */}
                  <section className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      
                      {/* Phone */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Phone</p>
                          <p className="font-medium text-gray-800">{selectedRep.contact.phone}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-medium text-gray-800 truncate">{selectedRep.contact.email}</p>
                        </div>
                      </div>

                      {/* Office */}
                      <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Office</p>
                          <p className="font-medium text-gray-800 text-sm">{selectedRep.contact.office}</p>
                        </div>
                      </div>

                      {/* Website */}
                      {selectedRep.contact.website && (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Website</p>
                            <a href={`https://${selectedRep.contact.website}`} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:text-blue-800">
                              {selectedRep.contact.website}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Public Meeting Hours */}
                  <section className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Public Meeting Hours</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium text-gray-800">10:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium text-gray-800">10:00 AM - 12:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-red-600">Holiday</span>
                      </div>
                    </div>
                  </section>

                  {/* Quick Actions */}
                  <section className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                        📋 Schedule Meeting
                      </button>
                      <button className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
                        📝 Send Message
                      </button>
                      <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
                        👥 Follow Updates
                      </button>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PoliticalRepresentatives;