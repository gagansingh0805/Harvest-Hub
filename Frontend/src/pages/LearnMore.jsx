import React from "react";

const LearnMore = () => {
  
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto max-w-6xl px-6 py-16">
        {/* Learn More Section */}
        <div className="section-gradient rounded-3xl p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Learn More About Kisan Saathi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-2xl font-semibold text-farm-dark-green mb-4">
                🚜 What is Kisan Saathi?
              </h3>
              <p className="mb-6">
                Kisan Saathi is your AI-powered digital farming partner. It helps
                farmers detect crop health, pests, and diseases early, provides
                irrigation guidance, and offers localized weather updates.
              </p>

              <h3 className="text-2xl font-semibold text-farm-dark-green mb-4">
                🌾 Our Mission
              </h3>
              <p>
                To empower every farmer with simple, affordable, and sustainable
                technology that improves crop yield, reduces costs, and protects
                the environment.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-farm-dark-green mb-4">
                ✨ Benefits
              </h3>
              <ul className="list-disc ml-6 mb-6">
                <li>Higher crop yield with early detection</li>
                <li>Reduced pesticide &amp; water wastage</li>
                <li>AI-driven personalized recommendations</li>
                <li>Easy-to-use dashboards for farmers &amp; advisors</li>
                <li>Supports multiple languages &amp; offline mode</li>
              </ul>

              <h3 className="text-2xl font-semibold text-farm-dark-green mb-4">
                📈 Impact
              </h3>
              <p>
                Already serving thousands of farmers across regions, helping them
                save resources and improve productivity sustainably.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LearnMore;
