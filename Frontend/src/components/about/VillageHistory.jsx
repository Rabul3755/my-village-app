import React from 'react';

const VillageHistory = () => {
  const timelineEvents = [
    {
      year: '1850',
      title: 'Village Foundation',
      description: 'Green Valley Village was established by settlers from neighboring regions, primarily engaged in agriculture and handicrafts.',
      icon: '🏡'
    },
    {
      year: '1920',
      title: 'First School Established',
      description: 'The village primary school was built, marking the beginning of formal education in the community.',
      icon: '🏫'
    },
    {
      year: '1950',
      title: 'Post-Independence Development',
      description: 'Significant infrastructure development including road connectivity and electricity supply.',
      icon: '⚡'
    },
    {
      year: '1980',
      title: 'Agricultural Revolution',
      description: 'Introduction of modern farming techniques and irrigation systems boosted agricultural productivity.',
      icon: '🚜'
    },
    {
      year: '2005',
      title: 'Digital Connectivity',
      description: 'Internet services reached the village, opening new opportunities for education and business.',
      icon: '💻'
    },
    {
      year: '2020',
      title: 'Smart Village Initiative',
      description: 'Implementation of digital governance and smart solutions for community development.',
      icon: '🌟'
    }
  ];

  const culturalHeritage = [
    {
      title: 'Traditional Festivals',
      description: 'Celebrating ancient festivals that have been passed down through generations, showcasing our rich cultural heritage.',
      items: ['Harvest Festival', 'Spring Celebration', 'Ancestors Day']
    },
    {
      title: 'Local Crafts',
      description: 'Traditional handicrafts including pottery, weaving, and woodwork that represent our artistic legacy.',
      items: ['Handwoven Textiles', 'Terracotta Pottery', 'Wood Carving']
    },
    {
      title: 'Folk Arts',
      description: 'Preserving traditional music, dance, and theater forms that tell stories of our ancestors.',
      items: ['Folk Dances', 'Traditional Music', 'Storytelling']
    }
  ];

  return (
    <div className="space-y-12">
            <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Our Journey Through Time</h2>
        <div className="relative">
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-blue-200"></div>
          
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content */}
                <div className={`ml-20 md:ml-0 md:w-5/12 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">{event.icon}</div>
                      <div>
                        <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
                          {event.year}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mt-2">{event.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
                
                {/* Spacer for alternate sides */}
                <div className="hidden md:block md:w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Cultural Heritage</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {culturalHeritage.map((heritage, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{heritage.title}</h3>
              <p className="text-gray-600 mb-4">{heritage.description}</p>
              <ul className="space-y-2">
                {heritage.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Historical Significance */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Historical Significance</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Preserving Our Legacy</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Green Valley Village has been a center of agricultural innovation and cultural preservation 
                for over 170 years. Our community has maintained a perfect balance between embracing modern 
                development and preserving traditional values.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">One of the first villages in the region to achieve 100% literacy</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Recipient of "Best Maintained Village" award 2015-2020</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Pioneer in organic farming practices in the district</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">🏆</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">Award Winning Community</h4>
                <p className="text-gray-600">
                  Recognized for excellence in community development and cultural preservation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VillageHistory;