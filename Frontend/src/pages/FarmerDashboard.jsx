import AlertCard from "../components/AlertCard";

const FarmerDashboard = () => {
  // Mock data for current crops
  const currentCrops = [
    {
      id: 1,
      name: "Wheat",
      variety: "HD 2967",
      area: "2.5 acres",
      growthStage: "Flowering",
      health: "Good",
      plantedDate: "2024-01-15",
      expectedHarvest: "2024-04-15",
      progress: 75,
    },
    {
      id: 2,
      name: "Rice",
      variety: "Pusa Basmati",
      area: "1.8 acres",
      growthStage: "Vegetative",
      health: "Warning",
      plantedDate: "2024-02-01",
      expectedHarvest: "2024-06-01",
      progress: 45,
    },
    {
      id: 3,
      name: "Maize",
      variety: "Hybrid 123",
      area: "3.2 acres",
      growthStage: "Tasseling",
      health: "Good",
      plantedDate: "2024-01-20",
      expectedHarvest: "2024-05-20",
      progress: 85,
    },
  ];

  // Mock pest detection results
  const pestDetections = [
    {
      id: 1,
      type: "Fungal Disease",
      crop: "Rice",
      disease: "Brown Spot",
      severity: "Medium",
      detectedAt: "2024-03-10T10:30:00Z",
      location: "Field A - Section 2",
      confidence: 92,
      description:
        "Brown Spot is a common rice disease that causes brown lesions on leaves, reducing photosynthesis and grain quality if left unmanaged.",
      recommendation:
        "Apply balanced nitrogen fertilizer and consider a fungicide spray if humidity remains high. Monitor nearby sections for spread.",
    },
    {
      id: 2,
      type: "Fungal Disease",
      crop: "Wheat",
      disease: "Yellow Rust",
      severity: "Low",
      detectedAt: "2024-03-08T14:15:00Z",
      location: "Field B - Section 1",
      confidence: 87,
      description:
        "Yellow Rust affects wheat leaves with yellow-orange pustules, slowing growth and lowering yield potential in severe cases.",
      recommendation:
        "Regularly scout surrounding areas. If rust spots increase, apply a preventive fungicide. Ensure proper crop spacing for airflow.",
    },
  ];

  // Mock personalized recommendations
  const recommendations = [
    {
      id: 1,
      type: "Irrigation",
      title: "Irrigate in next 2 days",
      description:
        "Soil moisture is below optimal level. Schedule irrigation for Field A.",
      priority: "High",
      dueDate: "2024-03-12",
    },
    {
      id: 2,
      type: "Pest Control",
      title: "Use neem-based spray",
      description:
        "Apply neem oil solution to control brown spot in rice field.",
      priority: "Medium",
      dueDate: "2024-03-15",
    },
    {
      id: 3,
      type: "Fertilization",
      title: "Apply NPK fertilizer",
      description:
        "Wheat crop needs additional nitrogen. Apply 50kg NPK per acre.",
      priority: "Medium",
      dueDate: "2024-03-18",
    },
  ];

  // Mock reminder notifications
  const reminders = [
    {
      id: 1,
      type: "Task",
      message: "Irrigation scheduled for tomorrow at 6 AM",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "Alert",
      message: "New pest detection in rice field",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "Weather",
      message: "Rain expected in next 24 hours",
      time: "3 hours ago",
    },
  ];

  const getHealthColor = (health) => {
    const colors = {
      Good: "text-green-600 bg-green-100",
      Warning: "text-yellow-600 bg-yellow-100",
      Poor: "text-red-600 bg-red-100",
    };
    return colors[health] || colors["Good"];
  };

  const getPriorityColor = (priority) => {
    const colors = {
      High: "text-red-600 bg-red-100",
      Medium: "text-yellow-600 bg-yellow-100",
      Low: "text-green-600 bg-green-100",
    };
    return colors[priority] || colors["Medium"];
  };
  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Farmer Dashboard{" "}
          </h1>
          <p className="text-gray-600">
            Welcome back! Here's your farm overview and recommendations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-2xl font-bold mb-1 text-farm-green">3</div>
            <div className="text-gray-600 ">Active Crops</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold mb-1 text-orange-500">2</div>
            <div className="text-gray-600 ">Pest Alerts</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold mb-1 text-blue-500">3</div>
            <div className="text-gray-600 ">Pending Tasks</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold mb-1 text-purple-500">75%</div>
            <div className="text-gray-600 ">Overall Health</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* current crops  */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Current Crops
              </h2>
              <div className="space-y-4">
                {currentCrops.map((crop) => (
                  <div
                    key={crop.id}
                    className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">🌾</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {crop.name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {crop.variety}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getHealthColor(
                          crop.health
                        )}`}>
                        {crop.health}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-center">
                      <div>
                        <span className="text-gray-600">Area:</span>
                        <div className="font-medium">{crop.area}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Stage:</span>
                        <div className="font-medium">{crop.growthStage}</div>
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
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Growth Progress</span>
                        <span>{crop.progress}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-farm-green h-2 rounded-full transition-all duration-300"
                          style={{ width: `${crop.progress}%` }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reminder Pannel  */}
          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reminders
              </h2>
              <div className="space-y-3">
                {reminders.map((reminder) => (
                  <div
                    key={reminder.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg">
                      {reminder.type === "Task"
                        ? "📋"
                        : reminder.type === "Alert"
                        ? "🚨"
                        : "🌤️"}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-800">
                        {reminder.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {reminder.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Pest Detection Results */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray mb-6">
            Pest & Disease Detection{" "}
          </h2>
          <div className="space-y-6">
            {pestDetections.map((detection) => (
              <AlertCard key={detection.id} alert={detection} />
            ))}
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Personalized Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div key={rec.id} className="card border-l-4 border-l-farm-green">
                <div className="flex items-start justify-between mb-3">
                  <div className="text-3xl">
                    {rec.type === "Irrigation"
                      ? "💧"
                      : rec.type === "Pest Control"
                      ? "🛡️"
                      : "🌱"}
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      rec.priority
                    )}`}>
                    {rec.priority}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  {rec.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{rec.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 ">
                    Due : {new Date(rec.dueDate).toLocaleDateString()}
                  </span>
                  <button className="btn-primary text-sm">Mark Complete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
