import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  BarChart3,
  MapPin,
  Calendar,
  Search,
  Filter,
  Loader2,
} from "lucide-react";
import {
  getAllMarketPrices,
  getMarketTrends,
  getPriceAnalysis,
} from "../api/marketApi";

const MarketAnalytics = () => {
  const [marketData, setMarketData] = useState([]);
  const [trends, setTrends] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCommodity, setSelectedCommodity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [analysis, setAnalysis] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchMarketData();
    fetchTrends();
  }, [selectedState, selectedCommodity]);

  const fetchMarketData = async () => {
    try {
      console.log("🔄 Fetching market data...");
      setIsLoading(true);
      const filters = {};
      if (selectedState) filters.state = selectedState;
      if (selectedCommodity) filters.commodity = selectedCommodity;

      console.log("📡 API Call filters:", filters);
      const response = await getAllMarketPrices(filters);
      console.log("✅ API Response:", response);
      setMarketData(response.data || []);
    } catch (error) {
      console.error("❌ Error fetching market data:", error);
      setMarketData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTrends = async () => {
    try {
      const response = await getMarketTrends();
      setTrends(response.data || []);
    } catch (error) {
      console.error("Error fetching trends:", error);
      setTrends([]);
    }
  };

  const handleAnalysis = async (commodity) => {
    try {
      const response = await getPriceAnalysis(commodity);
      setAnalysis(response.data);
    } catch (error) {
      console.error("Error fetching analysis:", error);
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="text-green-500" size={20} />;
      case "down":
        return <TrendingDown className="text-red-500" size={20} />;
      default:
        return <BarChart3 className="text-gray-500" size={20} />;
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "up":
        return "text-green-600 bg-green-100";
      case "down":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const filteredData = marketData.filter(
    (item) =>
      (item.commodity || item.crop || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (item.market || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.state || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Market Analytics
          </h1>
          <p className="text-lg text-gray-600">
            Real-time crop prices and market insights for better decision making
          </p>
        </motion.div>

        {/* Market Trends Overview */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {trends.slice(0, 4).map((trend, index) => (
            <motion.div
              key={trend.commodity}
              variants={itemVariants}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handleAnalysis(trend.commodity)}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {trend.commodity}
                </h3>
                {getTrendIcon(trend.trend)}
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-gray-900">
                  ₹{trend.currentPrice}
                </div>
                <div
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(
                    trend.trend
                  )}`}>
                  {trend.changePercent > 0 ? "+" : ""}
                  {trend.changePercent}%
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search commodity or market..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">All States</option>
              <option value="Delhi">Delhi</option>
              <option value="Punjab">Punjab</option>
              <option value="Haryana">Haryana</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
            </select>
            <select
              value={selectedCommodity}
              onChange={(e) => setSelectedCommodity(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="">All Commodities</option>
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
              <option value="Onion">Onion</option>
              <option value="Potato">Potato</option>
              <option value="Tomato">Tomato</option>
            </select>
            <button
              onClick={() => {
                setSelectedState("");
                setSelectedCommodity("");
                setSearchTerm("");
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Clear Filters
            </button>
          </div>
        </motion.div>

        {/* Market Data Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Current Market Prices
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Live prices from major mandis across India
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="animate-spin text-green-600" size={32} />
              <span className="ml-2 text-gray-600">Loading market data...</span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commodity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Market
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Modal Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredData.map((item, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() =>
                        handleAnalysis(item.commodity || item.crop)
                      }>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.commodity || item.crop}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.variety}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <MapPin className="text-gray-400 mr-1" size={16} />
                          <span className="text-sm text-gray-900">
                            {item.market}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          ₹{item.modalPrice || item.price}
                          <span className="text-xs text-gray-500 ml-1">
                            /{item.unit || "Quintal"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₹{item.minPrice || item.price - 100} - ₹
                        {item.maxPrice || item.price + 100}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTrendColor(
                            item.trend
                          )}`}>
                          {getTrendIcon(item.trend)}
                          <span className="ml-1">
                            {item.changePercent > 0 || item.change > 0
                              ? "+"
                              : ""}
                            {item.changePercent ||
                              Math.round(
                                (item.change / (item.price - item.change)) * 100
                              ) ||
                              0}
                            %
                          </span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>

        {/* Analysis Modal/Section */}
        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {analysis.commodity} Price Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ₹{analysis.averagePrice}
                </div>
                <div className="text-sm text-gray-600">Average Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {analysis.markets}
                </div>
                <div className="text-sm text-gray-600">Markets Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900">
                  {analysis.recommendation}
                </div>
                <div className="text-xs text-gray-600">AI Recommendation</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarketAnalytics;
