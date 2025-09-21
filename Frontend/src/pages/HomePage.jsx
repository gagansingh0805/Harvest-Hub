import WeatherCard from "../components/WeatherCard";
import PlantUploader from "../components/PlantUploader";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { UserContext } from "../context/UserProvider";
import background from "../assets/background1.jpg";
import sustainable from "../assets/sustainable.jpg";
import ai_analysis from "../assets/ai-analysis.jpg";
import easy_use from "../assets/easy-use.jpg";

// Testing Git push - Ayush

const HomePage = () => {
  const { user } = useContext(UserContext);

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
    <div className="min-h-screen ">
      {/* Hero Section */}
      {/* <div className="hero-gradient text-white relative overflow-hidden"> */}
      <div
        className=" text-white relative overflow-hidden bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${background})` }}>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-60">
          <div className="text-center max-w-6xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 drop-shadow-lg">
              Welcome to Kisan Saathi
            </h1>
            <p className="text-xl md:text-3xl mb-12 text-green-100 drop-shadow-md max-w-4xl mx-auto">
              Har Kisan ka Digital Saathi
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <Link
                  to="/farmer"
                  className="bg-farm-dark-green text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-100 hover:text-farm-green transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                  Get Started
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-farm-dark-green text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-100 hover:text-farm-green transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                  Get Started
                </Link>
              )}

              <Link
                to="/learn-more"
                className="border-2 border-white text-white font-bold py-4 px-10 rounded-xl hover:bg-white hover:text-farm-green transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Farm Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {Object.entries(overviewData).map(([key, data]) => (
              <div
                key={key}
                className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-4xl">{data.icon}</div>
                  <span
                    className={`px-3 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      data.status
                    )}`}>
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
            {/* Left Column → Weather + Recommendations */}
            <div className="grid gap-6">
              <WeatherCard />

              <div className="card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  🌱 Recommended Crops
                </h3>
                <ul className="space-y-4 text-lg text-gray-700">
                  <li className="flex items-center gap-2">
                    <span>🌾</span> Rice – Good for current season
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🌿</span> Wheat – Suitable for dry weather
                  </li>
                  <li className="flex items-center gap-2">
                    <span>🍅</span> Tomato – Best for humid regions
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column → Plant Uploader */}
            <div className="flex items-start justify-center">
              <div className="w-full max-w-xl">
                <PlantUploader />
              </div>
            </div>
          </div>

          {/* Features Section */}
          {/* <div className="section-gradient rounded-3xl p-12 mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
              Why Choose Kisan Saathi?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-6xl mb-6">🤖</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  AI-Powered Analysis
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Advanced machine learning algorithms detect diseases and pests
                  with high accuracy
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-6">📱</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Easy to Use
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Simple photo upload and instant results. No technical
                  knowledge required
                </p>
              </div>

              <div className="text-center">
                <div className="text-6xl mb-6">🌱</div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Sustainable Solutions
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Eco-friendly recommendations that protect your crops and the
                  environment
                </p>
              </div>
            </div>
          </div> */}

          <div className="section-gradient rounded-3xl p-6 md:p-12 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
              Why Choose Kisan Saathi?
            </h2>

            <div
              className="grid gap-8 md:gap-12 
               grid-cols-1 
               md:grid-cols-2 
               lg:[grid-template-columns:2fr_1.2fr_1.2fr] 
               lg:[grid-template-rows:repeat(6,auto)]">
              {/* Div1 → Big Image left */}
              <div className="lg:col-span-1 lg:row-span-4 overflow-hidden rounded-2xl md:rounded-3xl shadow-md h-64 md:h-full">
                <div
                  className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                  style={{ backgroundImage: `url(${ai_analysis})` }}
                />
              </div>

              {/* Div2 → Content top right */}
              <div className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center max-w-lg mx-auto text-center md:text-left px-2 md:px-0">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
                  AI-Powered Analysis
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-3 leading-relaxed">
                  Advanced machine learning algorithms detect crop diseases and
                  pests with high accuracy, giving you faster and more reliable
                  insights.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Instant detection using photos</li>
                  <li>Trained on thousands of crop images</li>
                  <li>Minimizes guesswork for farmers</li>
                </ul>
              </div>

              {/* Div3 → Big Image right */}
              <div className="lg:col-span-2 lg:row-span-4 overflow-hidden rounded-2xl md:rounded-3xl shadow-md h-64 md:h-full lg:mt-12">
                <div
                  className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                  style={{ backgroundImage: `url(${easy_use})` }}
                />
              </div>

              {/* Div4 → Content bottom left */}
              <div className="lg:col-span-1 lg:row-span-2 flex flex-col justify-center max-w-lg mx-auto text-center md:text-left px-2 md:px-0">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
                  Easy to Use
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-3 leading-relaxed">
                  Our platform is designed for simplicity. Upload a photo and
                  get results instantly—no technical expertise required.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>One-click photo upload</li>
                  <li>Instant diagnosis results</li>
                  <li>Works smoothly on mobile devices</li>
                </ul>
              </div>

              {/* Div5 → Big Image left */}
              <div className="lg:col-span-1 lg:row-span-3 overflow-hidden rounded-2xl md:rounded-3xl shadow-md h-64 md:h-full">
                <div
                  className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                  style={{ backgroundImage: `url(${sustainable})` }}
                />
              </div>

              {/* Div6 → Content right */}
              <div className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center max-w-lg mx-auto mt-8 text-center md:text-left px-2 md:px-0">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 md:mb-3">
                  Sustainable Solutions
                </h3>
                <p className="text-gray-600 text-sm md:text-base mb-2 md:mb-3 leading-relaxed">
                  Eco-friendly recommendations that not only protect your crops
                  but also keep the soil and environment healthy for the future.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                  <li>Reduces chemical usage</li>
                  <li>Promotes organic practices</li>
                  <li>Improves soil fertility long-term</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
              Platform Statistics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-farm-green mb-3">
                  10,000+
                </div>
                <div className="text-gray-600 text-lg">Farmers Served</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-farm-green mb-3">
                  50,000+
                </div>
                <div className="text-gray-600 text-lg">Photos Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-farm-green mb-3">
                  95%
                </div>
                <div className="text-gray-600 text-lg">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-farm-green mb-3">
                  24/7
                </div>
                <div className="text-gray-600 text-lg">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
