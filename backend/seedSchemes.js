const mongoose = require("mongoose");
const Scheme = require("./models/schemeModel");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

const sampleSchemes = [
  {
    title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
    description:
      "Direct income support of Rs. 6,000 per year to small and marginal farmer families holding cultivable land up to 2 hectares.",
    benefit: "₹6,000 per year in three equal installments of ₹2,000 each",
    eligibility: [
      "Small and marginal farmers",
      "Cultivable land up to 2 hectares",
      "Indian citizenship required",
    ],
    applicationDeadline: new Date("2024-12-31"),
    applicationLink: "https://www.pmkisan.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: 2,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account Details",
      "Land Ownership Documents",
      "Mobile Number",
    ],
    isActive: true,
  },
  {
    title: "Kisan Credit Card (KCC)",
    description:
      "Credit facility for farmers to meet their production credit requirements and other expenses related to agriculture and allied activities.",
    benefit: "Credit limit up to ₹3 lakh without collateral security",
    eligibility: [
      "All farmers including tenant farmers",
      "Self Help Group members",
      "Joint Liability Group members",
    ],
    applicationDeadline: new Date("2024-12-31"),
    applicationLink: "https://www.nabard.org/content1.aspx?id=570&catid=23",
    department: "Department of Financial Services",
    category: "Credit",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: 70,
    requiredDocuments: [
      "Identity Proof",
      "Address Proof",
      "Land Records",
      "Bank Account Statement",
    ],
    isActive: true,
  },
  {
    title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    description:
      "Crop insurance scheme providing financial support to farmers suffering crop losses due to natural calamities, pests, and diseases.",
    benefit: "Premium subsidy and insurance coverage for crop losses",
    eligibility: [
      "All farmers growing notified crops",
      "Sharecroppers and tenant farmers",
      "Compulsory for loanee farmers",
    ],
    applicationDeadline: new Date("2024-12-31"),
    applicationLink: "https://pmfby.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Insurance",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Aadhaar Card",
      "Bank Account Details",
      "Land Records",
      "Sowing Certificate",
    ],
    isActive: true,
  },
  {
    title: "National Agriculture Market (eNAM)",
    description:
      "Online trading platform for agricultural commodities to provide farmers with better price discovery and market access.",
    benefit: "Better price realization through transparent bidding process",
    eligibility: [
      "All farmers",
      "FPOs (Farmer Producer Organizations)",
      "Traders and buyers",
    ],
    applicationDeadline: new Date("2024-12-31"),
    applicationLink: "https://www.enam.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Aadhaar Card",
      "Mobile Number",
      "Bank Account Details",
      "Quality Certificate (for produce)",
    ],
    isActive: true,
  },
  {
    title: "Soil Health Card Scheme",
    description:
      "Provides soil health cards to farmers with information on nutrient status of their soil along with recommendations on appropriate dosage of nutrients.",
    benefit: "Free soil testing and customized fertilizer recommendations",
    eligibility: ["All farmers", "Priority to small and marginal farmers"],
    applicationDeadline: new Date("2024-12-31"),
    applicationLink: "https://soilhealth.dac.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: ["Aadhaar Card", "Land Records", "Mobile Number"],
    isActive: true,
  },
  {
    title: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
    description:
      "Irrigation scheme to expand cultivated area with assured irrigation, improve water use efficiency, and reduce wastage of water.",
    benefit: "Financial assistance for micro-irrigation and water conservation",
    eligibility: [
      "All farmers",
      "Water User Associations",
      "Self Help Groups",
      "Cooperatives",
    ],
    applicationDeadline: new Date("2024-11-30"),
    applicationLink: "https://pmksy.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Equipment",
    targetStates: ["All India"],
    minLandRequirement: 0.5,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Land Records",
      "Aadhaar Card",
      "Bank Account Details",
      "Water Source Certificate",
    ],
    isActive: true,
  },
  {
    title: "National Mission for Sustainable Agriculture (NMSA)",
    description:
      "Promotes sustainable agriculture practices through climate resilient technologies and natural resource management.",
    benefit: "Technical support and training for sustainable farming",
    eligibility: [
      "Small and marginal farmers",
      "Farmer Producer Organizations",
      "Agricultural Universities",
    ],
    applicationDeadline: new Date("2024-10-31"),
    applicationLink: "https://nmsa.dac.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Training",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: 5,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: ["Aadhaar Card", "Land Records", "Training Certificate"],
    isActive: true,
  },
  {
    title: "Rashtriya Krishi Vikas Yojana (RKVY)",
    description:
      "State-specific agriculture development scheme to strengthen agricultural infrastructure and productivity.",
    benefit: "Infrastructure development and productivity enhancement support",
    eligibility: [
      "State Governments",
      "Farmer Producer Organizations",
      "Agricultural Institutions",
    ],
    applicationDeadline: new Date("2024-12-15"),
    applicationLink: "https://rkvy.nic.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Project Proposal",
      "Registration Certificate",
      "Financial Documents",
    ],
    isActive: true,
  },
  {
    title: "Paramparagat Krishi Vikas Yojana (PKVY)",
    description:
      "Promotes organic farming through cluster-based approach and certification support.",
    benefit: "₹50,000 per cluster for organic farming conversion",
    eligibility: [
      "Groups of 50 farmers",
      "Minimum 50 acres cluster",
      "Chemical-free farming commitment",
    ],
    applicationDeadline: new Date("2024-09-30"),
    applicationLink: "https://pgsindia.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Training",
    targetStates: ["All India"],
    minLandRequirement: 1,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Group Formation Certificate",
      "Land Records",
      "Organic Conversion Plan",
    ],
    isActive: true,
  },
  {
    title: "Sub-Mission on Agricultural Mechanization (SMAM)",
    description:
      "Promotes farm mechanization to increase agricultural productivity and reduce drudgery.",
    benefit: "50-80% subsidy on agricultural machinery and equipment",
    eligibility: [
      "All farmers",
      "Custom Hiring Centers",
      "Farm Machinery Banks",
    ],
    applicationDeadline: new Date("2024-11-15"),
    applicationLink: "https://agrimachinery.nic.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Equipment",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Aadhaar Card",
      "Land Records",
      "Bank Account Details",
      "Quotation from Dealer",
    ],
    isActive: true,
  },
  {
    title: "National Food Security Mission (NFSM)",
    description:
      "Increases production and productivity of rice, wheat, pulses, and coarse cereals.",
    benefit:
      "Seeds, fertilizers, and technology support for food grain production",
    eligibility: [
      "Rice, wheat, pulse, and millet farmers",
      "Demonstration plot farmers",
      "Seed production farmers",
    ],
    applicationDeadline: new Date("2024-10-20"),
    applicationLink: "https://nfsm.gov.in/",
    department: "Department of Agriculture & Cooperation",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 0.5,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Aadhaar Card",
      "Land Records",
      "Crop Plan",
      "Bank Account Details",
    ],
    isActive: true,
  },
  {
    title: "Pradhan Mantri Matsya Sampada Yojana (PMMSY)",
    description:
      "Comprehensive scheme for fisheries development with focus on production, productivity, and infrastructure.",
    benefit: "Financial assistance for fisheries infrastructure and equipment",
    eligibility: [
      "Fish farmers",
      "Fishermen cooperatives",
      "Self Help Groups",
      "Fish processing units",
    ],
    applicationDeadline: new Date("2024-12-20"),
    applicationLink: "https://pmmsy.dof.gov.in/",
    department: "Department of Fisheries",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 0,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "Aadhaar Card",
      "Fisheries License",
      "Bank Account Details",
      "Project Report",
    ],
    isActive: true,
  },
  {
    title: "Kisan Rail Scheme",
    description:
      "Special railway service for transportation of agricultural produce to reduce post-harvest losses.",
    benefit:
      "Subsidized transportation rates for perishable agricultural commodities",
    eligibility: [
      "Farmer Producer Organizations",
      "Agricultural cooperatives",
      "Individual farmers with bulk produce",
    ],
    applicationDeadline: new Date("2024-12-31"),
    applicationLink: "https://www.indianrailways.gov.in/",
    department: "Ministry of Railways",
    category: "Support",
    targetStates: ["All India"],
    minLandRequirement: 2,
    maxLandRequirement: null,
    minAgeRequirement: 18,
    maxAgeRequirement: null,
    requiredDocuments: [
      "FPO Registration",
      "Produce Quality Certificate",
      "Transportation Request",
    ],
    isActive: true,
  },
];

const seedDatabase = async () => {
  try {
    await connectDb();

    // Clear existing schemes
    await Scheme.deleteMany({});
    console.log("Cleared existing schemes");

    // Insert sample schemes
    await Scheme.insertMany(sampleSchemes);
    console.log("Sample schemes inserted successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
