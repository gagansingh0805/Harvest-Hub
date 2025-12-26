import React, { useContext, useState, useEffect, useRef } from "react";
import { analyzePlant } from "../api/plantApi";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

const PlantUploader = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null); // ref for file input

  // Clear files and results if user logs out
  useEffect(() => {
    if (!user) {
      setFiles([]);
      setResults([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // reset file input visually
      }
    }
  }, [user]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login"); // redirect if not logged in
      return;
    }

    if (files.length === 0) {
      alert("Please select 1 image to upload.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      setLoading(true);
      setResults([]); // clear previous results before new upload
      const res = await analyzePlant(formData);
      setResults(res.results || []);
    } catch (err) {
      console.error(err);
      alert("Error analyzing plants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ scrollBehavior: "smooth" }}>
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Upload Plant Image for AI Analysis
      </h2>
      <div className="p-4 rounded-xl mx-auto">
        {!user && (
          <p className="text-red-500 mb-4 text-center">
            You must be logged in to upload images.
          </p>
        )}

        {/* File Upload Form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <label className="w-full mb-4 flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all">
            <div className="text-center">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-gray-600 mb-2">
                Drag and drop your crop photo here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supports JPG, PNG, GIF up to 10MB
              </p>
            </div>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef} // attach ref here
            />
          </label>

          {/* Show selected files */}
          {files.length > 0 && (
            <div className="mb-4 w-full text-center text-gray-700">
              Selected files:
              <ul className="mt-2">
                {Array.from(files).map((file, idx) => (
                  <li key={idx} className="text-green-700 font-medium">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !user}
            className="w-full sm:w-auto bg-green-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all mt-2 shadow-md hover:shadow-lg">
            {loading ? "Analyzing..." : "Upload & Analyze"}
          </button>
        </form>

        {/* Results Section */}
        {results.length > 0 && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Analysis Results
            </h2>
            <ul className="space-y-4">
              {results.map((res, index) => (
                <li
                  key={index}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-all bg-green-50">
                  <p>
                    <strong>File:</strong> {res.fileName}
                  </p>
                  <p>
                    <strong>Prediction:</strong> {res.prediction}
                  </p>
                  <p>
                    <strong>Confidence:</strong> {res.confidence}
                  </p>
                  <p>
                    <strong>Recommendation:</strong> {res.recommendation}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">
          📋 Upload Guidelines:
        </h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Take clear, well-lit photos of affected crop areas</li>
          <li>• Ensure the photo shows the entire leaf/plant structure</li>
          <li>
            • Avoid shadows and reflections that may interfere with analysis
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PlantUploader;
