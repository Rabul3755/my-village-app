import mongoose from 'mongoose';
import dotenv from "dotenv"
import IssueModel from './models/Issue.js';
import LeaderModel from './models/Leader.js';
import PoliticalRepresentativeModel from './models/PoliticalRepresentative.js';
import VillageInfoModel from './models/VillageInfo.js';
import AdminModel from './models/Admin.js';

dotenv.config();

// Your existing sample data...
const sampleIssues = [
  {
    title: "Potholes on Main Road",
    description: "Large potholes near the temple causing traffic issues and vehicle damage.",
    category: "Roads & Infrastructure",
    location: "Near Village Temple, Main Road",
    status: "pending",
    coordinates: { lat: 28.6129, lng: 77.2295 },
    reporter: { name: "Anonymous" },
    votes: 12
  },
  {
    title: "Drainage Blockage in Market Area",
    description: "Sewage water overflowing near market area causing health hazards.",
    category: "Drainage & Sanitation",
    location: "Market Street, Near Grocery Shop",
    status: "in-progress",
    coordinates: { lat: 28.6135, lng: 77.2301 },
    reporter: { name: "Ramesh S." },
    votes: 8,
    updates: [
      {
        text: "Work started by sanitation department",
        updatedBy: "Municipal Corporation"
      }
    ]
  }
];

const sampleLeaders = [
  {
    name: "Gopichand Kundalik Padalkar",
    position: "Member of Maharashtra Legislative Assembly",
    area: "Jath Assembly Constituency",
    party: "Bharatiya Janata Party (BJP)",
    contact: {
      phone: "+91 1234567890",      
      email: "gopichandpadalkar5@email.com",      
      office: "Shambhaji Nagar, Jath"      
    },
    bio: "Born 1 October 1982 in Pimpri (Atpadi), Sangli district. Former member of the Maharashtra Legislative Council. Elected to the Legislative Assembly from Jath in November 2024. Represents BJP and comes from the Dhangar community.",
    responsibilities: [
      "Representing the people of Jath constituency in the Maharashtra Legislative Assembly",
      "Legislative duties, including law-making and oversight",
      "Addressing local development and constituency issues"
    ]
  },
  {
    name: "Ramesh Kumar",
    position: "Ward Councillor",
    area: "Ward 5 - South Zone",
    party: "Independent",
    contact: {
      phone: "+91 98765 43210",
      email: "ramesh.ward5@email.com",
      office: "Village Council Office, Main Road"
    },
    bio: "Serving the community for 5 years with focus on infrastructure development.",
    responsibilities: [
      "Addressing civic issues in Ward 5",
      "Infrastructure development projects",
      "Public grievance resolution"
    ]
  }
];

const samplePoliticalReps = [
  {
    name: "Dr. Rajesh Verma",
    position: "MLA",
    constituency: "Green Valley Constituency",
    party: "Bharatiya Janata Party",
    contact: {
      phone: "+91 98765 43220",
      email: "rajesh.verma.mla@email.com",
      office: "MLA Office, District Headquarters"
    },
    bio: "Serving as MLA since 2018. Focused on rural development, education, and healthcare infrastructure.",
    responsibilities: [
      "Representing constituency in state assembly",
      "Allocating local area development funds"
    ],
    achievements: [
      "Secured ₹50 crore for road development in the region",
      "Established 10 new primary health centers"
    ]
  }
];

const sampleVillageInfo = {
  name: "Jath",
  district: "Jath",
  state: "Maharashtra",
  population: "3,28,324 ",
  area: "2,240 sq km",
  established: "1686",
  description: "A peaceful village known for its agricultural heritage and community spirit.",
  location: {
    latitude: 28.6129,
    longitude: 77.2295
  }
};

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await IssueModel.deleteMany();
    await LeaderModel.deleteMany();
    await PoliticalRepresentativeModel.deleteMany();
    await VillageInfoModel.deleteMany();
    await AdminModel.deleteMany();
    console.log('Cleared existing data');

    // Create admin using the model - this will trigger the pre-save middleware
    console.log('Creating admin user...');
    const admin = new AdminModel({
      name: "Super Admin",
      email: "admin@villageplatform.com",
      password: "admin123", // Plain text - will be hashed by pre-save middleware
      role: "superadmin"
    });

    // Save the admin to trigger password hashing
    await admin.save();
    console.log('✅ Admin created successfully:', admin.email);

    // Insert sample data
    await IssueModel.insertMany(sampleIssues);
    await LeaderModel.insertMany(sampleLeaders);
    await PoliticalRepresentativeModel.insertMany(samplePoliticalReps);
    await VillageInfoModel.create(sampleVillageInfo);
    console.log('Sample data inserted successfully');

    // Verify the admin password works
    console.log('Verifying admin password...');
    const verifyAdmin = await AdminModel.findOne({ email: 'admin@villageplatform.com' }).select('+password');
    if (verifyAdmin) {
      const isPasswordValid = await verifyAdmin.matchPassword('admin123');
      console.log('🔐 Password verification:', isPasswordValid ? '✅ Valid' : '❌ Invalid');
      
      if (!isPasswordValid) {
        console.log('❌ Password hash issue detected');
        console.log('Stored password hash:', verifyAdmin.password);
      }
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();