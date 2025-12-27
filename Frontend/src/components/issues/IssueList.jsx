import React from 'react';
import { useApp } from '../../context/AppContext';
import IssueCard from './IssueCard';

const IssueList = ({ filters }) => {
  const { issues=[] } = useApp();

 
  const filteredIssues = issues.filter(issue => {
    if (filters.status !== 'all' && issue.status !== filters.status) return false;
    if (filters.category !== 'all' && issue.category !== filters.category) return false;
    return true;
  });

 
  const sortedIssues = [...filteredIssues].sort((a, b) => {
    switch (filters.sortBy) {
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'most-voted':
        return (b.votes || 0) - (a.votes || 0);
      case 'recently-updated':
        return new Date(b.date) - new Date(a.date);
      case 'newest':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  if (sortedIssues.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No issues found</h3>
        <p className="text-gray-500 mb-4">
          {filters.status !== 'all' || filters.category !== 'all' 
            ? "Try adjusting your filters to see more results."
            : "Be the first to report an issue in our community!"
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 mb-4">
        Showing {sortedIssues.length} of {issues.length} issues
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {sortedIssues.map(issue => (
          <IssueCard key={issue._id} issue={issue} />
        ))}
      </div>
    </div>
  );
};

export default IssueList;