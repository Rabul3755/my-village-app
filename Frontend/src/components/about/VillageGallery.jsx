import React, { useState } from 'react';

const VillageGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop',
      title: 'Village Entrance',
      description: 'The main entrance to our beautiful village with traditional architecture',
      category: 'landmarks'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      title: 'Community Temple',
      description: 'Ancient temple at the heart of our village, built over 200 years ago',
      category: 'religious'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=500&h=300&fit=crop',
      title: 'Village Market',
      description: 'Bustling local market every Sunday where farmers sell fresh produce',
      category: 'commercial'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1583339522870-0d4f6d6efb5c?w=500&h=300&fit=crop',
      title: 'Primary School',
      description: 'Our children learning and growing together in modern facilities',
      category: 'education'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      title: 'Agricultural Fields',
      description: 'Green fields that feed our community and surrounding areas',
      category: 'agriculture'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=300&fit=crop',
      title: 'Festival Celebration',
      description: 'Community coming together for traditional festivals and celebrations',
      category: 'cultural'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=500&h=300&fit=crop',
      title: 'Sports Ground',
      description: 'Where our youth showcase their talent and stay active',
      category: 'sports'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1494522358652-cb2c487f3df4?w=500&h=300&fit=crop',
      title: 'Health Center',
      description: 'Modern healthcare facility serving our community',
      category: 'healthcare'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop',
      title: 'Natural Landscape',
      description: 'Beautiful natural surroundings that make our village special',
      category: 'nature'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Photos', count: galleryImages.length },
    { id: 'landmarks', name: 'Landmarks', count: galleryImages.filter(img => img.category === 'landmarks').length },
    { id: 'religious', name: 'Religious', count: galleryImages.filter(img => img.category === 'religious').length },
    { id: 'cultural', name: 'Cultural', count: galleryImages.filter(img => img.category === 'cultural').length },
    { id: 'education', name: 'Education', count: galleryImages.filter(img => img.category === 'education').length },
    { id: 'agriculture', name: 'Agriculture', count: galleryImages.filter(img => img.category === 'agriculture').length }
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  const openImageModal = (image) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredImages.length;
    } else {
      newIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div className="space-y-8">
      
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 justify-center">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {category.name} 
            <span className={`ml-2 text-sm px-2 py-1 rounded-full ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map(image => (
          <div 
            key={image.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => openImageModal(image)}
          >
            <div className="relative aspect-w-16 aspect-h-9">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 hover:opacity-100 transform translate-y-4 hover:translate-y-0 transition-all duration-300 text-white text-center">
                  <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  <span className="text-sm font-medium">View Details</span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-gray-800 mb-1">{image.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{image.description}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {categories.find(cat => cat.id === image.category)?.name}
                </span>
                <span className="text-gray-400 text-xs">Click to enlarge</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No images found</h3>
          <p className="text-gray-500">Try selecting a different category to see more photos.</p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
          <div className="relative max-w-6xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={() => navigateImage('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={() => navigateImage('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 bg-black bg-opacity-50 rounded-full p-3"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Image */}
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="max-w-full max-h-[70vh] object-contain"
              />
              
              {/* Image Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedImage.title}</h3>
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>Category: {categories.find(cat => cat.id === selectedImage.category)?.name}</span>
                  <span>Image {filteredImages.findIndex(img => img.id === selectedImage.id) + 1} of {filteredImages.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{galleryImages.length}</div>
            <div className="text-sm text-gray-600">Total Photos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">2024</div>
            <div className="text-sm text-gray-600">Latest Update</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">50+</div>
            <div className="text-sm text-gray-600">Community Contributors</div>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
          <h4 className="font-semibold text-blue-800 mb-2">📸 Share Your Photos!</h4>
          <p className="text-blue-700 text-sm">
            Are you a resident with beautiful photos of our village? 
            <button className="ml-2 text-blue-600 hover:text-blue-800 font-medium underline">
              Contribute to our gallery
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VillageGallery;