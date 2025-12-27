import IssueModel from "../models/Issue.js"

// @desc    Get all issues
// @route   GET /api/issues
// @access  Public
const getIssues = async (req, res) => {
  try {
    const { status, category, sort } = req.query;
    
    // Build query object
    let query = {};
    if (status && status !== 'all') {
      query.status = status;
    }
    if (category && category !== 'all') {
      query.category = category;
    }

    // Build sort object
    let sortBy = { createdAt: -1 }; // Default: newest first
    if (sort === 'oldest') sortBy = { createdAt: 1 };
    if (sort === 'most-voted') sortBy = { votes: -1 };

    const issues = await IssueModel.find(query).sort(sortBy);
    
    res.status(200).json({
      success: true,
      count: issues.length,
      data: issues
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
// @access  Public
const getIssue = async (req, res) => {
  try {
    const issue = await IssueModel.findById(req.params.id);
    
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


const createIssue = async (req, res) => {

  try {
    const randomOffset = () => (Math.random() - 0.5) * 0.01;
    const baseLat = 28.6129;
    const baseLng = 77.2295;

    const issueData = {
      ...req.body,
      coordinates: {
        lat: baseLat + randomOffset(),
        lng: baseLng + randomOffset()
      }
    };

    const issue = await IssueModel.create(issueData);

    res.status(201).json({
      success: true,
      data: issue
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        message: 'Validation Error',
        errors: messages
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


const updateIssue = async (req, res) => {
  try {
   let issue = await IssueModel.findById(req.params.id);
 
    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    issue = await IssueModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


const deleteIssue = async (req, res) => {
  try {
    const issue = await IssueModel.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    await IssueModel.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Issue deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};


const updateIssueStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const issue = await IssueModel.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        $push: {
          updates: {
            text: `Status changed to ${status}`,
            updatedBy: 'System'
          }
        }
      },
      { new: true }
    );

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.status(200).json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export {getIssue,getIssues,deleteIssue,updateIssue,updateIssueStatus,createIssue}