const mongoose = require("mongoose");

const marketDataSchema = new mongoose.Schema(
  {
    commodity: {
      type: String,
      required: true,
    },
    variety: {
      type: String,
      default: "General",
    },
    market: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
    modalPrice: {
      type: Number,
      required: true,
    },
    priceUnit: {
      type: String,
      default: "₹/Quintal",
    },
    date: {
      type: Date,
      required: true,
    },
    trend: {
      type: String,
      enum: ["up", "down", "stable"],
      default: "stable",
    },
    changePercent: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
marketDataSchema.index({ commodity: 1, date: -1 });
marketDataSchema.index({ state: 1, commodity: 1 });

module.exports = mongoose.model("MarketData", marketDataSchema);
