const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const diseaseSolutions = {
  Healthy:
    "No disease detected. Keep up good irrigation, balanced NPK, and regular scouting.",
  "Tomato with Septoria Leaf Spot":
    "Prune affected leaves, rotate crops, avoid wet foliage, and apply chlorothalonil or mancozeb.",
  "Tomato with Leaf Mold":
    "Improve airflow, reduce humidity, water at soil level, and use copper-based fungicide.",
  "Tomato with Late Blight":
    "Remove infected tissue, avoid wet foliage, and spray fungicides containing chlorothalonil or copper.",
  "Potato with Early Blight":
    "Rotate crops, mulch to reduce splash, and apply protectant fungicides when conditions favor disease.",
  "Potato with Late Blight":
    "Plant resistant varieties, ensure drainage, and use recommended late-blight fungicides promptly.",
  "Corn with Common Rust":
    "Use resistant hybrids; fungicide only if severe and during susceptible stages.",
  "Corn with Northern Leaf Blight":
    "Plant resistant varieties, remove infected debris, and apply fungicides during early infection.",
  "Rice with Brown Spot":
    "Improve soil fertility (especially silicon), ensure balanced nitrogen, and use seed treatment if recurrent.",
  "Rice with Sheath Blight":
    "Use resistant varieties, avoid excessive nitrogen, and apply fungicides during early disease development.",
  "Wheat with Powdery Mildew":
    "Plant resistant cultivars, avoid dense canopy, and apply triazole/strobilurin fungicides if needed.",
  "Wheat with Fusarium Head Blight":
    "Use resistant varieties, apply fungicides at flowering, and rotate crops.",
  "Citrus with Canker":
    "Remove infected twigs, apply copper sprays during flush, and manage windbreaks to reduce spread.",
  "Citrus with Greening":
    "Remove infected trees, control insect vectors, and apply recommended insecticides.",
  "Apple with Scab":
    "Prune to open canopy, remove leaf litter, and apply scab-targeted fungicides in early season.",
  "Apple with Fire Blight":
    "Prune infected branches, apply copper-based bactericides, and avoid overhead irrigation.",
  "Grape with Black Rot":
    "Prune mummified fruit and infected canes; use protectant fungicides from pre-bloom to bunch closure.",
  "Grape with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Cabbage with Black Rot":
    "Use resistant varieties, practice crop rotation, and remove infected debris.",
  "Cabbage with Downy Mildew":
    "Apply fungicides during early infection, avoid overhead irrigation, and remove infected leaves.",
  "Carrot with Alternaria Leaf Blight":
    "Use resistant varieties, practice crop rotation, and apply fungicides during early infection.",
  "Carrot with Bacterial Blight":
    "Use pathogen-free seed, practice crop rotation, and remove infected debris.",
  "Onion with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Onion with Neck Rot":
    "Use pathogen-free seed, practice crop rotation, and remove infected bulbs.",
  "Pea with Powdery Mildew":
    "Use resistant varieties, apply fungicides during early infection, and ensure good air circulation.",
  "Pea with Ascochyta Blight":
    "Use resistant varieties, practice crop rotation, and apply fungicides during early infection.",
  "Lettuce with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Lettuce with Bacterial Soft Rot":
    "Use pathogen-free seed, practice crop rotation, and remove infected debris.",
  "Spinach with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Spinach with White Rust":
    "Use resistant varieties, practice crop rotation, and apply fungicides during early infection.",
  "Pepper with Bacterial Spot":
    "Use pathogen-free seed, practice crop rotation, and remove infected debris.",
  "Pepper with Phytophthora Blight":
    "Use resistant varieties, apply fungicides during early infection, and ensure good drainage.",
  "Cucumber with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Cucumber with Powdery Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Melon with Powdery Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Melon with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Squash with Powdery Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Squash with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Tomato with Early Blight":
    "Rotate crops, remove infected leaves, and apply fungicides during early infection.",
  "Tomato with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Potato with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Potato with Verticillium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Corn with Gray Leaf Spot":
    "Use resistant hybrids, apply fungicides during early infection, and practice crop rotation.",
  "Corn with Southern Rust":
    "Apply fungicides during early infection, remove infected debris, and ensure good air circulation.",
  "Rice with False Smut":
    "Apply fungicides during early infection, remove infected panicles, and ensure good air circulation.",
  "Rice with Tungro":
    "Use resistant varieties, control insect vectors, and practice crop rotation.",
  "Wheat with Tan Spot":
    "Use resistant varieties, apply fungicides during early infection, and practice crop rotation.",
  "Wheat with Septoria Tritici Blotch":
    "Use resistant varieties, apply fungicides during early infection, and practice crop rotation.",
  "Citrus with Anthracnose":
    "Remove infected fruit, apply fungicides during early infection, and ensure good air circulation.",
  "Citrus with Melanose":
    "Remove infected fruit, apply fungicides during early infection, and ensure good air circulation.",
  "Apple with Cedar Apple Rust":
    "Remove infected leaves, apply fungicides during early infection, and ensure good air circulation.",
  "Apple with Apple Scab":
    "Remove infected leaves, apply fungicides during early infection, and ensure good air circulation.",
  "Grape with Powdery Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Grape with Botrytis Bunch Rot":
    "Remove infected fruit, apply fungicides during early infection, and ensure good air circulation.",
  "Cabbage with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Cabbage with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Carrot with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Carrot with Bacterial Blight":
    "Use pathogen-free seed, practice crop rotation, and remove infected debris.",
  "Onion with Fusarium Basal Rot":
    "Use pathogen-free seed, practice crop rotation, and remove infected bulbs.",
  "Onion with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Pea with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Pea with Ascochyta Blight":
    "Use resistant varieties, practice crop rotation, and apply fungicides during early infection.",
  "Lettuce with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Lettuce with Downy Mildew":
    "Apply fungicides during early infection, remove infected leaves, and ensure good air circulation.",
  "Spinach with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Spinach with White Rust":
    "Use resistant varieties, practice crop rotation, and apply fungicides during early infection.",
  "Pepper with Fusarium Wilt":
    "Use resistant varieties, practice crop rotation, and ensure good soil drainage.",
  "Pepper with Phytophthora Blight":
    "Use resistant varieties, apply fungicides during early infection, and ensure good drainage.",
};



 const analyzePlantDisease = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ error: "Please upload at least one image" });
    }

    const results = [];

    for (const file of req.files) {
      const response = await axios.post(
        process.env.HF_MODEL_URL,
        file.buffer, // send image buffer
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "image/jpeg",
          },
        }
      );

      // HuggingFace returns predictions (take first one as best)
      const prediction = response.data[0]?.label || "Unknown";
      const confidence = response.data[0]?.score || 0;

      results.push({
        fileName: file.originalname,
        prediction,
        confidence: (confidence * 100).toFixed(2) + "%",
        recommendation:
          diseaseSolutions[prediction] || "No recommendation available",
      });
    }

    res.json({
      message: "Plant disease analysis completed ✅",
      results,
    });
  } catch (error) {
    console.error(
      "Error analyzing plant disease:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to analyze plant images" });
  }
 };

 module.exports={analyzePlantDisease}
