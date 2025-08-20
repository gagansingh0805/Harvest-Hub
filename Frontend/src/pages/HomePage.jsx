import WeatherCard from "../components/WeatherCard";
import PlantUploader from "../components/PlantUploader"; // <- Import your PlantUploader

const HomePage = () => {
  // Mock data for overview cards
  const overviewData = {
    farmStatus: {
      title: "Farm Status",
      value: "Healthy",
      status: "good",
      icon: "🌱",
      description: "All crops are growing well",
    },
    pestAlerts: {
      title: "Pest Alerts",
      value: "2 Active",
      status: "warning",
      icon: "🚨",
      description: "Brown spot detected in rice field",
    },
    weatherSnapshot: {
      title: "Weather Snapshot",
      value: "28°C",
      status: "info",
      icon: "☀️",
      description: "Sunny with 60% humidity",
    },
  };

  const getStatusColor = (status) => {
    const colors = {
      good: "bg-green-100 text-green-800 border-green-200",
      warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
      danger: "bg-red-100 text-red-800 border-red-200",
      info: "bg-blue-100 text-blue-800 border-blue-200",
    };
    return colors[status] || colors.info;
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg">
              Welcome to Kisan Saathi
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-green-100 drop-shadow-md max-w-4xl mx-auto">
              Har Kisan ka Digital Saathi
            </p>
          </div>
        </div>
      </div>

      {/* Plant Uploader Section - moved ABOVE Farm Overview */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
            Upload Plant Image for AI Analysis
          </h2>
          <PlantUploader />
        </div>

        {/* Overview Cards Section */}
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Farm Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {Object.entries(overviewData).map(([key, data]) => (
              <div
                key={key}
                className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{data.icon}</div>
                  <span
                    className={`px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      data.status
                    )}`}
                  >
                    {data.value}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {data.title}
                </h3>
                <p className="text-gray-600 text-lg">{data.description}</p>
              </div>
            ))}
          </div>

          {/* Main card area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <WeatherCard />
          </div>

          {/* Other sections like Feature Section, Platform Statistics etc. */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
