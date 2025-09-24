import { useState } from "react";
import {
  MapPin,
  IndianRupee,
  Sprout,
  LandPlot,
  Leaf,
  Store,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const MarketAnalytics = () => {
  const [location, setLocation] = useState("Punjab");

  // ✅ Mock Data for multiple crops
  const marketData = {
    Punjab: [
      {
        crop: "Wheat",
        seed: 750,
        fertilizer: 1350,
        land: 42000,
        msp: 2300,
      },
      {
        crop: "Rice",
        seed: 800,
        fertilizer: 1400,
        land: 45000,
        msp: 2500,
      },
      {
        crop: "Maize",
        seed: 700,
        fertilizer: 1300,
        land: 40000,
        msp: 2200,
      },
    ],
    Haryana: [
      {
        crop: "Wheat",
        seed: 720,
        fertilizer: 1300,
        land: 40000,
        msp: 2250,
      },
      {
        crop: "Rice",
        seed: 780,
        fertilizer: 1380,
        land: 43000,
        msp: 2450,
      },
      {
        crop: "Maize",
        seed: 680,
        fertilizer: 1250,
        land: 38000,
        msp: 2100,
      },
    ],
    UP: [
      {
        crop: "Wheat",
        seed: 700,
        fertilizer: 1280,
        land: 35000,
        msp: 2100,
      },
      {
        crop: "Rice",
        seed: 750,
        fertilizer: 1350,
        land: 37000,
        msp: 2300,
      },
      {
        crop: "Maize",
        seed: 650,
        fertilizer: 1200,
        land: 33000,
        msp: 2000,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 pt-36 md:p-12 md:pt-36">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-4">
          Market Analytics
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg md:text-xl">
          Check the latest prices of seeds, fertilizers, land leases, and
          government MSPs for multiple crops in your region.
        </p>
      </div>

      {/* Location Selector */}
      <div className="flex justify-center mb-12">
        <div className="relative w-[240px]">
          <MapPin className="absolute top-2 left-3 w-5 h-5 text-green-600" />
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-green-500 bg-white text-gray-700 font-medium cursor-pointer">
            <option value="Punjab">Punjab</option>
            <option value="Haryana">Haryana</option>
            <option value="UP">Uttar Pradesh</option>
          </select>
        </div>
      </div>

      {/* Crop Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {marketData[location].map((cropData, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-6 flex flex-col gap-5">
            <h2 className="text-2xl font-bold text-gray-800">
              {cropData.crop}
            </h2>
            {/* Seed */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Sprout className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">Seed (10kg)</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {cropData.seed.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Fertilizer */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">
                  Fertilizer (per bag)
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {cropData.fertilizer.toLocaleString("en-IN")}
              </div>
            </div>

            {/* Land */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <LandPlot className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">
                  Land Lease (per acre)
                </span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {cropData.land.toLocaleString("en-IN")}
              </div>
            </div>

            {/* MSP */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Store className="w-5 h-5 text-green-600" />
                <span className="font-medium text-gray-700">Govt. MSP</span>
              </div>
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <IndianRupee className="w-4 h-4" />
                {cropData.msp.toLocaleString("en-IN")}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-3xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Price Comparison by Crop
        </h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={marketData[location]}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <XAxis dataKey="crop" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="seed" fill="#16a34a" radius={[8, 8, 0, 0]} />
            <Bar dataKey="fertilizer" fill="#22c55e" radius={[8, 8, 0, 0]} />
            <Bar dataKey="land" fill="#84cc16" radius={[8, 8, 0, 0]} />
            <Bar dataKey="msp" fill="#a3e635" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketAnalytics;
