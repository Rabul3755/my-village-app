import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import ImageGallery from '../common/ImageGallery';
import ImageUpload from '../common/ImageUpload';

const IssueCard = ({ issue }) => {
  const { updateIssueStatus } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'pending': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved': return '✅';
      case 'in-progress': return '🔄';
      case 'pending': return '⏳';
      default: return '📋';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Roads & Infrastructure': '🛣️',
      'Drainage & Sanitation': '🚰',
      'Water Supply': '💧',
      'Electricity': '💡',
      'Waste Management': '🗑️',
      'Healthcare': '🏥',
      'Education': '📚',
      'Public Safety': '🚨',
      'Parks & Recreation': '🌳',
      'Other': '❓'
    };
    return icons[category] || '📋';
  };

  const handleStatusChange = (newStatus) => {
    if (window.confirm(`Change status to "${newStatus}"?`)) {
      updateIssueStatus(issue._id, newStatus);
    }
  };

  const handleAddResolutionPhotos = () => {
    setShowImageUpload(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{getCategoryIcon(issue.category)}</span>
              <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">
                {issue.title}
              </h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {issue.location}
              </span>
              <span>•</span>
              <span>{new Date(issue.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
              {issue.reporter && issue.reporter !== 'Anonymous' && (
                <>
                  <span>•</span>
                  <span>Reported by {issue.reporter?.name}</span>
                </>
              )}
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex sm:flex-col items-center sm:items-end gap-2">
            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(issue.status)}`}>
              <span>{getStatusIcon(issue.status)}</span>
              {issue.status.replace('-', ' ')}
            </span>
            
            {/* Admin Status Controls */}
            <div className="flex gap-1 text-xs">
              <button 
                onClick={() => handleStatusChange('pending')}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Mark as Pending"
              >
                ⏳
              </button>
              <button 
                onClick={() => handleStatusChange('in-progress')}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Mark as In Progress"
              >
                🔄
              </button>
              <button 
                onClick={() => handleStatusChange('resolved')}
                className="px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                title="Mark as Resolved"
              >
                ✅
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <p className={`text-gray-600 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {issue.description}
          </p>
          {issue.description.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-1"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Issue Photos */}
        {issue.issueImages && issue.issueImages.length > 0 && (
          <div className="mb-4">
            <ImageGallery 
              images={issue.issueImages}
              title="Issue Photos"
              emptyMessage="No photos of the issue"
            />
          </div>
        )}

        {/* Resolution Photos */}
        {issue.resolutionImages && issue.resolutionImages.length > 0 && (
          <div className="mb-4">
            <ImageGallery 
              images={issue.resolutionImages}
              title="Resolution Photos"
              emptyMessage="No resolution photos yet"
            />
          </div>
        )}

        {/* Updates & Footer */}
        {issue.updates && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <div className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <div>
                <p className="text-sm font-medium text-blue-800 mb-1">Latest Update</p>
                <p className="text-sm text-blue-700">{issue.updates?.name}</p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
              </svg>
              Support ({issue.votes || 0})
            </button>
            
            <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Comment
            </button>

            {/* Add Resolution Photos Button */}
            {issue.status !== 'resolved' && (
              <button 
                onClick={handleAddResolutionPhotos}
                className="flex items-center gap-1 hover:text-green-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Add Resolution Photos
              </button>
            )}
          </div>

          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Share Issue
          </button>
        </div>

        {/* Resolution Photo Upload Form */}
        {showImageUpload && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-semibold text-gray-800">Add Resolution Photos</h4>
              <button 
                onClick={() => setShowImageUpload(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <ImageUpload
              onImagesChange={(images) => {
                // Handle resolution image upload
                console.log('Resolution images to upload:', images);
              }}
              maxImages={5}
              uploadType="resolution"
            />
            
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Upload Resolution Photos
              </button>
              <button 
                onClick={() => setShowImageUpload(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IssueCard;