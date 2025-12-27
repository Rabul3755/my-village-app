import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import IssueForm from '../components/issues/IssuesForm';
import IssueList from '../components/issues/IssueList';
import IssueFilters from '../components/issues/IssueFilters';

const Issues = () => {
 const { village = {}, issues = [],addIssue } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    sortBy: 'newest'
  });

  const handleSubmitIssue = async (issueData) => {
    try {
      await addIssue(issueData); 
      setShowForm(false);
      alert('Issue reported successfully!');
    } catch (err) {
      console.error('Error submitting issue:', err);
      alert('Failed to submit issue');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Community Issues</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Report problems in our village and track their resolution progress. Together we can make our community better.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {issues.length} Issues Reported
              </h2>
              <p className="text-gray-600 text-sm">
                {issues.filter(i => i.status === 'resolved').length} resolved · 
                {issues.filter(i => i.status === 'in-progress').length} in progress
              </p>
            </div>
            
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Report New Issue
            </button>
          </div>
        </div>

        {showForm && (
          <div className="mb-8">
            <IssueForm onSubmit={handleSubmitIssue} onCancel={() => setShowForm(false)} />
          </div>
        )}

  
        <div className="mb-6">
          <IssueFilters filters={filters} onFiltersChange={setFilters} />
        </div>


        <IssueList filters={filters} />

      </div>
    </div>
  );
};

export default Issues;