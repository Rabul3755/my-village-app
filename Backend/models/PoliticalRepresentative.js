import mongoose from "mongoose";

const PoliticalRepresentativeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  position: {
    type: String,
    required: [true, 'Please add a position'],
    enum: ['MLA', 'MP', 'Sarpanch', 'Zilla Parishad Member', 'Councillor']
  },
  constituency: {
    type: String,
    required: [true, 'Please add a constituency']
  },
  party: {
    type: String,
    required: [true, 'Please add a party']
  },
  partyColor: String,
  photo: String,
  contact: {
    phone: { type: String, required: true },
    email: String,
    office: String,
    website: String
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio']
  },
  responsibilities: [String],
  achievements: [String],
  currentInitiatives: [String],
  electionYear: Number,
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const PoliticalRepresentativeModel =  mongoose.models.PoliticalRepresentative || mongoose.model('PoliticalRepresentative', PoliticalRepresentativeSchema);
export default PoliticalRepresentativeModel