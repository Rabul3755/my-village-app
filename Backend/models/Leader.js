import mongoose from "mongoose";

const LeaderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please add a position']
  },
  area: {
    type: String,
    required: [true, 'Please add an area/constituency']
  },
  party: {
    type: String,
    required: [true, 'Please add a party affiliation']
  },
  partyColor: {
    type: String,
    default: 'bg-gray-100 text-gray-800 border-gray-300'
  },
  photo: {
    type: String,
    default: null
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
    office: { type: String },
    website: { type: String }
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio']
  },
  responsibilities: [String],
  initiatives: [{
    title: String,
    description: String,
    status: String
  }],
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const LeaderModel = mongoose.models.Leader   ||  mongoose.model('Leader', LeaderSchema);
export default LeaderModel