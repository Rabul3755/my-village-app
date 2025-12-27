import cloudinary from "cloudinary"
import {CloudinaryStorage} from "multer-storage-cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create storage engine for Multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'village-platform',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => {
      const timestamp = Date.now();
      return `issue-${timestamp}`;
    },
  },
});

export  { cloudinary, storage };