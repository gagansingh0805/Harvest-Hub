const mongoose = require("mongoose");

const schemeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    benefit: {
      type: String,
      required: true,
    },
    eligibility: {
      type: [String], // Array of eligibility criteria
      required: true,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    applicationLink: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Credit",
        "Insurance",
        "Subsidy",
        "Support",
        "Training",
        "Equipment",
      ],
      required: true,
    },
    targetStates: {
      type: [String], // Array of states where scheme is applicable
      default: ["All India"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    minLandRequirement: {
      type: Number, // Minimum land in acres
      default: 0,
    },
    maxLandRequirement: {
      type: Number, // Maximum land in acres
      default: null,
    },
    ageRequirement: {
      min: { type: Number, default: 18 },
      max: { type: Number, default: 65 },
    },
    documents: {
      type: [String], // Required documents
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scheme", schemeSchema);
