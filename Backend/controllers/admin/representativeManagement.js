import PoliticalRepresentative from "../../models/PoliticalRepresentative.js"

// @desc    Get all political representatives with admin filters
// @route   GET /api/admin/representatives
// @access  Private (Admin)
const getAdminRepresentatives = async (req, res) => {
  try {
    const { 
      position, 
      party, 
      search, 
      isActive,
      page = 1, 
      limit = 10 
    } = req.query;
    
    let query = {};
    
    if (position && position !== 'all') {
      if (position === 'mp') query.position = 'MP';
      else if (position === 'mla') query.position = 'MLA';
      else if (position === 'sarpanch') query.position = 'Sarpanch';
      else if (position === 'zilla') query.position = 'Zilla Parishad Member';
      else query.position = position;
    }
    
    if (party && party !== 'all') {
      query.party = new RegExp(party, 'i');
    }
    
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { position: new RegExp(search, 'i') },
        { constituency: new RegExp(search, 'i') },
        { party: new RegExp(search, 'i') }
      ];
    }
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const representatives = await PoliticalRepresentative.find(query)
      .sort({ position: 1, name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await PoliticalRepresentative.countDocuments(query);

    res.status(200).json({
      success: true,
      data: representatives,
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

// @desc    Create new political representative
// @route   POST /api/admin/representatives
// @access  Private (Admin)
const createRepresentative = async (req, res) => {
  try {
    const representative = await PoliticalRepresentative.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Political representative created successfully',
      data: representative
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
        message: 'Representative with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Update political representative
// @route   PUT /api/admin/representatives/:id
// @access  Private (Admin)
const updateRepresentative = async (req, res) => {
  try {
    let representative = await PoliticalRepresentative.findById(req.params.id);

    if (!representative) {
      return res.status(404).json({
        success: false,
        message: 'Political representative not found'
      });
    }

    representative = await PoliticalRepresentative.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Political representative updated successfully',
      data: representative
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

// @desc    Delete political representative
// @route   DELETE /api/admin/representatives/:id
// @access  Private (Admin)
const deleteRepresentative = async (req, res) => {
  try {
    const representative = await PoliticalRepresentative.findById(req.params.id);

    if (!representative) {
      return res.status(404).json({
        success: false,
        message: 'Political representative not found'
      });
    }

    await PoliticalRepresentative.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Political representative deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Toggle representative active status
// @route   PATCH /api/admin/representatives/:id/toggle-active
// @access  Private (Admin)
const toggleRepresentativeActive = async (req, res) => {
  try {
    const representative = await PoliticalRepresentative.findById(req.params.id);

    if (!representative) {
      return res.status(404).json({
        success: false,
        message: 'Political representative not found'
      });
    }

    representative.isActive = !representative.isActive;
    await representative.save();

    res.status(200).json({
      success: true,
      message: `Political representative ${representative.isActive ? 'activated' : 'deactivated'} successfully`,
      data: representative
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get representative statistics
// @route   GET /api/admin/representatives/stats
// @access  Private (Admin)
const getRepresentativeStats = async (req, res) => {
  try {
    const totalRepresentatives = await PoliticalRepresentative.countDocuments();
    const activeRepresentatives = await PoliticalRepresentative.countDocuments({ isActive: true });
    
    const representativesByPosition = await PoliticalRepresentative.aggregate([
      {
        $group: {
          _id: '$position',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const representativesByParty = await PoliticalRepresentative.aggregate([
      {
        $group: {
          _id: '$party',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalRepresentatives,
        activeRepresentatives,
        inactiveRepresentatives: totalRepresentatives - activeRepresentatives,
        byPosition: representativesByPosition,
        byParty: representativesByParty
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

export {getAdminRepresentatives,getRepresentativeStats,createRepresentative,deleteRepresentative,updateRepresentative,toggleRepresentativeActive}