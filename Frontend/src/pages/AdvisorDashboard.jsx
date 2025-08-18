import React from "react";

const AdvisorDashboard = () => {
  // Mock stats
  const stats = [
    { id: 1, label: "Monitor Farms", value: 12, color: "text-farm-green" },
    { id: 2, label: "Active Alerts", value: 5, color: "text-orange-500" },
    { id: 3, label: "Actions Today", value: 8, color: "text-blue-500" },
    { id: 4, label: "Responses", value: 20, color: "text-purple-500" },
  ];

  const alerts = [
    {
      id: 1,
      title: "Pest outbreak in Rice fields",
      severity: "High",
      time: "2 hrs ago",
    },
    {
      id: 2,
      title: "Low soil moisture detected",
      severity: "Medium",
      time: "5 hrs ago",
    },
  ];

  const actionHistory = [
    {
      id: 1,
      action: "Scheduled call with Farmer Raj",
      time: "Today, 10:30 AM",
    },
    {
      id: 2,
      action: "Generated report for Field B",
      time: "Yesterday, 4:00 PM",
    },
    {
      id: 3,
      action: "Sent pest alert to 3 farmers",
      time: "2 days ago",
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Advisor Dashboard
          </h1>
          <p className="text-gray-600">
            Overview of farms, alerts, and advisor activities.
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
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Monitor Farms
            </h2>
            <p className="text-gray-600 text-sm">
              Track real-time data across farms.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="p-3 bg-gray-50 rounded-lg">
                🌾 5 Wheat farms in healthy stage
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                🌱 3 Rice farms need irrigation
              </li>
              <li className="p-3 bg-gray-50 rounded-lg">
                🌽 4 Maize farms under monitoring
              </li>
            </ul>
          </div>

          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Alerts Details
            </h2>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-3 border border-gray-200 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-gray-800">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.time}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.severity === "High"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action History */}
        <div className="mb-8">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Action History
            </h2>
            <ul className="space-y-3">
              {actionHistory.map((act) => (
                <li
                  key={act.id}
                  className="p-3 bg-gray-50 rounded-lg flex justify-between"
                >
                  <span className="text-gray-700">{act.action}</span>
                  <span className="text-sm text-gray-500">{act.time}</span>
                </li>
              ))}
            </ul>
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
                className="card text-center cursor-pointer hover:shadow-lg transition"
              >
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