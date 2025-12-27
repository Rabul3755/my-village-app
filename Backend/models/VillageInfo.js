import mongoose from "mongoose";

const VillageInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add village name'],
    unique: true
  },
  district: String,
  state: String,
  population: String,
  area: String,
  established: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  demographics: {
    literacyRate: String,
    employmentRate: String,
    averageIncome: String,
    mainOccupations: [String]
  },
  infrastructure: {
    roads: String,
    electricity: String,
    waterSupply: String,
    internet: String
  },
  contact: {
    panchayatOffice: String,
    emergencyPhone: String,
    email: String
  }
}, {
  timestamps: true
});

const VillageInfoModel =mongoose.models.VillageInfo || mongoose.model('VillageInfo', VillageInfoSchema);
export default VillageInfoModel