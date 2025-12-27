import PoliticalRepresentativeModel from "../models/PoliticalRepresentative.js";

// @desc    Get all political representatives
// @route   GET /api/political-representatives
// @access  Public
const getPoliticalRepresentatives = async (req, res) => {
  try {
    const { position, search } = req.query;
    
    let query = { isActive: true };
    
    if (position && position !== 'all') {
      if (position === 'mp') query.position = 'MP';
      if (position === 'mla') query.position = 'MLA';
      if (position === 'sarpanch') query.position = 'Sarpanch';
      if (position === 'zilla') query.position = 'Zilla Parishad Member';
    }
    
    if (search) {
      query.$or = [
        { name: new RegExp(search, 'i') },
        { position: new RegExp(search, 'i') },
        { constituency: new RegExp(search, 'i') }
      ];
    }

    const representatives = await PoliticalRepresentativeModel.find(query).sort({ position: 1 });

    res.status(200).json({
      success: true,
      count: representatives.length,
      data: representatives
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get single political representative
// @route   GET /api/political-representatives/:id
// @access  Public
const getPoliticalRepresentative = async (req, res) => {
  try {
    const representative = await PoliticalRepresentativeModel.findById(req.params.id);

    if (!representative) {
      return res.status(404).json({
        success: false,
        message: 'Political representative not found'
      });
    }

    res.status(200).json({
      success: true,
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

export {getPoliticalRepresentative,getPoliticalRepresentatives}