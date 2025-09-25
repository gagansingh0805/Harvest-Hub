const WeatherCard = ({ weatherData }) => {
  const data = weatherData || {
    temperature: 28,
    condition: "Sunny",
    humidity: 60,
    windSpeed: 12,
    icon: "☀️",
  };

  const getWeatherIcon = (condition) => {
    const icons = {
      Sunny: "☀️",
      Cloudy: "☁️",
      Rainy: "🌧️",
      "Partly Cloudy": "⛅",
      Thunderstorm: "⛈️",
      Foggy: "🌫️",
    };
    return icons[condition] || "🌤️";
  };
  return (
    <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Weather Snapshot
          </h3>
          <div className="flex items-center space-x-6 ">
            <div className="text-6xl">{getWeatherIcon(data.condition)}</div>
            <div>
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {data.temperature}°C
              </div>
              <div className="text-xl text-gray-600 font-medium">
                {data.condition}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right space-y-3">
          <div className="text-lg text-gray-700 font-medium">
            <span>Humidity: </span> {data.humidity}%
          </div>
          <div className="text-lg text-gray-700 font-medium">
            <span className="font-semibold">Wind:</span> {data.windSpeed} km/h
          </div>
          <div className="text-sm text-gray-500 mt-4 bg-white/50 px-3 py-2 rounded-lg">
            {data.location && <div className="mb-1">📍 {data.location}</div>}
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Weather condition recommendation */}
      <div className="mt-6 p-4  bg-blue-100 rounded-xl border border-blue-200">
        <div className="text-lg text-blue-800 font-medium">
          <span className="font-semibold">Recommendation:</span>
          {data.temperature > 30
            ? " Consider additional irrigation"
            : data.temperature < 20
            ? " Reduce irrigation frequency"
            : " Optimal conditions for crop growth"}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
