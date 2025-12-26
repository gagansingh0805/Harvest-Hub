const { GoogleGenerativeAI } = require("@google/generative-ai");

const askDoctorAI = async (req, res) => {
  try {
    const { question, language = "hinglish" } = req.body;

    if (!question || question.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Question is required",
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: "Gemini API key is not configured",
      });
    }

    // Initialize Google Generative AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // Using Gemini 2.5 Flash
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Language-specific system prompts
    const languagePrompts = {
      hinglish: "Respond in simple Hindi-English mix (Hinglish) that farmers can easily understand.",
      hindi: "Respond only in Hindi (हिंदी) language. Use simple and clear Hindi that farmers can easily understand.",
      english: "Respond only in English language. Use simple and clear English that farmers can easily understand.",
      punjabi: "Respond only in Punjabi (ਪੰਜਾਬੀ) language. Use simple and clear Punjabi that farmers can easily understand.",
      tamil: "Respond only in Tamil (தமிழ்) language. Use simple and clear Tamil that farmers can easily understand.",
      telugu: "Respond only in Telugu (తెలుగు) language. Use simple and clear Telugu that farmers can easily understand.",
    };

    const languageInstruction = languagePrompts[language] || languagePrompts.hinglish;

    // System prompt for agricultural expert
    const systemPrompt = `You are HarvestHub AI Expert, an intelligent and experienced agricultural advisor. Your role is to provide practical, actionable farming advice to help farmers succeed.

IMPORTANT GUIDELINES:
- Give specific, detailed answers based on the farmer's question
- Provide step-by-step solutions when applicable
- Include practical tips, dos and don'ts
- Use examples relevant to Indian farming context
- Be conversational and friendly, not robotic
- If asked about a specific crop, provide crop-specific advice
- Include preventive measures and best practices
- Mention local/regional considerations when relevant
- Keep responses informative but not overly long (2-4 paragraphs typically)
- ${languageInstruction}

DO NOT just list what you can help with. Instead, directly answer the question with useful information.`;

    const prompt = `${systemPrompt}\n\nFarmer's Question: ${question}\n\nProvide a helpful, detailed response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const reply = response.text() || "Sorry, I couldn't generate a response. Please try again.";

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    console.error("Error details:", {
      message: error.message,
      stack: error.stack,
      response: error.response?.data || error.response,
    });
    res.status(500).json({
      success: false,
      message: "Error generating AI response",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
      details: process.env.NODE_ENV === "development" ? (error.response?.data || error.stack) : undefined,
    });
  }
};

module.exports = { askDoctorAI };

