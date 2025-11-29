const Crop = require("../models/cropModel");

// Get all crops for a user
const getUserCrops = async (req, res) => {
  try {
    const userId = req.user.id;
    const crops = await Crop.find({ userId, isActive: true }).sort({
      createdAt: -1,
    });

    // Format crops for frontend
    const formattedCrops = crops.map((crop) => {
      // Generate weather forecast if not already present
      const weather =
        crop.weather && crop.weather.length
          ? crop.weather
          : generateWeatherForecast(
              crop.location,
              crop._id.toString().substring(0, 8)
            );

      return {
        id: crop._id,
        name: crop.name,
        variety: crop.variety,
        area: `${crop.area} acres`,
        growthStage: crop.currentStage,
        health: crop.health,
        location: crop.location || "Your Farm",
        plantedDate: crop.plantedDate,
        expectedHarvest: crop.expectedHarvestDate,
        progress: crop.progress || calculateProgress(crop.currentStage),
        harvestPurpose: crop.harvestPurpose || "",
        weather: weather,
        notes: crop.notes,
      };
    });

    res.status(200).json(formattedCrops);
  } catch (error) {
    console.error("Error fetching crops:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Add new crop
const addCrop = async (req, res) => {
  try {
    console.log("=== ADD CROP DEBUG ===");
    console.log("req.body:", req.body);
    console.log("req.body type:", typeof req.body);
    console.log("Content-Type header:", req.headers["content-type"]);
    console.log(
      "Authorization header:",
      req.headers.authorization ? "Present" : "Missing"
    );

    const userId = req.user.id;
    console.log("User ID from token:", userId);

    // Check if req.body exists and has data
    if (!req.body || Object.keys(req.body).length === 0) {
      console.log("ERROR: req.body is empty or undefined");
      return res.status(400).json({
        message: "Request body is empty. Make sure to send JSON data.",
      });
    }

    const {
      name,
      variety,
      area,
      plantedDate,
      currentStage,
      health,
      location,
      progress,
      harvestPurpose,
      expectedHarvest,
      notes,
    } = req.body;

    console.log("Extracted values:", {
      name,
      variety,
      area,
      plantedDate,
      currentStage,
      health,
      location,
      progress,
      harvestPurpose,
      expectedHarvest,
      notes,
    });

    // Validate required fields
    if (!name || !area || !plantedDate) {
      return res.status(400).json({
        message: "Crop name, area, and planted date are required",
      });
    }

    // Calculate expected harvest date if not provided
    const expectedHarvestDate =
      expectedHarvest || calculateExpectedHarvest(plantedDate, name);
    console.log("Calculated harvest date:", expectedHarvestDate);

    // Process area to extract just the number if it contains "acres"
    const numericArea =
      typeof area === "string" && area.includes("acres")
        ? parseFloat(area.replace(/[^0-9.]/g, ""))
        : parseFloat(area);

    // Generate weather forecast
    const weather = generateWeatherForecast(location);

    const newCrop = await Crop.create({
      userId,
      name,
      variety: variety || "Standard",
      area: numericArea,
      plantedDate: new Date(plantedDate),
      expectedHarvestDate: new Date(expectedHarvestDate),
      currentStage: currentStage || "Seeded",
      health: health || "Good",
      location: location || "",
      progress:
        progress !== undefined
          ? parseInt(progress)
          : calculateProgress(currentStage),
      harvestPurpose: harvestPurpose || "",
      weather: weather,
      notes,
    });

    console.log("Crop created:", newCrop);

    // Format response
    const formattedCrop = {
      id: newCrop._id,
      name: newCrop.name,
      variety: newCrop.variety,
      area: `${newCrop.area} acres`,
      growthStage: newCrop.currentStage,
      health: newCrop.health,
      location: newCrop.location || "Your Farm",
      plantedDate: newCrop.plantedDate,
      expectedHarvest: newCrop.expectedHarvestDate,
      progress: newCrop.progress,
      harvestPurpose: newCrop.harvestPurpose,
      weather: weather,
      notes: newCrop.notes,
    };

    res.status(201).json(formattedCrop);
  } catch (error) {
    console.error("Error adding crop:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update crop
const updateCrop = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cropId } = req.params;
    const updateData = req.body;

    // Process area if it's a string with "acres"
    if (
      updateData.area &&
      typeof updateData.area === "string" &&
      updateData.area.includes("acres")
    ) {
      updateData.area = parseFloat(updateData.area.replace(/[^0-9.]/g, ""));
    }

    // Update progress based on growth stage if it was changed
    if (updateData.currentStage && !updateData.progress) {
      updateData.progress = calculateProgress(updateData.currentStage);
    }

    // Update weather data if location changed
    if (updateData.location) {
      updateData.weather = generateWeatherForecast(updateData.location);
    }

    const crop = await Crop.findOneAndUpdate(
      { _id: cropId, userId },
      updateData,
      { new: true }
    );

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    // Get or generate weather data
    const weather =
      crop.weather && crop.weather.length
        ? crop.weather
        : generateWeatherForecast(
            crop.location,
            crop._id.toString().substring(0, 8)
          );

    // Format response
    const formattedCrop = {
      id: crop._id,
      name: crop.name,
      variety: crop.variety,
      area: `${crop.area} acres`,
      growthStage: crop.currentStage,
      health: crop.health,
      location: crop.location || "Your Farm",
      plantedDate: crop.plantedDate,
      expectedHarvest: crop.expectedHarvestDate,
      progress: crop.progress || calculateProgress(crop.currentStage),
      harvestPurpose: crop.harvestPurpose || "",
      weather: weather,
      notes: crop.notes,
    };

    res.status(200).json(formattedCrop);
  } catch (error) {
    console.error("Error updating crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete crop
const deleteCrop = async (req, res) => {
  try {
    const userId = req.user.id;
    const { cropId } = req.params;

    const crop = await Crop.findOneAndUpdate(
      { _id: cropId, userId },
      { isActive: false },
      { new: true }
    );

    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    res.status(200).json({ message: "Crop deleted successfully" });
  } catch (error) {
    console.error("Error deleting crop:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Helper functions
const calculateProgress = (stage, providedProgress) => {
  // If a specific progress value was provided, use it
  if (
    typeof providedProgress === "number" &&
    providedProgress >= 0 &&
    providedProgress <= 100
  ) {
    return providedProgress;
  }

  // Otherwise calculate based on stage
  const stageProgress = {
    Seeded: 10,
    Germination: 25,
    Vegetative: 45,
    Flowering: 75,
    Tasseling: 80,
    "Grain Development": 85,
    Maturity: 95,
    Harvested: 100,
  };
  return stageProgress[stage] || 0;
};

const calculateExpectedHarvest = (plantedDate, cropType) => {
  const planted = new Date(plantedDate);
  const cropDurations = {
    Wheat: 120,
    Rice: 150,
    Maize: 120,
    Cotton: 180,
    Sugarcane: 365,
    Pulses: 90,
    Oilseeds: 100,
    Vegetables: 60,
    Fruits: 200,
    Spices: 120,
    Other: 120,
  };

  const duration = cropDurations[cropType] || 120;
  const harvest = new Date(planted);
  harvest.setDate(harvest.getDate() + duration);
  return harvest;
};

// Generate a 5-day weather forecast for a location
const generateWeatherForecast = (location, seed) => {
  const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
  // Use location string to generate a consistent seed for that location
  const locationSeed = location
    ? location.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    : 0;

  // Combine with provided seed or use location seed
  const finalSeed = seed || locationSeed;

  return days.map((d, idx) => {
    const base = (finalSeed + idx * 7) % 30;
    const temp = 22 + ((base * 3) % 10);
    const rain = (base * 13) % 100;
    const wind = 6 + ((base * 2) % 10);
    return {
      day: d,
      temp: `${temp}°C`,
      rain: `${rain}%`,
      wind: `${wind} km/h`,
    };
  });
};

module.exports = {
  getUserCrops,
  addCrop,
  updateCrop,
  deleteCrop,
};
