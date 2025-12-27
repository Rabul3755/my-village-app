import Leader from "../../models/Leader.js"
import PoliticalRepresentative from "../../models/PoliticalRepresentative.js"

// @desc    Get all leaders with admin filters
// @route   GET /api/admin/leaders
// @access  Private (Admin)
const getAdminLeaders = async (req, res) => {
  try {
    const { 
      position, 
      area, 
      search, 
      isActive,
      page = 1, 
      limit = 10 
    } = req.query;
    
    let query = {};
    
    if (position && position !== 'all') {
      query.position = position;
    }
    if (area && area !== 'all') {
      query.area = new RegExp(area, 'i');
    }
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { position: new RegExp(search, 'i') },
        { area: new RegExp(search, 'i') },
        { party: new RegExp(search, 'i') }
      ];
    }
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const leaders = await Leader.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Leader.countDocuments(query);

    res.status(200).json({
      success: true,
      data: leaders,
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

// @desc    Create new leader
// @route   POST /api/admin/leaders
// @access  Private (Admin)
const createLeader = async (req, res) => {
  try {
    const leader = await Leader.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Leader created successfully',
      data: leader
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

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Leader with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update leader
// @route   PUT /api/admin/leaders/:id
// @access  Private (Admin)
const updateLeader = async (req, res) => {
  try {
    let leader = await Leader.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: 'Leader not found'
      });
    }

    leader = await Leader.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Leader updated successfully',
      data: leader
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

// @desc    Delete leader
// @route   DELETE /api/admin/leaders/:id
// @access  Private (Admin)
const deleteLeader = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: 'Leader not found'
      });
    }

    await Leader.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Leader deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle leader active status
// @route   PATCH /api/admin/leaders/:id/toggle-active
// @access  Private (Admin)
const toggleLeaderActive = async (req, res) => {
  try {
    const leader = await Leader.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: 'Leader not found'
      });
    }

    leader.isActive = !leader.isActive;
    await leader.save();

    res.status(200).json({
      success: true,
      message: `Leader ${leader.isActive ? 'activated' : 'deactivated'} successfully`,
      data: leader
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Bulk delete leaders
// @route   DELETE /api/admin/leaders/bulk-delete
// @access  Private (Admin)
const bulkDeleteLeaders = async (req, res) => {
  try {
    const { leaderIds } = req.body;

    if (!leaderIds || !Array.isArray(leaderIds) || leaderIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide leader IDs to delete'
      });
    }

    const result = await Leader.deleteMany({ _id: { $in: leaderIds } });

    res.status(200).json({
      success: true,
      message: `Deleted ${result.deletedCount} leaders`,
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

export {getAdminLeaders,updateLeader,deleteLeader,bulkDeleteLeaders,toggleLeaderActive,createLeader}