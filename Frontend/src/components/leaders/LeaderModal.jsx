import React from 'react';

const LeaderModal = ({ leader, onClose }) => {
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
      'Independent': 'bg-gray-100 text-gray-800',
      'Village Development Party': 'bg-green-100 text-green-800',
      'People\'s Alliance': 'bg-blue-100 text-blue-800',
      'United Front': 'bg-orange-100 text-orange-800',
      'default': 'bg-purple-100 text-purple-800'
    };
    return colors[party] || colors.default;
  };

  const handleContactClick = (type, value) => {
    switch (type) {
      case 'phone':
        window.open(`tel:${value}`);
        break;
      case 'email':
        window.open(`mailto:${value}`);
        break;
      case 'office':
        // Could open in maps or copy to clipboard
        navigator.clipboard.writeText(value);
        alert('Office address copied to clipboard!');
        break;
      default:
        break;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header with Background */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors z-10"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              
              {/* Leader Photo */}
              <div className="relative">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full backdrop-blur-sm border-2 border-white border-opacity-30 overflow-hidden">
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
                    className="hidden w-full h-full items-center justify-center text-white text-2xl font-bold"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 100%)' }}
                  >
                    {leader.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>

              {/* Leader Basic Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{getPositionIcon(leader.position)}</span>
                  <h1 className="text-3xl font-bold">{leader.name}</h1>
                </div>
                <p className="text-xl text-blue-100 mb-2">{leader.position}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPartyColor(leader.party)}`}>
                    {leader.party}
                  </span>
                  <span className="text-blue-100">•</span>
                  <span className="text-blue-100 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    {leader.area}
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
                <div className="prose prose-blue max-w-none">
                  <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
                </div>
              </section>

              {/* Key Responsibilities */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Key Responsibilities</h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <ul className="space-y-3 text-gray-600">
                    {leader.responsibilities?.map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{responsibility}</span>
                      </li>
                    )) || [
                      "Representing constituency in local governance",
                      "Addressing public grievances and issues",
                      "Overseeing development projects in the area",
                      "Participating in council/panchayat meetings",
                      "Budget allocation and planning for local development"
                    ].map((responsibility, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1">✓</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Recent Initiatives */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Initiatives</h2>
                <div className="space-y-4">
                  {leader.initiatives?.map((initiative, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-1">
                      <h3 className="font-semibold text-gray-800">{initiative.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{initiative.description}</p>
                      <span className="inline-block mt-2 text-xs text-blue-600 font-medium">
                        {initiative.status}
                      </span>
                    </div>
                  )) || (
                    <div className="text-gray-500 text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                      <p>Initiatives information will be updated soon.</p>
                    </div>
                  )}
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
                  <div 
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => handleContactClick('phone', leader.contact.phone)}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-800">{leader.contact.phone}</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div 
                    className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                    onClick={() => handleContactClick('email', leader.contact.email)}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-800 truncate">{leader.contact.email}</p>
                    </div>
                  </div>

                  {/* Office */}
                  {leader.contact.office && (
                    <div 
                      className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 cursor-pointer hover:border-blue-300 transition-colors"
                      onClick={() => handleContactClick('office', leader.contact.office)}
                    >
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Office</p>
                        <p className="font-medium text-gray-800 text-sm">{leader.contact.office}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Office Hours */}
              <section className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Office Hours</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium text-gray-800">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium text-gray-800">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-medium text-red-600">Closed</span>
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
  );
};

export default LeaderModal;