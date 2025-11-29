const WeatherCard = ({ weatherData }) => {
  const data = weatherData || {
    temperature: "28°C",
    condition: "Sunny",
    humidity: "60%",
    windSpeed: "12 km/h",
    icon: "☀️",
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Sunny: "☀️",
      Clear: "☀️",
      Cloudy: "☁️",
      Rainy: "🌧️",
      Rain: "🌧️",
      "Partly Cloudy": "⛅",
      Thunderstorm: "⛈️",
      Foggy: "🌫️",
      Snow: "❄️",
    };
    return icons[condition] || "🌤️";
  };

  const getTemperatureValue = (temp) => {
    if (typeof temp === "string") {
      return temp.replace("°C", "");
    }
    return temp;
  };

  const getHumidityValue = (humidity) => {
    if (typeof humidity === "string") {
      return humidity.replace("%", "");
    }
    return humidity;
  };

  const getWindSpeedValue = (windSpeed) => {
    if (typeof windSpeed === "string") {
      return windSpeed.replace(" km/h", "");
    }
    return windSpeed;
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 hover:shadow-2xl transition-all duration-500">
      <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
        <div className="flex-1 mb-6 lg:mb-0">
          <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Current Weather
            </span>
          </h3>
          <div className="flex items-center space-x-8">
            <div className="text-8xl drop-shadow-lg">
              {getWeatherIcon(data.condition)}
            </div>
            <div>
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {getTemperatureValue(data.temperature)}°C
              </div>
              <div className="text-2xl text-gray-600 font-medium capitalize">
                {data.condition}
              </div>
              {data.city && (
                <div className="text-sm text-gray-500 mt-2 flex items-center">
                  <span className="mr-1">📍</span>
                  {data.city}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4 lg:text-right">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-2xl border border-blue-100">
              <div className="text-sm text-gray-600 font-medium mb-1">
                Humidity
              </div>
              <div className="text-3xl font-bold text-blue-700">
                {getHumidityValue(data.humidity)}%
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-2xl border border-green-100">
              <div className="text-sm text-gray-600 font-medium mb-1">
                Wind Speed
              </div>
              <div className="text-3xl font-bold text-green-700">
                {getWindSpeedValue(data.windSpeed)}{" "}
                <span className="text-lg">km/h</span>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/30 text-center lg:text-right">
            <div className="text-xs text-gray-500 mb-1">Last Updated</div>
            <div className="text-sm font-medium text-gray-700">
              {new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Weather Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
          <h4 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
            Agricultural Insight
          </h4>
          <p className="text-blue-800 leading-relaxed">
            {parseInt(getTemperatureValue(data.temperature)) > 30
              ? "🌡️ High temperature detected. Consider additional irrigation and shade protection for sensitive crops."
              : parseInt(getTemperatureValue(data.temperature)) < 15
              ? "🧊 Cool weather conditions. Reduce irrigation frequency and monitor for frost protection needs."
              : "🌱 Optimal growing conditions. Perfect weather for most agricultural activities."}
          </p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
          <h4 className="text-lg font-semibold text-green-900 mb-3 flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
            Irrigation Guidance
          </h4>
          <p className="text-green-800 leading-relaxed">
            {parseInt(getHumidityValue(data.humidity)) > 80
              ? "💧 High humidity levels. Reduce watering and ensure proper ventilation to prevent fungal issues."
              : parseInt(getHumidityValue(data.humidity)) < 40
              ? "🏜️ Low humidity detected. Increase irrigation frequency and consider misting for optimal plant health."
              : "✅ Balanced humidity levels. Maintain regular watering schedule for healthy crop development."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
