import React from "react";

const AdvisorDashboard = () => {
  // Mock stats
  const stats = [
    { id: 1, label: "Monitor Farms", value: 4, color: "text-farm-green" },
    { id: 2, label: "Active Alerts", value: 2, color: "text-orange-500" },
    { id: 3, label: "Actions Today", value: 3, color: "text-blue-500" },
    { id: 4, label: "Responses Rate", value: "85%", color: "text-purple-500" },
  ];

  const monitoredFarms = [
    {
      id: 1,
      farmerName: "Rajesh Kumar",
      location: "Punjab, Ludhiana",
      crop: "Wheat",
      farmSize: "5.2 acres",
      status: "Active",
      lastUpdate: "2024-03-10T15:30:00Z",
      alerts: 2,
      health: "Good",
    },
    {
      id: 2,
      farmerName: "Priya Singh",
      location: "Haryana, Karnal",
      crop: "Rice",
      farmSize: "3.8 acres",
      status: "Warning",
      lastUpdate: "2024-03-10T12:45:00Z",
      alerts: 1,
      health: "Warning",
    },
    {
      id: 3,
      farmerName: "Amit Patel",
      location: "Gujarat, Anand",
      crop: "Cotton",
      farmSize: "7.5 acres",
      status: "Active",
      lastUpdate: "2024-03-10T10:20:00Z",
      alerts: 0,
      health: "Good",
    },
    {
      id: 4,
      farmerName: "Sunita Devi",
      location: "Bihar, Patna",
      crop: "Maize",
      farmSize: "4.1 acres",
      status: "Critical",
      lastUpdate: "2024-03-10T08:15:00Z",
      alerts: 3,
      health: "Poor",
    },
  ];

  // Mock alert details
  const alertDetails = [
    {
      id: 1,
      farmId: 2,
      farmerName: "Priya Singh",
      crop: "Rice",
      issue: "Brown Spot Disease",
      severity: "Medium",
      detectedAt: "2024-03-10T12:45:00Z",
      recommendedTreatment:
        "Apply neem-based spray (2ml/liter) every 7 days for 3 weeks",
      status: "Pending",
    },
    {
      id: 2,
      farmId: 4,
      farmerName: "Sunita Devi",
      crop: "Maize",
      issue: "Fall Armyworm Infestation",
      severity: "High",
      detectedAt: "2024-03-10T08:15:00Z",
      recommendedTreatment:
        "Apply spinosad-based insecticide immediately. Monitor for 5 days.",
      status: "In Progress",
    },
  ];

  const actionHistory = [
    {
      id: 1,
      action: "Alert Sent",
      farmerName: "Priya Singh",
      crop: "Rice",
      details: "Brown spot disease alert sent with treatment recommendations",
      timestamp: "2024-03-10T12:50:00Z",
      status: "Completed",
    },
    {
      id: 2,
      action: "Treatment Recommended",
      farmerName: "Sunita Devi",
      crop: "Maize",
      details: "Fall armyworm treatment protocol sent to farmer",
      timestamp: "2024-03-10T08:30:00Z",
      status: "Completed",
    },
    {
      id: 3,
      action: "Follow-up Call",
      farmerName: "Rajesh Kumar",
      crop: "Wheat",
      details: "Scheduled follow-up call to discuss irrigation schedule",
      timestamp: "2024-03-09T16:00:00Z",
      status: "Scheduled",
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Schedule Call",
      description: "Arrange consultation with farmers",
      icon: "📞",
    },
    {
      id: 2,
      title: "Generate Report",
      description: "Create farm health reports",
      icon: "📊",
    },
    {
      id: 3,
      title: "Send Alerts",
      description: "Notify farmers about issues",
      icon: "🚨",
    },
  ];
  const getStatusColor = (status) => {
    const colors = {
      Active: "text-green-600 bg-green-100",
      Warning: "text-yellow-600 bg-yellow-100",
      Critical: "text-red-600 bg-red-100",
    };
    return colors[status] || colors["Active"];
  };

  const getHealthColor = (health) => {
    const colors = {
      Good: "text-green-600",
      Warning: "text-yellow-600",
      Poor: "text-red-600",
    };
    return colors[health] || colors["Good"];
  };

  const getSeverityColor = (severity) => {
    const colors = {
      Low: "text-green-600 bg-green-100",
      Medium: "text-yellow-600 bg-yellow-100",
      High: "text-red-600 bg-red-100",
    };
    return colors[severity] || colors["Medium"];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Advisor Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor farms and manage agricultural advisory services.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.id} className="card text-center">
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Monitor Farms + Alerts side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Monitored Farms
              </h2>
              <div className="space-y-4">
                {monitoredFarms.map((farm) => (
                  <div
                    key={farm.id}
                    className="border boder-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🏡</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {farm.farmerName}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {farm.location}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          farm.status
                        )}`}>
                        {farm.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Crop:</span>
                        <div className="font-medium">{farm.crop}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Size:</span>
                        <div className="font-medium">{farm.farmSize}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Health:</span>
                        <div
                          className={`font-medium ${getHealthColor(
                            farm.health
                          )}`}>
                          {farm.health}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Alerts:</span>
                        <div className="font-medium">{farm.alerts}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Last update:{" "}
                        {new Date(farm.lastUpdate).toLocaleString()}
                      </span>
                      <button className="text-farm-green hover:text-farm-dark-green font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Alert details  */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Alert Details
              </h2>
              <div className="space-y-4">
                {alertDetails.map((alert) => (
                  <div
                    key={alert.id}
                    className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {alert.farmerName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {alert.crop} - {alert.issue}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          alert.severity
                        )}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <div className="mb-3">
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">Treatment:</span>{" "}
                        {alert.recommendedTreatment}
                      </p>
                      <p className="text-xs text-gray-500">
                        Detected: {new Date(alert.detectedAt).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          alert.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : alert.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}>
                        {alert.status}
                      </span>
                      <div className="flex space-x-2">
                        <button className="btn-primary text-xs">
                          Contact Farmer
                        </button>
                        <button className="btn-secondary text-xs">
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action History */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Action History
          </h2>
          <div className="card">
            <div className="space-y-4">
              {actionHistory.map((action) => (
                <div
                  key={action.id}
                  className="flex items-start space-x-4 p-4 border-b border-gray-100 last:border-b-0">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-farm-green rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">📋</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800">
                        {action.action}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          action.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : action.status === "Scheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                        {action.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">{action.farmerName}</span> -{" "}
                      {action.crop}
                    </p>

                    <p className="text-sm text-gray-700 mb-2">
                      {action.details}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(action.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {quickActions.map((action) => (
              <div
                key={action.id}
                className="card text-center cursor-pointer hover:shadow-lg transition">
                <div className="text-4xl mb-3">{action.icon}</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600">{action.description}</p>
                <button className="btn-primary mt-4">Go</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;
