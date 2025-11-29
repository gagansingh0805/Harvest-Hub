const AlertCard = ({ alert }) => {
  // Default alert data if none provided
  const data = alert || {
    type: "Pest Detection",
    title: "Brown Spot Detected",
    severity: "Medium",
    crop: "Rice",
    location: "Field A",
    detectedAt: new Date().toISOString(),
    description:
      "Brown spot disease detected in rice crop. Immediate attention required.",
    recommendation: "Apply neem-based spray and ensure proper drainage.",
  };
  const getSeverityColor = (severity) => {
    const colors = {
      Low: "bg-yellow-100 text-yellow-800 border-yellow-200",
      Medium: "bg-orange-100 text-orange-800 border-orange-200",
      High: "bg-red-100 text-red-800 border-red-200",
      Critical: "bg-red-200 text-red-900 border-red-300",
    };
    return colors[severity] || colors["Medium"];
  };

  const getSeverityIcon = (severity) => {
    const icons = {
      Low: "⚠️",
      Medium: "🚨",
      High: "🚨",
      Critical: "🚨",
    };
    return icons[severity] || "⚠️";
  };
  return (
    <div className="card border-l-4 border-r-4 border-l-orange-400 border-r-orange-400 bg-orange-50">
      <div className="flex items-center justify-between ">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-xl">{getSeverityIcon(data.severity)}</span>
            <h3 className="text-lg font-semibold text-gray-800">{data.type}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(
                data.severity
              )}`}>
              {data.severity} Severity
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <span className="text-sm font-medium text-gray-600">Crop:</span>
              <span className="ml-2 text-gray-800">{data.crop}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Location:
              </span>
              <span className="ml-2 text-gray-800">{data.location}</span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">
                Detected:
              </span>
              <span className="ml-2 text-gray-800">
                {new Date(data.detectedAt).toLocaleDateString()}
              </span>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Time:</span>
              <span className="ml-2 text-gray-800">
                {new Date(data.detectedAt).toLocaleTimeString()}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-red-500">{data.description}</p>
          </div>

          <div className="bg-white p-3 rounded-lg border border-orange-200">
            <div className="text-sm">
              <span className="font-medium text-orange-800">
                Recommendation:
              </span>
              <p className="text-gray-700 mt-1">{data.recommendation}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
