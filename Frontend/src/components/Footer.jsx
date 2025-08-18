import logo from "../assets/logo3.jpg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 mt-auto">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-3 mb-6 md:mb-0">
              <div className="w-8 h-8  rounded-lg flex items-center justify-center shadow-lg">
                <img
                  src={logo}
                  className="rounded-2xl"
                  alt="Kisan Saathi Logo"></img>
              </div>
              <span className="text-xl font-semibold">Kisan Saathi</span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-gray-300 text-base mb-2">
                © 2025 Kisan Saathi. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm">
                Powered by AI-Powered Digital Partner for Every Farmer
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
              <div className="flex flex-wrap justify-center space-x-6 mb-4 md:mb-0">
                <a
                  href="#"
                  className="hover:text-farm-green transition-all duration-200 font-medium">
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="hover:text-farm-green transition-all duration-200 font-medium">
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="hover:text-farm-green transition-all duration-200 font-medium">
                  Contact Us
                </a>
              </div>
              <div className="text-center">
                <span className="text-farm-green font-medium">
                  Made with ❤️ for Indian Farmers
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
