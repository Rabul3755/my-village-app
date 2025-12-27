import React from 'react';

const VillageFacilities = () => {
  const facilities = [
    {
      category: 'Education',
      icon: '🎓',
      facilities: [
        {
          name: 'Green Valley Primary School',
          type: 'Government School',
          students: '250',
          grades: '1-5',
          features: ['Digital Classroom', 'Playground', 'Library']
        },
        {
          name: 'Village High School',
          type: 'Government School',
          students: '400',
          grades: '6-10',
          features: ['Science Lab', 'Computer Lab', 'Sports Ground']
        },
        {
          name: 'Senior Secondary School',
          type: 'Government School',
          students: '300',
          grades: '11-12',
          features: ['Science Stream', 'Commerce Stream', 'Vocational Courses']
        }
      ]
    },
    {
      category: 'Healthcare',
      icon: '🏥',
      facilities: [
        {
          name: 'Primary Health Center',
          type: 'Government Hospital',
          beds: '10',
          staff: '15',
          features: ['24/7 Emergency', 'Maternity Ward', 'Pharmacy']
        },
        {
          name: 'Community Health Clinic',
          type: 'Sub Center',
          beds: '2',
          staff: '5',
          features: ['Weekly Checkups', 'Vaccination', 'First Aid']
        }
      ]
    },
    {
      category: 'Public Services',
      icon: '🏛️',
      facilities: [
        {
          name: 'Gram Panchayat Office',
          type: 'Administration',
          features: ['Public Grievance', 'Document Services', 'Development Projects']
        },
        {
          name: 'Post Office',
          type: 'Postal Services',
          features: ['Banking Services', 'Postal Delivery', 'Government Schemes']
        },
        {
          name: 'Police Outpost',
          type: 'Security',
          features: ['24/7 Service', 'Community Policing', 'Emergency Response']
        }
      ]
    },
    {
      category: 'Utilities',
      icon: '⚡',
      facilities: [
        {
          name: 'Electricity Substation',
          type: 'Power Supply',
          features: ['24/7 Power', 'Quick Response', 'Maintenance Team']
        },
        {
          name: 'Water Treatment Plant',
          type: 'Water Supply',
          features: ['Clean Water', 'Regular Testing', 'Pipeline Network']
        },
        {
          name: 'Solid Waste Management',
          type: 'Sanitation',
          features: ['Daily Collection', 'Recycling', 'Composting']
        }
      ]
    }
  ];

  const upcomingProjects = [
    {
      name: 'Community Library',
      description: 'Modern library with digital learning resources',
      status: 'Planning',
      expected: 'Dec 2024'
    },
    {
      name: 'Sports Complex',
      description: 'Multi-sport facility with indoor and outdoor areas',
      status: 'Approved',
      expected: 'Jun 2024'
    },
    {
      name: 'Digital Hub',
      description: 'Center for digital skills and entrepreneurship',
      status: 'Under Construction',
      expected: 'Mar 2024'
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* Facilities by Category */}
      {facilities.map((category, categoryIndex) => (
        <section key={categoryIndex}>
          <div className="flex items-center gap-4 mb-8">
            <div className="text-4xl">{category.icon}</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{category.category} Facilities</h2>
              <p className="text-gray-600 mt-2">Essential services available to our community</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.facilities.map((facility, facilityIndex) => (
              <div key={facilityIndex} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{facility.name}</h3>
                <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                  {facility.type}
                </div>
                
                {/* Stats */}
                {(facility.students || facility.beds || facility.staff) && (
                  <div className="flex gap-4 mb-4 text-sm text-gray-600">
                    {facility.students && (
                      <div>
                        <div className="font-semibold text-gray-800">{facility.students}</div>
                        <div>Students</div>
                      </div>
                    )}
                    {facility.beds && (
                      <div>
                        <div className="font-semibold text-gray-800">{facility.beds}</div>
                        <div>Beds</div>
                      </div>
                    )}
                    {facility.staff && (
                      <div>
                        <div className="font-semibold text-gray-800">{facility.staff}</div>
                        <div>Staff</div>
                      </div>
                    )}
                    {facility.grades && (
                      <div>
                        <div className="font-semibold text-gray-800">{facility.grades}</div>
                        <div>Grades</div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {facility.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-green-500">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Upcoming Projects */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Upcoming Development Projects</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {upcomingProjects.map((project, index) => (
              <div key={index} className={`p-6 ${
                index < upcomingProjects.length - 1 ? 'border-r border-gray-200' : ''
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${
                    project.status === 'Under Construction' ? 'bg-green-500' :
                    project.status === 'Approved' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <span className={`text-sm font-medium ${
                    project.status === 'Under Construction' ? 'text-green-600' :
                    project.status === 'Approved' ? 'text-yellow-600' :
                    'text-blue-600'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Expected Completion:</span>
                  <span className="font-semibold text-gray-800">{project.expected}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Map */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Infrastructure Map</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl mb-2">🛣️</div>
              <div className="font-semibold text-gray-800">25 km</div>
              <div className="text-sm text-gray-600">Road Network</div>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💡</div>
              <div className="font-semibold text-gray-800">100%</div>
              <div className="text-sm text-gray-600">Electricity Coverage</div>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">💧</div>
              <div className="font-semibold text-gray-800">98%</div>
              <div className="text-sm text-gray-600">Water Supply</div>
            </div>
            <div className="p-4">
              <div className="text-3xl mb-2">📶</div>
              <div className="font-semibold text-gray-800">95%</div>
              <div className="text-sm text-gray-600">Internet Coverage</div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌱</span>
              <div>
                <h4 className="font-semibold text-green-800 mb-1">Sustainable Development</h4>
                <p className="text-green-700 text-sm">
                  Our infrastructure development focuses on sustainability with solar power initiatives, 
                  rainwater harvesting, and eco-friendly construction practices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VillageFacilities;