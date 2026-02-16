import Issue from "../models/Issue.js";
import {cloudinary} from "../config/cloudinary.js"

// @desc    Upload issue images
// @route   POST /api/issues/:id/upload-issue-images
// @access  Public
const uploadIssueImages = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please upload at least one image"
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload_stream(
        {
          folder: "village-platform/issues"
        },
        (error, result) => {
          if (error) throw error;
        }
      );

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "village-platform/issues" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(file.buffer);
      });

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        caption: `Issue photo`
      });
    }

    issue.issueImages.push(...uploadedImages);
    await issue.save();

    res.status(200).json({
      success: true,
      message: "Images uploaded successfully",
      data: uploadedImages
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error uploading images",
      error: error.message
    });
  }
};


// @desc    Upload resolution images
// @route   POST /api/issues/:id/upload-resolution-images
// @access  Public
const uploadResolutionImages = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: "Issue not found"
      });
    }

    const uploadedImages = [];

    for (const file of req.files) {

      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "village-platform/resolutions" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        stream.end(file.buffer);
      });

      uploadedImages.push({
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
        caption: req.body.caption || "Resolution photo",
        uploadedBy: req.body.uploadedBy || "Admin"
      });
    }

    issue.resolutionImages.push(...uploadedImages);

    if (issue.status !== "resolved") {
      issue.status = "resolved";
      issue.updates.push({
        text: "Issue marked as resolved with photographic evidence",
        updatedBy: req.body.uploadedBy || "Admin"
      });
    }

    await issue.save();

    res.status(200).json({
      success: true,
      message: "Resolution images uploaded successfully",
      data: uploadedImages
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading resolution images",
      error: error.message
    });
  }
};


// @desc    Delete an image
// @route   DELETE /api/issues/:issueId/images/:imageId
// @access  Public
const  deleteImage = async (req, res) => {
  try {
    const { issueId, imageId } = req.params;
    const { imageType } = req.body; // 'issueImages' or 'resolutionImages'

    const issue = await Issue.findById(issueId);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    let imageArray;
    if (imageType === 'resolutionImages') {
      imageArray = issue.resolutionImages;
    } else {
      imageArray = issue.issueImages;
    }

    // Find and remove image
    const imageIndex = imageArray.findIndex(img => img._id.toString() === imageId);
    
    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Optional: Delete from Cloudinary or file system
    const imageUrl = imageArray[imageIndex].url;
    if (imageUrl.includes('cloudinary')) {
      const publicId = imageUrl.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`village-platform/${publicId}`);
    }

    imageArray.splice(imageIndex, 1);
    await issue.save();

    res.status(200).json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting image',
      error: error.message
    });
  }
};

export {uploadIssueImages, uploadResolutionImages,deleteImage}