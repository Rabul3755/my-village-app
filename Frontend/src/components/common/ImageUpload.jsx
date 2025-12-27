import React, { useRef, useState } from 'react';

const ImageUpload = ({ 
  onImagesChange, 
  maxImages = 5, 
  existingImages = [],
  allowDelete = true,
  uploadType = 'issue' // 'issue' or 'resolution'
}) => {
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (files) => {
    const imageFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/')
    );

    if (imageFiles.length + selectedImages.length + existingImages.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    const newImages = imageFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random()
    }));

    setSelectedImages(prev => [...prev, ...newImages]);
    onImagesChange([...selectedImages, ...newImages]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const removeImage = (imageId) => {
    setSelectedImages(prev => {
      const newImages = prev.filter(img => img.id !== imageId);
      onImagesChange(newImages);
      return newImages;
    });
  };

  const removeExistingImage = (imageIndex) => {
    if (onImagesChange && typeof onImagesChange === 'function') {
      // This would trigger a callback to parent to handle existing image deletion
      onImagesChange('delete', imageIndex);
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing Images */}
      {existingImages.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            {uploadType === 'resolution' ? 'Resolution Photos' : 'Current Photos'}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image.url}
                  alt={image.caption || `Image ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                {allowDelete && (
                  <button
                    onClick={() => removeExistingImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                {image.caption && (
                  <p className="text-xs text-gray-600 mt-1 truncate">{image.caption}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        
        <div className="space-y-3">
          <div className="text-gray-400 mx-auto">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700">
              {isDragging ? 'Drop images here' : 'Upload Photos'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Drag & drop images or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Maximum {maxImages} images • PNG, JPG, JPEG
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Select Images
          </button>
        </div>
      </div>

      {/* Selected Images Preview */}
      {selectedImages.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-700 mb-2">
            New Photos to Upload ({selectedImages.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.preview}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  onClick={() => removeImage(image.id)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {image.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Remaining Uploads Counter */}
      <div className="text-sm text-gray-500 text-center">
        {existingImages.length + selectedImages.length} of {maxImages} images selected
      </div>
    </div>
  );
};

export default ImageUpload;