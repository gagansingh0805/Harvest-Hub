const mongoose = require("mongoose");

const cropSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    variety: {
      type: String,
      default: "Standard",
    },
    area: {
      type: Number, // in acres
      required: true,
    },
    plantedDate: {
      type: Date,
      required: true,
    },
    expectedHarvestDate: {
      type: Date,
      required: true,
    },
    currentStage: {
      type: String,
      enum: [
        "Seeded",
        "Germination",
        "Vegetative",
        "Flowering",
        "Tasseling",
        "Grain Development",
        "Maturity",
        "Harvested",
      ],
      default: "Seeded",
    },
    health: {
      type: String,
      enum: ["Good", "Warning", "Poor"],
      default: "Good",
    },
    location: {
      type: String,
      default: "",
    },
    progress: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    harvestPurpose: {
      type: String,
      enum: ["Food", "Seed", "Feed", "Commercial", "Processing", ""],
      default: "",
    },
    weather: {
      type: [
        {
          day: String,
          temp: String,
          rain: String,
          wind: String,
        },
      ],
      default: [],
    },
    notes: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Crop", cropSchema);
