import LeaderModel from "../models/Leader.js";

// @desc    Get all leaders
// @route   GET /api/leaders
// @access  Public
const getLeaders = async (req, res) => {
  try {
    const { position, area, search } = req.query;
    
    let query = { isActive: true };
    
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
        { area: new RegExp(search, 'i') }
      ];
    }

    const leaders = await LeaderModel.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: leaders.length,
      data: leaders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single leader
// @route   GET /api/leaders/:id
// @access  Public
const getLeader = async (req, res) => {
  try {
    const leader = await LeaderModel.findById(req.params.id);

    if (!leader) {
      return res.status(404).json({
        success: false,
        message: 'Leader not found'
      });
    }

    res.status(200).json({
      success: true,
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

// @desc    Create new leader
// @route   POST /api/leaders
// @access  Public
const createLeader = async (req, res) => {
  try {
    const leader = await LeaderModel.create(req.body);

    res.status(201).json({
      success: true,
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

export {getLeader, getLeaders,createLeader}