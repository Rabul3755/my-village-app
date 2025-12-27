import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import VillageStats from '../components/about/VillageStats';
import VillageHistory from '../components/about/VillageHistory';
import VillageFacilities from '../components/about/VillageFacilities';
import VillageGallery from '../components/about/VillageGallery';
import VillageContact from '../components/about/VillageContact';
import PoliticalRepresentatives from '../components/about/PoliticalRepresentatives'; // Add this import

const About = () => {
  const { village } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '🏡' },
    { id: 'history', name: 'History', icon: '📜' },
    { id: 'facilities', name: 'Facilities', icon: '🏥' },
    { id: 'representatives', name: 'Political Representatives', icon: '🏛️' }, // Add this tab
    { id: 'gallery', name: 'Gallery', icon: '🖼️' },
    { id: 'contact', name: 'Contact', icon: '📞' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <VillageStats />;
      case 'history':
        return <VillageHistory />;
      case 'facilities':
        return <VillageFacilities />;
      case 'representatives': // Add this case
        return <PoliticalRepresentatives />;
      case 'gallery':
        return <VillageGallery />;
      case 'contact':
        return <VillageContact />;
      default:
        return <VillageStats />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">{village.name}</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              {village.description}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-blue-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{village.district}, {village.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Population: {village.population}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
                <span>Area: {village.area}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default About;