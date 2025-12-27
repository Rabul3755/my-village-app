import mongoose from "mongoose"

const IssueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Roads & Infrastructure',
      'Drainage & Sanitation',
      'Water Supply',
      'Electricity',
      'Waste Management',
      'Healthcare',
      'Education',
      'Public Safety',
      'Parks & Recreation',
      'Other'
    ]
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'resolved'],
    default: 'pending'
  },
  coordinates: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  reporter: {
    name: { type: String, default: 'Anonymous' },
    contact: { type: String }
  },
  votes: {
    type: Number,
    default: 0
  },
  // Updated images field for issue photos
  issueImages: [{
    url: String,
    caption: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  // New field for resolution photos
  resolutionImages: [{
    url: String,
    caption: String,
    uploadedBy: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  updates: [{
    text: String,
    date: { type: Date, default: Date.now },
    updatedBy: String,
    images: [String] // URLs for update images
  }]
}, {
  timestamps: true
});

// Add index for better query performance
IssueSchema.index({ status: 1, category: 1 });
IssueSchema.index({ coordinates: '2dsphere' });

const IssueModel = mongoose.models.Issue || mongoose.model('Issue', IssueSchema);
export default IssueModel