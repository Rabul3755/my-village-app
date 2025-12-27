import Issue from '../../models/Issue.js'

// @desc    Get issues with advanced admin filters
// @route   GET /api/admin/issues
// @access  Private (Admin)
const getAdminIssues = async (req, res) => {
  try {
    const { 
      status, 
      category, 
      dateFrom, 
      dateTo, 
      sort, 
      page = 1, 
      limit = 10,
      search 
    } = req.query;
    
    // Build query
    let query = {};
    
    if (status && status !== 'all') query.status = status;
    if (category && category !== 'all') query.category = category;
    
    // Date range filter
    if (dateFrom || dateTo) {
      query.createdAt = {};
      if (dateFrom) query.createdAt.$gte = new Date(dateFrom);
      if (dateTo) query.createdAt.$lte = new Date(dateTo);
    }

    // Search filter
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    let sortOptions = {};
    if (sort === 'oldest') sortOptions.createdAt = 1;
    else if (sort === 'most-voted') sortOptions.votes = -1;
    else if (sort === 'recently-updated') sortOptions.updatedAt = -1;
    else sortOptions.createdAt = -1; // Default: newest first

    const issues = await Issue.find(query)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Issue.countDocuments(query);

    res.status(200).json({
      success: true,
      data: issues,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        results: total
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Bulk update issue status
// @route   PATCH /api/admin/issues/bulk-status
// @access  Private (Admin)
const bulkUpdateIssueStatus = async (req, res) => {
  try {
    const { issueIds, status } = req.body;

    if (!issueIds || !Array.isArray(issueIds) || issueIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide issue IDs'
      });
    }

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const result = await Issue.updateMany(
      { _id: { $in: issueIds } },
      { 
        status,
        $push: {
          updates: {
            text: `Status changed to ${status} (Bulk update)`,
            updatedBy: req.admin.name
          }
        }
      }
    );

    res.status(200).json({
      success: true,
      message: `Updated ${result.modifiedCount} issues to ${status}`,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Delete multiple issues
// @route   DELETE /api/admin/issues/bulk-delete
// @access  Private (Admin)
const bulkDeleteIssues = async (req, res) => {
  try {
    const { issueIds } = req.body;

    if (!issueIds || !Array.isArray(issueIds) || issueIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide issue IDs to delete'
      });
    }

    const result = await Issue.deleteMany({ _id: { $in: issueIds } });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} issues`,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

export {bulkDeleteIssues,bulkUpdateIssueStatus,getAdminIssues}