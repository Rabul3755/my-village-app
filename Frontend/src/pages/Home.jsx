import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const Home = () => {
 const { village = {}, issues = [] } = useApp();


  const stats = {
    total: issues.length,
    resolved: issues.filter(issue => issue.status === 'resolved').length,
    inProgress: issues.filter(issue => issue.status === 'in-progress').length,
  };

  return (
    <div className="min-h-screen">
      
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Welcome to {village.name}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A community platform where voices matter. Report issues, track progress, and connect with local leaders to make our village better.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/issues" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 font-medium text-lg transition-colors"
            >
              Report an Issue
            </Link>
            <Link 
              to="/map" 
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 font-medium text-lg transition-colors"
            >
              Explore Village Map
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Community at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-blue-500">
              <div className="text-4xl font-bold text-blue-600 mb-2">{stats.total}</div>
              <div className="text-gray-600 text-lg">Total Issues Reported</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-green-500">
              <div className="text-4xl font-bold text-green-600 mb-2">{stats.resolved}</div>
              <div className="text-gray-600 text-lg">Issues Resolved</div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center border-t-4 border-yellow-500">
              <div className="text-4xl font-bold text-yellow-600 mb-2">{stats.inProgress}</div>
              <div className="text-gray-600 text-lg">In Progress</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Recent Issues</h2>
            <Link to="/issues" className="text-blue-600 hover:text-blue-700 font-medium">
              View All Issues →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {issues.slice(0, 3).map(issue => (
              <div key={issue._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-800">{issue.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    issue.status === 'resolved' ? 'bg-green-100 text-green-800' :
                    issue.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {issue.status.replace('-', ' ')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{issue.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>📍 {issue.location}</span>
                  <span>{issue.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;