import React from 'react';
import { useApp } from '../../context/AppContext';

const VillageStats = () => {
 const { village = {}, issues = [], leaders = [] } = useApp();


  const stats = [
    {
      icon: '👥',
      label: 'Total Population',
      value: village.population,
      description: 'Residents living in our village'
    },
    {
      icon: '📊',
      label: 'Area Coverage',
      value: village.area,
      description: 'Total geographical area'
    },
    {
      icon: '🏛️',
      label: 'Local Leaders',
      value: leaders?.length,
      description: 'Active representatives'
    },
    {
      icon: '📝',
      label: 'Active Issues',
      value: issues.filter(i => i.status !== 'resolved')?.length,
      description: 'Currently being addressed'
    },
    {
      icon: '✅',
      label: 'Resolved Issues',
      value: issues.filter(i => i.status === 'resolved').length,
      description: 'Successfully completed'
    },
    {
      icon: '📅',
      label: 'Established',
      value: village.established,
      description: 'Year of establishment'
    }
  ];

  const highlights = [
    {
      icon: '🌾',
      title: 'Agricultural Heritage',
      description: 'Known for organic farming and traditional agricultural practices'
    },
    {
      icon: '🏫',
      title: 'Quality Education',
      description: 'More than 10 schools and colleges providing education up to gradution standard'
    },
    {
      icon: '🏥',
      title: 'Healthcare Access',
      description: 'Primary health center with 24/7 emergency services'
    },
    {
      icon: '💻',
      title: 'Digital Progress',
      description: 'High-speed internet and digital literacy programs'
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* Quick Stats */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Village at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Village Highlights */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">What Makes Us Special</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{highlight.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{highlight.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Geographical Information */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Geographical Information</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Location & Climate</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>District</span>
                  <span className="font-semibold text-gray-800">{village.district}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>State</span>
                  <span className="font-semibold text-gray-800">{village.state}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Climate</span>
                  <span className="font-semibold text-gray-800">Temperate</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span>Rainfall</span>
                  <span className="font-semibold text-gray-800">800-1000 mm/year</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Soil Type</span>
                  <span className="font-semibold text-gray-800">Alluvial</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Demographics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Literacy Rate</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Employment Rate</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Digital Literacy</span>
                    <span>65%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">🌱 Growth Indicators</h4>
                <p className="text-blue-700 text-sm">
                  Our village shows consistent growth in education, employment, and digital adoption over the past 5 years.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VillageStats;