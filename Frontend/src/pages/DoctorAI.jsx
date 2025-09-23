import React, { useState } from "react";
import DoctorImage from "../assets/doctor.png";

const DoctorAI = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Ask Your Question Here",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Ye message AI se aaya: " + input },
      ]);
    }, 1000);
  };

  return (
    <div className="pt-20 px-5 text-center">
      {/* Doctor Image */}
      <img
        src={DoctorImage}
        alt="Doctor AI"
        className="w-56 mx-auto rounded-full mb-7" // slightly bigger
      />

      {/* Green Text Box */}
      <div className="max-w-xl mx-auto bg-green-500 text-white font-bold text-lg p-5 rounded-lg shadow-md mb-10">
        👩‍🌾 Namaste! I am your Kisan Doctor AI. You can ask me about seeds, crops, or farming advice.
      </div>

      {/* Chatbot Section */}
      <div className="max-w-xl mx-auto bg-gray-100 p-5 rounded-lg border border-gray-300">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-3 text-left ${msg.sender === "user" ? "text-right" : "text-left"}`}
          >
            <span
              className={`inline-block p-3 rounded-lg ${
                msg.sender === "bot" ? "bg-white" : "bg-green-100"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}

        <div className="mt-5 flex gap-3">
          <input
            type="text"
            placeholder="Ask about seeds, pests, or crop advice..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 rounded-md bg-green-500 text-white font-bold hover:bg-green-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorAI;
