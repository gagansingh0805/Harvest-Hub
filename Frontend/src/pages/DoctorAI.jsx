import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Leaf, Droplets, Sun } from "lucide-react";
import DoctorImage from "../assets/doctor.png";

const DoctorAI = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "🌱 Namaste! I'm your AI Agricultural Expert. Ask me about crops, pests, weather, soil health, or any farming advice!",
      timestamp: new Date(),
      type: "welcome"
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // ✅ Scroll only when new messages are added, not on first mount
  useEffect(() => {
    if (messages.length > 1) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getAIResponse = (userMessage) => {
    const responses = {
      "pest": "🐛 For pest control, I recommend: Neem oil spray, crop rotation, and natural predators like ladybugs.",
      "weather": "🌤️ Weather affects crops! Adjust irrigation, monitor soil moisture, and prepare for rain or heat.",
      "soil": "🌍 Soil health is crucial! Test pH (6.0-7.5), add compost, and rotate crops for balance.",
      "seeds": "🌱 Quality seeds are key! Use certified seeds, check germination rate, and plant at correct depth.",
      "fertilizer": "🌿 Balanced nutrition is essential! Use NPK as per soil test, add organics, and avoid excess.",
      "irrigation": "💧 Drip irrigation saves water. Water early morning/evening and check soil moisture.",
      "harvest": "🌾 Harvest timing is critical! Monitor maturity, forecast weather, and store properly.",
      "disease": "🦠 Diseases spread fast! Rotate crops, use resistant varieties, and apply preventive sprays.",
      "default": "🤖 I can guide you on crop management, pests, irrigation, soil, and harvest. Please be specific!"
    };

    const lowerMessage = userMessage.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (lowerMessage.includes(key)) return response;
    }
    return responses.default;
  };

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
      type: "user"
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        sender: "bot",
        text: getAIResponse(input),
        timestamp: new Date(),
        type: "ai"
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const quickQuestions = [
    "🌱 Best seeds for wheat?",
    "🐛 How to control pests?",
    "🌧️ Weather impact on crops?",
    "🌍 Soil health tips?",
    "💧 Irrigation advice?",
    "🌾 Harvest timing?"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 pt-32">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="relative inline-block">
            <motion.img
              src={DoctorImage}
              alt="AI Agricultural Expert"
              className="w-32 h-32 mx-auto rounded-full border-4 border-emerald-200 shadow-xl"
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold text-emerald-800 mt-4 mb-2"
          >
            Harvest Hub AI Expert
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg text-emerald-600 max-w-2xl mx-auto"
          >
            Your intelligent agricultural companion powered by AI. Get advice on crops, pests, weather, soil health, and farming techniques.
          </motion.p>
        </motion.div>

        {/* Quick Questions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mb-8"
        >
          <h3 className="text-xl font-semibold text-emerald-700 mb-4 text-center">Quick Questions</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {quickQuestions.map((question, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInput(question.replace(/🌱|🐛|🌧️|🌍|💧|🌾/g, '').trim())}
                className="px-4 py-2 bg-white border border-emerald-200 rounded-full text-emerald-700 hover:bg-emerald-50 transition-colors shadow-sm"
              >
                {question}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Chat Interface */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-emerald-200 overflow-hidden"
        >
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">AI Agricultural Expert</h3>
                <p className="text-sm text-emerald-100">Online • Ready to help</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-3 max-w-xs lg:max-w-md ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.sender === "user" 
                        ? "bg-emerald-500" 
                        : "bg-gradient-to-r from-emerald-400 to-green-500"
                    }`}>
                      {msg.sender === "user" ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      msg.sender === "user"
                        ? "bg-emerald-500 text-white"
                        : "bg-white border border-emerald-200 text-gray-800"
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-emerald-200 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-emerald-200">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Ask about crops, pests, weather, soil health..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="w-full p-3 pr-12 border border-emerald-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-1">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  <Droplets className="w-4 h-4 text-blue-400" />
                  <Sun className="w-4 h-4 text-yellow-400" />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorAI;
