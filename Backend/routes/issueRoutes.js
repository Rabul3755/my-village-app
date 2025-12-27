import express from "express";
import {getIssues,
  getIssue,
  createIssue,
  updateIssue,
  deleteIssue,
  updateIssueStatus} from "../controllers/issueController.js"

import { uploadIssueImages,
  uploadResolutionImages,
  deleteImage} from "../controllers/uploadController.js"

import upload from "../config/multer.js"

const uploadRouter = express.Router();

uploadRouter.route('/')
  .get(getIssues)
  .post(createIssue);

uploadRouter.route('/:id')
  .get(getIssue)
  .put(updateIssue)
  .delete(deleteIssue);

uploadRouter.route('/:id/status')
  .patch(updateIssueStatus);

// Image upload routes
uploadRouter.route('/:id/upload-issue-images')
  .post(upload.array('images', 5), uploadIssueImages); // max 5 images
uploadRouter.route('/:id/upload-resolution-images')
  .post(upload.array('images', 5), uploadResolutionImages);

uploadRouter.route('/:issueId/images/:imageId')
  .delete(deleteImage);

export  default uploadRouter