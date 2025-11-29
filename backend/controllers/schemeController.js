const Scheme = require("../models/schemeModel");

// Get all active schemes
const getAllSchemes = async (req, res) => {
  try {
    const { state, category, landSize } = req.query;

    let filter = { isActive: true };

    // Filter by state if provided
    if (state) {
      filter.$or = [
        { targetStates: "All India" },
        { targetStates: { $in: [state] } },
      ];
    }

    // Filter by category if provided
    if (category) {
      filter.category = category;
    }

    // Filter by land size if provided
    if (landSize) {
      const land = parseFloat(landSize);
      filter.minLandRequirement = { $lte: land };
      filter.$or = [
        { maxLandRequirement: null },
        { maxLandRequirement: { $gte: land } },
      ];
    }

    const schemes = await Scheme.find(filter).sort({ applicationDeadline: 1 });

    res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    console.error("Error fetching schemes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching schemes",
    });
  }
};

// Get schemes relevant to a specific user
const getUserRelevantSchemes = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await require("../models/userModel").findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    let filter = {
      isActive: true,
      applicationDeadline: { $gte: new Date() }, // Only future deadlines
    };

    // Filter by user's state if available
    if (user.state) {
      filter.$or = [
        { targetStates: "All India" },
        { targetStates: { $in: [user.state] } },
      ];
    }

    // Filter by user's land size
    if (user.landSizeAcres) {
      const land = parseFloat(user.landSizeAcres);
      filter.minLandRequirement = { $lte: land };
      filter.$or = [
        { maxLandRequirement: null },
        { maxLandRequirement: { $gte: land } },
      ];
    }

    const schemes = await Scheme.find(filter)
      .sort({ applicationDeadline: 1 })
      .limit(10);

    res.status(200).json({
      success: true,
      count: schemes.length,
      data: schemes,
    });
  } catch (error) {
    console.error("Error fetching user relevant schemes:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching relevant schemes",
    });
  }
};

// Get scheme by ID
const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Scheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        success: false,
        message: "Scheme not found",
      });
    }

    res.status(200).json({
      success: true,
      data: scheme,
    });
  } catch (error) {
    console.error("Error fetching scheme:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching scheme",
    });
  }
};

module.exports = {
  getAllSchemes,
  getUserRelevantSchemes,
  getSchemeById,
};
