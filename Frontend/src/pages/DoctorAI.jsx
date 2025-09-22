import React, { useState } from "react";

const DoctorAI = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👩‍🌾 Namaste! I am your Kisan Doctor AI. You can ask me about seeds, crops, or farming advice.",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // Add farmer message
    const newMessages = [...messages, { sender: "farmer", text: input }];
    setMessages(newMessages);

    // Placeholder AI response (later we integrate with API)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "🌱 Thanks for your question! I’ll suggest suitable seeds soon." },
      ]);
    }, 1000);

    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 pt-36">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Doctor AI</h1>
          <p className="text-gray-600">
            Get personalized crop & seed advice by chatting with our AI doctor.
          </p>
        </div>

        {/* Chat Box */}
        <div className="card flex flex-col h-[70vh]">
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 rounded-lg">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.sender === "farmer"
                    ? "ml-auto bg-green-200 text-gray-800"
                    : "mr-auto bg-white border text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="flex items-center border-t p-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about seeds, pests, or crop advice..."
              className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAI;
