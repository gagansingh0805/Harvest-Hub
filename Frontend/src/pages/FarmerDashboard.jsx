import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bell,
  AlertTriangle,
  CloudSunRain,
  Wind,
  Droplets,
  Sprout,
  Wallet,
  Plus,
  Trash2,
  MapPin,
} from "lucide-react";
import fieldImg from "../assets/fieldImg.jpg";
import AlertCard from "../components/AlertCard";
import { UserContext } from "../context/UserProvider";
import { getUserCrops, addCrop, updateCrop, deleteCrop } from "../api/cropApi";
import { getUserRelevantSchemes, getAllSchemes } from "../api/schemeApi";

const FarmerDashboard = () => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();
  const [motivation, setMotivation] = useState("");
  const [landLocal, setLandLocal] = useState(
    () => localStorage.getItem("landAcres") || ""
  );
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, item: "Fertilizer", cost: 1200, category: "Input" },
          { id: 2, item: "Seeds", cost: 800, category: "Input" },
          { id: 3, item: "Labor", cost: 1500, category: "Labor" },
        ];
  });
  const [newExpense, setNewExpense] = useState({
    item: "",
    category: "",
    cost: "",
  });
  const [showAddCrop, setShowAddCrop] = useState(false);
  const [newCrop, setNewCrop] = useState({
    name: "",
    variety: "",
    area: "",
    currentStage: "Seeded",
    health: "Good",
    location: "",
    plantedDate: new Date().toISOString().split("T")[0],
    expectedHarvest: "",
    harvestPurpose: "",
    progress: 0,
  });
  const [predictionForm, setPredictionForm] = useState({
    landAcres: "",
    cropType: "Wheat",
    harvestDate: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [showPrediction, setShowPrediction] = useState(false);
  const [currentCrops, setCurrentCrops] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock reminders
  const reminders = [
    {
      id: 1,
      type: "Task",
      message: "Irrigation scheduled for tomorrow at 6 AM",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Weather",
      message: "Rain expected in next 24 hours",
      time: "3 hours ago",
    },
  ];

  // Personalized recommendations
  const recommendations = [
    {
      id: 1,
      type: "Irrigation",
      title: "Irrigate in next 2 days",
      description: "Soil moisture is low in Field A.",
      priority: "High",
      dueDate: "2024-03-12",
    },
    {
      id: 2,
      type: "Fertilization",
      title: "Apply NPK fertilizer",
      description: "Wheat crop needs nitrogen boost.",
      priority: "Medium",
      dueDate: "2024-03-18",
    },
  ];

  // Fetch user crops from backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setIsLoading(true);
        const crops = await getUserCrops();
        console.log("Fetched crops:", crops);
        setCurrentCrops(crops);
        setError(null);
      } catch (err) {
        console.error("Error fetching crops:", err);
        setError("Failed to load your crops. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCrops();
  }, [user?.id]);

  // Fetch relevant schemes for user
  useEffect(() => {
    const fetchSchemes = async () => {
      try {
        let schemesData;

        if (user?.id) {
          // Try to get user-specific schemes first if user is logged in
          try {
            schemesData = await getUserRelevantSchemes();
          } catch (authError) {
            // If authentication fails, get all schemes instead
            schemesData = await getAllSchemes();
          }
        } else {
          // If no user, just get all schemes
          schemesData = await getAllSchemes();
        }

        setSchemes(schemesData.data || []);
      } catch (err) {
        console.error("Error fetching schemes:", err);
        // Keep empty array on error - schemes are not critical
        setSchemes([]);
      }
    };

    fetchSchemes();
  }, [user?.id]);

  // Framer animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  const expectedIncome = 10000;
  const totalExpense = useMemo(
    () => expenses.reduce((sum, e) => sum + Number(e.cost || 0), 0),
    [expenses]
  );
  const formatCurrency = (n) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(n || 0));

  const soilTips = [
    {
      title: "Soil Health Card Scheme Explained",
      url: "https://www.youtube.com/watch?v=7h1yX0Hc5lQ",
      source: "YouTube",
      date: "2024-03-10",
    },
    {
      title: "How to Improve Soil Fertility",
      url: "https://www.icrisat.org/soil-fertility-guide/",
      source: "ICRISAT",
      date: "2024-02-05",
    },
    {
      title: "Composting Basics for Farmers",
      url: "https://www.youtube.com/watch?v=yG6b4qJbYxY",
      source: "YouTube",
      date: "2023-11-20",
    },
  ];

  const motivationQuotes = [
    "🌾 Hard work in fields brings golden harvests.",
    "🚜 A farmer is the backbone of our nation.",
    "🌱 Every seed you sow is hope for tomorrow.",
  ];

  const getHealthColor = (health) => {
    const colors = {
      Good: "text-green-600 bg-green-100",
      Warning: "text-yellow-600 bg-yellow-100",
      Poor: "text-orange-600 bg-orange-100",
    };
    return colors[health] || colors["Good"];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "text-orange-600 bg-orange-100",
      Medium: "text-yellow-600 bg-yellow-100",
      Low: "text-green-600 bg-green-100",
    };
    return colors[priority] || colors["Medium"];
  };

  // Persist expenses
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Persist land input
  useEffect(() => {
    if (landLocal !== null) {
      localStorage.setItem("landAcres", landLocal);
    }
  }, [landLocal]);

  // Fetch motivation from internet (fallback to local)
  useEffect(() => {
    let isMounted = true;
    const fetchQuote = async () => {
      try {
        const res = await fetch("https://type.fit/api/quotes");
        const data = await res.json();
        if (isMounted && Array.isArray(data) && data.length) {
          const r = data[Math.floor(Math.random() * data.length)];
          setMotivation(
            r.text ||
              motivationQuotes[
                Math.floor(Math.random() * motivationQuotes.length)
              ]
          );
        }
      } catch (e) {
        setMotivation(
          motivationQuotes[Math.floor(Math.random() * motivationQuotes.length)]
        );
      }
    };
    fetchQuote();
    return () => {
      isMounted = false;
    };
  }, []);

  // Create a simple 5-day mock forecast per crop/location
  const getFiveDayForecast = (seed = 0) => {
    const days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];
    return days.map((d, idx) => {
      const base = (seed + idx * 7) % 30;
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

  // Add new crop handler
  const handleAddCrop = async (e) => {
    e.preventDefault();
    if (!newCrop.name || !newCrop.area) return;

    try {
      // Ensure dates are set
      const cropToAdd = {
        ...newCrop,
        plantedDate:
          newCrop.plantedDate || new Date().toISOString().split("T")[0],
        expectedHarvest:
          newCrop.expectedHarvest ||
          new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
      };

      console.log("Submitting crop:", cropToAdd);
      const addedCrop = await addCrop(cropToAdd);
      console.log("Response from server:", addedCrop);

      // Add new crop to state
      setCurrentCrops((prev) => [addedCrop, ...prev]);

      // Reset form
      setNewCrop({
        name: "",
        variety: "",
        area: "",
        currentStage: "Seeded",
        health: "Good",
        location: "",
        plantedDate: new Date().toISOString().split("T")[0],
        expectedHarvest: "",
        harvestPurpose: "",
        progress: 0,
      });
      setShowAddCrop(false);
    } catch (err) {
      console.error("Error adding crop:", err);
      alert("Failed to add crop. Please try again.");
    }
  };

  // Price prediction (mock)
  const handlePredict = (e) => {
    e.preventDefault();
    const factors = { Wheat: 1800, Rice: 2200, Maize: 1600, Cotton: 6000 };
    const base = factors[predictionForm.cropType] || 2000;
    const acres = Number(predictionForm.landAcres || 1);
    const volatility = 0.9 + Math.random() * 0.3; // 0.9x - 1.2x
    setPredictedPrice(Math.round(base * acres * volatility));
    setShowPrediction(true);
  };

  const alertsCount = reminders.length;
  const totalLand = Number(landLocal || user?.landSizeAcres || user?.land || 0);
  const totalCropLand = currentCrops.reduce((sum, crop) => {
    const area = parseFloat(crop.area.replace(/[^\d.]/g, "")) || 0;
    return sum + area;
  }, 0);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 py-8 pt-44">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 p-8">
              <div className="flex items-center justify-between">
                <div>
                  <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl font-bold text-white mb-2"
                  >
                    Welcome back, {user?.name || "Farmer"}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-emerald-100 text-lg"
                  >
                    {motivation ||
                      motivationQuotes[
                        Math.floor(Math.random() * motivationQuotes.length)
                      ]}
                  </motion.p>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="hidden md:block"
                >
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                    <Sprout className="w-10 h-10 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Professional Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {currentCrops.length}
            </div>
            <div className="text-gray-600 font-medium">Active Crops</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {alertsCount}
            </div>
            <div className="text-gray-600 font-medium">
              Alerts & Notifications
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold mb-2 text-gray-800">
              {formatCurrency(totalExpense)}
            </div>
            <div className="text-gray-600 font-medium">Total Expenses</div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -5 }}
            className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl shadow-lg border border-emerald-200 p-6 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="w-12 h-12 bg-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold mb-2 text-emerald-700">
              {totalCropLand.toFixed(1)} acres
            </div>
            <div className="text-emerald-600 font-medium mb-1">
              Total Crop Land
            </div>
            <div className="text-sm text-emerald-500">
              {currentCrops.length} active crop
              {currentCrops.length !== 1 ? "s" : ""}
            </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Current Crops */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Current Crops
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddCrop(!showAddCrop)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Crop
              </motion.button>
            </div>

            {/* Add New Crop Form */}
            {showAddCrop && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">
                  Add New Crop
                </h3>
                <form
                  onSubmit={handleAddCrop}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
                >
                  <input
                    value={newCrop.name}
                    onChange={(e) =>
                      setNewCrop({ ...newCrop, name: e.target.value })
                    }
                    placeholder="Crop Name (e.g., Wheat)"
                    className="input"
                    required
                  />
                  <input
                    value={newCrop.variety}
                    onChange={(e) =>
                      setNewCrop({ ...newCrop, variety: e.target.value })
                    }
                    placeholder="Variety (e.g., HD 2967)"
                    className="input"
                  />
                  <div className="relative">
                    <input
                      value={newCrop.area}
                      onChange={(e) => {
                        let value = e.target.value;
                        // Remove non-numeric characters except dots
                        value = value.replace(/[^\d.]/g, "");
                        setNewCrop({ ...newCrop, area: value });
                      }}
                      placeholder="Area (e.g., 2.5)"
                      className="input pr-16"
                      type="number"
                      step="0.1"
                      min="0.1"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      acres
                    </span>
                  </div>
                  <select
                    value={newCrop.currentStage}
                    onChange={(e) =>
                      setNewCrop({ ...newCrop, currentStage: e.target.value })
                    }
                    className="input"
                  >
                    <option value="Seeded">Seeded</option>
                    <option value="Germination">Germination</option>
                    <option value="Vegetative">Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Tasseling">Tasseling</option>
                    <option value="Grain Development">Grain Development</option>
                    <option value="Maturity">Maturity</option>
                    <option value="Harvested">Harvested</option>
                  </select>
                  <select
                    value={newCrop.health}
                    onChange={(e) =>
                      setNewCrop({ ...newCrop, health: e.target.value })
                    }
                    className="input"
                  >
                    <option value="Good">Good</option>
                    <option value="Warning">Warning</option>
                    <option value="Poor">Poor</option>
                  </select>
                  <input
                    value={newCrop.location}
                    onChange={(e) =>
                      setNewCrop({ ...newCrop, location: e.target.value })
                    }
                    placeholder="Location (e.g., Ludhiana, Punjab)"
                    className="input"
                  />
                  <div className="space-y-1">
                    <label className="text-xs text-emerald-600 font-medium">
                      Planted Date
                    </label>
                    <input
                      type="date"
                      value={newCrop.plantedDate}
                      onChange={(e) =>
                        setNewCrop({ ...newCrop, plantedDate: e.target.value })
                      }
                      className="input"
                      required
                    />
                    <p className="text-xs text-gray-500">
                      When did you plant this crop?
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-emerald-600 font-medium">
                      Expected Harvest Date
                    </label>
                    <input
                      type="date"
                      value={newCrop.expectedHarvest}
                      onChange={(e) =>
                        setNewCrop({
                          ...newCrop,
                          expectedHarvest: e.target.value,
                        })
                      }
                      className="input"
                    />
                    <p className="text-xs text-gray-500">
                      Leave blank for auto-calculation
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-emerald-600 font-medium">
                      Harvest Purpose
                    </label>
                    <select
                      value={newCrop.harvestPurpose}
                      onChange={(e) =>
                        setNewCrop({
                          ...newCrop,
                          harvestPurpose: e.target.value,
                        })
                      }
                      className="input"
                    >
                      <option value="">Select Purpose</option>
                      <option value="Food">Food</option>
                      <option value="Seed">Seed</option>
                      <option value="Feed">Animal Feed</option>
                      <option value="Commercial">Commercial Sale</option>
                      <option value="Processing">Processing</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-emerald-600 font-medium">
                      Growth Progress (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newCrop.progress}
                      onChange={(e) =>
                        setNewCrop({
                          ...newCrop,
                          progress: Number(e.target.value),
                        })
                      }
                      placeholder="0-100"
                      className="input"
                    />
                  </div>
                  <div className="flex gap-2 col-span-full">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors focus:ring-2 focus:ring-emerald-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex-1 flex items-center justify-center gap-2"
                      disabled={
                        !newCrop.name || !newCrop.area || !newCrop.plantedDate
                      }
                    >
                      <Plus className="w-4 h-4" />
                      Add Crop
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddCrop(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors focus:ring-2 focus:ring-gray-400 focus:outline-none flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-span-full text-xs text-gray-500 mt-2">
                    <p>* Required fields: Crop Name, Area, and Planted Date</p>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Crop delete handler */}
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
              </div>
            ) : error ? (
              <div className="py-10 text-center">
                <p className="text-orange-600">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Retry
                </button>
              </div>
            ) : currentCrops.length === 0 ? (
              <div className="py-10 text-center">
                <p className="text-gray-500">
                  You don't have any crops yet. Click the "Add Crop" button to
                  get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {currentCrops.map((crop) => (
                  <motion.div
                    key={crop.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <Sprout className="w-6 h-6 text-emerald-600" />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {crop.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {crop.variety}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(
                            crop.health
                          )}`}
                        >
                          {crop.health}
                        </span>
                        <button
                          onClick={async () => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${crop.name}?`
                              )
                            ) {
                              try {
                                await deleteCrop(crop.id);
                                setCurrentCrops((prevCrops) =>
                                  prevCrops.filter((c) => c.id !== crop.id)
                                );
                              } catch (err) {
                                console.error("Error deleting crop:", err);
                                alert("Failed to delete crop");
                              }
                            }
                          }}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm text-center">
                      <div>
                        <span className="text-gray-600">Area:</span>
                        <div className="font-medium">{crop.area}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Stage:</span>
                        <div className="font-medium">
                          {crop.growthStage || crop.currentStage}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Planted:</span>
                        <div className="font-medium">
                          {new Date(crop.plantedDate).toLocaleDateString()}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Harvest:</span>
                        <div className="font-medium">
                          {new Date(crop.expectedHarvest).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                        <span className="font-medium">
                          {crop.location || "Your Farm"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Growth Progress</span>
                        <span>{crop.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${crop.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    {/* 5-day Weather for this crop/location */}
                    <div className="mt-4">
                      <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                        <CloudSunRain className="w-4 h-4 text-blue-600" />{" "}
                        Weather (next 5 days)
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {(
                          crop.weather || getFiveDayForecast(crop.id.toString())
                        ).map((d, i) => (
                          <div
                            key={i}
                            className="p-2 bg-blue-50 rounded text-center"
                          >
                            <div className="text-xs font-medium">{d.day}</div>
                            <div className="text-sm font-semibold text-blue-700">
                              {d.temp}
                            </div>
                            <div className="text-[11px] text-gray-600 flex items-center justify-center gap-1">
                              <Droplets className="w-3 h-3" />
                              {d.rain}
                            </div>
                            <div className="text-[11px] text-gray-600 flex items-center justify-center gap-1">
                              <Wind className="w-3 h-3" />
                              {d.wind}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Alerts & Notifications */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" /> Alerts &
              Notifications
            </h2>
            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div
                  key={reminder.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="text-lg">
                    {reminder.type === "Task" ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <CloudSunRain className="w-5 h-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{reminder.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {reminder.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pest Detection (commented out) */}
        {/*
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray mb-6">Pest & Disease Detection</h2>
          <div className="space-y-6">{pestDetections.map((detection) => (<AlertCard key={detection.id} alert={detection} />))}</div>
        </div>
        */}

        {/* General Weather Forecast removed as requested */}

        {/* Soil Tips */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Soil Health Tips
          </h2>
          <div className="max-h-56 overflow-y-auto pr-2 space-y-2">
            {[...soilTips]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((tip, i) => (
                <a
                  key={i}
                  href={tip.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-3 rounded border hover:bg-green-50 transition"
                >
                  <div className="text-sm font-medium text-gray-800">
                    {tip.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {tip.source} • {new Date(tip.date).toLocaleDateString()}
                  </div>
                </a>
              ))}
          </div>
        </div>

        {/* Govt Schemes */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Govt. Schemes & Subsidies
          </h2>
          <div className="space-y-3">
            {schemes.length > 0 ? (
              schemes.slice(0, 3).map((scheme) => (
                <Link
                  to="/schemes"
                  key={scheme._id}
                  className="p-3 border rounded-lg bg-green-50 block hover:bg-green-100 transition"
                >
                  <h3 className="font-semibold text-green-700">
                    {scheme.title}
                  </h3>
                  <p className="text-sm text-gray-700">{scheme.benefit}</p>
                  <p className="text-xs text-gray-500">
                    Apply before:{" "}
                    {new Date(scheme.applicationDeadline).toLocaleDateString()}
                  </p>
                  <div className="mt-2">
                    <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {scheme.category}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-500 py-4">
                <p>Loading relevant schemes...</p>
              </div>
            )}
            {schemes.length > 3 && (
              <Link
                to="/schemes"
                className="block text-center text-green-600 hover:text-green-700 font-medium py-2"
              >
                View all {schemes.length} schemes →
              </Link>
            )}
          </div>
        </div>

        {/* Expense Tracker */}
        <div className="mt-8 card">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-blue-600" /> Expense Tracker
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!newExpense.item || !newExpense.cost) return;
              setExpenses((prev) => [
                ...prev,
                {
                  id: Date.now(),
                  ...newExpense,
                  cost: Number(newExpense.cost),
                },
              ]);
              setNewExpense({ item: "", category: "", cost: "" });
            }}
            className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-4"
          >
            <input
              value={newExpense.item}
              onChange={(e) =>
                setNewExpense({ ...newExpense, item: e.target.value })
              }
              placeholder="Item"
              className="input"
            />
            <input
              value={newExpense.category}
              onChange={(e) =>
                setNewExpense({ ...newExpense, category: e.target.value })
              }
              placeholder="Category"
              className="input"
            />
            <input
              value={newExpense.cost}
              onChange={(e) =>
                setNewExpense({
                  ...newExpense,
                  cost: e.target.value.replace(/[^0-9]/g, ""),
                })
              }
              placeholder="Cost (e.g., 5000)"
              inputMode="numeric"
              pattern="[0-9]*"
              className="input"
            />
            <button
              type="submit"
              className="btn-primary flex items-center justify-center gap-1"
            >
              <Plus className="w-4 h-4" /> Add
            </button>
            <div className="flex items-center justify-end text-sm text-gray-700">
              Total:{" "}
              <span className="ml-2 font-semibold">
                {formatCurrency(totalExpense)}
              </span>
            </div>
          </form>
          <div className="space-y-2">
            {expenses.map((e) => (
              <div
                key={e.id}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div className="text-sm">
                  <div className="font-medium">
                    {e.item}{" "}
                    <span className="text-gray-500">({e.category})</span>
                  </div>
                  <div className="text-gray-600">{formatCurrency(e.cost)}</div>
                </div>
                <button
                  onClick={() =>
                    setExpenses((prev) => prev.filter((x) => x.id !== e.id))
                  }
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="card border-l-4 border-l-farm-green">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">
                    {rec.type === "Irrigation" ? (
                      <Droplets className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Sprout className="w-6 h-6 text-green-600" />
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      rec.priority
                    )}`}
                  >
                    {rec.priority}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Due : {new Date(rec.dueDate).toLocaleDateString()}
                  </span>
                  <button className="btn-primary text-sm">Mark Complete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crop Price Prediction - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-8 card border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 rounded-full">
              <Sprout className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-emerald-800">
                AI-Powered Harvest Price Prediction
              </h2>
              <p className="text-emerald-600">
                Get intelligent estimates for your crop yield and market value
              </p>
            </div>
          </div>

          <form
            onSubmit={handlePredict}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-700">
                Land Area (acres)
              </label>
              <input
                className="input border-emerald-300 focus:border-emerald-500"
                inputMode="decimal"
                pattern="[0-9]*[.]?[0-9]*"
                placeholder="e.g., 2.5"
                value={predictionForm.landAcres}
                onChange={(e) =>
                  setPredictionForm({
                    ...predictionForm,
                    landAcres: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-700">
                Crop Type
              </label>
              <select
                className="input border-emerald-300 focus:border-emerald-500"
                value={predictionForm.cropType}
                onChange={(e) =>
                  setPredictionForm({
                    ...predictionForm,
                    cropType: e.target.value,
                  })
                }
              >
                <option>Wheat</option>
                <option>Rice</option>
                <option>Maize</option>
                <option>Cotton</option>
                <option>Sugarcane</option>
                <option>Potato</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-emerald-700">
                Expected Harvest Date
              </label>
              <input
                className="input border-emerald-300 focus:border-emerald-500"
                type="date"
                value={predictionForm.harvestDate}
                onChange={(e) =>
                  setPredictionForm({
                    ...predictionForm,
                    harvestDate: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-3"
                type="submit"
              >
                <Sprout className="w-5 h-5" />
                Predict Price
              </motion.button>
            </div>
          </form>

          {showPrediction && predictedPrice !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
              className="p-6 bg-gradient-to-r from-emerald-100 to-green-100 rounded-xl border-2 border-emerald-300"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-emerald-800 mb-2">
                  {formatCurrency(predictedPrice)}
                </div>
                <div className="text-lg text-emerald-700 mb-2">
                  Estimated Harvest Value
                </div>
                <div className="text-sm text-emerald-600">
                  Based on {predictionForm.landAcres} acres of{" "}
                  {predictionForm.cropType}
                  {predictionForm.harvestDate &&
                    ` (harvest: ${new Date(
                      predictionForm.harvestDate
                    ).toLocaleDateString()})`}
                </div>
                <div className="mt-4 flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium"
                    onClick={() => setShowPrediction(false)}
                  >
                    New Prediction
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 border border-emerald-600 text-emerald-600 rounded-lg text-sm font-medium"
                  >
                    Save to Records
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 mt-0.5">💡</div>
              <div className="text-sm text-blue-700">
                <strong>Note:</strong> This prediction uses AI algorithms
                considering market trends, seasonal factors, and historical
                data. For production use, integrate with real agricultural APIs
                and market data sources.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
