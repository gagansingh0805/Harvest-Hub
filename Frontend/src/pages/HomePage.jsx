import WeatherCard from "../components/WeatherCard";
import PlantUploader from "../components/PlantUploader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import background from "../assets/background1.jpg";
import sustainable from "../assets/sustainable.jpg";
import ai_analysis from "../assets/ai-analysis.jpg";
import farmerImg from "../assets/farmerImg.jpg";
import fieldImg from "../assets/fieldImg.jpg";
import supportImg from "../assets/supportImg.jpg";
import aiImg from "../assets/aiImg.jpg";
import easy_use from "../assets/easy-use.jpg";
import { Users, Camera, Target, Headphones } from "lucide-react";
import { motion } from "framer-motion";

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
      icon: "☀",
      description: "Sunny with 60% humidity",
    },
  };

  const stats = [
    {
      id: 1,
      title: "Farmers Served",
      value: "1,000+",
      desc: "Trusted by farmers across India.",
      icon: Users,
      img: farmerImg,
    },
    {
      id: 2,
      title: "Photos Analyzed",
      value: "5,000+",
      desc: "AI-powered crop health checks.",
      icon: Camera,
      img: aiImg,
    },
    {
      id: 3,
      title: "Accuracy Rate",
      value: "95%",
      desc: "Better decisions, higher yield.",
      icon: Target,
      img: fieldImg,
    },
    {
      id: 4,
      title: "Support Available",
      value: "24/7",
      desc: "Always ready to help farmers.",
      icon: Headphones,
      img: supportImg,
    },
  ];

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
    <div className="min-h-screen overflow-x-hidden bg-gray-100">
      {/* Hero Section */}
      <div
        className="text-white relative overflow-hidden bg-cover bg-center min-h-screen"
        loading="lazy"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-60">
          <div className="text-center max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-7xl font-bold text-header mb-4">
              <span className="text-[#ffffff] drop-shadow-lg">Welcome to</span>{" "}
              <span className="bg-amber-500 bg-clip-text text-transparent drop-shadow-lg">
                Kisan Setu
              </span>
            </h2>
            <p className="text-xl md:text-3xl mb-12 text-green-100 drop-shadow-md max-w-4xl mx-auto">
              Har Kisan ka Digital Saathi
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {user ? (
                <Link
                  to="/farmer"
                  className="bg-farm-dark-green text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-100 hover:text-farm-green transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                  Get Started
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-farm-dark-green text-white font-bold py-4 px-10 rounded-xl hover:bg-gray-100 hover:text-farm-green transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
                >
                  Get Started
                </Link>
              )}
              <Link
                to="/learn-more"
                className="border-2 border-white text-white font-bold py-4 px-10 rounded-xl hover:bg-white hover:text-farm-green transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards Section */}
      <div className="w-full py-16">
        <div className="">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Farm Overview
          </h2>
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4 sm:px-6 lg:px-8">
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
          </div>

          {/* Main card area */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 px-4 sm:px-6 lg:px-8">
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
          </div>

          {/* Why Choose Section */}
          <div className="bg-[#088124] p-6 md:p-12 w-screen">
            <div className="max-w-7xl items-center justify-center mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-amber-500 mb-12 text-center">
                Why Choose Kisan Saathi?
              </h2>

              <div
                className="grid gap-8 md:gap-12 
               grid-cols-1 
               md:grid-cols-2 
               lg:[grid-template-columns:2fr_1.2fr_1.2fr] 
               lg:[grid-template-rows:repeat(6,auto)]"
              >
                {/* Div1 → Big Image left */}
                <div className="lg:col-span-1 lg:row-span-4 overflow-hidden rounded-2xl md:rounded-3xl shadow-md h-64 md:h-full">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    style={{ backgroundImage: `url(${ai_analysis})` }}
                  />
                </div>

                {/* Div2 → Content top right */}
                <div className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center max-w-lg mx-auto text-center md:text-left px-2 md:px-0">
                  <h3 className="text-xl md:text-3xl font-semibold text-white hover:text-yellow-400 mt-2 mb-2 md:mb-3">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-white text-sm md:text-base mb-2 md:mb-3 leading-relaxed">
                    Advanced machine learning algorithms detect crop diseases
                    and pests with high accuracy, giving you faster and more
                    reliable insights.
                  </p>
                  <ul className="list-disc list-inside text-white space-y-1 text-sm">
                    <li>Instant detection using photos</li>
                    <li>Trained on thousands of crop images</li>
                    <li>Minimizes guesswork for farmers</li>
                  </ul>
                </div>

                {/* Div3 → Big Image right */}
                <div className="lg:col-span-2 lg:row-span-4 overflow-hidden rounded-2xl md:rounded-3xl shadow-md h-64 md:h-full lg:mt-12">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    style={{ backgroundImage: `url(${easy_use})` }}
                  />
                </div>

                {/* Div4 → Content bottom left */}
                <div className="lg:col-span-1 lg:row-span-2 flex flex-col justify-center max-w-lg mx-auto text-center md:text-left px-2 md:px-0">
                  <h3 className="text-xl md:text-3xl font-semibold text-white hover:text-yellow-400 mb-2 md:mb-3">
                    Easy to Use
                  </h3>
                  <p className="text-white text-sm md:text-base mb-2 md:mb-3 leading-relaxed">
                    Our platform is designed for simplicity. Upload a photo and
                    get results instantly—no technical expertise required.
                  </p>
                  <ul className="list-disc list-inside text-white space-y-1 text-sm">
                    <li>One-click photo upload</li>
                    <li>Instant diagnosis results</li>
                    <li>Works smoothly on mobile devices</li>
                  </ul>
                </div>

                {/* Div5 → Big Image left */}
                <div className="lg:col-span-1 lg:row-span-3 overflow-hidden rounded-2xl md:rounded-3xl shadow-md h-64 md:h-full">
                  <div
                    className="w-full h-full bg-cover bg-center transform transition-transform duration-700 hover:scale-110"
                    loading="lazy"
                    style={{ backgroundImage: `url(${sustainable})` }}
                  />
                </div>

                {/* Div6 → Content right */}
                <div className="lg:col-span-2 lg:row-span-2 flex flex-col justify-center max-w-lg mx-auto mt-8 text-center md:text-left px-2 md:px-0">
                  <h3 className="text-xl md:text-3xl font-semibold text-white hover:text-yellow-400 mb-2 md:mb-3">
                    Sustainable Solutions
                  </h3>
                  <p className="text-white text-sm md:text-base mb-2 md:mb-3 leading-relaxed">
                    Eco-friendly recommendations that not only protect your
                    crops but also keep the soil and environment healthy for the
                    future.
                  </p>
                  <ul className="list-disc list-inside text-white space-y-1 text-sm">
                    <li>Reduces chemical usage</li>
                    <li>Promotes organic practices</li>
                    <li>Improves soil fertility long-term</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Farmers First Section */}
          <section className="relative pt-20 bg-gradient-to-b from-emerald-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-6 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-16 text-emerald-700">
                🌱 Farmers First, Always
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {stats.map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.id}
                      whileInView={{ opacity: [0, 1], y: [30, 0] }}
                      transition={{ duration: 0.6, delay: i * 0.2 }}
                      viewport={{ once: true, amount: 0.2 }}
                      className="relative rounded-2xl overflow-hidden group shadow-lg"
                    >
                      <img
                        src={stat.img}
                        alt={stat.title}
                        loading="lazy"
                        className="h-72 w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-6">
                        <Icon className="w-12 h-12 mb-3 text-emerald-300" />
                        <div className="text-4xl font-extrabold">
                          {stat.value}
                        </div>
                        <p className="text-lg font-semibold">{stat.title}</p>
                        <p className="text-sm text-gray-200 mt-2 max-w-sm">
                          {stat.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true, amount: 0.2 }}
                className="mt-16"
              >
                <p className="text-gray-700 text-lg font-medium mb-6 text-center">
                  Loved by thousands of farmers nationwide 🌾
                </p>
                <div className="flex justify-center -space-x-4 mb-6">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Farmer"
                    className="w-14 h-14 rounded-full border-2 border-white shadow"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Farmer"
                    className="w-14 h-14 rounded-full border-2 border-white shadow"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/men/65.jpg"
                    alt="Farmer"
                    className="w-14 h-14 rounded-full border-2 border-white shadow"
                  />
                  <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center text-sm font-semibold border-2 border-white shadow">
                    +99
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition-all duration-300">
                    <p className="text-gray-700 italic mb-2">
                      "Kisan Setu helped me detect crop diseases early and save
                      my harvest!"
                    </p>
                    <p className="font-semibold text-green-600">
                      – Ramesh, Maharashtra
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition-all duration-300">
                    <p className="text-gray-700 italic mb-2">
                      "The AI analysis is amazing! Makes farming decisions so
                      much easier."
                    </p>
                    <p className="font-semibold text-green-600">– Sita, Punjab</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl shadow hover:shadow-xl transition-all duration-300">
                    <p className="text-gray-700 italic mb-2">
                      "I love the platform, especially the easy-to-use crop
                      recommendations."
                    </p>
                    <p className="font-semibold text-green-600">
                      – Manoj, Rajasthan
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
