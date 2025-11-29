import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Calendar,
  MapPin,
  Users,
  ExternalLink,
  FileText,
  CheckCircle,
} from "lucide-react";
import { UserContext } from "../context/UserProvider";
import { getAllSchemes, getUserRelevantSchemes } from "../api/schemeApi";

const SchemesPage = () => {
  const { user } = useContext(UserContext);
  const [schemes, setSchemes] = useState([]);
  const [filteredSchemes, setFilteredSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [showUserRelevant, setShowUserRelevant] = useState(false);

  const categories = [
    "Credit",
    "Insurance",
    "Subsidy",
    "Support",
    "Training",
    "Equipment",
  ];
  const states = [
    "All India",
    "Punjab",
    "Haryana",
    "Uttar Pradesh",
    "Bihar",
    "West Bengal",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Andhra Pradesh",
  ];

  useEffect(() => {
    fetchSchemes();
  }, [showUserRelevant, user]);

  useEffect(() => {
    filterSchemes();
  }, [schemes, searchTerm, selectedCategory, selectedState]);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      let schemesData;

      if (showUserRelevant && user?.id) {
        try {
          schemesData = await getUserRelevantSchemes();
        } catch (error) {
          console.log("Falling back to all schemes");
          schemesData = await getAllSchemes();
        }
      } else {
        schemesData = await getAllSchemes({
          state: selectedState,
          category: selectedCategory,
        });
      }

      setSchemes(schemesData.data || []);
    } catch (error) {
      console.error("Error fetching schemes:", error);
      setSchemes([]);
    } finally {
      setLoading(false);
    }
  };

  const filterSchemes = () => {
    let filtered = schemes;

    if (searchTerm) {
      filtered = filtered.filter(
        (scheme) =>
          scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          scheme.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (scheme) => scheme.category === selectedCategory
      );
    }

    if (selectedState && selectedState !== "All India") {
      filtered = filtered.filter(
        (scheme) =>
          scheme.targetStates.includes("All India") ||
          scheme.targetStates.includes(selectedState)
      );
    }

    setFilteredSchemes(filtered);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Credit: "bg-blue-100 text-blue-800",
      Insurance: "bg-green-100 text-green-800",
      Subsidy: "bg-purple-100 text-purple-800",
      Support: "bg-orange-100 text-orange-800",
      Training: "bg-indigo-100 text-indigo-800",
      Equipment: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const isDeadlineNear = (deadline) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isDeadlinePassed = (deadline) => {
    return new Date(deadline) < new Date();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading government schemes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4 pt-32">
            Government Schemes & Subsidies
          </h1>
          <p className="text-center text-green-100 max-w-2xl mx-auto">
            Discover and apply for government schemes designed to support
            farmers and boost agricultural productivity
          </p>
        </div>
      </div>

      <div className="container mx-auto px-10 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* State Filter */}
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}>
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            {/* User Relevant Toggle */}
            {user && (
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showUserRelevant}
                  onChange={(e) => setShowUserRelevant(e.target.checked)}
                  className="rounded text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  Show relevant to me
                </span>
              </label>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredSchemes.length} of {schemes.length} schemes
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedState("");
                setShowUserRelevant(false);
              }}
              className="text-sm text-green-600 hover:text-green-700">
              Clear all filters
            </button>
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <motion.div
              key={scheme._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {scheme.title}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${getCategoryColor(
                        scheme.category
                      )}`}>
                      {scheme.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {scheme.description}
                </p>

                {/* Benefit */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">
                    Benefit:
                  </h4>
                  <p className="text-green-600 font-medium text-sm">
                    {scheme.benefit}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-2" />
                    <span
                      className={
                        isDeadlinePassed(scheme.applicationDeadline)
                          ? "text-red-500"
                          : isDeadlineNear(scheme.applicationDeadline)
                          ? "text-orange-500"
                          : ""
                      }>
                      Deadline:{" "}
                      {new Date(
                        scheme.applicationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <MapPin className="h-3 w-3 mr-2" />
                    <span>{scheme.targetStates.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <FileText className="h-3 w-3 mr-2" />
                    <span>{scheme.department}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Eligibility:
                  </h4>
                  <ul className="space-y-1">
                    {scheme.eligibility.slice(0, 2).map((criteria, index) => (
                      <li
                        key={index}
                        className="flex items-start text-xs text-gray-600">
                        <CheckCircle className="h-3 w-3 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                        <span>{criteria}</span>
                      </li>
                    ))}
                    {scheme.eligibility.length > 2 && (
                      <li className="text-xs text-gray-500">
                        +{scheme.eligibility.length - 2} more criteria
                      </li>
                    )}
                  </ul>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t">
                  <a
                    href={scheme.applicationLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isDeadlinePassed(scheme.applicationDeadline)
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    {...(isDeadlinePassed(scheme.applicationDeadline) && {
                      onClick: (e) => e.preventDefault(),
                      "aria-disabled": true,
                    })}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {isDeadlinePassed(scheme.applicationDeadline)
                      ? "Deadline Passed"
                      : "Apply Now"}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No schemes found
              </h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search criteria or filters to find relevant
                schemes.
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("");
                  setSelectedState("");
                  setShowUserRelevant(false);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Clear All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemesPage;
